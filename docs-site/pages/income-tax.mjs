const ui = (s) => `<span class="ui">${s}</span>`;
const img = (f) => `assets/img/${f}`;
const key = (...k) => k.map((x) => `<kbd>${x}</kbd>`).join(' + ');

export default [
// =============================================================================
{
  slug: 'income-tax',
  title: 'Income tax helper',
  nav: 'Income tax',
  lead: 'Estimate your income tax under the old and new regimes, presumptive taxation, advance tax, bank statement import, and an ITR-4 summary to file from.',
  body: `
<div class="note warn"><strong>An estimate for one year</strong>
<p>The tax rules built in are for <b>FY 2025-26</b> (AY 2026-27). When today is in a later year, a banner says so, and invoices from the later year are not counted: enter that income yourself. Treat every figure as an estimate and have your CA confirm it before filing.</p></div>

<section id="tabs">
<h2>The five tabs</h2>
<table>
  <tr><td>Regime Calculator</td><td>Old and new regimes side by side, and which costs less</td></tr>
  <tr><td>Presumptive</td><td>Income under sections 44AD, 44ADA and 44AE</td></tr>
  <tr><td>Advance Tax</td><td>Instalments, and interest for paying late</td></tr>
  <tr><td>Bank Statement Import</td><td>Read a bank CSV and sort each transaction</td></tr>
  <tr><td>ITR Summary</td><td>The year in one place, and the ITR-4 summary PDF</td></tr>
</table>
<p>What you type on the first three tabs is remembered in this browser.</p>
</section>

<section id="regime-calculator">
<h2>Regime Calculator</h2>
<p>First tell it your <b>age</b> (under 60, 60 to 79, or 80 or older), whether your <b>parents are 60 or older</b>, and whether you are a <b>government employee</b>. These decide the old-regime slabs and the limits for 80D, 80DDB and 80CCD(2).</p>
<p>Then enter your income, in rupees, for the year:</p>
<ul>
  <li><strong>Gross Salary</strong>, as in box 1 of Form 16. The standard deduction is applied for you.</li>
  <li><strong>Business / Professional Income</strong>: filled in from your rupee sales, less purchases and business expenses, all without GST, if you leave it at zero. Change it if your books say otherwise.</li>
  <li><strong>House Property</strong> (rent less municipal tax and the 30% deduction; home-loan interest goes under 24(b) below), <strong>Other Sources</strong> such as bank interest, and <strong>capital gains</strong> on listed shares: short-term at 20%, long-term at 12.5% above ₹1.25 lakh.</li>
  <li><strong>Deductions</strong>, which only reduce old-regime tax: 80C, 80CCD(1B), 80D, 80TTA, 80TTB, 80E, 80G, 80GG, 80DDB, 80U and home-loan interest under 24(b). Each shows its limit.</li>
  <li><strong>80CCD(2)</strong>, employer NPS, allowed under both regimes.</li>
</ul>
<p>The right side shows each regime: gross income, deductions, taxable income, slab tax, capital-gains tax, rebate under 87A, surcharge, 4% cess and <b>Total Tax</b>. The cheaper one is marked <b>Recommended</b>, with how much it saves. To use the old regime you must file Form 10-IEA before the due date. ${ui('Reset')} clears everything.</p>

<figure><img src="assets/img/app-income-tax.png" alt="The Regime Calculator." loading="lazy"><figcaption>The Regime Calculator.</figcaption></figure>
</section>

<section id="presumptive">
<h2>Presumptive income</h2>
<p>Choose the section that fits you:</p>
<table>
  <tr><td><b>44AD</b></td><td>Trading, retail and manufacturing. Enter digital and cash turnover: 6% of digital and 8% of cash counts as income. The limit is ₹3 crore if cash is no more than 5% of turnover, otherwise ₹2 crore.</td></tr>
  <tr><td><b>44ADA</b></td><td>Professionals such as CAs, doctors, lawyers and consultants. 50% of receipts counts as income, up to ₹75 lakh of receipts (₹50 lakh if cash is over 5%).</td></tr>
  <tr><td><b>44AE</b></td><td>Owners of up to 10 goods vehicles. ₹1,000 per tonne per month for heavy vehicles, ₹7,500 per month for others.</td></tr>
</table>
<p>If your real profit is higher, enter it: you cannot declare less than the presumptive figure. Warnings appear if you are over a limit. ${ui('Use ₹… as Business Income')} copies the result into the calculator.</p>
</section>

<section id="advance-tax">
<h2>Advance tax</h2>
<p>Based on the recommended regime's tax, less <b>TDS already deducted</b>. If what is left is under ₹10,000, no advance tax is due.</p>
<p>Otherwise the schedule shows how much is due by 15 June (15%), 15 September (45%), 15 December (75%) and 15 March (100%). Tick <b>Presumptive</b> to pay it all by 15 March instead. Add the payments you made with ${ui('+ Add payment')}, and the interest for paying late or short, under sections 234B and 234C, is worked out.</p>
</section>

<section id="bank-import">
<h2>Bank statement import</h2>
<ol class="steps">
  <li><strong>Download a CSV</strong>From net-banking or your bank's app, save the statement for the year as CSV. Excel files must be saved as CSV first; PDFs are not accepted.</li>
  <li><strong>Drop it in</strong>SBI, HDFC, ICICI, Axis, Kotak, PNB and Yes Bank formats are recognised, and most others work too. It is read on your computer; nothing is uploaded.</li>
  <li><strong>Check the categories</strong>Each transaction is sorted by its description, such as salary, interest, rent received, investments, insurance, GST or business expense. Change any that are wrong. Mark your sales receipts as <b>Business receipts</b> yourself.</li>
  <li><strong>Push to the calculator</strong>${ui('Push to Calculator')} adds business receipts, interest, rent (less 30%), 80C and 80D to the calculator. Each statement can be pushed once; import it again to push a fresh copy.</li>
</ol>
<p>The imported statement is not kept after you leave the screen.</p>
</section>

<section id="itr-summary">
<h2>ITR Summary and the ITR-4 PDF</h2>
<p>The year's figures from the app: sales, trading purchases and business expenses (all without GST, and without drawings and asset purchases) and net business income, then salary, rent, other income and capital gains from the calculator, and the tax under each regime.</p>
<p>${ui('Download ITR-4 Summary')} makes a PDF with each ITR-4 (Sugam) field worked out, from income to deductions to tax and advance tax, to copy into incometax.gov.in or hand to your CA. ITR-4 is only for some taxpayers: if you have capital gains, or income above the limits, you need a different form.</p>
</section>
`,
},
];
