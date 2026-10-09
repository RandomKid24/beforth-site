/**
 * Structured data for search engines and AI answer engines.
 *
 * Design note: the same `@graph` is injected here and mirrored as a static
 * <script> in index.html, because after prerendering the crawlers that do not
 * execute JavaScript still need the Organization entity to be present.
 * `organizationGraph()` is the single source of truth — index.html is
 * generated from it by scripts/emit-static-schema.mjs, so the two cannot drift.
 *
 * Only verifiable facts appear here. There are no review counts, ratings,
 * founding years or client names on this site, and nothing here invents them.
 * If a fact is not published elsewhere on the site, it does not belong here.
 */

import { FAQ } from '@/data/faq';
import { PLATFORMS } from '@/components/platforms/catalog';

/** The canonical URL path for a platform slug. */
export const platformPath = (slug: string) => `/product/${slug}`;

export const ORIGIN = 'https://beforth.in';

export const ORG = {
  name: 'BeForth',
  legalName: 'BeForth',
  url: `${ORIGIN}/`,
  logo: `${ORIGIN}/logo.png`,
  email: 'support@beforth.in',
  /** E.164 — required for phone to be machine-readable. */
  telephone: '+919766183834',
  telephoneDisplay: '+91 97661 83834',
  addressLocality: 'Nashik',
  addressRegion: 'Maharashtra',
  addressCountry: 'IN',
  foundingDate: undefined as string | undefined,
  sameAs: [
    'https://in.linkedin.com/company/beforth',
    'https://www.instagram.com/beforth.in',
  ],
  description:
    'BeForth is a software company in Nashik, India. We build custom ERP, CRM, HRMS, payroll and inventory systems, workflow automation, web platforms and mobile applications for manufacturing, pharma, distribution and service companies.',
};

/** Human-readable location string, reused everywhere for NAP consistency. */
export const LOCATION_LINE = 'Nashik, Maharashtra, India';

/** The named people on /team. Roles are as published there. */
export const PEOPLE = [
  {
    id: 'vivek-zope',
    name: 'Vivek Zope',
    jobTitle: 'Chief Executive Officer',
    description:
      'Leads client partnerships and product direction at BeForth, keeping every engagement tied to a business outcome.',
  },
  {
    id: 'ritesh-mahale',
    name: 'Ritesh Mahale',
    jobTitle: 'Chief Technology Officer',
    description:
      'Owns architecture, data modelling and backend engineering at BeForth.',
  },
  {
    id: 'aditya-badgujar',
    name: 'Aditya Badgujar',
    jobTitle: 'Chief Operating Officer',
    description:
      'Runs research, interface design and frontend engineering at BeForth.',
  },
];

export const SERVICE_TYPES = [
  'Custom ERP Development',
  'CRM Development',
  'HRMS and Payroll Systems',
  'Inventory Management Systems',
  'Business Process Automation',
  'Web Application Development',
  'Mobile Application Development',
];

/** Software products shipped by BeForth that are publicly linked. */
export const PRODUCTS = [
  {
    name: 'Neomed Delivery',
    operatingSystem: 'Android',
    url: 'https://play.google.com/store/apps/details?id=com.neomad.neomad_app',
    description:
      'Enterprise delivery platform for pharmacy and healthcare distribution operations, supporting delivery assignments, proof of delivery, route handling, live location sharing, notifications and delivery history.',
  },
  {
    name: '4Form',
    operatingSystem: 'Web',
    url: 'https://4form.beforth.in/',
    description:
      'Form-management and workflow platform for creating, managing and tracking digital forms, with analytics, email automation, CRM integration, validation, submission tracking and API integrations.',
  },
];

/* ------------------------------------------------------------------ */
/* Graph builders                                                      */
/* ------------------------------------------------------------------ */

const organization = () => ({
  '@type': 'Organization',
  '@id': `${ORIGIN}/#organization`,
  name: ORG.name,
  legalName: ORG.legalName,
  url: ORG.url,
  logo: ORG.logo,
  image: ORG.logo,
  description: ORG.description,
  email: ORG.email,
  telephone: ORG.telephone,
  address: {
    '@type': 'PostalAddress',
    addressLocality: ORG.addressLocality,
    addressRegion: ORG.addressRegion,
    addressCountry: ORG.addressCountry,
  },
  areaServed: [
    { '@type': 'Country', name: 'India' },
    { '@type': 'Place', name: 'Nashik, Maharashtra' },
  ],
  sameAs: ORG.sameAs,
});

/**
 * LocalBusiness is the subtype Google uses for local ranking, and the one an
 * AI engine is most likely to quote back for "software company in Nashik".
 * `ProfessionalService` alone under-specifies the local entity.
 */
const localBusiness = () => ({
  '@type': 'ProfessionalService',
  '@id': `${ORIGIN}/#localbusiness`,
  name: ORG.name,
  url: ORG.url,
  logo: ORG.logo,
  image: ORG.logo,
  description: ORG.description,
  email: ORG.email,
  telephone: ORG.telephone,
  address: {
    '@type': 'PostalAddress',
    addressLocality: ORG.addressLocality,
    addressRegion: ORG.addressRegion,
    addressCountry: ORG.addressCountry,
  },
  geo: undefined,
  areaServed: [
    { '@type': 'City', name: 'Nashik' },
    { '@type': 'State', name: 'Maharashtra' },
    { '@type': 'Country', name: 'India' },
  ],
  parentOrganization: { '@id': `${ORIGIN}/#organization` },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Custom software services',
    itemListElement: SERVICE_TYPES.map((serviceType) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: serviceType, provider: { '@id': `${ORIGIN}/#organization` } },
    })),
  },
});

