import type { WorkProject } from "./sanity";

// Local fallback for the FinCart page when Sanity content is unavailable.
export const fincartProject: WorkProject = {
  _id: "local-fincart",
  title: "Fincart Mobile App",
  slug: "fincart",
  summary: "Bringing financial planning, goal-based investing, and portfolio tracking into one mobile experience.",
  client: "Fincart",
  role: "Product design, UX research and design system",
  projectType: "Mobile app",
  period: "2025–2026",
  cardService: "Mobile App Design",
  filterCategories: ["Mobile App Design"],
  featured: false,
  sortOrder: -1,
  projectUrl: "https://apps.apple.com/in/app/fincart-investment-app/id1540925421",
  cover: { url: "/fincart/fincart-phone-cover.png", alt: "FinCart app screen on an angled phone between metallic forms" },
};
