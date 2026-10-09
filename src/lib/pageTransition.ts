import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { useLocation } from 'react-router-dom';

/**
 * Page transitions.
 *
 * A deliberate, quiet route change: the new page rises slightly into place
 * while the old one fades out faster. One orchestrated moment per navigation,
 * which is the only kind of motion that earns its place on a site whose
 * content is otherwise static.
 *
 * How it works: this hook holds the location that is actually rendered, and
 * only advances it inside `document.startViewTransition`. React Router still
 * navigates normally — we just let the DOM update happen inside the
 * transition so the browser can snapshot both states and animate between them
 * on its own compositor.
 *
 * Intercepts every navigation rather than wrapping individual links, so a new
 * link is animated without anyone having to remember to opt it in.
 */

/** True when the browser can animate a transition at all. */
export function supportsViewTransition(): boolean {
  return (
    typeof document !== 'undefined' &&
    typeof (document as Document & { startViewTransition?: unknown })
      .startViewTransition === 'function'
  );
}

const sameTarget = (a: Location | { pathname: string; search: string; hash: string }, b: { pathname: string; search: string; hash: string }) =>
  a.pathname === b.pathname && a.search === b.search && a.hash === b.hash;

export function useTransitionLocation(reduceMotion: boolean) {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  // Kept in a ref so the effect below does not re-run just because a render
  // happened, which would restart the transition mid-flight.
  const current = useRef(location);

  useEffect(() => {
    if (sameTarget(current.current, location)) return;
    current.current = location;

    // No animation for reduced-motion users, or on browsers without support
    // (Safari < 18, Firefox < 130). The navigation itself still happens, which
    // is the point — the earlier attempt at this called an undefined method
    // unguarded and broke navigation entirely on those browsers.
    if (reduceMotion || !supportsViewTransition()) {
      setDisplayLocation(location);
      return;
    }

    document.startViewTransition(() => {
      // Start each page at the top, inside the snapshot, so the incoming page
      // is not captured part-way down the previous page's scroll position.
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      flushSync(() => setDisplayLocation(location));
    });
  }, [location, reduceMotion]);

  return displayLocation;
}