# BeForth Design Guide

The site is **deliberately plain**. Our customers are owners and managers of
manufacturing, pharma, distribution and service companies. They are not here to be
impressed by effects; they are here to find out, in one read, what we build and whether it
fits. Every design decision follows from that.

## The first-read rule

A visitor must be able to answer three questions without scrolling or clicking:

1. **What do you make?** ERP, CRM and HR software, custom-built.
2. **Who is it for?** Manufacturing, pharma, distribution and service companies.
3. **What do I do next?** One primary button: "Start a project".

The hero is the proof. Current copy: *Custom ERP, CRM and HR software for your business.*
Rules for hero copy:

- Name the product (ERP, CRM, HR). No abstract promises like "software that fits…".
- One headline, one short paragraph, one button, one text link. Nothing else.
- No feature strips, badges, counters or tickers in the hero.

## Principles

- **Plain over clever.** If a design choice only makes the page look interesting, drop it.
- **Content visible immediately.** No fade-ins, slide-ins, parallax, cursor effects, smooth
  scrolling, grain or decorative gradients. Content is there when the page loads.
- **Normal words.** Sentence case on buttons and links. Say "ERP", not "operational
  backbone".
- **One accent.** Blue (`signal`) marks the main action and key words, nothing else.
- **Readable first.** Body text 15–16px, generous line height, high contrast.
- **Show real things.** The dashboard under "The work" is the one visual; keep it, but
  describe plainly what it is.

## Colour

Defined in `src/index.css`. Full RGB/CMYK values are in `COLOR_PALETTE.md`.

| Token | Hex | Use |
|---|---|---|
| `paper` | `#F2F7F9` | Page background |
| `bone` | `#D6E7F1` | Alternate section background, tiles |
| `ink` | `#231F20` | Text, dark panels |
| `ash` | `#6D737F` | Secondary text, captions |
| `signal` | `#1C75BC` | Primary accent: buttons, links, key words |
| `wave` | `#75BAE6` | Accent on dark backgrounds only |
| `signal-deep` | `#165B93` | Button hover |

## Type

- **Plus Jakarta Sans** for everything. JetBrains Mono only inside the demo dashboard.
- Hero headline: `display-xl`, max ~68px. Section headings: `display-lg`. Cards: `display-md`.
- `.label` is a small uppercase section tag (12–13px, light tracking). Use it for section
  names only, never for sentences.
- Buttons and links: 15px, semibold, sentence case (`.btn-signal`, `.btn-line`, `.ulink`).

## Layout

- Container `.wrap`: max 1280px, 24px gutter on mobile, 40px on desktop.
- Section rhythm: `.section` (80px mobile / 112px desktop). Alternate `paper` and `bone`
  backgrounds to separate sections; use a 1px `ink/12` rule, not shadows.
- Cards: `.surface`, 1px border, square corners, white fill. No glass, blur or glow.
- Page order on the home page: Hero → What we do → Who it's for → What we build → The
  work (dashboard) → How we work → Why BeForth → Selected work → Technology → Sectors →
  FAQ → Contact.

## Motion

None by default. `Reveal` and `Magnetic` still exist as pass-through components so call
sites do not need editing, but they do not animate. Hover states are colour changes only.
Interactive demo screens may animate their own data. If you add motion elsewhere, it must
help the visitor understand something; otherwise leave it out.

## Honesty rules

These are stricter than taste. Breaking them is a bug, not a style choice.

- **Never invent a fact.** No client names, no "50+ projects", no invented metrics, no
  founding year, no review counts, no performance figures. If it is not verifiable, it
  does not go on the site.
- **Label demonstrations as demonstrations.** The two systems under "Selected work" are
  sample-data builds. They say so. Do not let them drift into reading as client work.
- **No placeholder content reaches a visitor.** Case studies and insights render nothing
  until real content exists. A section of thin template cards is worse than no section:
  it dilutes authority and reads as filler.
- **Schema must match visible content.** `FAQPage` only on pages that render a FAQ.
  `BreadcrumbList` everywhere except the home page. The prerender build fails if these
  drift, so do not silence the check.
- **Structured data is generated, not hand-written.** `src/lib/schema.ts` is the single
  source of truth for name, phone and address. Edit it there, never in `index.html`
  directly, or the static and injected graphs will disagree.

## Search and answer engines

The site is a client-rendered SPA, so without prerendering the served HTML is an empty
`<div id="root">`. Google renders JavaScript; most AI answer-engine crawlers do not.

- **Prerendering is part of the build.** `npm run build` writes static HTML for all
  routes. Never remove it to "simplify" — that silently makes the site invisible to
  every non-Google crawler.
- **Adding a route means three edits**: the `<Route>`, `ROUTES` in
  `scripts/prerender.mjs`, and the sitemap. Skipping the second ships a blank page to
  crawlers while looking fine in a browser.
- **Answer shape.** Questions are headings, answers lead with the conclusion in the
  first sentence, and run 40–60 words. That is the shape an AI engine quotes back.

## Do / don't

| Do | Don't |
|---|---|
| "Custom ERP, CRM and HR software" | "Software that fits the way your business runs" |
| Sentence-case buttons | Uppercase mono buttons with wide tracking |
| Static sections | Scroll-triggered reveals, parallax, magnetic buttons |
| Flat surfaces and 1px rules | Grain, blueprint grids, glows, glassmorphism |
| One accent colour | Outline text, multiple accent colours |
