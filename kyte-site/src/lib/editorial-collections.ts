// Keep sample collections off the public site until editorial content is ready.
// Set SHOW_EDITORIAL_PLACEHOLDERS=true in a local or preview environment to review them.
export const showEditorialPlaceholders = process.env.SHOW_EDITORIAL_PLACEHOLDERS === "true";

export const resourceSamples = [
  { title: "A practical guide to better product briefs", kind: "Resource preview", color: "#062a69", accent: "#9dc5ff" },
  { title: "Mapping a clearer customer journey", kind: "Resource preview", color: "#232119", accent: "#d6c67e" },
  { title: "A checklist for a useful design system", kind: "Resource preview", color: "#124a46", accent: "#9de2cf" },
  { title: "Questions to ask before a redesign", kind: "Resource preview", color: "#45304c", accent: "#e3b9e8" },
] as const;

export const guideSamples = [
  { title: "Planning a product experience", summary: "A sample guide to setting goals, learning from users, and shaping a first release.", color: "#0249d9", tint: "#7eaeff" },
  { title: "Understanding your users", summary: "A sample guide to turning research into decisions a product team can act on.", color: "#0e575b", tint: "#9ed7cf" },
  { title: "Building a visual system", summary: "A sample guide to creating consistent interface patterns across screens.", color: "#49375c", tint: "#d1b9e0" },
  { title: "Preparing for handoff", summary: "A sample guide to documenting design decisions for a development team.", color: "#4d421d", tint: "#e5d487" },
] as const;
