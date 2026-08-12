# Sacro e Profano Cattery

Static website built with [Astro](https://astro.build). Content (cats, litters)
is managed through Content Collections in Markdown. Page content is in
Italian, but URLs are in English.

## Structure

- `src/content/cats/` — one `.md` per cat (breeders, champions, kittens)
- `src/content/litters/` — one `.md` per litter
- `src/assets/cats/` and `src/assets/litters/` — corresponding images (optimized
  automatically at build time: resize, WebP, lazy loading)
- `src/pages/` — site pages (home, breeders, litters, contact)
- `src/layouts/Layout.astro` — shared layout/header/footer
- `src/components/CatCard.astro` — reusable card for cat previews

## Adding a cat

1. Put the photos in `src/assets/cats/name-cover.jpg`, `name-1.jpg`, etc.
2. Create `src/content/cats/name.md` following the schema in `src/content/config.ts`
   (copy `luna.md` as an example).
3. The cat automatically appears on `/breeders`.

Same process for litters in `src/content/litters/`.

## Local development

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # generates static dist/
npm run preview   # preview the build
```

## Context for Claude Code

The `CLAUDE.md` file at the repo root summarizes the stack, decisions made,
and open TODOs: Claude Code reads it automatically at the start of every
session in this folder.

## Publishing to an existing GitHub repo

If you've already created an empty repo on GitHub (e.g. `sacroeprofano-cattery`):

```bash
git init
git add .
git commit -m "Rebuild site: Astro, Sacro di Birmania and Kurilian Bobtail sections"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

From there, connect the repo to Vercel as described below.

## Deploy (Vercel)

1. Push the repo to GitHub.
2. On vercel.com → "Import project" → select the repo.
   Vercel detects Astro automatically (build command `astro build`,
   output `dist/`), no manual configuration needed.
3. Every push to `main` goes live automatically; every PR gets a preview URL.

### Custom domain (Aruba)

The domain stays registered with Aruba: just update the DNS records to point
to Vercel (Vercel shows you the exact values under Project → Settings → Domains).
Typically:
- `A` record on `@` → Vercel's IP
- `CNAME` record on `www` → `cname.vercel-dns.com`

## Contact form

The `/contact` page uses [Formspree](https://formspree.io) (free tier):
create a form on their site, copy the ID and replace it in
`src/pages/contact.astro` in place of `YOUR_FORM_ID`. No backend required.

## CI

GitHub Actions runs on every push and pull request (see
`.github/workflows/ci.yml`): installs dependencies, type-checks with
`astro check`, and builds the site to catch broken content/config before
it reaches `main`.

## Notes

- The images in `src/assets/cats/luna-*.jpg` are auto-generated placeholders —
  replace them with real photos and update/remove `luna.md`, used here only
  as an example.
- Only replace the old site on Aruba after verifying the deploy on a test
  domain (e.g. the free `*.vercel.app` subdomain automatically assigned to
  the project).
