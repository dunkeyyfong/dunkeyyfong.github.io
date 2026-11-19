import { useEffect, useRef, useState, type ReactNode, type SVGProps } from 'react';

/* ───────────── Icons (inline SVG, Lucide-style; decorative unless labelled by the parent) ───────────── */

export type IconName =
  | 'mail'
  | 'phone'
  | 'github'
  | 'pin'
  | 'copy'
  | 'check'
  | 'arrow'
  | 'arrowDown'
  | 'server'
  | 'monitor'
  | 'database'
  | 'terminal'
  | 'layers'
  | 'cap'
  | 'globe';

const PATHS: Record<IconName, ReactNode> = {
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </>
  ),
  phone: (
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  ),
  github: (
    <>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </>
  ),
  pin: (
    <>
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  copy: (
    <>
      <rect x="8" y="8" width="14" height="14" rx="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </>
  ),
  check: <path d="M20 6 9 17l-5-5" />,
  arrow: (
    <>
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </>
  ),
  arrowDown: (
    <>
      <path d="M12 5v14" />
      <path d="m19 12-7 7-7-7" />
    </>
  ),
  server: (
    <>
      <rect x="2" y="2" width="20" height="8" rx="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" />
      <path d="M6 6h.01" />
      <path d="M6 18h.01" />
    </>
  ),
  monitor: (
    <>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8" />
      <path d="M12 17v4" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14a9 3 0 0 0 18 0V5" />
      <path d="M3 12a9 3 0 0 0 18 0" />
    </>
  ),
  terminal: (
    <>
      <path d="m4 17 6-6-6-6" />
      <path d="M12 19h8" />
    </>
  ),
  layers: (
    <>
      <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
      <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
      <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
    </>
  ),
  cap: (
    <>
      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
      <path d="M22 10v6" />
      <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </>
  ),
};

export function Icon({ name, className = 'size-4', ...rest }: { name: IconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={`shrink-0 ${className}`}
      {...rest}
    >
      {PATHS[name]}
    </svg>
  );
}

/* ───────────── Reveal: fades content in the first time it scrolls into view ───────────── */

export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} ${className}`}>
      {children}
    </div>
  );
}

/* ───────────── Section heading: "01 ——" eyebrow above a large title ───────────── */

export function SectionHeading({ id, index, title }: { id: string; index: number; title: string }) {
  return (
    <div className="mb-8 md:mb-10">
      <p aria-hidden="true" className="flex items-center gap-3 text-sm font-semibold tabular-nums text-navy">
        {String(index).padStart(2, '0')}
        <span className="h-px w-10 bg-sky" />
      </p>
      <h2 id={`${id}-title`} className="mt-3 text-2xl font-bold tracking-tight text-ink md:text-3xl">
        {title}
      </h2>
    </div>
  );
}

/* ───────────── Section: full-width band, centred content column ───────────── */

export function Section({
  id,
  index,
  title,
  tone = 'plain',
  children,
}: {
  id: string;
  index: number;
  title: string;
  tone?: 'plain' | 'wash';
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`scroll-mt-16 py-16 md:py-24 ${tone === 'wash' ? 'border-y border-line bg-wash' : ''}`}
    >
      <Reveal className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeading id={id} index={index} title={title} />
        {children}
      </Reveal>
    </section>
  );
}

/* ───────────── Tag list ───────────── */

export function Tags({ items, label, size = 'md' }: { items: string[]; label?: string; size?: 'sm' | 'md' }) {
  const pad = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-[13px]';
  return (
    <ul aria-label={label} className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item} className={`rounded-md border border-line bg-tint font-medium leading-5 text-navy ${pad}`}>
          {item}
        </li>
      ))}
    </ul>
  );
}

/* ───────────── Shared button looks (44px minimum touch target) ───────────── */

const buttonBase =
  'inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-lg px-5 text-sm font-semibold transition-[background-color,border-color,box-shadow,transform] duration-200 active:translate-y-px';

export const buttonPrimary = `${buttonBase} bg-navy text-white shadow-sm shadow-navy/20 hover:bg-navy-deep hover:shadow-md hover:shadow-navy/25`;
export const buttonSecondary = `${buttonBase} border border-navy/40 bg-white/80 text-navy hover:border-navy hover:bg-white`;
