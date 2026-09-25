import { defineCollection, z } from 'astro:content';

/**
 * A link to a sibling authority page with the reason it is related.
 * `slug` must match a file in src/content/authorities/; the build fails on
 * an unknown slug (see src/components/RelatedAuthorities.astro).
 */
const relatedAuthority = z.object({
  slug: z.string(),
  why: z.string()
});

const authorities = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    /**
     * Optional <title> override for search results. The H1 and the Article
     * headline stay on `title`; this only changes the browser/search title.
     */
    seo_title: z.string().optional(),
    /** Optional meta description override. Defaults to a generated one. */
    meta_description: z.string().optional(),
    /** One-line orientation shown on the /authorities/ hub and homepage. */
    summary: z.string().optional(),
    authority_type: z.enum([
      'federal regulator',
      'federal agency standard',
      'state regulator',
      'recognized authority'
    ]),
    citation: z.string(),
    /**
     * Date the page's quoted text was last verified against the primary
     * source. Optional on purpose: a page with no recorded verification date
     * renders "[VERIFICATION DATE NOT RECORDED]" rather than a guessed or
     * build-time date. Update it only when a real verification has been
     * performed.
     */
    last_verified: z.date().optional(),
    /** Date the page was first published on this reference. */
    date_published: z.date().optional(),
    source_url: z.string().url(),
    source_tier: z.number().int().min(1).max(3),
    source_confidence: z.enum(['HIGH', 'MEDIUM', 'KILLED']),
    paywalled: z.boolean(),
    facility_types_applicable: z.array(z.string()),
    services_applicable: z.array(z.string()),
    verbatim_available: z.boolean(),
    verbatim_paywall_note: z.string().optional(),
    /** Sibling authorities linked by genuine regulatory relationship. */
    related_authorities: z.array(relatedAuthority).default([])
  })
});

export const collections = {
  authorities
};
