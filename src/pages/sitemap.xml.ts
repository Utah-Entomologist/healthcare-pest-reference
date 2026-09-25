import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { lastModified, repoLastCommitDate } from '../lib/dates';
import { SITE_URL } from '../lib/site';

/**
 * lastmod policy: the last git commit touching the page's source file(s),
 * falling back to the latest frontmatter date. Never the build time.
 * /404/ is deliberately excluded: a utility page marked noindex.
 *
 * Every <loc> ends with a trailing slash, matching the canonical each page emits.
 */
export const GET: APIRoute = async () => {
  const site = SITE_URL;

  const authorities = await getCollection('authorities');

  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'monthly', sources: ['src/pages/index.astro'] },
    { url: '/authorities/', priority: '0.9', changefreq: 'monthly', sources: ['src/pages/authorities/index.astro', 'src/content/authorities'] },
    { url: '/about/', priority: '0.7', changefreq: 'yearly', sources: ['src/pages/about.astro'] },
    { url: '/methodology/', priority: '0.7', changefreq: 'monthly', sources: ['src/pages/methodology.astro'] },
    { url: '/consulting/', priority: '0.5', changefreq: 'yearly', sources: ['src/pages/consulting.astro'] }
  ].map((page) => ({ ...page, lastmod: lastModified(page.sources) ?? repoLastCommitDate() }));

  const authorityPages = authorities.map((entry) => ({
    url: `/authorities/${entry.slug}/`,
    priority: '0.8',
    changefreq: 'monthly',
    lastmod: lastModified([`src/content/authorities/${entry.id}`], entry.data.last_verified, entry.data.date_published)
  }));

  const allPages = [...staticPages, ...authorityPages];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${site}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>${page.lastmod ? `
    <lastmod>${page.lastmod}</lastmod>` : ''}
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
};
