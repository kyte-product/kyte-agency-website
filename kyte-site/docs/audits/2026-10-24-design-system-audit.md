# Design-system consistency audit, 24 October 2026

Baseline: local branch `codex/browser-review-refinements`, including the approved fixed typography, five-value line-height scale and primary-action role. Compared active source with the Website, Branding and Product contracts. Scope: 171 CSS/TS/TSX files, 49 stylesheets and 24 page modules (dynamic modules cover multiple URLs). Historical graveyard source is excluded.

This is a source-wide audit. It does not claim a visual review of every generated route, viewport, CMS record or interaction state. Declaration counts include media overrides and inactive selectors. Asset pixels, supplied client artwork, embedded illustration documents and third-party widget internals are outside this inventory. Their colors are not automatically interface palette violations.

## Findings

| Priority | Finding | Evidence and reach | Recommended action |
| --- | --- | --- | --- |
| High | Branding news titles still use Geist Mono | `src/app/branding-marketing/branding-editorial.css:23`, all three landing-page news cards. Earlier user direction explicitly requested DM Sans titles. | Change title family to DM Sans and shared title weight; preserve category/date annotations and approved pastel highlights. |
| Medium | Undocumented font sizes | 73 literal declarations outside the registered token sizes: 13px (21), 17px (12), 23px (7), 21px (7), 19px (6), 11px (6), 25px (4), plus single 55/38/46/58/54/29/10/50px uses. Product stylesheet contains 26; Careers 6; testimonial and Branding components also contribute. | Map by text role, then visually review wrapping. Register a new role only when the design needs it. Do not round all sizes blindly. |
| Medium | Undocumented font weights | 32 declarations outside core 400/425/450: 550 (22), 500 (8), 350 (1), 300 (1). Font-face supported ranges are excluded. Includes process labels, contact labels, case-study brand names and DS tables. | Decide which weights are intentional emphasis roles; document or map each use. |
| Medium | Raw colors outside root palette | 167 hex occurrences outside root palette, plus 62 rgb/rgba/hsl declarations requiring context. Largest concentrations: Product 67, FincartStory 35, Branding editorial 9. Includes surface colors, client case-study colors, masks, shadows and approved highlights, so this count is a review queue, not 167 confirmed defects. | Move interface surfaces/text/status colors to semantic tokens; record artwork, masks, overlays and case-study exceptions explicitly. |
| Medium | Duplicate palette literals | 132 occurrences match a root-palette hex but bypass its token. | Replace equivalent interface colors with semantic variables so future palette changes propagate. |
| Medium | Icon policy has an unresolved exception boundary | 42 Lucide imports; no other icon-package imports detected; no active ArrowUpRight or diagonal arrow glyph references. Eight inline SVG sites remain. `branding/EditorialGlyph.tsx` defines ten custom motifs, including phone/reply/brain/arrows; Branding docs explicitly allow editorial glyphs. `ContactExperience.tsx:67` draws a custom animated success check. | Document editorial glyphs as a scoped exception, or replace semantic icon motifs with Lucide after review. Decide whether the animated success check is an approved motion asset. |
| Low | Type tokens are bypassed even at approved sizes | 191 literal font-size declarations match registered scale values. | Replace with semantic role tokens during normalization. Matching pixels alone do not establish matching weight, tracking or leading. |
| Low | Legacy corner tokens disagree with effective rules | Root radius tokens remain 8/12/18px, while the active compact scope forces 2px outside Branding. | Reconcile token names/defaults with effective corner rules; preserve Branding oval and authored artwork geometry. |

## Color interpretation

`#f8f9f9` occurs 21 times, largely around Product artwork and scene backplates. These may need to match embedded artwork exactly. Do not recolor them without checking seams. FincartStory uses client-specific colors, which should become an explicit case-study exception. Branding news pastel backgrounds and testimonial highlights are already permitted by its contract. Alpha black/white values used in masks and shadows are effects, not extra brand colors. Root tokens already include several legacy neutral and expressive colors; token existence alone does not authorize every token on every surface.

## Typography and icon checks that passed

The current typography guard finds no fluid CSS font sizes or off-scale line-height declarations in active stylesheets. All explicit leading uses the approved 1.2/1.3/1.4/1.5/1.6 scale or approved inheritance. Font families are DM Sans/inheritance with Geist Mono in Branding and its DS specimen. The selected homepage primary action uses its registered 15px/21px, 450-weight style with zero tracking.

Six of the eight inline SVG sites are illustration or structural drawing: Product orbit illustration, framework connector, dotted field, page transition and two Branding process diagrams. They are not replacement UI icon packs. Brand/social logo assets should retain their identity artwork.

## Evidence and follow-up

`2026-10-24-style-inventory.json` contains every flagged declaration with file and line, plus inline SVG sites and icon-package imports. Regenerate with `python3 scripts/audit-design-styles.py`. The scanner is a declaration inventory, not a CSS cascade parser; manually review every candidate before changing it. The two current guards passed: `check:typography` and `check:design-systems`.

Suggested normalization order: news-title font; registered typography roles and weights; semantic interface colors; scoped icon exceptions; corner-token cleanup; browser review of affected templates at desktop/tablet/mobile. This audit changes documentation and adds a repeatable inventory script. Application styles have not been changed by this audit.


## Resolution, 24 October 2026

Follow-up user direction makes Branding visually independent. Branding now owns a --brand- token snapshot, responsive scale, local annotation sizes/weights, palette/detail register and decorative editorial glyph exception, documented on /design-system/branding. Root Website heading/copy rules exclude its landing main. Shared route infrastructure resolves to the Branding snapshot on that route. Child services retain Website ownership.

Other active styles now use registered type roles, weights 400/425/450 and the five approved leading ratios. Raw component color declarations resolve to registered variables; artwork surfaces, client colors and alpha effects preserve exact values in the detail register. This is centralization of those authored values, not evidence that each has become a primary brand color. News titles are DM Sans. Contact success uses Lucide Check with adjusted stroke animation. Root corner defaults match the 2px compact contract. Decorative Branding glyphs are explicitly scoped; structural SVG and logos are retained.

The new check:styles guard passes with no literal font sizes/unregistered weights outside Branding, no raw component hex colors outside token sources, and no Website foundation references in Branding stylesheets. Existing JSON remains the original audit evidence. Typography, design-system and illustration checks, focused lint, TypeScript and production build passed. Browser spot checks cover the independent Branding page at 1093/393px and Home/Product/About/Careers/Insights/Contact at 393px with no page overflow. This does not substitute for reviewing all CMS permutations.
