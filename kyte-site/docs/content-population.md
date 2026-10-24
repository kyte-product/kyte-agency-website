# Content population guide

Current: 24 October 2026. The IA owns route names; the SEO playbook owns intent and proof rules. Keep existing slugs stable.

## Where to edit

| Content | Primary editor/source | Notes |
| --- | --- | --- |
| Ten child service pages | Existing Sanity Studio, `servicePage` records | Hero/opening, offerings, inclusions, five outcomes, deliverables, process introduction/four stages, FAQ and SEO. Published reads use five-minute revalidation. |
| Service fallback | `src/data/servicePages.ts` | Keep representative when intentionally changing CMS content; do not substitute fallback edits for Studio publishing. Mapping is in `src/lib/service-content.ts`. |
| Work/case studies | Sanity `workProject`; existing custom case components for authored layouts | Verify title/client/summary/role/media/outcomes and approval. Preserve custom Fincart/Collectbee asset ownership. |
| Insights / Design News | Sanity `designNews`, structured body and cover | Verify title, slug, summary, category, dates, author and alt text. Branding uses only three cards from the same data. |
| Careers | Sanity `careerRole` | Six sample listings remain marked as placeholders. Replace with confirmed openings and a valid application URL before enabling applications. |
| Home | `src/app/page.tsx`, Home section components and data modules | Five supplied project covers are installed; impact figures, testimonials and the authored claims in the covers still need final editorial sign-off. |
| Branding landing | `src/app/branding-marketing/page.tsx` and `src/components/branding/` | Replace content within its local system; keep supplied artwork unless a replacement is approved. |
| Product landing | `src/app/ui-ux-design-development/page.tsx`, Product components | Edit labels/copy; preserve illustration scene mapping and inspect both palette versions after any rebuild. |
| Industries | `src/data/industryPages.ts` and `industrySnapshots.ts` | Preserve source, geography, reporting year and forecast labels; do not invent sector-only figures from wider-market values. |
| Photos / logos / testimonials | `pagePhotography.ts`, client data modules and approved public assets | Check usage rights, client approval and meaningful alt text. |
| Contact, legal and shared footer | Corresponding route/component sources | Confirm phone/brochure destination, email delivery, legal review and analytics separately. |

Studio entry: [Kyte Content Studio](https://kyte-website-content.sanity.studio/). Existing project `50pibtgs`, dataset `production`, is preserved. See [CMS ownership](../cms/README.md). No dataset replacement or CMS write is required for the design-system/illustration release.

## Practical content pass

1. Choose the route and its system from the [system index](design-systems/README.md). Children use Website even when the parent landing has its own system.
2. Replace placeholders with approved content, keeping one H1, sensible title/summary length, meaningful link names and useful alt text.
3. Preview all populated sections, not just the first fold, at 393/810/1440px and 320px for long labels. Check active tabs, FAQ, process expansion and article topic scrolling.
4. Check CMS status and published output after revalidation. Do not report fallback rendering as proof that a CMS edit is live.
5. Keep unsupported results, sample ratings, placeholder jobs and tentative client claims out of final published copy. Design preview publication is not a decision to enable indexing.
6. Update the current progress/audit record with the route, owner, review and exact deployment state.

## Known editorial work before public launch

Work imagery and featured projects, service/industry hero placeholders, stock images, testimonial rating blocks, brochure/phone destinations, final role listings, source approvals and legal copy require content owners. The release audit distinguishes intentional placeholders from broken assets. No lead is sent by the audit, and contact validation alone does not verify delivery. Analytics, redirects, performance on physical devices and final public indexing need their own verified checks.

### Specific cover-copy correction for the content owner

The supplied Fincart product cover says “Reducing Financial Plan Creation Time by 200%.” A time reduction cannot exceed 100%. Confirm the underlying before/after measurement and rewrite the artwork with the correct percentage or speed comparison. The supplied image is preserved exactly in this release; its claim is not independently verified. The other cover metrics also need source sign-off before final launch.

Kyte impact figures shared by Home and the Product landing are maintained in `src/data/kyteImpact.ts`. Edit them there to keep both pages aligned; preserve the views period. Industry metrics remain in `src/data/industrySnapshots.ts` with their source/context and must not be substituted for Kyte figures.


## Resource and guide items, 24 October 2026

- Resource sample cards link to /insights/resources/[slug]. Update ResourceItem in src/lib/editorial-items.ts: article title/summary/body/cover, audience, format and optional download URL/label/fileType. Use a real licensed file before adding a download field. Design News and Resources render through EditorialArticleTemplate, so shared article layout changes apply to both.
- Guide sample cards and featured guide link to /insights/guides/[slug]. Update GuideItem: article title/summary, audience, level and ordered steps with title/description. Steps generate the article body and contents anchors. Library order defines previous/next navigation.
- Stable slugs are explicit in src/lib/editorial-collections.ts. Titles may change independently. Unknown slugs return 404.
- These eight pages are sample content and remain noindex. Resources expose sample status; guide notices are hidden at the user’s request. No CMS writes or schema migrations were made. CMS-backed resource/guide collections can later implement the same typed contracts after schema/content review.


24 October 2026 detail review: resource preview downloads now point to four real sample TXT checklists in public/downloads/resources. Replace these with approved assets and update download URL/fileType/format together. Resource content is displayed as one paragraph, with details in the sidebar and a gray image placeholder. Guides use a viewport-height desktop library with internal scroll, a highlighted fact strip and gray placeholders between sections. The visible guide sample notice is removed; sample provenance remains in this handoff and source metadata.

Careers culture principles live in `src/app/careers/page.tsx`; gallery themes and the two blue-card positions per theme live in `CareerCultureGallery.tsx`. Gray photo blocks are intentional placeholders, not missing asset requests. Replace with approved team photos and useful alt text. Resource downloads currently contain four real sample TXT checklists; replace URL, format and file type together when approved assets are supplied.
