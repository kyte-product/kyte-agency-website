# Audit, archive and release process

## Before editing

Read `WEBSITE_PROGRESS.md`, IA and the relevant current design notes. Confirm checkout, branch, target project and pending edits. Use one focused branch and exact file staging. Never publish secrets, private source assets or local browser profiles.

## Changes and preservation

Fix shared templates before individual routes. Check the import graph before retiring a file, including CSS imports from differently named components. Move unreferenced experiments to a dated `backups/` folder with origin and restore instructions. Backups are excluded from TypeScript and ESLint and must not be imported by runtime code. Existing graveyard routes remain historical references. Keep skill packages in `.agents/skills/<name>/` with instructions, references, scripts and assets in their existing subfolders. Index them rather than moving their stable entry paths.

## Required gates

1. Run ESLint, TypeScript, production build, palette guard and deep-merge compatibility check.
2. Build with network access to the published CMS. A successful fallback-only build is not proof that CMS retrieval worked.
3. Crawl active linked routes and their assets. Confirm one H1 per content page, useful errors and no missing media.
4. Review every active template and all ten service routes at 320, 393, 810 and 1440px. Add short laptop heights for layout pressure. Record viewport, route and any unresolved clipping.
5. Check header contrast over light, dark and image sections; menu open/close, browser Back, route entry, same-page and cross-route anchors. Test Branding to Home/Product/child services and back without refreshing.
6. Review motion with normal and reduced preferences. Confirm cleanup, offscreen pause, stable logo paint, no stuck transition/scroll lock or uncaught exceptions. Frame timing under an emulated device is not certification of all physical devices.
7. Validate contact error handling without inventing a delivered lead. Actual delivery and analytics require separate evidence.
8. Review the exact diff and content/asset approval scope. Keep unchanged known limitations visible in the report.

## Release

Push the reviewed branch, create/attach a GitHub PR and merge after gates. Verify the intended Vercel team, project, commit and production environment. Prefer the authenticated connector; use the authenticated CLI if its project scope cannot access this project. Inspect the build and deployment until Ready, then check the public homepage, deep links, affected templates and no-refresh navigation. Preserve the previous deployment ID as the rollback path. Record commit, PR, deployment, checks and remaining items in the release report and root progress file. Never describe a local edit or queued deployment as live.

## Documentation upkeep

Keep current status short in root progress. Preserve older logs under `docs/history/`; add dated audit/release evidence rather than duplicating all historical decisions. Update the current template contract and design-system page when a shared rule changes. Content owners use the IA/playbook and existing CMS schema. Audit the documentation links whenever files are moved.

## Repeatable commands

From `kyte-site/`, run `python3 scripts/audit-http.py http://127.0.0.1:3002 /private/tmp/kyte-http-report.json`, then `node scripts/audit-responsive.mjs http://127.0.0.1:3002 /private/tmp/kyte-http-report.json /private/tmp/kyte-responsive-report.json`. The browser script requires Chrome at the macOS application path and an available local debugging port 9237. Keep browser profiles and raw temporary outputs outside Git; copy only reviewed evidence into the dated release folder.

## Current design-system and source checks

Run `npm run check:design-systems`, `npm run check:illustration-palettes`, `npm run check:illustration-variants` and `python3 scripts/audit-source.py`. The source report explicitly retains build-only palette JSON and the Next compatibility alias. Use `node scripts/audit-design-systems.mjs <base-url> <output-directory>` for the shared toggle, client navigation, all service selections and process hover states, article sidebar, form validation and local lab timings. Keep evidence dated; local measurements are not field Core Web Vitals. The three noindex DS routes are included in the HTTP and four-breakpoint crawl.
