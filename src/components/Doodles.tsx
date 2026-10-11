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
        <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="4" result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale="3" xChannelSelector="R" yChannelSelector="G" />
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
        {/* the mess: back sheet, front sheet, sticky note, scribbles */}
        <g transform="rotate(5 130 120)">
          <rect x="46" y="50" width="150" height="116" fill={PAPER} strokeOpacity="0.55" />
          <path d="M46 78H196M46 106H196M46 134H196M96 50V166M146 50V166" strokeOpacity="0.4" strokeWidth="1.6" />
        </g>
        <g transform="rotate(-6 110 190)">
          <rect x="24" y="112" width="172" height="130" fill={PAPER} />
          <rect x="24" y="112" width="172" height="26" fill={BONE} />
          <path d="M24 164H196M24 190H196M24 216H196M80 112V242M138 112V242" strokeWidth="1.6" />
          <path d="M32 151q8 -6 16 0t16 0M88 151q10 -6 20 0M146 151q8 -5 16 0" strokeWidth="1.8" />
          <path d="M34 177q10 -7 18 0M92 203q8 -6 18 0t14 0M148 229q8 -6 18 0" strokeWidth="1.8" />
          <path d="M88 175l30 -10M92 168l24 18" stroke={INK} strokeWidth="2" />
        </g>
        <g transform="rotate(9 190 250)">
          <rect x="150" y="214" width="66" height="62" fill={BONE} />
          <path d="M168 238q0 -12 12 -12q12 0 12 10q0 8 -10 11v6" strokeWidth="2.4" />
          <circle cx="182" cy="262" r="1.8" fill={INK} />
        </g>
        <path d="M18 70c14 -34 40 8 62 -16s34 14 56 -8" strokeOpacity="0.7" strokeWidth="2" />
        <path d="M30 300c10 -12 22 6 34 -4s20 8 34 -2" strokeOpacity="0.5" strokeWidth="1.8" />

        {/* the turn: an arrow and a few sparks */}
        <path d="M232 236C258 196 286 190 318 216" strokeWidth="2.6" />
        <path d="M304 224l16 -7l-9 -16" strokeWidth="2.6" />
        <path d="M268 160v-14M252 168l-9 -10M284 168l9 -10" stroke={SIGNAL} strokeWidth="2.6" />

        {/* the system: a hub joined to four modules */}
        <g stroke={SIGNAL} strokeWidth="2.6">
          <path d="M392 196C372 170 366 140 360 118" />
          <path d="M418 196C440 172 452 144 462 118" />
          <path d="M392 236C374 262 368 292 362 316" />
          <path d="M418 236C438 262 452 290 462 316" />
          <circle cx="360" cy="118" r="3.5" fill={SIGNAL} />
          <circle cx="462" cy="118" r="3.5" fill={SIGNAL} />
          <circle cx="362" cy="316" r="3.5" fill={SIGNAL} />
          <circle cx="462" cy="316" r="3.5" fill={SIGNAL} />
        </g>
        <rect x="372" y="176" width="66" height="78" rx="6" stroke={SIGNAL} strokeWidth="3" fill={PAPER} />
        <path d="M386 238v-14M404 238v-30M422 238v-20" stroke={SIGNAL} strokeWidth="3.4" />
        <path d="M384 192h22" stroke={SIGNAL} strokeWidth="2.4" />

        {/* sales */}
        <g transform="translate(300 62)">
          <rect x="0" y="0" width="78" height="56" rx="5" fill={PAPER} />
          <path d="M12 42l16 -14l12 8l24 -22" />
          <path d="M52 14h12v12" />
        </g>
        {/* stock */}
        <g transform="translate(420 62)">
          <rect x="0" y="0" width="84" height="56" rx="5" fill={PAPER} />
          <rect x="14" y="26" width="24" height="18" fill={BONE} />
          <rect x="42" y="26" width="24" height="18" fill={BONE} />
          <rect x="28" y="8" width="24" height="18" fill={BONE} />
        </g>
        {/* people */}
        <g transform="translate(300 316)">
          <rect x="0" y="0" width="78" height="56" rx="5" fill={PAPER} />
          <circle cx="39" cy="20" r="8" />
          <path d="M20 46c2 -12 10 -16 19 -16s17 4 19 16" />
        </g>
        {/* accounts */}
        <g transform="translate(420 316)">
          <rect x="0" y="0" width="84" height="56" rx="5" fill={PAPER} />
          <circle cx="42" cy="28" r="14" />
          <path d="M36 22h12M36 28h12M40 22c8 0 8 12 0 12l8 6" strokeWidth="2" />
        </g>

        {/* a tick, to say it works */}
        <path d="M470 168l8 8l16 -18" stroke={SIGNAL} strokeWidth="3" />
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
  return (
    <svg viewBox="0 0 220 140" className={className} aria-hidden="true" focusable="false" {...common}>
      <g filter="url(#sketch)" strokeWidth="2.2" stroke="var(--color-wave)">
        <path d="M8 120C40 120 54 96 40 84S22 100 50 108S110 92 130 70" strokeDasharray="3 8" strokeWidth="2.6" />
        <path d="M200 20L132 52L148 70L200 20L152 84L146 112L132 52" />
        <path d="M148 70L146 112L162 92" />
      </g>
    </svg>
  );
}
