import React from 'react';
import { Check } from 'lucide-react';
import { Win } from './chrome';

const FORMS = [
  { name: 'Customer enquiry', n: 'Live' },
  { name: 'Site visit report', n: 'Live' },
  { name: 'Leave request', n: 'Draft' },
];
const SUBS = ['Submission received', 'Email sent to the owner', 'Lead created in CRM'];

/** Static sketch of a form-management dashboard: forms, then what happens on submit. */
export default function FourFormPreview() {
  return (
    <Win title="4Form" className="max-w-[640px] mx-auto">
      <div className="grid sm:grid-cols-[210px_1fr] min-h-[300px]">
        <div className="border-b sm:border-b-0 sm:border-r border-ink/10 bg-paper p-3 flex flex-col gap-2">
          <p className="text-[10.5px] uppercase tracking-[0.14em] text-ash px-1">Your forms</p>
          {FORMS.map((f, i) => (
            <div key={f.name} className={`border p-2.5 bg-white flex items-center justify-between ${i === 0 ? 'border-signal' : 'border-ink/10'}`}>
              <span className="text-[12px] font-medium">{f.name}</span>
              <span className="text-[10.5px] text-ash">{f.n}</span>
            </div>
          ))}
        </div>
        <div className="p-4 flex flex-col gap-3">
          <p className="text-[12.5px] font-semibold">When someone submits “Customer enquiry”</p>
          <ol className="flex flex-col gap-2.5">
            {SUBS.map((s) => (
              <li key={s} className="flex items-center gap-2.5 text-[12px]">
                <span className="w-5 h-5 rounded-full bg-signal text-white flex items-center justify-center shrink-0"><Check className="w-3 h-3" strokeWidth={3} /></span>
                {s}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Win>
  );
}
