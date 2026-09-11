# Open Questions

Three runs are logged here, newest first. Items remain open unless marked
otherwise.

---

# Run 3 — September 10, 2026 (verification and crawl)

## Merge blocker

### R3-1. Four A-tags could not be re-verified against Appendix A; PR #2 is held

Every primary-source host (cms.gov, ecfr.gov, jointcommission.org, va.gov,
federalregister.gov, govinfo.gov, api.indexnow.org, web.archive.org) was
egress-blocked, and no copy of the Appendix A PDF exists in the connected
Google Drive. Under the Run 3 rule the build did not proceed on memory.

Status of every tag asserted in the deficiency section:

| Tag | Status | Basis |
| --- | --- | --- |
| A-0701 | Confirmed | Operator's grep of Rev. 238, 2026-09-10 (exists; §482.41(a); pest findings cited here) |
| A-0750 | Confirmed | Same grep (exists; §482.42(a)(3); pest findings cited here). Page citation corrected from "§482.42" to "§482.42(a)(3)". |
| A-0758 | Does not exist | Same grep (sequence A-0750 → A-0751 → A-0760). Correction page built at `/deficiencies/a-0758/`. |
| A-0700 | Blocked | Carried from the CoP page (verified 2026-05-25); not re-verified. Page marked. |
| A-0722 | Blocked | Same. |
| A-0747 | Blocked | Same. |
| A-0749 | Blocked, premise withdrawn | The 2016-archive bullet and the Rev. 238 zero-match are verified (SOM page). The page's former description of A-0749 as "the §482.42(a) tag" was not verified and has been removed; current subject not asserted. |
| PE.01.01.01, PE.02.01.01 EP 4, EC.02.06.01, EC.02.02.01 EP 5 | Blocked | Carried from the 2026 PE chapter page (TJC public FAQ, verified 2026-05-25); jointcommission.org not reachable. |

What the operator needs to do before merging PR #2 (with PR #3 applied):
open the Rev. 238 PDF and confirm, for A-0700, A-0722, A-0747, and
A-0749, that the tag exists and what its title line says; then set
`verification_status: "confirmed"` and a `verification_note` on each
page, or delete the page if the tag does not exist. Also transcribe the
A-0701 and A-0750 title lines and the §482.42(a)(3) text into the A-0758,
A-0701, and A-0750 pages and clear their blocked markers. Estimated time:
under thirty minutes with the PDF open.

### R3-2. What A-0751 and A-0760 cover

The A-0758 correction page names the two adjacent tags because the grep
established the sequence, but does not say what they cover. Add one line
each from the PDF if useful to a reader holding a mistyped citation.

## Verification items

### R3-3. VHA Directive 1850.02 currency

The directive's active period (through 2027-12-22, subject to
recertification) is stated in the body. A currency re-check against va.gov
was blocked. The page now says so. Re-check when egress permits or by hand.

### R3-4. FIFRA §136j(a)(2)(G), 29 CFR 1910.151(c), 40 CFR §156.10

Still cited-not-refetched on the pesticide storage page; markers changed
from "pending" to "[VERIFICATION BLOCKED — EGRESS]" where egress was the
cause. Same operator action as Run 2 item R2-2.

### R3-5. Form CMS-2567 layout description

The A-0758 page describes the form's columns (ID Prefix Tag, summary
statement, provider's plan of correction, completion date) from the
standard form. Not re-fetched; marked. Confirm against a current form.

## Crawl and measurement

### R3-6. IndexNow submission has never run

`npm run indexnow` posts changed URLs (git-derived lastmod within
`INDEXNOW_DAYS`, default 2) when `INDEXNOW_ENABLED=1`. It has not run from
this environment (api.indexnow.org blocked) and is not wired into the
Cloudflare build command. To enable: set `INDEXNOW_ENABLED=1` on the
Production environment only and change the build command to
`npm run build && npm run indexnow`. Run it once by hand with `--all` after
the soft-404 fix deploys. Expect 403 until the key file is served as
`text/plain` at the apex, which depends on the 404 fix.

### R3-7. Core Web Vitals fix needs field confirmation

Fonts now load with `display=optional` and metric-adjusted local fallbacks;
the nav, header row, and verification badge reserve their height. This
removes the font-swap shift Cloudflare attributed to those elements, at the
cost that first-visit renders may use the fallback fonts. Re-read the CLS
report after 28 days; if "poor" persists, the remaining source is something
this run could not observe from a static build.

### R3-8. HAI page "unknown to Google"

The sitemap entry is well-formed, matches the page canonical exactly
(trailing slash), carries a valid lastmod, and the page returns 200 with a
self-canonical. The validator now fails the build if any of those drift.
Nothing structural remains; the URL should resolve on Google's next sitemap
read. If it does not within two weeks, request indexing by hand.

---

# Run 2 — September 10, 2026

## Blocks content, not the build

### R2-1. The GSC report and handoff file were not available to the build

