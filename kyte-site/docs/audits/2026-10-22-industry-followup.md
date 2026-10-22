# Industry follow-up, 22 October 2026

## Decisions

All four industry pages retain their hero, opportunity, approach photo, client ticker, impact story, Selected Work and FAQ sequence. Gray hero media are intentional temporary placeholders, with more space above the title. Two black/blue dot cards now explain page-specific considerations without link/button affordances. The initial correction restored the approach photo. A subsequent user decision brings back the five-item accordion, now using varied abstract dot panels instead of photos. The same blue/charcoal/white treatment applies to all ten service outcome accordions. Original photo implementation is preserved in the dated backup.

The five illustrated Product landing service cards share one component. A Product-only CSS ancestor prevented the final CTA override on industry pages, leaving generic borders and space-between alignment. The override now applies to the shared service component and explicitly aligns the arrow beside the text.

Industry impact uses four cards in one row, text above artwork. No agency counts or Across Kyte's work caption. Design News and its unused CMS fetch are removed. Home's original impact content and department links remain.

Branding's closing horizontal sentence is Kyte blue again. The older industry layout is preserved in backups/2026-10-22-industry-followup.

## Fact sources and maintenance

`src/data/industrySnapshots.ts` owns the values and visible source context. These are dated snapshots, not live dashboards or claims about Kyte results. Wider ecosystem measures are explicitly labelled. Review source definitions, reporting periods and rounding before changing a value. Preserve forecast labels. Final content still needs the normal editorial review.

- Fintech: [World Bank, Global Findex 2025 press release](https://www.worldbank.org/en/news/press-release/2025/07/16/mobile-phone-technology-powers-saving-surge-in-developing-economies), 2024 survey: India 90% account ownership for men and women; developing-economy digital merchant payments 42%, formal saving 40%; worldwide 1.3 billion adults without accounts.
- SaaS/Startups: [Ministry of Commerce & Industry, PIB, 17 April 2026](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2253019), India all-sector startup ecosystem as of 31 March 2026: over 223,000 recognised startups, over 2,336,000 direct jobs (displayed conservatively as 2.33M+), approximately 48% with a woman director/partner, over 55,200 recognised in FY2025–26. Not SaaS-only data.
- D2C/eCommerce: [IBEF August 2025 infographic](https://www.ibef.org/uploads/industry/Infrographics/large/e-Commerce-%20infographics-august-2025.pdf), visually and textually checked: India 2024 market estimate $125B, 7% online retail share, 931M smartphone users; $345B 2030 forecast. Wider commerce/mobile context, not D2C-only data.
- Hospitality/Food: [UN Tourism, 21 January 2025](https://www.untourism.int/news/international-tourism-recovers-pre-pandemic-levels-in-2024): 2024 global international arrivals 1.4B, 11% growth over 2023, estimated receipts $1.6T; November 2024 accommodation occupancy 66% based on STR. Tourism/accommodation context, not restaurant-market data.

## Checks

ESLint, TypeScript, production build and whitespace checks passed. Four industry routes at 320, 393, 810 and 1440px have no horizontal page overflow, five illustrated service cards, two informative cards with no anchors, four statistics in one row and text above each dot pattern. Statistics captions were checked for clipping; the inherited Views-card nowrap rule was explicitly reset for the vertical variant. Service links have zero bottom border and inline arrows. Hero media contain no images. All five industry selections switch motifs with one expanded region.

Home and Product were checked at 393 and 1440px after shared extraction: Home retains four agency cards and two department links; Product retains five illustrated services. Branding closing background is verified blue. Additional service selection checks and live publication status follow below.

All ten service routes at 393, 810 and 1440px passed all five selections, 150 states total: exactly one expanded region, a defined dot motif, zero images in the panel and no horizontal page overflow. Industry results and screenshots are preserved under docs/release/2026-10-22-industry-followup/.
