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

Typography uses fixed pixel values at three breakpoints: desktop above 1100px, tablet 761–1100px, mobile up to 760px. Display is 80/64/40px; page titles 64/56/40px; section headings 40/36/30px. Heading weight is 450. Card headings are 24px on desktop/tablet and 22px on mobile, body is 16px (weight 425, line-height 1.5), lead 18px, caption 14px and metadata 12px. These text roles do not interpolate with viewport width. DM Sans Variable remains the font family; its name describes the font file, not fluid font sizing. Use one H1. Keep useful metadata visible; decorative eyebrows are omitted. Stacked section title to description is 16px; card title to description is 8px.

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

The shared ImpactCards row accepts a group label. Industry usage defaults to “Industry statistics”; Product uses “Kyte impact numbers.” Existing Kyte homepage/Product figures share `src/data/kyteImpact.ts`. See the Product contract for its list typography and grid-default WorkShowcase configuration.


### Shared section and navigation refinements, 24 October 2026

- Decision-story headings, introductions and contact actions sit above the full-width two-column artwork/accordion layout on service and industry pages.
- Selected Work uses a heading row with a Work action aligned to the shared right inset; narrow screens stack the action below the title.
- Service menu group headings are links. The Services feature is a Fincart case card and the Industries feature is a Design News card, without eyebrow labels.
- About team callouts use a dotted Kyte mark in the top-left content flow; impact cards pair a left dot motif with metric copy.
- Footer utility shows the standalone DesignRush badge and +91 7022603523. Home FAQs appear directly before the closing CTA.
- Insights includes sample Resources and Guides collections while editorial content is being prepared.


### Action arrows, tertiary hover and split introductions, 24 October 2026

All active action arrows use the Lucide `ArrowRight` component. Do not use diagonal arrow glyphs or `ArrowUpRight` in interface actions. Tertiary hover underlines text with a 1px line at a 4px offset; the arrow SVG has no underline border.

Title/description introductions share `.section-intro`, `--section-intro-columns` (1:1.3) and `--section-intro-gap` (26–40px). Both columns align at their top edges. Split descriptions override the stacked h2 + p margin so their top offset is zero. At 760px and below, introductions stack in one column. These rules apply across the three design systems and matching Product, industry, Work, service, client-story and About introductions. Heading/action rows and article fact layouts retain their own structures.


### Consolidated typography, 24 October 2026

Nine shared size roles replace the previous 18-role catalog. Desktop >1100px, tablet 761–1100px, mobile ≤760px. Each pair is font size / line height in pixels.

| Role / token | Desktop | Tablet | Mobile | Default weight / leading |
| --- | --- | --- | --- | --- |
| Display / --heading-display | 80 / 96 | 64 / 76.8 | 40 / 48 | 450 / 1.2 |
| Page / --heading-page | 64 / 76.8 | 56 / 67.2 | 40 / 48 | 450 / 1.2 |
| Section / --heading-section | 40 / 48 | 36 / 43.2 | 30 / 36 | 450 / 1.2 |
| Title / --heading-title | 32 / 38.4 | 28 / 33.6 | 24 / 28.8 | 450 / 1.2 |
| Card / --heading-card | 24 / 28.8 | 24 / 28.8 | 22 / 26.4 | 450 / 1.2 |
| Lead / --type-lead | 18 / 25.2 | 18 / 25.2 | 18 / 25.2 | 425 / 1.4 |
| Body / --type-body | 16 / 24 | 16 / 24 | 16 / 24 | 425 / 1.5 |
| Caption / --type-caption | 14 / 19.6 | 14 / 19.6 | 14 / 19.6 | 425 / 1.4 |
| Metadata / --type-label | 12 / 15.6 | 12 / 15.6 | 12 / 15.6 | 450 / 1.3 |

Actions use Body at weight 450, line height 1.5 and letter spacing 0. Emphasized lead labels may use weight 450. Component leading stays within 1.2/1.3/1.4/1.5/1.6. These are nine size roles with explicit emphasis variants, not nine total possible typography combinations. Branding owns its independent catalog and does not inherit these changes.

| Retired role | Replacement |
| --- | --- |
| Primary action | Body with action emphasis |
| Subtitle | Lead |
| Card copy / large card | Card |
| Type title | Title |
| Fixed / large section | Section |
| Feature | Page |
| Fixed / large display | Display |
| Separate mobile heading aliases | Responsive Page / Section |

Retired token definitions and active references are removed. The style contract guard rejects their reintroduction outside the independent Branding token snapshot.

### Registered colors and icons

Interface color literals resolve through palette/detail tokens. Exact client artwork, scene backplates, masks and shadow values remain registered in color-register.json. Contact success uses Lucide Check; decorative Branding glyphs are scoped to its own system. Root UI corner defaults are 2px.


### Shared motion coverage, 24 October 2026

Root layout mounts one SiteRevealMotion and one TextRevealMotion. Plain text/media use the shared entry reveal; explicit data-reveal-words content uses the word controller on every route. Custom Branding/About/case-study scenes and DS reference pages opt out of generic entry animation. Logo tickers preserve their own treatment. Reduced motion keeps text readable, observers cover streamed content, and route cleanup cancels pending animations. Parent content blocks with their own paragraph/media children avoid duplicate reveal.
