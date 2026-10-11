/**
 * Conversion events for Vercel Web Analytics (cookie-free, no personal data).
 *
 * `window.va` is defined by the inline snippet in index.html. It is a no-op
 * queue until the analytics script loads, and the script is not loaded on
 * localhost, so calling this in development or during prerender does nothing.
 * Only an event name is sent: never form contents, emails or phone numbers.
 */
type Va = (cmd: 'event', payload: { name: string }) => void;

export function track(name: 'contact_submit' | 'phone_click' | 'email_click') {
  try {
    (window as Window & { va?: Va }).va?.('event', { name });
  } catch {
    /* analytics must never break the page */
  }
}
