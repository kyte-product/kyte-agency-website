# Kyte website build guide

This file guides Codex and everyone working on the upcoming Kyte website in this folder. Use plain words when speaking to the team. Keep answers short, state what was done, and make the next step clear.

## Read these first

1. `WEBSITE_PROGRESS.md` for current decisions, status, owners, and the next task.
2. `Kyte_Website_IA.txt` for the approved working route map and navigation.
3. `Kyte_Website_SEO_Content_Playbook.md` for page briefs, keyword research, SEO, proof rules, and writing style.
4. `kyte-site/src/app/design-system/page.tsx` and the tokens in `kyte-site/src/app/globals.css` for the current visual foundation.
5. The latest screenshots, links, and notes supplied by the user for the page being designed.

The IA and playbook are working plans. When a new user decision changes either, update the source file and record the decision in `WEBSITE_PROGRESS.md`. The older imported Kyte notes and any reference site are background, not permission to reuse claims, copy, designs, or old technical choices. Check current evidence before using them.

## How we will design and build

1. **Wireframe together.** The user will send references, screenshots, and cues, including examples such as Stripe and Razorpay. Discuss the page goal, audience, content order, layout, and interactions in simple language. Record choices and open questions. Use references as inspiration and do not copy their protected text or distinctive artwork.
2. **Make one sample landing page.** Create and review the first page with real content direction, responsive behavior, and working interactions. Keep it easy to change while the visual direction is being tested. Do not assume it sets the final system until the user approves it.
3. **Grow the design system as the sample page develops.** The user requested a working `/design-system` page on 8 October 2026. It now documents the current color, typography, layout, component, and motion direction. Keep it aligned with the shared tokens and expand it as the landing page and later pages are reviewed. Document final variants for the navbar, footer, buttons, cards, forms, and content sections when those patterns are agreed.
4. **Build the remaining IA pages.** Reuse the agreed system across every route. Draft each page from a page brief in the SEO playbook. Review the page against the wireframe, content brief, accessibility, and the sample page before marking it done.
5. **Launch only after a full review.** Check redirects from old URLs, CMS data, responsive layout, forms, accessibility, SEO metadata, analytics, performance, legal pages, and production settings. Record what passed and what still needs work.

Do not build all pages from an unapproved first concept. If a later page needs a new pattern, add it to the design system and update existing uses when needed.

## Content and copy

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
