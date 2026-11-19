import { profile, ui } from './data/profile';
import { LangProvider, useLang } from './lib/i18n';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About, Contact, EducationAndLanguages, Experience, Projects, Skills } from './components/Sections';

function Page() {
  const { t } = useLang();

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-navy focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
      >
        {t(ui.skipToContent)}
      </a>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <EducationAndLanguages />
        <Contact />
      </main>
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2 px-5 py-8 text-sm text-muted sm:px-8">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p>{profile.title}</p>
        </div>
      </footer>
    </>
  );
}

export default function App() {
  return (
    <LangProvider>
      <Page />
    </LangProvider>
  );
}
