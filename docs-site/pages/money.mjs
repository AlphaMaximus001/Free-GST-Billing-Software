const ui = (s) => `<span class="ui">${s}</span>`;

export default [
// =============================================================================
{
  slug: 'gst-returns',
  title: 'GST returns',
  lead: 'GSTR-1 and GSTR-3B built from the invoices, purchases and expenses you have already entered, checked against GSTR-2B, and ready to upload to the GST portal.',
  body: `
<div class="note info"><strong>The app prepares, you file</strong>
<p>The app works out the figures and makes the files. It does not log in to the GST portal. Filing is always done by you, or your CA, on gst.gov.in.</p></div>

<section id="period">
<h2>Choosing the period</h2>
<p>At the top, pick <b>Monthly</b>, <b>Quarterly (QRMP)</b> or <b>Full Year</b>:</p>
<ul>
  <li><strong>Monthly</strong>: a month and year. This month to start.</li>
  <li><strong>Quarterly</strong>: Q1 (Apr-Jun), Q2 (Jul-Sep), Q3 (Oct-Dec) or Q4 (Jan-Mar), and a year. The year is the calendar year of those months, so the Jan-Mar 2027 quarter is Q4 with 2027.</li>
  <li><strong>Full Year</strong>: a financial year, such as FY 2026-27.</li>
</ul>
<p>Everything on the screen follows the period and the business selected in the sidebar.</p>
</section>

<section id="whats-included">
<h2>What is included</h2>
<ul>
  <li><strong>GSTR-1 and GSTR-3B</strong> use tax invoices and credit notes only.</li>
  <li>Proforma estimates, bills of supply, composition bills and delivery challans are left out. So are cancelled invoices.</li>
  <li>The <b>Documents issued</b> table lists every kind of document you numbered, as the portal asks.</li>
  <li>Input tax credit comes from your <a href="purchases.html">purchase bills</a> and <a href="expenses.html">expenses</a> with GST.</li>
</ul>
</section>

<section id="top-bar">
<h2>Filed status, portal link and warnings</h2>
<ul>
  <li><strong>R1 Filed / R1 Pending</strong> and <strong>3B Filed / 3B Pending</strong>: green when filed, red when not. Click to switch, if you marked one by mistake. The status is kept in this browser, for each business and period.</li>
  <li>${ui('GST Portal')} opens gst.gov.in.</li>
  <li>A <strong>red box</strong> lists problems to fix first, such as a client GSTIN in the wrong format, your own GSTIN missing, or export invoices that need adding on the portal by hand.</li>
  <li>If the period has no invoices and no expenses, a banner reminds you to <a href="#nil-return">file a NIL return</a>.</li>
  <li>The strip shows <b>Invoices</b>, <b>Taxable</b> value, <b>Tax</b> and <b>Net Payable</b> for the period.</li>
</ul>
</section>

<section id="gstr-1">
<h2>GSTR-1: your sales</h2>
<p>The GSTR-1 tab lays your sales out in the portal's tables:</p>
<div class="table-wrap"><table>
  <tr><th>Table</th><th>What is in it</th></tr>
  <tr><td>B2B Sales (4A)</td><td>Invoices to GST-registered clients, one row each: GSTIN, client, number, date, place of supply code, Inter or Intra, taxable value, CGST, SGST, IGST and total</td></tr>
  <tr><td>Credit/Debit Notes (9B)</td><td>Credit notes, to registered clients or marked Unregistered</td></tr>
  <tr><td>B2C Sales (7)</td><td>Sales to unregistered buyers, added up the way the portal's Table 7 takes them: one row for each supply type (intra-state or inter-state), place of supply (such as 10-Bihar) and tax rate. Inter-state B2C invoices above ₹1 lakh (₹2.5 lakh for invoices before 1 August 2024) are B2C Large (Table 5); they are listed under it, invoice by invoice. An inter-state sale whose place of supply is missing or is your own state is flagged in red: open the invoice and set the buyer's state.</td></tr>
  <tr><td>Document Summary (13)</td><td>Invoices, credit notes and delivery challans issued, one row for each number series, with the first and last number, the total and how many were cancelled. Quotations and proformas are not reported.</td></tr>
  <tr><td>HSN Summary (12)</td><td>Quantity, taxable value and tax for each HSN code. Items with no HSN show as N/A.</td></tr>
  <tr><td>Document Summary (13)</td><td>For each document type, the first and last number, how many were issued and how many of those were cancelled</td></tr>
  <tr><td>Summary Totals</td><td>B2B and B2C together, less credit notes</td></tr>
</table></div>
<p>Exports to clients abroad are not in the GSTR-1 file. The red box lists them: add them in Table 6A on the portal with the shipping bill details.</p>
<figure><img src="assets/img/app-gstr1.png" alt="The GSTR-1 tab for one month." loading="lazy"><figcaption>The GSTR-1 tab for one month.</figcaption></figure>
</section>

<section id="gstr-1-files">
<h2>GSTR-1 downloads</h2>
<table>
  <tr><td>${ui('JSON Export')}</td><td>The file you upload to the portal: <code>GSTR1_<i>GSTIN</i>_<i>MMYYYY</i>.json</code>. See <a href="#json-checks">Checks before the file is made</a>.</td></tr>
  <tr><td>${ui('B2B')}</td><td><code>GSTR1_B2B_Invoices.csv</code></td></tr>
  <tr><td>${ui('B2C')}</td><td><code>GSTR1_B2C_Small.csv</code>, and <code>GSTR1_B2C_Large.csv</code> if there are any</td></tr>
  <tr><td>${ui('HSN')}</td><td><code>GSTR1_HSN_Summary.csv</code>, with the unit code (UQC) for each unit</td></tr>
  <tr><td>${ui('CDNR')}</td><td><code>GSTR1_CDNR.csv</code> for credit notes to registered clients, <code>GSTR1_CDNUR.csv</code> for unregistered</td></tr>
  <tr><td>${ui('Docs')}</td><td><code>GSTR1_Doc_Summary.csv</code></td></tr>
  <tr><td>${ui('Mark Filed')}</td><td>Marks GSTR-1 filed for this period</td></tr>
</table>
<p>The CSV files are for checking and for your CA. The JSON is what the portal takes.</p>
</section>

<section id="json-checks">
<h2>Checks before the file is made</h2>
<p>The portal rejects some mistakes outright, so the app checks for them first.</p>
<p><strong>These stop the download until fixed:</strong></p>
<ul>
  <li>An invoice number longer than 16 characters, or with anything other than letters, digits, <code>-</code> or <code>/</code>.</li>
  <li>An item with a GST rate the portal does not accept. The app accepts 0, 0.1, 0.25, 1, 1.5, 3, 5, 6, 7.5, 12, 18, 28 and 40%.</li>
</ul>
<p><strong>These download with a warning:</strong></p>
<ul>
  <li>Items with no HSN code. They are left out of the HSN table.</li>
  <li>HSN codes shorter than 4 digits, or 6 if you ticked turnover above ₹5 crore in <a href="settings.html#gstr-details">Settings</a>.</li>
  <li>Custom units, which are sent as OTH (others).</li>
</ul>
<p>Your turnover figures for the JSON are set in <a href="settings.html#gstr-details">Settings, GSTR filing details</a>. They are optional.</p>
</section>

<section id="upload">
<h2>Uploading GSTR-1 to the portal</h2>
<ol class="steps">
  <li><strong>Download the JSON</strong>${ui('JSON Export')} on the GSTR-1 tab, for the right month.</li>
  <li><strong>Open the return</strong>Log in at gst.gov.in, go to <b>Returns Dashboard</b>, pick the period, and open GSTR-1.</li>
  <li><strong>Upload it</strong>Choose <b>Prepare Offline</b>, upload the JSON, and wait for it to be processed.</li>
  <li><strong>Add what the file cannot hold</strong>Exports, in Table 6A.</li>
  <li><strong>Check and file</strong>Compare the portal's summary with the app's totals, then file with DSC or EVC.</li>
  <li><strong>Mark it filed</strong>Back in the app, click ${ui('Mark Filed')}.</li>
</ol>
</section>

<section id="gstr-3b">
<h2>GSTR-3B: tax to pay</h2>
<table>
  <tr><th>Table</th><th>What it shows</th></tr>
  <tr><td>3.1 Outward supplies</td><td>(a) taxable sales, (b) zero-rated exports with their IGST, (c) nil</td></tr>
  <tr><td>3.2 Inter-state to unregistered</td><td>Your inter-state sales to unregistered buyers, by state</td></tr>
  <tr><td>4 Eligible ITC</td><td>Credit from purchases and expenses, by IGST, CGST and SGST</td></tr>
  <tr><td>6 Tax payment</td><td>Output tax, the credit used against it, and the <b>Net Tax Payable</b> for each tax, plus any credit carried forward</td></tr>
</table>
<p>Credit is used in the order the law sets: IGST credit first (against IGST, then CGST, then SGST), then CGST credit (against CGST, then IGST) and SGST credit (against SGST, then IGST). CGST credit never pays SGST, nor SGST credit CGST. So credit you hold in CGST and SGST can pay a tax that is all IGST.</p>
<p>The <b>Net GST Payable</b> box shows the amount to pay through the Electronic Cash Ledger, or "ITC covers your liability".</p>
<p>${ui('3B CSV')} and ${ui('3B JSON')} download it. The portal now fills most of GSTR-3B from your GSTR-1, so use the app's figures to check what it shows before you pay and file.</p>
<div class="note warn"><strong>Check the credit against GSTR-2B</strong>
<p>The credit here is everything you entered. Only what appears in your GSTR-2B can usually be claimed. Use the next tab to check.</p></div>
<figure><img src="assets/img/app-gstr3b.png" alt="The GSTR-3B tab." loading="lazy"><figcaption>The GSTR-3B tab.</figcaption></figure>
</section>

<section id="gstr-2b">
<h2>Checking your credit against GSTR-2B</h2>
<ol class="steps">
  <li><strong>Download GSTR-2B</strong>On the portal: <b>Returns</b>, <b>GSTR-2B</b>, <b>Download JSON</b>.</li>
  <li><strong>Import it</strong>On the <b>GSTR-2B Reconciliation</b> tab, click ${ui('Import 2B JSON')} and choose the file.</li>
  <li><strong>Read the results</strong>Each entry is matched to your purchase bills by the supplier's GSTIN and invoice number.</li>
</ol>
<table>
  <tr><td><b>✓ Matched</b></td><td>In both, and the amounts agree to within ₹1</td></tr>
  <tr><td><b>⚠ Amount mismatch</b></td><td>In both, but the amounts differ</td></tr>
  <tr><td><b>⚠ Books only</b></td><td>In your purchases but not in GSTR-2B. The supplier may not have filed yet.</td></tr>
  <tr><td><b>⚠ 2B only</b></td><td>In GSTR-2B but not entered in the app</td></tr>
</table>
<p>Click a count to show only those rows. ${ui('Export reconciliation CSV')} saves the result. Chase suppliers before claiming credit that is not in GSTR-2B.</p>
<p>The imported file is not kept: import it again after leaving the screen. Only B2B invoices in GSTR-2B are compared.</p>
</section>

<section id="tds-tcs">
<h2>TDS and TCS report</h2>
<p>The <b>TDS / TCS Report</b> tab adds up the period's invoices that have <a href="invoices.html#tds-tcs">TDS or TCS</a>:</p>
<ul>
  <li><strong>TDS Receivable</strong>: tax your clients should have deducted, which you claim against your own income tax. By quarter and section.</li>
  <li><strong>TCS Collected</strong>: tax you collected, which must be deposited and reported in Form 27EQ.</li>
</ul>
<p>${ui('Export TDS CSV')} and ${ui('Export TCS CSV')} list every invoice with quarter, section, rate, client, GSTIN, PAN, taxable value and amount. They are for your CA to prepare Form 26Q and 27EQ from; they are not the forms themselves.</p>
</section>

<section id="filing-guide">
<h2>The Filing Guide tab</h2>
<p>Step-by-step portal instructions inside the app, with due dates, late fees and interest:</p>
<ul>
  <li><strong>Regular Filing</strong>: GSTR-1 in 9 steps, then GSTR-3B in 7, with tips.</li>
  <li><strong>NIL Return</strong>: when a NIL return is due, and how to file it, including by SMS.</li>
  <li><strong>Common Errors &amp; Fixes</strong>: portal errors and what to do, and the GST rules worth remembering.</li>
</ul>
<p>Tick each step's circle as you go. The ticks are not saved.</p>
</section>

<section id="nil-return">
<h2>NIL returns</h2>
<p>If a period has no sales and no expenses, the app says so. A NIL return is still due, on time. The Filing Guide's <b>NIL Return</b> tab shows how, including by SMS to 14409.</p>
</section>

<section id="e-invoice">
<h2>E-invoicing (IRN)</h2>
<p>A business whose yearly turnover (aggregate, all GSTINs on one PAN) has been above <strong>₹5 crore</strong> in any year since 2017-18 must register its B2B invoices on the e-invoice portal. The portal gives each invoice an <b>IRN</b> (Invoice Reference Number) and a signed QR code, and an invoice without them is not valid. Below ₹5 crore you do not need any of this.</p>
<p>The app stays offline: it makes the file, you upload it, and you bring the IRN back. Turn on <b>E-invoicing (IRN)</b> in <a href="settings.html#features">Settings, Features</a> first; it is off to start.</p>
<ol class="steps">
  <li><strong>Download the e-invoice JSON</strong>For one invoice: open it, click ${ui('E-invoice')} in the toolbar, then ${ui('Download e-invoice JSON')}. For several: tick them on the <a href="dashboard.html">Dashboard</a> and click ${ui('E-invoice JSON')} in the bar that appears. Save the invoice first, so its number is final.</li>
  <li><strong>Upload it on the portal</strong>Log in at einvoice1.gst.gov.in, go to <b>e-Invoice</b>, <b>Bulk Upload</b>, choose the file and upload it. The portal returns the IRN, Ack No, Ack Date and Signed QR Code for each invoice; download that result as JSON.</li>
  <li><strong>Bring the IRN back</strong>On the Dashboard, click ${ui('Import IRN')} and choose that JSON file. Each IRN is saved on the invoice with the same number, date and GSTIN. Or open one invoice, click ${ui('E-invoice')}, paste the four values and click ${ui('Save IRN')}.</li>
</ol>
<p>From then on every design, A4 to thermal, prints <b>IRN</b>, <b>Ack No</b>, <b>Ack Date</b> and the QR code at the top of the invoice. The Dashboard marks such invoices <b>IRN</b>. Importing the IRN changes nothing else on the invoice.</p>
<p><strong>What goes in the file:</strong> tax invoices and credit notes to clients with a GSTIN, SEZ units and clients abroad (exports), in rupees. A credit note names its original invoice when that number is in the app. The amounts are the ones printed on the invoice, to the paisa. TCS goes in as other charges; a discount on the whole bill goes in as the invoice discount.</p>
<p><strong>What is checked first.</strong> Invoices with a problem are left out of the file and listed with what to fix:</p>
<ul>
  <li>a client with no GSTIN (a sale to a consumer needs no e-invoice), or a GSTIN that looks mistyped;</li>
  <li>a missing PIN code, city, address or state, yours or the client's (yours are in <a href="settings.html">Settings, Company Details</a>);</li>
  <li>an item with no HSN/SAC code, or one that is not 4, 6 or 8 digits;</li>
  <li>an invoice number longer than 16 characters, or with anything other than letters, digits, <code>/</code> and <code>-</code>;</li>
  <li>a date in the future, a cancelled invoice, an invoice in another currency, or one that already has an IRN.</li>
</ul>
<div class="note warn"><strong>Changing an invoice after its IRN</strong>
<p>The portal does not take changes to a registered invoice. Cancel it on the portal within 24 hours and make a new one, or issue a credit note. The app warns you when you open an invoice that has an IRN.</p></div>
<p>Businesses with turnover of ₹10 crore or more must report an invoice within 30 days of its date, or the portal refuses it.</p>
</section>
`,
},
];
