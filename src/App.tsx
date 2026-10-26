import React, { Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { LazyMotion, MotionConfig, domAnimation } from 'motion/react';
import * as m from 'motion/react-m';
import { ArrowUpRight, ArrowRight, ArrowDown, Mail, Phone, MapPin, Check, Compass, Handshake, MousePointerClick, Puzzle } from 'lucide-react';

import { Magnetic } from '@/components/Magnetic';
import Reveal from '@/components/Reveal';
import SectionHead from '@/components/SectionHead';
import { useMotionPreset, springSmooth, springSnappy } from '@/lib/motion';

import { PLATFORMS, getPlatform } from '@/components/platforms/catalog';
import { FAQ } from '@/data/faq';
import { PUBLISHED_INSIGHTS } from '@/data/insights';
import { PUBLISHED_CASE_STUDIES } from '@/data/caseStudies';
import { DEMO_WORK } from '@/data/demoWork';
import { CLIENTS } from '@/data/clients';
import { routeGraph } from '@/lib/schema';
import { track } from '@/lib/track';
import ConsentBanner from '@/components/ConsentBanner';
import { DoodleDefs, HeroDoodle, HubDoodle, SheetDoodle, SiteDoodle, RoadDoodle, SectorIcon, PlaneDoodle, ReasonDoodle, TangleDoodle, FaqDoodle } from '@/components/Doodles';

/**
 * The interactive dashboard demo is ~200KB of source. It is the one visual the
 * design vault allows, but it sits below the fold and only matters to visitors
 * who scroll to it, so it loads on demand instead of blocking first paint.
 */
/**
 * Like React.lazy, but once the chunk has been loaded the component renders
 * synchronously. React.lazy always suspends on its first render, which swaps
 * the prerendered page for the "Loading" fallback and back, shifting the
 * layout. `preload` lets main.tsx load the current route before React starts.
 */
function lazyRoute<P extends object>(loader: () => Promise<{ default: React.ComponentType<P> }>) {
  let Comp: React.ComponentType<P> | undefined;
  let loading: Promise<void> | undefined;
  const preload = () =>
    (loading ??= loader().then((m) => {
      Comp = m.default;
    }));
  const Lazy = (props: P) => {
    if (!Comp) throw preload();
    return <Comp {...props} />;
  };
  return Object.assign(Lazy, { preload });
}

const ProductShowcase = lazyRoute(() => import('@/components/ProductShowcase'));
const loadShowcase = ProductShowcase.preload;

/**
 * Each route is a separate chunk. The home page is the common first read and
 * stays in the main bundle; everything else arrives when it is navigated to.
 */
const ServicesPage = lazyRoute(() => import('./pages/Services'));
const loadServices = ServicesPage.preload;
const AboutPage = lazyRoute(() => import('./pages/About'));
const loadAbout = AboutPage.preload;
const TeamPage = lazyRoute(() => import('./pages/Team'));
const loadTeam = TeamPage.preload;
const ContactPage = lazyRoute(() => import('./pages/Contact'));
const loadContact = ContactPage.preload;
const NotFound = lazyRoute(() => import('./pages/NotFound'));
const PortfolioPage = lazyRoute(() => import('./pages/Portfolio'));
const loadPortfolio = PortfolioPage.preload;
const InsightsPage = lazyRoute(() => import('./pages/Insights'));
const loadInsights = InsightsPage.preload;
const InsightArticle = lazyRoute(() => import('./pages/InsightArticle'));
const loadInsightArticle = InsightArticle.preload;
const LegalPage = lazyRoute(() => import('./pages/Legal'));
const loadLegal = LegalPage.preload;
const ProductPage = lazyRoute(() => import('./pages/ProductPage'));
const loadProductPage = ProductPage.preload;

const NAV = [
  { path: '/', label: 'Home' },
  { path: '/services', label: 'Services' },
  { path: '/portfolio', label: 'Portfolio' },
  { path: '/insights', label: 'Insights' },
  { path: '/about', label: 'About' },
  { path: '/team', label: 'Team' },
  { path: '/contact', label: 'Contact' },
];

/**
 * Each service line links to the product page that shows the most concrete
 * example of it. These are contextual links in body copy, not navigation —
 * crawlers and readers use them to reach related detail from within the text.
 */
const SERVICES = [
  { n: '01', title: 'Business Software & ERP', desc: 'Sales, HR, service, inventory and reporting on one platform.', to: '/services' },
  { n: '02', title: 'Workflow Automation', desc: 'Approvals and follow-ups tracked, not chased.', to: '/product/crm' },
  { n: '03', title: 'Custom Software', desc: 'Built for the cases off-the-shelf cannot cover.', to: '/services' },
  { n: '04', title: 'Web & Mobile Apps', desc: 'Websites, portals and apps your team will actually use.', to: '/product/mobile-apps' },
  { n: '05', title: 'Integrations', desc: 'ERP, accounts, CRM and APIs talking to each other.', to: '/services' },
];

const METHOD = [
  { n: '01', title: 'Discovery', desc: 'We study your workflows, departments, users, data and bottlenecks.' },
  { n: '02', title: 'Architecture', desc: 'Database, application structure, roles, permissions, integrations.' },
  { n: '03', title: 'Development', desc: 'Built in stages, so progress is reviewed throughout.' },
  { n: '04', title: 'Testing & onboarding', desc: 'We validate behaviour, migrate data and train users.' },
  { n: '05', title: 'Deployment', desc: 'Released for real use with the required infrastructure.' },
  { n: '06', title: 'Optimization', desc: 'Monitored, improved and extended as requirements change.' },
];

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

const REASONS = [
  { icon: Compass, title: 'Business first', desc: 'We start with the problem, not the technology.', how: 'Discovery maps your workflows, users and bottlenecks before any code is written.' },
  { icon: Puzzle, title: 'Built around you', desc: 'Your process stays. The software adapts.', how: 'Roles, approvals and reports mirror how your team already works.' },
  { icon: MousePointerClick, title: 'Simple to use', desc: 'Your team needs no training manual.', how: 'Designed around the people who use it daily, then onboarded with them.' },
  { icon: Handshake, title: 'One partner', desc: 'Everything under one roof, one point of contact.', how: 'We design, build, run and maintain it. One team, no hand-offs.' },
];

const OUTCOMES = [
  { from: 'Spreadsheets', to: 'One source of truth' },
  { from: 'Chat follow-ups', to: 'Tracked workflows' },
  { from: 'Hand-made reports', to: 'Live MIS' },
  { from: 'Forced-fit software', to: 'Systems that fit' },
];

const INDUSTRIES = [
  { name: 'Manufacturing', does: 'Production steps tied to the raw material and stock they use.' },
  { name: 'Logistics & Distribution', does: 'Assigned routes, proof of delivery and a live view of every order.' },
  { name: 'Pharma', does: 'Orders, stock and deliveries on one record, so billing and dispatch never disagree.' },
  { name: 'Sales & Marketing', does: 'Leads and follow-ups tracked in one place instead of chat threads.' },
  { name: 'Human Resources', does: 'Attendance from biometric punches, shifts, leave and approvals.' },
  { name: 'Growing Businesses', does: 'Start with the processes you need today and add modules as you grow.' },
];

/* ------------------------------------------------------------------ */
/* Navbar                                                              */
/* ------------------------------------------------------------------ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { shouldReduce } = useMotionPreset();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color,box-shadow] duration-500 ${
          scrolled || open
            ? 'bg-paper/90 backdrop-blur-xl border-b border-ink/10'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="wrap">
          <div className="flex items-center justify-between h-[68px] md:h-[76px]">
            <m.div
              initial={shouldReduce ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={springSmooth}
            >
              <Link to="/" className="flex items-center min-h-[40px] shrink-0" aria-label="BeForth home">
                <m.img
                  src="/logo.png"
                  alt="BeForth"
                  className="h-[26px] md:h-[28px] w-auto"
                  initial={shouldReduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={springSmooth}
                />
              </Link>
            </m.div>

            <nav className="hidden lg:flex items-center gap-8">
              {NAV.map((item, i) => {
                const active = item.path === '/' ? pathname === '/' : pathname.startsWith(item.path);
                return (
                  <m.span
                    key={item.path}
                    initial={shouldReduce ? false : { opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...springSmooth, delay: 0.16 + i * 0.06 }}
                  >
                    <Link
                      to={item.path}
                      className={`label transition-colors duration-300 ${active ? 'text-signal' : 'hover:text-ink'}`}
                    >
                      {item.label}
                    </Link>
                  </m.span>
                );
              })}
            </nav>

            <m.div
              className="hidden lg:block"
              initial={shouldReduce ? false : { opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={springSmooth}
            >
              <Magnetic>
                <Link to="/contact" className="btn-signal !px-5 !py-2.5 !text-[10px]">
                  Start a project <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </Magnetic>
            </m.div>

            <button
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden flex flex-col items-center justify-center gap-[5px] w-11 h-11 -mr-2"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              <span className={`block w-6 h-px bg-ink transition-transform duration-300 ${open ? 'translate-y-[6px] rotate-45' : ''}`} />
              <span className={`block w-6 h-px bg-ink transition-opacity duration-300 ${open ? 'opacity-0' : ''}`} />
              <span className={`block w-6 h-px bg-ink transition-transform duration-300 ${open ? '-translate-y-[6px] -rotate-45' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      <m.div
        initial={false}
        animate={{ opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none' }}
        transition={{ duration: 0.28 }}
        className="lg:hidden fixed inset-0 z-40 bg-paper flex flex-col justify-center px-6"
      >
        <div className="relative z-10 flex flex-col">
          {NAV.map((item, i) => (
            <m.div
              key={item.path}
              initial={{ opacity: 0, y: 16 }}
              animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ delay: open ? 0.05 * i : 0, duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="border-b border-ink/12"
            >
              <Link
                to={item.path}
                className="display-lg block text-[13vw] leading-[1.1] py-3 hover:text-signal transition-colors"
              >
                {item.label}
              </Link>
            </m.div>
          ))}
        </div>
        <m.div
          initial={{ opacity: 0 }}
          animate={open ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.26 }}
          className="relative z-10 mt-10 flex flex-col label normal-case"
        >
          <a href="mailto:support@beforth.in" className="flex items-center min-h-[28px] hover:text-signal transition-colors">support@beforth.in</a>
          <a href="tel:+919766183834" className="flex items-center min-h-[28px] hover:text-signal transition-colors">+91 97661 83834</a>
        </m.div>
      </m.div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */
function Hero() {
  return (
    <section className="pt-32 md:pt-40 pb-16 md:pb-24 border-b border-ink/12">
      <div className="wrap grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-6 items-center">
        <div>
        <span className="label">Nashik, Maharashtra, India</span>

        <h1 className="display-xl text-[clamp(2rem,5.6vw,4.25rem)] max-w-[20ch] mt-5">
          Custom ERP, CRM and HR software for your <span className="accent">business.</span>
        </h1>

        <p className="lead max-w-xl mt-6">
          We replace spreadsheets and scattered tools with one system built around how your
          company works. Used by manufacturing, pharma, distribution and service firms.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link to="/contact" className="btn-signal">
            Start a project <ArrowRight className="w-4 h-4" />
          </Link>
          <a href="#services" className="ulink">
            What we build <ArrowDown className="w-3.5 h-3.5" />
          </a>
        </div>
        </div>
        <HeroDoodle className="w-full max-w-[540px] mx-auto lg:max-w-none" />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Positioning                                                         */
/* ------------------------------------------------------------------ */
function Positioning() {
  return (
    <section className="py-14 md:py-16">
      <div className="wrap">
        <div className="grid lg:grid-cols-[0.28fr_1fr] gap-8 lg:gap-14 items-start">
          <Reveal>
            <div className="rule mb-5" />
            <span className="label">What we do</span>
            <HubDoodle className="hidden lg:block w-44 mt-8" />
          </Reveal>
          <Reveal delay={0.08}>
            <p className="display-lg text-xl md:text-[28px] leading-[1.3] max-w-[30ch]">
              We build the systems a business runs on: sales, inventory, service, finance and
              reporting, <span className="accent">connected in one place.</span>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Fit                                                                 */
/* ------------------------------------------------------------------ */
function Fit() {
  return (
    <section className="section bg-bone">
      <div className="wrap relative z-10">
        <SectionHead
          title={<>Built for companies that have <span className="accent">outgrown spreadsheets.</span></>}
        />

        <div className="grid lg:grid-cols-2 gap-5">
          <Reveal>
            <div className="surface p-6 md:p-8 h-full relative">
              <SheetDoodle className="absolute top-3 right-3 w-20 md:w-24" />
              <h3 className="display-md text-base mb-6 text-signal">You will get on well if…</h3>
              <ul className="flex flex-col gap-3">
                {FITS.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-signal mt-2.5 shrink-0" />
                    <span className="body text-ink/85">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.07}>
            <div className="surface p-6 md:p-8 h-full relative">
              <SiteDoodle className="absolute top-3 right-3 w-20 md:w-24" />
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
  );
}

/* ------------------------------------------------------------------ */
/* Services                                                             */
/* ------------------------------------------------------------------ */
function ServicesSection() {
  return (
    <section id="services" className="section scroll-mt-20">
      <div className="wrap">
        <SectionHead
          label="What we build"
          title={<>Five things. One accountable partner.</>}
        />

        <div className="border-t border-ink/12">
          {SERVICES.map((service, i) => (
            <Reveal key={service.n} delay={i * 0.04}>
              <Link
                to={service.to}
                className="group grid md:grid-cols-[3.5rem_1fr_auto] gap-x-8 gap-y-2 py-6 md:py-7 px-3 -mx-3 transition-colors duration-500 hover:bg-bone/50"
              >
                <span className="label transition-colors duration-500 group-hover:text-signal">
                  {service.n}
                </span>
                <h3 className="display-lg text-[clamp(1.3rem,2.4vw,1.9rem)] transition-colors duration-500 group-hover:text-signal">
                  {service.title}
                </h3>
                <div className="flex items-center gap-6 md:justify-end">
                  <p className="body text-right max-w-sm">{service.desc}</p>
                  <span className="w-8 h-8 border border-ink/15 flex items-center justify-center shrink-0 transition-[background-color,border-color,color] duration-500 group-hover:bg-signal group-hover:border-signal group-hover:text-white">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Product proof                                                        */
/* ------------------------------------------------------------------ */
function ProductProof() {
  return (
    <section className="section bg-bone">
      <div className="wrap relative z-10">
        <SectionHead
          title="This is what we actually build."
          note="A representative screen from a business management system."
        />

        <Reveal>
          <div className="surface overflow-hidden">
            <Suspense fallback={<DemoPlaceholder />}>
              <ProductShowcase />
            </Suspense>
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 md:px-7 py-4 border-t border-ink/12 bg-paper">
              <span className="figure-cap">Sales · Inventory · Service · People · Finance · Reports</span>
              <Link to="/contact" className="ulink">
                Request a walkthrough <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Method                                                               */
/* ------------------------------------------------------------------ */
function Method() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="rule mb-6" />
            <span className="label block mb-4">How we work</span>
            <h2 className="display-lg text-[clamp(1.8rem,4.2vw,3rem)] mb-5 max-w-[16ch]">
              A method, not a guess.
            </h2>
            <p className="body max-w-xs">
              Five stages, every time. The order is why the result fits.
            </p>
            <RoadDoodle className="hidden lg:block w-60 mt-10" />
          </div>

          <div className="border-t border-ink/12">
            {METHOD.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.05}>
                <div className="group grid sm:grid-cols-[3.5rem_1fr] gap-x-6 gap-y-1 py-5 md:py-6 border-b border-ink/12">
                  <span className="label text-signal">{step.n}</span>
                  <div>
                    <h3 className="display-md text-lg mb-1 transition-colors duration-500 group-hover:text-signal">
                      {step.title}
                    </h3>
                    <p className="body">{step.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Why + outcomes                                                       */
/* ------------------------------------------------------------------ */
function Why() {
  return (
    <section className="section bg-bone">
      <div className="wrap relative z-10">
        <SectionHead
          title={<>Software built around <span className="accent">your business.</span></>}
          note="Four commitments we hold every project to, and what they change for you."
        />

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <ol className="lg:col-span-7 border-t border-ink/15">
            {REASONS.map((reason, i) => (
              <Reveal key={reason.title} delay={i * 0.05}>
                <li className="grid grid-cols-[56px_1fr] sm:grid-cols-[72px_1fr] gap-x-5 py-6 border-b border-ink/15">
                  <ReasonDoodle index={i} className="w-14 h-14 sm:w-[72px] sm:h-[72px]" />
                  <div>
                    <h3 className="display-md text-[19px] md:text-[21px]">{reason.title}</h3>
                    <p className="body-tight mt-1 !text-[14.5px] !text-ink/80">{reason.desc}</p>
                    <p className="body-tight mt-2 !text-[13.5px]">{reason.how}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="bg-ink text-paper p-6 md:p-8 flex flex-col">
              <h3 className="display-lg text-[clamp(1.4rem,2.4vw,1.85rem)] mb-6 max-w-[18ch]">From workarounds to a system that fits.</h3>
              <ul className="flex flex-col">
                {OUTCOMES.map((row) => (
                  <li key={row.to} className="grid gap-1 py-4 border-t border-paper/15">
                    <span className="text-[13px] text-paper/65 line-through decoration-paper/40 decoration-1">{row.from}</span>
                    <span className="flex items-center gap-3 text-[17px] md:text-[18px] font-semibold tracking-[-0.015em]">
                      <Check className="w-4 h-4 shrink-0 text-wave" strokeWidth={3} />
                      {row.to}
                    </span>
                  </li>
                ))}
              </ul>
              <TangleDoodle className="w-56 mt-5 -mb-1" />
              <p className="mt-3 pt-5 border-t border-paper/15 text-[13px] text-paper/65 leading-relaxed">
                A system you own and that fits your process, not a subscription you adapt to.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Selected work                                                        */
/* ------------------------------------------------------------------ */
/**
 * The two systems shown under "Selected work" are demonstration builds built
 * to show interface and workflow, using sample data. They are labelled as
 * such rather than presented as client deliveries.
 *
 * Real client case studies live in src/data/caseStudies.ts and render only
 * once a genuine, verifiable engagement exists. When that list is empty this
 * section says so plainly instead of showing filler.
 */

function SelectedWork() {
  const realWork = PUBLISHED_CASE_STUDIES;
  const hasRealWork = realWork.length > 0;
  const items = hasRealWork ? realWork : DEMO_WORK;
  if (items.length === 0) return null;

  return (
    <section className="section bg-bone">
      <div className="wrap relative z-10">
        <SectionHead
          title={hasRealWork ? (
            <>Client systems we built and <span className="accent">stand behind.</span></>
          ) : (
            <>Two systems we designed end to <span className="accent">end.</span></>
          )}
          note={hasRealWork
            ? undefined
            : 'Demonstration builds. Client case studies are published as permissions allow.'}
        />

        <div className="grid md:grid-cols-2 gap-5">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <div className="h-full p-6 md:p-8 bg-paper border border-ink/12">
                <span className="label block mb-4">{item.kind}</span>
                <h3 className="display-lg text-xl md:text-2xl mb-3">{item.title}</h3>
                <p className="body-tight mb-6">{item.desc}</p>
                <ul className="flex flex-wrap gap-1.5">
                  {item.points.map((point) => (
                    <li key={point} className="label !text-[10px] border border-ink/12 px-2.5 py-1">
                      {point}
                    </li>
                  ))}
                </ul>
                {'metrics' in item && (
                  <dl className="mt-6 pt-5 border-t border-ink/12 grid gap-3">
                    {item.metrics.map((m) => (
                      <div key={m.label} className="flex items-baseline justify-between gap-4">
                        <dt className="body-tight">{m.label}</dt>
                        <dd className="accent font-semibold text-[15px] whitespace-nowrap">{m.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Clients: names only, as supplied by the owner (src/data/clients.ts)  */
/* ------------------------------------------------------------------ */
function ClientsLine() {
  return (
    <section className="pt-4 pb-14 md:pb-20">
      <div className="wrap grid lg:grid-cols-[260px_1fr] gap-x-14 gap-y-5 items-baseline">
        <p className="display-md text-[18px] md:text-xl">Businesses already running on our systems.</p>
        <div>
          <ul className="flex flex-wrap gap-x-7 gap-y-1.5 display-md text-[17px] md:text-[22px] !text-ink/85">
            {CLIENTS.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <Link to="/portfolio#clients" className="inline-flex items-center gap-1.5 mt-5 text-[14px] font-semibold text-signal hover:text-signal-deep">
            See the work <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Technology                                                           */
/* ------------------------------------------------------------------ */
const TECH = [
  { group: 'Web', items: ['Next.js', 'React', 'Node.js', 'PostgreSQL'] },
  { group: 'Mobile', items: ['Flutter', 'React Native', 'Swift', 'Kotlin'] },
  { group: 'Backend', items: ['Python', 'Django', 'REST APIs', 'Docker', 'Git / GitHub'] },
  { group: 'Systems', items: ['AI-powered workflows', 'Automation', 'Data-driven applications'] },
];

function Technology() {
  return (
    <section className="section">
      <div className="wrap">
        <SectionHead
          title="Chosen per product, not by default."
          note="We confirm the stack during discovery, once we know what the system has to do."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-8 border-t border-ink/15 pt-6">
          {TECH.map((group) => (
            <div key={group.group}>
              <h3 className="display-md text-sm uppercase tracking-[0.1em] mb-3">{group.group}</h3>
              <ul className="flex flex-col gap-1.5">
                {group.items.map((item) => (
                  <li key={item} className="body-tight">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Resolve a FAQ's `related` slug to a route. Product slugs become product
 * page links; anything else is treated as a static route. Centralised so the
 * link text and the destination can never point at different things.
 */
function faqLink(slug: string): string {
  return PLATFORMS.some((p) => p.slug === slug) ? `/product/${slug}` : `/${slug}`;
}

function faqLinkLabel(slug: string): string {
  const platform = PLATFORMS.find((p) => p.slug === slug);
  if (platform) return `${platform.name} details`;
  if (slug === 'services') return 'All services';
  if (slug === 'contact') return 'Contact the team';
  return 'Read more';
}

function Faq() {
  return (
    <section className="pb-20 md:pb-28">
      <div className="wrap">
        <SectionHead label="FAQ" title="Questions worth answering." />
        <div className="grid lg:grid-cols-[1fr_260px] gap-x-14 items-start">
        <div className="border-t border-ink/12">
          {FAQ.map((item, i) => (
            <Reveal key={item.q} delay={Math.min(i, 4) * 0.04}>
              <details className="group py-4 md:py-5 border-b border-ink/12">
                <summary className="flex items-start gap-4 cursor-pointer list-none min-h-[32px]">
                  <span className="label text-signal shrink-0 pt-1">{String(i + 1).padStart(2, '0')}</span>
                  <span className="flex-1 display-md text-base md:text-lg transition-colors duration-300 group-open:text-signal">
                    {item.q}
                  </span>
                  <span className="shrink-0 text-ash group-open:text-signal transition-colors text-lg leading-none pt-0.5">
                    +
                  </span>
                </summary>
                <p className="body max-w-2xl mt-2.5 pl-9 md:pl-12">{item.a}</p>
                {item.related && (
                  <p className="pl-9 md:pl-12 mt-3">
                    <Link to={faqLink(item.related)} className="ulink">
                      {faqLinkLabel(item.related)}{' '}
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </p>
                )}
              </details>
            </Reveal>
          ))}
        </div>
        <FaqDoodle className="hidden lg:block w-full sticky top-28" />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Sectors                                                              */
/* ------------------------------------------------------------------ */
function Sectors() {
  return (
    <section className="pb-20 md:py-20">
      <div className="wrap">
        <SectionHead title="Where we do our best work." />
        <ul className="grid md:grid-cols-2 gap-x-14 border-t border-ink/15">
          {INDUSTRIES.map((industry) => (
            <li key={industry.name} className="grid grid-cols-[28px_1fr] gap-x-4 py-5 border-b border-ink/15">
              <SectorIcon name={industry.name} className="w-6 h-6 mt-0.5" />
              <div>
                <h3 className="display-md text-[17px]">{industry.name}</h3>
                <p className="body-tight mt-1">{industry.does}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* CTA                                                                  */
/* ------------------------------------------------------------------ */
function CTA() {
  return (
    <section className="pb-20 md:pb-28">
      <div className="wrap">
        <Reveal>
          <div className="surface-ink p-8 md:p-14 relative overflow-hidden">
            <div
              className="absolute -right-24 -bottom-28 w-[32rem] h-[32rem] pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(28,117,188,0.30) 0%, transparent 66%)' }}
            />
            <PlaneDoodle className="hidden md:block absolute right-8 top-4 w-60 pointer-events-none" />
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <div className="max-w-xl">
                <span className="label !text-paper/50 block mb-5">Next step</span>
                <h2 className="display-lg text-[clamp(1.7rem,4vw,2.9rem)] text-paper mb-5">
                  Tell us how your business runs today.
                </h2>
                <p className="text-paper/60 text-base leading-relaxed">
                  We will show you the technology it should run on, even when the answer is less
                  software than you expected.
                </p>
              </div>
              <div className="flex flex-col items-start lg:items-end gap-3 shrink-0">
                <Magnetic>
                  <Link to="/contact" className="btn-invert !px-8 !py-4">
                    Book a conversation <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </Magnetic>
                <a
                  href="mailto:support@beforth.in"
                  className="flex items-center min-h-[28px] label !text-paper/70 hover:!text-paper transition-colors"
                >
                  support@beforth.in
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                               */
/* ------------------------------------------------------------------ */
function Footer() {
  return (
    <footer className="border-t border-ink/12 bg-bone/40">
      <div className="wrap relative z-10 pt-12 pb-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-[1.25fr_0.6fr_0.95fr_1.05fr_1fr] gap-10">
          <div>
            <div className="mb-4">
              <img src="/logo.png" alt="BeForth" className="h-8 w-auto" />
            </div>
            <p className="display-md text-lg">Think better. Build smarter.</p>
          </div>

          <div>
            <span className="label block mb-3">Navigate</span>
            <ul className="flex flex-col">
              {NAV.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="flex items-center min-h-[28px] body-tight hover:text-signal transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="label block mb-3">Services</span>
            <ul className="flex flex-col">
              {SERVICES.map((s) => (
                <li key={s.n}>
                  <Link
                    to="/services"
                    className="flex items-center min-h-[28px] body-tight hover:text-signal transition-colors"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="label block mb-3">Platforms</span>
            <ul className="flex flex-col">
              {PLATFORMS.map((x) => (
                <li key={x.slug}>
                  <Link
                    to={`/product/${x.slug}`}
                    className="flex items-center min-h-[28px] body-tight hover:text-signal transition-colors"
                  >
                    {x.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="label block mb-3">Contact</span>
            <ul className="flex flex-col">
              <li>
                <a
                  href="mailto:support@beforth.in"
                  className="flex items-center gap-2 min-h-[28px] body-tight hover:text-signal transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 shrink-0" /> support@beforth.in
                </a>
              </li>
              <li>
                <a
                  href="tel:+919766183834"
                  className="flex items-center gap-2 min-h-[28px] body-tight hover:text-signal transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 shrink-0" /> +91 97661 83834
                </a>
              </li>
              <li className="flex items-start gap-2 py-1.5 body-tight">
                <MapPin className="w-3.5 h-3.5 mt-1 shrink-0" /> Nashik, India
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-5 border-t border-ink/12 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <p className="label !normal-case !tracking-[0.06em]">© {new Date().getFullYear()} Beforth</p>
          <div className="flex flex-wrap items-center gap-x-2">
            {[['/privacy-policy', 'Privacy Policy'], ['/terms', 'Terms & Conditions'], ['/cookie-policy', 'Cookie Policy']].map(([to, label]) => (
              <Link key={to} to={to} className="flex items-center min-h-[28px] px-2 label hover:text-signal transition-colors">
                {label}
              </Link>
            ))}
            <a
              href="https://in.linkedin.com/company/beforth"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center min-h-[28px] px-2 label hover:text-signal transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://www.instagram.com/beforth.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center min-h-[28px] px-2 label hover:text-signal transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* SEO                                                                  */
/* ------------------------------------------------------------------ */
const META: Record<string, { title: string; description: string; keywords: string }> = {
  '/': {
    title: 'Beforth | Custom ERP & Business Software, Nashik India',
    description:
      'Beforth builds custom ERP, CRM, HRMS, inventory, automation, web and mobile software, designed around how your organisation actually operates.',
    keywords: 'custom ERP software Nashik, CRM development India, HRMS and payroll software, inventory management system, business automation, custom software company Maharashtra',
  },
  '/portfolio': {
    title: 'Portfolio | ERP, CRM, HRMS & Mobile Systems — Beforth',
    description:
      'Eleven business systems by Beforth, shown running: custom ERP, delivery tracking, salon ERP, HRMS, CRM, payroll, POS, apps and websites. Nashik, India.',
    keywords: 'Beforth portfolio, ERP software examples, CRM demo, HRMS payroll software, delivery tracking app, custom software Nashik',
  },
  '/insights': {
    title: 'Insights | Practical Notes on Business Systems — BeForth',
    description:
      'Practical notes from BeForth on ERP, CRM, HRMS, payroll, inventory and POS systems for manufacturing, pharma, distribution and service companies.',
    keywords: 'ERP insights, business software guides, custom software best practices, India ERP advice',
  },
  '/services': {
    title: 'Services | Custom ERP, CRM, HRMS & Automation — Beforth',
    description:
      'Custom ERP, CRM, HRMS and payroll, inventory management, business automation, web applications and mobile applications by Beforth, Nashik, India.',
    keywords: 'custom ERP developer Nashik, CRM software India, HRMS payroll developer, inventory management system, business process automation',
  },
  '/about': {
    title: 'About Beforth | Custom Business Software Company, Nashik',
    description:
      'Beforth is a software company in Nashik, Maharashtra, founded in 2025, building custom business systems, workflow automation and operational visibility.',
    keywords: 'about Beforth, custom software company Nashik, ERP development company Maharashtra, IT services Nashik',
  },
  '/team': {
    title: 'Team | The People Behind the Builds — Beforth, Nashik',
    description:
      'Meet the Beforth team — engineers, designers and strategists delivering custom software, automation and digital platforms from Nashik, India.',
    keywords: 'Beforth team, software developers Nashik, technology team Maharashtra',
  },
  '/contact': {
    title: 'Contact Beforth | Discuss Your ERP or Software Project',
    description:
      'Talk to Beforth about custom ERP, CRM, HRMS, inventory or automation projects. Based in Nashik, Maharashtra, India.',
    keywords: 'contact Beforth, hire ERP developer India, custom software quote Nashik, business automation consultation',
  },
};

const LEGAL_META: Record<string, { title: string; description: string; keywords: string }> = {
  '/privacy-policy': {
    title: 'Privacy Policy | Beforth',
    description: 'How Beforth collects, uses and protects personal information submitted through beforth.in, and the choices you have.',
    keywords: 'Beforth privacy policy',
  },
  '/terms': {
    title: 'Terms & Conditions | Beforth',
    description: 'The terms for using the Beforth website, including disclaimers and governing law.',
    keywords: 'Beforth terms and conditions',
  },
  '/cookie-policy': {
    title: 'Cookie Policy | Beforth',
    description: 'The cookies and similar technologies used on beforth.in and how to control them.',
    keywords: 'Beforth cookie policy',
  },
};
Object.assign(META, LEGAL_META);

function setMeta(selector: string, attrs: Record<string, string>, content: string) {
  let el = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/** Starts loading the code for a route, so its first render does not suspend. */
export function preloadRoute(pathname: string): Promise<unknown> {
  const p = pathname.replace(/\/+$/, '') || '/';
  if (p === '/') return loadShowcase();
  if (p === '/services') return loadServices();
  if (p === '/portfolio') return loadPortfolio();
  if (p === '/about') return loadAbout();
  if (p === '/team') return loadTeam();
  if (p === '/contact') return loadContact();
  if (p === '/insights') return loadInsights();
  if (p.startsWith('/insights/')) return loadInsightArticle();
  if (p.startsWith('/product/')) return loadProductPage();
  if (p in LEGAL_META) return loadLegal();
  return NotFound.preload();
}

/** Metadata for a route. `known` is false for unknown URLs, which must not be indexed. */
function metaFor(rawPathname: string) {
  // /about/ and /about are the same page.
  const pathname = rawPathname.replace(/\/+$/, '') || '/';
  const product = pathname.startsWith('/product/') ? getPlatform(pathname.split('/')[2]) : undefined;
  const article = pathname.startsWith('/insights/')
    ? PUBLISHED_INSIGHTS.find((i) => i.slug === pathname.split('/')[2])
    : undefined;
  const meta = product
    ? { title: product.seoTitle, description: product.seoDescription, keywords: product.keywords }
    : article
    ? { title: `${article.title} | BeForth`, description: article.summary, keywords: 'custom ERP, business software, ERP guide, India' }
    : META[pathname] ?? {
      title: 'Page not found | Beforth',
      description: 'This page does not exist. Browse Beforth services, products and contact details.',
      keywords: 'Beforth',
    };
  return { meta, known: !!product || !!article || pathname in META };
}

function SeoManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    const { meta, known } = metaFor(pathname);
    const path = pathname.replace(/\/+$/, '') || '/';
    const canonical = `https://beforth.in${path === '/' ? '/' : path}`;

    document.title = meta.title;
    setMeta('meta[name="description"]', { name: 'description' }, meta.description);
    setMeta('meta[name="robots"]', { name: 'robots' }, known ? 'index, follow, max-image-preview:large' : 'noindex, follow');
    setMeta('meta[name="keywords"]', { name: 'keywords' }, meta.keywords);
    setMeta('meta[property="og:title"]', { property: 'og:title' }, meta.title);
    setMeta('meta[property="og:description"]', { property: 'og:description' }, meta.description);
    setMeta('meta[property="og:url"]', { property: 'og:url' }, canonical);
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title' }, meta.title);
    setMeta('meta[name="twitter:description"]', { name: 'twitter:description' }, meta.description);

    let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = canonical;
  }, [pathname]);

  return null;
}

/**
 * Route-scoped structured data.
 *
 * The organization-level graph also ships statically in index.html for
 * crawlers that never execute JavaScript. This component adds the nodes that
 * only make sense on one route: breadcrumbs on every page, FAQPage on the
 * home page, and a Service node on each product page. Both graphs are keyed by
 * @id, so duplicate nodes across the two merge instead of conflicting.
 */
function StructuredData() {
  const { pathname } = useLocation();

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    const path = pathname.replace(/\/+$/, '') || '/';
    script.dataset.route = path;
    const { meta, known } = metaFor(pathname);
    script.textContent = JSON.stringify(routeGraph(path, known ? meta : undefined));
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, [pathname]);

  return null;
}

/* ------------------------------------------------------------------ */
/* Lazy-load fallback                                                  */
/* ------------------------------------------------------------------ */
/**
 * Deliberately static. The vault says content is visible immediately and no
 * element should signal "loading" with a spinner; this holds the exact space
 * the dashboard will occupy so nothing jumps when it arrives.
 */
function DemoPlaceholder() {
  return (
    <div className="bg-paper px-5 md:px-7 py-4 border-b border-ink/12">
      <span className="figure-cap">Loading the sample screen…</span>
    </div>
  );
}

function RouteFallback() {
  return (
    <div className="wrap py-24 md:py-32">
      <span className="label">Loading</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* App                                                                  */
/* ------------------------------------------------------------------ */
export default function App() {
  const { hash } = useLocation();

  const { pathname } = useLocation();

  // Fetch every page chunk once the browser is idle, so a route change never
  // waits on the network or flashes the Suspense fallback mid-animation.
  useEffect(() => {
    const preload = () => [loadServices, loadAbout, loadTeam, loadContact, loadInsights, loadInsightArticle, loadProductPage, loadLegal, loadShowcase].forEach((f) => f());
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
    if (w.requestIdleCallback) w.requestIdleCallback(preload);
    else window.setTimeout(preload, 1200);
  }, []);

  // Count phone and email link clicks anywhere on the site (names only, no data).
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const href = (e.target as Element).closest?.('a')?.getAttribute('href') ?? '';
      if (href.startsWith('tel:')) track('phone_click');
      else if (href.startsWith('mailto:')) track('email_click');
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  // Animate only after the first navigation, so the prerendered first paint is
  // never held at opacity 0.
  const lastPath = useRef(pathname);
  const animate = useRef(false);
  if (lastPath.current !== pathname) {
    lastPath.current = pathname;
    animate.current = true;
  }

  // New page starts at the top; hash links are handled by the effect below.
  useLayoutEffect(() => {
    if (!window.location.hash) window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  // A link to a hash on the current page scrolls; a real navigation is handled
  // by the transition above, which already resets to the top.
  useEffect(() => {
    if (!hash) return;
    const t = window.setTimeout(() => {
      try { document.querySelector(hash)?.scrollIntoView({ block: 'start' }); } catch { /* not a valid selector */ }
    }, 90);
    return () => window.clearTimeout(t);
  }, [hash]);

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <DoodleDefs />
        <SeoManager />
        <StructuredData />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-ink focus:text-paper focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <Navbar />

        <main id="main-content" key={pathname} className={animate.current ? 'page-enter' : undefined}>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<><Hero /><Positioning /><ClientsLine /><Fit /><ServicesSection /><ProductProof /><Method /><Why /><SelectedWork /><Technology /><Sectors /><Faq /><CTA /></>} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/insights" element={<InsightsPage />} />
              <Route path="/insights/:slug" element={<InsightArticle />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy-policy" element={<LegalPage kind="privacy" />} />
              <Route path="/terms" element={<LegalPage kind="terms" />} />
              <Route path="/cookie-policy" element={<LegalPage kind="cookies" />} />
              <Route path="/product/:slug" element={<ProductPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />
        <ConsentBanner />
      </MotionConfig>
    </LazyMotion>
  );
}
