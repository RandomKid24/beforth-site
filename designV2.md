# BeForth — Design System V2

The reference for how this site looks, behaves and ships. Supersedes `DESIGN_VAULT.md`
for everything below; that document is kept as the original rationale and is no longer
edited.

Where the two disagree, **this one wins**. Last brought up to date: October 2026.

- Source of truth for tokens: `src/index.css`
- Source of truth for structured data: `src/lib/schema.ts`
- Source of truth for illustrations: `src/components/Doodles.tsx`
- Source of truth for articles: `src/data/insights.ts`
- Print equivalents: `COLOR_PALETTE.md`

---

## 1. The brief

The customers are owners and managers of manufacturing, pharma, distribution and
service companies. They are not here to be impressed. They are here to find out, in one
read, what we build and whether it fits.

So the site is **plain and legible first**. Every decision below follows from that, and
when a choice is only interesting rather than useful, it does not ship.

### First read

Before scrolling or clicking, a visitor must be able to answer:

1. **What do you make?** ERP, CRM and HR software, built custom.
2. **Who is it for?** Manufacturing, pharma, distribution and service firms.
3. **What next?** One primary button: "Start a project".

Hero headline: *Custom ERP, CRM and HR software for your business.* Name the product —
ERP, CRM, HR. No abstract promises like "software that fits…". One headline, one
paragraph, one button, one text link, and one drawing (section 6). No badges, counters
or tickers.

---

## 2. Colour

Seven tokens. Nothing else. Full RGB and CMYK in `COLOR_PALETTE.md`.

| Token | Hex | Use |
|---|---|---|
| `paper` | `#F2F7F9` | Page canvas. Default background. |
| `bone` | `#D6E7F1` | Section break, and flat fills inside drawings. |
| `ink` | `#231F20` | Body text, dark panels, borders, drawing line work. |
| `ash` | `#5F6571` | Secondary text, captions, metadata. |
| `signal` | `#1C75BC` | The single accent. Primary action, key words, active state, the "connected" parts of a drawing. |
| `wave` | `#75BAE6` | Accent **on dark surfaces only**. |
| `signal-deep` | `#165B93` | Hover / pressed for `signal`. Derived, not brand. |

### Rules

1. **One accent.** `signal` marks the main action and nothing more. If a second colour
   appears in a view, something is wrong.
2. **`ash` is secondary text only.** Contrast is about 5.4:1 on `paper` and 4.6:1 on
   `bone`, both above the AA threshold. It was `#6D737F` (4.4:1, just under AA) until the
   October 2026 accessibility audit. Use it for supporting copy and `ink` for anything
   the reader must act on.
3. **`wave` on dark, never `signal`.** `signal` on `ink` is only ~3.3:1. Faded text on
   dark surfaces (for example the struck-through "before" lines) stays at 65% opacity or
   higher so it clears AA.
4. **Separate with `bone` and a 1px rule**, never a shadow, gradient or glow.
5. **No decorative colour.** No grain, no blueprint grids, no tinted overlays. The one
   exception is the illustrations in section 6.

Status colours in the demo dashboard (emerald / amber / red) are semantic and sit
outside the brand palette by design.

**Known deviations from rule 4, still to be cleaned up:** the radial glow on the home
call-to-action card, the blurred blobs on the dark "What changes" panel, and the lift
shadow on hovered cards in "Why BeForth". Do not copy them.

---

## 3. Type

**Plus Jakarta Sans** for everything. **JetBrains Mono** only inside the demo dashboard.

