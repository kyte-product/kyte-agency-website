# Kyte Website CMS

The connected `product@kyte-agency.com` Sanity account owns the existing **Kyte Website** project (`50pibtgs`). Its `production` dataset is publicly readable. Editors use the [hosted Kyte Studio](https://www.sanity.io/@osvdnvrwy/studio/ukrt8lls3m5w87uie5qrotl8) and its `kyte-content` workspace.

The Studio currently manages three document types:

| Type | Use | Public route |
|---|---|---|
| `workProject` | Case studies and work index | `/work/[slug]` |
| `servicePage` | Service content | Fixed path in `src/lib/sanity-routes.ts` |
| `designNews` | Insights and articles | `/insights/[slug]` |

The ten service drafts follow the approved IA. Four older service drafts remain in the Studio for review. The new drafts contain only route labels and placeholders. Editors must add approved copy, images with alt text, service scope, proof, and SEO fields before publishing. Work outcomes and testimonials require verification. Drafts do not appear in the public read API.

`src/lib/sanity.ts` provides server-side reads from the published perspective, with five-minute revalidation. `/work`, `/work/[slug]`, `/insights`, and `/insights/[slug]` now render these entries. The homepage retains its curated preview cards. No write token is required or stored in the site. Do not put a Sanity write token in `NEXT_PUBLIC_*` variables.

All 19 Work and 8 Design News documents are still drafts as of 9 October 2026. To review every entry without publishing it, the local development server reads an ignored `.local/sanity-preview.json` snapshot made through the connected Sanity plugin. This file is intentionally excluded from Git and production builds. It must be refreshed after editorial changes. Production reads only published entries and currently shows empty listing states. Publishing an entry will make it available to the production read layer; a website deployment is needed to ship the new page templates themselves.

The Design News index follows the local ANAND newsroom reference's featured-story carousel, topic guide row, and filterable dated list, adapted to the Kyte design tokens and available Design News fields. Article details use its title, metadata rail, cover, and body structure. ANAND-only media coverage, newsletter, and media-kit sections have no corresponding Kyte content type and were not carried over.

Editorial cleanup before publishing: all eight Design News drafts lack a publish date and use the same inaccurate cover alt text. The site treats those cover images as decorative while the adjacent title gives context. Add correct image descriptions and publication dates in Sanity. Review client claims and case study roles, particularly entries where the role repeats the project title. Verify any outcome figures before using the impact area.

The active Studio schema was deployed from outside this repository. Its schema source and deployment owner still need to be located before changing fields or replacing the Studio. The current remote schema ID is `uEiDujCQeEe840Egrofw_Aa3VCqCxAeMpCG1n0wrXtTgLCQ`. Keep the existing project and drafts intact while that source is found. Any schema change needs a content export, reference check, and a tested migration plan.

Before switching a route to CMS content, resolve the existing Collectbee case study slug (`collectbee-website`) against the current `/work/collectbee` preview route, and confirm the editor's intended canonical URL. Keep service paths stable even if a title changes.
