# Kyte design systems

Current baseline: 24 October 2026. Implementation and audit, not a final content approval.

| System | Browser documentation | Written contract | Scope |
| --- | --- | --- | --- |
| Website | `/design-system` | [Website](website.md) | All shared templates and controls |
| Branding landing | `/design-system/branding` | [Branding](branding.md) | Exactly `/branding-marketing` |
| Product landing | `/design-system/product` | [Product](product.md) | Exactly `/ui-ux-design-development` and its illustration family |

Branding owns an independent visual foundation. Product extends Website. Child service routes use Website even when their parent landing has an extension. Shared ProductServices artwork also appears on industry pages without changing the surrounding page system.

`src/data/designSystems.ts` is the route ownership registry. `PageTransition.tsx` updates the active document marker on navigation, alongside the existing route/corner markers. A hidden cached page cannot select a destination system. The design-system pages themselves retain the neutral Website shell.

The illustration palette control appears in the Website and Product systems and uses one root provider. Branding documentation excludes the Product illustration library. Brand blue is the initial state on a full load. Changing the preview follows client navigation until the next full load. This is a visual comparison control, not a CMS field or persistent publication setting. The whole Product library is visible in the Product system. Website and Product refer to the same immutable original files and additive brand variants; there are no three divergent asset copies.

## Authority and change process

1. Shared semantic tokens live in `src/app/globals.css`.
2. Current rendered component source owns behavior; these contracts identify its usage and exceptions.
3. Illustration source lives in `hairline/`; original measured colors and assignments remain unchanged in `src/design-tokens/illustration-palettes.json` and its assignment file.
4. The additional palette is in `src/design-tokens/illustration-brand.json`. Generate using `npm run build:illustration-variants`. Guard using `npm run check:illustration-variants`.
5. Update the corresponding contract, browser system page and root progress when changing a visual rule. Keep historical docs dated, not rewritten as current decisions.
6. Use [the content guide](../content-population.md) for tomorrow's editorial work and [the audit/release process](../audit-and-release.md) for checks.

Latest reviewed release: [Insights, Careers and shared controls](../release/2026-10-24-insights-careers.md).
