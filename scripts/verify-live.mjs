#!/usr/bin/env node
/**
 * Post-deploy live verification. `npm run verify:live`
 *
 * Runs every check Run 5 could not run itself, because all outbound HTTPS in
 * the build environment is refused by organization egress policy (the proxy
 * records `connect_rejected` / "gateway answered 403 to CONNECT" for the site
 * host, the www host, api.indexnow.org and www.epa.gov alike). Run this from
 * any machine with internet access after the production deploy finishes.
 *
 * Checks, in order:
 *   1. A nonsense path returns a real 404, not the homepage with a 200.
 *   2. The www host 301s to the apex, and the redirect target is the apex.
 *   3. Following the www redirect does not loop.
 *   4. The IndexNow key file returns 200 as text/plain with exactly the key.
 *   5. Every URL in the sitemap returns 200 and carries a self-canonical.
 *   6. The sitemap itself is reachable and well formed.
 *
 * Exit code 0 only if every check passes. Nothing is written or sent; this
 * script is read-only. To submit URLs to IndexNow afterwards, run
 * `INDEXNOW_ENABLED=1 npm run indexnow -- --all`.
 */

const APEX = 'https://healthcarepestreference.org';
const WWW = 'https://www.healthcarepestreference.org';
const KEY = '1c20d8a83a6d4f848012a5d1bcf71b3c';
const NONSENSE = '/definitely-not-a-page-xyz-' + Date.now() + '/';

let failures = 0;
const pass = (m) => console.log(`  PASS  ${m}`);
const fail = (m) => { failures++; console.log(`  FAIL  ${m}`); };

async function head(url, redirect = 'manual') {
  const res = await fetch(url, { redirect, headers: { 'User-Agent': 'hpr-verify-live' } });
  return res;
}

console.log('\n1. Soft-404 check');
try {
  const res = await head(APEX + NONSENSE);
  if (res.status === 404) pass(`${NONSENSE} -> 404`);
  else fail(`${NONSENSE} -> ${res.status} (expected 404; a 200 means the soft-404 is back)`);
  if (res.status === 200) {
    const body = await res.text();
    if (body.includes('A National Authoritative Reference') && !body.includes('Page Not Found')) {
      fail('the response body is the homepage — check the Pages project is not in single-page-application mode');
    }
  }
} catch (e) { fail(`request failed: ${e.message}`); }

console.log('\n2. www -> apex, 301');
try {
  const res = await head(WWW + '/');
  if (res.status === 301) pass('www / -> 301');
  else fail(`www / -> ${res.status} (expected 301)`);
  const loc = res.headers.get('location') || '';
  if (loc.startsWith(APEX)) pass(`Location: ${loc}`);
  else fail(`Location: ${loc || '(none)'} — expected an apex URL`);

  const deep = await head(WWW + '/authorities/epa-ipm-toolkit-2021/');
  const dloc = deep.headers.get('location') || '';
  if (deep.status === 301 && dloc === APEX + '/authorities/epa-ipm-toolkit-2021/') {
    pass('deep path preserves the path on redirect');
  } else {
    fail(`deep path -> ${deep.status} ${dloc} (expected 301 to the same path on the apex)`);
  }
} catch (e) { fail(`request failed: ${e.message}`); }

console.log('\n3. No redirect loop');
try {
  const res = await fetch(WWW + '/', { redirect: 'follow', headers: { 'User-Agent': 'hpr-verify-live' } });
  if (res.ok && new URL(res.url).hostname === 'healthcarepestreference.org') pass(`followed to ${res.url} (${res.status})`);
  else fail(`followed to ${res.url} (${res.status})`);
} catch (e) { fail(`following the redirect failed — a loop would surface here: ${e.message}`); }

console.log('\n4. IndexNow key file');
try {
  const res = await fetch(`${APEX}/${KEY}.txt`, { headers: { 'User-Agent': 'hpr-verify-live' } });
  const ct = res.headers.get('content-type') || '';
  const body = (await res.text()).trim();
  if (res.status === 200) pass('200'); else fail(`${res.status} (expected 200)`);
  if (ct.startsWith('text/plain')) pass(`Content-Type: ${ct}`);
  else fail(`Content-Type: ${ct} (expected text/plain; IndexNow rejects anything else)`);
  if (body === KEY) pass('body is exactly the key');
  else fail(`body is ${JSON.stringify(body.slice(0, 60))} (expected exactly the key)`);
} catch (e) { fail(`request failed: ${e.message}`); }

console.log('\n5 & 6. Sitemap and every URL in it');
try {
  const res = await fetch(`${APEX}/sitemap.xml`, { headers: { 'User-Agent': 'hpr-verify-live' } });
  if (!res.ok) throw new Error(`sitemap returned ${res.status}`);
  const xml = await res.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (urls.length === 0) throw new Error('sitemap contains no <loc> entries');
  pass(`sitemap 200 with ${urls.length} URLs`);

  let bad = 0;
  for (const url of urls) {
    try {
      const r = await fetch(url, { headers: { 'User-Agent': 'hpr-verify-live' } });
      if (r.status !== 200) { console.log(`  FAIL  ${url} -> ${r.status}`); bad++; failures++; continue; }
      const html = await r.text();
      const m = html.match(/<link rel="canonical" href="([^"]+)"/);
      if (!m) { console.log(`  FAIL  ${url} has no canonical`); bad++; failures++; }
      else if (m[1] !== url) { console.log(`  FAIL  ${url} canonical is ${m[1]}`); bad++; failures++; }
    } catch (e) { console.log(`  FAIL  ${url} -> ${e.message}`); bad++; failures++; }
  }
  if (bad === 0) pass(`all ${urls.length} sitemap URLs return 200 with a matching self-canonical`);
} catch (e) { fail(`sitemap check failed: ${e.message}`); }

console.log(`\n${failures === 0 ? 'ALL CHECKS PASSED' : failures + ' CHECK(S) FAILED'}\n`);
process.exit(failures === 0 ? 0 : 1);
