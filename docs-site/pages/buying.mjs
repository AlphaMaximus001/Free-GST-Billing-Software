const ui = (s) => `<span class="ui">${s}</span>`;
const img = (f) => `assets/img/${f}`;
const key = (...k) => k.map((x) => `<kbd>${x}</kbd>`).join(' + ');

export default [
// =============================================================================
{
  slug: 'purchases',
  title: 'Purchase bills',
  lead: 'Record every supplier bill, so the GST you paid comes back as input tax credit and your stock stays right. Includes reading a bill from a photo, and purchase orders to send suppliers.',
  body: `
<section id="purchase-list">
<h2>The purchase list</h2>
<p>At the top, <b>Total Purchases</b>, <b>GST (ITC Eligible)</b> and <b>Entries</b> add up what is shown. Search by supplier, invoice number or GSTIN, and pick a financial year (one of the last five) or All years.</p>
<p>The table shows date, supplier, GSTIN, invoice number, taxable value, tax, total, status and actions, with totals at the bottom. Each row has:</p>
<ul>
  <li>the eye, to view the bill without downloading anything;</li>
  <li>the pencil, to edit it;</li>
  <li>the bin, to delete it.</li>
</ul>
<p>The view has ${ui('Download PDF')}.</p>
</section>

<section id="add-purchase">
<h2>Adding a purchase bill</h2>
<p>${ui('Add Purchase')} opens the form:</p>
<div class="table-wrap"><table>
  <tr><th>Field</th><th>What to know</th></tr>
  <tr><td>Date</td><td>Today to start</td></tr>
  <tr><td>Payment Status</td><td>Unpaid, Paid or Partial</td></tr>
  <tr><td>Supplier Name</td><td>Required. Suppliers you have used before are suggested; picking one fills in their GSTIN, address and whether they are in another state.</td></tr>
  <tr><td>Supplier GSTIN</td><td>15 characters</td></tr>
  <tr><td>Supplier Address</td><td>Optional. Printed on the purchase bill PDF.</td></tr>
  <tr><td>Invoice Number</td><td>Required. The supplier's invoice number.</td></tr>
  <tr><td>Note</td><td>Optional</td></tr>
  <tr><td>Inter-state purchase</td><td>See <a href="#interstate">Suppliers in another state</a></td></tr>
</table></div>
<p>Each item row has <b>Name</b>, <b>HSN</b>, <b>Qty</b>, <b>Rate</b>, <b>Tax %</b> (0, 0.1, 0.25, 3, 5, 12, 18 or 28, or ${ui('Other…')} for any rate) and <b>Cess %</b>. Typing a name suggests your products and items from earlier bills, and fills in the HSN, rate and tax you used before. Clicking Qty, Rate or Cess selects what is in it, so typing replaces it.</p>
<p>A bill needs a supplier name, an invoice number, and at least one item with a quantity and rate.</p>
</section>

<section id="round-off">
<h2>Round-off</h2>
<p>If the supplier rounded their total to the rupee, tick <b>Apply round-off</b> so yours matches, for example ₹1,234.56 becomes ₹1,235. It is off to start, since most bills already match the line items.</p>
</section>

<section id="interstate">
<h2>Suppliers in another state</h2>
<p>If the supplier charged IGST because they are in a different state, the bill is <b>Inter-state purchase</b>, and the credit goes to IGST in GSTR-3B rather than CGST and SGST. The box ticks itself when you type the supplier's full GSTIN: its first two digits are their state code, compared with your business's. You can still change it for the rare exception.</p>
</section>

<section id="payment-status">
<h2>Paying suppliers</h2>
<p>Change a bill's status straight from the coloured <b>Status</b> dropdown in the list: <b>Unpaid</b> in amber, <b>Paid</b> in green, <b>Partial</b> in purple.</p>
<figure><img src="${img('purchase-status.png')}" alt="Purchase Records with a Status dropdown on each row"></figure>
</section>

<section id="stock">
<h2>What saving does to your products</h2>
<p>Each item on the bill is matched to your products by name:</p>
<ul>
  <li><strong>A product you already have</strong>: its stock goes up by the quantity, and its purchase price is updated. When you edit a bill, only the difference is added, and a row you remove is taken back out.</li>
  <li><strong>A new item</strong>: it is added to your products, with the rate as both purchase and selling price, and the quantity as its stock. Check its selling price afterwards.</li>
  <li><strong>Deleting a bill</strong> takes its quantities back out of stock.</li>
</ul>
</section>

<section id="ocr">
<h2>Reading a bill from a photo</h2>
<ol class="steps">
  <li><strong>Open it</strong>Click ${ui('Import from image (OCR)')}.</li>
  <li><strong>Choose the picture</strong>Click or drag a photo or scan of the bill: PNG, JPG or WebP, up to 8 MB. PDFs are not accepted; take a screenshot of the page instead.</li>
  <li><strong>Read it</strong>Click ${ui('Extract fields')}. It takes a few seconds, with a percentage showing progress.</li>
  <li><strong>Check everything</strong>The supplier, GSTIN, invoice number, date and grand total are filled in, with the line items it could read: name, HSN, quantity, rate and GST rate. Items that match your saved products take your stored HSN and GST rate. Fix anything wrong, add or remove rows.</li>
  <li><strong>Use it</strong>${ui('Use these values')} opens the purchase form with it all filled in. Check it once more and save.</li>
</ol>
<p>Everything is read on your computer, in English, with no internet needed and nothing uploaded. Sharp, straight, well-lit photos read best. If no items are found but a total is, one line with the total is added, for you to split into the real items.</p>
<p>The purchase form does not take the tax breakdown or grand total from the photo: it works them out from the items, so check they match the bill. Tick <b>Inter-state purchase</b> yourself if the bill shows IGST.</p>
</section>

<section id="export">
<h2>For your accountant</h2>
<p>${ui('Print / PDF')}, ${ui('Excel')} and ${ui('CSV')} above the list give the purchase register for the current search and year, oldest first, with a total row: date, supplier, GSTIN, invoice number, taxable amount, tax, cess, inter-state, round-off, total, status and note.</p>
</section>

<section id="csv-purchases">
<h2>Importing purchase bills from CSV</h2>
<ol class="steps">
  <li><strong>Open it</strong>Click ${ui('CSV import / export')} at the top of Purchases.</li>
  <li><strong>Start from the template</strong>${ui('Template')} downloads a CSV with the right columns and an example. Fill it in with Excel or Google Sheets and save it as CSV. ${ui('Export all as CSV')} gives what you already have, in the same columns.</li>
  <li><strong>Choose the file</strong>${ui('Choose CSV file')} shows what will happen <b>before</b> anything is saved: how many are ready, which already exist and are skipped, and every row with a problem (a bad date, a missing rate). Rows with problems are not imported; fix the file and choose it again.</li>
  <li><strong>Import</strong>Click ${ui('Import')}. A message says how many were imported and skipped.</li>
</ol>
<p>One row per item. Rows with the same supplier and invoice number make one bill. Columns: Invoice Number, Invoice Date, Supplier Name, Supplier GSTIN, Supplier Address, Item Name, HSN/SAC, Quantity, Rate, GST %, Cess %, Inter-state, Payment Status (Unpaid, Partial or Paid) and Note.</p>
<p>A bill already entered (same supplier and number, matched by GSTIN or by name) is skipped. If <b>Inter-state</b> is blank, it is worked out from the supplier's GSTIN. Quantities are added to product stock, as when you type a bill in.</p>
</section>

<section id="purchase-orders">
<h2>Purchase orders</h2>
<p>A purchase order (PO) is what you send a supplier before the goods come: what you want, how many, at what rate. It is not a bill, so it changes neither your stock nor your GST returns.</p>
<p>Turn it on in <a href="settings.html#features">Settings, Features</a>: tick <b>Purchase orders</b> under Purchases screen. Purchases then has two buttons at the top, ${ui('Purchase bills')} and ${ui('Purchase orders')}.</p>
<ol class="steps">
  <li><strong>Make one</strong>On ${ui('Purchase orders')}, click ${ui('New purchase order')}. Fill in the supplier (suppliers from your bills are suggested), <b>PO date</b>, <b>Expected delivery</b>, and the items: <b>Name</b>, <b>HSN</b>, <b>Qty</b>, <b>Unit</b>, <b>Rate</b>, <b>Tax %</b> and <b>Cess %</b>. Typing a name suggests your products and fills in their HSN, purchase price, GST and unit. Add delivery or payment terms under <b>Notes / terms</b>, then ${ui('Save')}.</li>
  <li><strong>Send it</strong>Click the eye to view it, then ${ui('Print')}, ${ui('Download PDF')}, ${ui('WhatsApp')} or ${ui('Email')}. The PDF has your business at the top, the supplier, the items, CGST and SGST (or IGST for a supplier in another state), the total, your notes and a signature box.</li>
  <li><strong>When the goods come</strong>Click ${ui('Convert to purchase bill')} (the green button on the row, or in the view). The purchase bill form opens with the supplier, items and rates filled in. Type the supplier's bill number, change any quantity to what actually came, and ${ui('Save')}.</li>
</ol>
<p>The <b>PO number</b> is filled in as PO/26-27/0001, counting up for each business. You can type your own; a number is never handed out twice, and one already used by another PO is refused.</p>
<div class="table-wrap"><table>
  <tr><th>Status</th><th>Means</th></tr>
  <tr><td>Open</td><td>No bill saved from it yet. You can edit it.</td></tr>
  <tr><td>Partly received</td><td>Bills saved from it have less than was ordered. ${ui('Convert to purchase bill')} again fills in only what is still to come.</td></tr>
  <tr><td>Received</td><td>Bills saved from it cover every item.</td></tr>
  <tr><td>Cancelled</td><td>You cancelled it with ${ui('Cancel order')} in the row's ⋯ menu. It keeps its number.</td></tr>
</table></div>
<p>Received and cancelled orders can only be viewed and duplicated (${ui('Duplicate')} in the ⋯ menu starts a new PO with the same supplier and items). Stock goes up only when the purchase bill is saved, as with any bill; deleting that bill takes the stock back out and puts the PO back to Open or Partly received. Search by PO number, supplier or GSTIN, and filter by status.</p>
</section>

<section id="unassigned">
<h2>"Not assigned to a business"</h2>
<p>If you have more than one business, bills saved before you started keeping them separate show under all of them, with a banner. ${ui('Assign to')} moves them all to the business now selected. Only do this if they belong to it. The same banner appears on Expenses, Recurring and Receipts.</p>
</section>
`,
},

// =============================================================================
{
  slug: 'expenses',
  title: 'Expenses',
  lead: 'Costs that are not stock, such as rent, electricity, software or travel, for your profit and loss and for the GST credit on them.',
  body: `
<section id="expense-list">
<h2>The expense list</h2>
<p><b>Total Expenses</b>, <b>GST Paid (ITC)</b> and <b>Entries</b> add up what is shown. Search by description, vendor or bill number, and filter by category and financial year. The table shows date, description, category, vendor, amount, GST and payment mode, with totals at the bottom.</p>
</section>

<section id="add-expense">
<h2>Adding an expense</h2>
<div class="table-wrap"><table>
  <tr><th>Field</th><th>What to know</th></tr>
  <tr><td>Date</td><td>Today to start</td></tr>
  <tr><td>Category</td><td>See the list below. Other to start.</td></tr>
  <tr><td>Description</td><td>Required, such as "AWS Hosting - March"</td></tr>
  <tr><td>Amount (incl. GST)</td><td>Required. The full amount you paid.</td></tr>
  <tr><td>GST % (for ITC)</td><td>The GST rate on the bill. The GST inside the amount is worked out and shown underneath.</td></tr>
  <tr><td>Vendor Name, Vendor GSTIN</td><td>Needed to claim the credit</td></tr>
  <tr><td>Invoice / Bill No</td><td>Optional</td></tr>
  <tr><td>Payment Mode</td><td>Bank Transfer, UPI, Cash, Cheque, Card or Other</td></tr>
  <tr><td>Inter-state expense</td><td>Tick when the vendor charged IGST, as with cloud and software firms billing from another state</td></tr>
  <tr><td>Note</td><td>Optional</td></tr>
</table></div>
</section>

<section id="categories">
<h2>Categories</h2>
<p>Office Rent, Utilities, Internet &amp; Phone, Software &amp; Tools, Travel, Meals &amp; Entertainment, Office Supplies, Salary &amp; Wages, Professional Fees, Insurance, Marketing &amp; Ads, Raw Materials, Shipping &amp; Courier, Repairs &amp; Maintenance, Bank Charges, GST Paid, Asset Purchase, Personal / Drawings, and Other.</p>
<p>The <a href="income-tax.html">Income Tax</a> screen leaves out <b>Personal / Drawings</b> and <b>Asset Purchase</b> when working out business income, since they are not business expenses for tax. The <a href="reports.html">profit and loss report</a> includes every category.</p>
</section>

<section id="gst-credit">
<h2>How the GST credit is used</h2>
<p>The GST on each expense is added to your input tax credit in <a href="gst-returns.html#gstr-3b">GSTR-3B</a>: to IGST if the expense is inter-state, otherwise split between CGST and SGST. Only claim credit you are entitled to: food, personal spending and bills without the vendor's GSTIN usually do not qualify. Check against GSTR-2B.</p>
</section>

<section id="export">
<h2>For your accountant</h2>
<p>The expense statement: ${ui('Print / PDF')}, ${ui('Excel')} and ${ui('CSV')} above the list save the rows shown, oldest first, with a total: date, description, category, amount, GST amount, GST %, vendor, vendor GSTIN, invoice number, payment mode, inter-state and note. Choose the year and a category, or search, first: for example, all Rent for the year.</p>
</section>
`,
},
];
