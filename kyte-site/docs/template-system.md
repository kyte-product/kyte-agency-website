# Website template baseline, 22 October 2026

Template implementation is being closed for a content pass. New layouts require a deliberate design-system decision; routine content edits must use these existing templates.

## Source map

| Area | Source of truth |
| --- | --- |
| Routes and navigation | Root `Kyte_Website_IA.txt` |
| Copy, SEO and proof | Root `Kyte_Website_SEO_Content_Playbook.md` |
| Tokens and visible examples | `src/app/globals.css`, three pages under `src/app/design-system/`, `docs/design-systems/` |
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
- Dots use `ui/DotPattern`: fixed 7px spacing, 3.1px base dots with 1.3× seeded highlight radius; homepage department fields keep 2px base dots. Breathing switches solid fill only. Selection changes travel between motifs; reduced motion skips both effects. Pause breathing offscreen and in background tabs.
- Branding hero fills the viewport beneath its 58px header. Corner text matches Helix labels, including glyphs and underline. Design News shows three image cards with dark title text over pastel highlights. The closing horizontal text section uses Kyte blue.
- Article and Work covers reach the viewport edges. Work breadcrumb says Work. Fact labels use sentence case and medium weight. Work section gaps are compact; Fincart branding composition motion also reaches both edges.
- Article sidebar CTA uses a small dot motif, title, one supporting line and the shared primary action.
- All ten service outcome accordions use ServiceDecisionStory dot panels instead of photographs: five motifs, blue/charcoal/white surfaces, inset dots and unchanged button/region keyboard semantics.
- Child service pages place the five-item outcome story and text-only deliverables directly after Offerings, before the approach section. The shared process follows as a four-stage cascading rail on desktop, with taller collapsed bars, hover expansion, drag/scroll navigation and a stacked tap accordion on mobile. The bars step down and right with clear vertical separation. They alternate Kyte blue and black in both resting and expanded states; expansion leaves the other bars in place. The rail breaks out to the viewport and keeps a shared inset before its first bar and after its last bar. Bottom spacing follows the normal collapsed rail; an expanded bar layers above the following section. Expanded stages use white copy and a small dotted motif in the lower-right corner; black stages use the shared charcoal dot tone. Stage copy comes from mapped published CMS fields with a shared fallback; the template retains four slots and adds no timeline promises.
- Navbar contrast samples page content while ignoring header/menu/transition overlays. Branding styles must stay scoped to the landing route. Check navigation to and from Branding without refresh.
- Logo tickers own their visual appearance and motion. Generic media reveals must not animate their filters or opacity.
- The five-column blue staircase keeps weighted motion, square corners, subtle inset dividers and opaque edge overlap. The older swipe remains in `backups/page-transition-original`.

## Industry pages

- Shared ProductServices is the exact five illustrated cards used on the Product landing. Links have no divider and keep the arrow beside View Service.
- Gray hero placeholders and extra top padding are intentional pending final imagery.
- Two black/blue informative dot cards use page-specific content with no CTA. The approach uses the five-item ServiceDecisionStory accordion. Its illustration panel stays blue while dots travel between abstract motifs.
- Four sourced industry statistics follow the homepage impact-card palette in one horizontal row, text above dots. On smaller viewports the row scrolls without widening the page.
- `src/data/industrySnapshots.ts` owns the facts, date, geography and source. Keep forecasts explicit and wider ecosystem measures distinct from SaaS-only, D2C-only or restaurant-only figures. Recheck before revising values.
- No Design News section or editorial CMS request on industry detail pages.

## Content phase

Replace placeholders only with verified client, team, outcome, testimonial and editorial approvals. Keep existing slugs stable. Sanity project `50pibtgs`, production dataset, remains in place. Do not treat template completion as content or public-launch approval. Verify form delivery, analytics, redirects and legal content separately from visual checks.

## Design-system authorities

See [the three-system index](design-systems/README.md) and [the content guide](content-population.md). Website is the shared foundation; only the exact Branding and Product landing routes apply extensions. The root active design-system marker follows the route. Product art defaults to the additive blue version; original assets remain unchanged and accessible through the shared DS toggle. [Product preservation and rebuild rules](design-systems/product.md) cover both versions.
