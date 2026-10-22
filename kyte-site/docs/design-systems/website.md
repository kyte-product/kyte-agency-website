# Website design system

Current: 23 October 2026. Browser reference: `/design-system`. Registry: `src/data/designSystems.ts`.

## Scope and inheritance

This is the shared foundation for Home, all ten child services, four industry details and their index, Work/case studies, Insights/collections/articles, About, careers, contact and legal pages. Branding and Product landing extensions are documented in [Branding](branding.md) and [Product](product.md). Their children do not inherit their landing-only visual overrides.

## Tokens and layout

Authority: `src/app/globals.css`.

| Role | Token / value | Use |
| --- | --- | --- |
| Brand / hover | `--color-blue: #0249d9`; `--color-blue-hover: #013bb0` | Primary actions, links, active icons, focus |
| Ink / black / charcoal | `#1a1a16`, `#050505`, `#171717` | Text and dark surfaces |
| White / section | `#ffffff`, `#f8f8f7` | Page and quiet section separation |
| Description | `--description-color: #757573` | Supporting body text |
| Description on black / blue | `#bdbdbd`, `#dce7ff` | Supporting copy on contrasting surfaces |
| Placeholder | `#e7e8ea` | Intentional pending media |
| Content frame | `--page-max: 1344px`, `--page-gutter: 16px`, `--section-inset: clamp(20px,2.4vw,32px)` | Align first/last meaningful content edges |
| Corners | 2px outside Branding landing | UI controls and content cards; preserve authored illustration geometry |

Typography is DM Sans Variable. Display: 50–80px, page title: 42–64px (36–42 mobile), section: 30–40px (28–34 mobile), card: 22px. Heading weight 450. Body: 16px, weight 425, line-height 1.5. Lead: 18px, line-height 1.4. Caption 14px, metadata 12px. About and constrained article/contact headlines have local scale rules. Use one H1. Keep useful metadata visible; decorative eyebrows are omitted. Section title to description is 16px; card title to description is 8px.

Covers/backgrounds and designated hero artwork can span the viewport. Reading text and forms retain narrower measure. Carousels expose a viewport-wide window while the first and final items keep content insets. Horizontal rails must not increase page width.

## Shared components and recent decisions

| Pattern | Current behavior | Source |
| --- | --- | --- |
| Header / menu | Shared links, desktop disclosure, mobile/touch menu, destination-aware contrast and focus management | `SiteHeader.tsx` |
| Actions | Blue primary; inline tertiary arrow; clear hover and focus. Landing-only editorial oval actions stay scoped | `globals.css`, `branding-marketing-actions.css` |
| Home project rail | Ink section title; five supplied 3:4 covers and wider four-card impact panel; normal scroll drives horizontal progress, native rail for reduced motion | `HomeProjectScroll`, `ImpactCards` |
| Home department cards | Restored original sparse field treatment and 2px base dots | `ServicesIntro` |
| Service outcomes | Five-item accordion with one mounted SVG; dots travel between motifs when the selection changes | `ServiceDecisionStory` |
| Service approach | Compact inclusion accordions with visible active copy and shared controls | `ServiceApproach` |
| Deliverables | Nine text-only items, no card frames | `ServiceDeliverables` in `ServiceDecisionStory.tsx` |
| Service process | Four diagonally cascading bars; alternating blue/black at rest and expanded; mouse hover or keyboard focus expands; small lower-right motif; no large number or info icon | `ServiceOurProcess`, `processSteps.ts` fallback |
| Industry opportunity | Informative black/blue cards; page-specific copy; no extra CTA or dotted-art frames | `IndustryEditorialExperience` |
| Industry approach | Five-item panel remains blue with dot-to-dot selection transitions | `ServiceDecisionStory`, `blueOnly` |
| Industry statistics | Four horizontal cards, source/date/geography/forecast context retained; responsive native rail | `industrySnapshots.ts`, `ImpactCards` |
| ProductServices | Same five illustrated cards on Product landing and industries; inline View Service link, no divider | `ProductServices` |
| Article sidebar | Small dotted Kite aligned to card padding; charcoal gray/blue tone; sticky rail itself does not scroll, only overflowing topic list does | `ArticleTopics`, `EditorialPages.css` |
| Work / article cover | Full viewport width; sentence-case fact labels; compact case-study spacing | `CaseStudyTemplate`, `EditorialPages.css` |

