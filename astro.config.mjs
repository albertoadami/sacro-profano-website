import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.sacroeprofanocattery.com',
  // Output statico: perfetto per Vercel/Netlify/Cloudflare Pages, ottimo per SEO
  output: 'static',
  i18n: {
    defaultLocale: 'it',
    locales: ['it', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
