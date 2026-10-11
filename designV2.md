# BeForth — Design System V2

The reference for how this site looks and behaves. Supersedes `DESIGN_VAULT.md` for
everything below; that document is kept as the original rationale and is no longer
edited.

Where the two disagree, **this one wins**.

- Source of truth for tokens: `src/index.css`
- Source of truth for structured data: `src/lib/schema.ts`
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
paragraph, one button, one text link. No badges, counters or tickers.

---

## 2. Colour

Seven tokens. Nothing else. Full RGB and CMYK in `COLOR_PALETTE.md`.

| Token | Hex | Use |
|---|---|---|
| `paper` | `#F2F7F9` | Page canvas. Default background. |
| `bone` | `#D6E7F1` | Section break. One step darker, same hue family. |
| `ink` | `#231F20` | Body text, dark panels, borders. |
| `ash` | `#5F6571` | Secondary text, captions, metadata. |
| `signal` | `#1C75BC` | The single accent. Primary action, key words, active state. |
| `wave` | `#75BAE6` | Accent **on dark surfaces only**. |
| `signal-deep` | `#165B93` | Hover / pressed for `signal`. Derived, not brand. |

### Rules

1. **One accent.** `signal` marks the main action and nothing more. If a second colour
   appears in a view, something is wrong.
2. **`ash` is secondary text only.** Its contrast is about 5.4:1 on `paper` and 4.6:1 on
   `bone`, both above the AA threshold (it was `#6D737F` at 4.4:1 until the October 2026
   audit). Use it for supporting copy and `ink` for anything the reader must act on.
3. **`wave` on dark, never `signal`.** `signal` on `ink` is only ~3.3:1.
4. **Separate with `bone` and a 1px rule**, never a shadow, gradient or glow.
5. **No decorative colour.** No grain, no blueprint grids, no tinted overlays.
6. **Doodles are the one exception to "no decoration"** (added October 2026): hand-drawn style
   line illustrations on the home page, in `ink` with `signal` for the connected system and
   `bone` for flat fills. They live in `src/components/Doodles.tsx` as inline SVG, are
   `aria-hidden`, never carry text the page does not also say, and use no gradients or
   shadows. Add new ones only where they explain something.

Status colours in the demo dashboard (emerald / amber / red) are semantic and sit
outside the brand palette by design.

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

---

## 5. Motion

**One orchestrated moment per navigation, and nothing else moves.**

Page transitions use the native View Transitions API, as a **pure cross-fade with no
directional movement**. The previous version slid the content vertically and it read as
jittery; removing the movement is what made it feel smooth.

```
old page   140ms   fade only   (cubic-bezier 0.4, 0, 1, 1)
new page   220ms   fade only   (cubic-bezier 0.33, 0, 0.2, 1)
```

The outgoing page still finishes first, so two pages of text are never legible on top of
each other — it reads as a page turning rather than a dissolve.

The navbar is excluded from the snapshot and stays put, so its active-link highlight
updates immediately. Implementation: `src/lib/pageTransition.ts` + the
`::view-transition-*` block in `src/index.css`.

### Rules

- **Motion answers an action or it does not ship.** Navigation, hover, form feedback.
  Not scroll-triggered reveals, parallax, marquees or entrance animations.
- **`prefers-reduced-motion` disables all of it.** Every animation is gated. Navigation
  still works — only the movement goes.
- **Browsers without View Transitions** (Safari < 18, Firefox < 130) switch instantly.
  The feature is detected before use; it is never called unguarded.
- The interactive demo dashboard may animate its own data. That is the one exception.
- `.pulse-dot` is allowed on live-status indicators. It pauses when offscreen or when the
  tab is hidden, and stops under reduced motion.

---

## 6. Components

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

Buttons and links are **sentence case, 15px, semibold**. Hover states are colour
changes only.

---

## 7. Honesty

These are rules, not preferences. Breaking one is a bug.

- **Never invent a fact.** No client names, no "50+ projects", no invented metrics, no
  founding year, no review counts, no performance figures. If it is not verifiable, it
  does not go on the site.
- **Location is a specific claim.** BeForth is in Nashik, Maharashtra, India. Do not
  infer or embellish geographic reach — "we work with clients across India and overseas"
  was invented and had to be removed.
- **Label demonstrations as demonstrations.** The two systems under "Selected work" are
  sample-data builds and say so on the card.
- **No placeholder content reaches a visitor.** Case studies and insights render nothing
  until real content exists. A section of thin template cards is worse than no section.
  `/insights` therefore shows an honest empty state — the plain statement that nothing is
  published yet, plus the list of topics on the way — rather than filler.
- **Schema must match visible content.** `FAQPage` only where an FAQ renders.
  `BreadcrumbList` everywhere except the home page. The prerender build fails if these
  drift.
- **Generated, not hand-written.** `src/lib/schema.ts` is the single source of truth for
  name, phone and address. Editing `index.html` by hand will desync the static and
  injected graphs.

---

## 8. Search and answer engines

The site is a client-rendered SPA, so without prerendering the served HTML is an empty
`<div id="root">`. Google renders JavaScript; most AI answer-engine crawlers do not.

- **Prerendering is part of the build.** Never remove it to "simplify" — it silently makes
  the site invisible to every non-Google crawler.
- **Adding a route takes three edits:** the `<Route>`, `ROUTES` in
  `scripts/prerender.mjs`, and `public/sitemap.xml`. Skip the second and the route looks
  fine in a browser while shipping a blank page to crawlers.
- **Answer shape.** Questions become headings, answers lead with the conclusion in the
  first sentence and run 40–60 words. That is the shape an AI engine quotes back.

### Social previews

Every route gets its own Open Graph card, generated at build time by
`scripts/generate-og-images.mjs` into `dist/og/<route>.png` and pointed at by
`og:image` / `twitter:image`. A preview that does not match the page is worse than no
custom image — it looks wrong rather than absent.

`scripts/prerender.mjs` rewrites the two meta tags per route, because most scrapers
never execute JavaScript and the client-side `SeoManager` cannot fix it alone.
`scripts/verify-build.mjs` fails the build if any route points at another route's card.

### Hostnames

The canonical host is **`https://beforth.in`** (no `www`). `vercel.json` redirects
`www.beforth.in` to the canonical host. Canonical, `og:url`, the schema `@id` values, the
sitemap and `llms.txt` all declare the same host — a canonical that points at a URL which
itself redirects is contradictory and is ignored.

This only holds if `beforth.in` is the primary/production domain in Vercel. If the
platform still sends `beforth.in` to `www`, the two redirects loop.

---

## 9. Do / don't

| Do | Don't |
|---|---|
| "Custom ERP, CRM and HR software" | "Software that fits the way your business runs" |
| Sentence-case buttons | Uppercase tracked-out labels on buttons |
| One motion, on navigation | Scroll reveals, parallax, marquees |
| Flat surfaces, 1px rules | Shadows, glows, glassmorphism, grain |
| One accent colour | Multiple accents, tinted panels |
| Measured claims | Invented numbers to sound credible |