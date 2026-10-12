import { getPublishedServiceBySlug, type ServicePage } from "@/lib/sanity";
import { servicePages, type ServicePageContent } from "@/data/servicePages";
import { cacheLife } from "next/cache";

const fallbackInclusions = (name: string) => [
  { symbol: 0, title: "The right context", description: `We begin with the audience, goals, existing material, and constraints behind the ${name.toLowerCase()} brief.` },
  { symbol: 1, title: "A clear working scope", description: "We agree on the outputs, responsibilities, and review points before detailed work begins." },
  { symbol: 2, title: "Decisions made together", description: "Working reviews give your team a chance to test directions and bring relevant context into each decision." },
  { symbol: 3, title: "A usable handoff", description: "The agreed files, rationale, and next steps are organized for the people who will use the work." },
];

const auditPath = "ui-ux-design-development/ux-research-design-audit";
const auditFallback: ServicePageContent = {
  path: auditPath,
  name: "UX Research & Design Audits",
  title: "UX Research & Design Audits | Kyte Agency",
  description: "Understand where people struggle in your product and turn research, usability findings, and journey reviews into prioritised improvements.",
  hero: ["Find the friction", "Know what to improve."],
  heroInline: { lineOneLead: "Find the", lineOneFocus: "friction", lineTwoLead: "Know what to", lineTwoFocus: "improve." },
  opening: "We look at how people use your product, where friction appears, and which changes can make the experience clearer.",
  offerings: [], includedHeading: "A clearer view of what to improve.",
  includedIntro: "A focused research and audit engagement connects evidence to action, giving your team a clear view of what users need, where they struggle, and which improvements to take forward.",
  outcomesHeading: "A useful picture of what to improve.",
  outcomesIntro: "Bring user evidence, interface reviews, and product context together. Leave with a shared understanding of the experience and a clear path for the next design decisions.",
  outcomes: [], deliverables: [], faqs: [],
};

export function toServicePageContent(document: ServicePage, path: string): ServicePageContent | null {
  const fallback = servicePages[path] || (path === auditPath ? auditFallback : undefined);
  if (!fallback) return null;

  const name = document.title || fallback.name;
  const rows = (items: ServicePage["offerings"]) => items?.map(({ title, description }) => ({ title, body: description })) ?? [];
  const hero = document.hero;

  return {
    ...fallback,
    name,
    title: document.seo?.title || fallback.title,
    description: document.seo?.description || document.summary || fallback.description,
    hero: [hero?.lineOne || fallback.hero[0], hero?.lineTwo || fallback.hero[1]],
    heroInline: hero?.lineOneLead && hero.lineOneFocus && hero.lineTwoLead && hero.lineTwoFocus
      ? { lineOneLead: hero.lineOneLead, lineOneFocus: hero.lineOneFocus, lineTwoLead: hero.lineTwoLead, lineTwoFocus: hero.lineTwoFocus }
      : fallback.heroInline,
    opening: hero?.opening || fallback.opening,
    offeringsHeading: document.offeringsHeading || "What we offer",
    offeringsIntro: document.offeringsIntro || undefined,
    offerings: rows(document.offerings).length ? rows(document.offerings) : fallback.offerings,
    includedHeading: document.includedHeading || fallback.includedHeading,
    includedIntro: document.includedIntro || fallback.includedIntro,
    inclusions: document.inclusions?.length
      ? document.inclusions.map((item, index) => ({ symbol: index % 4, title: item.title, description: item.description }))
      : fallback.inclusions || fallbackInclusions(name),
    outcomesHeading: document.outcomesHeading || fallback.outcomesHeading,
    outcomesIntro: document.outcomesIntro || fallback.outcomesIntro,
    outcomes: rows(document.outcomes).length ? rows(document.outcomes) : fallback.outcomes,
    deliverablesHeading: document.deliverablesHeading || "Useful outputs for the next decision.",
    deliverables: rows(document.deliverables).length ? rows(document.deliverables) : fallback.deliverables,
    processIntro: document.processIntro || fallback.processIntro,
    processSteps: document.processSteps?.length
      ? document.processSteps.map(({ title, subtitle, description }) => ({ name: title, title: subtitle || title, description }))
      : fallback.processSteps,
    faqHeading: document.faqHeading || `Questions about ${name.toLowerCase()}.`,
    faqs: rows(document.faqs).length
      ? rows(document.faqs)
      : fallback.faqs,
  };
}

export async function loadServicePageContent(path: string): Promise<ServicePageContent | null> {
  "use cache";
  cacheLife("minutes");
  const fallback = servicePages[path] || (path === auditPath ? auditFallback : undefined);
  if (!fallback) return null;

  try {
    const document = await getPublishedServiceBySlug(path.split("/").at(-1) || "");
    return document ? toServicePageContent(document, path) : fallback;
  } catch {
    return fallback;
  }
}
