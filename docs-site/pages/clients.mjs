const ui = (s) => `<span class="ui">${s}</span>`;
const img = (f) => `assets/img/${f}`;
const key = (...k) => k.map((x) => `<kbd>${x}</kbd>`).join(' + ');

export default [
// =============================================================================
{
  slug: 'clients',
  title: 'Clients',
  lead: 'Everyone you bill, what each one owes, their account statement, and how quickly they pay.',
  body: `
<section id="client-list">
<h2>The client list</h2>
<p>Every client you have saved, and every name you have invoiced, appears as a card, with the ones who owe the most at the top. <b>Search clients…</b> finds them by name.</p>
<p>Each card shows the number of invoices, the state and GSTIN, and three figures: <b>Total</b>, <b>Paid</b>, and <b>Outstanding</b> in red, or <b>Overpaid</b> in blue if they have paid too much. Only real sales count: credit notes are subtracted, and quotations, estimates, challans and cancelled invoices are left out. Click a card to open it.</p>
<p>Your client list is shared by all your businesses, since the same customer may buy from each.</p>
</section>

<section id="client-form">
<h2>Adding and editing a client</h2>
<p>${ui('Add Client')} opens the form. The same form opens from the invoice screen.</p>
<div class="table-wrap"><table>
  <tr><th>Field</th><th>What to know</th></tr>
  <tr><td>Client / Business Name</td><td>Required</td></tr>
  <tr><td>Address, City, PIN Code</td><td>The postal label changes with the country</td></tr>
  <tr><td>Country</td><td>Starts as your own country. Changing it clears the state.</td></tr>
  <tr><td>State</td><td>A list for India, a text box for countries without one</td></tr>
  <tr><td>GSTIN</td><td>Checked when you leave the box, as on the invoice: the state is filled in if blank, and typos and a mismatched state are pointed out. See <a href="invoices.html#gstin-check">What the GSTIN check tells you</a>.</td></tr>
  <tr><td>Email, Phone</td><td>The phone number is used for WhatsApp</td></tr>
  <tr><td>SEZ unit / Developer</td><td>India only. Charges IGST whatever their state, under section 16 of the IGST Act.</td></tr>
</table></div>
<p>Under <b>Print preferences (optional)</b>, a client can have a <b>preferred paper size</b>, a <b>preferred currency</b> and <b>Auto-print on save</b>. They are applied whenever you pick this client on a new invoice.</p>
</section>

<section id="ledger">
<h2>A client's account</h2>
<p>Open a card to see all their invoices, newest first, with date, number, type, amount and status. Each row has buttons to edit, duplicate, share on WhatsApp, email or delete it. The status can be changed from the row too; choosing Paid records a payment for the balance, as on the Dashboard.</p>
<p>At the bottom: ${ui('Edit Client')} and ${ui('Delete Client')}, or, for a name that was never saved, ${ui('Save as Client')}. Deleting a client only removes them from your saved list; their invoices stay.</p>
<p>Deleting an invoice here moves it to the Trash for 30 days. It can be restored from <a href="backup.html#trash">Settings, Trash bin</a>. For an invoice already given to a client, <a href="dashboard.html#cancel">cancel it</a> instead, so its number stays in your records.</p>
<figure><img src="assets/img/app-clients.png" alt="A client opened, with their invoices, ageing strip and PDFs." loading="lazy"><figcaption>A client opened, with their invoices, ageing strip and PDFs.</figcaption></figure>
</section>

<section id="ageing">
<h2>Ageing: who is slow to pay</h2>
<p>When a client owes money, a strip shows it split by how late it is: <b>Current</b> (up to 30 days), <b>31-60 days</b>, <b>61-90 days</b> and <b>90+ days</b>. Lateness is counted from the due date, or from the invoice date when there is none.</p>
</section>

<section id="statement">
<h2>Statement and ageing PDFs</h2>
<ul>
  <li><strong>Statement PDF</strong>: their whole account, from your business to theirs. It has a summary of invoices, total billed, paid and outstanding, then every invoice, credit note and payment with a running balance marked Dr (they owe you) or Cr (you owe them), and a closing balance. Send it when a bill is disputed.</li>
  <li><strong>Aging PDF</strong>: only what is outstanding, invoice by invoice, with how many days old each is, and totals for each group. Amounts over 60 days are in red. Useful for collection calls.</li>
</ul>
</section>

<section id="import-csv">
<h2>Importing clients from a spreadsheet</h2>
<p>${ui('Import CSV')} adds clients from a CSV file, one per row. Save your spreadsheet as CSV first. The first row must name the columns:</p>
<table>
  <tr><th>Column heading</th><th>Holds</th></tr>
  <tr><td><code>name</code> (or <code>client</code>, <code>client name</code>)</td><td>Required. Rows without a name are skipped.</td></tr>
  <tr><td><code>address</code>, <code>state</code>, <code>gstin</code>, <code>email</code>, <code>phone</code></td><td>Optional</td></tr>
</table>
<pre><code>name,address,state,gstin,email,phone
Sharma Traders,12 MG Road,Punjab,03AAAAA0000A1Z5,accounts@sharma.example,9876543210</code></pre>
<p>Clients you already have (same name) are skipped, so importing the same file twice is safe. Other columns, such as city or PIN, are ignored.</p>
</section>
`,
},
];
