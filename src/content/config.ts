import { defineCollection, z } from 'astro:content';

// Le due razze allevate. Uso questo enum ovunque per coerenza e per i filtri di pagina.
export const BREEDS = ['Sacro di Birmania', 'Kurilian Bobtail'] as const;
const breedEnum = z.enum(BREEDS);

// Gatti del catteria: riproduttori (maschi/femmine adulti)
const catsSchema = ({ image }: { image: () => z.ZodType }) => z.object({
  name: z.string(),
  role: z.enum(['maschio', 'femmina']),
  breed: breedEnum,
  color: z.string().optional(), // es. "Seal Point", "Colorpoint a pelo corto"
  birthDate: z.date().optional(),
  pedigree: z.string().optional(), // codice/link pedigree ENFI/FIFe/ANFI ecc.
  titles: z.array(z.string()).default([]), // es. "Campione Internazionale"
  coverImage: image(),
  gallery: z.array(image()).default([]),
  order: z.number().default(0), // per ordinare manualmente in pagina
});
const cats = defineCollection({ type: 'content', schema: catsSchema });

// Cucciolate (litters)
const littersSchema = ({ image }: { image: () => z.ZodType }) => z.object({
  title: z.string(),
  breed: breedEnum,
  birthDate: z.date(),
  mother: z.string(), // slug del gatto in cats/
  father: z.string(),
  kittensCount: z.number().optional(),
  coverImage: image(),
  gallery: z.array(image()).default([]),
  status: z.enum(['in arrivo', 'nati', 'disponibili', 'tutti prenotati']).default('nati'),
});
const litters = defineCollection({ type: 'content', schema: littersSchema });

// Copie in inglese: stesso schema, slug allineati a `cats`/`litters` (es. "luna" in
// entrambe), solo il testo libero nel body markdown cambia lingua.
const catsEn = defineCollection({ type: 'content', schema: catsSchema });
const littersEn = defineCollection({ type: 'content', schema: littersSchema });

export const collections = { cats, litters, catsEn, littersEn };
