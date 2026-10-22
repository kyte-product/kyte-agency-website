# Retired template components, 22 October 2026

Preserved source for restoration. These files are outside the application runtime and excluded from TypeScript and ESLint.

- `ExpandingPhotoStage.tsx` and CSS: retired shrinking photo reveal. Replaced by `src/components/ServiceHeroPhoto.tsx`, a static expanded media panel.
- `AnandImpact`, `AnandGlance`, `Sustainability`: unused reference-site experiments. Retained assets/data remain in the repository and are not claims for Kyte.
- `KyteCapabilities`: retired capability-card experiment.
- `AboutHorizontalGallery`: superseded About gallery experiment.

To restore, copy the file pair to its original component directory and review its imports, current content approvals, route ownership and responsive behavior. Do not import from this backup folder. Existing graveyard routes and the original page-transition backup are preserved separately.

Additional import-graph audit: KyteGlance with its base/override CSS, SectionBreak, DesignPhilosophy, LedMatrix, StoryPromos and ServiceDepth are also unreachable from current or graveyard route entry points. Their sources are preserved here. The similarly named graveyard snapshots remain active historical routes and are unchanged. The `previous-audit/` subfolder restores all eight files removed by the earlier audit from the pre-audit Git revision.
