# Kyte website documentation

Start with root `WEBSITE_PROGRESS.md` for verified release state and the next task.

- [Design-system index](design-systems/README.md): Website, Branding landing and Product landing contracts and browser routes.
- [Content population](content-population.md): edit locations, CMS ownership and the next editorial pass.
- [Template contract](template-system.md): composition and shared UI rules.
- [Audit and release](audit-and-release.md): breakpoint, navigation, loading, archival and release gates.
- [Branding entry](branding-story/DESIGN.md): pointer to the current Branding contract.
- [23 October audit](audits/2026-10-23-content-ready.md) and [release record](release/2026-10-23-design-systems.md).
- `audits/`: dated findings and evidence; each describes its date's state.
- `release/`: exact commits, deployment identities, rollback and live checks.
- `history/`: preserved logs and superseded directions.

The root IA owns routes. The SEO playbook owns page intent and proof. Shared visual tokens live in `src/app/globals.css`; the three design-system pages document those tokens and scoped extensions. `src/data/designSystems.ts` owns route/system mapping. Existing Sanity data and stable slugs remain in place.
