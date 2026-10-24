// Sample Resources and Guides are visible for the requested editorial preview.
export const showEditorialPlaceholders = true;

export const resourceSamples = [
  { slug: "better-product-briefs", title: "A practical guide to better product briefs", kind: "Resource", color: "#ffc48c", accent: "#3a2419" },
  { slug: "clearer-customer-journey", title: "Mapping a clearer customer journey", kind: "Resource", color: "#ffdb71", accent: "#39250c" },
  { slug: "useful-design-system", title: "A checklist for a useful design system", kind: "Resource", color: "#ff9f94", accent: "#431f24" },
  { slug: "questions-before-redesign", title: "Questions to ask before a redesign", kind: "Resource", color: "#f9b8d1", accent: "#422134" },
] as const;

export const guideSamples = [
  { slug: "planning-product-experience", title: "Planning a product experience", summary: "A practical guide to setting goals, learning from users, and shaping a first release.", preview: "Start with the problem your product needs to solve. This sample guide walks through setting a clear goal, mapping the decisions people need to make, and choosing a focused first release that your team can test and improve.", color: "#0249d9" },
  { slug: "understanding-users", title: "Understanding your users", summary: "Turn research into decisions a product team can act on.", preview: "Good research gives a team a clearer direction. Explore how to frame useful questions, notice patterns across conversations, and turn what you learn into priorities for a product experience.", color: "#013bb0" },
  { slug: "building-visual-system", title: "Building a visual system", summary: "Create consistent interface patterns across screens.", preview: "A visual system helps a growing product feel coherent. This sample guide covers the decisions behind type, color, spacing, and reusable components, with a practical way to document where each pattern belongs.", color: "#263b99" },
  { slug: "preparing-handoff", title: "Preparing for handoff", summary: "Document design decisions for a development team.", preview: "A useful handoff explains more than the final screens. Learn how to show behavior, edge cases, content needs, and the reasoning behind key choices so design and development can move forward together.", color: "#0249d9" },
] as const;
