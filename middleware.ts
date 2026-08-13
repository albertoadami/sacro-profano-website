// Vercel Edge Middleware (framework-agnostic, runs even with Astro's `output: 'static'`).
// Sends first-time visitors to the Italian or English site based on their IP's country,
// as requested: Italy -> default (Italian) site, everywhere else -> /en.
//
// Only touches the bare "/" so it never overrides a URL someone already navigated to
// directly (e.g. a shared /en/birmans link stays on /en/birmans regardless of geo).
// Search engine crawlers are excluded so Google indexes "/" as Italian unconditionally,
// instead of seeing a redirect based on the crawler's own IP.
export const config = { matcher: '/' };

const BOT_UA = /bot|crawl|spider|slurp|facebookexternalhit|whatsapp|telegrambot|preview/i;

export default function middleware(request: Request): Response | void {
  const userAgent = request.headers.get('user-agent') || '';
  if (BOT_UA.test(userAgent)) return;

  // A `locale` cookie means the visitor already got routed once (by geo or by the
  // language switcher) - respect that choice instead of re-deciding every visit.
  const cookie = request.headers.get('cookie') || '';
  if (/(?:^|;\s*)locale=/.test(cookie)) return;

  const country = request.headers.get('x-vercel-ip-country');
  if (country === 'IT') return;

  const url = new URL(request.url);
  url.pathname = '/en';
  const response = Response.redirect(url, 307);
  response.headers.set('set-cookie', 'locale=en; Path=/; Max-Age=31536000; SameSite=Lax');
  return response;
}
