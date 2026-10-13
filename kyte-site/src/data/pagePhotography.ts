// Temporary editorial photography for service and industry pages.
// Every URL is an Unsplash image verified on 13 October 2026.
// These are illustrative photographs, not images of Kyte client work.
export type PagePhoto = { image: string; alt: string };

const source = {
  studio: ["1497366811353-6870744d04b2", "Open creative workspace"],
  designer: ["1553877522-43269d4ea984", "Designer working at a desk"],
  review: ["1522202176988-66273c2fd55f", "Team reviewing work together at a table"],
  team: ["1556761175-b413da4baf72", "Team meeting in a shared workspace"],
  mobileLayout: ["1545235617-9465d2a55698", "Mobile interface beside a laptop"],
  darkLaptop: ["1558655146-9f40138edfeb", "Person working on a laptop"],
  webLaptop: ["1507238691740-187a5b1d37b8", "Website displayed on a laptop"],
  phoneApp: ["1551650975-87deedd944c3", "Person using an app on a smartphone"],
  customerCounter: ["1556742049-0cfed4f6a45d", "Customer speaking with a shop employee"],
  paymentCounter: ["1556740738-b6a63e27c4df", "Retail employee using a tablet at a counter"],
  clothing: ["1555529669-e69e7aa0ba9a", "Clothing displayed in a shop"],
  chartsLaptop: ["1460925895917-afdab827c52f", "Analytics charts displayed on a laptop"],
  analytics: ["1551288049-bebda4e38f71", "Analytics dashboard on a screen"],
  workflow: ["1556155092-490a1ba16284", "Digital workspace displayed on a laptop"],
  workshop: ["1542744173-8e7e53415bb0", "Team discussing ideas around a table"],
  collaboration: ["1522071820081-009f0129c71c", "People collaborating over a laptop"],
  sketch: ["1503387762-592deb58ef4e", "Person sketching plans at a desk"],
  editSuite: ["1492619375914-88005aa9e8fb", "Video editing timeline on a monitor"],
  filmSlate: ["1485846234645-a62644f84728", "Film slate held in front of a camera"],
  cameras: ["1516035069371-29a1b244cc32", "Camera equipment laid out for a shoot"],
  photographer: ["1542038784456-1ea8e935640e", "Photographer holding a camera"],
  socialPhone: ["1432888622747-4eb9a8efeb07", "Social media page displayed on a phone"],
  codingDesk: ["1467232004584-a241de8bcf5d", "Screens on a software development desk"],
  codeLaptop: ["1498050108023-c5249f4df085", "Code displayed on a laptop"],
  foodWebsite: ["1481487196290-c152efe083f5", "Food website displayed on a laptop"],
  videoTimeline: ["1574717024653-61fd2cf4d44d", "Video editing software on a screen"],
  brandSheets: ["1561070791-2526d30994b5", "Printed color and layout studies on a table"],
  meal: ["1547592180-85f173990554", "Prepared meal on a table"],
  restaurant: ["1517248135467-4c7edcad34c4", "Restaurant dining room"],
  cafe: ["1552566626-52f8b828add9", "Café interior with tables"],
  cardReader: ["1556742502-ec7c0e9f34b1", "Person making a contactless payment"],
  secureDevice: ["1563013544-824ae1b704d3", "Person using a digital device"],
  financePhone: ["1563986768609-322da13575f3", "Phone beside a laptop showing a financial interface"],
  marketChart: ["1611974789855-9c2a0a7236a3", "Financial chart on a dark screen"],
  financeDesk: ["1554224155-6726b3ff858f", "Financial paperwork and a calculator on a desk"],
  productReview: ["1551836022-d5d88e9218df", "Colleagues discussing a laptop screen"],
  digitalWork: ["1516321318423-f06f85e504b3", "Colleagues pointing at a laptop screen"],
  marketingDesk: ["1533750349088-cd871a92f312", "Marketing planning materials on a desk"],
  brandScreen: ["1558655146-d09347e92766", "Visual design studies on a desktop monitor"],
  wireframeTablet: ["1586717791821-3f44a563fa4c", "Person sketching interface layouts on a tablet"],
  planningDesk: ["1454165804606-c3d57bc86b40", "People reviewing documents beside a laptop"],
  fashionProduct: ["1543163521-1bf539c55dd2", "Colorful product photographed against a blue backdrop"],
  shoppingBags: ["1607082348824-0a96f2a4b9da", "Shopping bags arranged on a dark surface"],
  openShop: ["1472851294608-062f824d29cc", "Open sign in a shop window"],
  fashionStore: ["1441986300917-64674bd600d8", "Clothes and accessories arranged in a store"],
  waterfrontDining: ["1559339352-11d035aa65de", "Restaurant terrace overlooking water"],
  diningRoom: ["1544148103-0773bf10d330", "Tables set in a dining room"],
  diningPlate: ["1414235077428-338989a2e8c0", "Dinner served at a restaurant table"],
  foodBowl: ["1512621776951-a57141f2eefd", "Colorful food bowl on a table"],
  softwareTeam: ["1519389950473-47ba0277781c", "Product team working around a table"],
  developers: ["1551434678-e076c223a692", "Two colleagues working at computers"],
  teamScreens: ["1531482615713-2afd69097998", "Team reviewing computer screens together"],
  pairedLaptops: ["1521737711867-e3b97375f902", "Colleagues working on laptops together"],
  uxSketch: ["1581291518857-4e27b48ff24e", "Person sketching a user interface on paper"],
  colorDevices: ["1561070791-36c11767b26a", "Color and interface studies on digital devices"],
  brandBoards: ["1541462608143-67571c6738dd", "Brand identity materials arranged on a desk"],
  ideaBulb: ["1493612276216-ee3925520721", "Light bulb held against an open sky"],
  editorialPages: ["1504711434969-e33886168f5c", "Printed editorial pages stacked together"],
} as const;