Child service order is Hero → What We Offer → Outcomes → Deliverables → Approach → Process → Work → Testimonials → FAQ. Branding child heroes are gray placeholders; UI/UX service heroes retain their artwork. Industry Design News is removed. Service content reads published Sanity with local fallback. A template must use mapped CMS fields instead of silently replacing them with hardcoded copy.

Desktop process bars are 78px tall; vertical step spacing clamps to 82–112px; active height starts at 360px and grows to fit the mapped copy. The first card aligns with the content inset. Hover changes the rail's paint area and applies an equal compensating bottom margin, so expanded content is visible while the document footprint follows the normal state. Other bars do not move. The rail's horizontal extent stays constant on expansion. At <=780px, four cards are a vertical tap accordion in normal flow. No inner vertical scrollbar is used for process content.

## Dot geometry and motion

Use `ui/DotPattern.tsx` and its CSS for every new dot field. Current implementation uses a 7px grid, 1.55px base radius (3.1px diameter), and 1.3× radius for seeded compositions (about 4.03px diameter). The two homepage department fields retain a 1px base radius. Resizing changes rows and columns, not the spacing or scale of the whole SVG. The Kite follows the approved mark silhouette. Curated motifs replace rejected geometry globally; stable item/page seeds distribute motifs within a group. Decorative graphs imply no measured business data.

| Surface | Resting dots | Highlights |
| --- | --- | --- |
| White | `#dce0e8` | Kyte blue |
| Blue | `#3260d3` | White |
| Charcoal | `#373a40` | Kyte blue |

A selected subset switches solid fill in a five-second cycle. The rest geometry stays fixed while breathing. Selection-driven rearrangement is a separate effect: a 580ms eased movement with stagger, settled within 900ms. Offscreen and background tabs pause breathing. Reduced motion disables both effects. No framing borders around the art.

## Motion, accessibility and resilience

- One Locomotive controller owns smoothing; reduced motion uses native scrolling. Clean up all listeners, observers, timelines and frame loops on exit.
- Shared text/media entry motion skips custom choreographies. Client-logo rows retain their own opacity/filter from first paint.
- Blue five-column staircase transitions use opaque overlap and subtle dividers. Header contrast ignores the transition wrapper. Active route markers control local styles even when Next retains hidden cached DOM.
- Keyboard focus remains visible. Icon-only controls require labels. Accordions and tabs connect controls to panels and hide inactive content correctly. Decorative media do not add keyboard stops.
- Forms need labels and useful validation/error/pending states. Validation is not a delivered lead.
- Test 320/393/810/1440px plus short laptop heights, reduced motion, Back, anchors, menu and navigation to/from Branding. Component breakpoints follow content limits; there is no forced single breakpoint for every component.

## Content ownership and limitations

See [content population](../content-population.md). Gray media, stock images, sample rating blocks, phone/brochure placeholders and placeholder careers remain deliberate editorial work. Keep approval/status distinctions visible. Public launch still needs verified forms, analytics, redirects and legal/content approval. Do not turn template completion into a claim of content readiness for public launch.

The resting background grid uses one SVG pattern and rectangle per field, with unique IDs; only colored/breathing motif dots remain individual elements. Grid origin, 7px pitch, radii and tone variables remain unchanged. Before/after crops are compared in the release audit. Narrow process panels measure natural copy height and reserve the lower-right artwork; mobile panels grow in normal flow.

## Homepage cover assets

The five supplied 900 × 1200 PNGs from `Case Study/Covers/6.png` through `10.png` are displayed in numeric order: Fincart product, Maya launch, Fincart website, Smash Guys and Dr. Prashant Katkol. WebP derivatives live in `public/images/work/home-covers/`; `manifest.json` records source checksums. Preserve the full 3:4 artwork with contain sizing, useful alt text and lazy responsive images. Source files remain untouched. These supplied images include authored outcome text; this change does not establish independent verification of those claims.

Cover derivative filenames include their source number (6–10), so replacing older artwork cannot reuse stale optimized image URLs. The homepage Selected Work heading uses `--ink`, following the final user direction.
