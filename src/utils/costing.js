// Stock costing by moving weighted average cost (WAC).
//
// A product's purchase price used to be overwritten by every purchase bill, and
// stock was valued at that latest price: 4 guitars bought at 6,000 were worth
// 7,500 each the day a new batch came in at 7,500. Here every stock movement
// is replayed in date order instead:
//   - a purchase brings stock in at its own rate, and the average becomes
//     (old qty x old average + new qty x new rate) / (old qty + new qty);
//   - a sale or a delivery challan takes stock out at the average, which
//     does not change it;
//   - a credit note (goods returned) brings stock back at the average;
//   - production brings finished goods in at what their materials cost, and
//     takes the materials out at their average.
// Stock that was there before any dated movement (opening stock, or stock
// typed in on the Products screen) is costed at the product's openingCost,
// else the rate of its first purchase bill, else its purchase price.
//
// Each sales line also records the average cost when it was sold
// (costAtSale, saved on the invoice), so profit already earned does not move
// when later purchases change the average.
import { appliedStock, isCancelledBill, isServiceProduct, resolveLineDiscount, countsAsSales, isCreditNote } from '../utils.js';
import { billRate } from './fx.js';

const r2 = (n) => Math.round((Number(n) || 0) * 100) / 100;
const r3 = (n) => Math.round((Number(n) || 0) * 1000) / 1000;
const key = (s) => String(s || '').trim().toLowerCase();
// Unit costs keep 4 decimals so 3 for 100 does not drift.
const r4 = (n) => Math.round((Number(n) || 0) * 10000) / 10000;

// Taxable value of one invoice line in the invoice's currency (before GST, after
// its own discount). The whole-bill discount is not spread over lines.
export const lineTaxable = (item, taxInclusive = false) => {
  const qty = Math.max(0, Number(item?.quantity) || 0);
  const rate = Math.max(0, Number(item?.rate) || 0);
  const after = Math.max(0, qty * rate - resolveLineDiscount(item || {}, !!taxInclusive));
  const pct = Math.max(0, Number(item?.taxPercent) || 0);
  return taxInclusive && pct > 0 ? after / (1 + pct / 100) : after;
};

// Order on the same day: purchases, then production, then invoices, so goods
// bought and sold on one day are sold at the new average.
const ORDER = { purchase: 0, production: 1, bill: 2 };

function events(products, bills, purchases, productions) {
  const byName = new Map((products || []).map((p) => [key(p.name), p.id]));
  const out = [];
  for (const pur of purchases || []) {
    if (!pur?.date) continue;
    const lines = [];
    for (const it of pur.items || []) {
      const id = it.productId || byName.get(key(it.name));
      const q = Number(it.quantity) || 0;
      if (id && q) lines.push({ id, qty: q, rate: Math.max(0, Number(it.rate) || 0) });
    }
    if (lines.length) out.push({ kind: 'purchase', date: pur.date, at: pur.createdAt || pur.id || '', ref: pur, lines });
  }
  for (const pr of productions || []) {
    if (!pr?.date || !pr.stockApplied) continue;
    out.push({ kind: 'production', date: pr.date, at: pr.createdAt || pr.id || '', ref: pr });
  }
  for (const b of bills || []) {
    if (!b?.invoiceDate || isCancelledBill(b)) continue;
    out.push({ kind: 'bill', date: b.invoiceDate, at: b.createdAt || b.id || '', ref: b });
  }
  return out.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1
    : (ORDER[a.kind] - ORDER[b.kind]) || String(a.at).localeCompare(String(b.at))));
}

