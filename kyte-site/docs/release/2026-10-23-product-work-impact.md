# Product work, impact and dot-mark follow-up

23 October 2026. Owner: Kyte website team. Status: merged and verified Ready in production.

## Scope

- Restore Product Selected Work’s existing list/grid control with grid as the initial view.
- Increase Product-only list text to 24–30px desktop and 22px mobile, metadata to 18px desktop/16px mobile. Keep tablet metadata beneath its text instead of overlapping the image.
- Restore four Kyte impact cards beneath the approach introduction, using the shared industry impact-card design and responsive rail. Existing homepage figures are 100+ projects, 50+ clients, 3M+ views in one year and 200M+ impressions. `src/data/kyteImpact.ts` now supplies both pages’ values. Industry data stays separate. Existing editorial proof requirements remain unchanged.
- Replace four interactive-framework icons and six How We Work Together icons with shared breathing dot fields. Keep names, written outcomes, keyboard tabs, stage movement, offscreen pause and reduced motion. Node sizing and offsets fit the larger dot fields.
- Update the Product browser design system, Website/Product contracts, IA, template notes, content guide and root progress.

## Checks

Production build with CMS access, ESLint, TypeScript, preservation/design-system guards, source import audit and whitespace checks passed. Targeted browser checks: 33 checks at 320/393/810/1440px, zero failures or uncaught exceptions. Checked initial grid, list/grid switching, larger list type, tablet metadata separation, all metric values, all ten dot fields, four framework stages and ArrowDown keyboard behavior. No horizontal page overflow. Four additional Home/Fintech checks at phone and desktop widths confirmed their existing values and layout remain intact. Desktop/tablet/phone screenshots were inspected.

Evidence: [targeted check results](../audits/2026-10-23-product-followup/checks.json), [desktop grid](../audits/2026-10-23-product-followup/grid-1440.png), [tablet list](../audits/2026-10-23-product-followup/list-810.png), [Kyte impact row](../audits/2026-10-23-product-followup/impact-1440.png), [phone framework](../audits/2026-10-23-product-followup/framework-393.png).

Working-principle evidence: [six dot grids](../audits/2026-10-23-product-followup/working-principles-1440.png). Shared regression: [Home and industry](../audits/2026-10-23-product-followup/shared-impact-regression.json).

## Publication

Branch: `codex/product-work-impact-followup`. Existing Vercel team/project: `kyte-product/kyte-agency-website`. Public alias: https://kyte-agency.vercel.app. No CMS writes, new result claims, form submissions or launch setting changes.

Verified previous Ready rollback: `dpl_7oSCqTyeXuuAEHoXdd9sv9p7rkyW`, https://kyte-agency-website-i84l84omj-kyte-product.vercel.app. 

- Application PR: [#66](https://github.com/kyte-product/kyte-agency-website/pull/66), merged after successful preview checks on head `e61e068cb72cecdd2f1737debab55eb2df44b850`.
- Merge revision: `c02965ccc8c4f9c5da718230739c979c64d883c8`.
- Ready production deployment: `dpl_Bri3qAAhJxHgprgANSRQCTmyfgCq`, https://kyte-agency-website-kkiyzn5wp-kyte-product.vercel.app, assigned to https://kyte-agency.vercel.app.
- [Deployment and rollback evidence](2026-10-23-product-work-impact/deployment.json).
- [Live browser checks](2026-10-23-product-work-impact/live-checks.json) passed: grid default, list switch and 30px desktop text, all four Kyte values, four framework and six working-principle dot fields, framework selection, no page overflow or browser exceptions.
- [Live impact cards](2026-10-23-product-work-impact/live-impact.png).

This final publication record is a documentation-only follow-up; its merge may trigger another deployment of the same verified application code.
