/**
 * POST /api/subscribe — add an address to the Regulatory Update Register.
 *
 * Accepts form-encoded or multipart bodies with a single `email` field and a
 * `website` honeypot that must be empty. Creates the contact in Resend and
 * places it in the register segment. An address that already exists is
 * treated as subscribed.
 */
import { isSameOrigin, normalizeEmail, respond, resendRequest, type Env } from '../../src/server/register';

interface Context {
  request: Request;
  env: Env;
}

const RETURN_PATH = '/register/';

export async function onRequestPost({ request, env }: Context): Promise<Response> {
  if (!env.RESEND_API_KEY || !env.RESEND_SEGMENT_ID) {
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

  // Honeypot filled → silently report success so the bot learns nothing.
  const honeypot = form.get('website');
  if (typeof honeypot === 'string' && honeypot.trim() !== '') {
    return respond(request, 'subscribed', RETURN_PATH);
  }

  const email = normalizeEmail(form.get('email'));
  if (!email) {
    return respond(request, 'invalid', RETURN_PATH, 400);
  }

  try {
    const created = await resendRequest(env, 'POST', '/contacts', {
      email,
      unsubscribed: false,
      segments: [{ id: env.RESEND_SEGMENT_ID }]
    });

    if (created.ok) {
      return respond(request, 'subscribed', RETURN_PATH);
    }

    // Existing contact: make sure it is in the segment and not marked unsubscribed.
    if (created.status === 409 || created.status === 422 || created.status === 400) {
      const detail = await created.text();
      if (/already exists|duplicate|conflict/i.test(detail)) {
        const encoded = encodeURIComponent(email);
        await resendRequest(env, 'POST', `/contacts/${encoded}/segments/${env.RESEND_SEGMENT_ID}`, {});
        await resendRequest(env, 'PATCH', `/contacts/${encoded}`, { unsubscribed: false });
        return respond(request, 'subscribed', RETURN_PATH);
      }
      if (/email/i.test(detail)) {
        return respond(request, 'invalid', RETURN_PATH, 400);
      }
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
