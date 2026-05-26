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
    last_verified: z.date(),
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
