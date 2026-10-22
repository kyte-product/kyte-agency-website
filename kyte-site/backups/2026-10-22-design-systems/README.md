# Design-system cleanup, 22 October 2026

The import audit found no active references to the styles/data/helpers under src/. Moved here with original paths preserved. To restore, copy to the matching app src/ path, add a real importer and run lint, TypeScript and the import audit.

The baseline folder preserves the pre-release Product illustration component and design-system page. The active Product component now selects explicit authored scenes instead of importing four unused generic Hairline fallbacks. Original gradient geometry and assets remain unchanged and separately checksummed.

Do not import backups into the runtime. TypeScript and ESLint exclude backups. Build-only palette JSON and the Next deep-merge alias stay active despite being absent from the route graph. Existing graveyard pages are preserved.
