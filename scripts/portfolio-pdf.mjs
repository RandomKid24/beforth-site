/**
 * Builds docs/BeForth-Portfolio.pdf from the live /portfolio page.
 *
 * Text and previews are read from the page itself, so the PDF can never say
 * something the site does not. Usage: node scripts/portfolio-pdf.mjs [origin]
 * (default http://localhost:3001, i.e. `npm run dev`).
 */
import puppeteer from 'puppeteer';
import { readFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ORIGIN = process.argv[2] ?? 'http://localhost:3001';
const OUT = path.join(ROOT, 'docs', 'BeForth-Portfolio.pdf');

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 2 });
await page.goto(`${ORIGIN}/portfolio`, { waitUntil: 'networkidle0' });
// Decline the consent banner so it is not in any screenshot.
await page.evaluate(() => {
  [...document.querySelectorAll('button')].find((b) => b.textContent === 'Decline')?.click();
  [...document.querySelectorAll('div')].filter((d) => d.textContent.startsWith('We use a live chat') && getComputedStyle(d).position === 'fixed').forEach((d) => d.remove());
});
await page.evaluate(() => document.fonts.ready);

const cards = [];
const thumbs = await page.$$('#systems li.surface > div:first-child');
for (let i = 0; i < thumbs.length; i++) {
  const img = await thumbs[i].screenshot({ encoding: 'base64' });
  const t = await page.evaluate((i) => {
    const li = document.querySelectorAll('#systems li.surface')[i];
    const body = li.children[1];
    return {
      sub: body.querySelector('.label:last-of-type')?.textContent,
      name: body.querySelector('h3').textContent,
      summary: body.querySelectorAll('p')[0].textContent,
      built: body.querySelectorAll('p')[1].textContent.replace(/^Built for\s*/, ''),
      caps: [...body.querySelectorAll('ul li')].map((c) => c.textContent),
      href: body.querySelector('h3 a').getAttribute('href'),
    };
  }, i);
  cards.push({ ...t, img });
}
const clients = await page.evaluate(() => [...document.querySelectorAll('#clients li')].map((li) => li.lastElementChild.textContent.trim()));
await browser.close();

const logo = (await readFile(path.join(ROOT, 'public', 'logo.png'))).toString('base64');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

