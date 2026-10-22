# Product design landing system

Current: 23 October 2026. Browser reference: `/design-system/product`. Live route: `/ui-ux-design-development`. Inherits [Website](website.md).

## Scope and composition

The UI uses Website's DM Sans, semantic colors/type, compact corners, content insets, standard actions, header/footer, Work and FAQ patterns. Product-specific extensions are authored isometric art, the four-moment carousel, eight product-stage scenes, five illustrated service cards, the four-stage framework and six What We Design scenes.

Landing order: workspace hero → client ticker → product moments → Work (grid by default, optional list) → shared approach introduction and Kyte impact cards → product stages → ProductServices → framework → working principles → What We Design → industry cards → testimonials → FAQ → shared footer. Current route source owns this order. `ProductServices` is reused on industries while the surrounding page remains Website.

## Illustration layers

1. Structure: one camera/world, white faces, quiet neutral thickness, one rounded outer silhouette. Internal seams are lighter and end before the contour. Preserve authored scene scale, projection, object order and aspect ratio.
2. Planar interface faces: normal face layouts projected using measured corners. Keep the coherent icon vocabulary and actual embedded logo assets. White faces and neutral lines are not recolored by the variant process.
3. Presentation: clipped blended material fields with restrained inward white light. Masks contain all color and blur within the solid. Continuous solids keep continuous material. No runtime hue filter, glow or repaint script is added.

Construction skill: `.agents/skills/kyte-isometric-art/SKILL.md`. Sources and face templates: `hairline/*.js`, `*-ui.html`. Presentation builders: `build-*.mjs`, `illustration-materials.mjs`, `prism-continuous-material.mjs`. The new palette is an explicitly requested additive extension to the measured original palette family, not a replacement for those reference values.

## Two preserved versions

| Version | Authority | Storage and behavior |
| --- | --- | --- |
| Original color | `src/design-tokens/illustration-palettes.json` and `illustration-palette-assignments.json` | Seven measured families, 33 assignments. Existing original output paths remain unchanged under `public/hairline/`. |
| Brand blue | `src/design-tokens/illustration-brand.json` | `#0249d9` with dark/light blue tone stops. Additive output files under `public/hairline/brand/`. |
| Preservation manifest | `public/hairline/variant-manifest.json` | Original and generated SHA-256 values, file pairs, default and anchor. 62 matching SVG/embed outputs; source files are never overwritten. |
| Inline orbit | `ProductExperienceOrbitArt` | Existing SVG geometry consumes either original or generated brand token values. Both color definitions remain versioned. |

`hairline/build-brand-variants.mjs` reads the originals, changes chromatic color literals into a continuous blue tonal ramp, preserves neutrals and embedded image/logo payloads, and writes separate static outputs. It does not change paths, masks, scripts, projection or dimensions. It also emits `illustration-brand-palettes.json` for the existing inline orbit. Blue gradients use the same authored spatial fields; the material hue is the only intended visual change.

The shared provider in `design-system/IllustrationPalette.tsx` starts with Brand blue on each full load. All three DS pages show the same two-option preview control. Client navigation retains the choice; refresh resets to Brand blue. `IllustrationImage` and `IllustrationFrame` select the appropriate output path. Product components and UI/UX service heroes consume these shared wrappers, including ProductServices on industries. Only the selected output loads. Branding photos, other editorial media, and interface controls are not recolored.

## Complete Product gallery

The browser Product system documents all 24 placements:

- Workspace hero: `product-experience-embed.html`.
- Four moments: inline orbit, `product-dashboard-laptop-embed.html`, `product-complex-system.svg`, `product-evolving-experience.svg`.
- Eight stages: new, growth, established, tools, commerce, web, systems, brands.
- Five services: research-audit, website-design, mobile-app, saas-web-app, commerce.
- Six outcomes: onboarding, navigation, workflow-hub, content-journey, design-patterns, responsive-experience.

The asset variants also include matching review embeds, service hero and preserved process outputs so future uses do not need another recoloring implementation. Those extra stored files do not create extra live landing placements.

## Component and responsive rules

- Hero is the full-width, already-expanded authored workspace. Decorative iframe has a title, is hidden from assistive technology and has no tab stop. The live hero is eager; gallery/secondary embeds are lazy.
- Product moments use real previous/next buttons and the shared carousel movement helper. Keep first and final item content insets. Do not require dragging to read copy.
- `ProductStageIllustration` displays the appropriate compact scene for each of the eight labels. Scale the scene within the slot without changing contour construction.
- `ProductServices` keeps its five source illustrations and adjacent inline arrow links without divider rules.
- `ProductDesignFramework` uses a vertical tablist with Arrow/Home/End navigation and associated panel IDs; the diagram follows the selected stage. Its four right-hand stage marks use shared breathing DotPattern grids instead of line icons. Decorative motion cannot replace the text outcome.
- Test all artwork at 320/393/810/1440px, including complete focal forms, no page overflow and no accidental secondary scrollbar. Product layouts include 650px reflow rules. Preserve neutral surfaces, accessible surrounding headings and fixed aspect ratios.

## Rebuild and verification

From `kyte-site/`:

```sh
npm run build:illustration-variants
npm run check:illustration-variants
npm run check:illustration-palettes
npm run check:design-systems
```

For new or edited original geometry, run `npm run build:illustrations`, which builds originals first, generates the additive variant last, then checks preservation. Review both versions visually before publication. The variant guard checks original hashes, generated hashes and identical non-color markup; it does not certify composition quality. Existing contour/mask geometry remains unchanged by the color-only process.

## Selected Work and Kyte impact, 23 October follow-up

The Product landing uses the existing WorkShowcase grid/list toggle with grid as the fresh-load default. Only this landing enlarges list descriptions to 24–30px desktop and 22px mobile; metadata is 18px desktop and 16px mobile. The tablet list keeps metadata under its text, separate from the image. Grid typography stays inherited.

KyteApproach includes the same ImpactCards row used on industry pages, with white/blue/charcoal/white surfaces and breathing dot fields. Its accessible label is “Kyte impact numbers.” Four cards reuse the existing homepage figures: 100+ projects, 50+ clients, 3M+ views in one year and 200M+ impressions. `src/data/kyteImpact.ts` owns these figures for both Home and Product. These are Kyte totals, not industry statistics; their existing editorial proof status is unchanged. At smaller widths the shared rail scrolls without widening the page.

The framework stage marks use 80 × 72px dot fields (64px square on phones), with nodes sized to contain them and centered on the selected stage. “How We Work Together” uses six 96px square dot fields. Both use stable group seeds and unique motif slots, the shared gray/blue tone, fixed 7px grid geometry, offscreen pause and reduced-motion behavior. Stage names and written outcomes remain visible and keyboard accessible.
