import React from 'react';

/**
 * Hand-drawn style illustrations for the home page.
 *
 * Inline SVG, so there is nothing extra to download and the prerendered HTML
 * already contains them. All are decorative (aria-hidden): the page text says
 * everything they show. Ink for line work, `signal` for the connected system,
 * `bone` for flat fills. No gradients or shadows.
 *
 * The wobble comes from one SVG filter (see DoodleDefs). Filter values are in
 * the SVG's own units, so large drawings use `sketch` and 24px icons use the
 * much lighter `sketch-sm`.
 */

const INK = 'var(--color-ink)';
const SIGNAL = 'var(--color-signal)';
const BONE = 'var(--color-bone)';
const PAPER = 'var(--color-paper)';

const common = {
  fill: 'none',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

/** Render once, near the top of the app. Referenced by id from every doodle. */
export function DoodleDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: 'absolute' }}>
      <filter id="sketch" x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="1" seed="4" result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale="3.4" xChannelSelector="R" yChannelSelector="G" />
      </filter>
      <filter id="sketch-sm" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.12" numOctaves="1" seed="2" result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale="0.7" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  );
}

type Props = { className?: string };

/* ------------------------------------------------------------------ */
/* Hero: scattered spreadsheets become one connected system             */
/* ------------------------------------------------------------------ */
export function HeroDoodle({ className }: Props) {
  return (
    <svg viewBox="0 0 540 400" className={className} aria-hidden="true" focusable="false" {...common}>
      <g filter="url(#sketch)" strokeWidth="2.4" stroke={INK}>
        {/* ---- the mess ---- */}
        {/* a fanned stack of sheets */}
        <g transform="rotate(9 120 110)">
          <rect x="52" y="34" width="140" height="108" fill={PAPER} strokeOpacity="0.45" />
          <path d="M52 60H192M52 86H192M52 112H192M100 34V142M148 34V142" strokeOpacity="0.3" strokeWidth="1.5" />
        </g>
        <g transform="rotate(-3 110 110)">
          <rect x="36" y="48" width="140" height="108" fill={PAPER} strokeOpacity="0.7" />
          <path d="M36 74H176M36 100H176M36 126H176M84 48V156M130 48V156" strokeOpacity="0.4" strokeWidth="1.5" />
        </g>
        {/* the main spreadsheet, full of half-filled cells */}
        <g transform="rotate(-6 110 190)">
          <rect x="24" y="112" width="176" height="132" fill={PAPER} />
          <rect x="24" y="112" width="176" height="26" fill={BONE} />
          <path d="M24 164H200M24 190H200M24 216H200M82 112V244M142 112V244" strokeWidth="1.6" />
          <path d="M32 151q8 -6 16 0t16 0M92 151q10 -6 20 0M152 151q8 -5 16 0" strokeWidth="1.8" />
          <path d="M34 177q10 -7 18 0M96 203q8 -6 18 0t14 0M152 229q8 -6 18 0M34 229h30" strokeWidth="1.8" />
          <path d="M90 175l32 -11M94 167l26 20" strokeWidth="2.2" />
          <path d="M150 168l22 22M172 168l-22 22" strokeWidth="2" />
        </g>
        {/* sticky note */}
        <g transform="rotate(9 190 250)">
          <rect x="152" y="214" width="66" height="62" fill={BONE} />
          <path d="M170 238q0 -12 12 -12q12 0 12 10q0 8 -10 11v6" strokeWidth="2.6" />
          <circle cx="184" cy="262" r="2" fill={INK} />
        </g>
        {/* a phone full of chats */}
        <g transform="rotate(-9 60 320)">
          <rect x="34" y="276" width="54" height="86" rx="9" fill={PAPER} />
          <path d="M52 284h18" strokeWidth="2" />
          <rect x="42" y="296" width="30" height="14" rx="6" fill={BONE} strokeWidth="1.8" />
          <rect x="52" y="316" width="30" height="14" rx="6" fill={BONE} strokeWidth="1.8" />
          <circle cx="82" cy="276" r="9" fill={PAPER} />
          <path d="M82 271v6" strokeWidth="2.2" />
        </g>
        {/* crumpled paper and scribbles */}
        <path d="M120 338c-8 -10 0 -24 12 -24c8 -8 24 -4 26 8c10 6 6 22 -6 24c-8 8 -22 6 -32 -8z" fill={PAPER} />
        <path d="M128 330l8 -5l4 9l8 -8M132 346l9 -4l8 5" strokeWidth="1.6" strokeOpacity="0.7" />
        <path d="M16 62c14 -34 40 8 62 -16s34 14 56 -8" strokeOpacity="0.65" strokeWidth="2" />
        <path d="M206 330c8 -12 20 6 30 -4s16 8 28 -2" strokeOpacity="0.45" strokeWidth="1.8" />

        {/* ---- the turn ---- */}
        <path d="M236 232C262 188 296 186 332 216" strokeWidth="3" />
        <path d="M318 226l17 -9l-10 -16" strokeWidth="3" />
        <path d="M280 150v-16M262 158l-10 -11M298 158l10 -11" stroke={SIGNAL} strokeWidth="2.8" />

        {/* ---- the system ---- */}
        <g stroke={SIGNAL} strokeWidth="2.8">
          <path d="M388 164C372 148 362 134 350 120" />
          <path d="M444 164C460 148 470 134 480 120" />
          <path d="M388 242C372 258 362 300 350 314" />
          <path d="M444 242C460 258 470 300 480 314" />
        </g>
        <g fill={SIGNAL} stroke="none">
          <circle cx="350" cy="119" r="4" />
          <circle cx="480" cy="119" r="4" />
          <circle cx="350" cy="315" r="4" />
          <circle cx="480" cy="315" r="4" />
        </g>
        {/* the hub: a small live dashboard */}
        <rect x="368" y="160" width="96" height="86" rx="8" stroke={SIGNAL} strokeWidth="3.2" fill={PAPER} />
        <path d="M380 176h30" stroke={SIGNAL} strokeWidth="3" />
        <circle cx="448" cy="176" r="3" fill={SIGNAL} stroke="none" />
        <path d="M388 232v-14M406 232v-26M424 232v-18M442 232v-34" stroke={SIGNAL} strokeWidth="5" />
        <path d="M380 190l16 -4l14 4l18 -8" stroke={INK} strokeWidth="1.8" />

        {/* sales */}
        <g transform="translate(308 62)">
          <rect x="0" y="0" width="84" height="58" rx="6" fill={PAPER} />
          <path d="M12 44l18 -14l12 8l28 -24" />
          <path d="M56 14h14v14" />
        </g>
        {/* stock */}
        <g transform="translate(438 62)">
          <rect x="0" y="0" width="84" height="58" rx="6" fill={PAPER} />
          <rect x="14" y="28" width="26" height="20" fill={BONE} />
          <rect x="44" y="28" width="26" height="20" fill={BONE} />
          <rect x="29" y="8" width="26" height="20" fill={BONE} />
        </g>
        {/* people */}
        <g transform="translate(308 316)">
          <rect x="0" y="0" width="84" height="58" rx="6" fill={PAPER} />
          <circle cx="42" cy="21" r="9" />
          <path d="M22 48c2 -13 11 -18 20 -18s18 5 20 18" />
        </g>
        {/* accounts */}
        <g transform="translate(438 316)">
          <rect x="0" y="0" width="84" height="58" rx="6" fill={PAPER} />
          <circle cx="42" cy="29" r="15" />
          <path d="M36 23h13M36 29h13M40 23c9 0 9 13 0 13l9 7" strokeWidth="2.2" />
        </g>

        {/* a tick and a few sparks, to say it works */}
        <path d="M498 176l9 9l18 -20" stroke={SIGNAL} strokeWidth="3.4" />
        <path d="M512 214v10M507 219h10" stroke={SIGNAL} strokeWidth="2.6" />
        <path d="M296 330v10M291 335h10" stroke={SIGNAL} strokeWidth="2.6" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* What we do: one place, everything connected                          */
/* ------------------------------------------------------------------ */
export function HubDoodle({ className }: Props) {
  return (
    <svg viewBox="0 0 200 150" className={className} aria-hidden="true" focusable="false" {...common}>
      <g filter="url(#sketch)" strokeWidth="2.2" stroke={INK}>
        <g stroke={SIGNAL}>
          <path d="M100 75L36 32M100 75L168 30M100 75L28 112M100 75L172 118M100 75V16" />
        </g>
        <circle cx="100" cy="75" r="20" fill={BONE} />
        <path d="M92 76l6 6l12 -14" stroke={SIGNAL} strokeWidth="2.6" />
        <circle cx="36" cy="32" r="11" fill={PAPER} />
        <circle cx="168" cy="30" r="11" fill={PAPER} />
        <circle cx="28" cy="112" r="11" fill={PAPER} />
        <circle cx="172" cy="118" r="11" fill={PAPER} />
        <circle cx="100" cy="16" r="9" fill={PAPER} />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Who it's for                                                         */
/* ------------------------------------------------------------------ */
/** Fits: a spreadsheet bursting at the seams. */
export function SheetDoodle({ className }: Props) {
  return (
    <svg viewBox="0 0 120 96" className={className} aria-hidden="true" focusable="false" {...common}>
      <g filter="url(#sketch)" strokeWidth="2" stroke={INK}>
        <g transform="rotate(-5 56 52)">
          <rect x="14" y="22" width="84" height="62" fill={PAPER} />
          <rect x="14" y="22" width="84" height="14" fill={BONE} />
          <path d="M14 50H98M14 64H98M42 22V84M70 22V84" strokeWidth="1.5" />
        </g>
        <path d="M92 14c-8 -10 -22 -4 -16 6M104 30c10 -4 14 8 4 12" stroke={SIGNAL} strokeWidth="2.2" />
        <path d="M22 16l8 -8M34 12l4 -10" stroke={SIGNAL} strokeWidth="2.2" />
      </g>
    </svg>
  );
}

/** Not fits: a plain website. */
export function SiteDoodle({ className }: Props) {
  return (
    <svg viewBox="0 0 120 96" className={className} aria-hidden="true" focusable="false" {...common}>
      <g filter="url(#sketch)" strokeWidth="2" stroke={INK}>
        <rect x="14" y="18" width="92" height="64" rx="3" fill={PAPER} />
        <path d="M14 34H106" />
        <circle cx="24" cy="26" r="2" fill={INK} />
        <circle cx="32" cy="26" r="2" fill={INK} />
        <rect x="24" y="44" width="34" height="26" fill={BONE} />
        <path d="M66 46h30M66 56h30M66 66h20" strokeWidth="1.8" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Method: five stages along one road                                   */
/* ------------------------------------------------------------------ */
export function RoadDoodle({ className }: Props) {
  const stops: [number, number][] = [
    [60, 28],
    [196, 76],
    [74, 140],
    [200, 204],
    [92, 262],
  ];
  return (
    <svg viewBox="0 0 280 310" className={className} aria-hidden="true" focusable="false" {...common}>
      <g filter="url(#sketch)" strokeWidth="2.2" stroke={INK}>
        <path d="M60 28C150 24 220 40 196 76S40 100 74 140S230 160 200 204S60 230 92 262" strokeDasharray="2 9" strokeWidth="3" />
        {stops.slice(0, 4).map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="11" fill={PAPER} />
        ))}
        {/* the last stop is a flag */}
        <path d="M92 262V224" />
        <path d="M92 224l30 9l-30 11z" fill={SIGNAL} stroke={SIGNAL} />
        <circle cx="92" cy="262" r="4" fill={INK} />
      </g>
      {/* tiny tick inside each finished stop, outside the filter so it stays crisp */}
      <g stroke={SIGNAL} strokeWidth="2.4">
        {stops.slice(0, 4).map(([x, y]) => (
          <path key={`t${x}-${y}`} d={`M${x - 4} ${y}l3 4l6 -8`} />
        ))}
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Sectors: one small icon per sector                                   */
/* ------------------------------------------------------------------ */
const ICONS: Record<string, React.ReactNode> = {
  Manufacturing: (
    <>
      <path d="M3 20V10l6 4v-4l6 4V6h3v14z" />
      <path d="M3 20h18" />
    </>
  ),
  'Logistics & Distribution': (
    <>
      <path d="M2 7h11v9H2zM13 10h5l3 3v3h-8" />
      <circle cx="6" cy="18" r="2" fill={PAPER} />
      <circle cx="17" cy="18" r="2" fill={PAPER} />
    </>
  ),
  Pharma: (
    <>
      <rect x="4" y="9" width="16" height="6" rx="3" transform="rotate(-35 12 12)" />
      <path d="M12 8l-3.5 4.9" transform="rotate(-35 12 12)" />
    </>
  ),
  'Sales & Marketing': (
    <>
      <path d="M3 17l5 -6l4 3l8 -9" />
      <path d="M15 5h5v5" />
    </>
  ),
  'Human Resources': (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0 -4 3 -6 6 -6s6 2 6 6" />
      <circle cx="17" cy="9" r="2.4" />
      <path d="M16 14c3 0 5 2 5 5" />
    </>
  ),
  'Growing Businesses': (
    <>
      <path d="M12 21V11" />
      <path d="M12 13c-4 0 -6 -3 -6 -6c4 0 6 2 6 6zM12 11c0 -3 2 -6 6 -6c0 3 -2 6 -6 6z" />
    </>
  ),
};

export function SectorIcon({ name, className }: { name: string; className?: string }) {
  const icon = ICONS[name];
  if (!icon) return null;
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false" {...common}>
      <g filter="url(#sketch-sm)" stroke="currentColor" strokeWidth="1.6">
        {icon}
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Call to action: a paper plane on a looping trail (drawn for dark)    */
/* ------------------------------------------------------------------ */
export function PlaneDoodle({ className }: Props) {
  const wave = 'var(--color-wave)';
  return (
    <svg viewBox="0 0 300 180" className={className} aria-hidden="true" focusable="false" {...common}>
      <g filter="url(#sketch)" strokeWidth="2.4" stroke={wave}>
        {/* the conversation: two speech bubbles */}
        <path d="M16 20h74a8 8 0 0 1 8 8v28a8 8 0 0 1 -8 8H48l-16 14v-14H16a8 8 0 0 1 -8 -8V28a8 8 0 0 1 8 -8z" />
        <circle cx="38" cy="42" r="3" fill={wave} stroke="none" />
        <circle cx="54" cy="42" r="3" fill={wave} stroke="none" />
        <circle cx="70" cy="42" r="3" fill={wave} stroke="none" />
        <path d="M118 70h58a8 8 0 0 1 8 8v22a8 8 0 0 1 -8 8h-4v12l-14 -12h-40a8 8 0 0 1 -8 -8V78a8 8 0 0 1 8 -8z" strokeOpacity="0.85" />
        <path d="M128 84h38M128 96h24" strokeWidth="2" strokeOpacity="0.85" />

        {/* the plane's looping trail */}
        <path d="M24 166C70 168 96 146 82 128S44 130 70 148S160 156 196 118" strokeDasharray="0.5 10" strokeWidth="3.6" />

        {/* a paper plane with a visible fold */}
        <g strokeWidth="2.6">
          <path d="M280 14L206 70L238 78Z" fill={wave} fillOpacity="0.14" />
          <path d="M280 14L238 78L246 118Z" fill={wave} fillOpacity="0.3" />
          <path d="M238 78L246 118L222 98Z" fill={wave} fillOpacity="0.08" />
        </g>

        {/* sparks */}
        <path d="M262 132v12M256 138h12" strokeWidth="2.4" />
        <path d="M184 22v10M179 27h10" strokeWidth="2.4" />
        <path d="M290 98l8 -6M292 108h10" strokeWidth="2.2" />
      </g>
    </svg>
  );
}
