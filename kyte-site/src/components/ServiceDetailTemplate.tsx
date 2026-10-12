import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { ExpandingPhotoStage } from "./ExpandingPhotoStage";
import { ServiceOfferings } from "./ServiceOfferings";
import { ServiceApproach } from "./ServiceApproach";
import { ServiceDecisionStory } from "./ServiceDecisionStory";
import { ServiceDeliverables } from "./ServiceDecisionStory";
import { ServiceOurProcess } from "./ServiceOurProcess";
import { WorkShowcase } from "./WorkShowcase";
import { ServiceTestimonials } from "./ServiceTestimonials";
import { HomeFaq } from "./HomeFaq";
import type { ServicePageContent } from "@/data/servicePages";
import "../app/service-detail.css";

const images = [
  { image: "https://images.unsplash.com/photo-1587355760421-b9de3226a046?auto=format&fit=crop&w=1400&q=85", alt: "Designers reviewing sketches and wireframes" },
  { image: "https://images.unsplash.com/photo-1766555766657-ea8f81a67934?auto=format&fit=crop&w=1400&q=85", alt: "Planning notes alongside a laptop" },
  { image: "https://images.unsplash.com/photo-1700887944225-f148dd124305?auto=format&fit=crop&w=1400&q=85", alt: "Design work displayed in editing software" },
  { image: "https://images.unsplash.com/photo-1573805672213-81b449b17e8a?auto=format&fit=crop&w=1400&q=85", alt: "Digital interface on a laptop" },
  { image: "https://images.unsplash.com/photo-1587355760421-b9de3226a046?auto=format&fit=crop&w=1400&q=85", alt: "Designers reviewing sketches and wireframes" },
];

export function ServiceDetailTemplate({ service }: { service: ServicePageContent }) {
  const inclusions = service.inclusions ?? [
    { symbol: 0, title: "The right context", description: `We begin with the audience, goals, existing material, and constraints behind the ${service.name.toLowerCase()} brief.` },
    { symbol: 1, title: "A clear working scope", description: "We agree on the outputs, responsibilities, and review points before detailed work begins." },
    { symbol: 2, title: "Decisions made together", description: "Working reviews give your team a chance to test directions and bring relevant context into each decision." },
    { symbol: 3, title: "A usable handoff", description: "The agreed files, rationale, and next steps are organized for the people who will use the work." },
  ];
  const decisions = service.outcomes.map((item, index) => ({ ...item, ...images[index] }));
  return <><SiteHeader /><main className="service-detail">
    <section className="service-detail__hero" aria-labelledby="service-detail-title">
      <div className="service-detail__hero-inner">
        <p className="eyebrow">{service.name}</p>
        <h1 id="service-detail-title"><span className="service-detail__headline-line">{service.hero[0]}</span><span className="service-detail__headline-line service-detail__headline-accent">{service.hero[1]}</span></h1>
        <div className="service-detail__hero-bottom"><p>{service.opening}</p><Link className="kyte-button" href="/contact">Discuss your project <ArrowRight size={18} aria-hidden="true" /></Link></div>
      </div>
    </section>
    <ExpandingPhotoStage label={`Design work imagery for ${service.name}`} />
    <ServiceOfferings items={service.offerings.map((item) => ({ title: item.title, description: item.body }))} serviceName={service.name} heading={service.offeringsHeading} intro={service.offeringsIntro} />
    <ServiceApproach items={inclusions} heading={service.includedHeading} intro={service.includedIntro} />
    <ServiceDecisionStory items={decisions} heading={service.outcomesHeading} intro={service.outcomesIntro} eyebrow="From scope to outcome" />
    <ServiceDeliverables items={service.deliverables} heading={service.deliverablesHeading || "Useful outputs for the next decision."} />
    <ServiceOurProcess intro={service.processIntro || `We shape each ${service.name.toLowerCase()} engagement around the brief, then move through discovery, definition, development, and delivery with clear reviews along the way.`} steps={service.processSteps} />
    <WorkShowcase />
    <ServiceTestimonials />
    <HomeFaq items={service.faqs.map((item) => ({ question: item.title, answer: item.body }))} heading={service.faqHeading || `Questions about ${service.name.toLowerCase()}.`} />
  </main><SiteFooter /></>;
}
