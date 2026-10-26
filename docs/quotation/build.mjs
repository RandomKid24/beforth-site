/**
 * Builds BeForth quotations as one-page A4 PDFs in docs/quotations/.
 *
 *   node docs/quotation/build.mjs
 *
 * To make a new quotation, copy one entry in QUOTES, change its fields, and run the
 * script. Amounts are in rupees. A line's discount is a fraction (0.2 = 20%), and the
 * amount is worked out from price and discount. Tax, "other" and discount lines only
 * appear when they are non-zero. Converted from Quotation_Format.xlsx.
 */
import { readFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..');
const OUT_DIR = path.join(ROOT, 'docs', 'quotations');

const COMPANY = {
  name: 'BeForth',
  lines: ['Nashik, Maharashtra - 422008', 'Phone: 9766183834'],
  preparedBy: 'Vivek Chandrashekhar Zope',
  contact: 'Vivek Zope, Phone: 9766183834, E-mail: vivek.zope@beforth.in',
  bank: [
    ['Name', 'Beforth'],
    ['Bank name', 'BOI'],
    ['IFSC no.', 'BKID0000838'],
    ['Account no.', '083820110000022'],
  ],
};

/** `blank: true` renders the layout with placeholders instead of data. */
const QUOTES = [
  {
    file: 'Quotation-B-2026-0023-Vaishnavi-Metals.pdf',
    number: 'B-2026-0023',
    date: '7 October 2026',
    validUntil: '17 October 2026',
    customer: ['Vaishnavi Metals', 'Chandrapur, Maharashtra'],
    items: [{ desc: 'Billing Module', price: 65000 }],
    notes: [
      'Any feature addition other than the SRS will be billed separately.',
      'Standard support included during business hours (Mon–Fri).',
      'Advance payment to be made (50%).',
      'Annual Maintenance Contract (AMC) for the system will be ₹3,000 per year, with a 3% annual increase applicable from each subsequent year.',
    ],
  },
  {
    file: 'Quotation-B-2026-0019-R1-Magnus-Enterprises.pdf',
    number: 'B-2026-0019-R1',
    date: '19 August 2026',
    validUntil: '29 August 2026',
    customer: ['Magnus Enterprises', 'Datir Mala, Plot no 9, Ambad Village,', 'Nashik, Maharashtra - 422010'],
    items: [
      { desc: 'Single Page Website', price: 5000, discount: 0.2 },
      { desc: 'Backend Dashboard', price: 3000 },
      { desc: 'Domain (3 Years)', price: 1800, subs: ['magnus-enterprises.in', 'magunsenterprise.co.in'] },
    ],
    notes: [
      'Advance payment to be made (50%).',
      'Standard support included during business hours (Mon–Fri).',
      'Domain and server charges will be covered by the client.',
    ],
  },
  {
    file: 'Quotation-Template-blank.pdf',
    blank: true,
    number: 'B-YYYY-NNNN',
    date: '[Date]',
    validUntil: '[Date + 10 days]',
    customer: ['[Customer name]', '[Address line 1]', '[City, State - PIN]'],
    items: [
      { desc: '[Item or module]', price: null },
      { desc: '[Item or module]', price: null },
    ],
    notes: ['[Payment terms, for example advance payment of 50%.]', '[Support and maintenance terms.]', '[Anything excluded from this price.]'],
  },
];

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const inr = (n) => '₹' + Number(n).toLocaleString('en-IN', { maximumFractionDigits: 2 });
const ph = (s) => `<span class="ph">${esc(s)}</span>`;

function render(q, logo) {
  const cell = (v) => (q.blank ? ph(v) : esc(v));
  const rows = q.items.map((it) => {
    const amount = it.price == null ? null : it.price * (1 - (it.discount ?? 0));
    it.amount = amount;
    const subs = (it.subs ?? []).map((s) => `<div class="sub">${esc(s)}</div>`).join('');
    return `<tr>
      <td>${cell(it.desc)}${subs}</td>
      <td class="r">${it.price == null ? ph('₹ 0') : inr(it.price)}</td>
      <td class="r">${it.discount ? Math.round(it.discount * 100) + '%' : '<span class="dash">—</span>'}</td>
      <td class="r b">${amount == null ? ph('₹ 0') : inr(amount)}</td></tr>`;
  });
  const subtotal = q.items.reduce((a, it) => a + (it.amount ?? 0), 0);
  const tax = q.tax ?? 0;
  const other = q.other ?? 0;
  const total = subtotal + tax + other;
  const tline = (label, v) => `<div class="tl"><span>${label}</span><b>${v}</b></div>`;
  const totals =
    tline('Subtotal', q.blank ? ph('₹ 0') : inr(subtotal)) +
    (tax ? tline('Tax', inr(tax)) : '') +
    (other ? tline('Other', inr(other)) : '');

  return `<!doctype html><html lang="en"><head><meta charset="utf-8"/>
<title>Quotation ${esc(q.number)} | BeForth</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"/>
<style>
  :root { --paper:#F2F7F9; --bone:#D6E7F1; --ink:#231F20; --ash:#5F6571; --signal:#1C75BC; --wave:#75BAE6; --rule:rgba(35,31,32,.14); }
  * { box-sizing: border-box; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  @page { size: A4; margin: 0; background: var(--paper); }
  body { margin: 0; background: var(--paper); color: var(--ink); font-family: "Plus Jakarta Sans", Arial, sans-serif; font-size: 9.6pt; line-height: 1.55; }
  .page { width: 210mm; height: 297mm; padding: 18mm 18mm 0; display: flex; flex-direction: column; position: relative; overflow: hidden; }
  .label { font-size: 7.2pt; font-weight: 600; letter-spacing: .09em; text-transform: uppercase; color: var(--ash); }
  .ph { background: var(--bone); border-bottom: 1pt dashed var(--signal); padding: 0 1.2mm; }

  .head { display: flex; justify-content: space-between; align-items: flex-start; }
  .head img { height: 12mm; }
  .head .co { margin-top: 3mm; font-size: 8.6pt; color: var(--ash); line-height: 1.6; }
  .head .co b { color: var(--ink); font-weight: 600; }
  .title { text-align: right; }
  .title h1 { margin: 0; font-size: 30pt; font-weight: 800; letter-spacing: -.04em; line-height: 1; }
  .meta { margin-top: 4mm; display: grid; grid-template-columns: auto auto; gap: 1mm 6mm; justify-content: end; text-align: right; }
  .meta .v { font-weight: 700; }
  .meta .v.q { color: var(--signal); }

  .rule { border-top: 1.2pt solid var(--ink); margin: 8mm 0 6mm; }
  .parties { display: grid; grid-template-columns: 1fr 1fr; gap: 8mm; }
  .card { background: #fff; border: .6pt solid var(--rule); border-top: 2pt solid var(--signal); padding: 4mm 5mm; }
  .card .name { font-size: 12pt; font-weight: 700; letter-spacing: -.01em; margin: 1mm 0 1mm; }
  .card p { margin: 0; font-size: 9pt; color: rgba(35,31,32,.85); }

  table { width: 100%; border-collapse: collapse; margin-top: 7mm; font-size: 9.4pt; }
  th { text-align: left; background: var(--bone); font-size: 7.3pt; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; padding: 2.6mm 3mm; border-bottom: 1.2pt solid var(--ink); }
  th.r, td.r { text-align: right; }
  td { padding: 3mm 3mm; border-bottom: .6pt solid var(--rule); background: #fff; vertical-align: top; }
  td.b { font-weight: 700; }
  .sub { font-size: 8.4pt; color: var(--ash); padding-left: 3mm; margin-top: .6mm; }
  .sub::before { content: "– "; }
  .dash { color: var(--ash); }

  .totals { margin: 5mm 0 0 auto; width: 78mm; }
  .tl { display: flex; justify-content: space-between; padding: 1.6mm 3mm; font-size: 9.4pt; }
  .tl b { font-weight: 600; }
  .grand { display: flex; justify-content: space-between; align-items: baseline; margin-top: 2mm; background: var(--ink); color: var(--paper); padding: 3.6mm 4mm; }
  .grand span { font-size: 8pt; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: var(--wave); }
  .grand b { font-size: 16pt; font-weight: 800; letter-spacing: -.02em; }

  .two { display: grid; grid-template-columns: 1.25fr 1fr; gap: 8mm; margin-top: 8mm; }
  ol.notes { list-style: none; counter-reset: n; padding: 0; margin: 2mm 0 0; }
  ol.notes li { counter-increment: n; display: flex; gap: 3mm; margin-bottom: 2mm; font-size: 9pt; }
  ol.notes li::before { content: counter(n); flex: none; width: 5mm; height: 5mm; border-radius: 50%; background: var(--signal); color: #fff; font-size: 7pt; font-weight: 700; display: flex; align-items: center; justify-content: center; margin-top: .3mm; }
  .bank { background: #fff; border: .6pt solid var(--rule); padding: 4mm 5mm; align-self: start; }
  .bank .row { display: flex; justify-content: space-between; gap: 4mm; padding: 1.4mm 0; border-bottom: .6pt solid var(--rule); font-size: 9pt; }
  .bank .row:last-child { border-bottom: 0; }
  .bank .row span { color: var(--ash); }
  .bank .row b { font-weight: 600; letter-spacing: .02em; }

  .foot { margin: auto -18mm 0; background: var(--ink); color: var(--paper); padding: 7mm 18mm; display: flex; justify-content: space-between; align-items: center; gap: 10mm; }
  .foot .t { font-size: 13pt; font-weight: 800; letter-spacing: -.02em; }
  .foot .c { font-size: 8.2pt; line-height: 1.6; color: rgba(242,247,249,.78); text-align: right; }
  .foot .c b { color: var(--wave); font-weight: 600; }
</style></head><body>
<div class="page">
  <div class="head">
    <div>
      <img src="${logo}" alt="BeForth"/>
      <div class="co">${COMPANY.lines.map(esc).join('<br/>')}<br/><span class="label">Prepared by</span> <b>${esc(COMPANY.preparedBy)}</b></div>
    </div>
    <div class="title">
      <h1>Quotation</h1>
      <div class="meta">
        <span class="label">Quote #</span><span class="v q">${cell(q.number)}</span>
        <span class="label">Date</span><span class="v">${cell(q.date)}</span>
        <span class="label">Valid until</span><span class="v">${cell(q.validUntil)}</span>
      </div>
    </div>
  </div>

  <div class="rule"></div>

  <div class="parties">
    <div class="card"><span class="label">Prepared for</span>
      <div class="name">${cell(q.customer[0])}</div>
      ${q.customer.slice(1).map((l) => `<p>${cell(l)}</p>`).join('')}
    </div>
    <div class="card"><span class="label">Prepared by</span>
      <div class="name">${esc(COMPANY.name)}</div>
      ${COMPANY.lines.map((l) => `<p>${esc(l)}</p>`).join('')}
    </div>
  </div>

  <table>
    <tr><th>Description</th><th class="r" style="width:26mm">Price</th><th class="r" style="width:22mm">Discount</th><th class="r" style="width:30mm">Amount</th></tr>
    ${rows.join('')}
  </table>

  <div class="totals">
    ${totals}
    <div class="grand"><span>Total</span><b>${q.blank ? ph('₹ 0') : inr(total)}</b></div>
  </div>

  <div class="two">
    <div><span class="label">Notes</span>
      <ol class="notes">${q.notes.map((n) => `<li><span>${q.blank ? ph(n) : esc(n)}</span></li>`).join('')}</ol>
    </div>
    <div class="bank"><span class="label">Bank details</span>
      ${COMPANY.bank.map(([k, v]) => `<div class="row"><span>${esc(k)}</span><b>${esc(v)}</b></div>`).join('')}
    </div>
  </div>

  <div class="foot">
    <div><div class="t">Thank you for your business!</div></div>
    <div class="c">If you have any questions about this price quote, please contact<br/><b>${esc(COMPANY.contact)}</b></div>
  </div>
</div>
</body></html>`;
}

async function main() {
  const logo = `data:image/png;base64,${(await readFile(path.join(ROOT, 'public', 'logo.png'))).toString('base64')}`;
  await mkdir(OUT_DIR, { recursive: true });
  const browser = await puppeteer.launch({ headless: true });
  for (const q of QUOTES) {
    const page = await browser.newPage();
    await page.setContent(render(q, logo), { waitUntil: 'networkidle0' });
    await page.evaluate(() => document.fonts.ready);
    await page.pdf({ path: path.join(OUT_DIR, q.file), preferCSSPageSize: true, printBackground: true });
    await page.close();
    console.log('wrote', path.join('docs', 'quotations', q.file));
  }
  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
