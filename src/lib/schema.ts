/**
 * schema.org JSON-LD builders.
 *
 * Every builder is typed against `schema-dts`, the TypeScript vocabulary
 * generated from schema.org. A property that does not exist on the given
 * type, or a value of the wrong shape, fails `astro check` at build time.
 * That is the first layer of validation; scripts/validate-jsonld.mjs is the
 * second (it parses every emitted block from dist/ and checks it again).
 */
import type {
  Article,
  BreadcrumbList,
  CreativeWork,
  EducationalOccupationalCredential,
  ListItem,
  Organization,
  Person,
  WebSite,
  WithContext
} from 'schema-dts';
import {
  AUTHOR,
  ESACC,
  ORGANIZATION_ID,
  PERSON_ID,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  WEBSITE_ID
} from './site';

const CONTEXT = 'https://schema.org' as const;

/** Reference to an entity defined elsewhere on the page or site, by @id only. */
type Ref<T extends string> = { '@type': T; '@id': string };

export const organizationRef = (): Ref<'Organization'> => ({ '@type': 'Organization', '@id': ORGANIZATION_ID });
export const personRef = (): Ref<'Person'> => ({ '@type': 'Person', '@id': PERSON_ID });
export const websiteRef = (): Ref<'WebSite'> => ({ '@type': 'WebSite', '@id': WEBSITE_ID });

/** Organization schema for Healthcare Pest Reference. Emitted sitewide. */
export function organizationSchema(): WithContext<Organization> {
  return {
    '@context': CONTEXT,
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    founder: personRef()
  };
}

/**
 * WebSite schema. Emitted sitewide.
 *
 * No `potentialAction` / SearchAction is declared because the site has no
 * search endpoint. Declaring one that does not resolve would be broken
 * structured data. Add it here when site search exists.
 */
export function websiteSchema(): WithContext<WebSite> {
  return {
    '@context': CONTEXT,
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: 'en-US',
    publisher: organizationRef(),
    author: personRef()
  };
}

/**
 * Person schema for the author.
 *
 * The credential is modelled as `hasCredential` on the Person, recognized by
 * ESACC. It is deliberately not attached to any Organization: the BCE is
 * held by Trenton S. Frazer personally, not by any firm.
 */
export function personSchema(): WithContext<Person> {
  const credential: EducationalOccupationalCredential = {
    '@type': 'EducationalOccupationalCredential',
    name: 'Board Certified Entomologist (BCE)',
    credentialCategory: 'certification',
    identifier: {
      '@type': 'PropertyValue',
      name: 'BCE certification number',
      value: AUTHOR.bceNumber
    },
    about: {
      '@type': 'Thing',
      name: `${AUTHOR.bceSpecialty} specialty`
    },
    recognizedBy: {
      '@type': 'Organization',
      name: ESACC.name,
      alternateName: ESACC.alternateName,
      url: ESACC.url
    },
    url: AUTHOR.rosterUrl
  };

  return {
    '@context': CONTEXT,
    '@type': 'Person',
    '@id': PERSON_ID,
    name: AUTHOR.name,
    givenName: AUTHOR.givenName,
    familyName: AUTHOR.familyName,
    honorificSuffix: AUTHOR.honorificSuffix,
    jobTitle: AUTHOR.jobTitle,
    url: `${SITE_URL}/about/`,
    hasCredential: credential,
    alumniOf: [
      { '@type': 'CollegeOrUniversity', name: 'University of Florida', url: 'https://www.ufl.edu/' },
      { '@type': 'CollegeOrUniversity', name: 'Brigham Young University', url: 'https://www.byu.edu/' }
    ],
    sameAs: [AUTHOR.rosterUrl]
  };
}

export interface ArticleInput {
  url: string;
  headline: string;
  description: string;
  /** ISO date string, from frontmatter. Omitted from the output when absent. */
  datePublished?: string;
  /** ISO date string, from frontmatter. Omitted from the output when absent. */
  dateModified?: string;
  /** Formal citation of the underlying regulation or standard. */
  citation: string;
  /** Primary-source URL for the regulation or standard. */
  citationUrl: string;
}

/** Article schema for an authority page. The author is the Person above, by reference. */
export function articleSchema(input: ArticleInput): WithContext<Article> {
  const cited: CreativeWork = {
    '@type': 'CreativeWork',
    name: input.citation,
    url: input.citationUrl
  };

  const article: WithContext<Article> = {
    '@context': CONTEXT,
    '@type': 'Article',
    '@id': `${input.url}#article`,
    mainEntityOfPage: input.url,
    url: input.url,
    headline: input.headline,
    description: input.description,
    inLanguage: 'en-US',
    author: personRef(),
    publisher: organizationRef(),
    isPartOf: websiteRef(),
    citation: cited
  };

  if (input.datePublished) article.datePublished = input.datePublished;

  // dateModified is the later of the verification date and the publication
  // date. A page cannot have been modified before it was published, and the
  // publication itself is the last recorded change when the verification
  // predates it. No other date is invented.
  const modified = [input.dateModified, input.datePublished].filter((d): d is string => Boolean(d)).sort().pop();
  if (modified) article.dateModified = modified;

  return article;
}

export interface Crumb {
  name: string;
  /** Absolute URL. */
  url: string;
}

/** BreadcrumbList for the page hierarchy, e.g. Home → Authorities → page. */
export function breadcrumbSchema(crumbs: Crumb[]): WithContext<BreadcrumbList> {
  const items: ListItem[] = crumbs.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.name,
    item: crumb.url
  }));

  return {
    '@context': CONTEXT,
    '@type': 'BreadcrumbList',
    itemListElement: items
  };
}