// Replays every movement and returns:
//   products: Map(productId -> { qty, avgCost, value, lastPurchaseRate,
//             lastPurchaseDate, purchases: [{ date, rate, qty, supplier, billNo }] })
//             as at the end of `asOf` (YYYY-MM-DD; all dates when omitted)
//   saleCost: Map("billId|lineIndex" -> unit cost at the time of that sale)
export function costLedger({ products = [], bills = [], purchases = [], productions = [], asOf = null } = {}) {
  const goods = (products || []).filter((p) => !isServiceProduct(p));
  const state = new Map();
  const all = events(products, bills, purchases, productions);

  // Opening quantity: today's stock less every dated movement (as closingStock does).
  const net = new Map();
  const add = (id, q) => net.set(id, (net.get(id) || 0) + q);
  const firstRate = new Map();
  for (const e of all) {
    if (e.kind === 'purchase') {
      for (const l of e.lines) { add(l.id, l.qty); if (!firstRate.has(l.id) && l.rate > 0) firstRate.set(l.id, l.rate); }
    } else {
      const applied = e.kind === 'bill' ? appliedStock(e.ref) : e.ref.stockApplied;
      for (const [id, ch] of Object.entries(applied || {})) add(id, Number(ch) || 0);
    }
  }
  for (const p of goods) {
    const opening = r3((Number(p.stock) || 0) - (net.get(p.id) || 0));
    const openCost = Number(p.openingCost) > 0 ? Number(p.openingCost)
      : (firstRate.get(p.id) || Number(p.purchasePrice) || 0);
    state.set(p.id, { qty: opening, avgCost: r4(openCost), lastPurchaseRate: null, lastPurchaseDate: null, purchases: [] });
  }

  const saleCost = new Map();
  const bring = (s, q, rate) => {
    if (s.qty > 0 && s.qty + q > 0) s.avgCost = r4((s.qty * s.avgCost + q * rate) / (s.qty + q));
    else if (q > 0) s.avgCost = r4(rate);
    s.qty = r3(s.qty + q);
  };

  for (const e of all) {
    if (asOf && e.date > asOf) break;
    if (e.kind === 'purchase') {
      for (const l of e.lines) {
        const s = state.get(l.id);
        if (!s) continue;
        if (l.qty > 0) bring(s, l.qty, l.rate); else s.qty = r3(s.qty + l.qty);
        s.lastPurchaseRate = l.rate; s.lastPurchaseDate = e.date;
        s.purchases.push({ date: e.date, rate: l.rate, qty: l.qty, supplier: e.ref.supplierName || '', billNo: e.ref.invoiceNumber || '' });
      }
    } else if (e.kind === 'production') {
      const pr = e.ref;
      const madeUnit = Number(pr.qty) > 0 ? (Number(pr.cost) || 0) / Number(pr.qty) : 0;
      for (const [id, ch] of Object.entries(pr.stockApplied || {})) {
        const s = state.get(id);
        const q = Number(ch) || 0;
        if (!s || !q) continue;
        if (q > 0) bring(s, q, id === pr.productId && madeUnit > 0 ? madeUnit : s.avgCost);
        else s.qty = r3(s.qty + q);
      }
    } else {
      const b = e.ref;
      (b.data?.items || []).forEach((it, i) => {
        const s = it?.productId ? state.get(it.productId) : null;
        if (s) saleCost.set(`${b.id}|${i}`, s.avgCost);
      });
      for (const [id, ch] of Object.entries(appliedStock(b))) {
        const s = state.get(id);
        const q = Number(ch) || 0;
        if (!s || !q) continue;
        if (q > 0) bring(s, q, s.avgCost); else s.qty = r3(s.qty + q);
      }
    }
  }

  const result = new Map();
  for (const [id, s] of state) {
    result.set(id, { ...s, avgCost: r2(s.avgCost), value: s.qty > 0 ? r2(s.qty * s.avgCost) : 0 });
  }
  return { products: result, saleCost };
}

// Average costs to store on products (product.avgCost) after purchases change:
// [{ ...product, avgCost }] for those whose average moved.
export function avgCostUpdates(products, ledger) {
  return (products || []).filter((p) => {
    const s = ledger.products.get(p.id);
    return s && r2(p.avgCost) !== s.avgCost;
  }).map((p) => ({ ...p, avgCost: ledger.products.get(p.id).avgCost }));
}

