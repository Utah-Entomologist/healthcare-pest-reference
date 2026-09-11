/**
 * Site-wide constants used by structured data, citation blocks, and layouts.
 *
 * Every value here is a fact that appears elsewhere on the site (about page,
 * footer, README). Change it here and it changes everywhere.
 */

export const SITE_URL = 'https://healthcarepestreference.org';
export const SITE_NAME = 'Healthcare Pest Reference';
export const SITE_DESCRIPTION =
  'A national authoritative reference work mapping U.S. federal, state, and accrediting body pest control compliance requirements for healthcare facilities. Every requirement is anchored to a primary source.';

/** Stable @id values so the same entity is referenced, not duplicated, across pages. */
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const PERSON_ID = `${SITE_URL}/about/#trenton-l-frazer`;

/**
 * The author of the reference.
 *
 * The BCE credential is held by Trenton L. Frazer personally. It is never
 * attributed to any firm. See src/lib/schema.ts personSchema().
 */
export const AUTHOR = {
  name: 'Trenton L. Frazer',
  givenName: 'Trenton',
  familyName: 'Frazer',
  honorificSuffix: 'BCE',
  jobTitle: 'Board Certified Entomologist',
  bceNumber: 'B3413',
  bceSpecialty: 'General Entomology',
  rosterUrl: 'https://entocert.org/roster',
  /** Citation-style name: family name first. */
  citationName: 'Frazer, Trenton L.'
} as const;

/** Certifying body for the BCE credential. */
export const ESACC = {
  name: 'Entomological Society of America Certification Corporation',
  alternateName: 'ESACC',
  url: 'https://entocert.org'
} as const;

/** Consulting practice through which the author is retained. Text only — no URL is published until the firm's site ships. */
export const CONSULTING_PRACTICE_NAME = 'Frazer Applied Entomology';
