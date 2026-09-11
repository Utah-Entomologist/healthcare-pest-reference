# Build Summary — Run 2: Capture Layer

September 10, 2026. Branch `feat/phase-1-capture`, branched from PR #1's
head (`claude/phase-1-capture-and-integrity-ek2s8l`, commit b8c806b) because
PR #1 was still open at the start of the run. Nothing from PR #1 was
duplicated or reverted. Not merged, not deployed, no DNS change.

## Inputs the run did not have

- `GSC_Report_2026-09-09.md` and `HANDOFF_TO_CLAUDE_CODE.md` are not in the
  repository, Google Drive, or Gmail. The measured numbers in the brief were
  taken as given; the identity of the survey-citation queries was not
  available (OPEN_QUESTIONS R2-1).
- Every primary-source site (eCFR, cms.gov, jointcommission.org, osha.gov,
  epa.gov, federalregister.gov, govinfo.gov, adminrules.utah.gov) was blocked
  by the egress proxy. New pages quote verbatim text only where it already
  existed on the reference; everything else is marked in the body
  (OPEN_QUESTIONS R2-2).

## Verification performed

| Check | Result |
| --- | --- |
| `npm run check` (astro check) | 0 errors, 0 warnings, 0 hints |
| `npm run build` | 40 pages, clean (was 27) |
| JSON-LD validator (post-build) | 183 blocks, all valid against the schema.org vocabulary |
| Internal link check (post-build) | 901 targets, 0 broken; sitemap covers every indexable page |
| Related-link integrity | Every `related_authorities`, `governing_authorities`, `related_deficiencies`, and hub-situation slug is resolved against the collection at build time; an unknown slug throws |
| Playwright render of hub, deficiencies index, a deficiency page, the SOM page, and the storage topic | No page errors |

## Task 1 — Internal linking

Before: 6 internal links between authority pages as Google saw them. After:
115 authority-to-authority links from the Related Authorities lists alone,
plus the hub's situation guide, the SOM hub list, and the deficiency pages'
governing-authority lists.

- 1.1 `related_authorities: [{ slug, why }]` added to the schema and
  populated on all 20 pages (95 entries, 3–5 per page, 9 on the SOM hub).
  The 14 pages that had an inline "Related Authorities" Markdown section had
  it migrated into frontmatter and removed from the body, so nothing is
  listed twice. `src/components/RelatedAuthorities.astro` renders the list
  with the relationship sentence and fails the build on an unknown slug.
  Clusters follow the brief's suggestions, refined against page content
  (e.g. USDA 7 CFR 110 is linked to the Food Code through restricted-use
  pesticide records in food service, not by proximity).
- 1.2 The SOM page's list is nine entries in reading order for a
  survey-response reader, each with a sentence on why it is next, under the
  heading "What to Read Next, in Order." A new body section, "If You Are
  Responding to a Survey Finding," maps each A-tag to its deficiency page.
- 1.3 `/authorities/` rebuilt: a "Which Regime Governs Me" guide (12
  situations, each mapped to its authorities with a note), a cross-link to
  the deficiencies section and the storage topic, then the class-grouped
  index with a one-line orientation per class and a `summary` line per
  authority. Title and description rewritten for the "which regime" query.

## Task 2 — Host canonicalization

`public/_redirects`: `https://www.healthcarepestreference.org/*` →
`https://healthcarepestreference.org/:splat` 301. The rule matches only the
www host, so the apex is unaffected and no loop is possible. It relies on
the www custom domain staying attached to the Pages project
(OPEN_QUESTIONS R2-5). Could not be tested live: both hosts are
egress-blocked from the build environment.

## Task 3 — Deficiency-response section

New `deficiencies` collection, `DeficiencyLayout.astro`, `/deficiencies/`
index, and ten pages:

