import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { profile, site, type Lang, type Text } from '../data/profile';

const STORAGE_KEY = 'lang';
const DEFAULT_LANG: Lang = 'vi';

const isLang = (v: unknown): v is Lang => v === 'vi' || v === 'en';

/** Order of precedence: ?lang=en in the URL, then the last choice, then Vietnamese. */
function initialLang(): Lang {
  const fromUrl = new URLSearchParams(window.location.search).get('lang');
  if (isLang(fromUrl)) return fromUrl;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (isLang(saved)) return saved;
  } catch {
    // Storage can be unavailable (private mode); fall through to the default.
  }
  return DEFAULT_LANG;
}

interface LangContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  /** Picks the current language out of a { vi, en } pair. */
  t: (text: Text) => string;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Not persisted; the choice still applies for this visit.
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = `${profile.name} — ${profile.title}`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', site.description[lang]);
  }, [lang]);

  const value = useMemo<LangContextValue>(() => ({ lang, setLang, t: (text) => text[lang] }), [lang, setLang]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used inside <LangProvider>');
  return ctx;
}
