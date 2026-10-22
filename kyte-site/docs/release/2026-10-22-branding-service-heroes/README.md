# Branding service hero placeholders, 22 October 2026

## Change

All five Branding & Marketing child service pages now show a solid gray placeholder (`--color-placeholder`, `#e7e8ea`) in place of the Unsplash hero image. The existing responsive media height and spacing are retained. The shared component only changes output for `branding-marketing/` paths. UI/UX and Product hero art remains unchanged. Existing photography assets are preserved.

## Verification

- Focused ESLint and production build passed.
- Each of the five routes was inspected at 393px and 1440px (10 cases): placeholder present, computed color `rgb(231, 232, 234)`, no hero image, no horizontal overflow.
- At 393px the placeholder is 630px high; at 1440px it is 860px high, matching the existing responsive hero media sizing.
- UI/UX website-design hero art remains present; no gray Branding placeholder is rendered there.

## Release

## Publication

PR #62 merged to main at `424253dda568eb667f788987d07c1c4188843776`. Vercel production `dpl_2eizvNcMJezozw6YcHjxuAwcm7aV` is Ready at https://kyte-agency.vercel.app. The immutable release is https://kyte-agency-website-qbdonhirs-kyte-product.vercel.app. Rollback is the preceding application deployment `dpl_HmTYphmR7mqztcivboXgEJMkUnyo`. The same five Branding routes plus UI/UX artwork were checked against the live alias at 393px and 1440px. No CMS writes or content data changed.
