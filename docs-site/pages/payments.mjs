const ui = (s) => `<span class="ui">${s}</span>`;
const img = (f) => `assets/img/${f}`;
const key = (...k) => k.map((x) => `<kbd>${x}</kbd>`).join(' + ');

export default [
// =============================================================================
{
  slug: 'receipts',
  title: 'Payment receipts',
  lead: 'Receipts for money you have received, whether against an invoice or not, ready to print.',
  body: `
<section id="receipt-list">
<h2>The receipts list</h2>
<p>${ui('Receipts')} lists every receipt, newest first: date, receipt number, client, the invoice it was against, amount and mode. Search by client or receipt number. Each row can be printed, edited or deleted.</p>
<p>Recording a payment on the <a href="dashboard.html#payments">Dashboard</a> makes its own receipt, which you print from the payment history there.</p>
</section>

<section id="new-receipt">
<h2>Making a receipt</h2>
<ol class="steps">
  <li><strong>Start it</strong>Click ${ui('New Receipt')}.</li>
  <li><strong>Pick the invoice, if there is one</strong><b>Quick Select, Unpaid Invoices</b> lists up to 50 unpaid sales invoices. Picking one fills in the client, the amount still owed and the invoice number.</li>
  <li><strong>Fill in the rest</strong>Date, <b>Received From</b> (required), <b>Amount</b> (required), <b>Payment Mode</b>, <b>Reference / Transaction No</b>, <b>Against Invoice</b> and a note.</li>
  <li><strong>Save</strong>${ui('Save Receipt')} gives it the next receipt number.</li>
</ol>
<p>When <b>Against Invoice</b> exactly matches one of your invoice numbers, the payment is also recorded on that invoice, and its status becomes Partial or Paid. If it does not match any invoice, the receipt is saved on its own and you are told so.</p>
</section>

<section id="numbers">
<h2>Receipt numbers</h2>
<p>Receipts have their own series, starting RCP, and follow your <a href="settings.html#invoice-numbers">invoice number format</a>: separator, financial year and digits. If you set a brand prefix, it is used for receipts too. The next number is given when you save, unless you typed your own, which is kept.</p>
</section>

<section id="print">
<h2>Printing</h2>
<p>The print button opens the receipt in a new window and your print dialog. It shows your business name, address and GSTIN, <b>PAYMENT RECEIPT</b>, the receipt number, date, who paid, how, the reference and invoice, the amount in figures and words, any note, and lines for <b>Received By</b> and <b>Authorized Signatory</b>. If nothing happens, allow pop-ups for the app in your browser.</p>
</section>

<section id="delete">
<h2>Deleting a receipt</h2>
<p>Deleting a receipt removes only the receipt. A payment it recorded on an invoice stays there; delete that from the invoice's payment history on the Dashboard if it was a mistake.</p>
</section>
`,
},

// =============================================================================
{
  slug: 'cash-book',
  title: 'Cash book',
  lead: 'Every rupee that comes in or goes out in cash, with names and notes, and how much cash you should have in the drawer right now.',
  body: `
<section id="what-it-is">
<h2>What the cash book is for</h2>
<p>Use it for cash that does not belong on an invoice or a bill: money taken at the counter, an advance from a customer, salary paid in cash, tea and snacks, auto fare, money you take home, or cash you deposit in the bank. Each entry is either <b>Money in</b> or <b>Money out</b>, with an amount, a date, a name (who or what) and a note if you like.</p>
<p>Open it from ${ui('Cash book')} in the sidebar. If you do not see it, tick <b>Cash book</b> under <b>Menu</b> in <a href="settings.html#features">Settings, Features</a> and save. It is on to start, whatever your business type.</p>
<p>Each business has its own cash book, like its expenses and receipts. Switching the business at the top of the sidebar shows that business's cash.</p>
</section>

<section id="opening-balance">
<h2>Start with the cash you have today</h2>
<p>Count the cash in your drawer (or cash box) on the day you start, then add it as your first entry:</p>
<ol class="steps">
  <li><strong>Money in</strong>Make sure ${ui('Money in')} is selected (it turns green).</li>
  <li><strong>Amount</strong>Type the cash you counted, such as 12500.</li>
  <li><strong>Category</strong>Click the Category box and pick <b>Opening balance</b>.</li>
  <li><strong>Save</strong>Press Enter or click ${ui('Save')}.</li>
</ol>
<p>From then on, <b>Cash in hand</b> is this amount plus everything that comes in, less everything that goes out.</p>
</section>

<section id="add-entry">
<h2>Adding an entry</h2>
<p>The form is at the top of the screen, so you can add one entry after another without opening anything.</p>
<ol class="steps">
  <li><strong>In or out</strong>Click ${ui('Money in')} (green) for cash you received, or ${ui('Money out')} (red) for cash you paid.</li>
  <li><strong>Amount</strong>Required. More than 0, in rupees and paise.</li>
  <li><strong>Name</strong>Who paid you or whom you paid, or what it was for: "Ramesh", "Milk", "Auto". Your clients' names, and names you used before, appear as you type.</li>
  <li><strong>Category</strong>Optional. Pick one of Opening balance, Sales, Advance, Salary, Tea &amp; snacks, Transport, Owner drawing, Deposit to bank or Other, or type your own.</li>
  <li><strong>Date</strong>Today to start. Change it for an entry you forgot yesterday.</li>
  <li><strong>Note</strong>Optional, anything you want to remember.</li>
  <li><strong>Save</strong>Press Enter in any box, or click ${ui('Save')}.</li>
</ol>
<p>The entry appears in the list, and the amount, name, category and note are cleared for the next one. Money in or out and the date stay as they were, so ten counter sales in a row are quick.</p>
<p>If something is missing you see a message saying what to fix, such as "Enter an amount more than 0", and nothing is saved.</p>
</section>

<section id="from-elsewhere">
<h2>Cash already recorded in the app</h2>
<p>You do not type cash in twice. These show in the cash book on their own, with a small dashed label saying where they came from:</p>
<div class="table-wrap"><table>
  <tr><th>Label</th><th>Where it was made</th><th>Shows when</th></tr>
  <tr><td>Invoice INV-5 payment</td><td>A payment recorded on the <a href="dashboard.html#payments">Dashboard</a></td><td>The payment mode is Cash</td></tr>
  <tr><td>Receipt RCP/26-27/0012</td><td>A <a href="receipts.html">payment receipt</a></td><td>The payment mode is Cash</td></tr>
  <tr><td>Expense</td><td>An <a href="expenses.html">expense</a></td><td>The payment mode is Cash (money out)</td></tr>
</table></div>
<p>These lines cannot be edited or deleted in the cash book. Click the label to go to the screen it was made on, and change it there; the cash book follows.</p>
<p><strong>Counted once.</strong> Recording a payment on the Dashboard also makes a receipt, and a receipt against an invoice also records a payment on it. It is the same money, so the cash book shows it once, as the receipt.</p>
<p><strong>Purchase bills</strong> do not record how they were paid. When you pay a supplier in cash, add it here as ${ui('Money out')} with the supplier's name.</p>
<p>Invoices and receipts in another currency (export invoices in dollars, for example) are left out: the cash book is in rupees.</p>
</section>

<section id="cash-in-hand">
<h2>Cash in hand and the totals</h2>
<p>The cards at the top show:</p>
<ul>
  <li><b>Cash in hand</b>: all money in, less all money out, up to today. It turns red if it goes below zero, which usually means an entry is missing or the opening balance was not added.</li>
  <li><b>Today</b>: cash in and out today.</li>
  <li><b>This month</b>: cash in and out since the 1st.</li>
</ul>
<p>Count the drawer at the end of the day and compare it with Cash in hand. If they differ, look for an entry you forgot.</p>
</section>

<section id="list">
<h2>The list and the running balance</h2>
<p>The list is oldest first, like a paper cash book. Each line shows the date, name and note, category (or where it came from), the amount under <b>Money in</b> or <b>Money out</b>, and the <b>Balance</b>: the cash you had after that line.</p>
<p>The first line, <b>Opening balance (brought forward)</b>, is the cash you had when the chosen dates begin. The last line, <b>Closing balance</b>, is the cash at the end of them, with the total in and out.</p>
<p>Use the pencil to change one of your entries (it opens in the form at the top; click ${ui('Update')}), and the bin to delete it. Deleting asks first and cannot be undone.</p>
</section>

<section id="filters">
<h2>Choosing dates and searching</h2>
<p>The dates box shows <b>This month</b> to start. You can also choose <b>Last month</b>, <b>This financial year</b> (1 April to 31 March), <b>All dates</b>, or <b>Choose dates</b> to pick a from and to date.</p>
<p>The search box finds lines by name, note, category, where they came from, or amount. While you search, the totals at the bottom add up only the lines found; each line still shows its real balance. The ${ui('X')} button clears the search and goes back to This month.</p>
</section>

<section id="export">
<h2>Print, PDF and Excel</h2>
<p>${ui('Print / PDF')}, ${ui('Excel')} and ${ui('CSV')} above the list save the lines shown, with the dates and search you chose: the opening balance, each line with its balance, and the total. To make a PDF, click ${ui('Print / PDF')} and choose <b>Save as PDF</b> as the printer. The CSV opens in Excel too.</p>
<p>Your cash book is also saved in your backups. In <a href="backup.html#export-import">Export Backup</a> it travels with <b>Expenses</b>.</p>
</section>
`,
},

// =============================================================================
{
  slug: 'recurring',
  title: 'Recurring invoices',
  lead: 'Invoices that repeat on a schedule, such as a monthly retainer, rent or an annual maintenance contract.',
  body: `
<section id="two-ways">
<h2>Two ways to set one up</h2>
<ul>
  <li><strong>From an invoice</strong> (recommended): make the first invoice as usual, and under ${ui('Customize')} tick <a href="invoice-options.html#recurring">Make this a recurring invoice</a>. This keeps everything on the invoice, including taxes, terms and options, and lets you set <b>Every N</b> and an end date or number of invoices.</li>
  <li><strong>From the Recurring screen</strong>: ${ui('New Template')} with a client, frequency, next date, when to stop, type and simple item lines.</li>
</ul>
</section>

<section id="template-form">
<h2>The New Template form</h2>
<table>
  <tr><td>Quick Select Client</td><td>Fills in the client's name, GSTIN, state and address</td></tr>
  <tr><td>Client Name</td><td>Required</td></tr>
  <tr><td>Client GSTIN</td><td>Optional</td></tr>
  <tr><td>Frequency</td><td>Weekly, Monthly, Quarterly or Yearly</td></tr>
  <tr><td>Every</td><td>1 to 12. Monthly with 3 means every three months.</td></tr>
  <tr><td>Next Due Date</td><td>The 1st of next month, to start</td></tr>
  <tr><td>Stop</td><td><b>Never (until I stop it)</b>, <b>On a specific date</b>, or <b>After N invoices</b></td></tr>
  <tr><td>Invoice Type</td><td>Any of the six types</td></tr>
  <tr><td>Line Items</td><td>Description, Qty, Rate and GST%. At least one item with a rate is needed.</td></tr>
</table>
</section>

<section id="list">
<h2>The template list</h2>
<p>Each template shows the client, how often (such as "Every 3 months"), type, amount, next due date and whether it is <b>Active</b> or <b>Paused</b>. Its buttons: ${ui('▶')} Generate Now, Pause or Activate, Edit, and Delete. Editing keeps everything the form does not show, such as terms and options from the original invoice. Deleting a template stops future invoices; invoices already made stay.</p>
<p>When templates are due, a banner lists them, with a button for each to create its invoice now.</p>
<figure><img src="assets/img/app-recurring.png" alt="The recurring template list." loading="lazy"><figcaption>The recurring template list.</figcaption></figure>
</section>

<section id="automatic">
<h2>How invoices are created automatically</h2>
<p>A few seconds after the app starts, and then once a day while it is running, every active template whose date has come creates its invoice, with a fresh number and that day's date. Its next date then moves on by the schedule, and it stops at its end condition.</p>
<p>The notification bell tells you how many were created. They appear on the Dashboard, ready to check and send.</p>
<p>If the app was closed for a while, one invoice is created each time it catches up, so a missed month is not skipped.</p>
</section>

<section id="generate-now">
<h2>Generate Now</h2>
<p>${ui('▶')} creates the invoice straight away, even if the template is paused or not yet due, exactly as the automatic run would: same tax, a fresh number, today's date. Its next date moves on by the schedule and it counts towards "After N invoices". Once a template has reached its end, it says so instead. Open the new invoice from the Dashboard to check it before sending.</p>
</section>
`,
},
];
