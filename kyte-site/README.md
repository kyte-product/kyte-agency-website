# Kyte website preview

This is the Next.js preview of the upcoming Kyte website. It includes the homepage, a working design system, a Collectbee case study preview, and placeholder destinations for the planned routes. It is not connected to Sanity. Pages remain `noindex` while the content and client permissions are under review.

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
- `../AGENTS.md` and `../WEBSITE_PROGRESS.md`: project rules and current handoff state.

The first landing page remains under review. Keep Sanity credentials out of this app. Confirm client permissions and provisional content before any production launch.
