# UI/UX landing page illustration plan

Status: first scene reviewed; evolving-experience card built for the next local review, 19 October 2026. Owner: Kyte website team.

## Target

Bring every editorial illustration on `/ui-ux-design-development` to the construction quality of the current hero, product orbit, and laptop scenes. Use the `kyte-isometric-art` skill and its Goodface reference library. Each scene should communicate its own card or section, while sharing camera discipline, rounded contours, opaque neutral depth, inset pale seams, clipped local color fields, and an inner white perimeter wash. Goodface references guide geometry, density, and material treatment; final artwork is built as editable Kyte geometry.

The hero and the first two product-moments cards are the comparison standard. Client logos, project photography, and small functional Lucide interface icons serve different roles in the page.

## Page inventory

| Page area | Current artwork | Action |
| --- | --- | --- |
| Hero | Custom Hairline scene with projected HTML interface faces | Retain as master style and check that later work stays consistent |
| Product moments, cards 1–2 | Custom orbit and laptop | Retain as scale, color, and detail benchmarks |
| Product moments, cards 3–4 | Two custom static SVG scenes from shared geometry | Third card reviewed; fourth curved-route scene awaits review at its measured card ratio |
| Framework | CSS staircase of nodes and connectors | Refine the existing four-state interaction using measured geometry and the same material hierarchy |
| Product stages, eight cards | Three reference-driven SVGs, then five simple inline drawings | Review all eight; rebuild the five drafts individually at the 176 × 128 display scale, then correct any mismatch among the first three |
| UI/UX services, five cards | All five service cards have custom SVGs | Review the eCommerce candidate before further changes |
| Explore, three cards | Oversized Lucide icons above blurred gradient blocks | Replace with three small editorial scenes tied to work, insights, and team |
| What we design, six cards | Four Hairline presets reused across six topics | Build six distinct concept-specific scenes |

This is 20 new scenes plus a four-state framework refinement and a review of the three existing stage SVGs. The large cards get richer structures and composed interface faces. The small stage cards stay complete, centered, and sparse, usually two or three forms with one color focal point.

## Scene queue and primary references

