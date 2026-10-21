# Branding landing: supplied helix integration

21 October 2026, local review.

The user explicitly replaced the orbit playground and service-text reveal with the complete DitherHelixCarousel component pasted in their attachment. The landing main content is the existing story hero, this helix and the selected-work section. The shared header, CTA and footer remain.

Source: the user attachment Pasted text.txt, attachment ID 91e17b0b-1296-4ac6-b992-978a0e44a2fe. The supplied WebGL2 shader geometry, card curvature, velocity deformation, four-pass vertical blur, grain resolve, entry timing, hover focus and snapping are retained. It lives in src/components/ui/dither-helix-carousel.tsx. Native CSS replaces Tailwind utility names so the existing TypeScript/React project needs no framework migration or runtime packages.

Only the six image URLs in the supplied demo are used in the helix. They are saved as local WebP assets to avoid texture CORS problems, with exact URLs recorded in public/branding-helix/SOURCES.json. Captions describe the actual pictures, correcting the demo labels that did not match their images. The hero continues to use the three images previously supplied by the user. Previous Pinterest artwork, sticker assets, exploratory display fonts and both discarded components have been removed from runtime files.

Integration refinements: first visible entry, offscreen/hidden-tab pause, full WebGL disposal, context/image failure fallback, reduced-motion support from the source, adaptive mobile card width, and a capped rendering pixel ratio. Vertical page scrolling stays available; clicking/focusing the canvas activates its wheel control and Escape releases it. Mouse vertical drag, touch horizontal drag, page scrolling through the section, and up/down keys use the same progression controller. The equivalent accessible list uses unique option IDs.

The sticky gallery carries two editorial text groups above the canvas. Each group arranges two underlined text blocks horizontally in Geist Mono, with compact geometric and directional glyphs worked into the copy and a wireframe globe beside the lower blocks. The dark text uses a solid ink color for legibility. The copy describes the studio and its work; it contains no interaction instructions and repeats neither the header logo nor decorative icon rows. The overlays stay clear of the central helix and do not intercept canvas pointer input. Mobile keeps the horizontal text arrangement with smaller type and tighter insets.

The WebGL-free native image scroller remains available when WebGL2 cannot start. No WebGL failure was forced during normal visual review.

The story headline uses a compact centered measure and reduced line spacing. Each word, inline picture and Kyte mark rises from below in sequence with a short stagger. Reduced-motion preferences show the final layout without entrance motion.

The project section starts directly with the four entries from the shared work showcase. Its cobalt surface, heading rule and row dividers run edge to edge, while content aligns to the site inset. Each compact row uses five columns: name, description, revealed image, categories and the shared tertiary case-study action. Pointer hover and keyboard focus animate each name through a short character scramble and reveal its project image. Mobile rows show the image inline without requiring hover. Reduced-motion preferences keep the title static and remove transitions. The project row remains one accessible link with its original name and description in the accessible label.

## Showreel-to-statement scroll sequence

The story hero fills the available viewport beneath the announcement strip and fixed navigation, so the blue showreel begins below the first viewport. The showreel stage adds 20svh of lower breathing room after its scale animation. The section after the story hero stays in normal document flow on Kyte blue. Its regular Geist Mono intro labels sit close above the showreel, with no right-side arrow, and the long statement uses regular weight. The existing muted, looping showreel stays anchored to the left gutter as it moves into the viewport center. It only begins shrinking once its center reaches the viewport center, then scales smoothly over 0.8 viewport heights. At the end, its lower edge aligns to the visible baseline of the first statement line. The paragraph remains present throughout: only its first line indents beside the final small video and later lines return to the left edge. There is no sticky stage or floating playback control. Reduced-motion preference shows a static video followed by the complete copy. The image helix leaves clear top and bottom padding inside its sticky viewport. Reference: https://dzinrstudio.com/.

## Scroll-driven pixel boundary

The blue-to-white transitions use a viewport-wide 64-column by 16-row square grid, with finer tiles and a rougher edge that steps up and down by multiple tiles. Each tile is redrawn from the boundary's live scroll position, so the color field moves continuously and reverses when the visitor scrolls back. There is no one-time observer trigger. During movement, deep blue, brand blue, sky blue, lime and white appear around the edge; at either endpoint, the palette reduces to brand blue and white. The canvas is decorative and does not capture pointer or scroll input. Reduced motion presents the quieter endpoint palette.

## Four-stage process

After Selected Work, the large “Our Process” heading scrolls normally above the pinned cards. The four blue panels pin for several viewport lengths with breathing room above and below, then open from left to right as the visitor scrolls. Each diamond segment lives inside its card and shares the panel's clip reveal, so the line and block appear together without a separate line animation. The outline matches the low-contrast card divider, with no extra guide lines. On narrow screens, cards form a two-by-two grid and each row contains a taller diamond segment. Reduced motion opens all cards without scroll animation.

## Client testimonials

