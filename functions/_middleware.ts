/**
 * Host canonicalization: www -> apex, 301.
 *
 * Why this exists as a Function and not only as a _redirects line.
 *
 * public/_redirects carries the documented rule
 *
 *   https://www.healthcarepestreference.org/* https://healthcarepestreference.org/:splat 301
 *
 * That rule was added in Run 2 and has been deployed since the Run 2-4 merge
 * on 2026-09-11. As of 2026-09-12 the www host was still serving the full
 * site with no redirect, which is the expected behaviour if Cloudflare Pages
 * is ignoring the absolute-URL source: Pages matches _redirects sources as
 * URL paths, so a source beginning with a scheme and hostname never matches
 * an incoming request. The _redirects line is kept — it is correct, it is
 * what the operator asked for, and it is what takes effect if the site is
 * ever served from a host that does support hostname matching — but it
 * cannot be the mechanism relied on here.
 *
 * This middleware performs the redirect at the edge instead.
 *
 * Loop safety: the redirect fires only when the request hostname is exactly
 * the www host, and it rewrites the hostname to a different value. A request
 * to the apex never matches, so the apex cannot redirect to itself. The
 * response is a 301 to an absolute URL on the apex, so a client following it
 * arrives at a request this middleware passes straight through.
 *
 * Everything else falls through to next(), which serves static assets,
 * applies _redirects and _headers, and runs the /api Functions unchanged.
 */

const WWW_HOST = 'www.healthcarepestreference.org';
const APEX_HOST = 'healthcarepestreference.org';

export const onRequest: PagesFunction = async (context) => {
  const url = new URL(context.request.url);

  if (url.hostname.toLowerCase() === WWW_HOST) {
    url.hostname = APEX_HOST;
    url.port = '';
    url.protocol = 'https:';
    return new Response(null, {
      status: 301,
      headers: {
        Location: url.toString(),
        'Cache-Control': 'public, max-age=3600'
      }
    });
  }

  return context.next();
};
