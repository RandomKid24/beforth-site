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
      <filter id="sketch-md" x="-8%" y="-8%" width="116%" height="116%">
        <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="1" seed="3" result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale="1.6" xChannelSelector="R" yChannelSelector="G" />
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
  // Five things the business runs on, all joined to one place.
  const nodes: { x: number; y: number; icon: React.ReactNode }[] = [
    { x: 120, y: 26, icon: <><path d="M-9 6l6 -7l5 4l9 -9" /><path d="M2 -8h7v7" /></> }, // sales
    { x: 200, y: 70, icon: <><path d="M-8 -4l8 -4l8 4v10l-8 4l-8 -4z" /><path d="M-8 -4l8 4l8 -4M0 0v10" strokeWidth="1.8" /></> }, // inventory
    { x: 172, y: 154, icon: <><path d="M-8 3a8 8 0 0 1 16 0" /><rect x="-10" y="1" width="4" height="8" rx="1.5" /><rect x="6" y="1" width="4" height="8" rx="1.5" /></> }, // service
    { x: 68, y: 154, icon: <><circle cx="0" cy="0" r="9" /><path d="M-4 -4h8M-4 0h8M-3 -4c8 0 8 8 0 8l6 5" strokeWidth="1.8" /></> }, // finance
    { x: 40, y: 70, icon: <><path d="M-8 9v-8M-2 9v-14M4 9v-10M10 9v-4" strokeWidth="3" /></> }, // reporting
  ];
  return (
    <svg viewBox="0 0 240 180" className={className} aria-hidden="true" focusable="false" {...common}>
      <g filter="url(#sketch)" strokeWidth="2.4" stroke={INK}>
        {/* the ring that joins neighbours */}
        <path d="M120 26L200 70L172 154L68 154L40 70Z" strokeOpacity="0.28" strokeDasharray="2 8" strokeWidth="2.6" />
        {/* spokes into the middle */}
        <g stroke={SIGNAL} strokeWidth="2.8">
          <path d="M120 70V48" />
          <path d="M141 90Q168 88 182 76" />
          <path d="M134 110Q150 128 160 140" />
          <path d="M106 110Q92 128 80 140" />
          <path d="M99 90Q72 88 58 76" />
        </g>
        {/* the middle: one place */}
        <circle cx="120" cy="90" r="34" stroke={SIGNAL} strokeOpacity="0.35" strokeDasharray="1 9" strokeWidth="3" />
        <circle cx="120" cy="90" r="24" fill={BONE} stroke={SIGNAL} strokeWidth="3" />
        <path d="M109 91l8 8l15 -17" stroke={SIGNAL} strokeWidth="3.4" />
        {/* the five systems */}
        {nodes.map((n) => (
          <g key={`${n.x}-${n.y}`} transform={`translate(${n.x} ${n.y})`}>
            <circle r="19" fill={PAPER} />
            {n.icon}
          </g>
        ))}
        <path d="M222 22v10M217 27h10" stroke={SIGNAL} strokeWidth="2.4" />
        <path d="M14 126v10M9 131h10" stroke={SIGNAL} strokeWidth="2.4" />
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

/* ------------------------------------------------------------------ */
/* Why BeForth: one drawing per commitment                              */
/* ------------------------------------------------------------------ */
/** 0 start with the problem, 1 built around you, 2 simple to use, 3 one partner. */
export function ReasonDoodle({ index, className }: { index: number; className?: string }) {
  const art = [
    // a magnifier over the problem
    <>
      <circle cx="27" cy="27" r="17" fill={PAPER} />
      <path d="M40 40L57 57" strokeWidth="4" />
      <path d="M21 22q0 -7 7 -7q7 0 7 6q0 4 -6 6v3" stroke={SIGNAL} />
      <circle cx="29" cy="38" r="1.6" fill={SIGNAL} stroke="none" />
    </>,
    // a piece that fits
    <>
      <path d="M12 24h10c-5 -11 13 -11 8 0h12v10c10 -5 10 13 0 8v10H12z" fill={BONE} />
      <path d="M48 10l3 4l7 -8" stroke={SIGNAL} strokeWidth="2.8" />
    </>,
    // a button, pressed
    <>
      <rect x="6" y="26" width="42" height="22" rx="6" fill={BONE} />
      <path d="M16 37h22" />
      <path d="M38 36l0 18l5 -5l4 9l4 -2l-4 -9l7 0z" fill={PAPER} />
      <path d="M50 22l4 -5M56 29l6 -2M44 18l1 -6" stroke={SIGNAL} strokeWidth="2.6" />
    </>,
    // one person, one point of contact
    <>
      <circle cx="26" cy="26" r="9" fill={PAPER} />
      <path d="M8 58c0 -17 9 -23 18 -23s18 6 18 23" />
      <path d="M16 24c0 -14 20 -14 20 0M16 24v6h4" stroke={SIGNAL} />
      <path d="M42 6h16a3 3 0 0 1 3 3v10a3 3 0 0 1 -3 3h-8l-6 5v-5h-2a3 3 0 0 1 -3 -3V9a3 3 0 0 1 3 -3z" fill={PAPER} />
      <path d="M46 14h.1M51 14h.1M56 14h.1" stroke={SIGNAL} strokeWidth="3.4" />
    </>,
  ];
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false" {...common}>
      <g filter="url(#sketch-md)" strokeWidth="2.4" stroke={INK}>
        {art[index % art.length]}
      </g>
    </svg>
  );
}

