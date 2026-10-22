# Kyte website progress

Updated 22 October 2026. Owner: Kyte website team.

## Current status

The shared website template is in the final audit and release pass on `codex/site-consistency-audit`. The user authorized GitHub publication, main merge and Vercel production deployment after the checks. The application runs in `kyte-site/` using Next.js 16.4, React 19.3, TypeScript and the existing Sanity production dataset.

Local review remains on port 3001. A separate production build on port 3002 was used for checks. Release has not yet completed; the verified previous production deployment is `dpl_G34JjnvCRNGrpM4poUwPfZ6Ccv3q` at https://kyte-agency.vercel.app, application revision `2da30fb44d685d24087c267df3339693f6dacb7f`.

## Template decisions

- All ten child services share the light design. Service titles have no inline photos; UI/UX art and Branding photography are full-width, already expanded media.
- Branding landing retains the editorial design. Hero height uses its actual 58px header. Bottom corner annotations match Helix glyphs/type/underline. Design News shows three image cards, dark title text with pastel background highlights and an All stories action.
- The closing sentence continues the gray news surface. The final pixel pocket has white backing and an outlined oval homepage action matching Brochure.
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
