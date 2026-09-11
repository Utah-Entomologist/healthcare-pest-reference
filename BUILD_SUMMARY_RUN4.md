# Build Summary — Run 4: Site Deployment, F925, §485.725(e), and Corrections

September 11, 2026. Branch `claude/hpr-site-deployment-run4-2sqs5y`, cut from
the head of PR #3 (`fix/verification-and-crawl`, 1f33f0e). PRs #1, #2, and #3
were merged to `main` by this run (merge commits 7050123, 52ce86e, cf0d3af)
after Task 1 cleared; this branch's pull request follows them. Nothing sent;
no DNS change; no proprietary accreditor text quoted.

## Definition of done

The site is deployed and the F925 page is live once this branch's PR is
merged and Cloudflare Pages finishes the production build of `main`. Deploy
success is confirmed through the "Cloudflare Pages" check run and the
Cloudflare bot comment that GitHub receives on every push; the live curl
checks and the IndexNow submission could not be run from this environment
(every outbound host, the site included, was refused by the egress proxy) and
are handed to the operator as three commands in `OPEN_QUESTIONS.md` R4-1.

## Primary sources read (all from the Drive folder `HPR-Primary-Sources`)

| Document | Revision | How it was read |
| --- | --- | --- |
| CMS SOM Appendix A (hospitals) | Rev. 238, Issued 03-20-26, 613 pp., MD5 cf26c249b3c544aaecf7e130bfc1a1d6 | Full PDF downloaded from Drive, text-extracted locally (PyMuPDF, ~1.52 M characters); tag blocks A-0700, A-0701, A-0722, A-0723, A-0724, A-0747, A-0748, A-0749, A-0750, A-0751, A-0760 transcribed; whole-document term counts |
| CMS SOM Appendix PP (long-term care) | Rev. 232, Issued 07-23-25, 926 pp. | Full PDF downloaded, text-extracted; F925 (p. 903), F812, F814, F584, F600, F880, F882 pest passages and the §7317 plan-of-correction restatement transcribed; whole-document term search (23 hits) |
| 42 CFR Part 482 | eCFR XML, point-in-time 2026-09-08 (per manifest) | Decoded byte-for-byte (218,258 B); §482.41 and §482.42 in full |
| 42 CFR Part 483 | eCFR XML, 2026-09-08 | Decoded (445,546 B); §483.90 in full, §483.60(i), §483.80(a) |
| 42 CFR Part 485 | eCFR XML, 2026-09-08 | Decoded (367,561 B); subpart structure, §485.701, §485.703, §485.707, §485.62, §485.623, §485.723, §485.725 in full |
| VHA Directive 1850.02 | December 22, 2022 | Full text read through the Drive connector |
| CMS_Tag_Verification.md, Primary_Sources_Manifest.md, RUN3_SUMMARY.md, MEASURED_NOTES.md | Run 3 | Read; every claim in the verification file re-measured and confirmed |

The Drive connector's `read_file_content` truncates large PDFs (about 200 KB of
text); `download_file_content` returns the complete file, which was decoded
locally. All quotations on the site come from those complete copies.

## Verification performed

| Check | Result |
| --- | --- |
| `npm run check` | 0 errors, 0 warnings, 0 hints |
| `npm run build` | 46 pages (was 42), clean |
| JSON-LD validator | 210 blocks valid; every Article carries author, dateModified, citation |
| Link and sitemap validator | 1,073 internal links, 0 broken; 44 sitemap URLs (404 and unsubscribe excluded), every one with lastmod and a canonical-matching loc |
| Preview server | nonsense path → 404; key file → 200 `text/plain` with exactly the key; the four new pages and the rebuilt A-0749 and VHA pages → 200 |
| Headless Chromium render | F925 and router pages at 1200 px and 400 px |
| Claim check against the verification file | (a) A-0749 = §482.42(a)(2); (b) A-0750 = §482.42(a)(3); (c) A-0751 → A-0760; (d) A-0752–A-0759 absent; (e) A-0722 = §482.41(d) Standard: Facilities; (f) A-0700 = §482.41 CoP Physical Environment; (g) A-0747 = §482.42 CoP; (h) pest/vermin/rodent/insect/infestation 0/0 whole-word and substring — all confirmed |

