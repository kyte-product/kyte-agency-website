# Branding service hero placeholders, 22 October 2026

## Change

All five Branding & Marketing child service pages now show a solid gray placeholder (`--color-placeholder`, `#e7e8ea`) in place of the Unsplash hero image. The existing responsive media height and spacing are retained. The shared component only changes output for `branding-marketing/` paths. UI/UX and Product hero art remains unchanged. Existing photography assets are preserved.

## Verification

- Focused ESLint and production build passed.
- Each of the five routes was inspected at 393px and 1440px (10 cases): placeholder present, computed color `rgb(231, 232, 234)`, no hero image, no horizontal overflow.
- At 393px the placeholder is 630px high; at 1440px it is 860px high, matching the existing responsive hero media sizing.
- UI/UX website-design hero art remains present; no gray Branding placeholder is rendered there.

## Release

GitHub PR and production deployment details will be added after publication. No CMS writes or content data changed.
