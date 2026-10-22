# Website dot-system release, 22 October 2026

## Publication

- Application PR: https://github.com/kyte-product/kyte-agency-website/pull/55
- Main application commit: `4da73124fbeeccda1339a5438594d65ee7ac4211`
- Project: `kyte-product/kyte-agency-website`, root `kyte-site`, Node 24
- Production deployment: `dpl_B2H8yHVFiQFPZEUecCK522tvtLQS`, Ready
- Live alias: https://kyte-agency.vercel.app
- Immutable application deployment: https://kyte-agency-website-jsvar47e8-kyte-product.vercel.app
- These verification notes follow the application release as documentation only.

## Scope

Homepage portrait work placeholders and impact panel, reusable fixed-size dot artwork, inset dotted Kite CTA, service-cluster cards, lighter type and descriptions, compact corners, footer utility layout, Product approach placement, Branding editorial news rows, fixed inclusion marks, blue active process cards and removal of the generic FAQ intro. Shared service components cover all ten child-service routes. Dot geometry and description roles are documented in AGENTS.md and the design system.

## Verification

Full ESLint, TypeScript, production build (43 routes), whitespace review, desktop light/dark service interactions and 393px/810px layouts passed. All inclusion fields stayed 96px square after activation; every circle retained a 1px radius. The responsive checks found no page or card-content overflow. Local builds retained existing Sanity CDN DNS fallback warnings.

Production checks returned 200 with one H1 on all ten service routes. All included the dot approach and process components, and none contained the removed FAQ introduction. Browser checks confirmed blue active process cards with white text, five homepage project placeholders and four impact cards, visible brand heading, dotted CTA, and eight Branding news rows with populated dates.

No form submissions, CMS mutations or deployment-setting changes were performed. Generated review exports and unrelated illustration-skill edits were excluded.

## Rollback

Previous Ready production deployment: `dpl_8iXurMaDcUyvrYFRYkhvHVEwHNJU`, main commit `2e36baf5e840461a3019deb55756fbe15f9e8c15`, immutable URL https://kyte-agency-website-bp0pya4v0-kyte-product.vercel.app. Restore that deployment through Vercel if rollback is required.

## CTA navigation follow-up

PR #57 (https://github.com/kyte-product/kyte-agency-website/pull/57), main application commit `2da30fb44d685d24087c267df3339693f6dacb7f`, removes obsolete Branding overrides from the shared split CTA. Global Branding padding and background now use the active route marker so hidden cached page DOM cannot leak styles. The design system and AGENTS.md record this rule.

Production deployment `dpl_G34JjnvCRNGrpM4poUwPfZ6Ccv3q` is Ready at https://kyte-agency.vercel.app; immutable URL https://kyte-agency-website-q4kvmcywm-kyte-product.vercel.app. Full lint, TypeScript, 43-route build and whitespace checks passed. Local and production browser regressions passed at 1089px and 393px: Home to Branding to Home, browser Back, and onward to Product Design retained the exact primary CTA styles without a reload, even with cached Branding DOM present.

For a rollback limited to this follow-up, the preceding Ready deployment is `dpl_Dmhdaz9PHQfrcxMxzamjFPt763xB`, main `372c949e1839c0d1a39158f40b544ccae8a768d7`, https://kyte-agency-website-k27x0meio-kyte-product.vercel.app.
