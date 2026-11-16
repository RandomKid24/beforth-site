import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import Reveal from '../components/Reveal';
import { Magnetic } from '../components/Magnetic';
import { LOCATION_PAGES, LOCATIONS, LOCATIONS_PATH, type Location, type PageKind } from '../data/locations';

/**
 * Location landing pages ("ERP software in Pune", "Custom software
 * development in Maharashtra", ...). One component, driven by
 * src/data/locations.json.
 *
 * Honesty rules (designV2.md section 8) apply. Capability lists, fit lists, the
 * typical client and the engagement steps are already published elsewhere on
 * the site. The location claims are the ones the owner has confirmed: BeForth
 * is based in Nashik and delivers across India. Do not add offices, onsite
 * visits, named areas, client counts or response times without a source.
 *
 * Each place gets its own `local` paragraph in the data file. Keep them
 * specific to the place and general in tone. Pages that differ only by a swapped
 * city name are doorway pages and should not be added.
 */

type Kind = PageKind;

interface Copy {
  coverTitle: string;
  coverNote: string;
  covers: string[];
  stack?: string;
  links: { to: string; label: string; note: string }[];
}

const COPY: Record<Kind, Copy> = {
  erp: {
    coverTitle: 'What a custom ERP can cover',
    coverNote:
      'We start with the processes you need today and expand as the business grows. Any module can stand alone, or be wired into one connected system.',
    covers: [
      'Inventory management', 'Purchase management', 'Sales management',
      'Production workflows', 'Finance & operations', 'Employee management',
      'Approvals', 'CRM', 'Reporting', 'Dashboards', 'Business analytics', 'Workflow automation',
    ],
    links: [
      {
        to: '/insights/custom-erp-or-off-the-shelf',
        label: 'Custom ERP or off-the-shelf software?',
        note: 'How to decide before you spend anything.',
      },
      {
        to: '/insights/what-to-expect-during-erp-discovery',
        label: 'What to expect during ERP discovery',
        note: 'What happens before any code is written.',
      },
      {
        to: '/product/erp',
        label: 'See a business ERP running',
        note: 'A sample build, shown with sample data.',
      },
    ],
  },
  custom: {
    coverTitle: 'What we build',
    coverNote:
      'Five things, with one accountable partner from the first conversation to handover.',
    covers: [
      'Business software and ERP', 'Workflow automation', 'Custom software',
      'Web applications', 'Mobile applications', 'Integrations and APIs',
      'CRM', 'HRMS and payroll', 'Inventory systems', 'Dashboards and reporting',
    ],
    stack: 'Web: Next.js · React · Node.js · PostgreSQL   |   Mobile: Flutter · React Native · Swift · Kotlin',
    links: [
      {
        to: '/services',
        label: 'All services',
        note: 'Seven service lines, each with its capability list.',
      },
      {
        to: '/portfolio',
        label: 'Systems shown running',
        note: 'Sample builds, labelled as demonstrations.',
      },
      {
        to: '/insights/custom-erp-or-off-the-shelf',
        label: 'Custom or off-the-shelf?',
        note: 'When a custom build is the right answer, and when it is not.',
      },
    ],
  },
};

const FITS = [
  'You have outgrown spreadsheets',
  'The same data gets typed in twice',
  'Nobody trusts the numbers',
  'Work gets lost over chat and phone',
  'Off-the-shelf software almost fits',
];

const NOT_FITS = [
  'You just need a simple website',
  'You want zero customisation',
  'You want a subscription, not a system you own',
];

const ENGAGEMENT = [
  { k: 'Discovery', v: 'We map your process and agree what success looks like.' },
  { k: 'Proposal', v: 'Scope, sequence and cost, in plain language.' },
  { k: 'Build', v: 'Modular delivery, with working software early.' },
  { k: 'Handover', v: 'Training, documentation and support.' },
];

const BASE = 'BeForth is a software company based in Nashik, Maharashtra, founded in 2025.';

/** Who the page addresses: "businesses in Pune", "businesses across India". */
function scope(loc: Location) {
  return loc.kind === 'city' ? `businesses in ${loc.name}` : loc.focus;
}

function leadFor(kind: Kind, loc: Location): string {
  if (loc.slug === 'nashik') {
    return kind === 'erp'
      ? `${BASE} We build custom ERP systems around how your company works, instead of asking you to fit a packaged product.`
      : `${BASE} We build software for the cases off-the-shelf products cannot cover: business systems, web applications, mobile apps and the integrations between them.`;
  }
  return kind === 'erp'
    ? `${BASE} We deliver custom ERP to ${scope(loc)}, built around how your company works instead of asking you to fit a packaged product.`
    : `${BASE} We deliver custom software to ${scope(loc)}: business systems, web applications, mobile apps and the integrations between them, for the cases off-the-shelf products cannot cover.`;
}

