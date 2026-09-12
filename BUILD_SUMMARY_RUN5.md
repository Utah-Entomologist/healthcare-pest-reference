# Build Summary — Run 5, September 12, 2026

What is live, what is not, and what a reader can rely on.

---

## One-paragraph version

Six passages that were printed on this site inside quotation marks were not
in the documents they were attributed to. All six are gone. Three were named
in the brief (the EPA IPM toolkit's "six basic steps," recordkeeping, and
chemical-hierarchy passages); three more were found by an audit that checked
**every one of the 112 quoted passages on the site** against the primary
sources in the Drive folder — a misquotation of the FDA Food Code that turned
"eliminate" into "minimize," a CDC/HICPAC recommendation whose point was
inverted from "overnight storage" to "disposal," and a fabricated Federal
Register summary on the USDA page. Two citation errors on the Utah pages were
corrected. Seven further quotations whose sources are not held in the folder
had their quotation marks removed and were restated in plain language. Four
new pages from Run 4 were verified against the sources rather than taken on
trust. The site builds clean at 46 pages and is merged to `main`.

---

## Task 1 — Integrity failures (done)

### 1.1 `/authorities/epa-ipm-toolkit-2021/` — rebuilt

Three passages presented as verbatim quotations were removed. None appears in
EPA 907K21002:

| Removed | Replaced with |
|---|---|
| "An effective IPM program … includes six basic steps: (1) Establish program goals and policies; (2)…" | The toolkit's **actual** six numbered sections, from its table of contents: Establish Your IPM Team · Develop an Official IPM Policy and Procedures · Set Pest Management Roles for Everyone · Inspect, Identify, Monitor, Evaluate · Implement Pest Prevention Strategies · Document and Communicate Pest Management Activities |
| "Documentation is essential … Records should be maintained for all pest sightings … retained for a minimum of three years…" | A plain-language statement of what section 6 covers, **without quotation marks** and marked as a restatement pending page-level verification. The field list and the three-year retention period are not in the document; the page now points to Utah R68-7-11(11) and VHA 1850.02, which do impose enforceable record requirements. |
| "Chemical controls should be considered only after non-chemical alternatives have been evaluated and found inadequate…" | Nothing asserting a chemical-control hierarchy. The document's actual position on chemicals is the dual-obligation sentence now quoted: freedom from pests *and* protection from chemicals. The page states plainly that no such hierarchy sentence was found. |

