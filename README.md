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
