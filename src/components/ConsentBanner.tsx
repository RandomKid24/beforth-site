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
      className="fixed z-[55] bottom-3 left-3 right-3 md:right-auto md:max-w-[420px] surface p-5 shadow-[0_18px_40px_-24px_rgba(35,31,32,0.45)]"
    >
      <p className="body-tight !text-ink/80">
        We use a live chat widget (Tawk.to) that sets cookies and processes chat data. It loads only if you
        accept. See our <Link to="/cookie-policy" className="underline hover:text-signal">Cookie Policy</Link> and{' '}
        <Link to="/privacy-policy" className="underline hover:text-signal">Privacy Policy</Link>.
      </p>
      <div className="mt-4 flex gap-3">
        <button type="button" onClick={() => setConsent('yes')} className="btn-signal !px-5 !py-2.5 !text-[13px]">
          Accept
        </button>
        <button type="button" onClick={() => setConsent('no')} className="btn-line !px-5 !py-2.5 !text-[13px]">
          Decline
        </button>
      </div>
    </div>
  );
}
