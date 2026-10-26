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
  // One cabinet, five drawers: everything the business runs on, in one place.
  const drawers: { y: number; icon: React.ReactNode }[] = [
    { y: 22, icon: <path d="M-7 4l4 -5l4 3l7 -8" /> }, // sales
    { y: 54, icon: <path d="M-7 -3l7 -4l7 4v8l-7 4l-7 -4zM-7 -3l7 4l7 -4" /> }, // inventory
    { y: 86, icon: <><path d="M-7 3a7 7 0 0 1 14 0" /><path d="M-9 1v6M9 1v6" strokeWidth="3" /></> }, // service
    { y: 118, icon: <><circle r="7" /><path d="M-3 -2h6M-3 2h6" strokeWidth="1.6" /></> }, // finance
    { y: 150, icon: <path d="M-7 6v-6M-2 6v-11M3 6v-8M8 6v-4" strokeWidth="3" /> }, // reporting
  ];
  return (
    <svg viewBox="0 0 240 200" className={className} aria-hidden="true" focusable="false" {...common}>
      <g filter="url(#sketch)" strokeWidth="2.4" stroke={INK}>
        <rect x="46" y="10" width="148" height="182" rx="6" fill={PAPER} />
        {drawers.map((d, i) => (
          <g key={d.y}>
            <rect x="56" y={d.y} width="128" height="26" fill={i % 2 ? PAPER : BONE} strokeWidth="1.8" />
            <g transform={`translate(78 ${d.y + 13})`}>{d.icon}</g>
            <rect x="106" y={d.y + 9} width="40" height="8" rx="4" fill={PAPER} strokeWidth="1.8" />
          </g>
        ))}
        {/* a papers-sticking-out top drawer, slightly open */}
        <path d="M70 22l6 -10h30l4 10" stroke={SIGNAL} strokeWidth="1.8" fill={PAPER} />
        {/* one lock bar runs through every drawer */}
        <path d="M168 14v174" stroke={SIGNAL} strokeWidth="3.4" />
        <g fill={SIGNAL} stroke="none">
          {drawers.map((d) => (
            <circle key={d.y} cx="168" cy={d.y + 13} r="4" />
          ))}
        </g>
        <path d="M16 194H224" strokeOpacity="0.3" strokeWidth="2" />
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
  // "Just need a simple website": a business card with a web address.
  return (
    <svg viewBox="0 0 120 96" className={className} aria-hidden="true" focusable="false" {...common}>
      <g filter="url(#sketch)" strokeWidth="2" stroke={INK}>
        <g transform="rotate(-6 60 50)">
          <rect x="14" y="20" width="92" height="58" fill={PAPER} />
          <circle cx="32" cy="38" r="9" fill={BONE} />
          <path d="M48 34h44M48 44h30" strokeWidth="1.8" />
          <path d="M26 64h44" strokeWidth="1.8" strokeOpacity="0.6" />
          <path d="M80 62l5 -4l5 4" stroke={SIGNAL} strokeWidth="2.2" />
        </g>
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
  // custom ERP: an order is approved and the stock it uses drops
  erp: (
    <>
      <g transform="translate(24 24)">
        <path d="M0 0h96v128H0z" fill={PAPER} />
        <path d="M14 20h50M14 38h68M14 56h40" strokeWidth="1.8" />
        <rect x="14" y="76" width="68" height="34" fill={BONE} />
        <circle cx="60" cy="93" r="11" stroke={SIGNAL} strokeWidth="2.6" />
        <path d="M54 93l4 4l8 -9" stroke={SIGNAL} strokeWidth="2.6" />
        <path d="M22 98h20" strokeWidth="2" />
      </g>
      <path d="M132 88H182" stroke={SIGNAL} strokeWidth="3" strokeDasharray="2 8" />
      <path d="M182 88l-9 -6M182 88l-9 6" stroke={SIGNAL} strokeWidth="3" />
      <g transform="translate(196 98)">
        <rect x="0" y="40" width="40" height="40" fill={BONE} />
        <rect x="44" y="40" width="40" height="40" fill={BONE} />
        <rect x="22" y="0" width="40" height="40" fill={PAPER} />
        <path d="M0 60h40M44 60h40M22 20h40" strokeWidth="1.8" />
      </g>
      <g transform="translate(196 28)">
        <path d="M0 40h84" />
        <path d="M0 40V16M28 40V4M56 40V24M84 40V12" strokeWidth="5" stroke={SIGNAL} />
      </g>
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
        {/* a young company: a sapling growing out of a laptop */}
        <path d="M66 214h228l-16 -16H82z" fill={BONE} />
        <rect x="92" y="128" width="176" height="72" rx="5" fill={PAPER} />
        <path d="M110 150h46M110 164h30M110 178h40" strokeWidth="1.8" strokeOpacity="0.5" />
        <path d="M180 128C180 104 176 84 184 62" stroke={SIGNAL} strokeWidth="3.2" />
        <path d="M180 108c-26 -2 -44 -16 -46 -34c26 0 42 12 46 34z" fill={BONE} stroke={SIGNAL} />
        <path d="M181 92c24 -2 42 -14 44 -32c-24 0 -40 10 -44 32z" fill={BONE} stroke={SIGNAL} />
        <path d="M184 62c-14 -6 -16 -22 -10 -34c14 6 18 20 10 34z" fill={BONE} stroke={SIGNAL} />
        {/* the year it started, on a plant tag */}
        <path d="M226 96l22 -6" strokeOpacity="0.6" />
        <rect x="236" y="64" width="62" height="30" rx="3" fill={PAPER} transform="rotate(-8 267 79)" />
        <text x="246" y="86" fontSize="19" fontWeight="800" fill={INK} stroke="none" fontFamily="inherit" transform="rotate(-8 267 79)">2025</text>
        {/* where it is: Nashik, on the map */}
        <Pin x={318} y={196} />
        <path d="M296 204q10 4 18 -2" strokeOpacity="0.45" strokeDasharray="2 7" />
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
  const cards = [24, 140, 256];
  return (
    <svg viewBox="0 0 360 230" className={className} aria-hidden="true" focusable="false" {...common}>
      <g filter="url(#sketch)" strokeWidth="2.4" stroke={INK}>
        {cards.map((x) => (
          <rect key={x} x={x} y="24" width="80" height="112" fill={PAPER} />
        ))}
        {/* strategy and growth: bars climbing to a flag */}
        <g transform="translate(24 24)">
          <path d="M14 98v-18M30 98v-34M46 98v-50M62 98v-66" stroke={SIGNAL} strokeWidth="6" />
          <path d="M10 106H70" />
          <path d="M62 24V8" />
          <path d="M62 8l16 5l-16 6z" fill={SIGNAL} stroke={SIGNAL} />
        </g>
        {/* architecture and backend: a database wired to services */}
        <g transform="translate(140 24)">
          <ellipse cx="40" cy="26" rx="20" ry="7" fill={BONE} />
          <path d="M20 26v22c0 4 9 7 20 7s20 -3 20 -7V26" fill={PAPER} />
          <path d="M20 37c0 4 9 7 20 7s20 -3 20 -7" strokeWidth="1.8" />
          <path d="M40 55v14M40 69H18M40 69h22" stroke={SIGNAL} strokeWidth="2.6" />
          <rect x="6" y="78" width="24" height="18" fill={PAPER} stroke={SIGNAL} />
          <rect x="50" y="78" width="24" height="18" fill={PAPER} stroke={SIGNAL} />
        </g>
        {/* product and frontend: a wireframe and a pen */}
        <g transform="translate(256 24)">
          <rect x="10" y="14" width="60" height="50" fill={PAPER} />
          <path d="M10 26H70" />
          <rect x="16" y="32" width="26" height="26" fill={BONE} strokeWidth="1.8" />
          <path d="M48 36h16M48 46h12" strokeWidth="1.8" />
          <path d="M20 96l30 -26l8 8l-26 30l-12 4z" fill={PAPER} />
          <path d="M50 70l8 8" stroke={SIGNAL} strokeWidth="3" />
        </g>
        {/* the same three people, start to finish: initials on one line */}
        <path d="M64 196H300" stroke={SIGNAL} strokeWidth="2.6" />
        <path d="M64 136v60M180 136v60M296 136v60" strokeDasharray="2 8" strokeOpacity="0.5" />
        {[
          [64, 'VZ'],
          [180, 'RM'],
          [296, 'AB'],
        ].map(([x, t]) => (
          <g key={t as string}>
            <circle cx={x as number} cy="196" r="20" fill={PAPER} stroke={SIGNAL} strokeWidth="2.8" />
            <text x={x as number} y="203" textAnchor="middle" fontSize="18" fontWeight="800" fill={SIGNAL} stroke="none" fontFamily="inherit">{t}</text>
          </g>
        ))}
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
  return (
    <svg viewBox="0 0 360 230" className={className} aria-hidden="true" focusable="false" {...common}>
      <g filter="url(#sketch)" strokeWidth="2.4" stroke={INK}>
        {/* a desk phone: call us */}
        <rect x="22" y="146" width="96" height="48" rx="8" fill={PAPER} />
        <rect x="26" y="116" width="88" height="22" rx="11" fill={BONE} />
        <circle cx="48" cy="170" r="11" />
        <path d="M48 164v12M42 170h12" strokeWidth="1.6" />
        <path d="M74 160h26M74 172h26M74 184h20" strokeWidth="1.8" />
        <path d="M30 128q-14 -4 -12 -22" stroke={SIGNAL} strokeWidth="2.6" />
        {/* chai in a glass: let's talk over a cup */}
        <path d="M150 128h64l-8 62h-48z" fill={PAPER} />
        <path d="M154 150h56l-4 40h-48z" fill={BONE} strokeWidth="1.6" />
        <ellipse cx="182" cy="196" rx="44" ry="7" fill={PAPER} />
        <path d="M214 140q20 2 16 22t-26 14" />
        <g stroke={SIGNAL} strokeWidth="2.6">
          <path d="M168 112q-10 -10 0 -22t0 -22" />
          <path d="M184 112q-10 -10 0 -22t0 -22" />
          <path d="M200 112q-10 -10 0 -22t0 -22" />
        </g>
        {/* a letter: write to us */}
        <g transform="translate(250 112) rotate(5)">
          <rect x="0" y="22" width="92" height="64" fill={PAPER} />
          <path d="M0 22l46 34l46 -34" />
          <rect x="14" y="0" width="62" height="40" fill={BONE} stroke={SIGNAL} strokeWidth="2" />
          <path d="M24 12h40M24 24h26" strokeWidth="1.8" stroke={SIGNAL} />
        </g>
        <path d="M14 204H346" strokeOpacity="0.3" strokeWidth="2" />
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

/* ------------------------------------------------------------------ */
/* 404: the page took an early exit                                     */
/* ------------------------------------------------------------------ */
export function NotFoundDoodle({ className }: Props) {
  return (
    <svg viewBox="0 0 360 230" className={className} aria-hidden="true" focusable="false" {...common}>
      <g filter="url(#sketch)" strokeWidth="2.4" stroke={INK}>
        {/* the exit: a door, ajar, with a sign above it */}
        <rect x="236" y="34" width="98" height="166" fill={BONE} />
        <rect x="248" y="46" width="74" height="154" fill={PAPER} strokeOpacity="0.4" />
        <path d="M236 34l52 14v152l-52 -2z" fill={PAPER} />
        <circle cx="274" cy="126" r="3.4" fill={INK} stroke="none" />
        <rect x="258" y="6" width="58" height="20" fill={SIGNAL} stroke={SIGNAL} />
        <path d="M268 16h30M290 10l8 6l-8 6" stroke={PAPER} strokeWidth="2.6" />

        {/* the page itself, running for it */}
        <g>
          <path d="M120 84h38l16 16v54H120z" fill={PAPER} />
          <path d="M158 84v16h16" />
          <circle cx="136" cy="116" r="2.8" fill={INK} stroke="none" />
          <circle cx="158" cy="116" r="2.8" fill={INK} stroke="none" />
          <path d="M138 130q9 8 18 0" />
          <path d="M120 112l-16 -10M174 108l18 -16" />
          <path d="M136 154l-16 22l-16 -4M160 154l16 20l14 22" />
        </g>

        {/* motion and a lost question */}
        <path d="M24 108h56M40 128h46M30 148h40" strokeOpacity="0.45" strokeDasharray="2 9" strokeWidth="2.6" />
        <circle cx="96" cy="200" r="4" strokeOpacity="0.45" />
        <circle cx="76" cy="196" r="3" strokeOpacity="0.45" />
        <path d="M60 52q0 -12 12 -12q12 0 12 10q0 8 -10 11v6" stroke={SIGNAL} strokeWidth="3" />
        <circle cx="76" cy="76" r="2.6" fill={SIGNAL} stroke="none" />
        <path d="M14 204H346" strokeOpacity="0.3" strokeWidth="2" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Insights                                                             */
/* ------------------------------------------------------------------ */
/** Insights hero: an open notebook, an idea, a pencil. */
export function InsightsDoodle({ className }: Props) {
  return (
    <svg viewBox="0 0 360 230" className={className} aria-hidden="true" focusable="false" {...common}>
      <g filter="url(#sketch)" strokeWidth="2.4" stroke={INK}>
        {/* the notebook */}
        <path d="M30 92Q105 76 180 94V206Q105 190 30 206Z" fill={PAPER} />
        <path d="M180 94Q255 76 330 92V206Q255 190 180 206Z" fill={PAPER} />
        <path d="M180 94V206" />
        <path d="M48 118q40 -8 114 4M48 140q40 -8 114 4M48 162q40 -8 80 0" strokeWidth="1.8" strokeOpacity="0.6" />
        {/* a small process on the right page */}
        <rect x="204" y="116" width="34" height="24" fill={BONE} />
        <rect x="262" y="116" width="34" height="24" fill={BONE} />
        <path d="M240 128h20M254 122l6 6l-6 6" stroke={SIGNAL} strokeWidth="2.4" />
        <path d="M279 142v14" stroke={SIGNAL} strokeWidth="2.4" />
        <circle cx="279" cy="168" r="11" stroke={SIGNAL} strokeWidth="2.6" />
        <path d="M273 168l4 4l8 -9" stroke={SIGNAL} strokeWidth="2.6" />
        <path d="M206 160q20 -6 40 0M206 178q16 -5 30 0" strokeWidth="1.8" strokeOpacity="0.6" />
        {/* an idea */}
        <path d="M180 8a22 22 0 0 0 -11 41v8h22v-8a22 22 0 0 0 -11 -41z" fill={BONE} />
        <path d="M172 64h16M174 70h12" />
        <path d="M130 22l8 6M230 22l-8 6M118 44h10M232 44h10M150 6l4 8M210 6l-4 8" stroke={SIGNAL} strokeWidth="2.6" />
        {/* a pencil */}
        <g transform="rotate(-28 312 190)">
          <rect x="278" y="182" width="64" height="16" fill={BONE} />
          <path d="M342 182l16 8l-16 8z" fill={PAPER} />
          <path d="M350 186l8 4l-8 4" fill={SIGNAL} stroke={SIGNAL} />
          <path d="M290 182v16" />
        </g>
      </g>
    </svg>
  );
}

/** One small drawing per article, keyed by slug. */
const ARTICLE_ART: Record<string, React.ReactNode> = {
  // buy or build: a balance with a boxed package against a puzzle piece
  'custom-erp-or-off-the-shelf': (
    <>
      <path d="M100 118V28" />
      <path d="M86 118h28" />
      <path d="M44 38L156 30" />
      <path d="M44 38L24 84M44 38L66 84M156 30L136 76M156 30L176 76" strokeWidth="1.8" strokeOpacity="0.7" />
      <path d="M18 84h54q-4 14 -27 14t-27 -14z" fill={PAPER} />
      <path d="M130 76h54q-4 14 -27 14t-27 -14z" fill={PAPER} />
      <rect x="32" y="58" width="26" height="24" fill={BONE} />
      <path d="M32 66h26M45 58v8" strokeWidth="1.8" />
      <rect x="138" y="58" width="40" height="16" fill={PAPER} stroke={SIGNAL} strokeWidth="2.2" />
      <ellipse cx="138" cy="66" rx="4" ry="8" fill={BONE} stroke={SIGNAL} strokeWidth="2.2" />
      <path d="M148 64h24M148 70h16" stroke={SIGNAL} strokeWidth="1.6" />
      <circle cx="100" cy="24" r="5" fill={PAPER} />
    </>
  ),
  // discovery: a magnifier over a mapped-out process
  'what-to-expect-during-erp-discovery': (
    <>
      <rect x="14" y="30" width="44" height="30" fill={BONE} />
      <rect x="78" y="30" width="44" height="30" fill={PAPER} />
      <rect x="142" y="30" width="44" height="30" fill={PAPER} />
      <path d="M58 45h20M72 39l6 6l-6 6M122 45h20M136 39l6 6l-6 6" stroke={SIGNAL} strokeWidth="2.4" />
      <path d="M28 82h30M92 82h22M156 82h24" strokeWidth="1.8" strokeOpacity="0.6" />
      <circle cx="46" cy="76" r="24" fill={PAPER} fillOpacity="0.85" />
      <path d="M64 94L88 118" strokeWidth="4" />
      <path d="M36 70q0 -8 9 -8q9 0 9 7q0 5 -8 8v3" stroke={SIGNAL} strokeWidth="2.6" />
    </>
  ),
  // spreadsheets break across two places: two pins, two sheets, a broken link
  'spreadsheets-fail-at-a-second-location': (
    <>
      <g transform="translate(22 32)">
        <rect x="0" y="0" width="52" height="40" fill={PAPER} />
        <rect x="0" y="0" width="52" height="10" fill={BONE} />
        <path d="M0 20H52M0 30H52M17 10V40M35 10V40" strokeWidth="1.5" />
      </g>
      <g transform="translate(126 32)">
        <rect x="0" y="0" width="52" height="40" fill={PAPER} />
        <rect x="0" y="0" width="52" height="10" fill={BONE} />
        <path d="M0 20H52M0 30H52M17 10V40M35 10V40" strokeWidth="1.5" />
        <path d="M6 24l10 -3M6 34l12 -3" strokeWidth="2" stroke={SIGNAL} />
      </g>
      <path d="M80 52h14l6 -8l8 16l6 -8h8" stroke={SIGNAL} strokeWidth="2.6" />
      <Pin x={48} y={118} color={INK} />
      <Pin x={152} y={118} />
      <path d="M62 104q40 -14 76 0" strokeDasharray="2 8" strokeOpacity="0.55" />
    </>
  ),
};

export function ArticleDoodle({ slug, className }: { slug: string; className?: string }) {
  const art = ARTICLE_ART[slug];
  if (!art) return null;
  return (
    <svg viewBox="0 0 200 130" className={className} aria-hidden="true" focusable="false" {...common}>
      <g filter="url(#sketch)" strokeWidth="2.4" stroke={INK}>
        {art}
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Portfolio: a board of eleven small screens, one of them being used  */
/* ------------------------------------------------------------------ */
/** One tiny scene per product, in catalog order, drawn inside a 62x48 tile. */
const PORTFOLIO_GLYPHS: React.ReactNode[] = [
  <g key="erp"><rect x="10" y="28" width="16" height="12" /><rect x="28" y="28" width="16" height="12" /><rect x="19" y="15" width="16" height="12" /></g>,
  <path key="delivery" d="M10 38L22 28L34 33L52 18M10 38h0M22 28h0M34 33h0M52 18h0" strokeWidth="3" />,
  <g key="salon"><rect x="10" y="18" width="14" height="10" /><rect x="28" y="24" width="14" height="14" /><rect x="10" y="32" width="14" height="6" /></g>,
  <g key="hrms"><circle cx="31" cy="29" r="12" /><path d="M31 22v7l5 3" /></g>,
  <g key="crm"><path d="M10 18h10M26 18h10M42 18h10" /><rect x="10" y="23" width="10" height="7" /><rect x="10" y="33" width="10" height="6" /><rect x="26" y="23" width="10" height="7" /><rect x="42" y="23" width="10" height="7" /></g>,
  <g key="apps"><rect x="23" y="16" width="16" height="26" /><path d="M29 38h4" /></g>,
  <g key="web"><rect x="10" y="17" width="42" height="24" /><path d="M10 24h42M15 31h14M15 35h22" /></g>,
  <g key="tunnel"><path d="M12 40V30a19 19 0 0 1 38 0v10" /><path d="M24 40V32a7 7 0 0 1 14 0v8" /></g>,
  <path key="seo" d="M12 40V34M22 40V30M32 40V25M42 40V20M12 24l10 -4l10 -4l12 -4" />,
  <g key="payroll"><rect x="14" y="16" width="34" height="26" /><path d="M20 24h22M20 30h22M20 36h12" /></g>,
  <g key="pos"><rect x="12" y="17" width="26" height="22" /><path d="M16 22h18M16 28h6M26 28h8M16 33h6M26 33h8" /><rect x="42" y="25" width="10" height="14" /></g>,
];

export function PortfolioDoodle({ className }: Props) {
  const tile = (i: number) => {
    const x = 14 + (i % 6) * 60;
    const y = 36 + Math.floor(i / 6) * 84;
    const on = i === 4; // the CRM tile is the one being opened
    return (
      <g key={i} transform={`translate(${x} ${y}) scale(0.88)`}>
        <rect width="62" height="48" fill={on ? PAPER : BONE} stroke={on ? SIGNAL : INK} strokeWidth={on ? 2.8 : 2.2} />
        <path d="M0 9h62" strokeWidth="1.6" strokeOpacity="0.5" stroke={on ? SIGNAL : INK} />
        <g stroke={on ? SIGNAL : INK} strokeWidth="2">{PORTFOLIO_GLYPHS[i]}</g>
      </g>
    );
  };
  return (
    <svg viewBox="0 0 380 240" className={className} aria-hidden="true" focusable="false" {...common}>
      <g filter="url(#sketch)" strokeWidth="2.4" stroke={INK}>
        {/* the board and its pins */}
        <rect x="6" y="6" width="368" height="196" fill={PAPER} />
        <path d="M60 202v26M320 202v26M40 228h40M300 228h40" />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(tile)}
        {/* a cursor opening the CRM tile */}
        <path d="M284 66l0 30l8 -7l6 14l6 -3l-6 -13l11 -1z" fill={INK} stroke={PAPER} strokeWidth="1.6" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Portfolio, client work: a checked document (drawn for dark)          */
/* ------------------------------------------------------------------ */
export function VerifiedDoodle({ className }: Props) {
  const wave = 'var(--color-wave)';
  return (
    <svg viewBox="0 0 240 180" className={className} aria-hidden="true" focusable="false" {...common}>
      <g filter="url(#sketch)" strokeWidth="2.4" stroke={PAPER}>
        {/* a case study with a before and after figure */}
        <path d="M30 14h110l24 24v128H30z" />
        <path d="M140 14v24h24" />
        <path d="M46 56h72M46 74h56M46 120h40M104 120h18" strokeOpacity="0.6" strokeWidth="1.8" />
        <path d="M46 100l18 -10l16 6l20 -14" stroke={wave} />
        {/* the figures being checked */}
        <circle cx="156" cy="112" r="30" fill="none" />
        <path d="M178 134l32 32" strokeWidth="5" />
        <path d="M142 112l10 10l18 -20" stroke={wave} strokeWidth="3" />
      </g>
    </svg>
  );
}
