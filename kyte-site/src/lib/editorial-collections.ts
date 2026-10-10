// Keep sample collections off the public site until editorial content is ready.
// Set SHOW_EDITORIAL_PLACEHOLDERS=true in a local or preview environment to review them.
export const showEditorialPlaceholders = process.env.SHOW_EDITORIAL_PLACEHOLDERS === "true";

export const resourceSamples = [
  { title: "A practical guide to better product briefs", kind: "Resource", color: "#ffc48c", accent: "#3a2419" },
  { title: "Mapping a clearer customer journey", kind: "Resource", color: "#ffdb71", accent: "#39250c" },
  { title: "A checklist for a useful design system", kind: "Resource", color: "#ff9f94", accent: "#431f24" },
  { title: "Questions to ask before a redesign", kind: "Resource", color: "#f9b8d1", accent: "#422134" },
] as const;

export const guideSamples = [
  { title: "Planning a product experience", summary: "A practical guide to setting goals, learning from users, and shaping a first release.", color: "#ffbd77", tint: "#4b2716" },
  { title: "Understanding your users", summary: "Turn research into decisions a product team can act on.", color: "#ffd569", tint: "#47300e" },
  { title: "Building a visual system", summary: "Create consistent interface patterns across screens.", color: "#f9a6b5", tint: "#4b2432" },
  { title: "Preparing for handoff", summary: "Document design decisions for a development team.", color: "#ffa18a", tint: "#4a261e" },
] as const;
