import { defineCollection, z } from 'astro:content';

const authorities = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    authority_type: z.enum([
      'federal regulator',
      'state regulator',
      'accrediting body',
      'recognized authority'
    ]),
    citation: z.string(),
    /**
     * Date the page's content was last verified against the primary source
     * by the operator. Optional on purpose: a page with no recorded
     * verification date renders "[VERIFICATION DATE NOT RECORDED]" rather
     * than a guessed or build-time date. Update it only when a real
     * verification has been performed.
     */
    last_verified: z.date().optional(),
    /**
     * Date the page was first published. Used for Article.datePublished in
     * structured data. Values on existing pages were taken from the git
     * history (the commit that first added each file). Optional: when absent
     * the datePublished property is omitted rather than invented.
     */
    date_published: z.date().optional(),
    source_url: z.string().url(),
    source_tier: z.number().int().min(1).max(3),
    source_confidence: z.enum(['HIGH', 'MEDIUM', 'KILLED']),
    paywalled: z.boolean(),
    facility_types_applicable: z.array(z.string()),
    services_applicable: z.array(z.string()),
    verbatim_available: z.boolean(),
    verbatim_paywall_note: z.string().optional()
  })
});

export const collections = {
  authorities
};
