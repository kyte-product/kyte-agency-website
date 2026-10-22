# Kyte website progress

Updated 22 October 2026. Owner: Kyte website team.

## Current status

The shared website template closeout is deployed, with an industry follow-up in verification on `codex/site-consistency-audit`. The user authorized GitHub publication, main merge and Vercel production deployment after the checks. The application runs in `kyte-site/` using Next.js 16.4, React 19.3, TypeScript and the existing Sanity production dataset.

Local review remains on port 3001. A separate production build on port 3002 was used for checks. PR #59 was merged and deployed Ready as `dpl_GStvAgA8gPFAe3QvXadahsGzHgra` at https://kyte-agency.vercel.app, application revision `1d98ecf781984f737bda3bb7870a499a738ca1e8`. This is the rollback target for the industry follow-up.

## Template decisions

- All ten child services share the light design. Service titles have no inline photos; UI/UX art and Branding photography are full-width, already expanded media.
- Branding landing retains the editorial design. Hero height uses its actual 58px header. Bottom corner annotations match Helix glyphs/type/underline. Design News shows three image cards, dark title text with pastel background highlights and an All stories action.
- The closing horizontal sentence uses Kyte blue, following the latest user direction. The final pixel pocket has white backing and an outlined oval homepage action matching Brochure.
- Work and article covers reach both viewport edges. Work naming and sentence-case fact labels are consistent; case-study gaps are tighter. Fincart branding composition motion is full width.
- About has a larger display headline. Article sidebar CTA uses the shared dot component, one description and primary action.
- Shared dots retain fixed 2px geometry on a 7px grid. Logo tickers are excluded from generic reveals to prevent opacity/color flashes.
- Page transitions use the supplied blue staircase with subtle dividers, opaque overlap and weighted motion. Original swipe is preserved in backups.

## Checks and findings

Detailed results: `kyte-site/docs/audits/2026-10-22-template-closeout.md` and release evidence under `kyte-site/docs/release/2026-10-22-template-closeout/`.

- ESLint, TypeScript and production build passed. The build with CMS network access had no content lookup errors.
- 56 linked pages and 238 rendered local assets returned 200; every content page had one H1.
- 56 routes at 393, 810 and 1440px: 168 checks with no horizontal page overflow or uncaught exceptions. The 1px accessible hidden logo label is intentional.
- Navbar arrival contrast and blur passed on 56 routes. Dark/light section switching, responsive menus and Branding/Home/Product client navigation plus browser Back passed without refresh.
- Targeted measurements confirmed full viewport covers and Fincart motion, exactly three news cards, correct highlights, matching corner-label typography and no service photo clipping.
- Production dependency audit has zero advisories. Five existing development lint-tool advisories remain; the proposed automatic fix downgrades the Next lint config to an incompatible older major. No unsafe dependency downgrade was applied.

## Content phase and launch prerequisites

The next work is content curation within the documented templates. Existing homepage work placeholders, stock imagery, sample testimonial rating blocks, brochure/phone placeholders, approved client outcomes and final editorial/legal copy still need owners and approval. Confirm redirects, analytics and actual contact delivery before public launch. No real lead was sent during template checks. Physical-device frame pacing remains a separate check; emulated browser results do not certify every laptop or phone. Robots remain noindex until a deliberate launch decision.

Sanity project `50pibtgs`, production dataset, is preserved. No CMS writes, form deliveries or production configuration changes are part of this release.

## Documentation and preservation

- Current templates: `kyte-site/docs/template-system.md` and `/design-system`.
- Repeatable checks, archival rules and release: `kyte-site/docs/audit-and-release.md`.
- Documentation index: `kyte-site/docs/README.md`.
- Art skill packages: `.agents/skills/README.md`; existing local reference additions are preserved without mixing them into this release.
- Retired components and previous-audit removals: `kyte-site/backups/2026-10-22-template-closeout/`.
- Original page transition: `kyte-site/backups/page-transition-original/`.
- Complete earlier 3,737-line progress log and superseded Branding notes: `kyte-site/docs/history/2026-10-22-before-template-closeout/`. Historical details remain available; this file is the current status source.

## Dated log

22 October 2026: Applied the user's template closeout comments, completed source/import and breakpoint audits, preserved retired code in dated backups, added a short template contract and repeatable audit/release process, indexed skills/exports, and archived the accumulated historical notes. GitHub/Vercel release is in progress. Next: finish release verification, then start approved content replacement.

22 October 2026, industry follow-up: Extracted shared ProductServices and ImpactCards, made the industry black/blue dot cards informative with page-specific text, restored the prior approach photo section, removed Design News and its CMS fetch, fixed service link styling outside Product landing, and added sourced sector statistics with explicit date/geography/forecast context. Added hero top spacing and gray hero placeholders on all four industry pages. Preserved the earlier industry layout in a dated backup. ESLint, TypeScript and production build passed; responsive verification and publication pending.

22 October 2026, subsequent direction: Reinstated the five-item approach accordion on every industry page, replacing photography with changing dot motifs on blue, charcoal and white panels. Applied this shared panel treatment to all ten service outcome sections. Preserved the previous photo implementation under the industry-followup backup. Industry hero placeholders and added top space remain. Checks and publication continue for the combined update.

22 October 2026, follow-up verification: ESLint, TypeScript, production build and diff checks passed. All four industry routes passed 320/393/810/1440px checks (16 cases); all ten services passed all five outcome selections at 393/810/1440px (150 states). Home/Product shared-component regressions passed at 393/1440px. No page overflow or clipped industry statistics. Source notes and visual evidence are documented. Next: push, merge and verify the production follow-up.

22 October 2026, interaction refinement: Kept the same dot SVG mounted while switching selections, so measured dimensions and visibility observers are preserved and motifs do not briefly reset to an empty panel.
