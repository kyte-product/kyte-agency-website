# Kyte Website CMS

The existing **Kyte Website** Sanity project (`50pibtgs`, `production`) serves published content to the Next.js site. Its versioned Studio source is in `cms/studio/` and is deployed at [Kyte Content Studio](https://kyte-website-content.sanity.studio/). This repository does not contain a Sanity write token.

| Document type | Purpose |
|---|---|
| `workProject` | Case studies and the Work index |
| `servicePage` | Service content on stable IA routes |
| `designNews` | Design News and articles |
| `careerRole` | Careers opportunities and role details |
| `careerPage` | Replaceable Careers hero portraits |

The Careers page reads published `careerRole` documents marked **Open**, ordered by `sortOrder`. Editors can change the title, team, location, work mode, experience level, role scope, hiring process and application URL in Studio. The list opens a role details modal. The original `/careers/[role-slug]` route remains available for direct links and metadata. An Apply button is disabled until that role has a valid HTTP or HTTPS application URL.

Six role entries are intentionally marked **Placeholder listing**. Their titles, locations, levels and descriptions are sample content approved for the prelaunch site. They have no application URLs. Replace and verify the content before public launch. The two hero portraits are also replaceable in the `careerPage` document.

`src/lib/sanity.ts` reads the published perspective with five-minute revalidation. Keep drafts and write credentials on the server. Do not put Sanity write credentials in browser code or `NEXT_PUBLIC_*` variables. Verify client claims, outcome figures, image descriptions and service scope before publishing editorial content.

To build or deploy the Studio, set `SANITY_STUDIO_PROJECT_ID=50pibtgs` and `SANITY_STUDIO_DATASET=production` in the deployment environment and run the scripts in `cms/studio/package.json`. Review any schema change against existing drafts and published documents before deploying. The pre-Careers content export is stored outside the repository at `/private/tmp/kyte-sanity-pre-careers-2026-10-11.tar.gz`.
