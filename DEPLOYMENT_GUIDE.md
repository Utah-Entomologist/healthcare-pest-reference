# Deployment

- Build: `npm run build` (Node 20+). Output: `dist/`.
- The site is static. No functions, no forms, no analytics tokens.
- Host requirements: serve `dist/404.html` with status 404 for unknown paths; honor
  `public/_redirects` for the www-to-apex rule only. Never enable SPA fallback.
- v0.1 was deployed September 24, 2026 as a static upload of `dist/`. When the domain
  correctionspestreference.org is registered, attach it to the host as the primary domain.
