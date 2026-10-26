/**
 * Cookie/chat consent. Only the Tawk.to live chat is gated: it sets cookies and
 * sends chat data to a third party. Analytics are cookie-free and need no consent.
 * The choice is kept in localStorage under one key; nothing else is stored.
 */
const KEY = 'beforth-consent';
export const CONSENT_EVENT = 'beforth-consent-change';

export type Consent = 'yes' | 'no' | null;

export function getConsent(): Consent {
  try {
    const v = localStorage.getItem(KEY);
    return v === 'yes' || v === 'no' ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(value: Consent) {
  const was = getConsent();
  try {
    if (value) localStorage.setItem(KEY, value);
    else localStorage.removeItem(KEY);
  } catch {
    /* storage blocked: the choice simply is not remembered */
  }
  // Withdrawing consent after the chat has loaded needs a reload to unload it.
  if (was === 'yes' && value !== 'yes') {
    window.location.reload();
    return;
  }
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

/** Loads the Tawk.to chat (defined in index.html). */
export function loadChat() {
  (window as Window & { loadTawk?: () => void }).loadTawk?.();
}
