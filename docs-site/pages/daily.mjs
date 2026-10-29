const ui = (s) => `<span class="ui">${s}</span>`;
const img = (f) => `assets/img/${f}`;

export default [
// =============================================================================
{
  slug: 'dashboard',
  title: 'Dashboard',
  lead: 'Your invoices at a glance: what you have sold, what you are owed, what is overdue, and every action you can take on an invoice.',
  body: `
<section id="header">
<h2>At the top</h2>
<p>The count beside the title is every document for the business selected in the sidebar, including estimates, challans and cancelled invoices. ${ui('New Invoice')} starts a blank invoice, and ${ui('CSV import / export')} brings in or saves many invoices at once (see <a href="#csv">below</a>). When a <a href="settings.html#lock">PIN</a> is set, ${ui('Lock')} locks the app straight away.</p>
<figure><img src="assets/img/app-dashboard.png" alt="The Dashboard with an overdue invoice, the four totals and low stock." loading="lazy"><figcaption>The Dashboard with an overdue invoice, the four totals and low stock.</figcaption></figure>
</section>

<section id="getting-started">
<h2>The Getting started list</h2>
<p>New installs show four steps. Each ticks itself off once you have really done it, and has a button that takes you there:</p>
<table>
  <tr><th>Step</th><th>Done when</th><th>Button</th></tr>
  <tr><td>Add your business details</td><td>A business name is saved</td><td>${ui('Open Settings')}</td></tr>
  <tr><td>Make your first invoice</td><td>Any invoice exists</td><td>${ui('Start')}</td></tr>
  <tr><td>Add your products or services</td><td>At least one product is saved</td><td>${ui('Open')}</td></tr>
  <tr><td>Add bank details or UPI</td><td>A bank account or UPI ID is saved</td><td>${ui('Open Settings')}</td></tr>
</table>
<p>It disappears when all four are done, or when you close it with ${ui('✕')}. <b>Read the 5-minute guide</b> opens this documentation in your browser.</p>
<figure><img src="${img('getting-started.png')}" alt="The Getting started list with three of four steps done"></figure>
</section>

<section id="support-card">
<h2>The support card</h2>
<p>Once you have made 10 invoices, a small card at the top asks, once a day, whether you would like to support the app, with how much users have given so far. ${ui('Support with UPI')} opens <a href="shortcuts.html#support">Support &amp; About</a>. ${ui('Not today')} hides it until tomorrow and ${ui('Hide for 30 days')} for a month. It never blocks your work and is never printed on an invoice.</p>
</section>

<section id="overdue">
<h2>Overdue invoices and reminders</h2>
<p>When any invoice is overdue, a red banner shows how many and how much is outstanding. Click the banner to show only overdue invoices.</p>
<p>${ui('Remind All')} lists each overdue invoice with the client, amount and phone number. ${ui('Remind')} opens WhatsApp with a polite reminder already written, such as "Invoice INV/0012 for ₹11,800 was due on 5 Sep 2026. Kindly arrange the payment…".</p>
</section>

<section id="totals">
<h2>The four totals</h2>
<table>
  <tr><td><b>Total Invoiced</b></td><td>The total of your sales, including GST</td></tr>
  <tr><td><b>Tax Collected</b></td><td>The GST on those sales</td></tr>
  <tr><td><b>Outstanding</b></td><td>What clients still owe on unpaid and part-paid invoices</td></tr>
  <tr><td><b>Invoices</b></td><td>How many sales documents there are</td></tr>
</table>
<p>They cover only the selected business and only real sales. Tax invoices, bills of supply and composition bills count. Credit notes are subtracted. Proforma estimates, delivery challans and cancelled invoices are left out. Foreign-currency sales are shown on their own line, never added to rupees.</p>
</section>

<section id="low-stock">
<h2>Low stock</h2>
<p>If alerts are on in <a href="settings.html#stock">Settings</a>, products at or below your threshold scroll past under <b>Low stock</b>, like a news ticker, with <b>Out of Stock</b> in red or the number left in amber. Point at it to stop it; click one to open Products.</p>
</section>

<section id="invoice-list">
<h2>Finding an invoice</h2>
<table>
  <tr><td>Search</td><td>By client name or invoice number</td></tr>
  <tr><td>Financial year</td><td>All years, or one of the last five</td></tr>
  <tr><td>Type</td><td>Any of the six document types</td></tr>
  <tr><td>Status</td><td>Unpaid, Partial, Paid, Overdue or Cancelled</td></tr>
  <tr><td>From / To</td><td>A range of invoice dates</td></tr>
</table>
<p>${ui('✕')} clears all filters at once.</p>
</section>

<section id="columns">
<h2>Choosing the columns</h2>
<p>${ui('Columns')} lets you show or hide: Date, Invoice #, Type, Client, Amount, Currency, Status, Due date, Print count and Actions. Currency, due date and print count are hidden to start. The <b>Paid</b> column is always shown. Your choice is remembered.</p>
<p>A yellow note icon next to a client means the invoice has a private note. Point at it to read it.</p>
</section>

<section id="status">
<h2>Status</h2>
<p>Each invoice is <b>Unpaid</b>, <b>Partial</b>, <b>Paid</b>, <b>Overdue</b> or <b>Cancelled</b>. Recording payments sets it for you. Each time the Dashboard opens, unpaid and part-paid invoices past their due date become Overdue, and the row shows how many days late they are.</p>
<p>You can also change it from the dropdown on the row. Choosing <b>Paid</b> records a payment for the rest of the balance, so your payment history stays complete.</p>
<p>Choosing <b>Unpaid</b> on a paid invoice takes back the payment that marking it Paid recorded, so the Paid column clears and ${ui('Send reminder')} comes back. Payments you recorded yourself stay; delete them under Payment History if they were wrong.</p>
<p>Only sales get paid, so only Tax Invoices, Bills of Supply and Composition bills have this dropdown. Quotations, proformas and delivery challans show <b>Open</b>, or <b>Converted</b> once turned into an invoice; credit notes show <b>Issued</b>. A cancelled one shows <b>Cancelled</b>; ${ui('Undo cancel')} is with its actions.</p>
</section>

<section id="payments">
<h2>Recording a payment</h2>
<ol class="steps">
  <li><strong>Open it</strong>Click the ${ui('₹')} Payment button on the invoice. The top line shows the total, what is paid, and the balance.</li>
  <li><strong>Fill it in</strong>Enter <b>Amount Received</b>, the <b>Payment Date</b> (today to start), the <b>Payment Mode</b> (Bank Transfer, UPI, Cash, Cheque, Card or Other), and a note such as the transaction ID.</li>
  <li><strong>Record it</strong>Click ${ui('Record Payment')}. The status becomes Partial or Paid, and a printable receipt opens.</li>
</ol>
<p>A cancelled invoice cannot take a payment; change its status back first.</p>
<p>If the amount is more than the balance, you are asked whether to record it as an overpayment. The extra is kept as the client's credit, to use on <a href="invoices.html#client-credit">their next invoice</a>.</p>
<p>Under <b>Payment History</b>, each payment has ${ui('Receipt')} to reprint it, a pencil to edit it, and a bin to delete it. The status is worked out again after any change.</p>
<figure><img src="assets/img/app-payment.png" alt="Recording the rest of a part-paid invoice. The earlier payment is under Payment History." loading="lazy"><figcaption>Recording the rest of a part-paid invoice. The earlier payment is under Payment History.</figcaption></figure>
</section>

<section id="receipt">
<h2>The payment receipt</h2>
<p>It shows your business details, <b>PAYMENT RECEIPT</b>, the receipt number, date, invoice, payment mode and note, "Received with thanks from" the client, the amount (in words for rupees), the invoice total, total paid and balance, and signature lines. ${ui('Print Receipt')} prints it on A5.</p>
</section>

<section id="row-actions">
<h2>What you can do with an invoice</h2>
<p>The row shows the actions you use most. The rest are in the ${ui('⋯')} menu at the end of the row; it closes with <kbd>Esc</kbd> or a click elsewhere.</p>
<table>
  <tr><td>👁 View</td><td>Shows the invoice exactly as it prints, without opening the editor. ${ui('Print')} prints it, <kbd>Esc</kbd> closes it. The slider at the bottom zooms the preview from 30% to 250% (${ui('−')} and ${ui('+')} step 10%); click the percentage to go back to the normal size. Zoom only changes the preview; the print is always full size.</td></tr>
  <tr><td>Edit</td><td>Opens it on the invoice screen.</td></tr>
  <tr><td>Duplicate</td><td>A new invoice with the same client and items, a new number and today's date. It starts Unpaid, with no payments.</td></tr>
  <tr><td>Print</td><td>Prints the invoice straight away, without opening it, then returns to the Dashboard.</td></tr>
  <tr><td>Convert to Tax Invoice</td><td>Quotations, proformas and delivery challans only, until they have been converted. See <a href="invoices.html#proforma-to-invoice">Turning a quote into an invoice</a>.</td></tr>
  <tr><td>₹ Payment</td><td>Record a payment, as above.</td></tr>
  <tr><td>WhatsApp</td><td>On a phone, attaches the PDF through your phone's share menu. On a computer, WhatsApp does not let websites attach files, so the chat with the client opens (using the phone number saved for them) with the invoice details, and the PDF is downloaded for you to drag into the chat.</td></tr>
  <tr><td>Send reminder</td><td>Shown for unpaid, part-paid and overdue invoices. Opens WhatsApp with a reminder suited to the situation.</td></tr>
  <tr><td>Email</td><td>Opens your email program with the subject and a short message. Add the address and attach the PDF yourself.</td></tr>
  <tr><td>Cancel</td><td>See <a href="#cancel">Cancelling an invoice</a>.</td></tr>
</table>
<p>A cancelled invoice keeps only View, Duplicate and ${ui('Undo cancel')}. A quotation, proforma or challan already converted keeps only View and Duplicate, so it cannot be changed or converted twice. Opened, either one is read-only: you can download or print it, not change it. Payments they already have stay viewable from the ${ui('₹')} button.</p>
</section>

<section id="cancel">
<h2>Cancelling an invoice</h2>
<p>${ui('Cancel')} asks first, then marks the invoice cancelled. It keeps its number, which GST requires, but no longer counts in totals, reports or GST returns, and any stock it used goes back. If you saved or printed its PDF, the copy in the <code>Saved Invoices</code> folder gets <b>CANCELLED</b> across every page.</p>
<p>To undo it, click the ${ui('Undo cancel')} arrow among the row's actions and answer <b>Yes, undo</b>. It goes back to Unpaid, Partial or Paid, from its payments, the stock is taken out again, and its saved PDF is put back exactly as it was. A cancelled invoice is never shown as overdue.</p>
</section>

<section id="csv">
<h2>Importing and exporting invoices as CSV</h2>
<p>For moving invoices in from Excel, Tally or another program, or out to your CA.</p>
<ol class="steps">
  <li><strong>Open it</strong>Click ${ui('CSV import / export')} at the top of the Dashboard.</li>
  <li><strong>Start from the template</strong>${ui('Template')} downloads a CSV with the right columns and an example. Fill it in with Excel or Google Sheets and save it as CSV. ${ui('Export all as CSV')} gives what you already have, in the same columns.</li>
  <li><strong>Choose the file</strong>${ui('Choose CSV file')} shows what will happen <b>before</b> anything is saved: how many are ready, which already exist and are skipped, and every row with a problem (a bad date, a missing rate). Rows with problems are not imported; fix the file and choose it again.</li>
  <li><strong>Import</strong>Click ${ui('Import')}. A message says how many were imported and skipped.</li>
</ol>
<p>One row per item. Rows with the same invoice number make one invoice; give the client, date and other invoice details on the first row (later rows may leave them blank). Column names are matched loosely, so <b>Qty</b> or <b>Quantity</b>, <b>GSTIN</b> or <b>Client GSTIN</b> both work. Dates can be <code>2026-10-01</code>, <code>01-10-2026</code> or <code>01/10/2026</code> (day first).</p>
<table>
  <tr><th>Column</th><th>What to put</th></tr>
  <tr><td>Invoice Number, Invoice Date</td><td>Required.</td></tr>
  <tr><td>Invoice Type</td><td>Tax Invoice (if blank), Bill of Supply, Composition, Quotation, Proforma, Delivery Challan or Credit Note.</td></tr>
  <tr><td>Due Date</td><td>Optional.</td></tr>
  <tr><td>Client Name, Client GSTIN, Client State, Client Address, Client Country</td><td>The name is required. A client already in Clients fills in the rest. The state can be a name, a 2-digit code, or left to the GSTIN.</td></tr>
  <tr><td>Place of Supply</td><td>Only if it differs from the client's state.</td></tr>
  <tr><td>Item Name, HSN/SAC, Quantity, Unit, Rate</td><td>Rate is required. A product of the same name fills in a missing HSN or unit.</td></tr>
  <tr><td>Discount</td><td>Rupees off that line.</td></tr>
  <tr><td>GST %, Cess %</td><td>Such as 18 and 0.</td></tr>
  <tr><td>Prices Include Tax</td><td>Yes if the rates already include GST.</td></tr>
  <tr><td>Notes</td><td>Printed on the invoice.</td></tr>
  <tr><td>Bill Discount, Round Off</td><td>For the whole invoice: rupees off after tax, and Yes to round the total to the rupee.</td></tr>
</table>
<p>GST, CGST + SGST or IGST and the totals are worked out exactly as on the invoice screen. An invoice number that already exists is <b>skipped, never overwritten</b>. Two different invoices with the same number (for example, numbering that restarts each year) are refused: give one of them its own number.</p>
<p>Two choices before importing: <b>Add new clients to Clients</b>, and <b>Take sold quantities out of product stock</b>. Leave stock off when importing old invoices whose stock you have already counted.</p>
</section>

<section id="quick-print">
<h2>Printing many invoices as one PDF</h2>
<p>The <b>Quick print</b> buttons combine invoices from the list as it is currently filtered into one PDF, one invoice per page:</p>
<ul>
  <li>${ui('All shown')}: every invoice in the list</li>
  <li>${ui('Unpaid')}: only those marked Unpaid, not part-paid or overdue</li>
  <li>${ui('Overdue')} and ${ui('Paid')}</li>
</ul>
<p>For more than five invoices, a message shows how far it has got. For more than 100, you are asked first.</p>
</section>

<section id="bulk">
<h2>Ticking several invoices</h2>
<p>Tick the box on each row, or the box in the header for every visible row. A bar appears with:</p>
<table>
  <tr><td>${ui('Mark paid')}, ${ui('Mark unpaid')}, ${ui('Mark overdue')}</td><td>Change them all, after asking. Mark paid records a payment for each balance.</td></tr>
  <tr><td>${ui('Export JSON')}</td><td>Saves the ticked invoices to a file, which can be imported as a backup.</td></tr>
  <tr><td>${ui('Bulk PDF')}</td><td>Combines the ticked invoices into one PDF, useful for your CA or for filing. ${ui('Cancel')} stops it part-way and keeps what is done.</td></tr>
  <tr><td>${ui('Cancel invoices')}</td><td>Cancels the ticked invoices, after asking, and puts their stock back. Marking cancelled invoices as anything else brings them back and takes the stock out again.</td></tr>
</table>
<p>Ticks stay when you change the filters, so check the count before acting.</p>
</section>
`,
},
];