// Unit cost to freeze on a new or changed sales line: the product's stored
// average, else its purchase price. A line keeps its snapshot while it stays
// on the same product.
export function withCostSnapshots(items, products) {
  const map = new Map((products || []).map((p) => [p.id, p]));
  return (items || []).map((it) => {
    const p = it?.productId ? map.get(it.productId) : null;
    if (!p || isServiceProduct(p)) return it;
    if (it.costProductId === p.id && Number.isFinite(Number(it.costAtSale))) return it;
    const cost = Number(p.avgCost) > 0 ? Number(p.avgCost) : (Number(p.purchasePrice) || 0);
    return { ...it, costAtSale: r2(cost), costProductId: p.id };
  });
}

// Gross profit by product for invoices dated from..to (inclusive). Sales add,
// credit notes take away. Amounts are in the base currency, before GST.
// Each line's cost is its costAtSale snapshot, else the average when sold.
// `salesBills` (default: all bills) limits the rows to one business's
// invoices; the costs are always worked out from every bill, since products
// and stock are shared.
export function profitByProduct({ products = [], bills = [], purchases = [], productions = [], from = '', to = '9999-12-31', base = 'INR', salesBills = null } = {}) {
  const ledger = costLedger({ products, bills, purchases, productions });
  const map = new Map((products || []).map((p) => [p.id, p]));
  const rows = new Map();
  let skippedForeign = 0;
  for (const b of salesBills || bills || []) {
    if (!b?.invoiceDate || b.invoiceDate < from || b.invoiceDate > to) continue;
    const sign = countsAsSales(b) ? 1 : (isCreditNote(b) ? -1 : 0);
    if (!sign) continue;
    const fx = billRate(b, base);
    if (!fx) { skippedForeign += 1; continue; }
    const taxInclusive = !!b.data?.taxInclusive;
    (b.data?.items || []).forEach((it, i) => {
      const qty = Number(it?.quantity) || 0;
      if (!qty) return;
      const p = it.productId ? map.get(it.productId) : null;
      const id = p ? p.id : '__unlinked__';
      const row = rows.get(id) || { id, name: p ? p.name : 'Lines not linked to a product', unit: p?.unit || '', qty: 0, revenue: 0, cost: 0, costKnown: !!p };
      const unitCost = p && !isServiceProduct(p)
        ? (Number.isFinite(Number(it.costAtSale)) && it.costProductId === p.id ? Number(it.costAtSale) : (ledger.saleCost.get(`${b.id}|${i}`) || 0))
        : 0;
      row.qty = r3(row.qty + sign * qty);
      row.revenue = r2(row.revenue + sign * lineTaxable(it, taxInclusive) * fx);
      row.cost = r2(row.cost + sign * unitCost * qty);
      rows.set(id, row);
    });
  }
  const list = [...rows.values()].map((r) => {
    const profit = r.costKnown ? r2(r.revenue - r.cost) : null;
    return { ...r, profit, margin: profit !== null && r.revenue ? r2((profit / r.revenue) * 100) : null };
  }).sort((a, b) => (b.profit ?? -Infinity) - (a.profit ?? -Infinity));
  const known = list.filter((r) => r.costKnown);
  const total = {
    revenue: r2(known.reduce((s, r) => s + r.revenue, 0)),
    cost: r2(known.reduce((s, r) => s + r.cost, 0)),
  };
  total.profit = r2(total.revenue - total.cost);
  total.margin = total.revenue ? r2((total.profit / total.revenue) * 100) : null;
  return { rows: list, total, skippedForeign };
}

// Price history: when the selling price, MRP or purchase price on the product
// form changes, the old record gets a dated entry appended (newest last).
export function withPriceHistory(before, after, date) {
  const fields = ['sellingPrice', 'mrp', 'purchasePrice'];
  const was = before || {};
  const changed = fields.filter((f) => r2(was[f]) !== r2(after[f]));
  if (!before || !changed.length) return after;
  const entry = { date };
  for (const f of fields) entry[f] = r2(after[f]);
  return { ...after, priceHistory: [...(Array.isArray(was.priceHistory) ? was.priceHistory : []), entry].slice(-50) };
}
