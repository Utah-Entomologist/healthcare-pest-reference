import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { lastModified, repoLastCommitDate } from '../lib/dates';

/**
 * lastmod policy: the last git commit touching the page's source file(s),
 * falling back to the latest frontmatter date. Never the build time.
 * /unsubscribe/ and /404/ are deliberately excluded: utility pages marked noindex.
 *
 * Every <loc> ends with a trailing slash, matching the canonical each page emits.
 */
export const GET: APIRoute = async () => {
  const site = 'https://healthcarepestreference.org';

  const authorities = await getCollection('authorities');
  const deficiencies = await getCollection('deficiencies');
  const topics = await getCollection('topics');

  // Static pages and the source files whose history determines their lastmod.
  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'monthly', sources: ['src/pages/index.astro'] },
    { url: '/authorities/', priority: '0.9', changefreq: 'monthly', sources: ['src/pages/authorities/index.astro', 'src/content/authorities'] },
    { url: '/deficiencies/', priority: '0.9', changefreq: 'monthly', sources: ['src/pages/deficiencies/index.astro', 'src/content/deficiencies'] },
    { url: '/deficiencies/which-tag-is-pest-control/', priority: '0.8', changefreq: 'monthly', sources: ['src/pages/deficiencies/which-tag-is-pest-control.astro'] },
    { url: '/topics/', priority: '0.6', changefreq: 'monthly', sources: ['src/pages/topics/index.astro', 'src/content/topics'] },
    { url: '/about/', priority: '0.7', changefreq: 'yearly', sources: ['src/pages/about.astro'] },
    { url: '/methodology/', priority: '0.7', changefreq: 'yearly', sources: ['src/pages/methodology.astro'] },
    { url: '/consulting/', priority: '0.5', changefreq: 'yearly', sources: ['src/pages/consulting.astro'] },
    { url: '/register/', priority: '0.5', changefreq: 'yearly', sources: ['src/pages/register.astro'] },
    { url: '/tools/', priority: '0.7', changefreq: 'monthly', sources: ['src/pages/tools/index.astro'] },
    { url: '/tools/compliance-map/', priority: '0.9', changefreq: 'monthly', sources: ['src/pages/tools/compliance-map.astro', 'src/data/complianceMap.ts'] }
  ].map((page) => ({ ...page, lastmod: lastModified(page.sources) ?? repoLastCommitDate() }));

  const authorityPages = authorities.map((entry) => ({
    url: `/authorities/${entry.slug}/`,
    priority: '0.8',
    changefreq: 'monthly',
    lastmod: lastModified([`src/content/authorities/${entry.id}`], entry.data.last_verified, entry.data.date_published)
  }));

  const deficiencyPages = deficiencies.map((entry) => ({
    url: `/deficiencies/${entry.slug}/`,
    priority: '0.8',
    changefreq: 'monthly',
    lastmod: lastModified([`src/content/deficiencies/${entry.id}`], entry.data.last_verified, entry.data.date_published)
  }));

  const topicPages = topics.map((entry) => ({
    url: `/topics/${entry.slug}/`,
    priority: '0.7',
    changefreq: 'monthly',
    lastmod: lastModified([`src/content/topics/${entry.id}`], entry.data.last_verified, entry.data.date_published)
  }));

  const allPages = [...staticPages, ...authorityPages, ...deficiencyPages, ...topicPages];

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
