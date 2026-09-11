/**
 * Post-build structured-data check.
 *
 * Parses every <script type="application/ld+json"> block in dist/ and verifies:
 *   - it is valid JSON
 *   - @context is https://schema.org
 *   - @type is a known schema.org type (from the schema-dts vocabulary)
 *   - every property name is a known schema.org property (from schema-dts)
 *   - the properties this site promises are present on each type
 *   - every URL-valued field is an absolute https URL
 *
 * Exits non-zero on any failure. Run after `astro build`.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const SCHEMA_DTS = 'node_modules/schema-dts/dist/schema.d.ts';

// Build the vocabulary from schema-dts: every declared type alias / interface is a type,
// every quoted property key is a property.
const dts = readFileSync(SCHEMA_DTS, 'utf8');
const types = new Set();
for (const m of dts.matchAll(/^(?:export )?(?:interface|type) ([A-Za-z0-9]+)(?:Base|Leaf)?\b/gm)) types.add(m[1]);
for (const m of dts.matchAll(/"@type": "([A-Za-z0-9]+)"/g)) types.add(m[1]);
const properties = new Set(['@context', '@type', '@id']);
for (const m of dts.matchAll(/^\s+"([a-zA-Z][A-Za-z0-9]*)"\??:/gm)) properties.add(m[1]);

const REQUIRED = {
  Organization: ['name', 'url'],
  WebSite: ['name', 'url', 'publisher'],
  Person: ['name', 'honorificSuffix', 'jobTitle', 'hasCredential', 'alumniOf', 'sameAs'],
  Article: ['headline', 'author', 'publisher', 'isPartOf', 'citation', 'mainEntityOfPage'],
  BreadcrumbList: ['itemListElement']
};

const failures = [];
let blocks = 0;

function* htmlFiles(dir) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) yield* htmlFiles(path);
    else if (path.endsWith('.html')) yield path;
  }
}

function walk(node, file, path = '$') {
  if (Array.isArray(node)) {
    node.forEach((item, i) => walk(item, file, `${path}[${i}]`));
    return;
  }
  if (node === null || typeof node !== 'object') return;
  const type = node['@type'];
  if (type !== undefined) {
    const list = Array.isArray(type) ? type : [type];
    for (const t of list) if (!types.has(t)) failures.push(`${file} ${path}: unknown @type "${t}"`);
  }
  for (const [key, value] of Object.entries(node)) {
    if (!properties.has(key)) failures.push(`${file} ${path}: unknown property "${key}"`);
    if (value === undefined || value === null || value === '') failures.push(`${file} ${path}.${key}: empty value`);
    if (/^(url|item|sameAs|mainEntityOfPage)$/.test(key)) {
      const urls = Array.isArray(value) ? value : [value];
      for (const u of urls) {
        if (typeof u === 'string' && !/^https:\/\/[^\s]+$/.test(u)) failures.push(`${file} ${path}.${key}: not an absolute https URL: ${u}`);
      }
    }
    if (/^date(Published|Modified)$/.test(key) && !/^\d{4}-\d{2}-\d{2}$/.test(String(value))) {
      failures.push(`${file} ${path}.${key}: not an ISO date: ${value}`);
    }
    walk(value, file, `${path}.${key}`);
  }
}

for (const file of htmlFiles(DIST)) {
  const html = readFileSync(file, 'utf8');
  const seen = new Set();
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    blocks++;
    let data;
    try {
      data = JSON.parse(m[1]);
    } catch (e) {
      failures.push(`${file}: invalid JSON (${e.message})`);
      continue;
    }
    if (data['@context'] !== 'https://schema.org') failures.push(`${file}: @context is ${data['@context']}`);
    const type = data['@type'];
    if (seen.has(type) && type !== 'BreadcrumbList') failures.push(`${file}: duplicate top-level ${type} block`);
    seen.add(type);
    for (const prop of REQUIRED[type] || []) {
      if (!(prop in data)) failures.push(`${file}: ${type} missing required "${prop}"`);
    }
    if (data.datePublished && data.dateModified && data.dateModified < data.datePublished) {
      failures.push(`${file}: dateModified ${data.dateModified} precedes datePublished ${data.datePublished}`);
    }
    walk(data, file);
  }
  if (!seen.has('Organization')) failures.push(`${file}: no Organization block`);
  if (!seen.has('WebSite')) failures.push(`${file}: no WebSite block`);
  if (file.includes('/authorities/') && !file.endsWith('authorities/index.html')) {
    if (!seen.has('Article')) failures.push(`${file}: authority page without Article block`);
    if (!seen.has('BreadcrumbList')) failures.push(`${file}: authority page without BreadcrumbList`);
    if (!seen.has('Person')) failures.push(`${file}: authority page without Person block`);
  }
}

console.log(`Checked ${blocks} JSON-LD blocks across dist/ against ${types.size} schema.org types and ${properties.size} properties.`);
if (failures.length) {
  console.error(`\n${failures.length} structured data failure(s):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log('Structured data OK.');
