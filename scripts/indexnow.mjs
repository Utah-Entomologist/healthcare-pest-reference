/**
 * Deploy-time IndexNow submission.
 *
 * Reads dist/sitemap.xml and submits the URLs whose <lastmod> falls within
 * the last CHANGED_WITHIN_DAYS days (default 2) — lastmod is git-derived, so
 * this is "URLs whose source changed in the deploy that just built". Pass
 * --all to submit every sitemap URL (first submission, or after a key change).
 *
 * Runs only when INDEXNOW_ENABLED=1 so preview builds do not submit.
 * Cloudflare Pages build command: `npm run build && npm run indexnow`.
 *
 * Depends on the key file being served as text/plain with the key as its
 * only content (public/<key>.txt + public/_headers) and on the site returning
 * a real 404 for unknown paths (src/pages/404.astro). While a soft-404 is in
 * place the key URL returns HTML and the API answers 403.
 */
import { readFileSync } from 'node:fs';

const HOST = 'healthcarepestreference.org';
const KEY = '1c20d8a83a6d4f848012a5d1bcf71b3c';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = 'https://api.indexnow.org/IndexNow';
const CHANGED_WITHIN_DAYS = Number(process.env.INDEXNOW_DAYS ?? 2);

if (process.env.INDEXNOW_ENABLED !== '1') {
  console.log('indexnow: INDEXNOW_ENABLED is not 1; skipping submission.');
  process.exit(0);
}

const sitemap = readFileSync('dist/sitemap.xml', 'utf8');
const entries = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => ({
  loc: m[1].match(/<loc>(.*?)<\/loc>/)?.[1],
  lastmod: m[1].match(/<lastmod>(.*?)<\/lastmod>/)?.[1]
})).filter((e) => e.loc);

const all = process.argv.includes('--all');
const cutoff = new Date(Date.now() - CHANGED_WITHIN_DAYS * 86400000).toISOString().slice(0, 10);
const urlList = entries
  .filter((e) => all || (e.lastmod && e.lastmod >= cutoff))
  .map((e) => e.loc)
  .filter((u) => new URL(u).host === HOST);

if (urlList.length === 0) {
  console.log(`indexnow: no URLs changed since ${cutoff}; nothing to submit.`);
  process.exit(0);
}

console.log(`indexnow: submitting ${urlList.length} URL(s)${all ? ' (all)' : ` changed since ${cutoff}`}.`);

let response;
try {
  response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList })
  });
} catch (error) {
  console.error(`indexnow: request failed: ${error.message}`);
  process.exit(1);
}

const body = await response.text().catch(() => '');
switch (response.status) {
  case 200:
  case 202:
    console.log(`indexnow: accepted (${response.status}).`);
    break;
  case 400:
    console.error(`indexnow: 400 bad request — invalid format. ${body}`);
    process.exit(1);
  case 403:
    console.error(`indexnow: 403 forbidden — key mismatch. Confirm ${KEY_LOCATION} returns exactly the key as text/plain and that the site returns a real 404 for unknown paths. ${body}`);
    process.exit(1);
  case 422:
    console.error(`indexnow: 422 unprocessable — URLs do not belong to ${HOST} or the key location is on another host. ${body}`);
    process.exit(1);
  case 429:
    console.error(`indexnow: 429 too many requests. ${body}`);
    process.exit(1);
  default:
    console.error(`indexnow: unexpected ${response.status}. ${body}`);
    process.exit(1);
}
