// Moving weighted average cost: old and new purchase prices both count.
//
// Run: `node scripts/costing-test.mjs`
//
// Reported: a new purchase bill at a higher rate re-valued the stock already
// on hand at the new rate, and profit on earlier sales was not kept.

import { costLedger, profitByProduct, withCostSnapshots, avgCostUpdates, lineTaxable } from '../src/utils/costing.js';
import { stockValueAt } from '../src/utils/products.js';

let passed = 0, failed = 0;
function eq(actual, expected, label) {
  const a = JSON.stringify(actual), e = JSON.stringify(expected);
  if (a === e) { passed++; console.log(`  ✓ ${label}`); }
  else { failed++; console.log(`  ✗ ${label}\n     expected: ${e}\n     actual:   ${a}`); }
}

// Yamaha F280: buy 6 at 6,000, sell 2 at 8,000, buy 6 more at 7,500.
const guitar = { id: 'g', name: 'Yamaha F280', unit: 'Nos', stock: 10, purchasePrice: 7500, sellingPrice: 9000 };
const purchases = [
  { id: 'p1', date: '2026-10-01', supplierName: 'Distributor', invoiceNumber: 'D-1', items: [{ productId: 'g', name: 'Yamaha F280', quantity: 6, rate: 6000 }] },
  { id: 'p2', date: '2026-10-20', supplierName: 'Distributor', invoiceNumber: 'D-2', items: [{ productId: 'g', name: 'Yamaha F280', quantity: 6, rate: 7500 }] },
];
const sale = { id: 'INV-1', invoiceDate: '2026-10-10', invoiceType: 'tax-invoice', status: 'unpaid',
  data: { items: [{ productId: 'g', name: 'Yamaha F280', quantity: 2, rate: 8000, taxPercent: 18 }], stockApplied: { g: -2 } } };
const bills = [sale];

let L = costLedger({ products: [guitar], bills, purchases });
let g = L.products.get('g');
eq([g.qty, g.avgCost, g.value], [10, 6900, 69000], 'after both purchases: 10 in stock, average 6,900, worth 69,000');
eq(g.lastPurchaseRate, 7500, 'last purchase rate still 7,500');
eq(g.purchases.map((x) => x.rate), [6000, 7500], 'purchase price history kept');
eq(L.saleCost.get('INV-1|0'), 6000, 'the October 10 sale cost 6,000 a guitar');

L = costLedger({ products: [guitar], bills, purchases, asOf: '2026-10-15' });
g = L.products.get('g');
eq([g.qty, g.avgCost, g.value], [4, 6000, 24000], 'as on 15 Oct: 4 left at 6,000 (not re-valued at 7,500)');

let P = profitByProduct({ products: [guitar], bills, purchases, from: '2026-10-01', to: '2026-10-31' });
eq([P.rows[0].revenue, P.rows[0].cost, P.rows[0].profit, P.rows[0].margin], [16000, 12000, 4000, 25], 'profit on the 2 sold: 4,000 (25%)');

// The next sale at 9,000 uses the new average: 2,100 profit a guitar.
const sale2 = { id: 'INV-2', invoiceDate: '2026-10-25', invoiceType: 'tax-invoice', status: 'unpaid',
  data: { items: [{ productId: 'g', quantity: 1, rate: 9000, taxPercent: 18 }], stockApplied: { g: -1 } } };
P = profitByProduct({ products: [{ ...guitar, stock: 9 }], bills: [sale, sale2], purchases, from: '2026-10-25', to: '2026-10-25' });
eq(P.rows[0].profit, 2100, 'next sale at 9,000: 2,100 profit');

// A snapshot saved on the invoice wins over the replayed average.
const snapSale = { ...sale, data: { ...sale.data, items: [{ ...sale.data.items[0], costAtSale: 5500, costProductId: 'g' }] } };
P = profitByProduct({ products: [guitar], bills: [snapSale], purchases, from: '2026-10-01', to: '2026-10-31' });
eq(P.rows[0].cost, 11000, 'saved cost at sale is used for profit');

// Snapshots: new lines get the average, existing ones keep theirs.
const items = withCostSnapshots([{ productId: 'g', quantity: 1 }, { productId: 'g', quantity: 1, costAtSale: 6000, costProductId: 'g' }, { name: 'free text' }],
  [{ ...guitar, avgCost: 6900 }]);
eq(items.map((i) => i.costAtSale), [6900, 6000, undefined], 'snapshot: new line 6,900, saved line keeps 6,000, unlinked line none');
eq(withCostSnapshots([{ productId: 'g', costAtSale: 1, costProductId: 'other' }], [guitar])[0].costAtSale, 7500, 'line moved to another product gets a new snapshot');

eq(avgCostUpdates([guitar, { ...guitar, id: 'x' }], costLedger({ products: [guitar], bills, purchases })).map((p) => [p.id, p.avgCost]), [['g', 6900]], 'avgCost stored on products that changed');

// Opening stock (no purchase bill) at the opening cost entered; then a purchase.
const amp = { id: 'a', name: 'Amp', stock: 5, purchasePrice: 3000, openingCost: 2000 };
L = costLedger({ products: [amp], purchases: [{ id: 'p', date: '2026-10-05', items: [{ productId: 'a', quantity: 2, rate: 3000 }] }] });
eq([L.products.get('a').qty, L.products.get('a').avgCost], [5, 2400], 'opening 3 at 2,000 + 2 at 3,000 = average 2,400');

// Credit note returns at the average; cancelled bills and quotes do nothing.
const cn = { id: 'CN-1', invoiceDate: '2026-10-12', invoiceType: 'credit-note', status: 'unpaid',
  data: { items: [{ productId: 'g', quantity: 1, rate: 8000 }], stockApplied: { g: 1 } } };
const cancelled = { ...sale, id: 'X', status: 'cancelled' };
L = costLedger({ products: [{ ...guitar, stock: 11 }], bills: [sale, cn, cancelled], purchases, asOf: '2026-10-15' });
eq([L.products.get('g').qty, L.products.get('g').avgCost], [5, 6000], 'credit note puts 1 back at 6,000');
P = profitByProduct({ products: [guitar], bills: [sale, cn], purchases, from: '2026-10-01', to: '2026-10-31' });
eq([P.rows[0].qty, P.rows[0].profit], [1, 2000], 'credit note takes its profit back');

// Same-day purchase is costed before the sale.
L = costLedger({ products: [{ id: 'n', name: 'N', stock: 0 }],
  purchases: [{ id: 'q', date: '2026-10-01', items: [{ productId: 'n', quantity: 1, rate: 100 }] }],
  bills: [{ id: 'S', invoiceDate: '2026-10-01', invoiceType: 'tax-invoice', data: { items: [{ productId: 'n', quantity: 1, rate: 150 }], stockApplied: { n: -1 } } }] });
eq(L.saleCost.get('S|0'), 100, 'bought and sold the same day: cost 100');

// Taxable value with prices including GST.
eq(Math.round(lineTaxable({ quantity: 1, rate: 1180, taxPercent: 18 }, true)), 1000, 'tax-inclusive line: taxable 1,000');

// Stock report value uses the average.
eq(stockValueAt(guitar, 4, { avgCost: 6000 }), { price: 6000, value: 24000, atCost: true }, 'stock report values at the average');

console.log(`\n${passed} passed, ${failed} failed`);
if (failed) process.exit(1);
