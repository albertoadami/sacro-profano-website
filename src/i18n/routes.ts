// EN slugs deliberately reuse the old site's URLs for about-us/birmans/kurilian-bobtail-section
// (see project decision to keep those exact paths), so they don't mirror the Italian slugs
// 1:1 - this table is what lets the language switcher and hreflang tags find the right pair.
export const itToEn: Record<string, string> = {
  '/': '/en',
  '/about-us': '/en/about-us',
  '/sacro-di-birmania': '/en/birmans',
  '/kurilian-bobtail': '/en/kurilian-bobtail-section',
  '/breeders': '/en/breeders',
  '/litters': '/en/litters',
  '/contact': '/en/contact',
};

const enToIt: Record<string, string> = Object.fromEntries(
  Object.entries(itToEn).map(([it, en]) => [en, it])
);

function stripTrailingSlash(path: string): string {
  return path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
}

/** Given the current pathname, return the equivalent page in the other locale. */
export function getAlternatePath(pathname: string): string {
  const path = stripTrailingSlash(pathname);

  const breederMatch = path.match(/^(\/en)?\/breeders\/(.+)$/);
  if (breederMatch) {
    const [, enPrefix, slug] = breederMatch;
    return enPrefix ? `/breeders/${slug}` : `/en/breeders/${slug}`;
  }

  if (path in itToEn) return itToEn[path];
  if (path in enToIt) return enToIt[path];

  // Fallback for any page not in the table: just toggle the /en prefix.
  return path.startsWith('/en') ? path.slice(3) || '/' : `/en${path}`;
}