Build and review one row at a time. Reference IDs refer to `.agents/skills/kyte-isometric-art/references/goodface-reference-library.md`; the live source is [Goodface Fintech UX/UI](https://fintech.goodface.agency/services/fintech-ux-ui-design-agency).

| Order | Kyte scene | Meaning and construction direction | Primary Goodface reference |
| --- | --- | --- | --- |
| 1 | Product moments: complex work | A coherent product system: several neutral modules and one colored decision object linked by a clear shared plane. Avoid a generic analytics dashboard. | UI 6, with UI 5 for solid depth |
| 2 | Product moments: evolving experience | A complete continuous white route changes direction around one colored sphere. Shared material and continuity convey evolution. | UI 7, with UI 11 as conceptual context |
| 3 | Framework: four steps | Preserve the interactive staircase and active-stage behavior; redraw steps, junctions, and background color as a unified scene. Check all four selected states. | Live four-step framework image and interaction |
| 4 | Product stages: complex internal tools | Two or three nested neutral system blocks with one colored core, centered with full silhouette visible. | UI 6 and UI 10 |
| 5 | Product stages: commerce journeys | One compact neutral route and one colored transaction/product form moving along it. | UI 11 |
| 6 | Product stages: web platforms | A tiny coherent screen-and-deck solid with one clipped interface field, not a loose screen icon. | UI 15, simplified for mini scale |
| 7 | Product stages: internal systems | A small hub joining two or three thick neutral arms with one colored segment. | UI 14 |
| 8 | Product stages: connected brands | A colored prism fitted among a small family of white solids. | UI 10 |
| 9 | Product stages: first three | Compare New products, Growing platforms, and Established services as one row for weight, size, centering, gradient richness, and full silhouettes. Refine individually where needed. | UI 9 and relevant supplied mini references |
| 10 | Services: UX research and audits | A measured evidence or decision structure with one colored finding at its center. | UI 5 and UI 9 |
| 11 | Services: website design and development | A screen with neutral depth and a separately authored page interface face; keep it visually distinct from the carousel laptop. | UI 12 and UI 15 |
| 12 | Services: mobile app design | Thick white handset with one floating colored interaction card and consistent projected controls. | UI 13 |
| 13 | Explore: projects | A small stack of case surfaces with one colored lead surface. | UI 8 |
| 14 | Explore: design news | A concise editorial page/card construction with a colored focal field. | UI 12 |
| 15 | Explore: about Kyte | A small connected set of neutral forms with one shared colored core, conveying a team. | UI 14 |
| 16 | What we design: onboarding | Clear entry gates and a colored object moving through them. | UI 2 |
| 17 | What we design: navigation | A shallow branching route with one readable colored path. | UI 7 |
| 18 | What we design: dashboards | A compact data surface whose chart UI is authored flat first and projected onto the face. | UI 15 |
| 19 | What we design: websites | Layered page surfaces on one camera, with one clipped colored panel. | UI 12 |
| 20 | What we design: design systems | Repeatable neutral components around a colored prism or token. | UI 10 |
| 21 | What we design: responsive products | The same interface content on two measured device faces sharing one projected ground plane. | UI 8 and UI 13 |

## Required workflow for each scene

1. **Reference and brief:** Save a working reference outside the portable skill. Record source URL or supplied screenshot, target display size, message, object list, camera axes, depth order, color geography, and 5–10 normalized anchors. Measure before drawing.
2. **Structure pass:** Draw the complete silhouette in one camera with white faces, one opaque neutral depth band, a shared rounded outer contour, and light inset seams. Review this monochrome pass against the reference at equal size. Resolve camera, crop, and overlaps before adding detail.
3. **Face pass:** For any scene with several controls, charts, labels, or cards on one planar face, create a separate flat HTML/CSS or SVG face template at its real aspect ratio. Review its layout flat, then project the finished face onto its measured plane. Keep small symbolic scenes simple.
4. **Color pass:** Clip a base field and several local colored fields inside exact shapes. Blur transitions within the clip, then add a soft white wash around the inner perimeter. Keep neutral faces opaque and gradients off their exteriors.
5. **Comparison and page pass:** Compare structure and final art with the reference side by side, as an opacity overlay, and in difference mode. Review at full size and at the actual card size in the page. Check centering, full silhouette, corner radii, contour weight, seam gaps, perspective, gradient richness, and any interactive states.
6. **Review gate:** Show the source reference, structure pass, final art, and in-page screenshot for **one** scene. Record the specific feedback. Move to the next row only after the user approves that scene. Update `WEBSITE_PROGRESS.md` after each reviewed change.

Keep scene source and generated output together under `kyte-site/hairline/` for complex projected scenes or `kyte-site/public/product-stage/` for small static SVGs. Use one scene-specific component reference in the page. Avoid recycling a preset or one illustration across unrelated concepts.

## First review target

Start with row 1, “When the work gets complex.” Its current third carousel card visibly uses the Hairline `Plot` preset, so it is the clearest large-scale fidelity gap after the two approved cards. Prepare its Goodface UI 6 reference capture and measurement sheet, then build and compare that single scene before changing the fourth card.


The first scene now uses one geometry model to generate both the structural bench and the final static SVG. Its rounded silhouette clips all material before the final contour is drawn. The skill includes this tested construction example and a rendered tinted-spill checker. See `exports/complex-system-rebuild-audit.md` for the diagnosis. The third card was reviewed by the user. The fourth curved-route scene now awaits review; all further scenes remain pending.


## Research service card review, 19 October

Step 10 is implemented as a local review candidate. The first service card uses a two-form decision-platform adaptation from Goodface UI 5, with a projected original Lucide Search mark identifying the research context. Full details and check evidence are in `exports/research-audit-brief.md`. The first card was reviewed at desktop, tablet, and phone sizes. Wait for the user’s review before step 11; the other four service artworks have not changed.


## Website service card review, 20 October

The user requested step 11 after reviewing the research card. Website design & development now uses a custom layered browser/component scene, with separately authored HTML/CSS faces projected onto measured slabs. Flat, neutral, final, and responsive card views were checked. Reference, source split, and validation evidence are in `exports/website-design-brief.md`. Wait for this review before step 12. Other service illustrations remain unchanged.


## Mobile app service card review, 20 October

The user requested step 12 after reviewing the website card. The third service card now uses a custom shallow handset, floating pink-violet interaction, and circular-control scene adapted from Goodface UI 13. Separate flat HTML faces are projected through one camera. Checks and review evidence are in `exports/mobile-app-brief.md`. Wait for user review before continuing; other service illustrations remain unchanged.

## SaaS service card review, 20 October

The user requested only SaaS & web app design after the mobile card. The fourth service card now uses a custom workflow workspace and floating analytics panel with separate flat HTML/CSS interfaces mapped onto measured rounded planes. The scene uses shared perspective, neutral depth, clipped mint/cyan and pink/violet fields, an original Lucide chart icon, and a fading floor. Flat, structure, final, desktop and responsive iframe views passed review checks. See `exports/saas-web-app-brief.md`. Await user review before any further scene.

## eCommerce service card review, 20 October

The user requested only the final service card after SaaS. eCommerce & Shopify websites now uses a custom product storefront and separate checkout surface, with independently designed HTML layouts projected through one camera. Warm product colors, mint checkout detail, original Lucide ShoppingBag icons, white faces, neutral rounded depth and a fading floor follow the updated skill. Flat, neutral, final, desktop and 810/390 px responsive frame checks are complete. See `exports/commerce-brief.md`. Await user review; no other illustration was changed.

## Complex internal tools mini review, 20 October

After the services sequence, the user requested only Complex internal tools in the product-stage grid. Its old block pair is replaced with a two-form miniature: a neutral rounded hexagonal foundation and a mint/cyan control panel, with original projected Lucide sliders. This uses the small-symbol Goodface references, transparent framing, complete silhouettes, and no dense UI. Geometry, materials, desktop and responsive views are checked. `exports/stage-tools-brief.md` records the implementation and evidence. Await user review before another stage symbol.

## Commerce journeys mini review, 20 October

The user requested only Commerce journeys after the internal-tools symbol. Its old tile/platform is replaced with a custom cart tile floating above a rounded white checkout slab, adapted from Goodface’s small EMI/payment-surface composition. Two complete forms, original projected Lucide cart, warm contained color, neutral depth, sparse checkout placeholders and transparent framing suit the miniature role. Desktop and 810/390 px image framing, structural/code and containment checks passed. See `exports/stage-commerce-brief.md`. Await user review before another symbol.

## Web platforms mini review, 20 October

The user requested only Web platforms after Commerce journeys. The sixth symbol now uses a rounded white browser with a projected original Lucide Globe and one pink-violet sphere, adapted from Goodface’s neutral-structure/colored-sphere mini family. Two forms, transparent framing, neutral depth and contained local color suit the miniature role. Neutral/final renders, desktop and 810/390 px image framing, code and default containment checks passed. See `exports/stage-web-brief.md`. Await user review before another symbol.

## Internal systems mini review, 20 October

Only the seventh product-stage symbol was requested next. Internal systems now uses three rounded, aligned system layers: two white foundations and one cool-colored workflow tile with an original Lucide glyph. The Goodface layered-surface reference informed its shared perspective and neutral/color treatment, adapted to the mini-symbol role. Transparent framing, neutral/final renders, desktop and 810/390 px image framing, code and containment checks passed. See `exports/stage-systems-brief.md`. Await user review before the final stage symbol.

## Connected brands mini review, 20 October

Only Connected brands was requested next. The final stage symbol now uses two neutral white touchpoint tiles joined by a warm rounded link with the original Lucide Link2 glyph. Three complete forms share one camera, rounded neutral depth and clipped color. Desktop and 810/390 px image framing, neutral/final renders, code and default containment passed. See `exports/stage-brands-brief.md`. All eight stage roles now have dedicated SVG art; this candidate awaits user review.

## First three product-stage mini illustrations, 20 October

The user confirmed revising all three sequentially. New products now uses a lifted mint idea tile on a white cylinder; Growing platforms uses three ascending forms with a pink-violet growth accent; Established services uses a confirmation medallion on a white hexagonal foundation. Each was built and inspected before the next. Their 160 × 128 framing, perspective, neutral depth, contours, bounded fields and complete silhouettes now match the updated mini family. Standalone and actual-page desktop/810/390 px review, code/geometry and containment checks passed. See `exports/first-three-stages-brief.md`. Await user review.


### 20 October: Complete stage set reviewed

All eight stage mini illustrations now share one contain frame and balanced camera scales. Reviewed desktop 1280 px and actual-route tablet/phone 810/390 px. Fixed mobile card-width overflow; all silhouettes and wrapped labels fit. Contours and clipped material treatment remain consistent. See `exports/stage-group-audit.md`. Ready for user review, local only.


### 20 October: Five services illustrations reviewed together

Balanced Research, Website and Mobile camera scales, matched neutral depth, and unified contain framing across both desktop rows and tablet layouts. All five reviewed at 1280/810/390 px with complete silhouettes, centered artwork, consistent contours and contained gradients. See `exports/services-group-audit.md`. Ready for user review, local only.


### 20 October: Onboarding and activation review candidate

Replaced only the first What we design illustration with a detailed setup workspace, profile form, completion card and task checklist above a shared milestone track. Separate HTML faces, editable Hairline geometry, clipped blended fields and fading floor. Reviewed 1280/810/390 px, neutral/final, XML/code and default containment. See `exports/onboarding-brief.md`. Pause here for user review.


### 20 October: Navigation and information architecture review candidate

Only the second What we design card now has a detailed sitemap with measured branch connectors, nested navigation, selected page and layered content previews. Four HTML faces, one camera, clipped fields, neutral rounded thickness and fading floor. Flat/neutral/final, desktop/810/390 px and code/containment checks passed. See `exports/navigation-brief.md`. Pause for user review.


### 20 October: Dashboards and complex workflows review candidate

Only the third outcome card uses a physical circular console with dashboard data, connected intake/routing/completion modules and stacked task sheets. Detailed top faces replace upright-screen repetition. Flat/neutral/final, desktop/810/390 px and geometry/code/adjusted containment checks passed. See `exports/workflow-hub-brief.md`. Pause for user review.


### 20 October: Websites and content journeys review candidate

Only the fourth outcome card now uses a folded editorial spread with connected resource and action tiles. Detailed discovery/article layouts sit on true sloped planes, with a shared rounded solid clip, quiet seam, contained fields and fading floor. Flat/neutral/final, desktop/810/390 px, code and default containment checks passed. See `exports/content-journey-brief.md`. Pause for user review.


### 20 October: Design systems and interface patterns review candidate

Only the fifth outcome card now has an exploded component assembly, from foundation grid to controls and an assembled pattern, plus a type/color specimen rail. Shared perspective, separate face layouts, contained fields and fading floor. Flat/neutral/final, desktop/810/390 px and code/adjusted containment checks passed. See `exports/design-patterns-brief.md`. Pause for user review.


### 20 October: Responsive product experiences review candidate

Only the sixth outcome card now uses a monitor, tablet and phone sharing one product interface that reflows across sizes. Detailed measured faces, one perspective, neutral rounded device depth, contained fields and fading floor. Flat/neutral/final, desktop/810/390 px, code and default containment checks passed. See `exports/responsive-experience-brief.md`. Pause for user review.


### 20 October: UX research and design audit service hero review candidate

Beginning the service-page heroes one at a time. Research now uses a large evidence board with affinity clusters and themes, interview notes, usability review, journey map and prioritised findings. Shared geometry, five flat faces, contained fields and fading floor. Reviewed desktop/810/390 px and passed geometry/code/adjusted JPEG containment. See `exports/research-hero-brief.md`. Pause for user review before the next service hero.


### 20 October: Website design and development service hero review candidate

Only the website service hero now uses a connected assembly of large content/development blocks, browser on a platform, layered page and circular publishing hub. Tubes and raised paths visibly connect the structures. Larger UI fields/icons and simpler layout bars follow the user’s direction. Reviewed the live Goodface website hero and approved Kyte hero, then flat/neutral/final, desktop/810/390 px and code/adjusted JPEG containment. See `exports/website-hero-brief.md`. Pause for user review.


### 20 October: Mobile app design service hero review candidate

Only mobile-app-design now has a low diagonal handset and large floating interaction tile connected to round identity, arched notification and hexagonal completion structures. Simpler large face content, shared geometry, contained fields and fading floor. Live Goodface banking hero, flat/neutral/final, desktop/810/390 px and code/adjusted JPEG containment reviewed. See `exports/mobile-hero-brief.md`. Pause for user review.


### 20 October: SaaS and web app design service hero review candidate

Only the SaaS service hero now uses a stepped workflow table with three large colored lanes, joined to automation, shared data and completed tasks. Broad icons and simple UI, shared geometry, rounded neutral thickness and fading floor. Flat/neutral/final, desktop/810/390 px and code/adjusted JPEG containment passed. See `exports/saas-hero-brief.md`. Pause for user review.


### 20 October: eCommerce and Shopify Websites service hero review candidate

Only the commerce service hero now uses a covered storefront with large product fields, checkout terminal, parcel and order-confirmation tile joined by raised tracks. Distinct reverse-camera composition, simple UI, rounded neutral depth and fading floor. Live Goodface website construction, flat/neutral/final, desktop/810/390 px and code/adjusted JPEG containment reviewed. See `exports/commerce-hero-brief.md`. Pause for user review.


### 20 October: Five service heroes reviewed together

Balanced visible heights to about 460 SVG units, shared all five frame styles, simplified research UI and added occluded tube links, and widened the commerce composition with longer receiving bridges. Final/neutral family and all 15 actual-route desktop/tablet/phone layouts reviewed. Geometry, code and uniform rendered containment passed. See `exports/service-heroes-group-audit.md`. Local review candidate; pause for user review.


### 20 October: Commerce hero rework for review

Replaced the covered storefront with an upright catalogue, broad checkout surface, parcel and circular confirmation hub linked by raised tracks. Large simple UI, shared rounded geometry and contained gradients remain. The eCommerce text hero is now white and its image section has square corners. Reviewed actual desktop/810/390 px pages, flat UI dimensions, geometry and rendered containment. This supersedes the previous commerce scene and its family-audit measurements. See `exports/commerce-rework-brief.md`. Local candidate; pause for user review.


### 20 October: projected brand logos and website follow-up

Four service heroes now carry the requested authentic brand paths and color variants: Shopify; Framer/Webflow/WordPress/Sanity; Figma/Claude on Mobile and SaaS. User clarified “Cloud” as Claude. Webflow is on a measured top face of the website development cube. The Framer assembly has two bars and one proportionately sized action. Final standalone/family and actual routes reviewed; XML, Hairline and rendered containment passed. Local only; user review next.


### 20 October: reusable Our Process family, Discover review

Plan: Discover, Define, Develop, Deliver as four generic reusable illustrations, developed sequentially. Discover is the first review candidate: magnifying lens with soft mint/cyan glass over two white evidence cards. Integrated into the shared first process step. Detailed contours and depth, sparse content at actual card size. Desktop/390 px, structure/final, code and containment passed. Next: user review before Define.


### 20 October: Define process illustration for review

Added the second generic process scene: two inputs connect to one upright brief on a neutral hexagonal foundation. One pink/violet field indicates an agreed direction. Matches Discover's camera family, approximately 240-unit visible height, 1.1 px contours, neutral thickness, contained color and fading floor. Integrated only step two. Desktop/390px, neutral/final and technical checks passed. Next: review Define before Develop.


### 20 October: Develop and Deliver for review

Both remaining process illustrations are ready in the shared component. Develop: aligned exploded layers with a warm working layer. Deliver: completed handoff kit and checked seal. Both are generic, use distinct compositions, and match Discover/Define's contour and material treatment. Neutral/final, pair comparison, actual desktop/390px cards, code and rendered containment passed. Local candidates; user review next.


### 20 October: Gradient audit and Develop-only sample

Reviewed six Goodface materials and audited49 illustration sources plus22 host files. Developed a richer, curved amber/lime/emerald field with softly blurred inner white rim on only Develop's working layer. Geometry stays fixed for comparison. Before/after and actual desktop/390px reviewed; containment passed. Await user approval before family-wide rollout and subsequent skill-note updates. Full audit: exports/gradient-material-audit.md.
