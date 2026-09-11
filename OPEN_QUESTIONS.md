# Open Questions

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
