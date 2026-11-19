import { useEffect, useState } from 'react';
import { profile, ui, type Lang } from '../data/profile';
import { useLang } from '../lib/i18n';

const NAV = ['about', 'experience', 'projects', 'skills', 'education', 'contact'] as const;
type NavId = (typeof NAV)[number];

const LANGS: { code: Lang; label: string; name: string }[] = [
  { code: 'vi', label: 'VI', name: 'Tiếng Việt' },
  { code: 'en', label: 'EN', name: 'English' },
];

/** The section currently in the middle band of the viewport, for highlighting the nav. */
function useActiveSection(): NavId | null {
  const [active, setActive] = useState<NavId | null>(null);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as NavId);
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    for (const id of NAV) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return active;
}

export function Header() {
  const { lang, setLang, t } = useLang();
  const active = useActiveSection();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-20 border-b transition-[background-color,border-color] duration-200 ${
        scrolled ? 'border-line bg-white/90 backdrop-blur-md' : 'border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-5 sm:px-8">
        <a href="#top" className="flex min-h-11 min-w-0 items-center gap-2.5 font-semibold text-ink hover:text-navy">
          <span
            aria-hidden="true"
            className="grid size-8 shrink-0 place-items-center rounded-lg bg-navy text-[13px] font-bold text-white"
          >
            TP
          </span>
          <span className="truncate text-sm">{profile.name}</span>
        </a>

        <div className="flex items-center gap-3 sm:gap-6">
          <nav aria-label={t(ui.mainNav)} className="hidden lg:block">
            <ul className="flex items-center gap-1 text-sm">
              {NAV.map((id) => {
                const current = active === id;
                return (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      aria-current={current ? 'true' : undefined}
                      className={`rounded-md px-3 py-2 transition-colors duration-200 ${
                        current ? 'bg-tint font-semibold text-navy' : 'text-muted hover:text-navy'
                      }`}
                    >
                      {t(ui.sections[id])}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div role="group" aria-label={t(ui.switchLanguage)} className="flex rounded-lg border border-line bg-white p-0.5">
            {LANGS.map(({ code, label, name }) => {
              const isActive = lang === code;
              return (
                <button
                  key={code}
                  type="button"
                  lang={code}
                  aria-label={name}
                  aria-pressed={isActive}
                  onClick={() => setLang(code)}
                  className={`min-h-9 min-w-10 cursor-pointer rounded-md px-2 text-xs font-semibold tracking-wide transition-colors duration-200 ${
                    isActive ? 'bg-navy text-white' : 'text-muted hover:bg-tint hover:text-navy'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