Also corrected: the subtitle is **"Implementing an IPM Program"** (not "A
Practical Guide for Implementation"); the publication is EPA 907K21002, July
2021, EPA Region 7, 29 pp.; `source_url` moved from the 404 landing page to
the live PDF path, with the **2026-02-26** Wayback snapshot recorded as the
stable archival copy; the **National Center for Healthy Housing attribution
was removed** as unconfirmed against the acknowledgements.

Three genuine passages, read from the PDF, are now quoted in its place. The
page carries a Correction Notice and a Related Killed Claims table naming all
four errors.

### 1.2 `/authorities/utah-r432-100-hospital-licensure/` — corrected

- Pest clause is **R432-100-38(1)(d)**, not R432-100-39. R432-100-39 is
  *Emergency Operations Plan*.
- Amendment date is **June 5, 2026**, not December 27, 2024.
- The quotation is now exact: **"The licensee shall ensure a pest-control
  program is conducted to ensure the hospital is free from any vermin or
  rodent."** The page had "free from vermin and rodents" — singular/plural and
  *or*/*and* both wrong — inside quotation marks.
- R432-100-38 is now quoted **in full**, and R432-100-37(1) with it. Two
  requirements the one-sentence version hid are now on the page: (1)(c)
  requires a signed, dated services agreement where pest control is
  contracted, and (1)(a) reaches grounds as well as the building.
- Confidence **MEDIUM → HIGH**. The earlier errors came from legal
  aggregators; no text on the page rests on one now.

### 1.3 `/authorities/utah-r68-7-pesticide-applicator/` — corrected

- CEU provision is **R68-7-11(10)(c)(ii)**, not (10)(b)(ii). (10)(b) is the
  duty to recertify; (10)(c) lists the options and CEUs are (c)(ii).
- `source_url` is now the **adminrules.utah.gov** rule page; the UDAF program
  page remains linked in the body.
- **Found by the audit:** Category 7 was quoted as naming *"institutions such
  as schools, hospitals."* R68-7-7(7) says **"dwelling, educational
  institution, or medical institution."** Replaced with the verbatim rule text.
- Added, verbatim: R68-7-11(11) (nine required record elements, recorded
  within 24 hours, kept two years) and R68-7-19(8) (no aerial or air-blast
  application adjacent to occupied hospitals and nursing homes) — the one
  place in R68-7 where hospitals are named. Also added the Category 7 /
  Category 12 three-foot boundary, which is where facilities most often find
  their vendor is not certified for the exterior rodent program.

### 1.4 Site-wide quotation audit — done

**Method.** All 112 blockquoted passages across every content and page file
were extracted and matched against a corpus assembled from the Drive folder:
Appendix A Rev. 238 (613 pp.), Appendix PP Rev. 232 (926 pp.), 42 CFR Parts
482, 483 and 485, Utah R432-100 and R68-7, FDA Food Code 2022 (668 pp.),
CDC/HICPAC (241 pp.), VHA 1850.02, NACMCF, 29 CFR 1910.1200, and the USDA
final rule. Matching was exact-substring after normalisation, with a second
pass that strips embedded footnote numbers and a third that splits on
editorial elisions.

**Result: 90 of 112 matched exactly.** The 22 that did not were each checked
sentence by sentence against the sources; all were confirmed genuine and
differ only by heading joins, labelled elisions, or PDF page-break artefacts.

**Three misquotations were found and corrected:**

- **FDA Food Code 6-501.111** — the page had "controlled to **minimize** their
  presence on the PREMISES." The 2022 Food Code says **eliminate**. The
  provision's opening sentence, "The PREMISES shall be maintained free of
  insects, rodents, and other pests," was missing and has been restored.
- **CDC/HICPAC** — the page had laboratory specimens in covered containers
  "for **disposal**." The guideline says "for **overnight storage**." The
  recommendation exists because cockroaches and ants feed on fixed sputum
  smears overnight.
- **USDA 7 CFR 110 rescission** — the blockquote presented as the Federal
  Register summary **is not in the document**; neither "duplicative" nor "is
  rescinding" appears anywhere in it. Replaced with the actual SUMMARY,
  AGENCY/ACTION and DATES text. "This final rule is effective" corrected to
  "The final rule is effective."

**Seven quotations had no source in the folder at all** — the four ESACC BCE
requirement passages, the Scott 2009 HAI cost figure, HCAHPS Question 8, and
29 CFR 1910.151(c). Their quotation marks were removed and the content
restated in plain language, each marked `[RESTATED — NO COPY IN
PRIMARY-SOURCE ARCHIVE]`, with a source note saying what would restore them.
The substance is unchanged; only the claim to be reproducing exact wording is
withdrawn.

`last_verified: 2026-09-12` is set on all ten corrected or re-verified pages.
The site keeps its existing snake_case `last_verified` field, which is what
the citation block renders as the page's verified date; a second camelCase
field would have been a duplicate.

---

## Task 2 — Merge and ship

### 2.1 Soft-404

`src/pages/404.astro` exists and builds to `dist/404.html`, which is what
Cloudflare Pages serves with a 404 status. Verified locally: `/` → 200,
`/authorities/` → 200, `/nonsense-path-xyz/` → **404**, key file → 200 with
exactly the key as its body. The page is `noindex` with its own canonical.

**There is no catch-all rewrite in the repository to remove.** `_redirects`
contains only the www rule; there is no `[[path]]` function, no SPA fallback,
no `/* /index.html 200`. If a nonsense path still returns the homepage after
this deploy, the cause is in the **Pages project settings** — see R5-7.

### 2.2 www host

The `_redirects` rule the brief asked for **was already in the repository**,
added in Run 2 and deployed since the Run 2–4 merge on September 11. The www
host was still serving the full site with no redirect on September 12, which
is the expected behaviour if Cloudflare Pages matches `_redirects` sources as
URL paths: a source beginning with a scheme and hostname never matches.

The rule is kept, and **`functions/_middleware.ts` now performs the 301 at the
edge**. Loop safety: it fires only when the request hostname is exactly
`www.healthcarepestreference.org` and rewrites the hostname to the apex, so a
request to the apex never matches and the redirect target is a request the
middleware passes straight through. Everything else calls `next()`, so static
assets, `_redirects`, `_headers` and the `/api` functions are unaffected.

**This needs the live check to confirm** (R5-1).

### 2.3 A-0749

Already rebuilt on §482.42(a)(2) in Run 4. Re-verified this run directly
against Appendix A Rev. 238: the tag heading at §482.42(a)(2) is present with
the standard Rev. 238 issue line. `verification_status: confirmed`.

### 2.4 Merge and deploy

**PRs #1, #2, #3 and #4 were already merged to `main`** before this run
started — #1, #2 and #3 on September 11 at 06:20–06:22 UTC and #4 at 06:26
UTC. Nothing was outstanding to merge. This run's work is merged to `main` on
top of them.

**Live verification and the IndexNow POST could not be performed**, and the
reason is now pinned down exactly. The agent proxy refuses `CONNECT` to every
outbound host with a 403, and the gateway's response body says why:

```
Host not in allowlist: healthcarepestreference.org
```

That is an egress allowlist on the Claude Code environment, not a fault in the
site or the network. The proxy README is explicit that a 403 is an
organization policy denial that must not be retried or routed around, so this
run reported it rather than working around it. **Adding these four hosts to
the environment's allowlist would let a future run verify its own work:**
`healthcarepestreference.org`, `www.healthcarepestreference.org`,
`api.indexnow.org`, `www.epa.gov`.

In the meantime this run added **`scripts/verify-live.mjs`**, so the operator
runs one command from any machine with internet access:

```
npm run verify:live      # then, if it passes:
INDEXNOW_ENABLED=1 npm run indexnow -- --all
```

`verify:live` checks the nonsense-path 404 (and reports explicitly if the body
is the homepage, which would mean the Pages project is in single-page-
application mode), the www 301 at `/` and on a deep path with the path
preserved, that following the redirect does not loop, the key file's status,
`Content-Type` and exact body, and that every sitemap URL returns 200 with a
matching self-canonical. It exits non-zero if anything fails and sends
nothing.

---

## Task 3 — The four pages

All four existed from Run 4. This run **verified them against the sources**
rather than accepting them, and confirmed every load-bearing claim:

- **`/deficiencies/f925/`** — §483.90(i)(4) verbatim, CMS's definition with all
  eight named pests, and the complete GUIDANCE / PROCEDURES / PROBES blocks,
  all confirmed against Appendix PP Rev. 232 (926 pp., extracted in full). The
  page's measured claim that Part 483 contains two occurrences of "pest" and
  one of "rodent" is confirmed exactly. The F812 pathway and its four pest
  passages check out.
- **`/deficiencies/f925-plan-of-correction/`** — five elements, ten-day clock,
  accepted vs rejected, no submittable template. Quotations verified.
- **`/authorities/485-725e-pest-control/`** — §485.725(e) confirmed verbatim:
  "The organization's premises are maintained free from insects and rodents
  through operation of a pest-control program." Scope is stated correctly:
  Part 485 **Subpart H**, clinics / rehabilitation agencies / public health
  agencies providing outpatient physical therapy and speech-language
  pathology — **not hospitals, not critical access hospitals**, with the
  subpart table and the verbatim CAH maintenance standard for contrast. The
  page's record of a second explicit provision at §485.62(b)(4) (CORFs) is
  confirmed: Part 485 contains exactly two.
- **`/deficiencies/which-tag-is-pest-control/`** — seven entries, each linked.
  The hospital entry now states the zero-occurrence finding **across all 613
  pages** and adds that 42 CFR Part 482 contains none either.

### 3.5 A-0758

The hit-count table was already on the page. Every figure was **re-measured
this run with a second, independent extraction tool**, so an artefact in one
extractor would not be reproduced in the other. All identical: pest, vermin,
rodent, insect, infestation and "integrated pest" all **0** whole-word and
substring across 613 pages; `sanitary` 6; `housekeeping` 9. The tag sequence
A-0747 … A-0799 matches exactly. Added: Part 482's own zero count, the Part
483 and Part 485 contrast, and a note correcting **this reference's own memo**
— `CMS_Tag_Verification.md` wrongly lists A-0763 as absent; it exists at
§482.42(b)(2)(iii). The live page was already right (R5-5).

---

## Task 4 — Export and close

### 4.1 Contact export — NOT DONE, blocked

Supabase project **`wahrmlnygnlyfdbvwkhd` is not reachable from this
session.** `list_organizations` returns one organization holding three
projects, and that ref is not among them; `get_project` on it returns "You do
not have permission to perform this action." Neither active project has a
`contact_submissions` table. **No CSV was produced and no summary was made.**

Worth knowing: **this site never wrote contact submissions to a database.**
`functions/api/contact.ts` forwards one email through Resend and stores
nothing. The table belongs to a different property, in a Lovable-managed
project not linked to the connected account. Export SQL and two unblocking
routes are in R5-3.

### 4.2 VHA 1850.02 — confirmed current

The page was rebuilt in Run 4 and is in good shape. This run **re-verified
every quotation on it independently** against a fresh extraction of the
archived directive (156,036 bytes, the size VA published); all matched. The
December 2027 recertification window is stated verbatim, with the point that
the directive does not expire then — it remains national VHA policy until
recertified or rescinded. It already links into the deficiency section
(A-0701, A-0750, F925, §485.725(e), PE.01.01.01) and to the router page.
`last_verified: 2026-09-12`.

---

## What is live

- 46 pages build clean. `npm run check` clean. 210 JSON-LD blocks valid
  against the schema.org vocabulary. 1,084 internal links, 0 broken. Sitemap
  covers every indexable page with a valid `lastmod` and a `loc` equal to the
  page canonical.
- Six fabricated or misquoted passages removed; seven unverifiable ones
  restated without quotation marks.
- The four Run 4 pages verified against primary sources rather than trusted.
- `functions/_middleware.ts` added for the www → apex 301.

## What is not live, and why

| Item | Status |
|---|---|
| Live 404 / www / key-file / sitemap checks | **Not run.** Host not in the environment's egress allowlist. Now one command: `npm run verify:live`. |
| IndexNow POST | **Not sent.** Same cause. `INDEXNOW_ENABLED=1 npm run indexnow -- --all`. |
| EPA toolkit PDF in the Drive folder | **Not placed.** Download blocked (403). One-step fix in R5-1. |
| `contact_submissions` CSV and summary | **Not produced.** Project not reachable. SQL in R5-3. |
| Page pinpoints for the EPA quotations | **Not recorded.** Needs the PDF. |
| Joint Commission verbatim EP text | **Deliberately absent.** Proprietary and paywalled; not paraphrased. |

Nothing was sent. No DNS was touched. No proprietary accreditor text is
quoted or paraphrased anywhere on the site.
