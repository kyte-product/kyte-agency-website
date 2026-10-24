# Branding landing design system

Current: 23 October 2026. Browser reference: `/design-system/branding`. Live route: `/branding-marketing`. Independent visual foundation. This extension never applies to `/branding-marketing/*` child services.

## Independent foundation

Branding owns its visual values in src/app/branding-marketing/branding-tokens.css. All component token references use --brand- names, including fixed responsive heading roles. Shared navigation and contact behavior remain reusable infrastructure. Keep the shared menu behavior. Local editorial actions do not change primary actions elsewhere.

## Distinct language

Regular, oversized, tightly spaced capitalized DM Sans creates the editorial display. Geist Mono supplies annotations, metadata, service/news actions and footer details. The hero fills the viewport below the actual 58px compact header. Four authored lines combine the current supplied visuals and words; bottom annotations are underlined mono with the approved text glyphs. Follow the actual `BrandStoryHero.tsx` composition, rather than historical references to an older three-image/Kyte-logo arrangement.

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

Sources: `src/app/branding-marketing/page.tsx`, `branding-editorial.css`, `src/app/branding-marketing-actions.css`, `src/components/branding/`, `ServiceEditorialClose` and `ClientStories`. These files use independent Branding tokens. Do not duplicate global foundations into local components.

## Responsive and runtime contract

- The hero uses the real header height on short laptops. Notes and images must not collide with type at phone widths.
- Project media are inline on touch; hover-only disclosures cannot hide essential content.
- Helix resources, scroll listeners and animation loops clean up on navigation and pause when not needed. Reduced motion must remain readable.
- Test Branding → Home → Product → child services and browser Back without refresh. A hidden cached Branding page must not make destination buttons oval or alter their colors.
- The active root design-system marker is chosen by exact route. The documentation page uses the neutral Website shell and contains scoped specimens.

## Pixelated section boundaries

BrandPixelTransition uses a reversible 64 × 16 canvas tile field between blue, white and gray sections. The blue field is 25vw tall; the gray variant is clamped to 80–144px. Seeded column roughness and scroll position determine the resolving edge. Reverse rotates the boundary 180 degrees. Reduced motion draws a stable two-color boundary; decorative canvas ignores pointer input and is hidden from assistive technology. Frames/listeners clean up on route exit. The /design-system/branding page documents these contracts. Product illustration previews are excluded from this system.

Historical experiments and superseded directions remain in `docs/history/`. The older `docs/branding-story/DESIGN.md` is now an entry pointer to this current contract.


24 October 2026: Branding typography uses fixed breakpoint values. Hero: 104px desktop, 80px tablet, 32px mobile. Oversized editorial headings: 144/96/48px. Service directory: 64/40/18px. The flight phrase uses 240/160/80px. Smaller text inherits the Website scale. Viewport-based text sizing and title-length-based font calculations are retired.


### Line-height reference, 24 October 2026

Only 1.2, 1.3, 1.4, 1.5 and 1.6 are permitted. See `/design-system/branding#line-height` for explicit font size / line-height pairs at desktop, tablet and mobile. Headings use 1.2, compact supporting copy 1.3, leads/captions 1.4, body 1.5 and spacious reading copy 1.6. Branding display treatments also use 1.2, including hero word spans, editorial services, flight phrase and service directory. No tighter display exception remains.


## Independent token register, 24 October 2026

The live /design-system/branding page lists local typography, colors and icon rules. Annotation sizes are 10, 11, 12, 13, 14, 15, 16, 17, 18, 29px; local weights are 400, 450, 500, 550. News titles use DM Sans 20px/26px weight 500. Decorative EditorialGlyph motifs are scoped Branding artwork; action icons use Lucide. Exact local detail colors and effects are registered under branding_details in color-register.json. Website token edits do not change the Branding snapshot. The allowed five-value leading scale is also owned locally.


### Shared motion coverage, 24 October 2026

Root layout mounts one SiteRevealMotion and one TextRevealMotion. Plain text/media use the shared entry reveal; explicit data-reveal-words content uses the word controller on every route. Custom Branding/About/case-study scenes and DS reference pages opt out of generic entry animation. Logo tickers preserve their own treatment. Reduced motion keeps text readable, observers cover streamed content, and route cleanup cancels pending animations. Parent content blocks with their own paragraph/media children avoid duplicate reveal.
