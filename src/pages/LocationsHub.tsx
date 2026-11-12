import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Reveal from '../components/Reveal';
import { Magnetic } from '../components/Magnetic';
import { LOCATIONS, locationPath } from '../data/locations';

const GROUPS: { title: string; kind: 'country' | 'state' | 'city' }[] = [
  { title: 'Country', kind: 'country' },
  { title: 'State', kind: 'state' },
  { title: 'Cities', kind: 'city' },
];

export default function LocationsHub() {
  return (
    <>
      <section className="pt-32 md:pt-40 pb-12 md:pb-16">
        <div className="wrap">
          <Reveal>
            <div className="rule mb-6" />
            <span className="label block mb-6">Locations</span>
            <h1 className="display-xl text-[clamp(2.2rem,6.4vw,4.8rem)] max-w-[16ch]">
              Where we <span className="accent">deliver.</span>
            </h1>
            <p className="lead max-w-2xl mt-7">
              BeForth is a software company based in Nashik, Maharashtra, founded in 2025. We deliver custom ERP and
              software to businesses across India. These pages cover some of the places we deliver to. We deliver to
              other cities in Maharashtra and across India too.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-20 md:pb-24">
        <div className="wrap flex flex-col gap-12">
          {GROUPS.map((g) => (
            <Reveal key={g.kind}>
              <span className="label block mb-4">{g.title}</span>
              <ul className="grid md:grid-cols-2 gap-x-14 border-t border-ink/15">
                {LOCATIONS.filter((l) => l.kind === g.kind).map((l) => (
                  <li key={l.slug} className="py-5 border-b border-ink/15">
                    <h2 className="display-md text-[18px] mb-2">{l.name}</h2>
                    <p className="flex flex-wrap gap-x-6 gap-y-1">
                      {l.pages.includes('erp') && (
                        <Link to={locationPath('erp', l.slug)} className="ulink">
                          ERP software in {l.name} <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      )}
                      {l.pages.includes('custom') && (
                        <Link to={locationPath('custom', l.slug)} className="ulink">
                          Custom software in {l.name} <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      )}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="wrap">
          <Reveal>
            <div className="rule mb-9" />
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-7">
              <h2 className="display-lg text-[clamp(1.5rem,3.4vw,2.5rem)] max-w-[22ch]">
                Not on the list? Ask anyway.
              </h2>
              <Magnetic>
                <Link to="/contact" className="btn-signal shrink-0">
                  Tell us where you are <ArrowRight className="w-4 h-4" />
                </Link>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