| Role | Class | Size | Weight | Notes |
|---|---|---|---|---|
| Hero | `.display-xl` | `clamp(2rem, 5.6vw, 4.25rem)` | 800 | Tracking −0.035em, leading 0.95 |
| Section head | `.display-lg` | `clamp(1.7rem, 4vw, 3.2rem)` | 700 | Tracking −0.025em |
| Card / subhead | `.display-md` | ~1.25–1.5rem | 600 | Tracking −0.015em |
| Intro copy | `.lead` | 18–21px | 400 | Ink at 80% |
| Body | `.body` | 15–16px | 400 | Ash, leading 1.75 |
| Small body | `.body-tight` | 13.5px | 400 | Ash, leading 1.65 |
| Section label | `.label` | 12–13px | 600 | Uppercase, tracking 0.06em, **ash** |
| Caption | `.figure-cap` | 13px | 400 | Ash |
| Key word | `.accent` | — | — | `signal`, inline |

**Headings are left aligned**, always. Measure stays under 80 characters. `.label` is for
section names only — never for a sentence, and never above a heading that could stand
without it.

### Loading the font

- Fonts load from a **non-blocking `<link>`** in `index.html` (with `preconnect`), not a
  CSS `@import`, which blocked the first paint.
- `src/index.css` defines a **`Plus Jakarta Fallback`** face (Arial scaled to 104.3%, with
  matching ascent and descent) listed after Plus Jakarta Sans in the font stacks. It is
  measured against the real font, so text does not re-wrap and shift the page when the
  web font arrives. Re-measure it if the font or its weights change.

---

## 4. Layout

```
.wrap       max-w-[1280px], px-6 mobile / px-10 desktop, centred
.section    py-20 mobile / py-28 desktop
.rule       1px, ink/12 — the only divider
```

Alternate `paper` and `bone` backgrounds down a page to mark section breaks. Cards are
`.surface`: 1px border, square corners, white fill. Square corners are deliberate —
nothing on this site is rounded except pills and avatars.

**Page order (home):** Hero → What we do → Who it's for → What we build → The work
(dashboard) → How we work → Why BeForth → Selected work → Technology → Sectors → FAQ →
Contact.

### Page structure (every page)

- A **"Skip to content" link** is the first focusable element (visible on focus).
- Each page has exactly one **`<main id="main-content">`**, which wraps the routed page.
  Product pages and articles must not add their own `<main>`.
- Exactly one `<h1>` per page, and heading levels do not skip. Sample content inside a
  product mock-up is not a heading — use a `div`.
