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
- All ten child services use the light template. Service titles have no inline photos. UI/UX hero illustrations and Branding service photographs are static full-width panels.
- Dots use `ui/DotPattern`: fixed 2px dots, 7px spacing, solid state colors. No opacity/size/position animation. Pause offscreen, in background tabs and for reduced motion.
- Branding hero fills the viewport beneath its 58px header. Corner text matches Helix labels, including glyphs and underline. Design News shows three image cards with dark title text over pastel highlights. The closing scroll section continues the same gray surface.
- Article and Work covers reach the viewport edges. Work breadcrumb says Work. Fact labels use sentence case and medium weight. Work section gaps are compact; Fincart branding composition motion also reaches both edges.
- Article sidebar CTA uses a small dot motif, title, one supporting line and the shared primary action.
- Navbar contrast samples page content while ignoring header/menu/transition overlays. Branding styles must stay scoped to the landing route. Check navigation to and from Branding without refresh.
- Logo tickers own their visual appearance and motion. Generic media reveals must not animate their filters or opacity.
- The five-column blue staircase keeps weighted motion, square corners, subtle inset dividers and opaque edge overlap. The older swipe remains in `backups/page-transition-original`.

## Content phase

Replace placeholders only with verified client, team, outcome, testimonial and editorial approvals. Keep existing slugs stable. Sanity project `50pibtgs`, production dataset, remains in place. Do not treat template completion as content or public-launch approval. Verify form delivery, analytics, redirects and legal content separately from visual checks.
