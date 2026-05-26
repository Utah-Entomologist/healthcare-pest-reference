import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const authorities = await getCollection('authorities');
  const site = 'https://healthcarepestreference.org';

  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'monthly' },
    { url: '/authorities/', priority: '0.9', changefreq: 'monthly' },
    { url: '/about/', priority: '0.7', changefreq: 'yearly' },
    { url: '/methodology/', priority: '0.7', changefreq: 'yearly' }
  ];

  const authorityPages = authorities.map(authority => ({
    url: `/authorities/${authority.slug}/`,
    priority: '0.8',
    changefreq: 'monthly',
    lastmod: authority.data.last_verified.toISOString().split('T')[0]
  }));

  const allPages = [...staticPages, ...authorityPages];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${site}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>${'lastmod' in page && page.lastmod ? `
    <lastmod>${page.lastmod}</lastmod>` : ''}
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
};
