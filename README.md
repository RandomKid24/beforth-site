# <p align="center">BEFORTH</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.0-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind-4.1-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind" />
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Framer_Motion-12.2-FF0055?style=for-the-badge&logo=framer" alt="Framer Motion" />
</p>

<p align="center">
  <strong>We build custom software — ERP, web platforms &amp; mobile apps.</strong><br />
  Software engineered around how your business actually works, not the other way around.
</p>

---

## ⚡ Quick Links

| [Live Demo](https://beforth.in) | [COLOR_PALETTE.md](COLOR_PALETTE.md) | [Contact](https://beforth.in/contact) |
| :--- | :--- | :--- |

---

## 🎨 Design System — "Signal Ink"

A high-contrast, professional palette in a **Paper / Ink / Deep / Signal / Muted**
family. Every color ships with an exact **CMYK** equivalent in
[`COLOR_PALETTE.md`](COLOR_PALETTE.md) so the site and printed brand documents
always match.

| Color | HEX (RGB) | CMYK | Role |
| :--- | :--- | :--- | :--- |
| **Paper** (Card Background) | `#F2F7F9` | `C 3 M 1 Y 0 K 2` | Main background |
| **Bone** (Light Wave) | `#D6E7F1` | `C 11 M 4 Y 0 K 5` | Section contrast |
| **Ink** (Black / Logo Ink) | `#231F20` | `C 0 M 11 Y 9 K 86` | Primary text, dark sections |
| **Ash** (Grey Tagline) | `#6D737F` | `C 14 M 9 Y 0 K 50` | Secondary text |
| **Signal** (Dark Wave) | `#1C75BC` | `C 85 M 38 Y 0 K 26` | Accent / primary |
| **Wave** (Middle Wave) | `#75BAE6` | `C 49 M 19 Y 0 K 10` | Accent on dark surfaces |

Tokens are defined in `src/index.css` via Tailwind v4 `@theme`.

### Typography
- **Everything:** `Plus Jakarta Sans`. `JetBrains Mono` appears only inside the demo dashboard.

### Design rules
`DESIGN_VAULT.md` is the source of truth for how the site looks and behaves. In short:
plain over clever, content visible immediately (no scroll reveals, parallax or decorative
texture), sentence-case buttons, one accent colour (`signal`), flat surfaces separated by
1px rules rather than shadows.

---

## 🧩 Site Structure

- **Home** — a clear narrative: what we do (ERP / web / mobile), why custom
  beats off-the-shelf, featured work, the delivery process, and a contact CTA.
- **Services** — the three core offerings plus the modules we deliver
  (ERP, CRM, HRMS, POS, automation) and our security guarantees.
- **About** — who we are, the mission, values, and quick stats.
- **Team** — the founding team behind the builds.
- **Contact** — lead-capture form with live availability + contact channels.

### Reusable UI Primitives (`src/index.css`)
- Layout: `wrap` · `section` · `rule`
- Type: `display-xl` · `display-lg` · `display-md` · `lead` · `body` · `label` · `accent` · `figure-cap`
- Buttons: `btn-solid` · `btn-signal` · `btn-line` · `btn-invert` · `ulink`
- Surfaces: `surface` · `surface-ink` · `field` · `flabel`

---

## 🚀 Getting Started

```bash
npm install        # dependencies
npm run dev        # local dev server (port 3000)
npm run build      # production build + static schema + prerender
npm run build:raw  # vite build only, no prerender (faster while iterating)
npm run prerender  # re-run prerendering against an existing dist/
npm run preview    # serve the production build
npm run lint       # TypeScript check (tsc --noEmit)
```

### Prerendering

`npm run build` prerenders all 15 routes to static HTML in `dist/<route>/index.html`.
This is not optional decoration — the app is a client-rendered SPA, and without it
the served HTML is an empty `<div id="root">`. Google will render the JavaScript,
but most AI answer-engine crawlers (ChatGPT, Perplexity, ClaudeBot) fetch raw HTML
and would see nothing.

**Browser for the build.** On Linux (Vercel, most CI) it uses
`@sparticuz/chromium`, a self-contained Chromium with its shared libraries
bundled. Vercel's build image cannot run a stock Chrome — it is missing
`libnspr4.so` and friends, and the process exits with code 127. On macOS and
Windows it falls back to puppeteer's own download. `scripts/install-browser.mjs`
skips the download entirely when the bundled build is present.

Three things make this safe to keep:

- **Assets are never stripped.** An earlier prerenderer removed the hashed CSS link
  and rewrote the bundle reference, which broke styling on every sub-route. This
  one asserts the stylesheet link survives on each page and fails the build if not.
- **External requests are blocked.** The Google Fonts stylesheet and the Tawk.to
  chat widget are denied during prerender. Fetching them detaches the renderer in
  the bundled browser and kills the run. It is also the correct behaviour:
  prerendering captures the page as a crawler sees it, so it should not depend on
  a third-party CDN. Both load normally in a real browser.
- **Each run is independent.** The SPA fallback serves a pristine snapshot of the
  built shell taken before any route is written. Serving `dist/index.html`
  directly would re-inject the home page's JSON-LD into other routes.

`scripts/verify-build.mjs` runs last and fails the build if any route is missing
content, an `<h1>`, a title, a description or its stylesheet — so a prerender that
silently fails cannot ship.

### Adding a route

1. Add the page component and its `<Route>` in `src/App.tsx`.
2. Add the path to `ROUTES` in `scripts/prerender.mjs`.
3. Add it to `public/sitemap.xml` and to the crumb map in `src/lib/schema.ts`.

Missing step 2 is the one that silently ships an empty page — the route will work
in a browser but the crawler gets nothing.

### Structured data

`src/lib/schema.ts` is the single source of truth. The organization-level graph is
written statically into `index.html` by `scripts/emit-static-schema.mjs`; the
route-level graph (breadcrumbs, `FAQPage`, per-product `Service`) is injected by
the `StructuredData` component. Both are generated from the same module, so the
name, phone and address cannot drift between them.

Facts must be verifiable and published elsewhere on the site. There are no review
counts, ratings, founding dates or client names on this site, and none are invented
in the schema.

---

## ✍️ Content that needs real data

Two modules are deliberately **empty and gated**. They render nothing until genuine
content exists, because placeholder cards give crawlers nothing worth indexing and
read as filler to visitors.

- **`src/data/caseStudies.ts`** — set `live: true` on an entry once a real,
  verifiable engagement exists. `CaseStudyMetric` will not compile without a
  measured outcome, because a case study without one is not a case study.
- **`src/data/insights.ts`** — long-form articles. `TOPIC_BACKLOG` lists subject
  areas this company can speak to; it is a writing prompt, not published content.

Nothing in either file may be invented. No sample client names, no invented metrics,
no "50+ projects delivered".

---

<p align="center">
  Made with 💙 by <strong>BEFORTH</strong><br />
  <em>Bespoke software for ambitious businesses. Nashik · India · Worldwide.</em>
</p>