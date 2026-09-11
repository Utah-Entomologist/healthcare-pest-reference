/**
 * Shared helpers for the Cloudflare Pages Functions in /functions/api/.
 *
 * These functions run on Cloudflare's edge alongside the static Astro output.
 * They are the only server-side code on the site. subscribe/unsubscribe only
 * create and update contacts in Resend; broadcasts to the register are
 * composed and sent by the operator from Resend. contact forwards one inquiry
 * email and stores nothing.
 */

export interface Env {
  /** Resend API key with contacts permissions. Set as a Secret on the Pages project. */
  RESEND_API_KEY?: string;
  /** Resend segment ID for the Regulatory Update Register. */
  RESEND_SEGMENT_ID?: string;
}

export type Status = 'subscribed' | 'unsubscribed' | 'sent' | 'invalid' | 'unavailable' | 'error';

const RESEND_API = 'https://api.resend.com';

/** Conservative address check. Resend validates again on its side. */
export function normalizeEmail(value: FormDataEntryValue | null): string | null {
  if (typeof value !== 'string') return null;
  const email = value.trim().toLowerCase();
  if (email.length < 6 || email.length > 254) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return null;
  return email;
}

/** True when a browser posted the form with JavaScript (fetch) rather than a plain navigation. */
export function wantsJson(request: Request): boolean {
  const accept = request.headers.get('accept') || '';
  return accept.includes('application/json');
}

/** Reject cross-site posts. Same-origin browser posts carry an Origin header matching the site. */
export function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return true; // Non-browser or older browser; the honeypot still applies.
  return origin === new URL(request.url).origin;
}

export function respond(request: Request, status: Status, redirectTo: string, httpStatus = 200): Response {
  if (wantsJson(request)) {
    return new Response(JSON.stringify({ status }), {
      status: httpStatus,
      headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' }
    });
  }
  const url = new URL(redirectTo, request.url);
  url.searchParams.set('status', status);
  return Response.redirect(url.toString(), 303);
}

export async function resendRequest(env: Env, method: 'POST' | 'PATCH', path: string, body: unknown): Promise<Response> {
  return fetch(`${RESEND_API}${path}`, {
    method,
    headers: {
      authorization: `Bearer ${env.RESEND_API_KEY}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify(body)
  });
}