## Task 1 — Clear and merge

- **1.1 A-0749 rebuilt** on §482.42(a)(2): verbatim heading (with CMS's
  "Implantation" typo preserved), regulation text, the complete Interpretive
  Guidelines and Survey Procedures. States that a pest finding framed as
  infection control is far more likely to be written at A-0750, explains why
  from the two tags' text, and links the two. `verification_status: confirmed`.
- **1.2 A-0758 audited** against the measured facts: the full tag sequence
  A-0747 … A-0799 in document order; A-0751 → A-0760; A-0752–A-0759 absent;
  the hit-count table (pest, vermin, rodent, insect, infestation, "integrated
  pest" all 0 whole-word and 0 substring; sanitary 6; housekeeping 9) stated
  on the page; A-0751 and A-0760 subjects quoted (closes R3-2); A-0701,
  A-0724, and A-0750 headings quoted verbatim; Appendix A's own description
  of the Form CMS-2567 and the 10-calendar-day deadline quoted.
- **1.3 Every tag assertion verified.** A-0700, A-0701, A-0722 (with A-0723
  and A-0724), A-0747, A-0749, A-0750 each rebuilt with verbatim heading,
  regulation text, Interpretive Guidelines, and Survey Procedures from Rev.
  238, regulation text matched against the Part 482 eCFR XML, all six set to
  `confirmed` with a verification note naming the document and MD5; every
  `[VERIFICATION BLOCKED — EGRESS]` marker on the CMS pages cleared. The
  Chapter 7 plan-of-correction pending marker on every hospital page was
  replaced with Appendix A's own verbatim protocol text: the 10-calendar-day
  submission statement and the listed characteristics of a plan of
  correction, plus its quotation of 42 CFR 488.28(a). The SOM page's A-tag
  map was rewritten to match.
  - **Correction found by the verification:** the sentence quoted since Run 1
    on four pages as the manual's "only sanitation language" ("The hospital
    must provide a sanitary environment ... There must be an active program
    ...") does not occur in Rev. 238. The actual A-0750 guidance ("The
    hospital must provide and maintain a clean and sanitary environment ...
    All areas of the hospital must be clean and sanitary ...", with the list
    of areas to monitor) replaces it on the SOM page, A-0750, A-0747, and
    A-0758, each with a correction note (R4-5).
- **1.4 Merged and deployed.** PRs #1, #2, #3 merged to `main` in order with
  merge commits; Cloudflare Pages builds `main` on merge. Live verification
  and the IndexNow submission are blocked from this environment and handed
  off (R4-1).

## Task 2 — F925

