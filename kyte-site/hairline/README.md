# Hairline artwork

The UI/UX cluster hero uses a custom Hairline scene rather than a preset figure. `product-experience.js` draws the keyboard, slabs, connecting stems, and five rounded cubes through one isometric camera. The UI faces are authored separately in `product-experience-ui.html` with ordinary HTML and CSS layouts. Each face template has a known design width and height; the figure records its four projected corners, and `build-product-experience.mjs` calculates the affine transform and places the template into an SVG `foreignObject`. Edit spacing, grid and flex placement, gradients, and UI icons in the standalone template sheet instead of guessing positions in the projected scene. The five templates are the main screen, message card, search control, media card, and analytics card. The same builder output is used by the site embed at `public/hairline/product-experience-embed.html`.

The screen uses large gradient panels with tight white gutters and modest 1.45-world-unit interior radii, crossed by one floating search control. Foreground cards hold smaller interface details with reduced padding. The four blue-green desktop panels use smooth color blends with white glow only at their perimeter and corners. Other colored faces retain layered color gradients and the stronger soft white edge wash. Templates use neutral small controls, Lucide outline UI marks, and light-gray filled text bars without decorative strokes. The analytics face uses two filled gray chart-label rectangles around its bar graph. Its pie has three equally sized sectors separated by straight, constant-width white lines, and uses the violet, pink, and orange palette of the bars below. Lucide List and Search pictograms use one shared size, color, and 2.6 px stroke on the cube faces. The remaining faces use the brand-color Figma SVG asset, the original black Framer mark, and the existing monochrome ChatGPT logo, each without background tiles and projected onto its cube face. Neutral solid tubes emerge from the left-facing planes, with small opaque socket collars, and extend behind the main screen. Each tube's projected front cap and socket share one world-space center. The five cubes form an open two-column cluster; the Search tube ends inside the screen projection, and the database cube has been removed. The earlier exposed wire paths are removed. The interface uses the installed Lucide Image, Search, UserRound, and Play paths with a consistent 2.4 px white outline. The projected UI scopes that outline styling to its current four icons so Hairline's generic SVG path rules cannot fill or gray them. Lucide has no officially supported filled icon set; preserve any native filled details in shipped icons, and never custom-fill outline paths. The play control has a translucent fill and no border. Browser lights sit tightly grouped at the left of the screen header. The repeated floor crosses follow the ground's projected axes and fade toward the corners. Cube seams are lighter than the contours and stop just inside the silhouette at outer corners. The screen, cards, and keyboard shell use shallow neutral thickness bands with one rounded contour around each silhouette. The neutral band shows thickness, without an inner rim or separate depth stroke. The shared outer contour is 1.75 px and the structural corner radius is 3 world units.

`hairline-product-experience.html` is the standalone Hairline validation bench for the structural scene. Run `node .agents/skills/hairline-create/build.mjs kyte-site/hairline/product-experience.js kyte-site/hairline/hairline-product-experience.html`, then `node .agents/skills/hairline-create/validate.mjs kyte-site/hairline/hairline-product-experience.html` from the worktree root. Run `node kyte-site/hairline/build-product-experience.mjs` to regenerate the site's `public/hairline/product-experience-embed.html` from both the figure and the HTML face templates. The embed contains vector structural paths and projected HTML faces, with no raster artwork. The reusable skill in `.agents/skills/kyte-isometric-art/` now includes visual rules, construction steps, and a copy of this approved source as a portable reference. The homepage Product Design Laptop figure remains untouched.

