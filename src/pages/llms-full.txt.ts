import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { AUTHOR, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '../lib/site';

/**
 * /llms-full.txt: the full text of every authority page in one Markdown file,
 * for AI crawlers and answer engines that read llms.txt and follow its
 * "full" companion. Generated at build time from the content collection, so
 * it never drifts from the pages. Bodies are the source Markdown as written.
 */
const iso = (d?: Date) => (d ? d.toISOString().slice(0, 10) : undefined);

export const GET: APIRoute = async () => {
  const authorities = await getCollection('authorities');
  const entries = authorities
    .map((a) => ({
      url: `${SITE_URL}/authorities/${a.slug}/`,
      title: a.data.title,
      citation: a.data.citation,
      source_url: a.data.source_url,
      last_verified: iso(a.data.last_verified),
      body: a.body
    }))
    .sort((x, y) => x.url.localeCompare(y.url));

  const section = (e: (typeof entries)[number]) => {
    const meta = [
      `URL: ${e.url}`,
      e.citation ? `Citation: ${e.citation}` : undefined,
      e.source_url ? `Primary source: ${e.source_url}` : undefined,
      e.last_verified ? `Last verified against the primary source: ${e.last_verified}` : undefined
    ].filter(Boolean);
    return `\n\n---\n\n# ${e.title}\n\n${meta.join('\n')}\n\n${e.body.trim()}`;
  };

  const head = `# ${SITE_NAME} (full text)\n\n> ${SITE_DESCRIPTION}\n\nMaintained by ${AUTHOR.name}, ${AUTHOR.jobTitle} (BCE #${AUTHOR.bceNumber}). Site: ${SITE_URL}/ . Index: ${SITE_URL}/llms.txt . The 30-state comparison and the free tools are at ${SITE_URL}/state-jail-standards/ and ${SITE_URL}/tools/ . Not legal advice; verify every citation against the primary source before relying on it.`;
  return new Response(head + entries.map(section).join('') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
};