const html = `<!doctype html><html><head><meta charset="utf-8"><title>BeForth Portfolio</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap">
<style>
@page { size: A4; margin: 0 }
:root { --paper:#F2F7F9; --bone:#D6E7F1; --ink:#231F20; --ash:#5F6571; --signal:#1C75BC; --wave:#75BAE6 }
* { box-sizing: border-box; margin: 0 }
body { font-family: "Plus Jakarta Sans", Arial, sans-serif; color: var(--ink); -webkit-print-color-adjust: exact; print-color-adjust: exact }
.p { width: 210mm; height: 297mm; padding: 18mm 16mm; background: var(--paper); page-break-after: always; position: relative; overflow: hidden; display: flex; flex-direction: column }
.p:last-child { page-break-after: auto }
.label { font-size: 8.5pt; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; color: var(--ash) }
.rule { height: 1px; background: rgba(35,31,32,.14); margin: 5mm 0 }
h1 { font-size: 46pt; font-weight: 800; letter-spacing: -.035em; line-height: .98 }
h2 { font-size: 26pt; font-weight: 700; letter-spacing: -.025em; line-height: 1.1 }
h3 { font-size: 16pt; font-weight: 700; letter-spacing: -.02em }
.accent { color: var(--signal) }
.lead { font-size: 13pt; line-height: 1.5; color: rgba(35,31,32,.8) }
.body { font-size: 10.5pt; line-height: 1.65; color: var(--ash) }
.chips { display: flex; flex-wrap: wrap; gap: 2mm }
.chip { font-size: 7.5pt; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; color: var(--ash); border: 1px solid rgba(35,31,32,.18); padding: 1.4mm 2.6mm }
.shot { border: 1px solid rgba(35,31,32,.14); background: var(--bone); margin: 6mm 0 }
.shot img { width: 100%; display: block }
.inc { list-style: none; padding: 0; columns: 2; column-gap: 8mm; margin-top: 3mm }
.inc li { font-size: 10.5pt; margin-bottom: 2mm; break-inside: avoid; color: var(--ink) }
.inc li::before { content: "✓ "; color: var(--signal); font-weight: 700 }
.band { position: absolute; left: 0; top: 0; bottom: 0; width: 6mm; background: var(--signal) }
.facts { display: flex; gap: 10mm; margin-top: 10mm }
.facts div { border-top: 1px solid rgba(242,247,249,.3); padding-top: 3mm; font-size: 10pt; color: rgba(242,247,249,.85); min-width: 34mm }
.facts b { display: block; font-size: 15pt; color: var(--paper); margin-bottom: 1mm }
.cl { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1px; background: rgba(242,247,249,.2); border: 1px solid rgba(242,247,249,.2); margin-top: 8mm }
.cl div { background: var(--ink); padding: 6mm 5mm; font-size: 12pt; font-weight: 700; letter-spacing: -.01em }
.foot { margin-top: auto; display: flex; justify-content: space-between; font-size: 8pt; color: var(--ash) }
.cover { background: var(--ink); color: var(--paper) }
.cover .label, .cover .lead { color: rgba(242,247,249,.75) }
.cover .accent { color: var(--wave) }
.cover .rule { background: rgba(242,247,249,.2) }
.demo { background: #fff; border: 1px solid rgba(35,31,32,.14); padding: 8mm; margin-top: 6mm }
.demo ul { list-style: none; padding: 0; margin-top: 4mm; columns: 2; font-size: 10pt }
.demo li { margin-bottom: 1.6mm }
.demo li::before { content: "✓ "; color: var(--signal); font-weight: 700 }
</style></head><body>

<section class="p cover">
  <div class="band"></div>
  <img src="data:image/png;base64,${logo}" style="height:13mm;width:auto;align-self:flex-start;margin-left:6mm;filter:invert(1) brightness(2)">
  <div style="margin:22mm 0 0 6mm;max-width:155mm">
    <span class="label">About BeForth</span>
    <p style="font-size:19pt;font-weight:700;letter-spacing:-.02em;line-height:1.3;margin-top:4mm">A Nashik-based IT company focused on <span class="accent">automation</span> for businesses in every industry.</p>
    <div style="margin-top:9mm;padding-left:5mm;border-left:2px solid var(--wave)">
      <span class="label">Our vision</span>
      <p class="lead" style="margin-top:2mm;color:var(--paper)">Business technology that is simpler, smarter and accessible to any company, at any size.</p>
    </div>
  </div>
  <div style="margin:auto 0 0 6mm">
    <span class="label">Company portfolio · ${new Date().getFullYear()}</span>
    <div class="rule"></div>
    <h1 style="font-size:58pt">Systems we build, <span class="accent">running.</span></h1>
    <p class="lead" style="margin-top:9mm;max-width:150mm">Custom ERP, CRM and HR software, plus the apps and websites around them, for manufacturing, pharma, distribution and service businesses.</p>
    <div class="facts"><div><b>${cards.length}</b>systems</div><div><b>${clients.length}</b>named clients</div><div><b>2025</b>founded</div><div><b>Nashik</b>Maharashtra, India</div></div>
  </div>
  <div class="foot" style="color:rgba(242,247,249,.7);margin:16mm 0 0 6mm"><span>BeForth</span><span>beforth.in</span></div>
</section>

<section class="p">
  <span class="label">Contents</span>
  <div class="rule"></div>
  <h2>${cards.length} systems, <span class="accent">one partner.</span></h2>
  <ol style="margin-top:10mm;list-style:none;padding:0">
  ${cards.map((c, i) => `<li style="display:flex;gap:6mm;padding:3.4mm 0;border-bottom:1px solid rgba(35,31,32,.12);font-size:12pt"><span class="label accent" style="width:10mm;color:var(--signal)">${String(i + 1).padStart(2, '0')}</span><b style="flex:1;font-weight:700">${esc(c.name)}</b><span class="body" style="font-size:9.5pt">${esc(c.sub)}</span></li>`).join('')}
  </ol>
  <p class="body" style="margin-top:10mm;max-width:150mm">Previews are demonstrations on sample data. They show how each system behaves, not a client deployment. BeForth was founded in 2025 and is based in Nashik.</p>
  <div class="foot"><span>BeForth Portfolio</span><span>2</span></div>
</section>

${cards.map((c, i) => `
<section class="p">
  <div style="display:flex;justify-content:space-between"><span class="label accent" style="color:var(--signal)">${String(i + 1).padStart(2, '0')}</span><span class="label">${esc(c.sub)}</span></div>
  <div class="rule"></div>
  <h2>${esc(c.name)}</h2>
  <div class="shot"><img src="data:image/png;base64,${c.img}"></div>
  <p class="lead">${esc(c.summary)}</p>
  <p class="body" style="margin-top:5mm"><b style="color:var(--ink)">Built for</b> ${esc(c.built)}</p>
  <span class="label" style="display:block;margin-top:7mm">${c.name === 'Custom ERP' ? 'Modules' : 'Includes'}</span>
  <ul class="inc">${c.caps.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
  <div class="foot"><span>beforth.in${c.href}</span><span>${i + 3}</span></div>
</section>`).join('')}

<section class="p cover">
  <div class="band"></div>
  <span class="label" style="margin-left:6mm">Clients</span>
  <div class="rule" style="margin-left:6mm"></div>
  <h2 style="margin-left:6mm">Businesses that run on <span class="accent">our systems.</span></h2>
  <ol style="list-style:none;padding:0;margin:8mm 0 0 6mm">${clients.map((c, i) => `<li style="display:flex;gap:6mm;padding:3mm 0;border-bottom:1px solid rgba(242,247,249,.2);font-size:13pt;font-weight:700"><span class="label accent" style="width:10mm;color:var(--wave)">${String(i + 1).padStart(2, '0')}</span>${esc(c)}</li>`).join('')}</ol>
  <div style="margin:auto 0 0 6mm">
    <h1 style="font-size:40pt">Have a process in mind? <span class="accent">Let's talk.</span></h1>
    <p class="lead" style="margin-top:7mm;max-width:140mm">Tell us how the business runs today. We will tell you what we would build and where it starts.</p>
    <div style="margin-top:12mm;font-size:13pt;line-height:2"><div>support@beforth.in</div><div>+91 97661 83834</div><div>Nashik, Maharashtra, India</div><div class="accent">beforth.in</div></div>
  </div>
</section>
</body></html>`;

await mkdir(path.dirname(OUT), { recursive: true });
const b2 = await puppeteer.launch({ headless: true });
const p2 = await b2.newPage();
await p2.setContent(html, { waitUntil: 'networkidle0' });
await p2.evaluate(() => document.fonts.ready);
await p2.pdf({ path: OUT, preferCSSPageSize: true, printBackground: true });
await b2.close();
console.log(`wrote ${path.relative(ROOT, OUT)} (${cards.length} systems)`);
