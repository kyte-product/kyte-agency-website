# Product work, impact and dot-mark follow-up

23 October 2026. Owner: Kyte website team. Status: verified locally, user-authorized GitHub/Vercel release pending.

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

Verified previous Ready rollback: `dpl_7oSCqTyeXuuAEHoXdd9sv9p7rkyW`, https://kyte-agency-website-i84l84omj-kyte-product.vercel.app. Exact new PR, merge revision and Ready deployment will be added after publication.