- `/deficiencies/f925/`: the verbatim tag (heading and its Rev. 173 line,
  which is the tag's own last-revised marker inside the Rev. 232 document);
  §483.90(i) in full from eCFR with (i)(4) set off; CMS's one-sentence
  definition of an effective pest control program with the eight named pests
  and a reading of its "eradicate and contain" and "e.g." wording; the
  complete Procedures and Probes; the measured absence of any Intent, Key
  Elements, Deficiency Categorization, or Potential Tags section at F925; the
  F812 pathway with all four F812 pest passages verbatim, including the
  Potential Tags bullet that routes kitchen findings to F925; the F814, F584,
  and F600 passages; what surveyors examine (from the text); where facilities
  fail (labeled as the reference's observation); scope-and-severity context
  from the manual's own F600 immediate-jeopardy example and F880/F882 Level 3
  examples, with Chapter 7 cited, not quoted.
- `/deficiencies/f925-plan-of-correction/`: the five elements verbatim from
  Appendix PP's restatement of SOM Chapter 7 §7317; each element applied to a
  pest finding; the ten-calendar-day clock, quoted from Appendix A's protocol
  and marked pending for the Chapter 7 long-term care statement; the
  past-noncompliance criteria verbatim; accepted-versus-rejected
  distinctions, labeled as analysis. Structure and requirements only; no
  fill-in text.

## Task 3 — §485.725(e)

`/authorities/485-725e-pest-control/`: §485.725 in full, the §485.703
definitions of clinic, rehabilitation agency, public health agency, and
organization, §485.701 scope, the complete Part 485 subpart table, the
verbatim CAH maintenance standard (§485.623(b)) showing no pest language, the
Part 482 and Appendix A zero counts, and a four-column contrast table. States
the exclusions plainly: not hospitals, not critical access hospitals. Also
states, because the file shows it, that §485.62(b)(4) (CORFs) carries a
parallel "free of rodent and insect infestation" provision, so §485.725(e) is
the only freestanding "Standard: Pest control" but not the only explicit
provision (R4-6). Added to the authorities hub's "which regime governs me"
list.

## Task 4 — Router page

`/deficiencies/which-tag-is-pest-control/` (static Astro page, in the sitemap,
linked from the deficiencies index, the SOM page, and the VHA page): nursing
home → F925; hospital → A-0701 / A-0724 or A-0750, no explicit tag, A-0758
does not exist; clinic / rehab agency / public health agency → §485.725(e);
critical access hospital → no explicit standard; Joint Commission →
PE.01.01.01 (identifier and public statement only); VA → VHA Directive
1850.02; food service → FDA Food Code 6-501.111. Each entry links to its full
page.

## Task 5 — Repair and export

- **5.1 EPA IPM Toolkit.** epa.gov and web.archive.org unreachable from this
  environment, so no archived copy could be found. The page now opens with a
  "Source Availability" section stating the 404 (both URLs, 2026-09-10), the
  citation form to use meanwhile, and a marker; confidence lowered HIGH →
  MEDIUM; summary and meta description say so (R4-3).
- **5.2 Supabase export — blocked.** Project `wahrmlnygnlyfdbvwkhd` is not in
  the organization the Supabase connector can see; `get_project` returned a
  permission error. No CSV; the SQL and the by-hand path are in R4-2.
- **5.3 VHA 1850.02 rewritten from the directive.** The page's five
  "verbatim" quotations were not in the directive (a "Pesticide Manager
  Officer," a three-year retention rule, a Section 2 policy statement, wrong
  supersession history). Rewritten with the real policy paragraph, the PMO's
  responsibilities (48-hour response, quarterly review, prior approval in ORs
  and SPS), the contract scope in full, the twelve IPMOP elements, training,
  records management, and definitions, all verbatim; the recertification
  paragraph quoted ("on or before the last working day of December 2027 ...
  will continue to serve as national VHA policy until it is recertified or
  rescinded"); the errors recorded under Related Killed Claims; source URL
  changed to the pub_ID=10078 page Run 3 downloaded from; linked into the
  deficiency section (F925, §485.725(e), A-0701, A-0750, PE.01.01.01, and the
  router). R4-4 recommends the same audit for the other Run 1 pages.

## Files

**New:** `src/content/deficiencies/f925.md`,
`src/content/deficiencies/f925-plan-of-correction.md`,
`src/content/authorities/485-725e-pest-control.md`,
`src/pages/deficiencies/which-tag-is-pest-control.astro`,
`BUILD_SUMMARY_RUN4.md`.

**Rewritten:** the six CMS A-tag pages, `a-0758.md`,
`vha-directive-1850-02.md`.

**Modified:** `cms-state-operations-manual.md`, `epa-ipm-toolkit-2021.md`,
`src/pages/deficiencies/index.astro`, `src/pages/authorities/index.astro`,
`src/pages/sitemap.xml.ts`, `src/layouts/BaseLayout.astro` (pending-marker
style moved to the base layout so it renders on authority pages),
`OPEN_QUESTIONS.md`.

## Open items

R4-1 live checks and IndexNow · R4-2 Supabase export · R4-3 EPA source ·
R4-4 VHA live re-check and the Run 1 quotation audit · R4-5 sanitary-quote
correction recorded · R4-6 §485.62(b)(4) · R4-7 unsourced figures not
published · R4-8 `last_verified` set by this run · R4-9 Chapter 7, Appendix
W, Subpart H appendix not in the verified set · R4-10 Joint Commission pages
still blocked · R4-11 Form CMS-2567 layout. Full text in `OPEN_QUESTIONS.md`.
