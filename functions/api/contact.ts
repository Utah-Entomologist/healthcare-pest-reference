/**
 * POST /api/contact — forward a consulting or reference inquiry to the operator.
 *
 * Sends one email through Resend from CONTACT_FROM (a verified sender on the
 * reference or practice domain; never the Falcon domain) to CONTACT_FORWARD_TO,
 * with the inquirer's address as reply-to. The inquirer's address is not stored
 * anywhere and is not added to any list. Until both variables are set the
 * endpoint reports "unavailable".
 */
import { isSameOrigin, normalizeEmail, respond, resendRequest, type Env } from '../../src/server/register';

interface ContactEnv extends Env {
  /** Verified sender, e.g. "Healthcare Pest Reference <inquiries@healthcarepestreference.org>". */
  CONTACT_FROM?: string;
  /** Operator inbox that receives inquiries. */
  CONTACT_FORWARD_TO?: string;
}

interface Context {
  request: Request;
  env: ContactEnv;
}

const RETURN_PATH = '/consulting/';

export async function onRequestPost({ request, env }: Context): Promise<Response> {
  if (!env.RESEND_API_KEY || !env.CONTACT_FROM || !env.CONTACT_FORWARD_TO) {
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
    return respond(request, 'sent', RETURN_PATH);
  }

  const email = normalizeEmail(form.get('email'));
  const rawMessage = form.get('message');
  const message = typeof rawMessage === 'string' ? rawMessage.trim() : '';
  if (!email || message.length === 0 || message.length > 5000) {
    return respond(request, 'invalid', RETURN_PATH, 400);
  }

  try {
    const sent = await resendRequest(env, 'POST', '/emails', {
      from: env.CONTACT_FROM,
      to: [env.CONTACT_FORWARD_TO],
      reply_to: email,
      subject: 'Inquiry via healthcarepestreference.org/consulting/',
      text: `From: ${email}\n\n${message}\n`
    });
    return respond(request, sent.ok ? 'sent' : 'error', RETURN_PATH, sent.ok ? 200 : 502);
  } catch {
    return respond(request, 'error', RETURN_PATH, 502);
  }
}

/** Any method other than POST (handled above by onRequestPost). */
export async function onRequest(): Promise<Response> {
  return new Response('Method Not Allowed', { status: 405, headers: { allow: 'POST' } });
}