const website = () => ({
  '@type': 'WebSite',
  '@id': `${ORIGIN}/#website`,
  url: ORG.url,
  name: `${ORG.name} — Custom ERP, CRM and HR software`,
  description: ORG.description,
  inLanguage: 'en-IN',
  publisher: { '@id': `${ORIGIN}/#organization` },
});

const people = () =>
  PEOPLE.map((p) => ({
    '@type': 'Person',
    '@id': `${ORIGIN}/team/#${p.id}`,
    name: p.name,
    jobTitle: p.jobTitle,
    description: p.description,
    worksFor: { '@id': `${ORIGIN}/#organization` },
  }));

const products = () =>
  PRODUCTS.map((prod) => ({
    '@type': 'SoftwareApplication',
    name: prod.name,
    applicationCategory: 'BusinessApplication',
    operatingSystem: prod.operatingSystem,
    description: prod.description,
    url: prod.url,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
    author: { '@id': `${ORIGIN}/#organization` },
  }));

/** One Service node per product page, linked to that page's URL. */
const services = () =>
  PLATFORMS.map((p) => {
    const path = platformPath(p.slug);
    return {
      '@type': 'Service',
      '@id': `${ORIGIN}${path}#service`,
      name: p.name,
      serviceType: p.seoTitle?.split('|')[0]?.trim() ?? p.name,
      description: p.seoDescription,
      provider: { '@id': `${ORIGIN}/#organization` },
      areaServed: { '@type': 'Country', name: 'India' },
      url: `${ORIGIN}${path}`,
    };
  });

/**
 * A page may only be marked up FAQPage if the questions are actually visible
 * on it. The home page renders the shared FAQ list; each product page renders
 * its own per-platform list from the catalog. The plain pages render neither,
 * so carrying FAQPage there would be a structured-data violation.
 */
function faqPageFor(pathname: string) {
  if (pathname === '/') {
    return {
      '@type': 'FAQPage',
      '@id': `${ORIGIN}/#faq`,
      mainEntity: FAQ.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    };
  }

  if (pathname.startsWith('/product/')) {
    const slug = pathname.split('/')[2];
    const p = PLATFORMS.find((x) => x.slug === slug);
    if (!p?.faq?.length) return null;
    return {
      '@type': 'FAQPage',
      '@id': `${ORIGIN}${pathname}#faq`,
      mainEntity: p.faq.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    };
  }

  return null;
}

/* ------------------------------------------------------------------ */
/* Per-route graph                                                     */
/* ------------------------------------------------------------------ */

const CRUMBS: Record<string, { name: string; path: string }[]> = {
  '/': [],
  '/services': [{ name: 'Services', path: '/services' }],
  '/insights': [{ name: 'Insights', path: '/insights' }],
  '/about': [{ name: 'About', path: '/about' }],
  '/team': [{ name: 'Team', path: '/team' }],
  '/contact': [{ name: 'Contact', path: '/contact' }],
};

function breadcrumbList(pathname: string) {
  if (pathname.startsWith('/product/')) {
    const slug = pathname.split('/')[2];
    const p = PLATFORMS.find((x) => x.slug === slug);
    return {
      '@type': 'BreadcrumbList',
      '@id': `${ORIGIN}${pathname}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: ORIGIN },
        {
          '@type': 'ListItem',
          position: 2,
          name: p?.name ?? 'Product',
          item: `${ORIGIN}${pathname}`,
        },
      ],
    };
  }
  const crumbs = CRUMBS[pathname] ?? [];
  if (!crumbs.length) return null;
  return {
    '@type': 'BreadcrumbList',
    '@id': `${ORIGIN}${pathname}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: ORIGIN },
      ...crumbs.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: c.name,
        item: `${ORIGIN}${c.path}`,
      })),
    ],
  };
}

/**
 * The full graph for one route.
 *
 * FAQPage is included only on the home page, because that is the only page the
 * questions are rendered on. Marking up FAQ on pages that don't show it is a
 * structured-data violation and risks a manual action.
 */
export function routeGraph(pathname: string) {
  const crumbs = breadcrumbList(pathname);

  const graph: Record<string, unknown>[] = [
    organization(),
    localBusiness(),
    website(),
    ...people(),
    ...products(),
  ];

  const faq = faqPageFor(pathname);
  if (faq) graph.push(faq);
  if (crumbs) graph.push(crumbs);
  if (pathname.startsWith('/product/')) {
    graph.push(...services().filter((s) => s['@id']?.startsWith(`${ORIGIN}${pathname}`)));
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}

/**
 * The organisation-only graph written statically into index.html, so crawlers
 * that do not run JavaScript still receive the entity. Route-specific nodes
 * (breadcrumbs, FAQ, per-product services) are added by the client graph.
 */
export function organizationGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [organization(), localBusiness(), website(), ...people(), ...products()],
  };
}