# Kyte website preview

This is the Next.js preview of the upcoming Kyte website. It includes the homepage, a working design system, a Collectbee case study preview, and Work and Design News pages backed by the existing Sanity content model. Local development can show a private snapshot of drafts; production reads published entries only. Pages remain `noindex` while the content and launch review continue.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Run `npm run lint` and `npm run build` before sharing a change.

## Where to edit

- `src/components/SiteHeader.tsx`: announcement bar, desktop dropdowns, mobile menu, and IA route labels.
- `src/components/Hero.tsx`: homepage hero copy and CTA.
- `src/app/globals.css`: shared visual tokens and homepage styles.
- `src/app/design-system/page.tsx`: working design system documentation.
- `src/app/[...slug]/page.tsx`: preview placeholders for planned routes. Replace them with approved pages as each page is designed.
- `cms/README.md`: Sanity project, editorial types, route mapping, and Studio ownership notes.
- `src/lib/sanity.ts`: published Work, Services, and Design News queries.
- `src/lib/editorial.ts`: local draft preview in development and published CMS reads in production.
- `src/app/work/` and `src/app/insights/`: CMS listing and detail routes.
- `src/lib/sanity-routes.ts`: fixed public paths for the ten child services.
- `../AGENTS.md` and `../WEBSITE_PROGRESS.md`: project rules and current handoff state.

The first landing page remains under review. Keep Sanity write credentials out of this app. Verify provisional content before any production launch.
