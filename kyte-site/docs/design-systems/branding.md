# Branding landing design system

Current: 23 October 2026. Browser reference: `/design-system/branding`. Live route: `/branding-marketing`. Inherits [Website](website.md). This extension never applies to `/branding-marketing/*` child services.

## Inherited foundation

Use Website's Kyte blue/black/white colors, DM Sans, semantic descriptions, 1344px content frame, accessibility, contact destination, page transition and route/scroll lifecycle. Keep the shared menu behavior. Local editorial actions do not change primary actions elsewhere.

## Distinct language

Regular, oversized, tightly spaced uppercase DM Sans creates the editorial display. Geist Mono supplies annotations, metadata, service/news actions and footer details. The hero fills the viewport below the actual 58px compact header. Four authored lines combine the current supplied visuals and words; bottom annotations are underlined mono with the approved text glyphs. Follow the actual `BrandStoryHero.tsx` composition, rather than historical references to an older three-image/Kyte-logo arrangement.

Local actions have a one-pixel outline, oval radius, no shadow and mono type. Service rows use edge-to-edge two-pixel dividers and blue hover copy. Existing images resolve from pixels on hover/focus. Article/news title highlights use the existing pastel family behind dark text, with `box-decoration-break: clone` so wrapped lines remain legible. These highlights and photographs are approved local color exceptions, independent of the Product illustration palette.

## Sections, motion and implementation

| Order | Component | Contract |
| --- | --- | --- |
| 1 | `BrandStoryHero` | Four image/type lines, responsive image/type scaling, corner notes and viewport-aware composition |
| 2 | `BrandReelStatement` | Blue intro and showreel, video settles beside the first statement line before scaling, readable static reduced-motion layout |
| 3 | `BrandPixelTransition` | Square stepped section boundaries; reverse/tone variants |
| 4 | `BrandHelixSection` / `ui/dither-helix-carousel` | Six demo images, WebGL spiral, grain/blur depth, drag and keyboard control, reduced-motion/content fallback |
| 5 | `BrandProjects` | Existing four work entries, blue section, scrambled project titles and image reveal on hover/focus; inline images on mobile |
| 6 | `BrandProcessSection` | Existing editorial process and local choreography; it is separate from the child-service process rail |
| 7 | `BrandTestimonials` | Horizontal columns and line-wrapping pastel highlights; retain verified source attribution |
| 8 | `ServiceEditorialDirectory` | Five normal-case service names beneath an oversized heading; inline image reveal |
| 9 | `ClientStories` with Branding variant | Exactly three Design News cards, categories, summaries, dates and All stories action |
| 10 | `ServiceFlightCta` | Blue scroll-bound closing sentence, blue footer, final white pixel pocket and outlined oval homepage link |

Sources: `src/app/branding-marketing/page.tsx`, `branding-editorial.css`, `src/app/branding-marketing-actions.css`, `src/components/branding/`, `ServiceEditorialClose` and `ClientStories`. These files extend shared tokens. Do not duplicate global foundations into local components.

## Responsive and runtime contract

- The hero uses the real header height on short laptops. Notes and images must not collide with type at phone widths.
- Project media are inline on touch; hover-only disclosures cannot hide essential content.
- Helix resources, scroll listeners and animation loops clean up on navigation and pause when not needed. Reduced motion must remain readable.
- Test Branding → Home → Product → child services and browser Back without refresh. A hidden cached Branding page must not make destination buttons oval or alter their colors.
- The active root design-system marker is chosen by exact route. The documentation page uses the neutral Website shell and contains scoped specimens.

## Shared illustration preview

The palette toggle here shares one provider with the Website and Product systems. It only selects between Product originals and their additive blue outputs; it does not tint Branding photographs, video or pastel editorial highlights. See the [full Product library](product.md) for storage, checksums and build instructions.

Historical experiments and superseded directions remain in `docs/history/`. The older `docs/branding-story/DESIGN.md` is now an entry pointer to this current contract.
