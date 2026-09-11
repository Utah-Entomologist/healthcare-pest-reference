/**
 * POST /api/unsubscribe — mark an address unsubscribed in Resend.
 *
 * This is the on-site unsubscribe path. Every broadcast sent from Resend
 * also carries its own one-click unsubscribe link. Whether or not the
 * address exists, the response is the same, so the endpoint cannot be used
 * to test whether an address is on the list.
 */
import { isSameOrigin, normalizeEmail, respond, resendRequest, type Env } from '../../src/server/register';

interface Context {
  request: Request;
  env: Env;
}

const RETURN_PATH = '/unsubscribe/';

export async function onRequestPost({ request, env }: Context): Promise<Response> {
  if (!env.RESEND_API_KEY) {
    return respond(request, 'unavailable', RETURN_PATH, 503);
  }
  if (!isSameOrigin(request)) {
    return respond(request, 'error', RETURN_PATH, 403);
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return respond(request, 'invalid', RETURN_PATH, 400);
  }

  const honeypot = form.get('website');
  if (typeof honeypot === 'string' && honeypot.trim() !== '') {
    return respond(request, 'unsubscribed', RETURN_PATH);
  }

  const email = normalizeEmail(form.get('email'));
  if (!email) {
    return respond(request, 'invalid', RETURN_PATH, 400);
  }

  try {
    const updated = await resendRequest(env, 'PATCH', `/contacts/${encodeURIComponent(email)}`, { unsubscribed: true });
    // 404 (no such contact) is reported as unsubscribed on purpose; see file comment.
    if (updated.ok || updated.status === 404) {
      return respond(request, 'unsubscribed', RETURN_PATH);
    }
    return respond(request, 'error', RETURN_PATH, 502);
  } catch {
    return respond(request, 'error', RETURN_PATH, 502);
  }
}

/** Any method other than POST (handled above by onRequestPost). */
export async function onRequest(): Promise<Response> {
  return new Response('Method Not Allowed', { status: 405, headers: { allow: 'POST' } });
}
