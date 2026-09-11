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
    verbatim_paywall_note: z.string().optional(),
    /** 3–5 sibling authorities linked by genuine regulatory relationship. */
    related_authorities: z.array(relatedAuthority).default([])
  })
});

/**
 * Deficiency-response pages: one per survey tag or Element of Performance.
 * Lives at /deficiencies/<slug>/.
 */
const deficiencies = defineCollection({
  type: 'content',
  schema: z.object({
    /** The identifier as a facility would search it, e.g. "A-0701" or "PE.02.01.01 EP 4". */
    identifier: z.string(),
    /** Official title of the tag or standard, quoted from the primary source where available. */
    title: z.string(),
    seo_title: z.string().optional(),
    meta_description: z.string().optional(),
    summary: z.string().optional(),
    /** Issuing regime, used for grouping on the /deficiencies/ index. */
    regime: z.enum(['CMS', 'The Joint Commission', 'DNV', 'State']),
    /** The regulation or standard the tag enforces. */
    citation: z.string(),
    source_url: z.string().url(),
    source_tier: z.number().int().min(1).max(3),
    source_confidence: z.enum(['HIGH', 'MEDIUM']),
    paywalled: z.boolean(),
    /** True when any section still carries a [CONTENT PENDING …] marker. Shown on the page. */
    content_pending: z.boolean().default(false),
    /**
     * Whether the identifier's existence and title were re-verified against the
     * primary source. 'blocked' renders a [VERIFICATION BLOCKED — EGRESS] line
     * in the source record; 'confirmed' requires verification_note to say by
     * whom and when. 'correction' marks a page whose subject is a tag that does
     * not exist (a correction of the public record).
     */
    verification_status: z.enum(['confirmed', 'blocked', 'correction']).default('blocked'),
    verification_note: z.string().optional(),
    /** Successor or predecessor identifiers, for renumbered standards. */
    superseded_by: z.string().optional(),
    supersedes: z.string().optional(),
    last_verified: z.date().optional(),
    date_published: z.date().optional(),
    /** Slugs of governing authority pages. Validated at build time. */
    governing_authorities: z.array(relatedAuthority).default([]),
    /** Slugs of related deficiency pages. Validated at build time. */
    related_deficiencies: z.array(z.string()).default([])
  })
});

/**
 * Topic pages: a question facilities ask that cuts across several
 * authorities (e.g. pesticide storage requirements). Lives at /topics/<slug>/.
 */
const topics = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    seo_title: z.string().optional(),
    meta_description: z.string().optional(),
    summary: z.string().optional(),
    /** The primary citation the topic rests on. */
    citation: z.string(),
    source_url: z.string().url(),
    source_confidence: z.enum(['HIGH', 'MEDIUM']),
    content_pending: z.boolean().default(false),
    last_verified: z.date().optional(),
    date_published: z.date().optional(),
    governing_authorities: z.array(relatedAuthority).default([])
  })
});

export const collections = {
  authorities,
  deficiencies,
  topics
};
