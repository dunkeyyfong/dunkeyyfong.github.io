import { useEffect, useRef, useState } from 'react';
import { education, experience, languages, profile, projects, skills, ui, type Project } from '../data/profile';
import { useLang } from '../lib/i18n';
import { Icon, Reveal, Section, SectionHeading, Tags } from './ui';

const prettyUrl = (url: string) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');
const initials = (name: string) =>
  name
    .replace(/[^A-Za-z\s-]/g, '')
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('');

/* ───────────────────────── About ───────────────────────── */

export function About() {
  const { t } = useLang();
  return (
    <Section id="about" index={1} title={t(ui.sections.about)}>
      <p className="max-w-3xl text-pretty text-lg leading-[1.8] text-ink md:text-xl md:leading-[1.8]">
        {t(profile.about)}
      </p>
    </Section>
  );
}

/* ───────────────────────── Experience (timeline) ───────────────────────── */

export function Experience() {
  const { t } = useLang();
  return (
    <Section id="experience" index={2} title={t(ui.sections.experience)} tone="wash">
      <ol className="relative space-y-8 border-l-2 border-line pl-6 sm:pl-10">
        {experience.map((job) => (
          <li key={job.company} className="relative">
            <span
              aria-hidden="true"
              className="absolute top-8 -left-[33px] size-4 rounded-full border-4 border-wash bg-navy sm:-left-[49px]"
            />
            <article className="rounded-2xl border border-line bg-white p-6 shadow-sm shadow-navy/5 md:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="grid size-12 shrink-0 place-items-center rounded-xl bg-tint text-sm font-bold text-navy"
                  >
                    {initials(job.company)}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-ink">{job.company}</h3>
                    <p className="font-medium text-navy">{t(job.role)}</p>
                  </div>
                </div>
                <p className="self-start rounded-full border border-line bg-wash px-3 py-1 text-sm font-medium whitespace-nowrap text-muted tabular-nums">
                  {t(job.period)}
                </p>
              </div>

              <ul className="mt-6 space-y-3 text-[15px] leading-relaxed text-ink">
                {job.bullets.map((bullet) => (
                  <li key={bullet.vi} className="flex gap-3">
                    <Icon name="check" className="mt-1 size-4 text-sky" />
                    <span>{t(bullet)}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 border-t border-line pt-5">
                <Tags items={job.tech} label={t(ui.techUsed)} />
              </div>
              {job.note && <p className="mt-4 text-sm text-muted">{t(job.note)}</p>}
            </article>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/* ───────────────────────── Projects (cards) ───────────────────────── */

const COVER_GRADIENTS = ['from-navy to-[#1d6a9e]', 'from-[#0f4467] to-navy'];

/** Screenshot from public/projects/<slug>.(png|jpg|webp|avif) if present, otherwise a designed cover. */
function ProjectCover({ project, index }: { project: Project; index: number }) {
  const { t } = useLang();
  const file = __PROJECT_IMAGES__.find((name) => name.replace(/\.[^.]+$/, '') === project.slug);

  if (file) {
    return (
      <div className="aspect-[16/9] overflow-hidden border-b border-line bg-tint">
        <img
          src={`projects/${file}`}
          alt=""
          loading="lazy"
          decoding="async"
          className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`relative aspect-[16/9] overflow-hidden bg-gradient-to-br ${COVER_GRADIENTS[index % COVER_GRADIENTS.length]}`}
    >
      <div className="cover-grid absolute inset-0" />
      <div className="absolute -top-16 -right-16 size-56 rounded-full bg-sky/40 blur-3xl" />
      {/* window chrome */}
      <div className="absolute top-4 left-5 flex gap-1.5">
        <span className="size-2.5 rounded-full bg-white/30" />
        <span className="size-2.5 rounded-full bg-white/30" />
        <span className="size-2.5 rounded-full bg-white/30" />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-6">
        <p className="text-xs font-semibold tracking-[0.14em] text-white/85 uppercase">{t(project.kind)}</p>
        <p className="mt-1.5 text-2xl font-bold tracking-tight text-white md:text-3xl">{project.name}</p>
      </div>
    </div>
  );
}

export function Projects() {
  const { t } = useLang();
  return (
    <Section id="projects" index={3} title={t(ui.sections.projects)}>
      <ul className="grid gap-6 md:grid-cols-2">
        {projects.map((project, index) => {
          const linked = Boolean(project.url);
          return (
            <li key={project.slug}>
              <article
                className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-sm shadow-navy/5 transition-[transform,box-shadow,border-color] duration-300 ${
                  linked ? 'hover:-translate-y-1 hover:border-navy/30 hover:shadow-lg hover:shadow-navy/10' : ''
                }`}
              >
                <ProjectCover project={project} index={index} />
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-semibold text-ink">
                    {linked ? (
                      // Stretched link: the whole card is clickable, but only the title is announced.
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="after:absolute after:inset-0 after:rounded-2xl after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-sky"
                      >
                        {project.name}
                        <span className="sr-only">{t(ui.opensInNewTab)}</span>
                      </a>
                    ) : (
                      project.name
                    )}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{t(project.description)}</p>
                  <div className="mt-5">
                    <Tags items={project.tech} label={t(ui.techUsed)} size="sm" />
                  </div>
                  {linked && (
                    <p
                      aria-hidden="true"
                      className="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-semibold text-navy"
                    >
                      {prettyUrl(project.url)}
                      <Icon
                        name="arrow"
                        className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </p>
                  )}
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

/* ───────────────────────── Skills (tag cards) ───────────────────────── */

export function Skills() {
  const { t } = useLang();
  return (
    <Section id="skills" index={4} title={t(ui.sections.skills)} tone="wash">
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group) => (
          <li key={group.group.vi} className="rounded-2xl border border-line bg-white p-6 shadow-sm shadow-navy/5">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-lg bg-tint text-navy">
                <Icon name={group.icon} className="size-5" />
              </span>
              <h3 className="font-semibold text-ink">{t(group.group)}</h3>
            </div>
            <div className="mt-5">
              <Tags items={group.items} label={t(group.group)} />
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ───────────────────────── Education + Languages (side by side) ───────────────────────── */

export function EducationAndLanguages() {
  const { t } = useLang();
  const card = 'rounded-2xl border border-line bg-white p-6 shadow-sm shadow-navy/5';

  return (
    <div className="py-16 md:py-24">
      <Reveal className="mx-auto grid max-w-5xl gap-14 px-5 sm:px-8 md:grid-cols-2 md:gap-8">
        <section id="education" aria-labelledby="education-title" className="scroll-mt-24">
          <SectionHeading id="education" index={5} title={t(ui.sections.education)} />
          <ul className="space-y-4">
            {education.map((item) => (
              <li key={item.school.vi} className={`${card} flex gap-4`}>
                <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-tint text-navy">
                  <Icon name="cap" className="size-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-ink">{t(item.school)}</h3>
                  <p className="mt-0.5 font-medium text-navy">{t(item.degree)}</p>
                  <p className="mt-1.5 text-sm text-muted">
                    {t(item.status)}
                    {item.note && <> · {t(item.note)}</>}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section id="languages" aria-labelledby="languages-title" className="scroll-mt-24">
          <SectionHeading id="languages" index={6} title={t(ui.sections.languages)} />
          <ul className="space-y-4">
            {languages.map((item) => (
              <li key={item.name.vi} className={`${card} flex gap-4`}>
                <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-tint text-navy">
                  <Icon name="globe" className="size-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-ink">{t(item.name)}</h3>
                  <p className="mt-0.5 text-muted">{t(item.level)}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </Reveal>
    </div>
  );
}

/* ───────────────────────── Contact ───────────────────────── */

function CopyEmailButton({ email }: { email: string }) {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Clipboard API is blocked on non-secure origins; fall back to a hidden field.
      const field = document.createElement('textarea');
      field.value = email;
      field.setAttribute('readonly', '');
      field.style.position = 'fixed';
      field.style.opacity = '0';
      document.body.appendChild(field);
      field.select();
      document.execCommand('copy');
      field.remove();
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <>
      <button
        type="button"
        onClick={copy}
        aria-label={t(ui.copyEmailLabel)}
        className="inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-lg bg-white px-4 text-sm font-semibold text-navy transition-colors duration-200 hover:bg-tint active:translate-y-px"
      >
        <Icon name={copied ? 'check' : 'copy'} />
        {copied ? t(ui.copied) : t(ui.copyEmail)}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? t(ui.copied) : ''}
      </span>
    </>
  );
}

export function Contact() {
  const { t } = useLang();
  const tile =
    'flex min-h-11 items-center gap-3 rounded-xl border border-white/15 bg-white/[0.07] px-4 py-3.5 text-white transition-colors duration-200';
  const tileLink = `${tile} hover:border-white/35 hover:bg-white/[0.12]`;

  return (
    <Section id="contact" index={7} title={t(ui.sections.contact)}>
      <div className="relative isolate overflow-hidden rounded-3xl bg-navy p-7 text-white shadow-xl shadow-navy/20 sm:p-10 md:p-12 [&_:focus-visible]:outline-white">
        <div aria-hidden="true" className="absolute -top-24 -right-24 -z-10 size-80 rounded-full bg-sky/50 blur-3xl" />
        <div aria-hidden="true" className="cover-grid absolute inset-0 -z-10" />

        <p className="max-w-xl text-lg text-white/85">{t(ui.contactLead)}</p>

        {profile.email && (
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
            <a
              href={`mailto:${profile.email}`}
              className="text-xl font-bold tracking-tight [overflow-wrap:anywhere] underline-offset-[6px] hover:underline sm:text-3xl md:text-4xl"
            >
              {profile.email}
            </a>
            <CopyEmailButton email={profile.email} />
          </div>
        )}

        <ul className="mt-10 grid gap-3 sm:grid-cols-3">
          <li>
            <a href={`tel:${profile.phoneHref}`} className={tileLink}>
              <Icon name="phone" className="size-5 text-white/80" />
              <span>
                <span className="block text-xs text-white/75">{t(ui.phone)}</span>
                <span className="font-semibold">{profile.phone}</span>
              </span>
            </a>
          </li>
          <li>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className={tileLink}>
              <Icon name="github" className="size-5 text-white/80" />
              <span className="min-w-0">
                <span className="block text-xs text-white/75">GitHub</span>
                <span className="block truncate font-semibold">{prettyUrl(profile.github).replace('github.com/', '')}</span>
                <span className="sr-only">{t(ui.opensInNewTab)}</span>
              </span>
            </a>
          </li>
          <li className={tile}>
            <Icon name="pin" className="size-5 text-white/80" />
            <span>
              <span className="block text-xs text-white/75">{t(ui.location)}</span>
              <span className="font-semibold">{t(profile.location)}</span>
            </span>
          </li>
        </ul>
      </div>
    </Section>
  );
}
