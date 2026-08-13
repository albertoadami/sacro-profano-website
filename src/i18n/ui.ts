export type Lang = 'it' | 'en';
export const defaultLang: Lang = 'it';
export const languageLabels: Record<Lang, string> = { it: 'Italiano', en: 'English' };

export const ui = {
  it: {
    'nav.home': 'Home',
    'nav.about': 'Chi siamo',
    'nav.sacro': 'Sacro di Birmania',
    'nav.kurilian': 'Kurilian Bobtail',
    'nav.breeders': 'Riproduttori',
    'nav.litters': 'Cucciolate',
    'nav.contact': 'Contatti',
    'menu.open': 'Apri il menu',
    'breeders.empty': 'Nessun riproduttore pubblicato ancora per questa razza.',
    'breeders.title': 'I nostri riproduttori',
    'cat.breed': 'Razza',
    'cat.color': 'Colore',
    'cat.titles': 'Titoli',
    'cat.pedigree': 'Pedigree',
    'cat.back': '← Tutti i riproduttori',
    'litters.empty': 'Nessuna cucciolata pubblicata al momento. Torna a trovarci presto!',
    'litters.born': 'Nati il',
    'litters.status': 'Stato',
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About us',
    'nav.sacro': 'Sacred Birman',
    'nav.kurilian': 'Kurilian Bobtail',
    'nav.breeders': 'Our cats',
    'nav.litters': 'Litters',
    'nav.contact': 'Contact',
    'menu.open': 'Open menu',
    'breeders.empty': 'No cats published yet for this breed.',
    'breeders.title': 'Our cats',
    'cat.breed': 'Breed',
    'cat.color': 'Color',
    'cat.titles': 'Titles',
    'cat.pedigree': 'Pedigree',
    'cat.back': '← All cats',
    'litters.empty': 'No litters published at the moment. Check back soon!',
    'litters.born': 'Born on',
    'litters.status': 'Status',
  },
} as const;

export type UiKey = keyof (typeof ui)['it'];

export function useTranslations(lang: Lang) {
  return (key: UiKey) => ui[lang][key] ?? ui[defaultLang][key];
}

// The `breed` value stored in content collections is a fixed Italian enum (see
// BREEDS in content/config.ts) used for filtering - this only translates its display label.
export const breedLabels: Record<Lang, Record<string, string>> = {
  it: { 'Sacro di Birmania': 'Sacro di Birmania', 'Kurilian Bobtail': 'Kurilian Bobtail' },
  en: { 'Sacro di Birmania': 'Sacred Birman', 'Kurilian Bobtail': 'Kurilian Bobtail' },
};

export const statusLabels: Record<Lang, Record<string, string>> = {
  it: { 'in arrivo': 'in arrivo', nati: 'nati', disponibili: 'disponibili', 'tutti prenotati': 'tutti prenotati' },
  en: { 'in arrivo': 'expected', nati: 'born', disponibili: 'available', 'tutti prenotati': 'all reserved' },
};