`workstack.js` is the editable figure source for the Discover card on UX Research & Design Audits. It was made with the [Hairline create skill](https://hairline.lucasmarkes.com/skill) and validated in the standalone `hairline-workstack.html` bench. The figure depicts four research briefs in a tray. Each of the four process stages on every service route now selects separate artwork in `src/data/serviceProcessFigures.ts`.

The UX audit route loads `public/hairline/workstack-embed.html`, a presentation copy of that bench with its testing controls hidden. It uses the Stripe preview violet or original Kyte blue according to the selected site palette. If the figure changes, update both HTML copies from the same `workstack.js` source and repeat the Hairline validator and `look.mjs` visual check. The homepage Product Design card intentionally retains Hairline's Laptop figure. The Branding card uses Exploded and the archived About At a Glance focus card uses Loupe from `@lucasmarkes/hairline/react`.

The forty process cards use forty distinct drawings: thirty-two interactive Hairline package figures, the custom Workstack embed, and seven small inline SVG drawings in `src/components/ServiceProcessCustomFigure.tsx`. The inline drawings use the same thin-line and brand-color treatment but are currently static. The homepage Product Design Laptop is not part of the process map.

| Service | Discover | Define | Develop | Deliver |
| --- | --- | --- | --- | --- |
| UX Research & Design Audits | Workstack | Loupe | Sieve | Riffle |
| Website Design & Development | Branches | Format | Exploded | Router |
| Mobile App Design | Phone | Drawer | Keyboard | Plug |
| SaaS & Web App Design | Cabinet | Stack | Rebuild | Terminal |
| eCommerce & Shopify Websites | Basket | Rail | Hub | Vault |
| Brand Strategy & Identity | Settle | Phosphor | Turntable | Lockers |
| Graphic Design | Plot | Patch | Terrain | Palette SVG |
| Video Production & Motion Graphics | Dish | Slow | Elevator | Storyboard SVG |
| Social Media Marketing | Relay | Social map SVG | Content grid SVG | Publishing SVG |
| SEO & AI Search Optimisation | Query | Padlock | Search map SVG | Index grid SVG |

Use `src/data/serviceProcessFigures.ts` to change a pairing. The custom embed, native components, and inline SVGs use the current brand color; only the UX audit needs an HTML copy.

The new service and industry photography is selected in `src/data/pagePhotography.ts`. Those Unsplash photos are temporary editorial imagery. They do not represent client work, and the live case-study assets and client logos remain separate.

## Static solid scenes

The third product-moments card is rebuilt from `product-complex-system.js`. Its pure `makeComplexScene(HL)` function supplies both the neutral Hairline bench and the colored SVG generated by `build-product-complex-system.mjs`. The builder uses the unchanged Hairline math API and assembles all paint before display. Rounded body, material clip, and final contour share the same path; each local face layout has an additional plane clip. The page displays `public/hairline/product-complex-system.svg` directly, while the generated embed HTML is an isolated review wrapper. No runtime repaint script or extra CSS scale is used for this scene.

Run `node kyte-site/hairline/build-product-complex-system.mjs` from the repository root after editing geometry or material. The builder also accepts `--hairline /absolute/path/to/hairline-create --output /absolute/output/directory`. The structural validator checks `hairline-product-complex-system.html`; inspect the final SVG in the page as well. The skill's `scripts/check-color-containment.py` compares rendered artwork with a matching permitted-color mask. The portable skill includes this source and builder under `assets/reference/solid-scene/` as a tested construction example awaiting user visual approval.

The fourth product-moments card uses `product-evolving-experience.js` and `build-product-evolving-experience.mjs`. Its pure scene function supplies a continuous rounded route, a neutral depth band, a pink-violet sphere, and the shared projected ground. The route's extrusion uses a polygon union rather than a convex hull, preserving its concave bends. Run `node kyte-site/hairline/build-product-evolving-experience.mjs` to regenerate the static SVG, review wrappers, neutral bench, and a white-on-black sphere mask for containment checks. The page loads `public/hairline/product-evolving-experience.svg` directly. The generated mask stays in the source folder and is not a public page asset.


### Research and audit service card

`product-research-audit.js` contains shared pure geometry; run `node kyte-site/hairline/build-product-research-audit.mjs` from the repository root to regenerate its neutral bench and final static SVG/review wrappers. The builder uses the installed unmodified Lucide Search node data (ISC) for the projected white line icon. The route opts into this asset for only its first services card. Reference, framing, and review evidence are documented in `exports/research-audit-brief.md`.


### Website design service card

`product-website-design.js` defines the two neutral slabs and their measured face anchors. `product-website-design-ui.html` defines the flat browser and component layouts. Run `node kyte-site/hairline/build-product-website-design.mjs` from the repository root to regenerate the neutral bench, static SVG, flat preview, and review wrappers. The builder embeds scoped HTML/CSS through foreignObject and uses original Lucide CodeXml node data (ISC). The route enables this asset only for its second services card. See `exports/website-design-brief.md` for reference and check evidence.


### Mobile app service card

`product-mobile-app.js` defines the handset, raised card, circular controls, and measured face anchors. `product-mobile-app-ui.html` defines the flat handset and interaction layouts. Run `node kyte-site/hairline/build-product-mobile-app.mjs` from the repository root to regenerate its neutral bench, final static SVG, flat preview, and review wrappers. The builder uses the original Lucide Pointer node data (ISC). The route enables this asset only for its third services card. See `exports/mobile-app-brief.md` for references and review evidence.

### SaaS and web app service card

`product-saas-web-app.js` defines two measured interface planes and their neutral depth. `product-saas-web-app-ui.html` defines the flat workflow board and analytics interfaces. Run `node kyte-site/hairline/build-product-saas-web-app.mjs` from the repository root to regenerate the neutral bench, SVG, flat preview, structure/final wrappers, and source mask. The builder embeds scoped HTML/CSS through foreignObject and unmodified Lucide ChartNoAxesCombined node data (ISC). Only the fourth services card enables this asset. See `exports/saas-web-app-brief.md`.

### eCommerce and Shopify websites service card

`product-commerce.js` defines the upright storefront and horizontal checkout planes with shared geometry and neutral depth. `product-commerce-ui.html` holds the separate flat interfaces. Run `node kyte-site/hairline/build-product-commerce.mjs` from the repository root to regenerate the Hairline bench, SVG, flat preview, structure/final wrappers, and source mask. The builder embeds scoped XHTML and original Lucide ShoppingBag node data (ISC). Only service card index four enables this artwork. Reference and verification notes: `exports/commerce-brief.md`.

### Complex internal tools mini symbol

`product-stage-tools.js` contains the two-form geometry in a 160 × 128 frame. Run `node kyte-site/hairline/build-product-stage-tools.mjs` to regenerate its neutral bench, transparent SVG, structure/final wrappers and source mask. The builder uses original Lucide SlidersHorizontal node data (ISC), mapped into the panel plane. Only the product-stage `tools` branch uses this asset. See `exports/stage-tools-brief.md`.

### Commerce journeys mini symbol

`product-stage-commerce.js` defines two shallow solids in a 160 × 128 mini frame. Run `node kyte-site/hairline/build-product-stage-commerce.mjs` to regenerate the neutral bench, transparent SVG, structure/final wrappers and source mask. The builder maps original Lucide ShoppingCart node data (ISC) and contained color fields onto the raised tile. Sparse checkout details remain in measured base coordinates. Only the product-stage commerce branch uses it. Review notes: `exports/stage-commerce-brief.md`.

### Web platforms mini symbol

`product-stage-web.js` contains the browser and sphere geometry in a 160 × 128 frame. Run `node kyte-site/hairline/build-product-stage-web.mjs` to regenerate the neutral bench, transparent SVG, structure/final wrappers and source mask. The builder projects original Lucide Globe data (ISC) into the browser plane and clips local pink-violet fields inside the sphere. Only the product-stage web branch uses it. Review evidence: `exports/stage-web-brief.md`.

### Internal systems mini symbol

`product-stage-systems.js` contains three aligned rounded slabs in a 160 × 128 mini frame. Run `node kyte-site/hairline/build-product-stage-systems.mjs` to regenerate the neutral bench, transparent SVG, structure/final wrappers and source mask. The builder maps original Lucide Workflow node data (ISC) into the top plane and clips cool color fields inside its shared rounded solid. Only the product-stage systems branch uses this asset. Review evidence: `exports/stage-systems-brief.md`.

### Connected brands mini symbol

`product-stage-brands.js` defines two white touchpoint tiles and a raised connecting capsule in a 160 × 128 frame. Run `node kyte-site/hairline/build-product-stage-brands.mjs` to regenerate its neutral bench, transparent SVG, structure/final wrappers and source mask. The builder maps original Lucide Link2 node data (ISC) into the connector and clips warm color fields to its rounded face and solid. Only the product-stage brands role uses it. Review notes: `exports/stage-brands-brief.md`.

### First three product-stage mini figures

The pure geometry sources are `product-stage-new.js`, `product-stage-growth.js` and `product-stage-established.js`. Regenerate each from the repository root with `node kyte-site/hairline/build-product-stage-NAME.mjs`, replacing NAME with `new`, `growth` or `established`. Each produces its neutral Hairline bench, transparent SVG, final/structure wrappers and source mask. New products uses original Lucide Sparkles data; Established services uses original Lucide Check data (ISC). Growing platforms derives its rounded solids, faces and inset seams from shared world geometry. Only the corresponding first three stage roles use these assets. Review evidence: `exports/first-three-stages-brief.md`.


### Eight stage minis: shared review

The eight stage sources use optical camera scales documented in `../../exports/stage-group-audit.md`. Keep their silhouette midpoints at (80,64), viewBoxes 160 × 128 and contour width 0.9. Adjust camera geometry rather than scaling completed SVG strokes. Web sphere radius uses its camera scale variable. All roles share the stage-art CSS contain rule; phone cards must not inherit the obsolete 210 px rail minimum width. Reviewed at 1280/810/390 px on 20 October 2026.


### Services: shared presentation review

The five service scenes share 400 × 280 viewBoxes centered from visible bounds, 1 px #a9b0b2 rounded contours and #f0f2f2 neutral depth. Current optical camera scales are Research 1.48, Website 1.77, Mobile 1.70, SaaS 1.58, Commerce 1.50. The site uses one contain frame derived from its narrow service-grid track, capped at 350 px, including wider cards. Keep geometry/camera changes in source, rebuild final and neutral assets, and verify the full set together. Review evidence: `../../exports/services-group-audit.md`.


### Onboarding and activation outcome card

`product-onboarding.js` defines the shared geometry for four interface planes and a milestone track; `product-onboarding-ui.html` measures each face separately. `build-product-onboarding.mjs` compiles the scoped faces and materials into the final SVG plus neutral, flat and color-mask reviews. Run it after any source change. Frame 400 × 280, camera -45/.5/1.54, centered visible bounds 249.86 × 231.43. Only the first What we design card uses it. Review and checks: `../../exports/onboarding-brief.md`.


### Navigation and information architecture outcome card

`product-navigation.js` defines the four shared-camera panels. `product-navigation-ui.html` defines the measured sitemap, menu and page layouts; keep node centers and connector endpoints aligned in flat coordinates before projection. `build-product-navigation.mjs` compiles the static SVG, standalone, flat, neutral and mask views. Frame 400 × 280; camera -45/.5/1.44; visible bounds 224.22 × 235.17, centered at (200,140). Only the second outcome card uses it. See `../../exports/navigation-brief.md`.


### Dashboards and complex workflows outcome card

`product-workflow-hub.js` constructs the circular console, routes, modules and task sheets in one 45/.5/1.38 camera. `product-workflow-hub-ui.html` measures the top-face UI independently. `build-product-workflow-hub.mjs` compiles final SVG, flat, neutral and mask reviews. Frame 400 × 280, centered bounds 276.46 × 156.88. Keep cylinder radii tied to camera scale and paths below receiving solids. Only the third outcome card uses this asset. See `../../exports/workflow-hub-brief.md`.


### Websites and content journeys outcome card

`product-content-journey.js` builds two sloped editorial leaves as one rounded solid, plus paths and two receiving tiles. `product-content-journey-ui.html` measures each layout independently. `build-product-content-journey.mjs` maps the faces, clips both leaves to the shared silhouette and compiles final/flat/neutral/mask reviews. Camera 45/.5/1.45, frame 400 × 280, centered visible bounds 289.38 × 186.70. Keep the fold endpoints shared when modifying geometry. Only the fourth outcome card uses it. See `../../exports/content-journey-brief.md`.


### Design systems and interface patterns outcome card

`product-design-patterns.js` constructs the three assembly layers and specimen rail in one 45/.5/1.52 camera. `product-design-patterns-ui.html` measures reusable controls and their assembled pattern separately. `build-product-design-patterns.mjs` compiles final/flat/neutral/mask reviews. Frame 400 × 280, centered visible bounds 248.80 × 180.12. Keep shared control dimensions/materials aligned across the library and pattern. Only the fifth outcome card uses it. See `../../exports/design-patterns-brief.md`.


### Responsive product experiences outcome card

`product-responsive-experience.js` builds a monitor and stand, foreground tablet and phone in one -45/.5/1.39 camera. `product-responsive-experience-ui.html` measures desktop 1320 × 720, tablet 460 × 580 and phone 310 × 630 layouts separately, reusing common content and materials. `build-product-responsive-experience.mjs` compiles final, flat, neutral and mask reviews. Frame 400 × 280, centered visible bounds 208.57 × 236.67. Preserve exact face anchors and flat layout reflow when modifying devices. Only the sixth outcome card uses it. See `../../exports/responsive-experience-brief.md`.


### UX research and design audit service hero

`service-research-hero.js` defines five rounded solids using one 45/.5/2.38 camera. `service-research-hero-ui.html` measures an evidence board (1460 × 1060), interview (450 × 760), priorities (480 × 720), journey (1300 × 540), and usability review (720 × 640). `build-service-research-hero.mjs` compiles static vector, standalone, flat, neutral and mask artifacts. Frame 960 × 560, centered visible bounds 570.92 × 459.61. Keep flat preview document CSS outside injected face CSS, and use XML-compatible attributes. Only the research service route uses it. See `../../exports/research-hero-brief.md`.


### Website design and development service hero

`service-website-hero.js` builds a connected website assembly from rounded cubes, two true cylindrical tube axes, a shallow platform, browser, layered page and circular publishing hub. One 45/.5/2.53 camera, 960 × 560 frame, centered visible bounds 689.19 × 458.77. `service-website-hero-ui.html` provides measured browser (1460 × 900), content (440 × 540), development (480 × 660), page (1000 × 540) and publishing (500 × 500) faces. Keep development art above its socket and clip every cube material to its shared rounded silhouette. `build-service-website-hero.mjs` compiles final/flat/neutral/mask artifacts. Only website-design-development uses this asset. See `../../exports/website-hero-brief.md`.


### Mobile app design service hero

`service-mobile-hero.js` defines a diagonal handset, floating interaction slab, circular identity pedestal, curved notification arch, rounded hexagonal completion pad and raised connecting tracks. Shared 45/.5/3.15 camera, 960 × 560 frame, centered visible bounds 634.58 × 459.69. `service-mobile-hero-ui.html` measures phone 700 × 1300, identity 560 × 560, notifications 520 × 680, interaction 920 × 280 and completion 600 × 600. Keep the interaction tile forward so it does not obscure the main phone content. `build-service-mobile-hero.mjs` compiles final/flat/neutral/mask artifacts. Only mobile-app-design uses it. See `../../exports/mobile-hero-brief.md`.


### SaaS and web app design service hero

`service-saas-hero.js` constructs the tiered workflow table, automation block, banded data cylinder, completed-task stack and raised connecting bridges. One 45/.5/2.33 camera, 960 × 560 frame, centered bounds 570.64 × 460.93. `service-saas-hero-ui.html` measures workspace 1280 × 860, automation 440 × 620, data 500 × 500 and queue 780 × 420. Keep the bridges overlapping receiving solids and the cylinder seams short of its contour. `build-service-saas-hero.mjs` compiles final/flat/neutral/mask artifacts. Only saas-web-app-design uses it. See `../../exports/saas-hero-brief.md`.


### eCommerce and Shopify Websites service hero

`service-commerce-hero.js` constructs an upright catalogue on a centered single support and compact foot, broad checkout surface, Shopify-logo cube and circular confirmation hub connected by low raised tracks. One 45/.5/2.32 camera, 960 × 560 frame, centered visible bounds 558.84 × 460.04. `service-commerce-hero-ui.html` measures storefront 1300 × 800, checkout 640 × 900, parcel and confirmation 460 × 460. `build-service-commerce-hero.mjs` compiles final/flat/neutral/mask artifacts. Only ecommerce-shopify-websites uses it. Its page modifier makes the hero text area white and the image frame square. This revision supersedes the covered-storefront composition and commerce measurements in the family audit. See `../../exports/commerce-rework-brief.md`.


### Shared service hero review standard

All five service heroes use 960 × 560 frames, approximately 460 units of visible object height, 1.25 px #a9b0b2 contours and #f0f2f2 neutral depth. CSS framing is shared in service-detail.css. Current geometry values supersede initial-build measurements in older briefs. Research now uses simpler broad themes and a parts array that draws three tube links before the receiving panels. Commerce modules are spread horizontally with longer raised bridges. Keep these relationships when rebuilding. Group evidence: `../../exports/service-heroes-group-audit.md`.


### 20 October: service hero brand faces

Commerce uses the full-color Shopify bag. Website uses Sanity on the content cube, Webflow on the development cube's top, Framer on the foreground page assembly, and WordPress on the publishing hub. Mobile and SaaS use Figma on their circular modules and Claude on the upright module. Each brand asset is embedded at build time with its natural aspect ratio and mapped through the same face corners as the host surface. Source notes are in public/tool-logos/README.md.

The website development cube now carries a measured topPlane (480 × 480) in addition to its side face. The builder adds a separate top-face clip and HTML template inside the same solid clip. Framer's adjacent UI is reduced to two bars and one compact action. Its action arrow and bar have specific size rules so general page-layout icon rules cannot enlarge them. Camera and complete object bounds remain unchanged. See exports/website-webflow-top-framer-review.png.


### Reusable process illustration: Discover

`process-discover.js` constructs a magnifying lens and two research cards using a 45/.5/2.15 camera. `build-process-discover.mjs` compiles its neutral Hairline bench, transparent 400 × 320 SVG, final/structure wrappers and local color mask. The face details are sparse projected vector shapes; all lens fields and softening are clipped within the glass and solid silhouette. ServiceOurProcess uses this image for step zero across its shared uses. Define, Develop and Deliver are pending review. See `../../exports/process-discover-brief.md`.


### Reusable process illustration: Define

`process-define.js` constructs an upright brief, two connected input tiles and a rounded hexagonal foundation with one 45/.5/2.1 camera. `build-process-define.mjs` compiles the transparent 400 × 320 SVG, neutral bench, final/structure wrappers and local mask. The builder maps an unmodified Lucide check into the colored decision field; blurred pink/violet fields and restrained white softening remain clipped to the accent and brief solid. ServiceOurProcess uses it for step one across shared service sections. Evidence and measurements: `../../exports/process-define-brief.md`. Develop and Deliver await review.


### Reusable process illustrations: Develop and Deliver

`process-develop.js` defines an exploded component assembly with a warm working layer; `process-deliver.js` defines a completed handoff kit with two document sheets and a mint/cyan check seal. Their entrypoints `build-process-develop.mjs` and `build-process-deliver.mjs` call the shared `build-process-stage.mjs` compiler. It keeps neutral faces clipped to the rounded solid, maps local fields and original icons through each surface's plane, and emits final/neutral/mask/bench artifacts. Shared 400 × 320 frames, 1.1px #a9b0b2 contours and about 238 units visible height. Camera scales are Develop2.28 and Deliver2.71. ServiceOurProcess uses them at steps two and three with the same contain sizing as Discover and Define. Review: `../../exports/process-develop-deliver-brief.md`.


### Gradient material trial, historical checkpoint

The Develop builder alone passes process-develop-gradient-trial.mjs to the optional material argument of buildProcessStage. It adds concentrated amber/lime/emerald fields and blurred inner rim lighting within the existing solid/accent clips. Other process materials retain their existing renderer. Reference study, source inventory, measurements and rollout proposal: `../../exports/gradient-material-audit.md`. The sample was approved, then the user rejected blanket saturation in the rollout. See the current balanced treatment below.


### Balanced gradient materials

`illustration-materials.mjs` defines restrained palette families and clipped local SVG fields. `update-material-css.mjs` updates scoped material rules inside flat UI sources; run it before the usual builders when changing the shared palette. Projected UI uses local elliptical radial fields and inward rim lighting. Actual logos and neutral floor masks are excluded. Complex-work, Growing platforms and research retain distinct face geography rather than sharing the generic field pattern. Develop keeps the exact approved trial material.

The user rejected the first broad saturation increase. Current guidance favors earlier soft orange/purple, selective mint/blue richness and reference-specific placement. Both illustration skills and portable ZIPs record this correction. Review evidence: `../../exports/gradient-balanced-review.png`; rendered mask results: `../../exports/gradient-balanced-containment.json`.


### Continuous prism material sample

The latest user review rejected the broad palette-based rollout. Only the complex-work prism now uses `prism-continuous-material.mjs` and `prism-field-data.mjs`: one measured, continuous projected field across the whole silhouette, softly illuminated edges without a dark colored perimeter, and translucent white folds. Neutral supports retain their contours. This is a one-sample candidate, not a shared palette default. See `../../exports/goodface-implementation-findings.md` and the reference/before/after comparison.


### Canonical palette library

Seven Goodface-derived presets and49 measured colors live in `../src/design-tokens/illustration-palettes.json`, with33 explicit assignments in its sibling JSON. Use named tokens through `illustration-palettes.mjs`; do not add local material hex/RGB values. See `PALETTES.md` and `/hairline/illustration-palette-library.html` for swatches, source coordinates and assignments. Actual brand assets, neutral structure and named browser-control signals remain separate.

From kyte-site run `npm run build:illustrations` after changing palette data. It regenerates scoped CSS, all illustration assets, the gallery and portable skill palette references. `npm run check:illustration-palettes` rejects ad hoc accent colors, undefined CSS tokens and missing assignments. Existing field geometry and shape-specific lighting remain independent from the color library.
