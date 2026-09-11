# Build Summary — Phase 1: Capture and Integrity

Overnight run, September 9–10, 2026. Branch
`claude/phase-1-capture-and-integrity-ek2s8l` (see OPEN_QUESTIONS.md item 11
on the branch name). Nothing was merged or deployed.

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