export default function LocationPage({ kind, slug }: { kind: Kind; slug: string }) {
  const c = COPY[kind];
  const loc = LOCATIONS.find((l) => l.slug === slug) as Location;
  const label = kind === 'erp' ? `ERP software in ${loc.name}` : `Custom software in ${loc.name}`;
  const others = LOCATION_PAGES.filter((p) => p.kind === kind && p.loc.slug !== slug);

  return (
    <>
      <section className="pt-32 md:pt-40 pb-12 md:pb-16">
        <div className="wrap">
          <Reveal>
            <div className="rule mb-6" />
            <span className="label block mb-6">{label}</span>
            <h1 className="display-xl text-[clamp(2.2rem,6.4vw,4.8rem)] max-w-[18ch]">
              {kind === 'erp' ? <>ERP software company in </> : <>Custom software development in </>}
              <span className="accent">{loc.name}.</span>
            </h1>
            <p className="lead max-w-2xl mt-7">{leadFor(kind, loc)}</p>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link to="/contact" className="btn-signal">
                Start a project <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/services" className="ulink">
                All services <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-20 md:pb-24">
        <div className="wrap">
          <Reveal>
            <article className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-16">
              <div>
                <h2 className="display-lg text-[clamp(1.5rem,3.4vw,2.4rem)] mb-4">{c.coverTitle}</h2>
                <p className="body max-w-md">{c.coverNote}</p>
                {c.stack && (
                  <p className="label !text-[12px] !tracking-[0.14em] mt-5 pt-5 border-t border-ink/12">
                    {c.stack}
                  </p>
                )}
              </div>
              <div className="surface p-6 md:p-9 h-fit">
                <span className="label block mb-5">Capabilities can include</span>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                  {c.covers.map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <Check className="w-3.5 h-3.5 text-signal mt-1 shrink-0" />
                      <span className="text-[14px] text-ink leading-snug">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="pb-20 md:pb-24">
        <div className="wrap">
          <Reveal>
            <div className="rule mb-6" />
            <h2 className="display-lg text-[clamp(1.5rem,3.4vw,2.4rem)] mb-4 max-w-[26ch]">{loc.localHeading}</h2>
            <p className="body max-w-2xl">{loc.local}</p>
          </Reveal>
        </div>
      </section>

      <section className="section bg-bone">
        <div className="wrap relative z-10">
          <div className="rule mb-6" />
          <h2 className="display-lg text-[clamp(1.7rem,3.8vw,2.8rem)] mb-10 max-w-[22ch]">
            Built for companies that have <span className="accent">outgrown spreadsheets.</span>
          </h2>

          <div className="grid lg:grid-cols-2 gap-5">
            <Reveal>
              <div className="surface p-6 md:p-8 h-full">
                <h3 className="display-md text-base mb-6 text-signal">You will get on well if…</h3>
                <ul className="flex flex-col gap-3">
                  {FITS.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-signal mt-2.5 shrink-0" />
                      <span className="body text-ink">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.07}>
              <div className="surface p-6 md:p-8 h-full">
                <h3 className="display-md text-base mb-6">Probably not you, if…</h3>
                <ul className="flex flex-col gap-3">
                  {NOT_FITS.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-ink/20 mt-2.5 shrink-0" />
                      <span className="body">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="mt-5 border border-ink/12 bg-paper px-6 py-5">
              <span className="label">Typical client</span>
              <p className="display-md text-base mt-1.5">
                Manufacturing, pharma, distribution and service firms with 20 to 500 people.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section surface-ink">
        <div className="wrap relative z-10">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-20">
            <Reveal>
              <span className="label !text-paper/65 block mb-5">How an engagement runs</span>
              <h2 className="display-lg text-[clamp(1.7rem,4vw,2.8rem)] text-paper mb-4">
                No surprises.<br />No black box.
              </h2>
              <p className="text-paper/65 leading-relaxed max-w-xs">
                You always know what is being built, what it costs, and what happens next.
              </p>
            </Reveal>
            <div className="grid sm:grid-cols-2 gap-x-10 border-t border-paper/20">
              {ENGAGEMENT.map((step, i) => (
                <Reveal key={step.k} delay={i * 0.06}>
                  <div className="py-6 border-b border-paper/20 h-full">
                    <span className="label !text-wave block mb-3">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="display-md text-base mb-1.5">{step.k}</h3>
                    <p className="text-paper/70 text-[14px] leading-relaxed">{step.v}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="wrap">
          <Reveal>
            <div className="rule mb-6" />
            <h2 className="display-lg text-[clamp(1.5rem,3.4vw,2.5rem)] mb-8 max-w-[22ch]">Read before you decide.</h2>
            <ul className="grid md:grid-cols-3 gap-x-10 border-t border-ink/15">
              {c.links.map((l) => (
                <li key={l.to} className="py-6 border-b border-ink/15">
                  <Link to={l.to} className="ulink">
                    {l.label} <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                  <p className="body-tight mt-2">{l.note}</p>
                </li>
              ))}
            </ul>
            <div className="mt-10 pt-8 border-t border-ink/15">
              <span className="label block mb-4">Also delivered in</span>
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {others.map((o) => (
                  <li key={o.path}>
                    <Link to={o.path} className="ulink">{o.loc.name}</Link>
                  </li>
                ))}
                <li>
                  <Link to={LOCATIONS_PATH} className="ulink">All locations <ArrowUpRight className="w-3.5 h-3.5" /></Link>
                </li>
              </ul>
            </div>
            <div className="mt-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-7">
              <p className="body max-w-md">
                BeForth, Nashik, Maharashtra, India. Email support@beforth.in or call +91 97661 83834.
              </p>
              <Magnetic>
                <Link to="/contact" className="btn-signal shrink-0">
                  Tell us the problem <ArrowRight className="w-4 h-4" />
                </Link>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
