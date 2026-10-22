# Website template baseline, 22 October 2026

Template implementation is being closed for a content pass. New layouts require a deliberate design-system decision; routine content edits must use these existing templates.

## Source map

| Area | Source of truth |
| --- | --- |
| Routes and navigation | Root `Kyte_Website_IA.txt` |
| Copy, SEO and proof | Root `Kyte_Website_SEO_Content_Playbook.md` |
| Tokens and visible examples | `src/app/globals.css`, `src/app/design-system/page.tsx` |
| Header and route lifecycle | `SiteHeader`, `PageTransition`, `SiteSmoothScroll`, `SiteRevealMotion` |
| Home | `src/app/page.tsx`, shared Home components |
| Product landing | `src/app/ui-ux-design-development/` |
| Branding landing | `src/app/branding-marketing/`, `components/branding/` |
| Ten child services | `ServiceDetailTemplate`, UX audit branch in `[...slug]/page.tsx`, `servicePages` and `service-content` |
| Work | `work/[slug]`, Fincart story components, Collectbee `CaseStudyTemplate` |
| Articles | `insights/[slug]`, `EditorialBody`, `ArticleTopics` |
| CMS | `src/lib/sanity.ts`, `src/lib/editorial.ts`, `cms/studio/` |

## Shared rules

- DM Sans, shared heading/body roles and Kyte blue. Standard controls and cards use 2px corners. Branding landing retains its approved editorial typography and oval actions.
- All ten child services use the light template. Service titles have no inline photos. UI/UX hero illustrations remain full-width panels. Branding & Marketing child-service hero areas use the standard gray placeholder while final imagery is pending.
- Branding & Marketing child-service hero areas use full-width gray placeholders with the existing media height and spacing while final hero imagery is pending. Product and UI/UX hero media keep their current approved art.
- Dots use `ui/DotPattern`: fixed 2px dots, 7px spacing, solid state colors. No opacity/size/position animation. Pause offscreen, in background tabs and for reduced motion.
- Branding hero fills the viewport beneath its 58px header. Corner text matches Helix labels, including glyphs and underline. Design News shows three image cards with dark title text over pastel highlights. The closing horizontal text section uses Kyte blue.
- Article and Work covers reach the viewport edges. Work breadcrumb says Work. Fact labels use sentence case and medium weight. Work section gaps are compact; Fincart branding composition motion also reaches both edges.
- Article sidebar CTA uses a small dot motif, title, one supporting line and the shared primary action.
- All ten service outcome accordions use ServiceDecisionStory dot panels instead of photographs: five motifs, blue/charcoal/white surfaces, inset dots and unchanged button/region keyboard semantics.
- Navbar contrast samples page content while ignoring header/menu/transition overlays. Branding styles must stay scoped to the landing route. Check navigation to and from Branding without refresh.
- Logo tickers own their visual appearance and motion. Generic media reveals must not animate their filters or opacity.
- The five-column blue staircase keeps weighted motion, square corners, subtle inset dividers and opaque edge overlap. The older swipe remains in `backups/page-transition-original`.

## Industry pages

- Shared ProductServices is the exact five illustrated cards used on the Product landing. Links have no divider and keep the arrow beside View Service.
- Gray hero placeholders and extra top padding are intentional pending final imagery.
- Two black/blue informative dot cards use page-specific content with no CTA. The approach uses the five-item ServiceDecisionStory accordion. Its illustration panel changes abstract dot motifs across blue, charcoal and white surfaces.
- Four sourced industry statistics follow the homepage impact-card palette in one horizontal row, text above dots. On smaller viewports the row scrolls without widening the page.
- `src/data/industrySnapshots.ts` owns the facts, date, geography and source. Keep forecasts explicit and wider ecosystem measures distinct from SaaS-only, D2C-only or restaurant-only figures. Recheck before revising values.
- No Design News section or editorial CMS request on industry detail pages.

## Content phase

Replace placeholders only with verified client, team, outcome, testimonial and editorial approvals. Keep existing slugs stable. Sanity project `50pibtgs`, production dataset, remains in place. Do not treat template completion as content or public-launch approval. Verify form delivery, analytics, redirects and legal content separately from visual checks.
