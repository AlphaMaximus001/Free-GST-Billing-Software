// Gross profit by product for the period picked above the report: what each
// product sold for (before GST) less what the units sold had cost, at the
// moving average cost when they were sold (utils/costing.js). Credit notes
// take their goods back off. Invoices are this business's; costs come from
// every purchase bill, since products and stock are shared.
import { useEffect, useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { getAllBills, getAllProducts, getAllPurchases, getAllProductions } from '../store';
import { formatCurrency } from '../utils';
import { profitByProduct } from '../utils/costing';
import { baseCurrencyOf } from '../utils/fx';
import { toast } from './Toast';
import TableExport from './TableExport';

export default function ProductProfitReport({ bills, profile, from, to, periodLabel, businessName }) {
  const [data, setData] = useState(null);
  useEffect(() => {
    Promise.all([getAllProducts(), getAllBills(), getAllPurchases(), getAllProductions().catch(() => [])])
      .then(([products, allBills, purchases, productions]) => setData({ products: products || [], allBills: allBills || [], purchases: purchases || [], productions: productions || [] }))
      .catch(() => toast('Failed to load products and purchases', 'error'));
  }, []);

  if (!data) return <div className="glass-panel" style={{ padding: '1.25rem' }}>Working out costs…</div>;

  const base = baseCurrencyOf(profile);
  const { rows, total, skippedForeign } = profitByProduct({
    products: data.products, bills: data.allBills, purchases: data.purchases, productions: data.productions,
    salesBills: bills, from: from || '', to: to || '9999-12-31', base,
  });
  const money = (n) => (n === null || n === undefined ? '-' : formatCurrency(n, base));
  const pct = (n) => (n === null || n === undefined ? '-' : `${n}%`);
  const num = { textAlign: 'right', whiteSpace: 'nowrap' };

  return (
    <div className="glass-panel">
      <div className="table-header" style={{ flexWrap: 'wrap', gap: '0.75rem' }}>
        <h3>Gross profit by product{periodLabel ? `, ${periodLabel}` : ''}</h3>
        <TableExport title={`Gross profit by product ${periodLabel || ''}`.trim()} filename={`Gross-profit-${from || 'all'}-${to || ''}`}
          subtitle={[businessName, periodLabel, 'before GST, cost at moving average'].filter(Boolean).join(', ')}
          headers={['Product', 'Qty sold', 'Sales', 'Cost of goods sold', 'Gross profit', 'Margin %']}
          rows={rows.length ? [
            ...rows.map((r) => [r.name, r.qty, r.revenue, r.costKnown ? r.cost : '', r.profit ?? '', r.margin ?? '']),
            ['Total (products)', '', total.revenue, total.cost, total.profit, total.margin ?? ''],
          ] : []} />
      </div>
      {rows.length === 0 ? (
        <div className="empty-state">
          <TrendingUp size={48} />
          <p>No sales in this period.</p>
        </div>
      ) : (
        <div className="table-scroll">
          <table className="data-table" style={{ minWidth: 720 }}>
            <thead>
              <tr><th>Product</th><th style={num}>Qty sold</th><th style={num}>Sales</th><th style={num}>Cost of goods sold</th><th style={num}>Gross profit</th><th style={num}>Margin</th></tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td className="font-medium">{r.name}</td>
                  <td style={num}>{r.qty} {r.unit}</td>
                  <td style={num}>{money(r.revenue)}</td>
                  <td style={num}>{r.costKnown ? money(r.cost) : '-'}</td>
                  <td style={{ ...num, color: r.profit < 0 ? 'var(--danger)' : undefined, fontWeight: 600 }}>{money(r.profit)}</td>
                  <td style={num}>{pct(r.margin)}</td>
                </tr>
              ))}
              <tr style={{ fontWeight: 700, background: 'var(--bg-secondary)' }}>
                <td>Total (products)</td><td />
                <td style={num}>{money(total.revenue)}</td>
                <td style={num}>{money(total.cost)}</td>
                <td style={num}>{money(total.profit)}</td>
                <td style={num}>{pct(total.margin)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', padding: '0 1.25rem 1rem', margin: 0 }}>
        Sales are before GST, after each line&apos;s discount; a whole-bill discount is not spread over the lines. Cost is the average cost of the stock when the invoice was saved (kept on the invoice, so later purchases do not change it), or for older invoices, the average on the invoice date.
        Credit notes take their goods off. Services have no stock cost, so their profit is their sales. Lines typed without picking a product have no cost and are left out of the total.
        {skippedForeign ? ` ${skippedForeign} foreign-currency invoice${skippedForeign > 1 ? 's have' : ' has'} no exchange rate and ${skippedForeign > 1 ? 'are' : 'is'} left out.` : ''}
      </p>
    </div>
  );
}
