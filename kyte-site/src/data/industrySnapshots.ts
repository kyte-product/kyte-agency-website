/** Dated sector context, not Kyte results. Recheck sources before updating figures. */
export type IndustryMetric = { label: string; value: string; description: string };
type IndustrySnapshot = {
  cards: { title: string; description: string }[];
  metrics: IndustryMetric[];
  context: string;
  source: string;
  sourceUrl: string;
};
export const industrySnapshots: Record<string, IndustrySnapshot> = {
  fintech: {
    cards: [
      { title: "Clarity before commitment", description: "People need to understand fees, choices and consequences before making a financial decision." },
      { title: "Confidence at every step", description: "Clear progress, useful feedback and recovery paths help people navigate sensitive money tasks." },
    ],
    metrics: [
      { label: "Account ownership", value: "90%", description: "Of men and women in India had a financial account in 2024." },
      { label: "Digital payments", value: "42%", description: "Of adults in developing economies made a digital merchant payment in 2024." },
      { label: "Formal saving", value: "40%", description: "Of adults in developing economies saved in a financial account in 2024." },
      { label: "Access gap", value: "1.3B", description: "Adults worldwide still lacked a financial account in 2024." },
    ],
    context: "Global Findex 2025, based on 2024 surveys. Geography is stated on each card.",
    source: "World Bank", sourceUrl: "https://www.worldbank.org/en/news/press-release/2025/07/16/mobile-phone-technology-powers-saving-surge-in-developing-economies",
  },
  "saas-startups": {
    cards: [
      { title: "A useful first experience", description: "Help new users understand the product, complete setup and reach the outcome they came for." },
      { title: "Room for the product to grow", description: "Coherent workflows and reusable patterns keep new features connected as teams and requirements change." },
    ],
    metrics: [
      { label: "Recognised startups", value: "223K+", description: "Startups recognised by DPIIT in India by March 2026." },
      { label: "Direct employment", value: "2.33M+", description: "Direct jobs created by recognised Indian startups by March 2026, rounded down." },
      { label: "Women in leadership", value: "48%", description: "Of recognised Indian startups had a woman director or partner by March 2026." },
      { label: "New startups", value: "55.2K+", description: "Startups recognised in India during the 2025–26 financial year." },
    ],
    context: "India startup ecosystem, all sectors. DPIIT figures as of 31 March 2026; these are not SaaS-only figures.",
    source: "Ministry of Commerce & Industry, PIB", sourceUrl: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2253019",
  },
  "d2c-ecommerce": {
    cards: [
      { title: "Make the choice easier", description: "Useful product information, clear comparisons and a consistent brand help shoppers decide what suits them." },
      { title: "Keep the journey connected", description: "Connect discovery, checkout and post-purchase support so customers always know what happens next." },
    ],
    metrics: [
      { label: "Market value", value: "$125B", description: "Estimated value of India’s e-commerce industry in 2024." },
      { label: "Online retail share", value: "7%", description: "Online retail as a share of total retail in India in 2024." },
      { label: "Smartphone users", value: "931M", description: "India’s smartphone user base in 2024, a wider context for mobile commerce." },
      { label: "Market outlook", value: "$345B", description: "Projected Indian e-commerce market value for 2030, not an achieved result." },
    ],
    context: "India e-commerce snapshot, August 2025. Includes the wider e-commerce sector, not D2C alone; the 2030 figure is a forecast.",
    source: "India Brand Equity Foundation", sourceUrl: "https://www.ibef.org/uploads/industry/Infrographics/large/e-Commerce-%20infographics-august-2025.pdf",
  },
  "hospitality-food-beverage": {
    cards: [
      { title: "Set the right expectation", description: "Help guests understand the place, menu or experience before they book, order or visit." },
      { title: "Care beyond the first visit", description: "Clear booking details, useful updates and a recognisable brand connect the digital journey with the experience on site." },
    ],
    metrics: [
      { label: "International arrivals", value: "1.4B", description: "International tourist arrivals recorded globally in 2024." },
      { label: "Arrival growth", value: "11%", description: "Growth in global international tourist arrivals in 2024 compared with 2023." },
      { label: "Tourism receipts", value: "$1.6T", description: "Estimated international tourism receipts worldwide in 2024." },
      { label: "Hotel occupancy", value: "66%", description: "Global accommodation occupancy in November 2024, based on STR data." },
    ],
    context: "Global tourism and accommodation snapshot for 2024, published January 2025. Tourism provides wider context for hospitality; these are not restaurant-market figures.",
    source: "UN Tourism", sourceUrl: "https://www.untourism.int/news/international-tourism-recovers-pre-pandemic-levels-in-2024",
  },
};
