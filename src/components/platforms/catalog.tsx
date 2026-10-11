import React from 'react';
import {
  Truck, Scissors, Users, Kanban, Smartphone, Globe, ShieldCheck, TrendingUp, IndianRupee, ReceiptText,
  type LucideIcon,
} from 'lucide-react';

import DeliveryPreview from './Delivery';
import SalonPreview from './Salon';
import HrmsPreview from './Hrms';
import CrmPreview from './Crm';
import AppsPreview from './Apps';
import WebPreview from './Web';
import TunnelPreview from './Tunnel';
import SeoPreview from './Seo';
import PayrollPreview from './Payroll';
import PosPreview from './Pos';

export interface Platform {
  /** URL slug: /product/<slug> */
  slug: string;
  name: string;
  sub: string;
  icon: LucideIcon;
  Preview: React.ComponentType;

  /* Short copy used by the home-page showcase. */
  summary: string;
  built: string;
  caps: string[];

  /* The product page. */
  seoTitle: string;
  seoDescription: string;
  keywords: string;
  headline: [string, string];
  lead: string;
  changes: { from: string; to: string }[];
  features: { title: string; desc: string }[];
  flow: { title: string; desc: string }[];
  faq: { q: string; a: string }[];
  related: string[];
  proof?: { text: string; href: string; cta: string };
}

