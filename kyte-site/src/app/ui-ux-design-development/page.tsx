import { ProductServices } from "@/components/ProductServices";
import { KyteApproach } from "@/components/KyteApproach";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductDesignCardArt, ProductDesignHeroArt, ProductStageIllustration, type ProductStageTitle } from "@/components/ProductDesignIllustrations";
import { ProductDesignCarousel } from "@/components/ProductDesignCarousel";
import { ProductDesignFramework } from "@/components/ProductDesignFramework";
import { ServiceTestimonials } from "@/components/ServiceTestimonials";
import { HomeFaq } from "@/components/HomeFaq";
import { ClientBrandTicker } from "@/components/ClientBrandTicker";
import { DotPattern } from "@/components/ui/DotPattern";
import { WorkShowcase } from "@/components/WorkShowcase";
import { industryPages } from "@/data/industryPages";
import "@/components/KyteApproach.css";
import "./product-design.css";

export const metadata: Metadata = {
  title: "UI/UX Design & Development | Kyte Agency",
  description: "Research, product design, and development support for useful digital products, websites, and customer journeys.",
};

const questions = [
  { question: "What does a UI/UX design project include?", answer: "The scope depends on the challenge. It can include research, an experience audit, information architecture, user flows, prototypes, visual interface design, a design system, testing, and a handoff to development." },
  { question: "Can you improve an existing product?", answer: "Yes. We can review a specific journey or the wider experience, identify priorities with your team, and design changes around what users need to do." },
  { question: "Do you also build what you design?", answer: "We offer website development and can plan build support where it fits the project. For apps and other products, we can work with your engineering team on a clear implementation handoff." },
  { question: "Can you work with our internal product team?", answer: "Yes. We can define the work, reviews, files, and handoff around the team already responsible for your product." },
  { question: "Where do we start if the brief is still forming?", answer: "Start with the product, audience, and the decision you need to make next. A focused discovery or audit can help turn that into a practical scope." },
];

const featuredIndustries = [
  { slug: "fintech", description: "Financial products and important money decisions." },
  { slug: "saas-startups", description: "Software products, tools, and growing workflows." },
  { slug: "d2c-ecommerce", description: "Shopping journeys from discovery to purchase." },
  { slug: "hospitality-food-beverage", description: "Digital journeys around visits, bookings, and orders." },
] as const;

const process = [
  { title: "Context", body: "Understand the product, audience, goals, and constraints that shape the work." },
  { title: "Research", body: "Look at existing evidence and learn where people need more clarity." },
  { title: "Experience architecture", body: "Map journeys, navigation, and the steps people need to complete." },
  { title: "Interface design", body: "Turn the agreed structure into responsive screens and reusable patterns." },
  { title: "Validation", body: "Review prototypes and test the decisions that matter with the right people." },
  { title: "Handoff", body: "Carry the details into implementation with clear files and shared decisions." },
];

export default function ProductDesignLandingPage() {
  return <><SiteHeader /><main className="product-landing">
    <section className="product-landing__hero" aria-labelledby="product-design-title">
      <div className="product-landing__hero-copy"><h1 id="product-design-title">Digital products built around <span className="product-landing__highlight">human experience.</span></h1><p>We connect research, design, and development to make useful websites and products that people can understand and enjoy using.</p><Link className="kyte-button" href="/contact">Talk about your product <ArrowRight size={18} aria-hidden="true" /></Link></div>
      <ProductDesignHeroArt />
    </section>

    <div className="product-landing__client-rail"><ClientBrandTicker title={null} /></div>

    <ProductDesignCarousel />

    <WorkShowcase />
    <KyteApproach />


    <section className="product-landing__partners product-landing__section" aria-labelledby="product-partners-title"><div className="product-landing__section-head"><h2 id="product-partners-title">For products at different stages.</h2><p>We adapt the work to the team, the product, and the question that needs an answer.</p></div><div className="product-landing__partner-grid">{["New products", "Growing platforms", "Established services", "Complex internal tools", "Commerce journeys", "Web platforms", "Internal systems", "Connected brands"].map((item) => <div key={item}><ProductStageIllustration title={item as ProductStageTitle} /><h3>{item}</h3></div>)}</div></section>

    <ProductServices />

    <section className="product-landing__framework product-landing__section" aria-labelledby="product-framework-title"><h2 id="product-framework-title">A framework that moves from evidence to experience.</h2><div className="product-landing__framework-card"><ProductDesignFramework /></div></section>

    <section className="product-landing__process product-landing__section" aria-labelledby="product-process-title"><h2 id="product-process-title">How we work together.</h2><div className="product-landing__process-grid">{process.map(({ title, body }, index) => <article key={title}><span className="product-landing__process-pattern"><DotPattern seed={`product:working-principles:${title}`} motifSlot={index} /></span><h3>{title}</h3><p>{body}</p></article>)}</div></section>


    <section className="product-landing__outcomes product-landing__section" aria-labelledby="product-outcomes-title"><h2 id="product-outcomes-title">What We Design</h2><div className="product-landing__outcome-grid">{["Onboarding and activation", "Navigation and information architecture", "Dashboards and complex workflows", "Websites and content journeys", "Design systems and interface patterns", "Responsive product experiences"].map((item, index) => <article key={item}><ProductDesignCardArt scene={(["onboarding", "navigation", "workflowHub", "contentJourney", "designPatterns", "responsiveExperience"] as const)[index]} /><h3>{item}</h3></article>)}</div></section>

    <section className="product-landing__industries product-landing__section" aria-labelledby="product-industries-title"><div className="product-landing__section-head"><h2 id="product-industries-title">Industries We Work With</h2><p>Product experiences shaped around the decisions and journeys in each field.</p></div><div className="product-landing__industry-grid">{featuredIndustries.map(({ slug, description }) => { const industry = industryPages[slug]; return <Link href={`/industries/${slug}`} key={slug}><div className="product-landing__industry-image" aria-hidden="true" /><h3>{industry.name}</h3><p>{description}</p><span className="kyte-tertiary">Explore Industry <ArrowRight size={17} aria-hidden="true" /></span></Link>; })}</div></section>

    <ServiceTestimonials />


    <HomeFaq heading="Answers to Common UI/UX Questions" items={questions} allowMultiple description={null} />
  </main><SiteFooter /></>;
}
