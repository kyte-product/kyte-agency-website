import type { DesignNewsArticle, PortableTextBlock } from "./sanity";
import { guideSamples, resourceSamples } from "./editorial-collections";

export type GuideStep = { title: string; description: string };
export type ResourceItem = { article: DesignNewsArticle; audience: string; format: string; download?: { url: string; label: string; fileType: string } };
export type GuideItem = { article: DesignNewsArticle; audience: string; level: string; steps: GuideStep[] };

function body(sections: GuideStep[]): PortableTextBlock[] {
  return sections.flatMap((section, index) => [
    { _key: `section-${index}`, _type: "block" as const, style: "h2", children: [{ _key: `heading-${index}`, _type: "span" as const, text: section.title }] },
    { _key: `copy-${index}`, _type: "block" as const, style: "normal", children: [{ _key: `text-${index}`, _type: "span" as const, text: section.description }] },
  ]);
}
function article(slug: string, title: string, summary: string, category: string, sections: GuideStep[]): DesignNewsArticle {
  return { _id: `sample-${slug}`, slug, title, summary, category, author: null, publishedAt: null, updatedAt: null, tags: null, featured: false, sortOrder: null, cover: { url: null, alt: null }, body: body(sections) };
}
const resourceSections: GuideStep[][] = [
  [{ title: "Clarify the problem", description: "Describe the situation, who experiences it and why it matters. Separate the evidence you have from the assumptions you still need to check." }, { title: "Define success", description: "Write down the decision this brief should support, the intended outcome and the constraints the team needs to work within." }, { title: "Use the brief together", description: "Review the brief with design, product and development. Assign open questions and keep the brief current as you learn." }],
  [{ title: "Choose a journey", description: "Start with one customer goal and a clear beginning and end. Record what you know about the people using the service." }, { title: "Map the experience", description: "Document the steps, touchpoints, questions and obstacles. Mark assumptions so they can be checked with research." }, { title: "Choose improvements", description: "Prioritise the moments that prevent customers reaching their goal. Agree who will investigate each opportunity." }],
  [{ title: "Inventory existing patterns", description: "Collect the screens and components in use. Compare their type, spacing, colour and behaviour before proposing a shared pattern." }, { title: "Record the decisions", description: "Define tokens, component states, accessibility expectations and ownership. Use examples that explain when a pattern belongs." }, { title: "Maintain the system", description: "Check changes against real pages and update the documentation alongside the implementation." }],
  [{ title: "Understand the reason", description: "Record what is not working and what evidence supports the need for a redesign." }, { title: "Identify constraints", description: "List the content, technical, accessibility and delivery constraints. Establish the decisions that are still open." }, { title: "Plan the next step", description: "Agree a focused research or design task with a clear output and review point." }],
];
const guideSections: GuideStep[][] = [
  [{ title: "Define the problem", description: "Start with the problem your product needs to solve. Write down the people affected, their goal and the evidence behind the problem." }, { title: "Learn from users", description: "List your assumptions and choose questions that could change the design direction. Use research to understand needs before choosing solutions." }, { title: "Shape a first release", description: "Map the core journey, decide what must work first and document the constraints. Review the flow with the people who will build it." }, { title: "Review and improve", description: "Test the proposed flow, record the friction and agree the next changes. Keep decisions connected to evidence." }],
  [{ title: "Set a research question", description: "Choose the product decision your research should inform. Define what you need to understand and who can help you learn." }, { title: "Prepare the sessions", description: "Recruit relevant participants, prepare open questions and agree how consent and research notes will be handled." }, { title: "Find useful patterns", description: "Compare observations across sessions. Separate direct evidence from interpretation and note contradictory findings." }, { title: "Turn learning into decisions", description: "Connect findings to product choices, explain the evidence and record questions that still need investigation." }],
  resourceSections[2],
  [{ title: "Describe the intended behaviour", description: "Explain the flow, component states and the decisions behind them. Include loading, empty and error states where relevant." }, { title: "Prepare content and assets", description: "Identify final copy, approved assets and any unresolved placeholders. Make ownership clear before implementation begins." }, { title: "Review with development", description: "Walk through the design together, discuss constraints and record open questions. Agree how the implemented experience will be reviewed." }],
];

export const resourceItems: ResourceItem[] = resourceSamples.map((sample, index) => ({ article: article(sample.slug, sample.title, "Sample resource content for reviewing this template. Replace it with approved material before publication.", "Resources", resourceSections[index]), audience: "Product and design teams", format: "Text checklist", download: { url: `/downloads/resources/${sample.slug}.txt`, label: "Download resource", fileType: "TXT" } }));
export const guideItems: GuideItem[] = guideSamples.map((sample, index) => ({ article: article(sample.slug, sample.title, sample.summary, "Guides", guideSections[index]), audience: "Product and design teams", level: "Getting started", steps: guideSections[index] }));
