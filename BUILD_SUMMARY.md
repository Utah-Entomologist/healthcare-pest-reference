# Build Summary — Phase 1: Capture and Integrity

Overnight run, September 9–10, 2026. Branch
`claude/phase-1-capture-and-integrity-ek2s8l` (see OPEN_QUESTIONS.md item 11
on the branch name). Nothing was merged or deployed.

## Verification record — 2026-09-15: Batches 1–5 applied

Five Chrome verification runs swept all 62 pages on both properties (healthcarepestreference.org, 45 pages; frazerappliedentomology.com, 17 pages) against every source they cite. Each assertion received a verdict and the verbatim source text. The five reports are the specification for the correction branch `fix/verification-batches-1-5`; nothing was re-verified, reinterpreted, or improved. One commit per batch, in order.

| Batch | Sources | Rows | Verified | Corrected | Unsupported |
|---|---|---|---|---|---|
| 1 | VHA 1850.02 · CMS Appendix PP Rev. 232 · FDA Food Code 2022 (+ Dec 2024 Supplement) | 110 | 96 | 13 | 1 |
| 2 | CDC/HICPAC 2003 (upd. 2019) · Utah R432-100 · Utah R68-7 · EPA 907K21002 | 112 | 77 | 32 | 3 |
| 3 | CMS Appendix A Rev. 238 · Appendix W Rev. 200 · 42 CFR Parts 482/483/485 | 61 | 54 | 5 | 2 |
| 4 | TJC 2026 PE Essentials · DNV NIAHO (Rev 18 public) · ACHC 2025 07.07.01 | 35 | 24 | 7 | 4 |
| 5 | OSHA 1910.1200/.151 · USDA 7 CFR 110 rescission · NACMCF 1997 · licensed identifiers · credentials | 42 | 31 | 7 | 4 |
| **Total** | | **360** | **282** | **64** | **14** |

**Reports.** Google Drive folder `HPR-Primary-Sources` (ID `11d6Jg9zfbUkixIZfCkIxwrKqepoAcDND`): `Verification_Batch_1_2026-09-15.md` through `Verification_Batch_5_2026-09-15.md`.

**Rows applied in this repository, by commit:**

