# Healthcare Pest Reference

A national authoritative reference for U.S. healthcare pest control compliance.
Published at https://healthcarepestreference.org.

## What This Is

A reference work mapping federal, state, accrediting body, and recognized
authority pest control compliance requirements for hospitals, critical access
hospitals, skilled nursing facilities, ambulatory surgery centers, hospices,
behavioral health facilities, rehabilitation facilities, and pediatric
facilities. Every requirement anchored to a primary source. Every commonly-
circulated claim that has been investigated and disconfirmed is explicitly
catalogued.

Maintained by Trenton L. Frazer, Board Certified Entomologist (BCE #B3413,
General Entomology specialty), MS Entomology, University of Florida.

## Stack

- **Astro** static site generator
- **Markdown** content with strict frontmatter schema validation
- **Cloudflare Pages** hosting

## Local Development

```sh
npm install
npm run dev
```

Open http://localhost:4321 to preview.

## Adding a New Authority Page

1. Create a new Markdown file in `src/content/authorities/`
2. Use the frontmatter schema defined in `src/content/config.ts`
3. Follow the body structure of existing authority pages
4. Commit and push — Cloudflare Pages rebuilds automatically

Two frontmatter dates carry meaning beyond the page itself:

- `last_verified` — the date the operator last checked the page against the
  primary source. It feeds the citation block, the sitemap `lastmod`, and
  `Article.dateModified`. Leave it out rather than guess; the page will then
  show `[VERIFICATION DATE NOT RECORDED]`. Update it only after a real check.
- `date_published` — the date the page first went live. Feeds
  `Article.datePublished`. Existing pages carry the date of the commit that
  first added them.

## Build Checks

```sh
npm run check     # astro check: type-checks pages, components, and the schema.org builders
npm run build     # astro build, then validates JSON-LD and internal links in dist/
```

Structured data is typed against `schema-dts` (the schema.org vocabulary) at
build time and re-parsed from `dist/` after the build by
`scripts/validate-jsonld.mjs`. `scripts/check-links.mjs` fails the build on
any broken internal link or a page missing from the sitemap.

## Server-Side Code

The site is static except for three Cloudflare Pages Functions in `functions/api/`:

- `subscribe` and `unsubscribe` manage the Regulatory Update Register in Resend
  (contacts only; broadcasts are sent by the operator from Resend).
- `contact` forwards a consulting-page inquiry to the operator by email.

They read their configuration from Pages environment variables. See
`.dev.vars.example` for the full list. Until those are set, the forms report
that they are unavailable; nothing on the site is gated on them.

## Deployment

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for step-by-step deployment
instructions.

## Methodology

See https://healthcarepestreference.org/methodology/ for the source tier
hierarchy, confidence ratings, and the explicit list of investigated-and-
disconfirmed claims.

## License

Content © 2026 Trenton L. Frazer. The reference content is published for
educational and reference use. Citations should be verified against primary
sources for litigation-grade applications.
