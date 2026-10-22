# Kyte Website CMS

The existing **Kyte Website** Sanity project (`50pibtgs`, `production`) serves published content to the Next.js site. Its versioned Studio source is in `cms/studio/` and is deployed at [Kyte Content Studio](https://kyte-website-content.sanity.studio/). This repository does not contain a Sanity write token.

| Document type | Purpose |
|---|---|
| `workProject` | Case studies and the Work index |
| `servicePage` | Service content on stable IA routes |
| `designNews` | Design News and articles |
| `careerRole` | Careers opportunities and role details |

The Careers page reads published `careerRole` documents marked **Open**, ordered by `sortOrder`. Editors can change the title, team, location, work mode, experience level, role scope, hiring process and application URL in Studio. The list opens a role details modal. The original `/careers/[role-slug]` route remains available for direct links and metadata. An Apply button is disabled until that role has a valid HTTP or HTTPS application URL.

All ten service pages in `Kyte_Website_IA.txt` now have published `servicePage` records in the existing `50pibtgs` / `production` dataset. The current shared schema is deployed to [Kyte Content Studio](https://kyte-website-content.sanity.studio/). Service records include the page introduction, offerings, inclusions, outcomes, deliverables, four process stages, FAQs, and SEO title and description. The stable leaf slug maps to the child route, for example `ux-research-design-audit` maps to `/ui-ux-design-development/ux-research-design-audit`.

The service routes read this published content through `getPublishedServiceBySlug()` in `src/lib/sanity.ts`, and `src/lib/service-content.ts` maps it to the shared page components. `src/data/servicePages.ts` remains a local fallback for build or CMS availability issues. Keep Sanity as the source editors change; update the fallback when its content is intentionally revised so offline previews stay representative. The existing `sections` field and older service drafts were preserved during this additive schema update.

Six role entries are intentionally marked **Placeholder listing**. Their titles, locations, levels and descriptions are sample content approved for the prelaunch site. They have no application URLs. Replace and verify the content before public launch. The About headline portraits are fixed site assets; the unused `careerPage` Studio type has been removed. Its existing Sanity document remains stored for rollback and is not read by the website.

`src/lib/sanity.ts` reads the published perspective with five-minute revalidation. Keep drafts and write credentials on the server. Do not put Sanity write credentials in browser code or `NEXT_PUBLIC_*` variables. Verify client claims, outcome figures, image descriptions and service scope before publishing editorial content.

To build or deploy the Studio, set `SANITY_STUDIO_PROJECT_ID=50pibtgs` and `SANITY_STUDIO_DATASET=production` in the deployment environment and run the scripts in `cms/studio/package.json`. Review any schema change against existing drafts and published documents before deploying. The pre-Careers content export is stored outside the repository at `/private/tmp/kyte-sanity-pre-careers-2026-10-11.tar.gz`.

## Content pass and visual systems, 22 October 2026

Use [content population](../docs/content-population.md) for edit locations and [the design-system index](../docs/design-systems/README.md) for template inheritance. The shared four-card process uses mapped processIntroduction/process stage content (the code fields are `processIntro` and `processSteps`) with fallback values. Product illustrations default to the separate blue variant; the original color version is preserved and selectable in all three browser design systems. Palette selection is a preview control, not a CMS content field. Existing published records and slugs are unchanged.