`GSC_Report_2026-09-09.md` and `HANDOFF_TO_CLAUDE_CODE.md` are not in the
repository on any branch, and a search of the connected Google Drive and
Gmail found neither. The run therefore could not read the query log. Every
measured number in the brief was taken as given; the *identity* of the ten
survey-citation queries was not available, so the deficiency page set was
derived from the tags and Elements of Performance this reference's own
content already documents (A-0700, A-0701, A-0722, A-0747, A-0749, A-0750,
PE.01.01.01, PE.02.01.01 EP 4, EC.02.06.01, EC.02.02.01 EP 5). Reconcile
that set against the actual query log and add or rename pages as needed.
The Task 4.1 title uses A-0701, A-0749, and A-0750 because those are the
tags the page discusses; if the query log names a different tag, change
`seo_title` in `src/content/authorities/cms-state-operations-manual.md`.
Commit both files to the repository root so future runs can read them.

### R2-2. Every primary-source site was unreachable from the build environment

eCFR, cms.gov, jointcommission.org, federalregister.gov, govinfo.gov,
osha.gov, epa.gov, and adminrules.utah.gov were all blocked by the egress
proxy. As a result the new pages quote verbatim text only where it already
existed on this reference (verified May 25, 2026), and everything else is
marked in the page body. The markers to clear, by page:

- `a-0747`, `a-0749`, `a-0750`: verbatim text of 42 CFR §482.42 and its
  subsections; the official tag titles for A-0749 and A-0750 as printed in
  Appendix A Rev. 238.
- All six CMS pages: the plan-of-correction criteria from State Operations
  Manual Chapter 7 (the five elements are presented as structure at MEDIUM
  confidence and marked pending verbatim).
- `pe-01-01-01`, `pe-02-01-01`, `ec-02-06-01`, `ec-02-02-01`: verbatim EP
  text is paywalled in the CAMH e-edition and is marked
  `[CONTENT PENDING — PAYWALLED SOURCE]`; the Evidence of Standards
  Compliance structure is presented at MEDIUM confidence pending the
  current ESC instructions.
- `topics/pesticide-storage-requirements-healthcare-facilities`: the FIFRA
  §136j(a)(2)(G) and 29 CFR 1910.151(c) quotations are cited but were not
  re-fetched; 40 CFR §156.10 is cited but not quoted; states other than
  Utah are pending.

Each affected page carries `content_pending: true` in frontmatter, which
renders a notice under the title and a "Primary-source text pending" label
on the index. Clear the flag when the markers are gone.

### R2-3. No `last_verified` on any new page

The ten deficiency pages and the topic page carry no verification date and
render `[VERIFICATION DATE NOT RECORDED]`. They are assembled from
already-verified material, but the verification of the assembled page is the
operator's act. Add `last_verified` after review.

## Decisions for the operator

### R2-4. Task 4.4, USP <800>: recommendation is to accept the page as off-audience

See the PR description. Nothing was changed on the page beyond related
links. If the operator prefers the other option, the section to add is
"What the compendial applicability date means for pest management in
compounding areas," and it needs USP-NF access to be written to standard.

### R2-5. The www redirect depends on the www custom domain staying attached

`public/_redirects` sends `https://www.healthcarepestreference.org/*` to the
apex with a 301. Cloudflare Pages only serves that rule for a host that is
attached to the project as a custom domain, which www currently is (it
returns 200). Do not remove the www custom domain; doing so would make the
host fail rather than redirect. No DNS change is involved.

### R2-6. Sitemap `lastmod` comes from git history

`src/lib/dates.ts` takes each page's lastmod from the last commit touching
its source file, falling back to the latest frontmatter date. If the
Cloudflare Pages build uses a shallow clone, git history may be truncated
and content pages will fall back to frontmatter dates while static pages
(`/`, `/about/`, and so on) will carry no lastmod. Check one deploy's
sitemap; if the static pages lack lastmod, either deepen the clone in the
build settings or accept it.

### R2-7. Field naming

The brief asked for `relatedAuthorities`. The field is `related_authorities`
to match the rest of the frontmatter schema (same reasoning as Run 1
item 9). Each entry is `{ slug, why }`; an unknown slug fails the build.

## Still blocked from Run 1

### R2-8. Resend sender (Run 1 item 1) is still blocked

The Resend account still has only `mail.myfalconpest.com` verified. No
change was made; the Falcon domain was not used. Task 6 remains open.

---

# Run 1 — September 9–10, 2026

Logged during the overnight build run of September 9–10, 2026. Each item is
something the build could not resolve on its own authority. Nothing here
blocks the pull request from being reviewed; several items block features
from being live after merge and are marked as such.

## Blocks a feature after merge

### 1. Resend has no sender on the reference domain (blocks the Update Register sending and the contact form)

The Resend account has exactly one verified sending domain:
`mail.myfalconpest.com`. The run was instructed not to route the reference's
list through the Falcon domain, and provisioning `healthcarepestreference.org`
(or a subdomain such as `mail.healthcarepestreference.org`) in Resend requires
adding DKIM, SPF, and return-path DNS records. DNS was off limits, so the run
stopped here.

