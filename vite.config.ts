import { existsSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { profile, site } from './src/data/profile.ts';

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Fills the SEO / Open Graph placeholders in index.html from src/data/profile.ts. */
function seoFromProfile(): Plugin {
  const siteUrl = site.url.replace(/\/+$/, '');
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.title,
    url: `${siteUrl}/`,
    image: `${siteUrl}/${profile.avatar}`,
    sameAs: [profile.github],
  };
  const values: Record<string, string> = {
    TITLE: escapeHtml(`${profile.name} — ${profile.title}`),
    NAME: escapeHtml(profile.name),
    DESCRIPTION: escapeHtml(site.description.vi),
    SITE_URL: `${siteUrl}/`,
    OG_IMAGE: `${siteUrl}/${site.ogImage}`,
    JSON_LD: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
  };
  return {
    name: 'seo-from-profile',
    transformIndexHtml: (html) => html.replace(/\{\{(\w+)\}\}/g, (m, key: string) => values[key] ?? m),
  };
}

/** Screenshots present in public/projects, so cards know whether to show an image. */
function projectImages(): string[] {
  const dir = fileURLToPath(new URL('./public/projects', import.meta.url));
  return existsSync(dir) ? readdirSync(dir).filter((f) => /\.(png|jpe?g|webp|avif)$/i.test(f)) : [];
}

export default defineConfig({
  // Relative base: the same build works at a domain root (user.github.io, Cloudflare Pages)
  // and in a sub-folder (user.github.io/repo-name).
  base: './',
  plugins: [react(), tailwindcss(), seoFromProfile()],
  define: {
    __PROJECT_IMAGES__: JSON.stringify(projectImages()),
  },
});