| Batch | Rows | Pages |
|---|---|---|
| 1 | V19, V23, V40, C6 (unsupported → restated as what the source shows), C17, C23, C26, F4, F6 (item 7: Supplement to the 2022 Food Code, with the FDA URL, in the citation block and the citation line the index pages render), F8, F11, F14, F15, F19 | vha-directive-1850-02, epa-ipm-toolkit-2021, f925, fda-food-code-2022, a-0722-facilities |
| 2 | C1, C4, C10, C14, C15, C16, C17 (also /methodology/), C19, C25; U4, U6, U13, U15 (unsupported → deleted), U17, U19 and the Correction Notice rewritten as superseded-not-wrong (item 2); P2 (frontmatter title, so the H1, suggested citation, and nine Related Authorities blurbs), P4 (unsupported → suite number dropped, address attributed to UDAF), P5, P6, P7, P12, P13, P14 (unsupported → fee schedule deleted), P24; E6, E8, E11, E12, E16, E19, E20, E21, E22, E25, E31, with the toolkit's stated position on pesticides restored verbatim and pinpointed (item 3) and the MEDIUM caveat retired | cdc-hicpac-environmental-guidelines, methodology, a-0749, utah-r432-100-hospital-licensure, utah-r68-7-pesticide-applicator, epa-ipm-toolkit-2021, a-0700-physical-environment |
| 3 | A16; A28 (CoP page and /methodology/); A31 and A32 (unsupported → deleted); C20; item 8 (the Appendix W cell filled from Rev. 200 — 0 occurrences, C-0914 and C-0924 verbatim; the Subpart H cell left "Not in verified source set" because SOM Appendix E was in no batch's source set) | a-0747, cms-conditions-of-participation, methodology, cdc-hicpac, apic-text-environmental-services, 485-725e-pest-control |
| 4 | T5; T8 (every place the site routed pesticide inventory/SDS/labeling to "EP 4"); T9, T10, T11 (L1), T14 (unsupported → restated as this reference's reading, no quotation); D8 with the DNV page rewritten in the report's wording (item 4) | joint-commission-2026-pe-chapter, pe-01-01-01, pe-02-01-01, ec-02-02-01, ec-02-06-01, pesticide-storage topic, osha, cms-state-operations-manual, authorities index, which-tag router, dnv-gl-niaho-standards |
| 5 | O4; O5 (three pages named, plus the same line on the TJC authority page); U5, U6; L5, L6, L8, L10 (unsupported → restated as this reference's reading, no quotation, no attribution to the publisher); L9 (item 6: 2026 FGI Codes for Planning and Design, released August 31, 2026; fgicodes.org); item 9 (AORN evidence table, references #127–#132); C1 (item 1: Trenton L. → Trenton S. in three templates, site.ts, and two body sentences — 119 rendered instances, now zero); C3 | osha-hazard-communication, pe-02-01-01, pesticide-storage topic, joint-commission-2026-pe-chapter, usda-7cfr110-rescission, aorn, apic, fgi, esacc-bce-credential, layouts, site.ts, about, consulting, index |

**The F925 corrections (first commit).** `PROMPT_ClaudeCode_F925_Corrections.md` was not found in Drive (searched by title and full text). Its source documents were: `F925_Verification_2026-09-15.md` (six outreach claims verified against Appendix PP Rev. 232 and SOM Chapter 7 Rev. 244) and `F925_Live_Site_Audit_2026-09-15.md`, which flags exactly ten live instances across both properties, each with the exact page text and a replacement. Those ten are the ten strings; none had been merged. The eight on this site — five on `/deficiencies/f925/` (the "two directions" sentence, the F812 section heading, the "four places" lead-in, the Food Code related-authority blurb, and the "infection control program" presupposition), the F925 summary rendered on `/deficiencies/`, the which-tag router's F925 card, and one sentence on `/authorities/485-725e-pest-control/` — are applied as the branch's first commit; the two on frazerappliedentomology.com are applied there. The audit's "do not touch" items (plan-of-correction attribution, severity guidance, the four near-misses) were left as they were.

**Build verification after the edits (2026-09-15):**

```
astro check: 0 errors, 0 warnings, 0 hints (38 files)
46 pages built
210 JSON-LD blocks checked against 2,314 schema.org types and 1,531 properties → OK
1,084 internal links + sitemap → OK
old string from every applied row, visible text and raw HTML of dist/: 0 renders each
"Trenton L.": 0 (was 119 rendered instances across 45 pages); "Trenton S." on 46 of 46 pages
Correction Notice pages (epa-ipm-toolkit-2021, utah-r432-100, cdc-hicpac, fda-food-code-2022): render their correction blocks; the R432-100 was/is table renders as a table
```

**Observed, not applied (no row specifies them):** the USDA page's Confidence Notes still say USDA's "duplicative" rationale was "verified verbatim from the Federal Register summary," which the page's own Correction block and Batch 5 row U1 establish is absent from the document; the methodology page carries the same "Part I (a separate document)" wording that C19 corrected on the CDC page; the CoP page's `facility_types_applicable` frontmatter still lists critical access hospital after C20; the two "Trenton" body sentences aside, `OPEN_QUESTIONS.md` R5-1 is untouched (only its EPA-archive item is closed by E22).

**Push access (2026-09-15).** The session that wrote the seven commits could clone the repository but not push to it, so it exported them as a git bundle and a patch series to the Drive folder. They were published unchanged on 2026-09-23 (see below).

### Re-verification and publication — 2026-09-23

The 2026-09-15 bundle (`HPR_fix-verification-batches-1-5.bundle`, Drive) was fetched unchanged onto `fix/verification-batches-1-5`. It sits directly on `main` (52a97d1), so nothing had to be merged or rebased. Before it was pushed, the branch was checked again, row by row, against the five reports, and the gates were re-run:

```
astro check: 0 errors, 0 warnings, 0 hints
46 pages built
210 JSON-LD blocks against 2,314 schema.org types / 1,531 properties → OK
1,084 internal links + sitemap → OK
old strings, 83 checks across every CORRECTED/UNSUPPORTED row (visible text and raw HTML of dist/): 80 render 0; the other 3 are explained below
replacement strings, 55 checks: all render where specified (U6's corrected PDF route renders as the link href)
"Trenton L.": 0 · "Trenton S. Frazer": 84 rendered · "Frazer, Trenton S.": 36 suggested citations
Correction Notice pages: utah-r432-100 (was/is table renders as a table), epa-ipm-toolkit-2021, cdc-hicpac, fda-food-code-2022 (inline correction blocks render)
```

The three remaining old-string hits were checked and left alone, because none is the corrected text. (1) "central sterile-supply areas" still appears unquoted in the CDC page's documentation list. C4 corrects the verbatim E.V.1 quotation only, and the same paraphrase is the report's near-miss C24. (2) "is the most recent published edition" appears on the AORN page, where it is about AORN, not the Food Code. (3) "Cotton 2000" appears on the HAI-cost page, which no row touches; L8 removed it from the APIC page only.

Two differences from the correction prompt, where the reports govern:

- **R432-100 renumbering.** The prompt says the June 5, 2026 amendment "renumbered the section to 38." Batch 2 row U17 says the amendment "renumbered nothing in this section but changed the wording; the section number had already moved from -39 to -38 in an intervening filing." The Correction Notice follows the report.
- **The two "Not in verified source set" cells on the 485.725(e) page.** Only one of them is Appendix W: the critical access hospital column, now filled with C-0914 and C-0924. The other belongs to Subpart H organizations. Their surveyor appendix is SOM Appendix E, which none of the five batches fetched (Batch 3 §7 item 7). Filling that cell with Appendix W text would attribute a CAH manual to Subpart H organizations, so it still reads "Not in verified source set."

`PERSON_ID` in `src/lib/site.ts` keeps its fragment `#trenton-l-frazer`. It is a stable JSON-LD `@id`, not rendered text, and changing it would orphan the identifier already published.

Nothing was sent, nothing was spent, nothing was merged or deployed.

---

## Verification performed

| Check | Result |
| --- | --- |
| `npm run check` (astro check, TypeScript across pages, components, schema builders, and Pages Functions) | 0 errors, 0 warnings, 0 hints |
| `npm run build` (astro build, 27 pages) | Clean |
| `scripts/validate-jsonld.mjs` (122 JSON-LD blocks re-parsed from `dist/`, every `@type` and property checked against the schema.org vocabulary in `schema-dts`, required properties per type, absolute URLs, ISO dates, `dateModified ≥ datePublished`) | Pass. A negative test (injected unknown property and misspelled type) was confirmed to fail the build. |
| `scripts/check-links.mjs` (468 internal `href`/`src`/`action` targets resolved against `dist/` and the function routes; sitemap coverage of every indexable page) | Pass |
| Pages Functions behavioral tests (esbuild-bundled as Cloudflare bundles them, Resend mocked): env missing → 503, honeypot, invalid email, cross-origin 403, happy path body and auth header, existing-contact path, no-JS 303 redirect, unsubscribe incl. 404, contact forward with reply-to | All pass |
| Playwright render of home, about, consulting, register, and an authority page on the built site | No console or page errors; access date and copy button work |

schema.org's own validator, Google's Rich Results test, and the Resend and
Cloudflare docs sites were unreachable from the build environment (egress
blocked). Validation was done against the `schema-dts` vocabulary (generated
from schema.org's published release) and the Resend SDK's own request shapes.
Recommend running the built pages through https://validator.schema.org once
before or after merge as a belt-and-braces check.

## Task 1 — Integrity corrections on `/about/`

- 1.1 Disclosure no longer describes a "sole owner-operator." It now states
  that Mr. Frazer founded Falcon Pest Control, that Falcon employs licensed
  technicians he directs, and that the standards he set were scaled through
  hiring rather than by doing the work alone. No headcount is stated.
- 1.2 MS in Entomology year corrected from 2015 to 2012. Repository-wide
  search for `2015` found one other hit, the Sheele 2017 study period
  ("August 2014 – August 2015") on the HAI cost page, which is a real study
  date and was left alone.
- 1.3 The 640,000-customer figure was kept. The conflict with "over one
  million accounts" in other Falcon materials is logged in OPEN_QUESTIONS.md.
- 1.4 `utahentomologist.com` removed everywhere. The consulting practice is
  now Frazer Applied Entomology, described as the national practice through
  which BCE consulting, compliance program review, Entomologist of Record
  engagement, and expert witness work are delivered. Falcon Pest Control is
  described as the Utah licensed pest management operator. Every mention
  states or implies that the BCE credential is held by Mr. Frazer personally.
- The Contact section now routes to the consulting page's single contact
  route instead of the old domain.

## Task 2 — Structured data

- `src/lib/site.ts`: sitewide constants (site URL/name, author facts, ESACC,
  practice name, stable `@id` values).
- `src/lib/schema.ts`: typed builders (`organizationSchema`, `websiteSchema`,
  `personSchema`, `articleSchema`, `breadcrumbSchema`), all typed against
  `schema-dts` so an invalid property fails `astro check`.
- `src/components/JsonLd.astro`: reusable component that renders one block
  (with `</script>`-safe escaping).
- Emitted: Organization and WebSite on every page; Person on the homepage,
  `/about/`, and every authority page; Article and BreadcrumbList on every
  authority page; BreadcrumbList on all other non-home pages. Person carries
  `honorificSuffix: "BCE"`, `jobTitle`, `hasCredential` (an
  `EducationalOccupationalCredential` recognized by ESACC, with the BCE
  number), `alumniOf` (University of Florida, Brigham Young University), and
  `sameAs` → `https://entocert.org/roster`. Article carries `headline`,
  `datePublished`, `dateModified`, `author` (Person by `@id`), `citation` (a
  `CreativeWork` naming the regulation and linking its primary source), and
  `isPartOf` (the WebSite by `@id`).
- No `SearchAction`: the site has no search. Logged.
- The previous inline Article block in `BaseLayout.astro` (the one JSON-LD
  the site did have) was replaced by the component.

## Task 3 — Citation affordance

- `src/components/CitationBlock.astro`, rendered at the bottom of every
  authority page: suggested citation (author, title, reference work,
  permalink, access date), permalink with copy button, last-verified date
  from frontmatter, and the litigation-grade verification notice.
- Access date is the reader's date, filled in by the browser; without
  JavaScript the placeholder `[access date]` remains.
- `last_verified` is now optional in the content schema. A page without one
  renders `[VERIFICATION DATE NOT RECORDED]` in the Source Record box and the
  citation block, omits `dateModified`'s verification input, and omits
  `lastmod` from the sitemap. The existing snake_case field name was kept
  rather than adding a duplicate `lastVerified` (OPEN_QUESTIONS.md item 9).
- `date_published` added to the schema and populated on all 20 pages from git
  history (OPEN_QUESTIONS.md item 10).

## Task 4 — Capture layer

4.1 Regulatory Update Register

- `src/components/UpdateRegisterForm.astro`: email-only form with honeypot,
  privacy statement, unsubscribe link. Footer variant on every page; page
  variant at the end of every authority page and on `/register/`.
- `/register/` (new): the register described, plus the form. `/unsubscribe/`
  (new, `noindex`): on-site unsubscribe path.
- `functions/api/subscribe.ts`, `functions/api/unsubscribe.ts` (Cloudflare
  Pages Functions) and `src/server/register.ts` (shared helpers): create /
  re-subscribe / unsubscribe contacts in Resend, same-origin check, JSON for
  JS submissions and 303 redirects for plain form posts.
- A dedicated Resend segment was created for the register. No sender domain
  was provisioned: the only verified domain is `mail.myfalconpest.com` and
  adding the reference domain needs DNS. Stopped and logged (OPEN_QUESTIONS.md
  item 1). The forms report "not available right now" until the Pages
  environment variables in `.dev.vars.example` are set.

4.2 `/consulting/`

- New page, healthcare-specific, no marketing register. Separation statement
  first. Names Frazer Applied Entomology (text only, no URL). Lists exactly the
  five services asked for. National scope and fee-based stated plainly; no fee
  figure. Exactly one sentence on environments beyond healthcare.
- Single contact route: a form posting to `functions/api/contact.ts`, which
  forwards one email to the operator with the inquirer as reply-to and stores
  nothing. Needs `CONTACT_FROM` and `CONTACT_FORWARD_TO` (OPEN_QUESTIONS.md
  items 1 and 3).
- Linked exactly once from the footer and once from `/about/`. Not linked from
  any authority page.

## Task 5 — Measurement and housekeeping

- `HANDOFF_TO_CLAUDE_CODE.md` does not exist in the repository; no Cloudflare
  Web Analytics token found. No analytics installed and no substitute used.
- Sitemap: `/consulting/` and `/register/` added; `/unsubscribe/` excluded as
  `noindex`. Coverage is now enforced by the post-build link check.
- Person and Organization emitted on the homepage.
- Internal links verified by script (468 targets, 0 broken).
- Production build clean.
- Incidental fix: `BaseLayout.astro`'s stylesheet was Astro-scoped, so its
  rules for `main h1`, `main p`, `main blockquote`, and so on never reached
  slotted page or Markdown content (headings on authority pages rendered
  browser-default). Marked `is:global`, which is what those rules were written
  for. No content change.

## Files touched

New: `src/lib/site.ts`, `src/lib/schema.ts`, `src/components/JsonLd.astro`,
`src/components/CitationBlock.astro`, `src/components/UpdateRegisterForm.astro`,
`src/pages/consulting.astro`, `src/pages/register.astro`,
`src/pages/unsubscribe.astro`, `src/server/register.ts`,
`functions/api/subscribe.ts`, `functions/api/unsubscribe.ts`,
`functions/api/contact.ts`, `scripts/validate-jsonld.mjs`,
`scripts/check-links.mjs`, `.dev.vars.example`, `OPEN_QUESTIONS.md`,
`BUILD_SUMMARY.md`.

Modified: `src/pages/about.astro`, `src/pages/index.astro`,
`src/pages/methodology.astro`, `src/pages/authorities/index.astro`,
`src/pages/sitemap.xml.ts`, `src/layouts/BaseLayout.astro`,
`src/layouts/AuthorityLayout.astro`, `src/content/config.ts`, all 20 files in
`src/content/authorities/` (`date_published` added), `package.json`,
`package-lock.json`, `.gitignore`, `README.md`.

## Not done, on purpose

- No regulatory content written or edited.
- No merge, deploy, DNS, or Cloudflare configuration change.
- No email, notification, or message sent. (One Resend segment was created;
  no contact was added and nothing was sent.)
- No URL for Frazer Applied Entomology, no fee figure, no analytics
  substitute, no `SearchAction`.
