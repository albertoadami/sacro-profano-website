# Sacro e Profano Cattery — contesto progetto

Sito di un allevamento amatoriale di gatti, in sostituzione del vecchio sito
(anni 2000, hostato su Aruba, praticamente invisibile su Google).

## Stack e decisioni prese

- **Astro** (output statico) invece di una SPA React pura: per un sito-vetrina
  con poche pagine e molto contenuto/immagini, serve HTML statico veloce e
  indicizzabile, non una single-page app. Componenti React NON sono usati al
  momento — se in futuro serve interattività complessa si possono aggiungere
  come "isole" Astro, ma non è la priorità.
- **Hosting: Vercel** (o in alternativa Cloudflare Pages) — piano gratuito,
  deploy automatico da push su GitHub.
- **Dominio**: resta registrato su Aruba, si cambiano solo i record DNS per
  puntare a Vercel.
- **Immagini**: tenute dentro il repo (`src/assets/`), ottimizzate in build da
  `astro:assets` (resize, WebP, lazy loading). Niente S3/Cloudinary per ora —
  volume di immagini basso e aggiornamenti sporadici da parte dell'allevatore.
- **Form contatti**: Formspree (piano free), nessun backend custom.
- **Content Collections** (`src/content/config.ts`) per gatti (`cats`) e
  cucciolate (`litters`), validate con Zod — l'allevatore o chi aggiorna il
  sito aggiunge file `.md` senza toccare il codice.

## Razze allevate

Le due razze sono un `enum` fisso in `src/content/config.ts` (`BREEDS`):
- **Sacro di Birmania**
- **Kurilian Bobtail**

Se in futuro si aggiunge una terza razza, va aggiunta lì e compare
automaticamente nei filtri/nelle liste.

## Struttura del sito

Le pagine hanno contenuti in italiano ma URL in inglese (scelta SEO/leggibilità
per link esterni e condivisioni):

- `/` — home, panoramica con link alle due razze
- `/about-us` — storia, filosofia di allevamento, affiliazioni associative
- `/sacro-di-birmania` — pagina informativa razza + lista riproduttori filtrata
- `/kurilian-bobtail` — pagina informativa razza + lista riproduttori filtrata
- `/breeders` — tutti i riproduttori, raggruppati per razza
- `/breeders/[slug]` — scheda singolo riproduttore (da content collection `cats`)
- `/litters` — lista cucciolate (da content collection `litters`), raggruppate/etichettate per razza
- `/contact` — form Formspree

## Lingue (IT/EN)

Sito bilingue tramite l'`i18n` built-in di Astro (`astro.config.mjs`): italiano
è la lingua di default (URL senza prefisso, es. `/sacro-di-birmania`), inglese
vive sotto `/en/...`. Gli slug inglesi di `about-us`, `birmans` (Sacro di
Birmania) e `kurilian-bobtail-section` ricalcano deliberatamente quelli del
vecchio sito invece di rispecchiare gli slug italiani — vedi la mappa in
`src/i18n/routes.ts`, che è anche ciò che il language switcher e i tag
`hreflang` in `Layout.astro` usano per trovare la pagina equivalente.

- **Rilevamento lingua per geolocalizzazione**: `middleware.ts` alla radice
  del repo è Vercel Edge Middleware (indipendente da `output: 'static'`,
  gira comunque perché è una feature della piattaforma Vercel, non di Astro)
  — al primo accesso a `/` redirige in base al paese IP (`x-vercel-ip-country`):
  Italia resta su `/`, altrove va su `/en`. Esclude i bot/crawler e rispetta
  un cookie `locale` già impostato (dal redirect stesso o dal cambio lingua
  manuale) per non sovrascrivere mai una scelta esplicita. Non testabile in
  locale (`npm run dev`/`preview`) — l'header IP esiste solo su Vercel.
- **Stringhe UI** (nav, footer, testi ricorrenti): dizionario in `src/i18n/ui.ts`.
- **Content collections**: `cats`/`litters` (IT) hanno un gemello
  `catsEn`/`littersEn` con lo stesso schema Zod — stesso slug per lo stesso
  gatto/cucciolata (es. `luna.md` in entrambe le cartelle), cambia solo il
  testo libero nel body markdown. Chi aggiorna il sito deve ricordarsi di
  aggiornare entrambe le versioni.
- Le pagine `/kurilian-bobtail` e `/sacro-di-birmania` (e le loro versioni EN
  `kurilian-bobtail-section`/`birmans`) hanno testo lungo scritto direttamente
  nei file `.astro`, quindi le versioni EN sono file `.astro` separati sotto
  `src/pages/en/`, non un lookup generico di stringhe.

## Obiettivo SEO

Il sito attuale non è indicizzato su Google. Il rebuild migliora automaticamente
velocità, mobile-friendliness, HTML semantico e HTTPS. Da fare ancora (non
ancora implementato in questo repo):

- `@astrojs/sitemap` per generare `sitemap.xml` automaticamente
- Meta title/description dinamici per pagina (al momento il `<title>` nel
  `Layout.astro` prende solo la prop `title`, andrebbe arricchito con parole
  chiave tipo "allevamento Sacro di Birmania [città]")
- Dati strutturati Schema.org (`LocalBusiness`)
- Ricollegare Google Search Console al nuovo dominio/deploy
- Contenuto testuale reale scritto dall'allevatore (i testi attuali nelle
  pagine sono placeholder/bozze da riscrivere)

## Cose NON ancora fatte / TODO aperti

- Sostituire i contenuti placeholder (`luna.md`, `taiga.md` sono gatti di
  esempio con foto segnaposto) con i gatti reali dell'allevamento
- Scrivere i testi definitivi di Chi siamo e delle due pagine razza
- Collegare Formspree con un vero form ID (attualmente `YOUR_FORM_ID`)
- Deploy su Vercel + collegamento dominio Aruba via DNS
- Aggiungere sitemap/meta SEO come sopra
- Far rileggere da madrelingua i testi di `/en/birmans` e
  `/en/kurilian-bobtail-section`: sul vecchio sito quelle pagine non erano mai
  state davvero tradotte (l'URL `/en/...` serviva testo italiano), quindi il
  testo attuale è una traduzione fatta da Claude, non professionale come
  quella di `/en/about-us` (quella sì presa dal vecchio sito)

## Comandi utili

```bash
npm install
npm run dev       # http://localhost:4321
npm run build
npm run preview
```
