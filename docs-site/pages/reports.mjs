const ui = (s) => `<span class="ui">${s}</span>`;
const img = (f) => `assets/img/${f}`;
const key = (...k) => k.map((x) => `<kbd>${x}</kbd>`).join(' + ');

export default [
// =============================================================================
{
  slug: 'reports',
  title: 'Reports',
  lead: 'Profit and loss, who owes you and for how long, party outstanding by month, your best clients, your best-selling products, and closing stock with its value. Every report prints and downloads as Excel or CSV.',
  body: `
<section id="included">
<h2>What the reports include</h2>
<p>The sales tabs cover the business selected in the sidebar and count only real sales, as the Dashboard does: tax invoices, bills of supply and composition bills count; credit notes are subtracted; proforma estimates, delivery challans and cancelled invoices are left out. Purchase bills are not part of these reports, except <a href="#cost-centres">By cost centre</a>; they are in <a href="income-tax.html#itr-summary">Income Tax, ITR Summary</a>.</p>
</section>

<section id="export">
<h2>Printing and downloading a report</h2>
<p>Every report table has three buttons:</p>
<table>
  <tr><td>${ui('Print / PDF')}</td><td>Opens the table alone on its own page. Choose your printer, or <b>Save as PDF</b>.</td></tr>
  <tr><td>${ui('Excel')}</td><td>Downloads an <code>.xlsx</code> file. Amounts are numbers, so Excel can total and sort them.</td></tr>
  <tr><td>${ui('CSV')}</td><td>The same table as CSV, for any spreadsheet or your CA's software.</td></tr>
</table>
<p>They export what the screen shows: the period, currency and filters you chose. The Expense statement and Purchase register have the same buttons on their own screens.</p>
</section>

<section id="profit-loss">
<h2>Profit &amp; Loss</h2>
<p>Choose <b>Fiscal Year</b> or <b>Month / Year</b>. If you bill in more than one currency, a <b>Currency</b> choice appears, since different currencies are never added together.</p>
<table>
  <tr><td><b>Revenue (ex. tax)</b></td><td>Sales without GST</td></tr>
  <tr><td><b>Expenses (ex. GST)</b></td><td>Expenses without their GST</td></tr>
  <tr><td><b>Net Profit</b> or <b>Net Loss</b></td><td>The difference. Green for profit, red for loss.</td></tr>
  <tr><td><b>Margin</b></td><td>Profit as a percentage of revenue</td></tr>
</table>
<p>The <b>Profit &amp; Loss Statement</b> sets it out: total revenue, less GST collected; total expenses, less GST on expenses; and the result. The <b>Monthly Breakdown</b> shows revenue, expenses and profit or loss for each month with activity.</p>
<p>The same period choice appears on the Client Analytics and Product Performance tabs. Losses show with a minus sign.</p>
<figure><img src="assets/img/app-reports.png" alt="The Profit and Loss tab." loading="lazy"><figcaption>The Profit &amp; Loss tab.</figcaption></figure>
</section>

<section id="outstanding">
<h2>Outstanding &amp; Aging</h2>
<p>Every unpaid or part-paid invoice, whatever its date, grouped by how late it is: <b>Current (0-30 days)</b>, <b>31-60</b>, <b>61-90</b> and <b>90+ days</b>, counted from the due date.</p>
<p>The table lists client, invoice, date, due date, amount, paid, outstanding and days overdue, latest first, with the worst in red. <b>Filter by client name…</b> narrows the table and the totals together.</p>
</section>

<section id="party-outstanding">
<h2>Party Outstanding</h2>
<p>The same money owed, laid out the way Tally does it: one row per party, one column per month, a <b>Total</b> for each party on the right and for each month at the bottom. Each unpaid amount sits in the month of its invoice.</p>
<ul>
  <li>Choose <b>Financial year (Apr-Mar)</b>, the default, or <b>Calendar year (Jan-Dec)</b>, and the year.</li>
  <li>Bills from before that year that are still unpaid appear in an <b>Earlier</b> column, so nothing owed drops out of the total.</li>
  <li>${ui('Print / PDF')} opens the table on its own page, landscape; choose your printer or Save as PDF. ${ui('Excel')} and ${ui('CSV')} download it.</li>
</ul>
<p>Only sales count; estimates, challans and cancelled invoices are left out. With invoices in more than one currency, pick the currency.</p>
</section>

<section id="clients">
<h2>Client Analytics</h2>
<ul>
  <li><strong>Top clients by revenue</strong>: the ten who bought the most, with invoice counts.</li>
  <li><strong>Highest outstanding</strong>: the ten who owe the most, and what share of their billing is unpaid.</li>
  <li><strong>All clients breakdown</strong>: invoices, revenue, paid, outstanding and last invoice date for everyone.</li>
</ul>
<p>Revenue here includes GST.</p>
</section>

<section id="products">
<h2>Product Performance</h2>
<ul>
  <li><strong>Top revenue producers</strong>: the ten items that brought in the most.</li>
  <li><strong>Most units sold</strong>: the ten sold in the largest quantity.</li>
  <li><strong>All products</strong>: HSN, quantity sold, revenue, average rate, number of sales and when last sold.</li>
</ul>
<p>Revenue here is after line discounts and without tax. Credit notes are subtracted. Delivery charges are not a product and are left out.</p>
</section>

<section id="stock">
<h2>Stock</h2>
<p>Closing stock of every product at the end of a month, and what it is worth. Choose the month; the current month shows today's stock.</p>
<ul>
  <li><b>Closing qty</b> is worked back from today's stock, using the dates of your invoices, purchase bills and <a href="products.html#manufacturing">production entries</a>.</li>
  <li><b>Rate</b> is the purchase price. A product with no purchase price is valued at its selling price, marked with *.</li>
  <li><b>Value</b> is quantity × rate, with the <b>Total stock value</b> at the bottom. Negative stock shows in red and is not added in.</li>
</ul>
<p>Stock you typed in by hand on the Products screen has no date, so it counts as if it changed today. Products are shared by all your businesses, so this report covers every business.</p>
<figure><img src="assets/img/app-stock-report.png" alt="Reports, Stock: closing quantity, rate and value of each product, with the total stock value." loading="lazy"><figcaption>Closing stock and its value at the end of a month.</figcaption></figure>
</section>

<section id="cost-centres">
<h2>By cost centre</h2>
<p>A cost centre is a branch, a site or a project: "Branch: Jalandhar", "Site A - Ludhiana", "Project Mehta House". Tag your invoices, purchase bills and expenses with one, and this tab shows what each one sold, spent and earned. The feature is off to start.</p>
<ol>
  <li><b>Turn it on.</b> Settings, Features, under Reports tick <b>Cost centres</b>.</li>
  <li><b>Add your cost centres.</b> A <b>Cost centres</b> section appears in Settings, under Features. Type a <b>Name</b>, an optional <b>Code</b>, and click ${ui('+ Add cost centre')}. Each business has its own list.</li>
  <li><b>Tag your documents.</b> The new invoice form (Invoice Details), the purchase bill form and the expense form get a <b>Cost centre</b> box. Pick one, or leave it on <b>None</b>. A document has one cost centre; to split one bill between two sites, enter it as two bills.</li>
  <li><b>Tag old invoices in one go.</b> On the Dashboard, tick the invoices, then pick a centre from <b>Set cost centre…</b> in the bar that appears. <b>Remove cost centre</b> takes it off.</li>
  <li><b>Read the report.</b> Reports, ${ui('By cost centre')}. Choose the fiscal year or month at the top.</li>
</ol>
<table>
  <tr><td><b>Sales (taxable)</b>, <b>GST on sales</b>, <b>Sales total</b></td><td>As on the Profit &amp; Loss tab: credit notes are subtracted; cancelled invoices, estimates and challans are left out.</td></tr>
  <tr><td><b>Purchases (ex. GST)</b></td><td>The taxable value of your purchase bills</td></tr>
  <tr><td><b>Expenses (ex. GST)</b></td><td>Expenses without their GST</td></tr>
  <tr><td><b>Profit</b></td><td>Sales (taxable) minus purchases minus expenses</td></tr>
</table>
<p>Documents with no cost centre are added up in an <b>Untagged</b> row, so the <b>Total</b> row is the whole business. ${ui('Print / PDF')}, ${ui('Excel')} and ${ui('CSV')} download the table.</p>
<h3>Worked example</h3>
<p>Kaveri Stationers adds two cost centres, <b>Branch: Ludhiana</b> (code LDH) and <b>Project Mehta House</b>. In April it enters:</p>
<ul>
  <li>An invoice tagged Branch: Ludhiana: ₹10,000 + 18% GST = ₹11,800.</li>
  <li>An invoice tagged Project Mehta House: ₹20,000 + 18% GST = ₹23,600, and a credit note on it for ₹2,000 + ₹360 GST.</li>
  <li>A purchase bill tagged Project Mehta House: ₹8,000 + 18% GST.</li>
  <li>An expense tagged Branch: Ludhiana: shop rent ₹5,000, no GST.</li>
  <li>One old invoice with no cost centre: ₹1,000 + 18% GST.</li>
</ul>
<div class="table-wrap"><table>
  <tr><th>Cost centre</th><th>Sales (taxable)</th><th>GST on sales</th><th>Sales total</th><th>Purchases</th><th>Expenses</th><th>Profit</th></tr>
  <tr><td>Branch: Ludhiana (LDH)</td><td>10,000</td><td>1,800</td><td>11,800</td><td>0</td><td>5,000</td><td>5,000</td></tr>
  <tr><td>Project Mehta House</td><td>18,000</td><td>3,240</td><td>21,240</td><td>8,000</td><td>0</td><td>10,000</td></tr>
  <tr><td>Untagged</td><td>1,000</td><td>180</td><td>1,180</td><td>0</td><td>0</td><td>1,000</td></tr>
  <tr><td><b>Total</b></td><td>29,000</td><td>5,220</td><td>34,220</td><td>8,000</td><td>5,000</td><td>16,000</td></tr>
</table></div>
<h3>Renaming, archiving and filtering</h3>
<ul>
  <li>Edit (pencil) renames a cost centre; reports show the new name.</li>
  <li>Archive takes it out of the <b>Cost centre</b> box for new documents. Documents already tagged keep it, and it stays in the lists and in this report whenever it has something in the period. Restore brings it back. There is no delete, so old documents never lose their tag.</li>
  <li>The Dashboard, Purchases and Expenses lists get an <b>All cost centres</b> filter: pick one centre, or <b>No cost centre</b> to find what is still untagged.</li>
  <li>The cost centre is not printed on the invoice. Cost centres are part of your backup (they are saved with the settings).</li>
  <li>Turning the feature off hides the boxes, filters and this tab. The tags stay on your documents, and come back when you turn it on again.</li>
</ul>
</section>
`,
},
];
