const ui = (s) => `<span class="ui">${s}</span>`;
const img = (f) => `assets/img/${f}`;
const key = (...k) => k.map((x) => `<kbd>${x}</kbd>`).join(' + ');

export default [
// =============================================================================
{
  slug: 'products',
  title: 'Products and stock',
  nav: 'Products and stock',
  lead: 'Save what you sell once, then pick it on every invoice. Stock goes down as you sell and up as you buy.',
  body: `
<section id="product-list">
<h2>The product list</h2>
<p>${ui('Products')} in the sidebar opens your catalogue. The table shows name, HSN/SAC, rate, GST %, unit and stock. Point at a name to see its description. Search by name or HSN.</p>
<figure><img src="assets/img/app-products.png" alt="The product list. Low stock shows in amber, none in red." loading="lazy"><figcaption>The product list. Low stock shows in amber, none in red.</figcaption></figure>
</section>

<section id="add-product">
<h2>Adding a product or service</h2>
<div class="table-wrap"><table>
  <tr><th>Field</th><th>What to know</th></tr>
  <tr><td>Product / Service Name</td><td>Required</td></tr>
  <tr><td>HSN / SAC Code</td><td>HSN for goods, SAC for services</td></tr>
  <tr><td>Purchase Price</td><td>What you pay the supplier. Filled in on new purchase bills.</td></tr>
  <tr><td>Selling Price</td><td>What you charge. Filled in on new invoices, and shown as the rate in the list.</td></tr>
  <tr><td>GST %</td><td>Type the rate, such as 18</td></tr>
  <tr><td>Unit</td><td>Pcs to start, or any unit from the list, including your own <a href="invoices.html#items">custom units</a></td></tr>
  <tr><td>Stock Quantity</td><td>How many you have now</td></tr>
  <tr><td>Description</td><td>For your own reference</td></tr>
</table></div>
<p>Deleting a product does not change invoices that used it.</p>
</section>

<section id="bulk-edit">
<h2>Changing many products at once</h2>
<p>${ui('Bulk edit')} turns the list into a grid you can type in: name, HSN/SAC, purchase price, selling price, GST %, unit and stock. Changed rows are highlighted. ${ui('Save changes')} saves them all in one go; ${ui('Cancel')} drops them. Search first to edit only some products.</p>
<p>A product needs a name, and GST % must be 0 to 100; if a row breaks a rule, nothing is saved and you are told which product to fix.</p>
<p>${ui('Print / PDF')}, ${ui('Excel')} and ${ui('CSV')} above the list save the products shown, with prices, GST and stock.</p>
</section>

<section id="stock">
<h2>How stock is counted</h2>
<ul>
  <li><strong>Selling</strong>: saving a Tax Invoice, Bill of Supply, Composition bill or Delivery Challan takes the quantity out, for rows picked from your products. Change the quantity later and save, and only the difference moves.</li>
  <li><strong>Returns</strong>: a Credit Note puts the quantity back.</li>
  <li><strong>Quotations and proformas</strong> move no stock. The invoice you convert them into does.</li>
  <li><strong>Buying</strong>: saving a <a href="purchases.html#stock">purchase bill</a> adds the quantity in, and adds any new item to your products.</li>
  <li><strong>Cancelling</strong> an invoice puts its stock back; un-cancelling takes it out again.</li>
</ul>
<p><b>Out of Stock</b> shows in red at zero or below. Purchases and deletions never take stock below zero; selling more than you have does, so you notice.</p>
</section>

<section id="low-stock">
<h2>Low-stock alerts</h2>
<p>A product at or below your threshold shows its stock in amber here, is listed on the Dashboard, and adds to the notification bell. The threshold is 5 to start; change it, or turn alerts off, in <a href="settings.html#stock">Settings</a>. It is one threshold for every product.</p>
</section>

<section id="import">
<h2>Importing products from a spreadsheet</h2>
<p>${ui('Import CSV')} loads a price list. The first row must name the columns:</p>
<table>
  <tr><th>Column heading</th><th>Holds</th></tr>
  <tr><td><code>name</code> (or <code>product</code>, <code>product name</code>)</td><td>Required</td></tr>
  <tr><td><code>hsn</code> (or <code>hsn code</code>, <code>sac</code>)</td><td>HSN or SAC code</td></tr>
  <tr><td><code>rate</code> (or <code>price</code>)</td><td>Selling price</td></tr>
  <tr><td><code>gst%</code> (or <code>tax%</code>, <code>taxpercent</code>, <code>tax</code>)</td><td>GST rate, such as 18. Note: no space before the %.</td></tr>
  <tr><td><code>unit</code></td><td>Nos if left out</td></tr>
  <tr><td><code>stock</code> (or <code>quantity</code>)</td><td>Opening stock</td></tr>
  <tr><td><code>description</code></td><td>Optional</td></tr>
</table>
<pre><code>name,hsn,rate,gst%,unit,stock
A4 Paper Ream,4802,280,12,Nos,50
Website Maintenance,998314,5000,18,Month,0</code></pre>
<p>Products you already have (same name) are skipped, so importing the same file twice is safe.</p>
</section>

<section id="manufacturing">
<h2>Manufacturing: making products from raw materials</h2>
<p>If you make what you sell, the app can use up raw materials and add the finished product to stock in one step. Turn it on first: <a href="settings.html#features">Settings → Features</a>, tick ${ui('Manufacturing (bill of materials)')}. It is off to start, and turning it off again hides it without deleting anything.</p>
<h3>1. Give the product its raw materials (bill of materials)</h3>
<p>Add each raw material as a normal product, with its purchase price and stock. Then open the finished product with ${ui('Edit')}, tick ${ui('Made here (from raw materials)')}, and for each material choose the product and type how much goes into <b>one</b> unit made. ${ui('Add material')} adds a line; the cross removes one. ${ui('Cost per unit')} below the list is the materials' purchase prices times those quantities. Click ${ui('Update')}.</p>
<p>A product cannot be in its own list, every quantity must be more than 0, and two products cannot use each other (chair uses seat, seat uses chair): the app tells you which and does not save.</p>
<h3>2. Record what you made</h3>
<p>Click ${ui('Make')} at the top of Products. Choose the <b>Product made</b>, type the <b>Quantity made</b>, the <b>Date</b> and an optional <b>Note</b>. The table shows each raw material, how much will be used, the stock now and what will be left, and the finished product's stock after. Click ${ui('Save production')}.</p>
<p>If a raw material would go below zero, it is shown in red and you are asked to confirm with ${ui('Save anyway')}. That is fine when you record production late and have not entered the purchase bill yet.</p>
<h3>Worked example</h3>
<p>Kaveri Stationers makes chairs. One chair takes 4 chair legs (₹50 each), 1 seat (₹300) and 0.2 kg screws (₹400 a kg), so the cost per unit is 4 × 50 + 300 + 0.2 × 400 = <b>₹580</b>. Stock before: 100 legs, 20 seats, 5 kg screws, 3 chairs.</p>
<div class="table-wrap"><table>
  <tr><th>Make 10 chairs</th><th>Used</th><th>Stock after</th></tr>
  <tr><td>Chair leg</td><td>40</td><td>60</td></tr>
  <tr><td>Seat</td><td>10</td><td>10</td></tr>
  <tr><td>Screws</td><td>2 kg</td><td>3 kg</td></tr>
  <tr><td>Chair (made)</td><td>+10</td><td>13</td></tr>
</table></div>
<p>The entry's cost of materials is 10 × ₹580 = ₹5,800.</p>
<h3>The production list</h3>
<p>Under the product table, <b>Production</b> lists the entries of the business you have open, newest first. ${ui('From')} and ${ui('To')} limit the dates. The eye button shows the materials used, at the purchase prices of the day it was saved. The bin button deletes an entry after asking, and puts its stock back exactly: in the example, 40 legs, 10 seats and 2 kg screws back, 10 chairs out.</p>
<p>An entry cannot be edited: to change one, delete it and enter it again. The <a href="reports.html#stock">stock report</a> counts production by its date.</p>
</section>
`,
},
];