type PhotoKey = keyof typeof source;
const photo = (key: PhotoKey): PagePhoto => {
  const [id, alt] = source[key];
  return { image: `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=2000&q=82`, alt };
};

// First three frames belong to the expanding hero stage. The next five
// accompany the five outcome decisions, in order.
const serviceSelections: Record<string, readonly [PhotoKey, PhotoKey, PhotoKey, PhotoKey, PhotoKey, PhotoKey, PhotoKey, PhotoKey]> = {
  "ui-ux-design-development/ux-research-design-audit": ["uxSketch", "wireframeTablet", "review", "designer", "productReview", "mobileLayout", "planningDesk", "digitalWork"],
  "ui-ux-design-development/website-design-development": ["webLaptop", "foodWebsite", "brandScreen", "codingDesk", "codeLaptop", "mobileLayout", "digitalWork", "review"],
  "ui-ux-design-development/mobile-app-design": ["phoneApp", "mobileLayout", "financePhone", "wireframeTablet", "productReview", "darkLaptop", "pairedLaptops", "colorDevices"],
  "ui-ux-design-development/saas-web-app-design": ["softwareTeam", "analytics", "workflow", "chartsLaptop", "developers", "teamScreens", "codingDesk", "pairedLaptops"],
  "ui-ux-design-development/ecommerce-shopify-websites": ["fashionStore", "clothing", "paymentCounter", "fashionProduct", "shoppingBags", "openShop", "customerCounter", "webLaptop"],
  "branding-marketing/brand-strategy-identity": ["brandBoards", "brandSheets", "colorDevices", "brandScreen", "designer", "workshop", "studio", "editorialPages"],
  "branding-marketing/graphic-design": ["colorDevices", "brandSheets", "brandScreen", "wireframeTablet", "brandBoards", "designer", "editorialPages", "mobileLayout"],
  "branding-marketing/video-production-motion-graphics": ["cameras", "filmSlate", "editSuite", "photographer", "videoTimeline", "workshop", "colorDevices", "brandScreen"],
  "branding-marketing/social-media-marketing": ["socialPhone", "marketingDesk", "productReview", "mobileLayout", "digitalWork", "editorialPages", "brandBoards", "review"],
  "branding-marketing/seo-ai-search-optimisation": ["chartsLaptop", "analytics", "planningDesk", "marketChart", "codeLaptop", "workflow", "digitalWork", "teamScreens"],
};

const industrySelections: Record<string, readonly [PhotoKey, PhotoKey, PhotoKey, PhotoKey, PhotoKey, PhotoKey, PhotoKey, PhotoKey]> = {
  fintech: ["financePhone", "cardReader", "financeDesk", "chartsLaptop", "secureDevice", "marketChart", "planningDesk", "productReview"],
  "saas-startups": ["softwareTeam", "developers", "teamScreens", "pairedLaptops", "analytics", "workflow", "codingDesk", "collaboration"],
  "d2c-ecommerce": ["fashionStore", "fashionProduct", "shoppingBags", "paymentCounter", "openShop", "clothing", "customerCounter", "webLaptop"],
  "hospitality-food-beverage": ["waterfrontDining", "diningRoom", "diningPlate", "restaurant", "foodBowl", "cafe", "meal", "foodWebsite"],
};

export function getServicePhotography(path: string) {
  const selected = serviceSelections[path] ?? serviceSelections["ui-ux-design-development/ux-research-design-audit"];
  return { stage: selected.slice(0, 3).map(photo), decisions: selected.slice(3).map(photo) };
}

export function getIndustryPhotography(slug: string) {
  const selected = industrySelections[slug] ?? industrySelections.fintech;
  return selected.map(photo);
}
