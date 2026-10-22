# Code and visual consistency audit, 22 October 2026

## Scope

Reviewed the source import graph, shared route effects, animation cleanup, service templates, CSS tokens, dependencies, contact request validation, linked routes and rendered local assets. Preserved the editorial Branding landing, approved illustration sources, historical graveyard routes, fixed dot geometry and homepage portrait placeholders. This is a local implementation on `codex/site-consistency-audit`; no CMS data, production settings or form deliveries were changed.

## Changes

| Finding | Resolution |
| --- | --- |
| Branding service pages layered a separate dark theme over the shared service template | All five Branding & Marketing child routes now use the same light service design as UI/UX. Removed the global dark stylesheet and obsolete theme markers. |
| Service supporting copy varied between 15px and 17px, with inconsistent line height and emphasis | Shared service descriptions use the 16px body role and 1.5 line height, while lead introductions retain their separate role. Deliverable and process labels use the shared heading weight. |
| Cross-route hash links stopped at the top because the transition disables router scrolling | Restore visible destination anchors after commit, including streamed targets. “Explore our approach” now lands below the fixed header. |
| 320px inclusion cards clipped longer audit descriptions | Increased the small-screen minimum and allow content-driven height while retaining the fixed 96px mark. |
| Mobile process descriptions could overlap artwork after body-size normalization | Mobile active cards use explicit number, artwork and copy rows with a 24px gap and content-driven height. |
| Short viewports could clip the homepage impact panel inside the pinned work stage | At heights of 700px and below, use a native horizontal rail with full readable card height. Standard tall-view scroll behavior remains. |
| Root reveal effects selected the first main, including hidden cached routes | Select the visible main element. Cancel tracked word animations during cleanup. |
| Decorative dot animations continued offscreen | Pause outside the viewport margin and in background tabs, while preserving geometry, color-step breathing and reduced motion. |
| Careers and a historical archive used unqualified body `:has` styles | Gate page-wide rules with the active route marker and an initial server-render fallback. |
| Service hero border referred to undefined `--border` | Use the shared `--line` token. |
| Inactive process buttons referenced nonexistent panels | Only expose the panel relationship while its content exists. Use pointer entry instead of every mouse movement for selection. |
| Testimonial data imported a whole homepage client component | Import the shared data module directly. |
| Retired service renderers and a dark stylesheet were unreachable | Removed seven unused service files plus the retired dark stylesheet. Kept archived pages and editable artwork. Updated the Hairline README. |
| Supplied page transition | User rejected the pixel experiment and supplied double-stairs. The five columns now use Kyte blue; the original two-layer swipe is saved in backups/page-transition-original. Audit navigation and reduced-motion fixes remain. |
| Design-system documentation retained old dark-theme, corner and transition rules | Updated the live design-system page, route notes and AGENTS.md. |

## Verification

The initial production-build crawl checked 56 linked pages and 237 local asset URLs, all successful, with one H1 per content page. The first responsive pass covered 28 representative routes, including all ten services, at 393px, 810px and 1440px: 84 cases with no document overflow or uncaught JavaScript errors. A visually hidden homepage client label was excluded from clipping findings because the visible client-grid title is separate.

Follow-up checks cover 320px, short 600px viewports, all process and inclusion selections, cross-page anchors, cached-route navigation, CTA style restoration, dot animation idling, pixel-cover growth/flattening and reduced motion. Final checks passed: ESLint, TypeScript, production build (43 routes), illustration palette guard, merge compatibility guard and whitespace checks. The post-cleanup crawl returned 200 for 56 pages and 236 local assets. All 75 rendered external media URLs passed, after retrying one transient DNS lookup. Invalid contact payloads returned 400 before any delivery attempt. The final 84-case viewport sample had no page overflow or uncaught JavaScript exceptions. Additional narrow and short-screen interaction checks found no remaining card overflow or text/artwork overlap. All five light Branding service pages had matching hero font, foreground and surface values at each breakpoint.

Cross-route navigation placed the approach target approximately 112px from the top, below the fixed header. No-refresh CTA regression passed client links, history Back and Product navigation with cached Branding DOM still present. Offscreen dot fields reported paused animations with unchanged 1px radii. Pixel edge samples grew from 20px to 80px variation, then returned to 0px before the covered hold; navigation completed to idle. Reduced-motion navigation bypassed the curtain. Generated screenshots and detailed raw runs remain local review exports.

## Remaining findings and limits

- Current `npm audit --omit=dev` reports zero production advisories. Full audit reports five high-severity entries through `braces`, `micromatch`, `fast-glob` and the Next ESLint toolchain. The suggested automatic fix downgrades `eslint-config-next` from 16 to 14, which does not match this Next 16 application. No incompatible downgrade was applied.
- Other unreferenced exploration components remain candidates for a separate archive cleanup. An import-only scan also flags CSS imported through CSS, configuration aliases and declaration files, so it is insufficient evidence to delete those files. Historical routes and builder inputs were retained.
- Existing prelaunch work placeholders, temporary stock photography, sample testimonial rating blocks, brochure/phone placeholders and final editorial approvals remain documented launch tasks. This audit does not validate those claims or replace them with invented content.
- No form was sent to a real receiver. Successful lead delivery, CMS write permissions, physical-device frame pacing and throttled-network performance remain unverified. Local builds can use content fallbacks when the Sanity CDN DNS lookup fails.

## Superseding transition decision

The user requested the original transition after reviewing both pixel experiments. The pixel results above are historical checks of the rejected experiment. Current implementation restores the original CSS swipe from cfa5d0b, with no pixel canvas. Shared audit fixes remain.

## Current supplied transition

The later user-supplied double-stairs component supersedes the restoration decision above. Five columns now use the shared Kyte-blue token with the supplied 800ms easing and 50ms stagger. The controller waits for cover completion before navigating and keeps the component mounted through exit. The original controller and exact CSS remain in `backups/page-transition-original` with restoration instructions. Existing Framer Motion and TypeScript support were reused; utility classes were translated to the project's CSS conventions without adding Tailwind.
