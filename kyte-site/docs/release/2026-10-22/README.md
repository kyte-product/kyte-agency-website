# Website release audit, 22 October 2026

## Scope and target

User authorized the accumulated website changes since the previous push, a review, merge to main, and Vercel deployment. Baseline: origin/main at 0516908 (PR #51). This release includes the product landing/illustration work, shared visual refinements, Branding landing and its page-specific navigation, motion, footer, and service directory. Existing local skill changes and research screenshots are preserved outside the release.

Target: kyte-product/kyte-agency-website, Vercel project prj_9OhUuqvAA2Dt6PBpxnQHGFhLUU4E, root kyte-site. Previous production deployment for rollback: https://kyte-agency-website-ae9d8qca5-kyte-product.vercel.app. Promote that prior production deployment if a release regression is found.

## Latest decisions

- Expanded Branding navigation stays horizontally left aligned and vertically centered. Header remains at the top, actions at the bottom. No horizontal hover shift. Glyph padding and expanded reveal clipping preserve complete letterforms. The service choices take up space only when shown.
- Header state remounts on pathname changes. Browser pageshow/popstate also close it, preventing an open menu on return.
- Gray pixel transitions use identical horizontal and vertical tile sizes; row count adapts to section height.
- Hero lines have negative vertical spacing on desktop and mobile while the supplied images remain uncropped.
- Letter motion uses a rolling entrance interval, so later words animate when visible rather than settling offscreen.
- The kite is behind the horizontal sentence. Descent, rotation and glints depend only on scroll progress. Rotation is slightly stronger. Rendering pauses once the scroll value settles.
- Services highlight the text and both neighboring 2px rules. Testimonial motion changes from 54s to 48s per loop.
- Legal links have 10px more space below. The final pocket keeps its green/sky pixels but has an opaque white background, white final canvas rows and a 12px clipped bottom edge. No blue surface extends below it.
- Page typography uses DM Sans and upright Geist Mono. Shared footer/banner styles stay separate from the Branding variant.

## Checks

- TypeScript, full ESLint and production build.
- Illustration palette guard: 7 palettes, 33 assignments, 56 sources.
- Production-build crawl: 56 internal pages and 234 rendered asset URLs, all returned 200. Each content page had one H1. See http-report.json.
- Desktop browser: Branding hero, menu position and clipping, footer/pocket edge, gray transitions, horizontal letter transforms and navigation behavior. Responsive iframe review used real 390px and 810px CSS viewports for Branding; UI/UX and Work mobile first folds retained their standard controls and spacing. These are browser viewport checks, not physical device performance certification.
- Staged source scan: no credential pattern matches or files above GitHub's size limit.
- Public motion-study vendor copies were moved to ignored .local storage. Removed unused generator declarations. Local research exports and unrelated skill edits are not part of the release.
- Production dependency audit: zero advisories after overriding ts-deepmerge to 8.0.0. Blade's archived theme helper still expects a default export; a small resolveAlias adapter preserves that export. The production build and scripts/check-deepmerge-compat.mjs verify theme merging, merge options and prototype-key protection.

## Remaining limits

Five high-severity findings remain in development-only ESLint tooling through braces 3.0.3. The registry has no later braces release. Do not downgrade the Next ESLint configuration to an incompatible major version to silence them. Production dependency audit is clear. Review when an upstream fix becomes available.

This remains the existing prelaunch site with noindex metadata. This audit did not send forms, verify real lead delivery, approve editorial claims, replace placeholder brochure/phone content, or change Sanity data or production settings. Those launch prerequisites remain separate from this source/UI release.

## Release execution

Publication and live verification are recorded in WEBSITE_PROGRESS.md after deployment completes.
