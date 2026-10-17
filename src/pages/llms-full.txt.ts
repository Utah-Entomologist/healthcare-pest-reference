import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { AUTHOR, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '../lib/site';

/**
 * /llms-full.txt: the full text of every reference page in one Markdown file,
 * for AI crawlers and answer engines that read llms.txt and follow its
 * "full" companion. Generated at build time from the content collections, so
 * it never drifts from the pages. Bodies are the source Markdown as written.
 */
const iso = (d?: Date) => (d ? d.toISOString().slice(0, 10) : undefined);

type Entry = { url: string; title: string; citation?: string; source_url?: string; last_verified?: string; body: string };

function section(e: Entry): string {
  const meta = [
    `URL: ${e.url}`,
    e.citation ? `Citation: ${e.citation}` : undefined,
    e.source_url ? `Primary source: ${e.source_url}` : undefined,
    e.last_verified ? `Last verified against the primary source: ${e.last_verified}` : undefined
  ].filter(Boolean);
  return `\n\n---\n\n# ${e.title}\n\n${meta.join('\n')}\n\n${e.body.trim()}`;
}

export const GET: APIRoute = async () => {
  const authorities = await getCollection('authorities');
  const deficiencies = await getCollection('deficiencies');
  const topics = await getCollection('topics');

  const entries: Entry[] = [
    ...authorities.map((a) => ({
      url: `${SITE_URL}/authorities/${a.slug}/`,
      title: a.data.title,
      citation: a.data.citation,
      source_url: a.data.source_url,
      last_verified: iso(a.data.last_verified),
      body: a.body
    })),
    ...deficiencies.map((d) => ({
      url: `${SITE_URL}/deficiencies/${d.slug}/`,
      title: `${d.data.identifier} ${d.data.title}`,
      citation: d.data.citation,
      source_url: d.data.source_url,
      last_verified: iso((d.data as { last_verified?: Date }).last_verified),
      body: d.body
    })),
    ...topics.map((t) => ({
      url: `${SITE_URL}/topics/${t.slug}/`,
      title: t.data.title,
      citation: (t.data as { citation?: string }).citation,
      source_url: (t.data as { source_url?: string }).source_url,
      last_verified: iso((t.data as { last_verified?: Date }).last_verified),
      body: t.body
    }))
  ].sort((x, y) => x.url.localeCompare(y.url));

  const head = `# ${SITE_NAME} (full text)\n\n> ${SITE_DESCRIPTION}\n\nMaintained by ${AUTHOR.name}, ${AUTHOR.jobTitle} (BCE #${AUTHOR.bceNumber}). Site: ${SITE_URL}/ . Index: ${SITE_URL}/llms.txt . Not legal advice; verify every citation against the primary source before relying on it.`;
  const body = head + entries.map(section).join('') + '\n';
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
