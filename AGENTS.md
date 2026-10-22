# Kyte website build guide

This file guides Codex and everyone working on the upcoming Kyte website in this folder. Use plain words when speaking to the team. Keep answers short, state what was done, and make the next step clear.

## Read these first

1. `WEBSITE_PROGRESS.md` for current decisions, status, owners, and the next task.
2. `Kyte_Website_IA.txt` for the approved working route map and navigation.
3. `Kyte_Website_SEO_Content_Playbook.md` for page briefs, keyword research, SEO, proof rules, and writing style.
4. `kyte-site/docs/design-systems/README.md`, the three browser systems (`/design-system`, `/design-system/branding`, `/design-system/product`) and shared tokens in `kyte-site/src/app/globals.css`. Website is inherited; only the exact landing routes apply extensions. Read `kyte-site/docs/content-population.md` before editorial work.
5. The latest screenshots, links, and notes supplied by the user for the page being designed.

For new Kyte website banners or Design News artwork, read `skills/kyte-editorial-art/SKILL.md` before generating an image. It records the visual direction and crop checks from the user's 9 October references.

For new custom isometric illustrations, use `.agents/skills/kyte-isometric-art/SKILL.md` and the relevant reference guide. It supports a written idea, a close visual reference in the same style, or a reference whose idea must be translated from another style. The approved UI/UX Design & Development hero is the construction example. Use its shared perspective, contours, neutral thickness, projected face layouts, and gradient treatment while choosing objects and content for the new page. Keep the skill, illustration source, generated embed, design-system notes, and progress log aligned as the pattern evolves.

The IA and playbook are working plans. When a new user decision changes either, update the source file and record the decision in `WEBSITE_PROGRESS.md`. The older imported Kyte notes and any reference site are background, not permission to reuse claims, copy, designs, or old technical choices. Check current evidence before using them.

## Template baseline and audit process

The shared template baseline is documented in `kyte-site/docs/template-system.md`. Read it before changing shared UI. Use `kyte-site/docs/audit-and-release.md` for repeatable breakpoint, navigation, loading, archival and release checks. Current status stays short in `WEBSITE_PROGRESS.md`; earlier logs are preserved under `kyte-site/docs/history/`.

Retire unused code into dated `kyte-site/backups/` folders with origin/restore instructions. Do not import backup source or include it in runtime checks. Preserve historical graveyard routes and source artwork. Skill package entry points remain under `.agents/skills/<name>/`; use its README index. Generic reveal animation must skip moving client-logo rows, whose own opacity/filter styles must be stable from first paint.

## How we will design and build

1. **Wireframe together.** The user will send references, screenshots, and cues, including examples such as Stripe and Razorpay. Discuss the page goal, audience, content order, layout, and interactions in simple language. Record choices and open questions. Use references as inspiration and do not copy their protected text or distinctive artwork.
2. **Make one sample landing page.** Create and review the first page with real content direction, responsive behavior, and working interactions. Keep it easy to change while the visual direction is being tested. Do not assume it sets the final system until the user approves it.
3. **Grow the design system as the sample page develops.** The user requested a working `/design-system` page on 8 October 2026. It now documents the current color, typography, layout, component, and motion direction. Keep it aligned with the shared tokens and expand it as the landing page and later pages are reviewed. Document final variants for the navbar, footer, buttons, cards, forms, and content sections when those patterns are agreed.
4. **Build the remaining IA pages.** Reuse the agreed system across every route. Draft each page from a page brief in the SEO playbook. Review the page against the wireframe, content brief, accessibility, and the sample page before marking it done.
   Apply the shared scroll reveal to page text and images on every new route. Use the FinCart case study as the motion reference: copy rises and resolves clearly, while media fades into view. Keep existing custom reveals for sections that need their own choreography, avoid double animation, and show content immediately when reduced motion is preferred.
5. **Launch only after a full review.** Check redirects from old URLs, CMS data, responsive layout, forms, accessibility, SEO metadata, analytics, performance, legal pages, and production settings. Record what passed and what still needs work.

Do not build all pages from an unapproved first concept. If a later page needs a new pattern, add it to the design system and update existing uses when needed.

## Content and copy

### Shared dot fields and supporting descriptions

- Use `kyte-site/src/components/ui/DotPattern.tsx` for every decorative dot field. The current geometry is a 7px grid, 3.1px base diameter and 1.3× radius for seeded motifs. The homepage department fields retain their 2px base diameter. Fill the entire assigned area by changing the number of rows and columns. Do not scale the SVG, dot radius or spacing between cards or breakpoints. Only solid fill colors may switch during breathing; position and size stay fixed. Selection-driven motif transitions are a separate approved movement effect, disabled for reduced motion. Use gray/blue on charcoal, blue/white on cobalt, and gray/blue on white. Respect reduced motion. The Kite variant uses the approved mark silhouette.
- Cards with copy beside a dot field use equal 50% columns. Keep all copy in the left half and the field in the right half, filling its full width and height. The Views metric is the explicit stacked exception: copy sits above a slightly shorter field, separated by a 24px gutter. The shared CTA grid is inset 24px on all four sides of its blue half. Service inclusion cards use a fixed 96px square mark at the top left, with no hover-dependent resizing; service process bars alternate blue and black in both states; blue bars use white highlights, black bars use charcoal resting dots and blue highlights. Maintain equal outer insets for impact cards and align a multiline description's last baseline with its metric when they share a row.
- Global page styles must follow the active route marker, with a server-rendered fallback only before that marker initializes. A hidden cached page can remain in the DOM, so a bare `body:has(.branding-marketing-page)` must never change shared controls or page layout. The shared split-CTA action always uses the primary button. Navbar contrast sampling must exclude all page-transition surfaces via the data-page-transition wrapper so overlay colors cannot select the destination navbar theme. All ten child service pages use the shared light template; only the Branding landing page keeps its editorial treatment. Route effects must select the visible main element rather than hidden cached pages.
- Supporting descriptions use the shared `--description-color`, `--description-on-dark` and `--description-on-brand` colors, 16px body type, 425 weight and 1.5 line height. Hero and editorial lead summaries use the separate 18px lead role. Document any new role in the design system before introducing another description size.

