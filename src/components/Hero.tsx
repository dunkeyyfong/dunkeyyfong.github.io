import { profile, ui } from '../data/profile';
import { useLang } from '../lib/i18n';
import { Icon, buttonPrimary, buttonSecondary } from './ui';

export function Hero() {
  const { t } = useLang();

  return (
    <section id="top" aria-labelledby="hero-name" className="relative isolate -mt-16 scroll-mt-16 overflow-hidden">
      <div aria-hidden="true" className="hero-bg absolute inset-0 -z-10" />

      <div className="mx-auto max-w-5xl px-5 pt-28 pb-16 sm:px-8 md:pt-36 md:pb-24">
        <div className="flex flex-col-reverse gap-10 md:flex-row md:items-center md:justify-between md:gap-14">
          <div className="min-w-0 max-w-2xl">
            <p className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/80 px-3 py-1 text-sm text-muted">
              <Icon name="pin" className="size-3.5 text-sky" />
              {t(profile.location)}
            </p>

            <h1
              id="hero-name"
              className="mt-5 text-4xl font-bold leading-[1.12] tracking-tight text-balance text-ink sm:text-5xl md:text-6xl"
            >
              {profile.name}
            </h1>
            <p className="mt-4 text-lg font-semibold text-navy md:text-xl">{profile.title}</p>
            <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted">{t(profile.tagline)}</p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#contact" className={buttonPrimary}>
                <Icon name="mail" />
                {t(ui.contactMe)}
              </a>
              <a href="#projects" className={buttonSecondary}>
                {t(ui.seeProjects)}
                <Icon name="arrowDown" />
              </a>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className={buttonSecondary}>
                <Icon name="github" />
                GitHub
                <span className="sr-only">{t(ui.opensInNewTab)}</span>
              </a>
            </div>
          </div>

          {/* Portrait with a brand-gradient ring */}
          <div className="relative shrink-0 self-start md:self-auto">
            <div
              aria-hidden="true"
              className="absolute -inset-3 -z-10 rounded-full bg-gradient-to-br from-sky/25 to-navy/10 blur-xl"
            />
            <div className="rounded-full bg-gradient-to-br from-sky to-navy p-1 shadow-xl shadow-navy/15">
              <img
                src={profile.avatar}
                alt={`${t(ui.portraitAlt)} ${profile.name}`}
                width={224}
                height={224}
                decoding="async"
                fetchPriority="high"
                className="size-32 rounded-full border-4 border-white object-cover sm:size-40 md:size-56"
              />
            </div>
          </div>
        </div>

        {/* Highlights */}
        <ul aria-label={t(ui.highlights)} className="mt-14 grid gap-4 sm:grid-cols-3 md:mt-20">
          {profile.highlights.map((item) => (
            <li
              key={item.value}
              className="rounded-xl border border-line bg-white/85 p-5 shadow-sm shadow-navy/5 backdrop-blur-sm"
            >
              <p className="text-2xl font-bold tracking-tight text-navy">{item.value}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{t(item.label)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
