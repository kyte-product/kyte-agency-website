import Link from "next/link";
import { IllustrationImage as Image } from "./design-system/IllustrationPalette";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { ServiceHeroPhoto } from "./ServiceHeroPhoto";
import { ServiceOfferings } from "./ServiceOfferings";
import { ServiceApproach } from "./ServiceApproach";
import { ServiceDecisionStory } from "./ServiceDecisionStory";
import { ServiceDeliverables } from "./ServiceDecisionStory";
import { ServiceOurProcess } from "./ServiceOurProcess";
import { WorkShowcase } from "./WorkShowcase";
import { ServiceTestimonials } from "./ServiceTestimonials";
import { HomeFaq } from "./HomeFaq";
import type { ServicePageContent } from "@/data/servicePages";
import { getServicePhotography } from "@/data/pagePhotography";
import "../app/service-detail.css";

export function ServiceDetailTemplate({ service }: { service: ServicePageContent }) {
  const photography = getServicePhotography(service.path);
  const heroArt = service.path === "ui-ux-design-development/website-design-development"
    ? { name: "website", label: "Website design and development assembly" }
    : service.path === "ui-ux-design-development/mobile-app-design"
      ? { name: "mobile", label: "Mobile app experience assembly" }
      : service.path === "ui-ux-design-development/saas-web-app-design"
        ? { name: "saas", label: "SaaS workflow, automation and data assembly" }
        : service.path === "ui-ux-design-development/ecommerce-shopify-websites"
          ? { name: "commerce", label: "Storefront, checkout and fulfillment assembly" }
          : null;
  const inclusions = service.inclusions ?? [
    { symbol: 0, title: "The right context", description: `We begin with the audience, goals, existing material, and constraints behind the ${service.name.toLowerCase()} brief.` },
    { symbol: 1, title: "A clear working scope", description: "We agree on the outputs, responsibilities, and review points before detailed work begins." },
    { symbol: 2, title: "Decisions made together", description: "Working reviews give your team a chance to test directions and bring relevant context into each decision." },
    { symbol: 3, title: "A usable handoff", description: "The agreed files, rationale, and next steps are organized for the people who will use the work." },
  ];
  const decisions = service.outcomes.map((item, index) => ({ ...item, ...photography.decisions[index] }));
  return <><SiteHeader /><main className="service-detail">

    <section className="service-detail__hero" aria-labelledby="service-detail-title">
      <div className="service-detail__hero-inner">

        <h1 id="service-detail-title"><span className="service-detail__headline-line">{service.hero[0]}</span><span className="service-detail__headline-line service-detail__headline-accent">{service.hero[1]}</span></h1>
        <div className="service-detail__hero-bottom"><p>{service.opening}</p><Link className="kyte-button" href="/contact">Discuss your project <ArrowRight size={18} aria-hidden="true" /></Link></div>
      </div>
    </section>
    {heroArt ? <section className={`service-detail__${heroArt.name}-art`} aria-label={heroArt.label}>
      <Image src={`/hairline/service-${heroArt.name}-hero.svg?v=1`} alt="" width={960} height={560} sizes="(max-width: 780px) 100vw, 1240px" unoptimized priority />
    </section> : service.path.startsWith("branding-marketing/")
      ? <div className="service-hero-photo service-hero-photo--placeholder" aria-hidden="true" />
      : <ServiceHeroPhoto label={`Illustrative photography for ${service.name}`} slides={photography.stage} />}
    <ServiceOfferings items={service.offerings.map((item) => ({ title: item.title, description: item.body }))} serviceName={service.name} heading={service.offeringsHeading} intro={service.offeringsIntro} />
    <ServiceDecisionStory items={decisions} heading={service.outcomesHeading} intro={service.outcomesIntro} eyebrow="From scope to outcome" patternSeed={`${service.path}:outcomes`} />
    <ServiceDeliverables items={service.deliverables} heading={service.deliverablesHeading || "Useful outputs for the next decision."} />
    <ServiceApproach items={inclusions} heading={service.includedHeading} intro={service.includedIntro} patternSeed={service.path} />
    <ServiceOurProcess servicePath={service.path} steps={service.processSteps} intro={service.processIntro} />
    <WorkShowcase />
    <ServiceTestimonials />
    <HomeFaq items={service.faqs.map((item) => ({ question: item.title, answer: item.body }))} heading={service.faqHeading || `Questions about ${service.name.toLowerCase()}.`} />
  </main><SiteFooter /></>;
}