/** A coil that unwinds into a straight line. Computed once, so it is exact and symmetrical. */
const COIL = (() => {
  const pts: string[] = [];
  const n = 140;
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const r = 24 * Math.pow(1 - t, 1.3);
    const th = Math.PI * 2 * 5.5 * Math.pow(t, 0.85);
    const x = 12 + 150 * t + r * Math.sin(th);
    const y = 46 + r * Math.cos(th) * 0.9;
    pts.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return pts.join('');
})();

/** Dark panel: the tangle unwinds into a straight line and ends at a tick. */
export function TangleDoodle({ className }: Props) {
  const wave = 'var(--color-wave)';
  return (
    <svg viewBox="0 0 260 92" className={className} aria-hidden="true" focusable="false" {...common}>
      <g filter="url(#sketch)" strokeWidth="2.8" stroke={wave}>
        <path d={COIL} />
        <path d="M160 46H206" />
        <path d="M196 37l11 9l-11 9" />
        <circle cx="236" cy="46" r="15" />
        <path d="M229 46l5 5l9 -11" strokeWidth="3.2" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ: a question, and an answer on its way                            */
/* ------------------------------------------------------------------ */
export function FaqDoodle({ className }: Props) {
  return (
    <svg viewBox="0 0 260 320" className={className} aria-hidden="true" focusable="false" {...common}>
      <g filter="url(#sketch)" strokeWidth="2.6" stroke={INK}>
        {/* a big question bubble */}
        <path d="M30 20h140a10 10 0 0 1 10 10v92a10 10 0 0 1 -10 10H78l-26 24v-24H30a10 10 0 0 1 -10 -10V30a10 10 0 0 1 10 -10z" fill={PAPER} />
        <path d="M76 62q0 -22 24 -22q24 0 24 20q0 14 -18 20q-6 3 -6 12" stroke={SIGNAL} strokeWidth="4" />
        <circle cx="100" cy="114" r="4" fill={SIGNAL} stroke="none" />
        {/* the answer: lines and a tick */}
        <path d="M118 176h98a8 8 0 0 1 8 8v52a8 8 0 0 1 -8 8h-8v18l-26 -18h-64a8 8 0 0 1 -8 -8v-52a8 8 0 0 1 8 -8z" fill={BONE} />
        <path d="M134 198h64M134 214h46" strokeWidth="2.2" />
        <path d="M196 226l8 8l16 -18" stroke={SIGNAL} strokeWidth="3.4" />
        {/* sparks */}
        <path d="M210 40v12M204 46h12" stroke={SIGNAL} strokeWidth="2.6" />
        <path d="M40 200v10M35 205h10" stroke={SIGNAL} strokeWidth="2.6" />
        {/* a curious little figure */}
        <circle cx="54" cy="270" r="14" fill={PAPER} />
        <path d="M30 316c0 -26 14 -36 24 -36s24 10 24 36" />
        <path d="M78 296l18 -30M96 266l-4 -9M96 266l8 -4" strokeWidth="2.4" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Product pages: one drawing per product, in the hero                  */
/* ------------------------------------------------------------------ */
const Pin = ({ x, y, color = SIGNAL }: { x: number; y: number; color?: string }) => (
  <g transform={`translate(${x} ${y})`} stroke={color}>
    <path d="M0 0c-9 -11 -13 -17 -13 -23a13 13 0 0 1 26 0c0 6 -4 12 -13 23z" fill={PAPER} />
    <circle cx="0" cy="-23" r="4.5" fill={color} stroke="none" />
  </g>
);

const Person = ({ x, y, color = INK }: { x: number; y: number; color?: string }) => (
  <g transform={`translate(${x} ${y})`} stroke={color}>
    <circle cx="0" cy="-22" r="10" fill={PAPER} />
    <path d="M-19 10c0 -16 9 -22 19 -22s19 6 19 22z" fill={PAPER} />
  </g>
);

const Sparks = ({ x, y }: { x: number; y: number }) => (
  <path d={`M${x} ${y - 6}v12M${x - 6} ${y}h12`} stroke={SIGNAL} strokeWidth="2.4" />
);

const ART: Record<string, React.ReactNode> = {
  'delivery-tracking': (
    <>
      <path d="M52 176C96 176 92 120 148 128S236 132 266 66" stroke={SIGNAL} strokeWidth="3.2" strokeDasharray="2 10" />
      <Pin x={52} y={182} color={INK} />
      <Pin x={266} y={70} />
      <g transform="translate(120 82)">
        <rect x="0" y="0" width="38" height="26" fill={BONE} />
        <path d="M38 8h14l10 10v8H38z" fill={PAPER} />
        <circle cx="12" cy="30" r="6" fill={PAPER} />
        <circle cx="50" cy="30" r="6" fill={PAPER} />
        <path d="M8 -10l-6 -6M20 -12v-8M32 -10l6 -6" stroke={SIGNAL} strokeWidth="2.4" />
      </g>
      <g transform="translate(212 118) rotate(7)">
        <rect x="0" y="0" width="50" height="84" rx="9" fill={PAPER} />
        <path d="M18 8h14" strokeWidth="2" />
        <path d="M10 52q8 -14 14 0t14 -6" strokeWidth="2" />
        <path d="M14 70l7 7l15 -16" stroke={SIGNAL} strokeWidth="3.4" />
      </g>
      <Sparks x={36} y={44} />
    </>
  ),
  'salon-erp': (
    <>
      <g transform="translate(26 36)">
        <rect x="0" y="0" width="130" height="126" fill={PAPER} />
        <rect x="0" y="0" width="130" height="26" fill={BONE} />
        <path d="M30 -8v14M100 -8v14" strokeWidth="3.4" />
        <path d="M0 52H130M0 78H130M0 104H130M32 26V126M65 26V126M98 26V126" strokeWidth="1.6" />
        <rect x="35" y="55" width="27" height="20" fill={SIGNAL} fillOpacity="0.25" stroke={SIGNAL} />
        <path d="M43 66l6 6l9 -12" stroke={SIGNAL} strokeWidth="2.8" />
        <path d="M68 108h24M6 82h20" strokeWidth="2" />
      </g>
      <g strokeWidth="2.8">
        <circle cx="206" cy="176" r="13" fill={PAPER} />
        <circle cx="250" cy="176" r="13" fill={PAPER} />
        <path d="M211 165L252 62M245 165L208 62" />
        <circle cx="228" cy="116" r="3" fill={INK} />
      </g>
      <Pin x={282} y={52} />
      <Sparks x={190} y={40} />
    </>
  ),
  hrms: (
    <>
      <circle cx="62" cy="62" r="30" fill={PAPER} />
      <path d="M62 44v18l13 8" strokeWidth="3" />
      <g transform="translate(220 34)">
        <rect x="0" y="0" width="64" height="56" fill={PAPER} />
        <rect x="0" y="0" width="64" height="14" fill={BONE} />
        <path d="M0 30H64M0 44H64M22 14V56M43 14V56" strokeWidth="1.5" />
        <path d="M24 32l6 6l10 -12" stroke={SIGNAL} strokeWidth="2.8" />
      </g>
      <g stroke={SIGNAL} strokeWidth="2.4">
        <path d="M144 70a14 14 0 0 1 28 0M138 76a20 20 0 0 1 40 0M150 70a8 8 0 0 1 16 0" transform="translate(0 -10)" />
        <path d="M158 62v22" transform="translate(0 -10)" />
      </g>
      <Person x={70} y={176} />
      <Person x={158} y={176} color={SIGNAL} />
      <Person x={246} y={176} />
      <path d="M158 114v-26" stroke={SIGNAL} strokeWidth="2.6" strokeDasharray="2 8" />
    </>
  ),
  crm: (
    <>
      <g fill={PAPER}>
        <path d="M48 56H272L196 140V178H124V140Z" />
      </g>
      <path d="M84 92H236M112 124H208" strokeWidth="2" />
      <g>
        <circle cx="96" cy="22" r="7" fill={BONE} />
        <circle cx="132" cy="14" r="7" fill={BONE} />
        <circle cx="170" cy="24" r="7" fill={BONE} />
        <circle cx="206" cy="14" r="7" fill={BONE} />
        <circle cx="240" cy="26" r="7" fill={BONE} />
        <path d="M110 36v10M152 36v10M190 36v10M222 36v10" stroke={SIGNAL} strokeWidth="2.4" />
      </g>
      <circle cx="160" cy="204" r="13" stroke={SIGNAL} strokeWidth="3" fill={PAPER} />
      <path d="M153 204l5 5l9 -11" stroke={SIGNAL} strokeWidth="3" />
      <g transform="translate(246 130)">
        <path d="M0 0h50a8 8 0 0 1 8 8v26a8 8 0 0 1 -8 8H30l-12 10v-10H8a8 8 0 0 1 -8 -8V8a8 8 0 0 1 8 -8z" fill={PAPER} />
        <path d="M10 15h.1M29 15h.1M48 15h.1" stroke={SIGNAL} strokeWidth="3.4" />
      </g>
    </>
  ),
  'mobile-apps': (
    <>
      <g transform="translate(52 36) rotate(-7 40 70)">
        <rect x="0" y="0" width="84" height="148" rx="12" fill={PAPER} />
        <path d="M30 10h24" strokeWidth="2.2" />
        <rect x="10" y="26" width="64" height="24" rx="4" fill={BONE} strokeWidth="1.8" />
        <rect x="10" y="58" width="64" height="24" rx="4" fill={BONE} strokeWidth="1.8" />
        <rect x="10" y="90" width="64" height="24" rx="4" fill={BONE} strokeWidth="1.8" />
        <path d="M18 38h26M18 70h20M18 102h30" strokeWidth="2" />
      </g>
      <g transform="translate(178 52) rotate(7 40 70)">
        <rect x="0" y="0" width="84" height="148" rx="12" fill={PAPER} />
        <path d="M30 10h24" strokeWidth="2.2" />
        <path d="M14 112c10 -30 28 -6 36 -34s14 -24 20 -34" stroke={SIGNAL} strokeWidth="2.6" strokeDasharray="2 7" />
        <Pin x={70} y={46} />
      </g>
      <g transform="translate(226 14)">
        <path d="M0 0h40a6 6 0 0 1 6 6v16a6 6 0 0 1 -6 6H24l-9 8v-8H6a6 6 0 0 1 -6 -6V6a6 6 0 0 1 6 -6z" fill={PAPER} stroke={SIGNAL} />
        <path d="M10 14h26" stroke={SIGNAL} strokeWidth="2.4" />
      </g>
      <g stroke={INK} strokeWidth="2.4" transform="translate(-118 -186)">
        <path d="M138 196a22 22 0 0 1 32 0M145 204a12 12 0 0 1 18 0" />
        <circle cx="154" cy="211" r="1.8" fill={INK} />
        <path d="M134 214L176 190" stroke={SIGNAL} strokeWidth="3" />
      </g>
    </>
  ),
  websites: (
    <>
      <g transform="translate(34 34)">
        <rect x="0" y="0" width="236" height="150" fill={PAPER} />
        <path d="M0 24H236" />
        <circle cx="12" cy="12" r="3" fill={INK} />
        <circle cx="24" cy="12" r="3" fill={INK} />
        <circle cx="36" cy="12" r="3" fill={INK} />
        <rect x="62" y="6" width="120" height="12" rx="6" strokeWidth="1.6" />
        <rect x="14" y="38" width="112" height="64" fill={BONE} />
        <path d="M24 56h72M24 70h52" strokeWidth="2.2" />
        <rect x="24" y="82" width="38" height="14" fill={SIGNAL} stroke={SIGNAL} />
        <path d="M140 42h82M140 58h60M140 74h72M140 90h40" strokeWidth="1.8" />
        <path d="M14 116h56M14 130h38M96 116h56M96 130h38M178 116h44" strokeWidth="1.6" strokeOpacity="0.55" />
      </g>
      <path d="M270 6l-22 34h16l-8 26l28 -38h-16z" fill={SIGNAL} fillOpacity="0.2" stroke={SIGNAL} strokeWidth="2.8" />
      <g transform="translate(232 150)">
        <rect x="0" y="12" width="26" height="22" rx="3" fill={PAPER} stroke={SIGNAL} />
        <path d="M6 12v-6a7 7 0 0 1 14 0v6" stroke={SIGNAL} />
      </g>
    </>
  ),
  tunnelgate: (
    <>
      <g transform="translate(18 118)">
        <rect x="8" y="0" width="64" height="42" rx="3" fill={PAPER} />
        <path d="M0 52h80l-6 -10H6z" fill={BONE} />
        <path d="M22 14l10 8l-10 8M40 30h16" stroke={SIGNAL} strokeWidth="2.6" />
      </g>
      <g transform="translate(228 100)">
        <rect x="0" y="0" width="74" height="52" fill={PAPER} />
        <rect x="8" y="8" width="58" height="34" fill={BONE} />
        <path d="M37 52v14M20 66h34" strokeWidth="3" />
      </g>
      <g transform="translate(112 22)">
        <path d="M24 70h70a20 20 0 0 0 4 -40a28 28 0 0 0 -52 -8a24 24 0 0 0 -22 48z" fill={PAPER} />
        <path d="M60 30l16 6v14c0 10 -8 16 -16 20c-8 -4 -16 -10 -16 -20V36z" stroke={SIGNAL} strokeWidth="2.8" fill={BONE} />
        <path d="M53 50l5 5l9 -11" stroke={SIGNAL} strokeWidth="2.8" />
      </g>
      <path d="M92 150C108 120 124 112 150 108" stroke={SIGNAL} strokeWidth="3" strokeDasharray="2 9" />
      <path d="M232 128C210 104 192 100 176 96" stroke={SIGNAL} strokeWidth="3" strokeDasharray="2 9" />
      <Sparks x={40} y={60} />
    </>
  ),
  'seo-tracking': (
    <>
      <rect x="30" y="20" width="250" height="36" rx="18" fill={PAPER} />
      <circle cx="56" cy="38" r="9" />
      <path d="M63 45l8 8" strokeWidth="3.2" />
      <path d="M88 38h92" strokeWidth="2.2" strokeOpacity="0.6" />
      <g transform="translate(30 76)">
        <rect x="0" y="0" width="160" height="30" fill={BONE} stroke={SIGNAL} strokeWidth="2.8" />
        <circle cx="18" cy="15" r="9" fill={SIGNAL} stroke="none" />
        <path d="M18 9v12" stroke={PAPER} strokeWidth="2.6" />
        <path d="M36 11h90M36 21h60" strokeWidth="1.8" />
        <rect x="0" y="40" width="160" height="30" fill={PAPER} />
        <path d="M36 51h90M36 61h50" strokeWidth="1.8" strokeOpacity="0.6" />
        <rect x="0" y="80" width="160" height="30" fill={PAPER} strokeOpacity="0.6" />
        <path d="M36 91h90M36 101h44" strokeWidth="1.8" strokeOpacity="0.4" />
      </g>
      <path d="M214 190l24 -30l16 14l34 -52" stroke={SIGNAL} strokeWidth="3.4" />
      <path d="M278 114l8 -2l-2 12" stroke={SIGNAL} strokeWidth="3.4" />
      <path d="M210 200H292" strokeWidth="2.2" />
      <Sparks x={230} y={96} />
    </>
  ),
  payroll: (
    <>
      <g transform="translate(34 24) rotate(-4 55 80)">
        <rect x="0" y="0" width="114" height="152" fill={PAPER} />
        <rect x="0" y="0" width="114" height="26" fill={BONE} />
        <path d="M14 13h40" strokeWidth="2.4" />
        <path d="M14 46h86M14 62h86M14 78h60M14 94h86M14 110h50" strokeWidth="1.8" />
        <path d="M66 138h34" stroke={SIGNAL} strokeWidth="3.2" />
        <circle cx="90" cy="13" r="8" />
        <path d="M86 10h8M86 14h8" strokeWidth="1.6" />
      </g>
      <g transform="translate(166 120)">
        <ellipse cx="22" cy="48" rx="22" ry="8" fill={PAPER} />
        <ellipse cx="22" cy="34" rx="22" ry="8" fill={PAPER} />
        <ellipse cx="22" cy="20" rx="22" ry="8" fill={BONE} />
        <path d="M0 20v28M44 20v28" />
      </g>
      <g transform="translate(228 44)">
        <path d="M0 40L40 10L80 40z" fill={BONE} />
        <path d="M6 44h68M12 48v50M30 48v50M50 48v50M68 48v50M6 102h68" />
        <path d="M32 28h16" strokeWidth="2.2" />
      </g>
      <path d="M216 156q22 8 46 -4" stroke={SIGNAL} strokeWidth="3" strokeDasharray="2 8" />
      <path d="M262 152l-9 -2l3 10" stroke={SIGNAL} strokeWidth="3" />
    </>
  ),
  pos: (
    <>
      <g transform="translate(34 14)">
        <path d="M18 0h64v70H18z" fill={PAPER} />
        <path d="M28 14h44M28 28h30M28 42h38" strokeWidth="1.8" />
        <path d="M82 70l-5 6l-5 -6l-5 6l-5 -6l-5 6l-5 -6l-5 6l-5 -6l-5 6l-5 -6" fill="none" />
      </g>
      <g transform="translate(26 92)">
        <rect x="0" y="0" width="120" height="84" rx="8" fill={PAPER} />
        <rect x="12" y="12" width="96" height="30" fill={BONE} />
        <path d="M20 22h40M20 32h24" strokeWidth="2" />
        <path d="M82 28l5 5l9 -12" stroke={SIGNAL} strokeWidth="2.8" />
        <path d="M18 56h.1M38 56h.1M58 56h.1M78 56h.1M98 56h.1M18 70h.1M38 70h.1M58 70h.1M78 70h.1M98 70h.1" strokeWidth="5" />
      </g>
      <g transform="translate(200 40)">
        <rect x="0" y="0" width="84" height="84" fill={PAPER} />
        <rect x="8" y="8" width="22" height="22" />
        <rect x="54" y="8" width="22" height="22" />
        <rect x="8" y="54" width="22" height="22" />
        <rect x="14" y="14" width="10" height="10" fill={INK} />
        <rect x="60" y="14" width="10" height="10" fill={INK} />
        <rect x="14" y="60" width="10" height="10" fill={INK} />
        <path d="M40 10v8M46 22v8M40 40h10M58 44v10M70 40h6M48 58v14M62 64h12M70 76h4M38 66h4" strokeWidth="3.2" stroke={SIGNAL} />
      </g>
      <g transform="translate(200 150)">
        <path d="M0 0v34M6 0v34M10 0v34M18 0v34M24 0v34M30 0v34M38 0v34M44 0v34M52 0v34M58 0v34M66 0v34M72 0v34M80 0v34" strokeWidth="2.2" />
      </g>
      <path d="M150 140H190" stroke={SIGNAL} strokeWidth="3" strokeDasharray="2 8" />
      <Sparks x={176} y={26} />
    </>
  ),
};

export function ProductDoodle({ slug, className }: { slug: string; className?: string }) {
  const art = ART[slug];
  if (!art) return null;
  return (
    <svg viewBox="0 0 320 220" className={className} aria-hidden="true" focusable="false" {...common}>
      <g filter="url(#sketch)" strokeWidth="2.4" stroke={INK}>
        {art}
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* About and Team                                                       */
/* ------------------------------------------------------------------ */
/** About hero: software that fits the business, like a piece into a puzzle. */
export function AboutDoodle({ className }: Props) {
  return (
    <svg viewBox="0 0 360 240" className={className} aria-hidden="true" focusable="false" {...common}>
      <g filter="url(#sketch)" strokeWidth="2.4" stroke={INK}>
        {/* the business: a small factory */}
        <rect x="20" y="124" width="142" height="96" fill={PAPER} />
        <path d="M20 124V88l36 36V88l36 36V88l36 36V88l34 36" fill={BONE} />
        <rect x="136" y="40" width="20" height="60" fill={PAPER} />
        <path d="M146 28c-8 -6 0 -14 8 -12c6 -10 20 -4 14 6" strokeOpacity="0.55" />
        <rect x="34" y="150" width="26" height="24" fill={BONE} />
        <rect x="70" y="150" width="26" height="24" fill={BONE} />
        <rect x="106" y="150" width="26" height="24" fill={BONE} />
        <rect x="84" y="184" width="32" height="36" fill={PAPER} />
        {/* the software: a piece that fits */}
        <g transform="translate(178 40) scale(2.3)">
          <path d="M12 24h10c-5 -11 13 -11 8 0h12v10c10 -5 10 13 0 8v10H12z" fill={BONE} stroke={SIGNAL} strokeWidth="1.4" />
          <path d="M20 38l6 6l11 -13" stroke={SIGNAL} strokeWidth="1.8" />
        </g>
        <path d="M118 184C150 184 160 150 186 140" stroke={SIGNAL} strokeWidth="3" strokeDasharray="2 9" />
        <Sparks x={330} y={36} />
        <Sparks x={196} y={22} />
        <path d="M292 202l6 -8l6 8l8 -2l-4 8l4 8l-8 -2l-6 8l-6 -8l-8 2l4 -8l-4 -8z" stroke={SIGNAL} strokeWidth="2" transform="translate(6 -4) scale(0.9)" />
      </g>
    </svg>
  );
}

/** Vision: looking ahead. `dark` flips the line colour for the dark card. */
export function VisionDoodle({ className, dark }: Props & { dark?: boolean }) {
  const ink = dark ? 'var(--color-paper)' : INK;
  const accent = dark ? 'var(--color-wave)' : SIGNAL;
  return (
    <svg viewBox="0 0 160 110" className={className} aria-hidden="true" focusable="false" {...common}>
      <g filter="url(#sketch)" strokeWidth="2.4" stroke={ink}>
        <path d="M18 74L84 36l12 22L30 96z" fill={dark ? 'none' : BONE} />
        <path d="M84 36l10 -6l14 24l-10 6" />
        <path d="M52 78L38 106M62 84l12 22" />
        <g stroke={accent} strokeWidth="2.6">
          <path d="M130 18v16M122 26h16" />
          <path d="M146 54v8M142 58h8" />
          <path d="M112 10v6M109 13h6" />
        </g>
      </g>
    </svg>
  );
}

/** Mission: an arrow into the middle of the target. */
export function MissionDoodle({ className, dark }: Props & { dark?: boolean }) {
  const ink = dark ? 'var(--color-paper)' : INK;
  const accent = dark ? 'var(--color-wave)' : SIGNAL;
  return (
    <svg viewBox="0 0 160 110" className={className} aria-hidden="true" focusable="false" {...common}>
      <g filter="url(#sketch)" strokeWidth="2.4" stroke={ink}>
        <circle cx="62" cy="64" r="38" />
        <circle cx="62" cy="64" r="24" />
        <circle cx="62" cy="64" r="9" fill={accent} fillOpacity="0.35" stroke={accent} />
        <path d="M62 64L128 14" stroke={accent} strokeWidth="3" />
        <path d="M128 14l12 -2l-3 12M118 22l12 -2l-3 12" stroke={accent} strokeWidth="2.6" />
      </g>
    </svg>
  );
}

/** About values: Clarity, Craft, Ownership, Continuity. */
export function ValueDoodle({ index, className }: { index: number; className?: string }) {
  const art = [
    <>
      <path d="M32 8a17 17 0 0 0 -9 31v7h18v-7a17 17 0 0 0 -9 -31z" fill={BONE} />
      <path d="M26 52h12M28 58h8" />
      <path d="M8 14l5 4M56 14l-5 4M4 30h6M54 30h6" stroke={SIGNAL} strokeWidth="2.6" />
    </>,
    <>
      <path d="M12 52l3 -12L42 12l9 9L24 49z" fill={BONE} />
      <path d="M12 52l3 -12l9 9z" fill={SIGNAL} stroke={SIGNAL} />
      <path d="M38 16l9 9" />
      <path d="M44 56h14" stroke={SIGNAL} strokeWidth="2.6" />
    </>,
    <>
      <circle cx="20" cy="30" r="11" fill={BONE} />
      <circle cx="20" cy="30" r="3" fill={INK} stroke="none" />
      <path d="M31 30h26M48 30v9M56 30v7" />
      <path d="M44 14l3 4l7 -9" stroke={SIGNAL} strokeWidth="2.8" />
    </>,
    <>
      <path d="M50 30a18 18 0 1 0 -4 14" />
      <path d="M54 16l-3 14l-14 -4" stroke={SIGNAL} strokeWidth="2.8" />
      <path d="M32 24v8l6 4" strokeWidth="2.2" />
    </>,
  ];
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false" {...common}>
      <g filter="url(#sketch-md)" strokeWidth="2.4" stroke={INK}>
        {art[index % art.length]}
      </g>
    </svg>
  );
}

/** Team hero: the same people scope it, build it and support it. */
export function TeamDoodle({ className }: Props) {
  return (
    <svg viewBox="0 0 360 230" className={className} aria-hidden="true" focusable="false" {...common}>
      <g filter="url(#sketch)" strokeWidth="2.4" stroke={INK}>
        {/* scope: a plan */}
        <g transform="translate(34 30)">
          <rect x="0" y="0" width="52" height="64" fill={PAPER} />
          <path d="M10 14h32M10 26h24M10 38h30" strokeWidth="1.8" />
          <path d="M10 52l6 5l12 -12" stroke={SIGNAL} strokeWidth="2.8" />
        </g>
        {/* build: code */}
        <g transform="translate(154 34)">
          <rect x="0" y="0" width="64" height="52" rx="4" fill={BONE} />
          <path d="M20 16l-9 10l9 10M44 16l9 10l-9 10M35 12l-6 28" stroke={SIGNAL} strokeWidth="2.8" />
        </g>
        {/* support: a headset */}
        <g transform="translate(274 30)">
          <path d="M6 40a24 24 0 0 1 48 0" />
          <rect x="0" y="36" width="12" height="22" rx="4" fill={PAPER} />
          <rect x="48" y="36" width="12" height="22" rx="4" fill={PAPER} />
          <path d="M54 58q0 10 -16 10" />
        </g>
        {/* one line, one team */}
        <path d="M100 62H146M226 62H266" stroke={SIGNAL} strokeWidth="3" strokeDasharray="2 9" />
        <path d="M60 104V150M186 100V150M306 104V150" stroke={SIGNAL} strokeWidth="2.6" strokeDasharray="2 8" />
        <g>
          <g transform="translate(60 196)">
            <circle cx="0" cy="-22" r="10" fill={PAPER} />
            <path d="M-19 10c0 -16 9 -22 19 -22s19 6 19 22z" fill={PAPER} />
          </g>
          <g transform="translate(186 196)" stroke={SIGNAL}>
            <circle cx="0" cy="-22" r="10" fill={PAPER} />
            <path d="M-19 10c0 -16 9 -22 19 -22s19 6 19 22z" fill={PAPER} />
          </g>
          <g transform="translate(306 196)">
            <circle cx="0" cy="-22" r="10" fill={PAPER} />
            <path d="M-19 10c0 -16 9 -22 19 -22s19 6 19 22z" fill={PAPER} />
          </g>
        </g>
        <path d="M30 222q150 12 300 0" stroke={SIGNAL} strokeWidth="2.6" />
      </g>
    </svg>
  );
}

/** Team capabilities: one icon per discipline. */
const DISCIPLINE_ICONS: Record<string, React.ReactNode> = {
  Engineering: <path d="M8 7l-5 5l5 5M16 7l5 5l-5 5M13 5l-2 14" />,
  'Product design': (
    <>
      <path d="M4 20l1 -5L16 4l4 4L9 19z" />
      <path d="M14 6l4 4" />
    </>
  ),
  Requirements: (
    <>
      <path d="M7 5h10v16H7z" />
      <path d="M9 3h6v4H9zM10 12h4M10 16h4" />
    </>
  ),
  'QA & testing': (
    <>
      <path d="M9 9a3 3 0 0 1 6 0v6a3 3 0 0 1 -6 0z" />
      <path d="M5 11h4M15 11h4M5 17h4M15 17h4M10 5l-2 -2M14 5l2 -2" />
    </>
  ),
  DevOps: (
    <>
      <path d="M5 12a7 7 0 0 1 12 -5l2 -2v6h-6l2 -2a5 5 0 0 0 -8 3" />
      <path d="M19 12a7 7 0 0 1 -12 5l-2 2v-6h6l-2 2a5 5 0 0 0 8 -3" />
    </>
  ),
  'Client partnership': (
    <>
      <path d="M3 5h11v7H8l-3 3v-3H3z" />
      <path d="M12 10h9v7h-2v3l-3 -3h-4z" />
    </>
  ),
};

export function DisciplineIcon({ name, className }: { name: string; className?: string }) {
  const icon = DISCIPLINE_ICONS[name];
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
/* Contact                                                              */
/* ------------------------------------------------------------------ */
/** Hero: you describe the mess, we show the system. */
export function ContactDoodle({ className }: Props) {
  const bubble = 'M34 24h96a12 12 0 0 1 12 12v50a12 12 0 0 1 -12 12H84l-22 22v-22H34a12 12 0 0 1 -12 -12V36a12 12 0 0 1 12 -12z';
  return (
    <svg viewBox="0 0 360 230" className={className} aria-hidden="true" focusable="false" {...common}>
      <g filter="url(#sketch)" strokeWidth="2.4" stroke={INK}>
        {/* the owner's side: the problem */}
        <path d={bubble} fill={PAPER} />
        <g transform="rotate(-4 82 66)">
          <rect x="44" y="42" width="76" height="48" fill={PAPER} />
          <rect x="44" y="42" width="76" height="12" fill={BONE} />
          <path d="M44 66H120M44 78H120M69 54V90M95 54V90" strokeWidth="1.5" />
          <path d="M50 60q6 -5 12 0M100 72l14 12M114 72l-14 12" strokeWidth="1.8" />
        </g>
        <g transform="translate(70 206)">
          <circle cx="0" cy="-22" r="10" fill={PAPER} />
          <path d="M-19 10c0 -16 9 -22 19 -22s19 6 19 22z" fill={PAPER} />
        </g>

        {/* our side: the system */}
        <g transform="translate(360 0) scale(-1 1)">
          <path d={bubble} fill={PAPER} />
        </g>
        <g stroke={SIGNAL} strokeWidth="2.4">
          <path d="M278 66L254 46M278 66L302 46M278 66L254 86M278 66L302 86" />
          <circle cx="278" cy="66" r="10" fill={BONE} />
          <path d="M273 66l4 4l7 -8" strokeWidth="2.6" />
          <circle cx="252" cy="44" r="6" fill={PAPER} />
          <circle cx="304" cy="44" r="6" fill={PAPER} />
          <circle cx="252" cy="88" r="6" fill={PAPER} />
          <circle cx="304" cy="88" r="6" fill={PAPER} />
        </g>
        <g transform="translate(290 206)" stroke={SIGNAL}>
          <circle cx="0" cy="-22" r="10" fill={PAPER} />
          <path d="M-19 10c0 -16 9 -22 19 -22s19 6 19 22z" fill={PAPER} />
        </g>

        {/* the conversation between them */}
        <path d="M150 62H206" stroke={SIGNAL} strokeWidth="3" strokeDasharray="2 9" />
        <path d="M198 52l12 10l-12 10" stroke={SIGNAL} strokeWidth="2.8" />
        <path d="M146 156q34 -20 68 0" strokeOpacity="0.5" strokeDasharray="2 8" />
        <Sparks x={180} y={112} />
        <path d="M24 224H336" strokeOpacity="0.25" strokeWidth="2" />
      </g>
    </svg>
  );
}

/** Contact details: envelope, phone, pin, clock. */
const CONTACT_ICONS: Record<string, React.ReactNode> = {
  Email: (
    <>
      <path d="M3 6h18v12H3z" />
      <path d="M3 7l9 7l9 -7" />
    </>
  ),
  Phone: <path d="M6 3l3 1l1 4l-2 1.5a10 10 0 0 0 6 6l1.5 -2l4 1l1 3a2 2 0 0 1 -2 2C9 19 5 12 4 5a2 2 0 0 1 2 -2z" />,
  Office: (
    <>
      <path d="M12 21c-4 -5 -6 -8 -6 -11a6 6 0 0 1 12 0c0 3 -2 6 -6 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  Hours: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
};

export function ContactIcon({ name, className }: { name: string; className?: string }) {
  const icon = CONTACT_ICONS[name];
  if (!icon) return null;
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false" {...common}>
      <g filter="url(#sketch-sm)" stroke="currentColor" strokeWidth="1.6">
        {icon}
      </g>
    </svg>
  );
}