What is built and ready:

- `/api/subscribe` and `/api/unsubscribe` are wired to Resend Contacts and will
  work as soon as `RESEND_API_KEY` and `RESEND_SEGMENT_ID` are set on the Pages
  project. Collecting contacts does not require a verified sender.
- A Resend segment named "Healthcare Pest Reference — Regulatory Update
  Register" was created (ID `73bdf341-59a0-4b4d-b071-0bae790ed267`) so the
  reference's list is separate from the Falcon "General" segment.
- `/api/contact` is wired to Resend Emails and needs `CONTACT_FROM` and
  `CONTACT_FORWARD_TO` in addition to the API key.

What the operator must do:

1. Add the reference domain in Resend (Domains → Add domain) and publish the
   DNS records it produces at the domain's DNS host.
2. Create a dedicated Resend API key for this site (do not reuse the Falcon
   keys) and set it as a Secret on the Cloudflare Pages project, with the
   segment ID and contact variables from `.dev.vars.example`.
3. Send register notices as Resend Broadcasts to that segment. Resend adds its
   own one-click unsubscribe link to broadcasts; the on-site `/unsubscribe/`
   page is the second path.

Until step 2 is done, both forms display "not available right now" and nothing
else on the site is affected.

### 2. Double opt-in for the register

The register currently adds an address on submission (single opt-in). A
confirmation email is the norm for a list that a hospital compliance officer
will judge, but sending one needs the sender in item 1. Decide whether to
add double opt-in once the sender exists. The function is written so that the
confirmation step can be inserted without changing the form.

### 3. Contact route for the consulting page

The brief asked for a single contact route on `/consulting/` but supplied no
address for Frazer Applied Entomology, and the run did not invent one. The
page uses a contact form that forwards to whatever inbox `CONTACT_FORWARD_TO`
names. If a published email address is preferred instead, it belongs in
`src/lib/site.ts` and on the consulting page; the form can stay or go.

## Content and positioning

### 4. Customer-count conflict: 640,000 vs. "over one million"

`/about/` states that the Aptive quality programs served "more than 640,000
customers across more than 80 operations centers." Other Falcon materials say
"over one million accounts." The site keeps 640,000 as the conservative,
defensible figure. The other materials should be reconciled to match, or the
larger figure should be substantiated before it appears anywhere.

### 5. Frazer Applied Entomology has no web presence yet

The practice is named in text only on `/about/`, `/consulting/`, and the
footer. No URL is published anywhere on the site. When the firm's site ships,
add its URL in `src/lib/site.ts` (a `CONSULTING_PRACTICE_URL` constant next to
`CONSULTING_PRACTICE_NAME`), link it from `/consulting/` and the footer, and
consider adding it to the Person schema's `sameAs` in `src/lib/schema.ts`.

### 6. Person.jobTitle in structured data

The Person schema uses `jobTitle: "Board Certified Entomologist"`, matching
the footer and about page. If a different title is preferred (for example one
naming the consulting practice), change it in `src/lib/site.ts`. Whatever it
says must not imply the practice holds the credential.

### 7. Fee language on the consulting page

The page states that engagements are fee-based and that no schedule is
published. No figure appears anywhere. Confirm this is the intended level of
disclosure.

## Housekeeping

### 8. No Cloudflare Web Analytics token was available

`HANDOFF_TO_CLAUDE_CODE.md` does not exist in the repository, and no analytics
token was found elsewhere. No analytics snippet was installed, and no
substitute was used. When the Chrome agent produces the token, add the
Cloudflare Web Analytics `<script>` to the head of
`src/layouts/BaseLayout.astro` (it is cookieless and needs no consent banner).

### 9. `lastVerified` versus the existing `last_verified` field

The brief asked for a `lastVerified` frontmatter field. Every authority page
already carried a required `last_verified` field with the same meaning, so the
run kept the existing snake_case name (matching the rest of the schema) rather
than adding a duplicate. The change made was to make it optional so a page
without a real date renders `[VERIFICATION DATE NOT RECORDED]` instead of
failing the build or showing a guessed date. All 20 pages currently record
2026-05-25. If any of those dates were not the product of an actual check,
remove them.

### 10. `date_published` was populated from git history

Article structured data needs `datePublished`. No such field existed, so a
`date_published` field was added and populated on each page with the date of
the commit that first added that file (2026-05-26 or 2026-06-01). This is the
best available record of when each page went live; correct any page where
the real publication date differs.

### 11. Branch name

The brief named `feat/phase-1-capture-and-integrity`. The session was
provisioned with `claude/phase-1-capture-and-integrity-ek2s8l` as its
designated branch, and the work was pushed there. Rename on merge if the
branch name matters for release notes.

### 12. WebSite SearchAction not declared

The brief asked for a `SearchAction` if site search exists or is added. The
site has no search endpoint, so none is declared; a `SearchAction` pointing
at a URL that does not resolve would be broken structured data. Add it in
`src/lib/schema.ts` (`websiteSchema`) when search exists.
