# Build Summary — Run 3: Verification and Crawl

September 10, 2026. Branch `fix/verification-and-crawl`, stacked on
`feat/phase-1-capture` (PR #2), which is stacked on PR #1. Not merged, not
deployed, no DNS change, nothing sent.

## Merge safety

**PR #2 is not safe to merge alone.** Four of its CMS tags (A-0700, A-0722,
A-0747, A-0749) could not be re-verified against Appendix A Rev. 238
because every primary-source host was egress-blocked and no copy of the PDF
exists in the connected Drive. Under the Run 3 rule nothing was inferred.
With PR #3 applied, every unverified page states `[VERIFICATION BLOCKED —
EGRESS]` in its source record and body, the one page built on an unverified
premise (A-0749) has that premise withdrawn, and the correction page for
the nonexistent A-0758 exists. Whether that state is shippable is the
operator's call; the recommended path is the thirty-minute PDF check in
OPEN_QUESTIONS R3-1, then merge #1, #2, #3 together.

No page was deleted: no tag PR #2 built was shown not to exist. One page
was rewritten (A-0749). Two pages were confirmed (A-0701, A-0750) on the
strength of the operator's grep, with A-0750's citation corrected to
§482.42(a)(3). One page was added (A-0758).

## Verification performed

| Check | Result |
| --- | --- |
| `npm run check` | 0 errors, 0 warnings, 0 hints |
| `npm run build` | 42 pages, clean |
| JSON-LD validator | all blocks valid; every Article carries `author`, `dateModified`, `citation` |
| Link check + sitemap validator (extended) | 0 broken links; 40 sitemap URLs, every one with a well-formed `lastmod` and a `loc` equal to the page's canonical |
| `curl` on the preview server | `/definitely-not-a-page-xyz/` → 404 with the 404 page's own canonical and noindex; key file → 200 `text/plain` with exactly the key; HAI page → 200 |
| IndexNow script with a mocked API | disabled path skips; 200 accepted; 403 and 422 reported with the right diagnosis; changed-only selection works |
| Playwright render of the A-0758 page at 1200px and 400px | renders; reserved heights hold |

## Task 1 — A-0758 correction (merge blocker)

- 1.1 Audit: every A-tag introduced in PR #2 inventoried (A-0700, A-0701,
  A-0722, A-0747, A-0749, A-0750 across the deficiency pages, the SOM page
  map, and the storage topic). Existence and title could not be re-verified
  from the PDF. A `verification_status` field (`confirmed` / `blocked` /
  `correction`) and `verification_note` were added to the deficiency schema
  and are rendered in each page's source record and on the index.
- 1.2 A-0749 rewritten: the unverified "§482.42(a) tag" premise is
  withdrawn; the page now asserts only the two verified facts (2016 bullet;
  Rev. 238 zero-match) and says plainly what it does not assert. A-0700,
  A-0722, A-0747 marked blocked with a body notice. A-0701 and A-0750
  marked confirmed per the operator's grep; A-0750 corrected to
  §482.42(a)(3). SOM page A-tag map annotated the same way and its A-0750
  sentence corrected.
- 1.3 `/deficiencies/a-0758/`: states that A-0758 does not appear in Rev.
  238 (sequence A-0750 → A-0751 → A-0760), that Appendix A has no pest
  vocabulary, that pest findings are cited under A-0701 and A-0750, gives
  the verbatim §482.41(a) text and the Appendix A sanitary-environment
  sentence with citations, explains how to read the tag on a Form CMS-2567,
  and closes with an explicit "what this page does not say." Written as a
  correction of the record. Linked from A-0701, A-0749, A-0750, and the SOM
  page.
- 1.4 Egress blocked; PR #2 held. Every tag not covered by the operator's
  grep carries `[VERIFICATION BLOCKED — EGRESS]`.

## Task 2 — Soft-404

`src/pages/404.astro` added (noindex, own canonical, no register form).
Cloudflare Pages serves `dist/404.html` with a 404 status, which replaces the
index.html fallback that produced the soft 404. `_redirects` contained no
catch-all; the www → apex 301 is unchanged and cannot loop. Verified on the
preview server: nonsense path → 404.

## Task 3 — IndexNow

`public/1c20d8a83a6d4f848012a5d1bcf71b3c.txt` contains exactly the key;
`public/_headers` forces `text/plain; charset=utf-8` for it.
`scripts/indexnow.mjs` (`npm run indexnow`) posts `host`, `key`,
`keyLocation`, and `urlList` for URLs whose git-derived sitemap lastmod is
within `INDEXNOW_DAYS` (default 2), or all with `--all`; runs only when
`INDEXNOW_ENABLED=1`; handles 200/202, 400, 403 (key mismatch, with the
soft-404 diagnosis), 422 (wrong host), 429. Not wired into the Cloudflare
build command and never executed against the live API (R3-6).

## Task 4 — AI-citation form

Audited the eleven deficiency pages and the topic page against: verbatim
text present, `author` / `dateModified` / `citation` in JSON-LD, revision
date visible in the body, explicit scope limits. All Article blocks carry
the three properties (validator-enforced). Revision date (Rev. 238,
03-20-2026) is in each CMS page's source record; the storage page now
states its verification dates in the body. Scope-limit sections added to
the storage page ("What These Rules Do Not Say") and the A-0758 page;
every deficiency page already states that its rule contains no pest
language. Markers whose cause was egress were relabeled from "pending" to
`[VERIFICATION BLOCKED — EGRESS]`.

VHA 1850.02: the active period (through 2027-12-22, subject to
recertification) was already in the body; a "Currency of This Page"
section now states the re-check was blocked, and a new section links the
page into the deficiency section (A-0701, A-0750, PE.01.01.01).

## Task 5 — CLS

Font CSS now loads with `display=optional` (no post-render swap);
metric-adjusted local fallbacks (`Inter Fallback`, `IBM Plex Serif
Fallback`) keep line boxes the same size; `.site-header-inner`,
`.site-nav`, and `.verification-badge` reserve their height at desktop and
mobile widths, and the badge uses `contain: layout`. LCP and INP untouched.

## Task 6 — Sitemap

HAI entry verified: exact canonical match with trailing slash, valid
lastmod, 200 with self-canonical. The link checker now fails the build on a
missing or malformed `lastmod` or a `loc` that differs from the page
canonical. A repository-level last-commit fallback was added for static
pages so every URL carries a real commit date even on a shallow clone.

## Files

New: `src/pages/404.astro`, `public/1c20d8a83a6d4f848012a5d1bcf71b3c.txt`,
`public/_headers`, `scripts/indexnow.mjs`, `src/content/deficiencies/a-0758.md`,
`BUILD_SUMMARY_RUN3.md`.

Modified: `src/content/config.ts`, `src/layouts/DeficiencyLayout.astro`,
`src/layouts/BaseLayout.astro`, `src/pages/deficiencies/index.astro`,
`src/pages/sitemap.xml.ts`, `src/lib/dates.ts`, `scripts/check-links.mjs`,
`package.json`, all ten existing `src/content/deficiencies/*.md`,
`src/content/topics/pesticide-storage-requirements-healthcare-facilities.md`,
`src/content/authorities/cms-state-operations-manual.md`,
`src/content/authorities/vha-directive-1850-02.md`, `OPEN_QUESTIONS.md`.
