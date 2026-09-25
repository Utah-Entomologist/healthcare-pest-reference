# Corrections Pest Reference

A national authoritative reference mapping U.S. federal, state, and agency pest
control requirements for jails, prisons, and detention facilities. Intended home:
https://correctionspestreference.org. Companion to https://healthcarepestreference.org,
built from the same Astro template and held to the same methodology.

Maintained by Trenton S. Frazer, Board Certified Entomologist (BCE #B3413,
General Entomology specialty), M.S. Entomology, University of Florida.

## Rules carried over from the healthcare reference

- Every quotation is verbatim from the primary source, with its location and read date.
- Nothing is invented. A question the sources have not answered goes in OPEN_QUESTIONS.md
  and on the methodology page's open-questions list, not onto an authority page.
- Licensed or paywalled standards (ACA, NCCHC, association-published jail standards) are
  recorded by identifier only.
- Name form: Trenton S. Frazer. Contact route: the practice email and phone only
  (trent@frazerappliedentomology.com, (801) 477-0223). No street address.
- Deploy rule: real 404.astro; never SPA mode; never a `/* /index.html 200` catch-all.
- Edit Markdown in VS Code, never TextEdit (TextEdit corrupts frontmatter).

## Stack

Astro static site, Markdown content collection with a strict frontmatter schema
(`src/content/config.ts`). `npm run build` also validates JSON-LD and internal links.

## Local development

```sh
npm install
npm run dev
```

## Adding an authority page

1. Put the research record in `research/` (verbatim quotations, URL, read date).
2. Create `src/content/authorities/<slug>.md` following the schema and an existing page.
3. `npm run build` must pass clean.

## Provenance

Built September 24, 2026 from the healthcarepestreference.org template (commit 032dec6),
on branch `corrections-pest-reference` of Utah-Entomologist/healthcare-pest-reference,
pending its own repository. To move it: `git push <new-repo-url> corrections-pest-reference:main`.
