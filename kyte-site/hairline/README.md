# Hairline artwork

`workstack.js` is the editable figure source for the Discover card on UX Research & Design Audits. It was made with the [Hairline create skill](https://hairline.lucasmarkes.com/skill) and validated in the standalone `hairline-workstack.html` bench. The figure depicts four research briefs in a tray. Each of the four process stages on every service route now selects separate artwork in `src/data/serviceProcessFigures.ts`.

The UX audit route loads `public/hairline/workstack-embed.html`, a presentation copy of that bench with its testing controls hidden. It uses the Stripe preview violet or original Kyte blue according to the selected site palette. If the figure changes, update both HTML copies from the same `workstack.js` source and repeat the Hairline validator and `look.mjs` visual check. The homepage Product Design card intentionally retains Hairline's Laptop figure. The Branding card uses Exploded and the archived About At a Glance focus card uses Loupe from `@lucasmarkes/hairline/react`.

The forty process cards use forty distinct drawings: thirty-two interactive Hairline package figures, the custom Workstack embed, and seven small inline SVG drawings in `src/components/ServiceProcessCustomFigure.tsx`. The inline drawings use the same thin-line and brand-color treatment but are currently static. The homepage Product Design Laptop is not part of the process map.

| Service | Discover | Define | Develop | Deliver |
| --- | --- | --- | --- | --- |
| UX Research & Design Audits | Workstack | Loupe | Sieve | Riffle |
| Website Design & Development | Branches | Format | Exploded | Router |
| Mobile App Design | Phone | Drawer | Keyboard | Plug |
| SaaS & Web App Design | Cabinet | Stack | Rebuild | Terminal |
| eCommerce & Shopify Websites | Basket | Rail | Hub | Vault |
| Brand Strategy & Identity | Settle | Phosphor | Turntable | Lockers |
| Graphic Design | Plot | Patch | Terrain | Palette SVG |
| Video Production & Motion Graphics | Dish | Slow | Elevator | Storyboard SVG |
| Social Media Marketing | Relay | Social map SVG | Content grid SVG | Publishing SVG |
| SEO & AI Search Optimisation | Query | Padlock | Search map SVG | Index grid SVG |

Use `src/data/serviceProcessFigures.ts` to change a pairing. The custom embed, native components, and inline SVGs use the current brand color; only the UX audit needs an HTML copy.

The new service and industry photography is selected in `src/data/pagePhotography.ts`. Those Unsplash photos are temporary editorial imagery. They do not represent client work, and the live case-study assets and client logos remain separate.
