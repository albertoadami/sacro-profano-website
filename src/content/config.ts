import { defineCollection, z } from 'astro:content';

// Le due razze allevate. Uso questo enum ovunque per coerenza e per i filtri di pagina.
export const BREEDS = ['Sacro di Birmania', 'Kurilian Bobtail'] as const;
const breedEnum = z.enum(BREEDS);

// Gatti del catteria: riproduttori (maschi/femmine adulti)
const cats = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
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
  }),
});

// Cucciolate (litters)
const litters = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    breed: breedEnum,
    birthDate: z.date(),
    mother: z.string(), // slug del gatto in cats/
    father: z.string(),
    kittensCount: z.number().optional(),
    coverImage: image(),
    gallery: z.array(image()).default([]),
    status: z.enum(['in arrivo', 'nati', 'disponibili', 'tutti prenotati']).default('nati'),
  }),
});

export const collections = { cats, litters };
