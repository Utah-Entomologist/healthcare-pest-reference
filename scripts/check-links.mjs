/**
 * Post-build internal link check.
 *
 * Every href/src/action starting with "/" in dist/ must resolve to a file in
 * dist/ or to one of the Pages Function routes in functions/. Fragment links
 * (#id) must resolve to an element id on the target page.
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const FUNCTION_ROUTES = new Set();

function* files(dir, ext) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) yield* files(path, ext);
    else if (path.endsWith(ext)) yield path;
  }
}

for (const f of files('functions', '.ts')) {
  const route = '/' + f.replace(/^functions\//, '').replace(/\.ts$/, '');
  FUNCTION_ROUTES.add(route);
}

function resolves(target) {
  const [pathPart] = target.split('?');
  const [path, fragment] = pathPart.split('#');
  if (FUNCTION_ROUTES.has(path)) return true;
  const candidates = [join(DIST, path), join(DIST, path, 'index.html'), join(DIST, path.replace(/\/$/, '') + '.html')];
  const hit = candidates.find((c) => existsSync(c) && statSync(c).isFile());
  if (!hit) return false;
  if (fragment) {
    const html = readFileSync(hit, 'utf8');
    if (!new RegExp(`id="${fragment}"`).test(html)) return false;
  }
  return true;
}

const failures = [];
let checked = 0;
for (const file of files(DIST, '.html')) {
  const html = readFileSync(file, 'utf8');
  for (const m of html.matchAll(/(?:href|src|action)="(\/[^"]*)"/g)) {
    checked++;
    if (!resolves(m[1])) failures.push(`${file}: ${m[1]}`);
  }
}

// The sitemap must list every built page except those marked noindex, with a
// well-formed lastmod on every URL and a loc that equals the page's canonical.
const sitemap = readFileSync(join(DIST, 'sitemap.xml'), 'utf8');
for (const m of sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
  const loc = m[1].match(/<loc>(.*?)<\/loc>/)?.[1];
  const lastmod = m[1].match(/<lastmod>(.*?)<\/lastmod>/)?.[1];
  if (!loc) { failures.push('sitemap.xml: <url> without <loc>'); continue; }
  if (!lastmod) failures.push(`sitemap.xml: ${loc} has no <lastmod>`);
  else if (!/^\d{4}-\d{2}-\d{2}$/.test(lastmod) || Number.isNaN(Date.parse(lastmod))) failures.push(`sitemap.xml: ${loc} has malformed <lastmod> ${lastmod}`);
  const route = loc.replace('https://healthcarepestreference.org', '');
  if (route.endsWith('/')) {
    const file = join(DIST, route, 'index.html');
    if (existsSync(file)) {
      const canonical = readFileSync(file, 'utf8').match(/<link rel="canonical" href="([^"]+)"/)?.[1];
      if (canonical !== loc) failures.push(`sitemap.xml: ${loc} differs from page canonical ${canonical}`);
    }
  }
}
for (const file of files(DIST, 'index.html')) {
  const html = readFileSync(file, 'utf8');
  const route = '/' + file.replace(/^dist\//, '').replace(/index\.html$/, '');
  const inSitemap = sitemap.includes(`<loc>https://healthcarepestreference.org${route}</loc>`);
  const noindex = /name="robots" content="noindex/.test(html);
  if (!inSitemap && !noindex) failures.push(`sitemap.xml: missing ${route}`);
  if (inSitemap && noindex) failures.push(`sitemap.xml: lists noindex page ${route}`);
}

console.log(`Checked ${checked} internal links.`);
if (failures.length) {
  console.error(`\n${failures.length} broken internal link(s) / sitemap gap(s):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log('Internal links and sitemap OK.');