Two-card vertical columns move continuously across a horizontal rail and loop seamlessly. Each square-cornered card hugs its content vertically. The columns alternate neutral quote cards with varied soft-color text highlights and brand-blue impact cards with large numbers and the shared “Start a project” action. Landing actions use the supplied thin oval outline with italic serif labels; outlines and labels are blue on light surfaces and white on blue surfaces. Duplicate loop content is hidden from assistive technology and keyboard navigation. On narrow screens, the columns remain stacked and become narrower. Reduced-motion preferences remove autoplay and provide a touch, pointer and keyboard scroll rail with snap points.


## Final closing sequence

Process bottom spacing is a separate sibling after the sticky section, so it does not extend pin duration. Service images open in normal inline flow; replay the pixel resolution ramp on pointer enter and keyboard focus, and collapse on leave/blur. Touch retains service links without a hover-only requirement. Closing text follows scroll reversibly; seeded per-letter spring offsets are deterministic. The mirror-tile mark starts later, moves continuously top to bottom and becomes occluded by the footer information grid. The footer has no project gallery. Reduced motion removes the long pin and model, showing a static readable sentence.


## Branding review corrections, 22 October 2026

- Hero: newest supplied square ArcMatrix artwork before STORY and colourful fan before UNFORGETTABLE. Both use contain and preserve the full silhouette. Sources recorded in public/branding-supplied/SOURCES.json.
- Services: normal-case titles, Video & Motion Graphics label, edge-to-edge 2px rules, brand-blue hover text, and the first five user-supplied images. Preview height remains equal to text height.
- Closing letters: rechecked DZINR's public implementation. The reference starts each letter at the viewport right edge and settles it by the left 15%, using random vertical percentages, rotations, and scroll smoothing. Our earlier viewport-height displacement settled before the letters became visible. Replaced it with letter-height offsets and visible-viewport progress, alternating directions, seeded rotations, cubic arrival and a restrained overshoot/rebound.
- Kyte mark: continuous descent beginning midway through the sentence; hidden as the sentence leaves, with the opaque footer covering its final movement. The homepage portal is a separate sibling above the model's stacking context, preventing any reappearance below the footer.
- Homepage ending: no pinned viewport or extra gap. A shallow pixel triangle occupies 180px on desktop and 170px on mobile. Geist Mono caption, transparent ellipse with blue text/border, and the same Editorial New Trial italic face used by this page's navigation buttons. Link goes to /. Font remains a local trial preview pending licensed public use.
- Scope: Branding landing only. Shared footer/banner variants unchanged. Local preview, no deployment.


## Supplied motion component and two-font direction, 22 October 2026

- Replaced all Editorial New/italic declarations on the Branding page with upright Geist Mono. DM Sans remains the main display/body face. Mono applies to navigation actions, service menu pills, project/testimonial actions, closing homepage CTA, helix notes, reel topline and the Be the brand tagline. Other routes retain their existing styles.
- Reel travel extended from 80vh to 125vh, with 110ms exponential interpolation and a 245svh stage. Final width increases by 0.2%, keeping its existing bottom-left resting baseline and growing only up/right.
- Horizontal letters now follow the user-supplied StickyAnimatedText component and screenshot settings: section 300svh; top/center/bottom/center pattern with sparse seeded direction swaps; top offset -64px, bottom +64px; opposing 12px bounce; 9-degree starting rotation and -3-degree rebound; spread .5; horizontal start viewport +300px. Three-keyframe interpolation is scroll-bound. Horizontal travel completes within the sticky range, preserving the footer occlusion and continuous logo descent. Font remains DM Sans, per the newer page typography instruction.
- Footer triangle retains lime-green and sky-blue accent pixels in its final edge state. Added compact gray-only variants of the existing pixel transition above and below the testimonials, matching its #f3f4f6 surface. The separate post-process spacer remains outside the sticky range.
- Desktop review at 1089x764 confirmed two font families, zero italic declarations on rendered page content, no horizontal overflow, correct keyframe transforms, gray boundaries and persistent colored edge pixels. TypeScript, focused ESLint, production build and whitespace checks pass. Mobile motion remains unverified. Local only.


## Final release corrections, 22 October 2026

Expanded navigation is horizontally left aligned and vertically centered, with fixed header and bottom actions. Hover does not translate the labels; reveal bounds and glyph padding prevent right clipping. Route-keyed header state and browser history events close the menu on return. Gray transition rows are square. Hero rows are much closer at every breakpoint. Later sentence letters use a rolling visible entrance interval. The kite is behind the sentence and all its movement/rotation/glints are scroll driven, with slightly more rotation. Services highlight the text plus top/bottom rules; testimonials run a 48s loop. Legal-to-pocket spacing increases by 10px. White pocket backing, final rows and a clipped canvas edge eliminate any blue bottom strip while retaining green/sky edge accents. See docs/release/2026-10-22/README.md for audit scope and remaining limits.
