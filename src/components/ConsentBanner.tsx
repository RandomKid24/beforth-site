import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CONSENT_EVENT, getConsent, loadChat, setConsent } from '@/lib/consent';

/** Asks once whether the live chat (which sets cookies) may load. Client-only, so it is never prerendered. */
export default function ConsentBanner() {
  const [choice, setChoice] = useState<ReturnType<typeof getConsent> | 'pending'>('pending');

  useEffect(() => {
    const sync = () => {
      const c = getConsent();
      setChoice(c);
      if (c === 'yes') loadChat();
    };
    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    return () => window.removeEventListener(CONSENT_EVENT, sync);
  }, []);

  if (choice !== null) return null;

  return (
    <div
      role="region"
      aria-label="Cookie choice"
      className="fixed z-[55] bottom-0 inset-x-0 bg-paper border-t border-ink/15 px-4 md:px-10 py-3 flex flex-col md:flex-row md:items-center gap-3 md:gap-8"
    >
      <p className="body-tight !text-ink/80 md:flex-1">
        Our live chat (Tawk.to) sets cookies and loads only if you accept.{' '}
        <Link to="/cookie-policy" className="underline hover:text-signal">Cookie Policy</Link>,{' '}
        <Link to="/privacy-policy" className="underline hover:text-signal">Privacy Policy</Link>.
      </p>
      <div className="flex gap-3 shrink-0">
        <button type="button" onClick={() => setConsent('yes')} className="btn-signal !px-5 !py-2 !text-[13px]">
          Accept
        </button>
        <button type="button" onClick={() => setConsent('no')} className="btn-line !px-5 !py-2 !text-[13px]">
          Decline
        </button>
      </div>
    </div>
  );
}