export const PLATFORMS: Platform[] = [
  {
    slug: 'delivery-tracking',
    name: 'Delivery tracking',
    sub: 'Routes · proof of delivery',
    icon: Truck,
    Preview: DeliveryPreview,
    summary: 'Delivery partners follow a route and capture proof at every drop, while the office sees where each order is, live.',
    built: 'Pharmacy and healthcare distribution',
    caps: ['Assigned routes', 'Proof of delivery', 'Live location', 'Delivery history'],
    seoTitle: 'Delivery Tracking Software with Proof of Delivery | Beforth',
    seoDescription: 'Delivery tracking software and driver app: assigned routes, proof of delivery, live location and delivery history for pharmacy and distribution businesses. Built and run by Beforth, Nashik.',
    keywords: 'delivery tracking software India, delivery app for pharmacy, proof of delivery app, route management software, Nashik',
    headline: ['Know where every delivery is,', 'without calling anyone.'],
    lead: 'A delivery app for your drivers and a live view for your office. Routes are assigned, every drop is proved at the door, and the status of every order is visible the moment it changes.',
    changes: [
      { from: 'Calling drivers for an update', to: 'Live location and status for every route' },
      { from: 'Paper challans and missing signatures', to: 'Proof of delivery captured at the door' },
      { from: 'Arguments about what was delivered', to: 'A searchable delivery history' },
    ],
    features: [
      { title: 'Assigned routes and tasks', desc: 'Dispatch assigns a route. The driver sees stops in order, with what to hand over at each.' },
      { title: 'Proof of delivery', desc: 'A signature is captured at every drop, so a delivery is a record rather than a claim.' },
      { title: 'Live location', desc: 'The office sees where each driver is and how far through the route they are.' },
      { title: 'Notifications', desc: 'Drivers are told about new stops and changes. The office is told when a drop is done.' },
      { title: 'Special handling', desc: 'Items such as cold-chain stock carry handling notes that appear on the stop.' },
      { title: 'History and reports', desc: 'Every delivery is kept and searchable, with reports for dispatch and management.' },
    ],
    flow: [
      { title: 'Plan the route', desc: 'Dispatch groups orders into a route and assigns it to a driver.' },
      { title: 'Drive and deliver', desc: 'The driver follows the stops in the app, including when the signal is weak.' },
      { title: 'Capture proof', desc: 'Each drop is confirmed with a signature before the next stop opens.' },
      { title: 'Review and report', desc: 'The office sees the day as it happens and keeps the history.' },
    ],
    faq: [
      { q: 'Which phones do drivers need?', a: 'The delivery app runs on Android today, and we build an iOS version when a team needs one. It does not need expensive devices, which matters when the phone is issued to drivers rather than bought by them. We confirm the handset models your team actually carries during discovery.' },
      { q: 'What if a driver loses signal?', a: 'We design the app to keep working and send updates once the connection returns, so a dead zone does not stop a delivery. That means a drop in a basement, an industrial area or a rural route is still recorded at the door and reaches the office later, rather than being lost.' },
      { q: 'Can it connect to our billing or ERP?', a: 'Yes. Orders can flow in from your billing system and delivery status can flow back, so nobody enters the same thing twice. Proof of delivery is captured at the door and the order status reflects it, keeping dispatch, billing and the customer view on the same record.' },
      { q: 'What does the office actually see?', a: 'A live view of the status of every order, changing as it changes, plus the route assigned to each driver and the delivery history. Assign routes, follow progress and see what has been delivered and proved, without phoning drivers to ask where a vehicle is.' },
      { q: 'What is captured at the door?', a: 'Proof of delivery, captured on the driver phone at the point of handover, together with live location and the delivery history for that order. It gives the office a record of what was delivered and when, rather than a claim made later over the phone.' },
    ],
    related: ['mobile-apps', 'pos', 'crm'],
    proof: {
      text: 'This is built and running as Neomed, a delivery platform for pharmacy and healthcare distribution.',
      href: 'https://play.google.com/store/apps/details?id=com.neomad.neomad_app',
      cta: 'See it on Google Play',
    },
  },

  {
    slug: 'salon-erp',
    name: 'Salon ERP',
    sub: 'Appointments · billing · branches',
    icon: Scissors,
    Preview: SalonPreview,
    summary: 'Bookings, stylists, billing, packages and stock for salons, across every branch from one place.',
    built: 'Multi-branch salons and spas',
    caps: ['Appointments', 'Billing & packages', 'Stylist commissions', 'Branch reports'],
    seoTitle: 'Salon ERP for Multi-Branch Salons | Beforth',
    seoDescription: 'Salon management software for appointments, billing, packages, stock and stylist commissions across multiple branches. Custom-built and maintained by Beforth, Nashik.',
    keywords: 'salon software India, salon ERP, salon management software, multi-branch salon billing, appointment software Nashik',
    headline: ['Run every branch from', 'one salon system.'],
    lead: 'Appointments, stylists, billing, packages, stock and commissions in one place. Owners see every branch; managers and reception see their own.',
    changes: [
      { from: 'An appointment book on paper and WhatsApp', to: 'One live calendar per stylist' },
      { from: 'Month-end commission arithmetic', to: 'Commissions worked out from the bills' },
      { from: 'Products running out mid-service', to: 'Stock that updates with every bill' },
    ],
    features: [
      { title: 'Appointment calendar', desc: 'See every stylist’s day at a glance. Move an appointment along from booked to in the chair to billed.' },
      { title: 'Billing, packages and memberships', desc: 'Bills, bundled packages and prepaid memberships set up around your own prices and rules.' },
      { title: 'Stylist commissions', desc: 'Commission is calculated from what each stylist actually billed, to the rules you set.' },
      { title: 'Retail and consumable stock', desc: 'Track the products you sell and the ones you use, per branch.' },
      { title: 'Branches and roles', desc: 'Owner, manager, cashier and employee roles, each seeing only what they should.' },
      { title: 'Reports that answer questions', desc: 'Revenue by branch, service and stylist, and how busy each chair really is.' },
    ],
    flow: [
      { title: 'Book', desc: 'Reception books the service with the right stylist and time.' },
      { title: 'Serve', desc: 'The stylist marks the client in the chair; the room is accounted for.' },
      { title: 'Bill', desc: 'The bill, package use and stock deduction happen in one step.' },
      { title: 'Review', desc: 'Owners compare branches, stylists and services without a spreadsheet.' },
    ],
    faq: [
      { q: 'Can the owner see every branch?', a: 'Yes. Owners see all branches together or one at a time, while managers and reception are limited to their own. Branch reports are included, so the owner can compare performance across outlets without asking each manager for a separate number.' },
      { q: 'Do you support packages and memberships?', a: 'Yes. They are built around your own pricing and redemption rules instead of a fixed template. That covers how a package is sold, how sessions are redeemed and what remains against the customer, which is where off-the-shelf salon software usually forces a change in how you charge.' },
      { q: 'Can we move our existing client list in?', a: 'Yes. We migrate your client and service data as part of onboarding, so clients carry across with their history rather than starting as new records. This is done during testing and onboarding and validated with you before the system goes live.' },
      { q: 'How are stylists paid?', a: 'Stylist commissions are handled in the same system as appointments and billing, so commission is calculated from what was actually delivered and sold. The salon ERP covers appointments, billing, packages, stock and commissions in one place rather than as separate tools.' },
      { q: 'Does it cover stock as well as appointments?', a: 'Yes. Stock sits alongside appointments, billing and packages, so a product sold at the counter and a service booked for a client are handled in the same place. Owners, managers and reception each see the part of the business that is theirs to run.' },
    ],
    related: ['pos', 'crm', 'payroll'],
  },

  {
    slug: 'hrms',
    name: 'HRMS',
    sub: 'Attendance · leave · shifts',
    icon: Users,
    Preview: HrmsPreview,
    summary: 'Attendance, shifts, leave and approvals for the whole team, with biometric punches syncing in automatically.',
    built: 'Teams from ten to a few hundred people',
    caps: ['Attendance', 'Leave & approvals', 'Shift rosters', 'Biometric integration'],
    seoTitle: 'HRMS Software India: Attendance, Leave, Shifts | Beforth',
    seoDescription: 'Custom HRMS software for attendance, shifts, leave and approvals, with biometric integration. Built around your HR policies by Beforth, Nashik.',
    keywords: 'HRMS software India, attendance management software, leave management system, shift roster software, biometric attendance integration, Nashik',
    headline: ['HR that runs on', 'rules, not reminders.'],
    lead: 'Employee records, attendance, shifts and leave in one system, with the approvals and policies written into it so they are applied the same way every time.',
    changes: [
      { from: 'Attendance registers and Excel sheets', to: 'Attendance from biometric punches' },
      { from: 'Leave requested over WhatsApp', to: 'Requests with a clear approval trail' },
      { from: 'Shift changes lost in group chats', to: 'A roster everyone can see' },
    ],
    features: [
      { title: 'Employee records', desc: 'One profile per person: role, department, documents and history.' },
      { title: 'Attendance', desc: 'Punches flow in from biometric devices, with late arrivals and absences flagged.' },
      { title: 'Shift rosters', desc: 'Plan shifts by team or location and see changes as they happen.' },
      { title: 'Leave and approvals', desc: 'Balances, requests and approvals follow your policy, with a record of every decision.' },
      { title: 'Biometric integration', desc: 'Connects to your attendance devices. We confirm the model during discovery.' },
      { title: 'Payroll-ready data', desc: 'Attendance and leave feed straight into payroll, so month-end is not a re-entry job.' },
    ],
    flow: [
      { title: 'Capture', desc: 'Punches and requests arrive from devices and employees.' },
      { title: 'Apply the rules', desc: 'Your leave, shift and late-mark policies are applied automatically.' },
      { title: 'Approve', desc: 'Managers act on what needs a decision; the rest just flows.' },
      { title: 'Hand to payroll', desc: 'The month closes with clean numbers.' },
    ],
    faq: [
      { q: 'Does it connect to our biometric device?', a: 'Biometric integration is part of HRMS builds. We confirm your device model and how it exports punches during discovery, because machines differ in output format and that determines how attendance data lands in the system without manual re-entry each day.' },
      { q: 'Can it handle several locations and shifts?', a: 'Yes. Teams, locations and shift patterns are set up the way you actually work, including rosters for different shifts. This matters for businesses running multiple sites or rotating shifts, where a single attendance rule rarely fits every location, and where attendance and leave are approved at the level the manager actually sits at rather than centrally.' },
      { q: 'Does payroll come with it?', a: 'HRMS feeds directly into payroll, so attendance and leave flow straight into the salary run rather than being exported and re-entered by hand. That removes the step where the two systems disagree. See the Payroll page for how salary runs work and how PF, professional tax and TDS are handled.' },
      { q: 'How are leave approvals handled?', a: 'Leave and approvals are written into the system, so they are applied the same way every time instead of depending on who is asked. Employee records, attendance, shifts and approvals sit in one system, which is what makes the reporting trustworthy.' },
    ],
    related: ['payroll', 'mobile-apps', 'crm'],
  },

  {
    slug: 'crm',
    name: 'CRM',
    sub: 'Leads · pipeline · follow-ups',
    icon: Kanban,
    Preview: CrmPreview,
    summary: 'Every lead, quote and follow-up in one pipeline, so nothing depends on someone remembering to chase it.',
    built: 'Sales teams in manufacturing and distribution',
    caps: ['Lead capture', 'Pipeline stages', 'Follow-up reminders', 'Sales reports'],
    seoTitle: 'Custom CRM Software for Sales Teams | Beforth',
    seoDescription: 'Custom CRM to manage leads, pipeline stages, follow-ups and sales reports, built around how your team sells. Built and maintained by Beforth, Nashik.',
    keywords: 'CRM software India, custom CRM development, sales pipeline software, lead management system, CRM for manufacturing, Nashik',
    headline: ['A CRM your sales team', 'actually keeps updated.'],
    lead: 'Leads, quotes and follow-ups in one pipeline built around the way you sell, with the reports a sales head needs on a Monday morning.',
    changes: [
      { from: 'Leads in notebooks and chat threads', to: 'One pipeline everyone works from' },
      { from: 'Follow-ups that depend on memory', to: 'A reminder on every open deal' },
      { from: 'Forecasts built on guesswork', to: 'Pipeline value by stage, live' },
    ],
    features: [
      { title: 'Lead capture', desc: 'Leads arrive from your website, calls and sales team into one place.' },
      { title: 'Pipeline stages', desc: 'Stages named the way you sell, with a clear next step on every deal.' },
      { title: 'Follow-up reminders', desc: 'Every open deal has an owner and a next action, so nothing quietly goes cold.' },
      { title: 'Quotes linked to deals', desc: 'The quote, the customer and the conversation stay together.' },
      { title: 'Targets and owners', desc: 'See who is carrying what, and how each person is tracking.' },
      { title: 'Connects to your ERP', desc: 'A won deal can become an order, so sales and operations share one version of the truth.' },
    ],
    flow: [
      { title: 'Capture', desc: 'New leads land in the pipeline with an owner.' },
      { title: 'Nurture', desc: 'Calls, visits and quotes are logged against the deal.' },
      { title: 'Close', desc: 'A won deal moves on to an order in your system.' },
      { title: 'Learn', desc: 'Win rate and pipeline reports show what is working.' },
    ],
    faq: [
      { q: 'Can leads come from our website?', a: 'Yes. Website enquiry forms can create leads in the pipeline directly, assigned to the right person rather than sitting in a shared inbox. Calls and leads added by the sales team go into the same place, so every enquiry has an owner and a next step from the moment it arrives.' },
      { q: 'Can it connect to our ERP or accounts?', a: 'Yes. Integrations are part of what we build, so deals, orders and invoices stay in step. A won deal can become an order in your existing system, which means sales and operations are working from one version rather than re-keying the same customer twice.' },
      { q: 'Will it work on a phone?', a: 'Yes. Field sales teams can use a mobile app to update deals and log visits on the spot, rather than waiting until they are back at a desk. The app keeps working when the signal drops and syncs when it returns, so a visit in a basement or a rural route is still recorded.' },
      { q: 'How do we know our sales team will keep it updated?', a: 'Pipeline stages are named the way your team actually sells, and every open deal carries an owner and a next action. That structure is what makes it usable, rather than a CRM that gets abandoned after a month. We build it around your process during discovery and confirm the flow back to you before development starts.' },
      { q: 'What reporting does a sales head get?', a: 'Pipeline value by stage, live, rather than a forecast assembled from memory. Targets and owners show who is carrying what and how each person is tracking, and win-rate reporting shows which sources actually convert. Reports are built around the questions your sales head asks, not a generic dashboard.' },
    ],
    related: ['mobile-apps', 'salon-erp', 'websites'],
  },

  {
    slug: 'mobile-apps',
    name: 'Android & iOS apps',
    sub: 'One team, both stores',
    icon: Smartphone,
    Preview: AppsPreview,
    summary: 'Apps that field staff and customers use every day, including when the signal drops.',
    built: 'Field teams, delivery partners and customers',
    caps: ['Android & iOS', 'Offline work', 'Push notifications', 'Biometric login'],
    seoTitle: 'Android & iOS App Development for Business | Beforth',
    seoDescription: 'Android and iOS apps for field teams, delivery partners and customers, with offline work, push notifications and biometric login. Built and maintained by Beforth, Nashik.',
    keywords: 'mobile app development India, Android app development Nashik, iOS app development, field sales app, offline mobile app',
    headline: ['Apps your team', 'uses every day.'],
    lead: 'Android and iOS apps for field staff, delivery partners and customers, built to keep working when the signal drops and to plug into the systems you already run.',
    changes: [
      { from: 'Field staff reporting by phone call', to: 'Updates from the app, as they happen' },
      { from: 'Apps that stop working without signal', to: 'Work saved on the device and synced later' },
      { from: 'Separate effort for each platform', to: 'One team shipping both stores' },
    ],
    features: [
      { title: 'Android and iOS', desc: 'The same product on both platforms, designed to feel at home on each.' },
      { title: 'Offline work', desc: 'Screens keep working without a connection and sync when it returns.' },
      { title: 'Push notifications', desc: 'Assign a visit or flag a change and the phone knows straight away.' },
      { title: 'Biometric login', desc: 'Fingerprint or Face ID, so the app is quick to open and safe to leave on a phone.' },
      { title: 'Camera and scanning', desc: 'Capture photos, signatures, QR codes and barcodes where the work happens.' },
      { title: 'Connected to your systems', desc: 'The app talks to your ERP, CRM or backend, so there is no second place to enter data.' },
    ],
    flow: [
      { title: 'Define the job', desc: 'We start from what the person with the phone needs to get done.' },
      { title: 'Design and build', desc: 'Screens are built and reviewed in stages on real devices.' },
      { title: 'Release', desc: 'We handle store listings, builds and approvals.' },
      { title: 'Improve', desc: 'Usage tells us what to refine next, and updates ship regularly.' },
    ],
    faq: [
      { q: 'Native or cross-platform?', a: 'We choose per project: cross-platform when it saves cost without hurting the experience, native when the feature set demands it. Field and delivery apps often need deep hardware access or heavy offline behaviour, which pushes the decision towards native, while a simpler internal app is often fine cross-platform.' },
      { q: 'Do you publish to the Play Store and App Store?', a: 'Yes. We handle store listings, builds, approvals and later updates, so you are not left managing release paperwork after launch. The same product is built for both platforms, designed to feel at home on each rather than a phone-sized desktop window.' },
      { q: 'Can the app work offline?', a: 'Yes. Offline work and later sync are designed in from the start, not added afterwards. Screens keep functioning without a connection and sync when it returns, which is the difference between an app field staff trust and one they stop opening in a dead zone.' },
      { q: 'Can it use the camera, scanner or biometrics?', a: 'Yes. Camera and scanning are included for photos, signatures, QR codes and barcodes captured where the work happens rather than typed up afterwards in an office, and biometric login is supported so the app is quick to open and safe to leave on a shared phone handed between shifts.' },
    ],
    related: ['delivery-tracking', 'crm', 'websites'],
  },

  {
    slug: 'websites',
    name: 'Websites',
    sub: 'Fast · findable · responsive',
    icon: Globe,
    Preview: WebPreview,
    summary: 'Business websites and customer portals that load quickly, work on every screen and are easy to find on Google.',
    built: 'Companies and customer portals',
    caps: ['Responsive design', 'SEO foundations', 'Fast loading', 'Easy content updates'],
    seoTitle: 'Business Website & Customer Portal Development | Beforth',
    seoDescription: 'Fast, responsive business websites and customer portals with SEO foundations built in. Designed, hosted and maintained by Beforth, Nashik.',
    keywords: 'website development Nashik, business website India, customer portal development, responsive website design, SEO-friendly website',
    headline: ['Websites that load fast', 'and get found.'],
    lead: 'Business websites and customer portals that are responsive on every screen, structured for search, and simple for your team to keep up to date.',
    changes: [
      { from: 'A site that is slow on a phone', to: 'Pages that load quickly on mobile' },
      { from: 'Content only a developer can change', to: 'Updates your team can make' },
      { from: 'A site nobody finds on Google', to: 'Search foundations built in from day one' },
    ],
    features: [
      { title: 'Responsive design', desc: 'One site that lays itself out properly on desktop, tablet and phone.' },
      { title: 'SEO foundations', desc: 'Clean metadata, sitemap, structured data and sensible page structure as standard.' },
      { title: 'Fast loading', desc: 'Built lean so pages feel instant, which helps visitors and rankings.' },
      { title: 'Customer portals', desc: 'Login areas where customers see their orders, invoices or documents.' },
      { title: 'Enquiry forms', desc: 'Contact and quote forms that reach the right inbox and can feed your CRM.' },
      { title: 'Easy updates', desc: 'Editing set up to match how often you change things, without breaking the layout.' },
    ],
    flow: [
      { title: 'Plan', desc: 'We agree the pages, the message and what a visitor should do.' },
      { title: 'Design', desc: 'Layouts are reviewed on desktop and phone before build.' },
      { title: 'Build and launch', desc: 'Built, tested, hosted and pointed at your domain.' },
      { title: 'Grow', desc: 'Track rankings and enquiries, and keep improving.' },
    ],
    faq: [
      { q: 'Can we add a customer login area?', a: 'Yes. Portals where customers view orders, invoices or documents are part of what we build, and they connect to the systems behind them so the data is current rather than re-keyed. We can build the portal alongside the system it reports from, or on its own.' },
      { q: 'Can we edit the content ourselves?', a: 'Yes. We set up editing that fits how often you update, so small changes do not need a developer. Where content changes daily and a full site is the wrong tool, we can point you at a portal instead, and explain the trade-off honestly.' },
      { q: 'Do you host and maintain it?', a: 'Yes. Hosting, backups, security updates and fixes are covered, so the site just keeps working without anyone having to remember to renew anything. That includes the search foundations, which are built in from the start rather than retrofitted once the traffic starts to depend on them.' },
      { q: 'Will it work on a phone?', a: 'Yes. Responsive on every screen is the default, not an add-on, because a business site is often first seen on a phone. The same applies to customer portals, where a salesperson checking an invoice on the way to a customer is a normal part of the day.' },
    ],
    related: ['seo-tracking', 'crm', 'mobile-apps'],
  },

  {
    slug: 'tunnelgate',
    name: 'TunnelGate',
    sub: 'Secure remote desktop',
    icon: ShieldCheck,
    Preview: TunnelPreview,
    summary: 'One-click remote desktop to office machines through a Zero Trust tunnel. No VPN to manage and no open ports.',
    built: 'IT teams and remote staff',
    caps: ['One-click RDP', 'Zero Trust tunnel', 'Windows, macOS, Linux', 'Native full-screen'],
    seoTitle: 'TunnelGate: One-Click Secure Remote Desktop | Beforth',
    seoDescription: 'TunnelGate opens a remote desktop to office machines through a Cloudflare Zero Trust tunnel, with no VPN and no open ports. Desktop app for macOS, Windows and Linux by Beforth.',
    keywords: 'secure remote desktop, Cloudflare tunnel RDP, Zero Trust remote access, RDP without VPN, remote desktop app',
    headline: ['Reach any office machine,', 'safely, in one click.'],
    lead: 'TunnelGate opens a remote desktop to your office computers through a Cloudflare Zero Trust tunnel. There is no VPN to manage and no port exposed to the internet.',
    changes: [
      { from: 'VPN setup and port forwarding', to: 'Nothing exposed to the internet' },
      { from: 'Shared passwords for remote access', to: 'Access tied to who you are' },
      { from: 'Support calls to start the remote tool', to: 'One click to connect' },
    ],
    features: [
      { title: 'One-click RDP', desc: 'Pick a machine and connect. The tunnel, the identity check and the session start together.' },
      { title: 'Zero Trust tunnel', desc: 'Traffic goes through a Cloudflare tunnel, so your office network does not open any inbound ports.' },
      { title: 'In-app viewer', desc: 'The remote desktop opens inside the app, using the FreeRDP 3 engine.' },
      { title: 'Native full-screen', desc: 'Full-screen behaves like a real desktop, not a window in a browser.' },
      { title: 'Cross-platform', desc: 'A desktop app for macOS, Windows and Linux.' },
      { title: 'Your machines, your list', desc: 'A simple list of the computers each person is allowed to reach.' },
    ],
    flow: [
      { title: 'Set up the tunnel', desc: 'We configure the Cloudflare tunnel and access rules on your account.' },
      { title: 'Add machines', desc: 'Office computers and servers are added to the list.' },
      { title: 'Connect', desc: 'Staff open the app, choose a machine and connect.' },
      { title: 'Stay in control', desc: 'You decide who can reach what, and can change it any time.' },
    ],
    faq: [
      { q: 'Do I need a VPN?', a: 'No. The tunnel replaces the VPN. Nothing on your office network has to be opened to the internet, which removes the exposed ports and the client software a traditional VPN needs on every device. Access is instead governed by rules in Cloudflare Zero Trust.' },
      { q: 'Which computers does the app run on?', a: 'The TunnelGate app runs on macOS, Windows and Linux, so it covers a mixed office rather than forcing a standardisation you do not otherwise have. It gives a remote desktop session to office machines through the tunnel, not just file access.' },
      { q: 'Who sets up the Cloudflare side?', a: 'We do. We configure the tunnel and the access rules on your Cloudflare account and hand over a working setup, then show your team how to add and remove access as people join or leave. You need a Cloudflare account; the configuration is ours to do.' },
      { q: 'How is access controlled?', a: 'Through the tunnel and the access rules we configure, so only permitted people reach the office machines. There is no inbound port exposed to the internet for someone to find, which is the specific risk a traditional remote-access setup creates.' },
    ],
    related: ['websites', 'hrms', 'mobile-apps'],
  },

  {
    slug: 'seo-tracking',
    name: 'SEO & SERP tracking',
    sub: 'Rankings you can read',
    icon: TrendingUp,
    Preview: SeoPreview,
    summary: 'See where your pages rank on Google, week by week, and which keywords moved.',
    built: 'Marketing and growth teams',
    caps: ['Keyword positions', 'Weekly movement', 'Page-one tracking', 'Trend history'],
    seoTitle: 'SEO & SERP Rank Tracking Dashboard | Beforth, Nashik',
    seoDescription: 'Track your Google keyword positions week by week with a clear SEO and SERP dashboard: movement, page-one keywords and trend history. Built by Beforth, Nashik.',
    keywords: 'SEO rank tracker India, SERP tracking dashboard, keyword position tracking, Google ranking report, SEO reporting',
    headline: ['See where you rank on Google,', 'week by week.'],
    lead: 'Track the keywords that matter to your business, see which ones moved, and know whether the work behind them is paying back.',
    changes: [
      { from: 'Searching your own keywords by hand', to: 'Positions tracked for you every week' },
      { from: 'Reports that are a pile of screenshots', to: 'One dashboard with the movement shown' },
      { from: 'No idea what moved the needle', to: 'Trend history next to each keyword' },
    ],
    features: [
      { title: 'Keyword positions', desc: 'Where each keyword ranks on Google today, and where it was.' },
      { title: 'Weekly movement', desc: 'What improved and what dropped since last week, at a glance.' },
      { title: 'Page-one tracking', desc: 'See how many keywords sit on the first page and how many are close.' },
      { title: 'Search volume', desc: 'Know which keywords are worth the effort.' },
      { title: 'Trend history', desc: 'A twelve-week view of each keyword, so seasonal swings are not mistaken for wins.' },
      { title: 'Reports by email', desc: 'A short weekly summary for people who do not log in.' },
    ],
    flow: [
      { title: 'Choose keywords', desc: 'We agree the terms and pages that matter to the business.' },
      { title: 'Track', desc: 'Positions are recorded on a regular schedule.' },
      { title: 'Read the movement', desc: 'The dashboard highlights what changed and by how much.' },
      { title: 'Act', desc: 'Findings feed the next round of site and content work.' },
    ],
    faq: [
      { q: 'Which search engine does it track?', a: 'Google. Positions are tracked for the keywords and pages you choose, which matters because tracking a large generic keyword list tells you nothing. The set is agreed with you so the dashboard reflects the terms your customers actually search on.' },
      { q: 'How often do positions update?', a: 'Weekly by default. We can agree a different schedule when it makes sense. Rankings move on a timescale of weeks rather than hours, so a daily refresh mostly adds noise, and it is worth knowing which movement is a real change.' },
      { q: 'Does it pair with the website we build?', a: 'Yes. The same team builds the site’s search foundations and then tracks the result, so the thing being measured is the thing we changed rather than an unknown. That closes the loop between doing the work and knowing whether it actually earned its place, which is the part usually left to guesswork.' },
      { q: 'Who reads the results?', a: 'You, weekly, in a form that shows which keywords moved and whether the work behind them is paying back. The point is a readable answer to whether the effort is worthwhile, not a chart handed over that nobody opens again.' },
    ],
    related: ['websites', 'crm', 'mobile-apps'],
  },

  {
    slug: 'payroll',
    name: 'Payroll',
    sub: 'Salary · PF · TDS',
    icon: IndianRupee,
    Preview: PayrollPreview,
    summary: 'Monthly payroll with Indian statutory deductions, an approval flow, and payslips sent automatically.',
    built: 'Finance and HR teams',
    caps: ['PF, PT and TDS', 'Approval workflow', 'Payslips by email', 'Bank transfer file'],
    seoTitle: 'Payroll Software India: PF, PT & TDS | Beforth',
    seoDescription: 'Custom payroll software with PF, professional tax and TDS, an approval workflow, automatic payslips and a bank transfer file. Built and maintained by Beforth, Nashik.',
    keywords: 'payroll software India, salary processing software, PF professional tax TDS payroll, payslip generation, HRMS and payroll, Nashik',
    headline: ['Payroll that gets the', 'deductions right.'],
    lead: 'Monthly salary runs with PF, professional tax and TDS handled, an approval step before any money moves, and payslips that reach everyone automatically.',
    changes: [
      { from: 'Salary calculated in spreadsheets', to: 'A payroll run with every component shown' },
      { from: 'Payslips made and sent by hand', to: 'Payslips emailed after approval' },
      { from: 'Bank uploads typed in again', to: 'A bank transfer file ready to upload' },
    ],
    features: [
      { title: 'Salary structures', desc: 'Basic, allowances and deductions set up to match how you pay.' },
      { title: 'Statutory deductions', desc: 'PF, professional tax and TDS, configured for your state and company policy.' },
      { title: 'Approval workflow', desc: 'Draft, review and approve before salaries are released, with a record of who signed off.' },
      { title: 'Payslips', desc: 'A clear payslip for each employee, sent by email when the run is paid.' },
      { title: 'Bank transfer file', desc: 'A file in the format your bank expects, so the upload is a single step.' },
      { title: 'Attendance and leave linked', desc: 'Loss-of-pay days come from attendance and leave, not from someone’s notes.' },
    ],
    flow: [
      { title: 'Draft', desc: 'The run is prepared from attendance, leave and salary structures.' },
      { title: 'Review', desc: 'HR checks the numbers and the exceptions.' },
      { title: 'Approve', desc: 'An authorised person signs off before anything is paid.' },
      { title: 'Pay', desc: 'The bank file and payslips go out together.' },
    ],
    faq: [
      { q: 'Does it follow Indian statutory rules?', a: 'It is built around PF, professional tax and TDS, configured for your state and company policy. We validate the setup with your accountant before it runs for real, because the deduction rules vary by state and a mistake here is expensive to correct after a salary run.' },
      { q: 'Can it read attendance and leave?', a: 'Yes. With our HRMS, attendance and leave flow straight into the salary run rather than being exported and re-entered. That removes the most common source of payroll disputes, where the numbers on a payslip do not match what the employee remembers taking.' },
      { q: 'Will it work with our bank’s upload format?', a: 'We match the format your bank uses for bulk salary uploads. There is an approval step before any money moves, and payslips reach everyone automatically, so a run is checked before it leaves and the record is not a printout that has to be chased.' },
      { q: 'When does the salary run happen?', a: 'Monthly, as part of the run your business already works to. Each run handles salary calculation, the statutory deductions and payslip distribution, with the approval step in between so nothing is paid out without someone having looked at it first, and every run leaves a record you can refer back to.' },
    ],
    related: ['hrms', 'pos', 'salon-erp'],
  },

  {
    slug: 'pos',
    name: 'POS',
    sub: 'Billing · stock · GST',
    icon: ReceiptText,
    Preview: PosPreview,
    summary: 'A fast billing counter with GST, UPI, card and cash, and stock that updates with every sale.',
    built: 'Bakeries, cafés and retail outlets',
    caps: ['GST billing', 'UPI, card and cash', 'Live stock', 'Multi-outlet'],
    seoTitle: 'POS & Billing Software with GST and UPI | Beforth',
    seoDescription: 'Point-of-sale software for bakeries, cafés and retail: GST billing, UPI, card and cash, live stock and multi-outlet control. Built and maintained by Beforth, Nashik.',
    keywords: 'POS software India, GST billing software, bakery POS, retail billing software, multi-outlet POS, inventory and billing, Nashik',
    headline: ['A billing counter', 'that never loses count.'],
    lead: 'Fast billing with GST, UPI, card and cash, and stock that updates with every sale across every outlet.',
    changes: [
      { from: 'Counting stock by hand at closing', to: 'Stock that updates with each sale' },
      { from: 'GST worked out on a calculator', to: 'GST added correctly on every bill' },
      { from: 'Outlets reporting separately', to: 'Every outlet visible from one place' },
    ],
    features: [
      { title: 'Fast billing', desc: 'A tap-to-add counter built for queues, with the total always in view.' },
      { title: 'GST built in', desc: 'Tax rates applied per item, with the breakup shown on the bill.' },
      { title: 'UPI, card and cash', desc: 'Take any payment type and keep the day’s cash and digital totals separate.' },
      { title: 'Live stock', desc: 'Every sale reduces stock, with a warning when an item runs low.' },
      { title: 'Recipes and raw materials', desc: 'For kitchens and bakeries, a sale can deduct the ingredients used.' },
      { title: 'Multi-outlet control', desc: 'Each outlet tracks its own stock and sales, with one master view above them.' },
    ],
    flow: [
      { title: 'Add items', desc: 'The cashier taps items; the bill builds as they go.' },
      { title: 'Take payment', desc: 'Cash, UPI or card, with GST already counted.' },
      { title: 'Stock updates', desc: 'Inventory drops straight away and low items are flagged.' },
      { title: 'Close the day', desc: 'Sales and stock reconcile without a manual count.' },
    ],
    faq: [
      { q: 'Does it handle several outlets?', a: 'Yes. Each outlet has its own stock and sales, and you see all of them together from one master view. That matters when you need to move stock between outlets, or check whether a busy counter is actually keeping pace on what it is selling.' },
      { q: 'Can it track recipes and raw materials?', a: 'Yes, for kitchens and bakeries. A sale can deduct the ingredients that went into it, so the stock figure reflects what is really left rather than what has been sold at the counter. This is the difference between knowing your sales and knowing your cost of goods.' },
      { q: 'Does it print or send bills?', a: 'Yes. Bills can be printed or sent to the customer, depending on your counter setup. Billing covers GST, UPI, card and cash, with stock updating on every sale across every outlet, so the number on screen is never behind what is on the shelf.' },
      { q: 'Is it fast enough for a busy counter?', a: 'That is the point of the design: fast billing, with stock that updates as each sale happens. We look at how your counter actually operates during discovery, because a system that is technically correct but slow at the till gets worked around, and then the numbers are wrong again.' },
    ],
    related: ['salon-erp', 'payroll', 'delivery-tracking'],
  },
];

export const getPlatform = (slug: string | undefined) => PLATFORMS.find((p) => p.slug === slug);
