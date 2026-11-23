import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';

import Reveal from '@/components/Reveal';
import SectionHead from '@/components/SectionHead';

/**
 * /pricing — how we arrive at a number, with no published figure.
 *
 * Every system is custom, so a price list would be a guess. The page states the
 * method instead: a quoted discovery, a build priced by scope, and handover and
 * support stated in writing. No price, timeline or metric is invented here.
 */

const STAGES = [
  {
    n: '01',
    title: 'Discovery, quoted as defined work',
    desc: 'Discovery is scoped and quoted as defined work in its own right. We map your workflows, users, data, approvals and integrations, then agree what the written scope will cover. You approve that scope before any build starts.',
  },
  {
    n: '02',
    title: 'Modular build, priced by scope',
    desc: 'The build is priced by the scope you approve, not by a guessed hourly total. Modules are defined in the written scope and delivered in reviewed stages. Adding, removing or reordering modules changes the written scope, which you approve first.',
  },
  {
    n: '03',
    title: 'Handover and support, stated in writing',
    desc: 'Handover and support are set out in writing as part of the same scope. Training, data migration, hosting, maintenance and later changes are all stated there, so you know what is included and what would need a new written agreement.',
  },
];

const PRICING_FAQ = [
  {
    q: 'Do you publish a price list?',
    a: 'No. There is no public price list. Every system is custom, so cost depends on the modules, approval rules, integrations, data migration and support. After a short discovery conversation, we give you a written scope and cost before any build starts.',
  },
  {
    q: 'How quickly will I get a written estimate?',
    a: 'We reply within one working day. The written scope and cost follow a short discovery conversation about the process you need to fix. You approve that document before any build starts, so there is no surprise charge later.',
  },
  {
    q: 'Why not publish a starting price?',
    a: 'A starting price would be a guess. Two systems with the same name can need very different modules, integrations and approval rules. Quoting a figure before discovery would mislead you, so we publish the method instead: short conversation, written scope, then your approval.',
  },
  {
    q: 'Do you charge per user?',
    a: 'No. Pricing is based on the agreed scope, not on a per-seat charge. The written scope states what is included and what support covers, so adding people to the system does not create a hidden per-user fee.',
  },
  {
    q: 'Can I compare this with packaged ERP?',
    a: 'You can, and you should ask both for the three-year number: licences, implementation, customisation, support and what happens when your process changes. We will give you our written scope and cost after discovery, and say honestly if a custom build is not the right answer.',
  },
  {
    q: 'What is in handover?',
    a: 'Handover is set out in writing in the approved scope. It covers the system as built, the data migrated into it, training for your team, and how hosting, maintenance and later changes are handled. Nothing is added to the bill that was not in the scope you approved.',
  },
];

export default function PricingPage() {
  return (
    <>
      <section className="pt-32 md:pt-40 pb-12 md:pb-16">
        <div className="wrap relative">
          <Reveal>
            <div className="rule mb-6" />
            <span className="label block mb-7">Pricing</span>
            <h1 className="display-xl text-[clamp(2.2rem,6.4vw,4.8rem)] max-w-[18ch]">
              How BeForth prices <span className="accent">custom software.</span>
            </h1>
            <p className="lead max-w-2xl mt-8">
              No public price list. Every system is custom, so cost depends on your requirements — the modules you need, your approval rules, integrations, data migration and support. After a short discovery conversation, we give you a written scope and cost before any build starts. You approve it first.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link to="/contact" className="btn-signal">
                Get a written estimate <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/product/erp#demo" className="ulink">
                See the live ERP preview <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <p className="label !normal-case !tracking-[0.06em] mt-6">
              Reply within 1 working day. No signup to try the previews.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section bg-bone">
        <div className="wrap relative z-10">
          <SectionHead
            label="The method"
            title={<>Three stages, <span className="accent">each in writing.</span></>}
            note="No figure is quoted before discovery, and nothing is built before you approve the scope."
          />
          <div className="grid md:grid-cols-3 gap-4">
            {STAGES.map((stage, i) => (
              <Reveal key={stage.n} delay={i * 0.06} className="h-full">
                <div className="h-full bg-paper border border-ink/12 p-6 md:p-7 flex flex-col gap-4">
                  <span className="label !text-[12px]">{stage.n}</span>
                  <h2 className="display-lg text-xl md:text-2xl">{stage.title}</h2>
                  <p className="body-tight">{stage.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead label="FAQ" title={<>Questions about <span className="accent">cost.</span></>} />
          <div className="border-t border-ink/12">
            {PRICING_FAQ.map((item, i) => (
              <Reveal key={item.q} delay={Math.min(i, 4) * 0.04}>
                <details className="group py-4 md:py-5 border-b border-ink/12">
                  <summary className="flex items-start gap-4 cursor-pointer list-none min-h-[32px]">
                    <span className="label text-signal shrink-0 pt-1">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="flex-1 display-md text-base md:text-lg transition-colors duration-300 group-open:text-signal">{item.q}</h3>
                    <span className="shrink-0 text-ash group-open:text-signal transition-colors text-lg leading-none pt-0.5">+</span>
                  </summary>
                  <p className="body max-w-2xl mt-2.5 pl-9 md:pl-12">{item.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="wrap">
          <div className="surface-ink p-8 md:p-12 relative overflow-hidden">
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <div className="max-w-xl">
                <span className="label !text-wave block mb-5">Next step</span>
                <h2 className="display-lg text-[clamp(1.6rem,3.4vw,2.5rem)] text-paper mb-5">
                  Tell us how your business runs today.
                </h2>
                <p className="text-paper/75 text-[15px] leading-relaxed max-w-lg">
                  We will say honestly whether a custom build helps, and put the scope and cost in writing if it does.
                </p>
              </div>
              <div className="flex flex-col items-start lg:items-end gap-3 shrink-0">
                <Link to="/contact" className="btn-invert !px-8 !py-4">
                  Get a written estimate <ArrowRight className="w-4 h-4" />
                </Link>
                <span className="label !text-paper/70 flex items-center gap-2">
                  <Check className="w-3.5 h-3.5" strokeWidth={3} /> Reply within 1 working day
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