- Lists use real `<ul>`/`<ol>` with `<li>` as direct children. Do not wrap `<li>` in a
  `div` (the product page's step list did, and failed the accessibility audit).
- Hero drawings on About, Team, Contact and Insights are absolutely positioned at the
  right and shown from **1280px up** (`xl`). Below that they are hidden so the heading
  keeps its width. Product and 404 drawings are part of the layout and stack on phones.

---

## 5. Motion

**One orchestrated moment per navigation, and nothing else moves.**

The page transition is a plain CSS enter animation (`.page-enter` in `src/index.css`):

```
new page   480ms   fade in + 14px rise   cubic-bezier(0.22, 1, 0.36, 1)   enter only
```

- **Enter only.** No exit animation, no snapshots, no overlap. The previous version used
  the View Transitions API; it cross-faded whole tall pages and felt rough, and the lazy
  route code sometimes loaded mid-animation. `src/lib/pageTransition.ts` was deleted.
- Only `from` is keyframed and fill-mode is `backwards`, so **no transform is left on the
  element** afterwards (a leftover transform would break sticky and fixed children).
- The **first page a visitor lands on does not animate**, so prerendered content is never
  held at opacity 0. Only navigations animate. Each navigation starts at the top
  (hash links excepted).
- The navbar is outside the animated element, so its active-link highlight updates at once.
- **Route code is preloaded** so a click never waits on the network or flashes "Loading":
  `lazyRoute()` in `src/App.tsx` renders synchronously once a chunk has loaded (plain
  `React.lazy` always suspends once), `preloadRoute()` in `src/main.tsx` loads the current
  route before React starts so the prerendered HTML stays on screen, and every other route
  loads when the browser is idle.

### Rules

- **Motion answers an action or it does not ship.** Navigation, hover, form feedback.
  Not scroll-triggered reveals, parallax, marquees or entrance animations. Drawings are
  static.
- **`prefers-reduced-motion` disables all of it.** `.page-enter` is switched off.
  Navigation still works — only the movement goes.
- The interactive demo dashboard may animate its own data. That is the one exception.
- `.pulse-dot` is allowed on live-status indicators. It pauses when offscreen or when the
  tab is hidden, and stops under reduced motion.
- **Third-party widgets must not move the layout.** The Tawk.to chat widget loads on the
  visitor's first click, key press, touch or scroll — not on page load.

---

## 6. Illustration (doodles)

Hand-drawn-style line drawings. They were added in October 2026 because pages were all
text, and they are the **one deliberate exception to "no decoration"**.

### What they look like

- **Line work in `ink`**, 2–2.6px strokes, round caps and joins.
- **`signal` only for the "connected" or "working" part** of a drawing (the system, the
  route, the tick), and **`bone` for flat fills**. On dark panels the lines are `paper`
  and the accent is `wave`.
- **No gradients, no shadows.**
- **A slight wobble** from a shared SVG filter, so lines read as hand-drawn. `DoodleDefs`
  (rendered once in `App`) defines three filters: `sketch` (large drawings, low-frequency
  so lines bend rather than jitter), `sketch-md` (64px icons) and `sketch-sm` (24px
  icons). Filter values are in the SVG's own units, so use the one that matches the
  drawing's size.

### Rules

1. **Each drawing is drawn from the text on its own page.** It must show something that
   page actually says or does. A page whose text could swap with another page's drawing
   has the wrong drawing.
2. **Every drawing is unique.** Do not reuse a subject, composition or stock character
   across pages. If two drawings need the same object (a person, a speech bubble), they
   must differ in what they show. We removed the "+" spark that had crept onto nearly
   every drawing for exactly this reason; do not bring back a decorative motif that
   repeats.
3. **Facts only.** A drawing may contain only what the page already states: the founding
   year, the three people's initials, Nashik. Never invent a client, number or place.
4. **Decorative.** Inline SVG with `aria-hidden="true"` and `focusable="false"`. The page
   text must say everything the drawing shows. No images to download.
5. **Hide the wide ones on small screens** (see section 4), and keep them out of the way
   of text: place a drawing beside or below copy, never on top of it.

### Inventory

| Page | Component | Subject |
|---|---|---|
| Home hero | `HeroDoodle` | Messy spreadsheets, a phone full of chats and a sticky note turn into one connected system |
| Home, What we do | `HubDoodle` | A filing cabinet with five drawers (sales, inventory, service, finance, reporting) and one lock bar through all of them |
| Home, Who it's for | `SheetDoodle`, `SiteDoodle` | A spreadsheet bursting at the seams; a business card with a web address ("just need a simple website") |
| Home, How we work | `RoadDoodle` | A road with five stops and a flag, one stop per stage |
| Home, Why BeForth | `ReasonDoodle` (0–3), `TangleDoodle` | Magnifier, puzzle piece, pressed button, person with a headset; a coil that unwinds into a line and a tick |
| Home, Sectors; About sectors | `SectorIcon` | One small icon per sector |
| Home, FAQ | `FaqDoodle` | A question bubble, an answer bubble with a tick, a waving figure |
| Home, call to action | `PlaneDoodle` | Two speech bubbles and a paper plane on a looping trail |
| Each product page | `ProductDoodle` (by slug) | One scene per product: delivery route, salon calendar and scissors, HR clock and fingerprint, sales funnel, two phones, browser window, tunnel through a cloud, search ranking, payslip and bank, POS terminal and QR code |
| Services, Web and Mobile | `ProductDoodle` (`websites`, `mobile-apps`) | Fills the panel that has no capability list, with a link to the product page |
| About | `AboutDoodle`, `VisionDoodle`, `MissionDoodle`, `ValueDoodle` | A sapling growing out of a laptop with a "2025" tag and a Nashik pin; a telescope; an arrow in a target; a bulb, pencil, key and loop |
| Team | `TeamDoodle`, `DisciplineIcon` | One vignette per role on the page (growth bars and flag, database and services, wireframe and pen) joined by the initials VZ, RM, AB; one icon per capability |
| Contact | `ContactDoodle`, `ContactIcon` | A desk phone, a glass of chai and a letter; envelope, phone, pin and clock icons |
| Insights | `InsightsDoodle`, `ArticleDoodle` (by slug) | An open notebook, a bulb and a pencil; one small scene per article |
| Portfolio | `PortfolioDoodle`, `VerifiedDoodle` | A board of eleven small screens, one per product, with a cursor opening the CRM tile; a case-study page under a magnifier with a tick (client-work panel, drawn for dark) |
| 404 | `NotFoundDoodle` | A paper page running for an exit door: "This page took an early exit." |

### Adding one

1. Write down what the page says, then draw that. Check the inventory above so it does not
   duplicate an existing subject.
2. Add the component to `src/components/Doodles.tsx` and use the right filter.
3. Product drawings go in the `ART` map keyed by product slug; article drawings in
   `ARTICLE_ART` keyed by article slug. A new article or product with no entry simply
   shows no drawing, so it can never get a wrong one.
4. Check it at 1400px wide and at phone width, and run the build.
5. Add a row to the inventory table.

---

## 7. Components

| Class | Use |
|---|---|
| `.btn-signal` | Primary action. `signal` fill, white text. |
| `.btn-solid` | Secondary emphasis. `ink` fill, `paper` text. |
| `.btn-line` | Tertiary. 1px border, `ink` text. |
| `.btn-invert` | On dark surfaces. `paper` fill, `ink` text. |
| `.ulink` | Text link. 1px underline, `signal` on hover. |
| `.surface` | Card. 1px `ink/12`, white fill. |
| `.surface-ink` | Dark panel. `ink` fill, `paper` text. |
| `.field` / `.flabel` | Form input and label. |
| `.SectionHead` | `label` + `title` + optional `note`. |
| `.page-enter` | The navigation enter animation (section 5). |

Buttons and links are **sentence case, 15px, semibold**. Hover states are colour
changes only.

Icons: the favicon is the white bird mark on a dark `ink` rounded square (`favicon.ico`,
`favicon-512.png`, `apple-touch-icon.png`), because the black-on-transparent logo vanished
on dark browser tabs.

---

## 8. Honesty

These are rules, not preferences. Breaking one is a bug.

- **Never invent a fact.** No client names, no "50+ projects", no invented metrics, no
  review counts, no performance figures. If it is not verifiable, it does not go on the
  site. This applies to drawings too (section 6, rule 3).
- **Verified facts that are published:** BeForth was **founded in 2025** (confirmed by the
  owner; shown on About, in the FAQ, in `llms.txt` and as `foundingDate` in the schema),
  is in **Nashik, Maharashtra, India**, and its three leaders and their roles are on the
  Team page. Nothing else about size, clients or revenue is stated.
- **Location is a specific claim.** Do not infer or embellish geographic reach — "we work
  with clients across India and overseas" was invented and had to be removed.
- **Label demonstrations as demonstrations.** The two systems under "Selected work" are
  sample-data builds and say so on the card.
- **No placeholder content reaches a visitor.** Case studies render nothing until a real,
  verifiable engagement exists (`src/data/caseStudies.ts`, gated by `published`).
- **Insights are general guidance, authored "By BeForth".** Three articles are published
  (custom vs off-the-shelf, what to expect in ERP discovery, why spreadsheets fail at a
  second location). They contain no client names, figures, timings or results. Add a real
  example only if it is true. Topics not yet written stay in `TOPIC_BACKLOG`; thin posts
  written to fill a slot are worse than none. If `INSIGHTS` is ever emptied, `/insights`
  shows its honest empty state.
- **Anything that depends on a rule that can change** (Indian payroll, GST, e-invoicing)
  needs an expert to verify it before it is published as an article.
- **Schema must match visible content.** `FAQPage` only where an FAQ renders.
  `BreadcrumbList` everywhere except the home page. The prerender build fails if these
  drift.
- **Generated, not hand-written.** `src/lib/schema.ts` is the single source of truth for
  name, phone, address, founding year and map coordinates. Editing `index.html` by hand
  will desync the static and injected graphs.

---

## 9. Search and answer engines

The site is a client-rendered SPA, so without prerendering the served HTML is an empty
`<div id="root">`. Google renders JavaScript; most AI answer-engine crawlers do not.

- **Prerendering is part of the build.** Never remove it to "simplify" — it silently makes
  the site invisible to every non-Google crawler. It uses `@sparticuz/chromium` (a
  self-contained Chromium) on Linux, because the Chrome that Puppeteer downloads cannot
  start on Vercel's build image (missing `libnspr4.so`). The OG-card script uses the same
  browser.
- **Adding a route takes these edits:** the `<Route>` in `src/App.tsx`, `ROUTES` in
  `scripts/prerender.mjs`, `ROUTES` in `scripts/verify-build.mjs`, `public/sitemap.xml`,
  and a rewrite in `vercel.json` (every route is listed explicitly). Skip one and the route
  looks fine in a browser while shipping a blank page, or a 404, to crawlers. Product and
  article routes also need an OG card, which is generated from `catalog.tsx` and
  `insights.ts`.
- **Unknown URLs return a real 404.** There is deliberately **no catch-all rewrite** in
  `vercel.json`. The build prerenders an unknown path to `dist/404.html` (`noindex`, title
  "Page not found"), which Vercel serves with status 404. The client also sets `noindex`
  for unknown paths, and `/about/` and `/about` are treated as the same page.
- **Answer shape.** Questions become headings, answers lead with the conclusion in the
  first sentence and run 40–60 words. That is the shape an AI engine quotes back.
- **Metadata limits.** Titles stay at 60 characters or fewer and descriptions at 160 or
  fewer, so search results do not cut them off. Each page's title and description are
  unique.
- **Structured data per page:** `Organization`, `ProfessionalService` (with coordinates and
  map link), `WebSite`, the people, products, and a `WebPage` node that links the page to
  the site, the organisation and its breadcrumb (`AboutPage`, `ContactPage`,
  `CollectionPage` where they fit). Product pages link their `Service`; articles add an
  `Article` with a real date. All nodes join through `@id`.

### robots.txt

**Never put a `#` in a `robots.txt` rule.** `#` starts a comment, so `Disallow: /*#` is read
as `Disallow: /*` and blocks the whole site. This happened in October 2026 and was caught
by a Lighthouse "page is blocked from indexing" result. Fragments never reach the server,
so no rule is needed for them. The file now blocks only `/*?*`.

### Social previews

Every route gets its own Open Graph card, generated at build time by
`scripts/generate-og-images.mjs` into `dist/og/<route>.png` and pointed at by
`og:image` / `twitter:image`. A preview that does not match the page is worse than no
custom image — it looks wrong rather than absent.

`scripts/prerender.mjs` rewrites the two meta tags per route, because most scrapers
never execute JavaScript and the client-side `SeoManager` cannot fix it alone.
`scripts/verify-build.mjs` fails the build if any route points at another route's card,
if `404.html` is missing or not `noindex`, or if any route renders without content.

### Hostnames

The canonical host is **`https://beforth.in`** (no `www`). Canonical, `og:url`, the schema
`@id` values, the sitemap and `llms.txt` all declare that host.

**The redirect lives in the Vercel dashboard, not in `vercel.json`.** A `redirects` rule in
`vercel.json` that sent `www` to the apex looped against the dashboard's own apex-to-`www`
redirect and left pages unstyled, so it was removed. The correct setup is: `beforth.in`
is the primary domain and `www.beforth.in` redirects to it.

**Status at the time of writing: not done.** `beforth.in` still redirects to `www.beforth.in`,
so the canonical host and the live primary host disagree. Either flip the dashboard setting
(preferred; no code change) or change every `https://beforth.in` to the `www` host. Until
then Search Console will treat the two as separate properties.

---

## 10. Performance and accessibility

Measured with Lighthouse in October 2026 on the live site, mobile profile. Treat these as a
baseline to hold, not a target to game.

| Page | Performance | Accessibility | Best practices | SEO |
|---|---|---|---|---|
| Home | 84 | 100 | 96 | 100 |
| About | 94 | 100 | 96 | 100 |
| Article | 84 | 100 | 96 | 100 |
| Product (CRM) | 100 | 100 | 96 | 100 |

(Doodles were added after this run; a local re-run of the home page afterwards gave
93 / 100 / 100 / 100.)

- **Best practices 96** is the analytics script returning 404 until Web Analytics is turned
  on (below).
- **Home largest paint** is about 3.9s in the simulated slow-phone profile but about 1.2s
  in a real load. The gap is mostly script size: the main bundle holds React, the router,
  animation and every home section. Splitting the below-the-fold home sections into their
  own chunk is the known next step if it matters.
- **Keep layout stable.** Avoid anything that renders late and pushes content: the chat
  widget loads on interaction, route chunks are preloaded, fonts have a metric-matched
  fallback, and images need explicit sizes.
- **Keyboard and screen readers:** a skip link, one `<main>`, real lists, visible focus,
  decorative drawings hidden from assistive tech, and every control's accessible name
  contains its visible text (the dashboard KPI buttons use a visually hidden suffix
  instead of an `aria-label` that replaced the visible text).

### Analytics

Cookie-free **Vercel Web Analytics**, loaded by an inline snippet in `index.html` and
skipped on localhost. `src/lib/track.ts` sends **event names only** — never form contents,
emails or phone numbers:

- `contact_submit` when the enquiry form sends successfully
- `phone_click` and `email_click` for any `tel:` or `mailto:` link

**Status: not collecting yet.** Web Analytics must be switched on in the Vercel dashboard
(Project, Analytics, Enable). Custom events may need a paid Vercel plan; page views do not.
Search Console still needs the property verified and `sitemap.xml` submitted.

---

## 11. Build and deploy

```
npm run build
  emit-static-schema   writes the organisation schema into index.html
  vite build
  generate-og-images   one card per route
  install-browser      only if no usable browser exists
  prerender            writes dist/<route>/index.html and dist/404.html
  verify-build         fails the deploy if any route is empty or mis-tagged
```

- A failed prerender or verify **fails the deploy on purpose**, rather than shipping a
  blank site.
- A bad `vercel.json` (for example a `redirects` source that is a full URL) fails the
  deploy before the build starts. Check the deployment status, not just the push.
- After a deploy, check the live site, not only the local build: status codes, `robots.txt`,
  and that the stylesheet loads.

---

## 12. Do / don't

| Do | Don't |
|---|---|
| "Custom ERP, CRM and HR software" | "Software that fits the way your business runs" |
| Sentence-case buttons | Uppercase tracked-out labels on buttons |
| One motion, on navigation | Scroll reveals, parallax, marquees |
| Flat surfaces, 1px rules | Shadows, glows, glassmorphism, grain |
| One accent colour | Multiple accents, tinted panels |
| Measured claims | Invented numbers to sound credible |
| A drawing that shows what its page says | A stock drawing reused on another page |
| Facts already on the page, in drawings | Invented names, numbers or places in a drawing |
| One `<main>` and one `<h1>` per page | Nested `<main>`, skipped heading levels |
| A real 404 for unknown URLs | A catch-all rewrite that returns 200 |
| `ash` for secondary text at AA contrast | Fading text below AA on any surface |
| Load third-party widgets on interaction | Widgets that load on page load and shift the layout |
| Titles ≤ 60 and descriptions ≤ 160 characters | Long metadata that search results cut off |
| Check the live deployment after a push | Assume a green local build means a green deploy |