- Follow the current IA exactly unless the user changes it. The two service cluster pages are `/ui-ux-design-development` and `/branding-marketing`. There is no `/services` page. The ten child service routes, work, insights, industries, careers, contact, and location pages are listed in the IA.
- Use `Kyte_Website_SEO_Content_Playbook.md` for the brief and keyword intent of each URL. Its Ubersuggest figures are a dated research snapshot, not guaranteed current demand or rankings. Verify search data and the live results before final copy.
- Write like a professional Kyte team member speaking to a client. Be specific about the work, scope, and proof. Never use em dashes. Avoid clipped strings of short sentences with full stops. Never use the “not X but Y” formula. Remove generic AI phrasing and unsupported claims. A human editor must approve public copy.
- Keep one page responsible for each search intent. Use a clear H1, useful opening, descriptive page title and meta description, natural internal links, and meaningful image alt text. Do not add keywords simply to reach a count.
- Confirm client names, results, testimonials, services offered, and legal or regulatory claims before publishing. Do not invent case studies, jobs, outcomes, or author details.

## Sanity CMS plan

Sanity is the planned content manager. Model three main document types, even if the final schema uses different code names:

| Collection | Purpose | Core fields |
|---|---|---|
| Work or case studies | Power `/work` and case pages | Title, unique slug, client approval status, summary, challenge, Kyte's role, process, deliverables, verified outcome, images with alt text, related services and industries, SEO fields, draft/publish state |
| Design news or blog | Power `/insights` and articles | Title, unique slug, summary, author, publish and update dates, cover image with alt text, structured body, topic, related services and work, SEO fields, draft/publish state |
| Services | Power the ten service pages and their cards | Name, stable IA route, service cluster, summary, clear offer and deliverables, process, FAQs where useful, related work, SEO fields, draft/publish state |

Use references between content types rather than copying the same data into many entries. Validate required fields and unique slugs. Keep the route map stable even if an editor changes a title. Keep design tokens and reusable UI components in code; use the CMS for content editors need to change. Decide later whether cluster landing pages and other fixed pages also need CMS fields, and record that decision before building the schema.

The existing Sanity project and content are described in `WEBSITE_PROGRESS.md`. **Do not delete or replace that project as part of routine page work.** The user allowed Sanity setup to be deferred. Before changing projects, identify every site using the current project, find the source of its deployed Studio schema, export the dataset and assets, map all content and references, create and test the replacement, then plan cutover and removal. Record each action and result. Keep API tokens, preview secrets, and write credentials out of the repository and browser code. Use the least access needed, server-side reads for drafts, and separate preview and production configuration.

## GitHub publication authorization

On 9 October 2026, the user explicitly authorized publishing the complete current Kyte website source and assets to the public `kyte-product/kyte-agency-website` repository and confirmed the required approvals are in place. Do not ask the user to repeat that approval for this source or follow-up pushes of the same approved work. Keep secrets and credentials out of Git. Platform-level automated reviews are separate from project instructions and cannot be changed here; report any rejection without trying to bypass it.

## Clean team workflow

- Before implementation, choose and record the web framework, hosting, repository location, and Sanity Studio ownership. Do not assume the older Framer site or a separate local rebuild is the new codebase.
- Keep one shared Git repository for the new site. Each person or Codex task works on its own branch or isolated worktree, with a focused change and a review before merging. Avoid editing the same shared component in two open tasks. Agree on one owner to resolve design system and schema conflicts.
- Organize code by feature or page, with shared components and design tokens in clear folders. Prefer small reusable components over copying whole page sections. Use consistent names, formatting, and TypeScript types if the chosen stack supports them.
- Keep schema definitions and website code versioned. Use migrations for schema or content changes that affect existing entries. Never make a breaking CMS change without checking draft and published content, references, previews, and routes.
- Never commit secrets, personal data, private client material, or unlicensed assets. Keep a safe `.env.example` with variable names only. Give CMS editors roles matched to their tasks and keep production write access limited.
- For each change, run the project's required checks and manually review the affected page on mobile and desktop. Add tests for important behavior such as routing, CMS rendering, and forms. Check keyboard use, labels, contrast, image alt text, loading states, error states, and page speed.
- Use preview deployments for review. Do not publish or change production settings without a recorded launch decision and a rollback path. Record the exact state of external changes instead of saying “done” when only local files changed.

## Handoff after every prompt

At the end of **every completed user prompt or task**, update `WEBSITE_PROGRESS.md` in the same branch or worktree. Keep its current status and next action accurate, then add a dated, concise log entry with the decision, files or external systems changed, checks run, unresolved items, and owner when known. This applies to research and design decisions too, even when no code was written. Mark proposed ideas as proposed, and verify old entries before acting on them. If several people work at once, each records progress in their own branch and the reviewer reconciles entries when merging. Do not overwrite another person's work.

## Illustration palette variants

Product illustrations default to the additive brand-blue version. Preserve original generated artwork and measured palettes unchanged. Use the shared IllustrationPalette provider and wrappers; do not recolor with runtime filters. Regenerate with `npm run build:illustration-variants` and run the preservation guard. Full rules are in `kyte-site/docs/design-systems/product.md`.
