# Website template closeout audit, 22 October 2026

Scope: all active route templates, shared navigation/motion, unused source, documentation, the 17 supplied browser comments, and the earlier unshipped service consistency batch. Owner: Kyte website team. No CMS writes, real form delivery or launch configuration changes.

## Corrected issues

| Finding | Result |
| --- | --- |
| Branding hero subtracted the standard header height although its header is 58px | Shared first-fold calculation now matches its actual header. At 393/810/1089/1440px, hero top is 58px and bottom exactly 827px in the tested 827px viewport. |
| Branding hero annotations were smaller than Helix and lacked its marks | Matching 12px mobile, 16–18px sampled desktop type, underline and inline glyphs. |
| Design News showed ten cards with colored text | Exactly three cards, dark titles over blue/mint/coral highlights; action reads All stories. |
| White/pixel break interrupted the gray news-to-closing handoff | Removed that extra boundary; closing phrase now continues the gray surface. |
| Final homepage pocket action did not match the editorial button | Outlined oval and Geist Mono match Brochure; explicit white bottom backing prevents the blue final rule. |
| Branding service photographs entered with a shrinking crop | Replaced the scroll crop with a static expanded shared photo component and archived the old implementation. |
| Service hero portraits and inset artwork complicated the header | Removed research title portraits; all five UI/UX hero illustrations are full width, with full-width Branding service photos. |
| About title was too small | Increased the dedicated display scale to 56–92px desktop and 42–60px mobile. |
| Article sidebar CTA repeated the logo and lacked context | Small fixed dot motif, descriptive line, taller card and shared primary action. |
| Work/article covers and Fincart branding composition were inset | Full viewport media in dynamic Work, articles and Collectbee template. Fincart motion measured at the full viewport width. |
| Work breadcrumb/fact treatment varied | Work label and sentence-case, medium-weight metadata; tighter gaps across Fincart and shared case templates. |
| Logo ticker briefly painted at full opacity then changed | Generic media reveal animation overrode the intentional logo opacity. Tickers now own their paint/motion and are excluded. Brand lists consolidated into a data module. |
| Fincart branding animation loaded its JSON/runtime on route entry | Deferred until within 600px, aborts its request on teardown and catches failed loading. Existing offscreen playback pause retained. |
| Prior Design News edit omitted the carousel state import | Restored the missing import; TypeScript now passes. |
| Unused experiments lived beside runtime components | Import graph identified unused components; moved them and dependent CSS to dated backups. All earlier audit removals recovered from Git into the same backup area. Original transition remains separately backed up. |
| Progress and Branding notes mixed thousands of historical decisions with current rules | Preserved the complete 3,737-line log and old notes under docs/history. Added concise current progress, template contract, documentation index and repeatable audit/release process. |
| Art skills and exports lacked an entry-point map | Added indexes while preserving stable package paths and local drafts. Unrelated in-progress art-skill modifications and untracked reference exports are excluded from this release. |

## Checks

- ESLint, TypeScript, production build with CMS access, illustration palette guard, deep-merge compatibility and whitespace checks passed.
- HTTP crawl: 56 linked pages, 238 rendered local assets, no failed requests or H1 issues.
- Responsive sweep: all 56 linked routes at 393, 810 and 1440px, 168 cases. No page overflow or uncaught exceptions. Only the deliberate 1px accessible homepage client label reported clipped text.
- Additional 320px, 1089x600 and 1024x768 service inclusion/process state checks found no copy/art overlap or card overflow.
- Navbar: 56 route arrivals had the intended light mode and blur. Explicit dark-panel/light-top switching passed. Menus at 320/393/810/1089px fit the viewport and released scroll lock. Both desktop menus expanded within the viewport and closed with Escape.
- Home to Branding to Home, browser Back and onward Product navigation retained the exact shared primary CTA styles without refresh, even with cached Branding DOM present.
- Normal staircase kept five blue opaque columns, 0px corners, overlap and subtle inset dividers. Cross-route approach anchor arrived about 112.5px below the top and cleared the curtain. Reduced-motion navigation completed without an overlay.
- Final 393px and 1440px checks confirmed Collectbee, Fincart and article covers start at x=0 and match viewport width. Deferred Fincart animation mounted successfully at both sizes.
- Targeted DOM measurements and screenshots covered the Branding hero/news/footer, sidebar CTA, About, research and graphic-design media, Fincart and Collectbee covers.
- A warmed-cache throttled sample (120ms latency, 200KB/s download) exposed headings in the three sampled templates within about 0.85s. This is a smoke check, not a cold-load LCP benchmark.
- Invalid empty contact payload returned 400 before any delivery. No real contact or career application was sent.
- Production dependency audit: zero advisories. Five existing high-severity development-only advisories originate in braces via the Next lint toolchain. No patched compatible upstream chain is currently proposed by the audit; its automatic alternative downgrades the framework lint config. Retained and flagged rather than applying an incompatible downgrade.

## Template handoff and remaining work

The template baseline is documented in docs/template-system.md. Continue with approved content, assets and proof in the existing layouts. Prelaunch placeholders, sample ratings, temporary photography, brochure/phone/legal/editorial approval, analytics, redirects and real delivery remain content/launch tasks. Robots remain noindex. Physical-device frame pacing and truly cold mobile Core Web Vitals remain unverified. Historical graveyard pages, source artwork and old implementations are preserved; no speculative claims were added.

Exact release identities and post-production checks are maintained in ../release/2026-10-22-template-closeout/README.md.
