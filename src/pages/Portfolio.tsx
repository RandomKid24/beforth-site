import { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

import Reveal from '@/components/Reveal';
import { PortfolioDoodle, VerifiedDoodle } from '@/components/Doodles';
import { PLATFORMS, type Platform } from '@/components/platforms/catalog';
import { PUBLISHED_CASE_STUDIES } from '@/data/caseStudies';
import { CLIENTS } from '@/data/clients';

/**
 * /portfolio: the systems BeForth builds, shown running.
 *
 * Everything here comes from the product catalog, so a card can never say
 * something its product page does not. The previews are interactive builds on
 * sample data and are labelled that way (designV2.md, section 8). Client case
 * studies render only once a real one is published; until then the page says so
 * plainly instead of showing filler.
 */

const GROUPS = [
  { id: 'all', label: 'All' },
  { id: 'operations', label: 'Operations' },
  { id: 'people', label: 'People and pay' },
  { id: 'growth', label: 'Sales and web' },
  { id: 'access', label: 'Apps and access' },
] as const;
type GroupId = (typeof GROUPS)[number]['id'];

const GROUP_OF: Record<string, Exclude<GroupId, 'all'>> = {
  erp: 'operations',
  'delivery-tracking': 'operations',
  'salon-erp': 'operations',
  pos: 'operations',
  hrms: 'people',
  payroll: 'people',
  crm: 'growth',
  websites: 'growth',
  'seo-tracking': 'growth',
  'mobile-apps': 'access',
  tunnelgate: 'access',
};

const PREVIEW_W = 900;
const PREVIEW_H = 560;

/** The live preview, scaled down to the card and made non-interactive. */
function Thumb({ Preview }: { Preview: Platform['Preview'] }) {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  useLayoutEffect(() => {
    const el = box.current;
    if (!el) return;
    const fit = () => setScale(el.clientWidth / PREVIEW_W);
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={box}
      className="relative overflow-hidden bg-bone border-b border-ink/12"
      style={{ aspectRatio: `${PREVIEW_W} / ${PREVIEW_H}` }}
      aria-hidden="true"
    >
      <div
        className="absolute left-0 top-0 origin-top-left flex items-center justify-center"
        style={{ width: PREVIEW_W, height: PREVIEW_H, transform: `scale(${scale})` }}
        inert
      >
        <div className="w-full max-w-[820px]">
          <Preview />
        </div>
      </div>
    </div>
  );
}

function Features({ p }: { p: Platform }) {
  return (
    <p className="text-[13.5px] leading-relaxed text-ink/80">
      <span className="label !text-[11px] mr-2">{p.slug === 'erp' ? 'Modules' : 'Includes'}</span>
      {p.features.map((f) => f.title).join(', ')}.
    </p>
  );
}

/** The lead system: a large live preview beside the whole story. */
function Featured({ p, n }: { p: Platform; n: number }) {
  return (
    <li className="group relative grid lg:grid-cols-[1.35fr_1fr] gap-x-12 gap-y-8 pb-14 mb-2 border-b border-ink/15 items-center">
      <Thumb Preview={p.Preview} />
      <div>
        <div className="flex items-center gap-3 mb-4">
          <span className="label text-signal">{String(n).padStart(2, '0')}</span>
          <span className="label">{p.sub}</span>
        </div>
        <h3 className="display-lg text-[clamp(1.8rem,3.4vw,2.8rem)] mb-4">
          <Link
            to={`/product/${p.slug}`}
            className="transition-colors duration-300 group-hover:text-signal after:absolute after:inset-0 after:content-['']"
          >
            {p.name}
          </Link>
        </h3>
        <p className="body mb-4">{p.lead}</p>
        <p className="body-tight mb-5">
          <span className="text-ink font-semibold">Built for </span>
          {p.built}
        </p>
        <Features p={p} />
        <span className="mt-7 inline-flex items-center gap-1.5 text-[15px] font-semibold text-ink transition-colors duration-300 group-hover:text-signal">
          See the product <ArrowUpRight className="w-4 h-4" />
        </span>
      </div>
    </li>
  );
}

/** Every other system: a small live preview, then the short version. */
function Row({ p, n }: { p: Platform; n: number }) {
  return (
    <li className="group relative grid md:grid-cols-[300px_1fr] lg:grid-cols-[340px_1fr] gap-x-10 gap-y-5 py-8 border-b border-ink/15 items-start">
      <Thumb Preview={p.Preview} />
      <div className="md:max-w-2xl">
        <div className="flex items-baseline gap-3 mb-2">
          <span className="label text-signal">{String(n).padStart(2, '0')}</span>
          <span className="label">{p.sub}</span>
        </div>
        <h3 className="display-lg text-xl md:text-2xl mb-2">
          <Link
            to={`/product/${p.slug}`}
            className="transition-colors duration-300 group-hover:text-signal after:absolute after:inset-0 after:content-['']"
          >
            {p.name}
          </Link>
        </h3>
        <p className="body-tight mb-3">{p.lead}</p>
        <p className="body-tight mb-3">
          <span className="text-ink font-semibold">Built for </span>
          {p.built}
        </p>
        <Features p={p} />
      </div>
    </li>
  );
}

export default function PortfolioPage() {
  const [group, setGroup] = useState<GroupId>('all');
  const shown = PLATFORMS.filter((p) => group === 'all' || GROUP_OF[p.slug] === group);

  return (
    <>
      <section className="pt-32 md:pt-40 pb-12 md:pb-16">
        <div className="wrap relative">
          <PortfolioDoodle className="hidden xl:block absolute right-0 top-6 w-[380px]" />
          <Reveal>
            <div className="rule mb-6" />
            <span className="label block mb-7">Portfolio</span>
            <h1 className="display-xl text-[clamp(2.2rem,6.4vw,4.8rem)] max-w-[16ch]">
              Systems we build, <span className="accent">running.</span>
            </h1>
            <p className="lead max-w-2xl mt-8">
              {PLATFORMS.length} products for operations, people, sales and access. Each preview below is
              a working build on sample data, so you can see how it behaves before we talk
              about yours.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link to="/contact" className="btn-signal">
                Start a project <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="#systems" className="ulink">
                Browse the systems
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="systems" className="pb-20 md:pb-28 scroll-mt-24">
        <div className="wrap">
          <div className="rule mb-6" />
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">
            <span className="label">Systems · {shown.length} of {PLATFORMS.length}</span>
            <div role="group" aria-label="Filter systems" className="flex flex-wrap gap-2">
              {GROUPS.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  aria-pressed={group === g.id}
                  onClick={() => setGroup(g.id)}
                  className={`px-4 py-2 text-[14px] font-semibold border transition-colors duration-300 ${
                    group === g.id
                      ? 'bg-ink border-ink text-paper'
                      : 'border-ink/22 text-ink hover:border-ink'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          <ul className="border-t border-ink/15 pt-10">
            {shown.map((p, i) =>
              i === 0 ? (
                <Featured key={p.slug} p={p} n={PLATFORMS.indexOf(p) + 1} />
              ) : (
                <Row key={p.slug} p={p} n={PLATFORMS.indexOf(p) + 1} />
              ),
            )}
          </ul>
        </div>
      </section>

      <section id="clients" className="section bg-bone">
        <div className="wrap">
          <span className="label block mb-5">Clients</span>
          <h2 className="display-lg text-[clamp(1.7rem,4vw,3.2rem)] max-w-[20ch] mb-10">
            Businesses that run on <span className="accent">our systems.</span>
          </h2>
          <ol className="border-t border-ink/12 max-w-3xl">
            {CLIENTS.map((c, i) => (
              <li key={c} className="flex items-baseline gap-6 py-4 md:py-5 border-b border-ink/12">
                <span className="label text-signal w-8 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                <span className="display-md text-[17px] md:text-2xl">{c}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <span className="label block mb-5">Client work</span>
          {PUBLISHED_CASE_STUDIES.length > 0 ? (
            <ul className="grid md:grid-cols-2 gap-5">
              {PUBLISHED_CASE_STUDIES.map((c) => (
                <li key={c.slug} className="surface p-6 md:p-8">
                  <span className="label block mb-4">{c.kind}{c.named ? '' : ' · Client anonymised'}</span>
                  <h3 className="display-lg text-xl md:text-2xl mb-3">{c.title}</h3>
                  <p className="body-tight mb-3">{c.problem}</p>
                  <p className="body-tight mb-6">{c.solution}</p>
                  <dl className="pt-5 border-t border-ink/12 grid gap-3">
                    {c.metrics.map((m) => (
                      <div key={m.label} className="flex items-baseline justify-between gap-4">
                        <dt className="body-tight">{m.label}</dt>
                        <dd className="accent font-semibold text-[15px] whitespace-nowrap">{m.value}</dd>
                      </div>
                    ))}
                  </dl>
                </li>
              ))}
            </ul>
          ) : (
            <div className="surface-ink p-8 md:p-12 grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-end">
              <div>
                <h2 className="display-lg text-[clamp(1.5rem,3.4vw,2.4rem)] max-w-[22ch] mb-4">
                  Client case studies are published when the numbers are <span className="text-wave">verified.</span>
                </h2>
                <p className="text-paper/75 text-[15px] md:text-[16px] leading-[1.75] max-w-xl">
                  We would rather show nothing than something invented. A case study goes up
                  here once the client has agreed to it and the before-and-after figures can
                  be checked. Until then, the systems above are what we can show honestly.
                </p>
              </div>
              <div className="flex flex-col items-start lg:items-end gap-6">
                <VerifiedDoodle className="hidden sm:block w-[200px]" />
                <Link to="/contact" className="btn-invert">
                  Ask about similar work <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
      <section className="pb-20 md:pb-28">
        <div className="wrap">
          <div className="rule mb-10" />
          <h2 className="display-xl text-[clamp(2rem,5vw,3.8rem)] max-w-[18ch]">
            Have a process in mind? <span className="accent">Let's build it.</span>
          </h2>
          <p className="lead max-w-xl mt-6">
            Tell us how the business runs today. We will tell you what we would build and where it starts.
          </p>
          <Link to="/contact" className="btn-signal mt-9">
            Start a project <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