| Page | Regime | Verbatim populated | Pending |
| --- | --- | --- | --- |
| A-0700 Physical Environment | CMS | §482.41 condition text | POC verbatim (SOM Ch. 7) |
| A-0701 Buildings | CMS | §482.41(a) | POC verbatim |
| A-0722 Facilities | CMS | §482.41(d) | POC verbatim |
| A-0747 IPC Condition | CMS | Appendix A sanitary-environment sentence | §482.42 text, POC |
| A-0749 IPC Program | CMS | Removed-bullet finding | Tag title, §482.42(a) text, POC |
| A-0750 Sanitary Environment | CMS | Appendix A sanitary-environment sentence | Tag title, §482.42 text, POC |
| PE.01.01.01 | TJC | Disposition report quote | EP text (paywalled), ESC verbatim |
| PE.02.01.01 EP 4 | TJC | OSHA 1910.1200 (e)(1), (g)(8) | EP text (paywalled), ESC verbatim |
| EC.02.06.01 (legacy) | TJC | Disposition report quote | Title and EP text (paywalled) |
| EC.02.02.01 EP 5 (legacy) | TJC | — | Title and EP text (paywalled) |

Each page has the eight required elements: identifier and title, verbatim
text with citation, what the surveyor looks for, documentation, common
failures, plan-of-correction (or ESC) structure as elements rather than a
template, governing-authority links, and the citation block. The Register
form at the end is the only affordance. Added to the sitemap, main
navigation, homepage, and the `/authorities/` hub. Nothing proprietary was
paraphrased; paywalled EP text is marked.

## Task 4 — Titles and descriptions

`seo_title` and `meta_description` fields added to the schema; the H1 and
Article headline stay on `title`.

- 4.1 SOM page title: "CMS Appendix A (State Operations Manual, Hospitals):
  Pest Control Guidance and A-Tags A-0701, A-0749, A-0750" with a matching
  description. The specific tag from the query log was not available; the
  tags used are the ones the page discusses.
- 4.2 New page `/topics/pesticide-storage-requirements-healthcare-facilities/`
  (new `topics` collection and layout): the five things that govern the
  shelf (HazCom, the EPA label under FIFRA, 1910.151(c) eyewash, state
  rules, the accreditor standard), verbatim HazCom text carried from the
  OSHA page, surveyor checklist, documentation list, special areas, and the
  IPM point that a smaller inventory is the durable correction. Linked from
  the OSHA page, the PE.02.01.01 page, and the hub. FIFRA and 1910.151(c)
  quotations are cited but marked for re-verification; 40 CFR §156.10 is
  cited but not quoted.
- 4.3 BCE page title: "What Is a Board Certified Entomologist (BCE)?
  Requirements, Verification, and the BCE Who Maintains This Reference,"
  with a description that names the credential number.
- 4.4 USP <800>: recommendation in the PR description (accept as
  off-audience). No change beyond related links.

## Task 5 — Crawl and hygiene

- 5.1 `/authorities/apic-text-environmental-services/` and
  `/authorities/hai-cost-exposure-framing/` build with real content and a
  correct self-canonical. APIC now receives Related links from HICPAC, EPA,
  AORN, HAI, A-0747, A-0749, A-0750, and the hub situation guide; HAI from
  CoP, SOM, APIC, A-0747, and the hub.
- 5.2 Sitemap `lastmod` per URL from the last git commit touching the page's
  source, falling back to frontmatter dates (`src/lib/dates.ts`). Never build
  time. Caveat on shallow clones in OPEN_QUESTIONS R2-6.
- 5.3 Build and link checker clean with all new pages.

## Task 6 — Resend

Still blocked: the only verified Resend domain is `mail.myfalconpest.com`.
No wiring changed, Falcon domain not used.

## Files

New: `src/components/RelatedAuthorities.astro`, `src/layouts/DeficiencyLayout.astro`,
`src/layouts/TopicLayout.astro`, `src/pages/deficiencies/index.astro`,
`src/pages/deficiencies/[slug].astro`, `src/pages/topics/index.astro`,
`src/pages/topics/[slug].astro`, `src/lib/dates.ts`, `public/_redirects`,
10 files in `src/content/deficiencies/`, 1 file in `src/content/topics/`,
`BUILD_SUMMARY_RUN2.md`.

Modified: `src/content/config.ts`, all 20 `src/content/authorities/*.md`
(frontmatter: `summary`, `related_authorities`, SEO fields on three; inline
Related sections removed; body sections added on the SOM and OSHA pages),
`src/layouts/AuthorityLayout.astro`, `src/layouts/BaseLayout.astro` (nav),
`src/pages/authorities/index.astro`, `src/pages/index.astro`,
`src/pages/sitemap.xml.ts`, `package.json`, `package-lock.json`
(`@types/node`), `README.md`, `OPEN_QUESTIONS.md`.
