import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ExpandingPhotoStage } from "@/components/ExpandingPhotoStage";
import { ServiceOurProcess } from "@/components/ServiceOurProcess";
import { WorkShowcase } from "@/components/WorkShowcase";
import { HomeFaq } from "@/components/HomeFaq";
import { TextRevealMotion } from "@/components/TextRevealMotion";
import { ServiceTestimonials } from "@/components/ServiceTestimonials";
import { ServiceOfferings } from "@/components/ServiceOfferings";
import { ServiceApproach } from "@/components/ServiceApproach";
import { ServiceDecisionStory, ServiceDeliverables } from "@/components/ServiceDecisionStory";
import { ServiceDetailTemplate } from "@/components/ServiceDetailTemplate";
import { loadServicePageContent } from "@/lib/service-content";
import type { Metadata } from "next";
import "../service-detail.css";

const plannedPages: Record<string, string> = {
  work: "Work",
  "ui-ux-design-development": "UI/UX Design & Development",
  "ui-ux-design-development/ux-research-design-audit": "UX Research & Design Audits",
  "ui-ux-design-development/mobile-app-design": "Mobile App Design",
  "ui-ux-design-development/saas-web-app-design": "SaaS & Web App Design",
  "ui-ux-design-development/ecommerce-shopify-websites": "eCommerce & Shopify Websites",
  "branding-marketing": "Branding & Marketing",
  "branding-marketing/brand-strategy-identity": "Brand Strategy & Identity",
  "branding-marketing/graphic-design": "Graphic Design",
  "branding-marketing/video-production-motion-graphics": "Video Production & Motion Graphics",
  "branding-marketing/social-media-marketing": "Social Media Marketing",
  "branding-marketing/seo-ai-search-optimisation": "SEO & AI Search Optimisation",
  industries: "Industries",
  "industries/fintech": "Fintech",
  "industries/saas-startups": "SaaS & Startups",
  "industries/d2c-ecommerce": "D2C & eCommerce",
  "industries/hospitality-food-beverage": "Hospitality & Food & Beverage",
  insights: "Insights",
  "ui-ux-design-agency-bangalore": "UI/UX Design Agency in Bangalore",
  "web-design-company-bangalore": "Web Design Company in Bangalore",
  "privacy-policy": "Privacy Policy",
  terms: "Terms",
};

export function generateStaticParams() {
  return Object.keys(plannedPages).map((path) => ({ slug: path.split("/") }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const path = (await params).slug.join("/");
  const service = await loadServicePageContent(path);
  if (service) return { title: service.title, description: service.description };
  return { title: plannedPages[path] ? `${plannedPages[path]} | Kyte Agency` : "Kyte Agency" };
}

export default async function PlannedPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const path = slug.join("/");
  const title = plannedPages[path];
  if (!title) notFound();

  if (path === "ui-ux-design-development/ux-research-design-audit") {
    const service = await loadServicePageContent(path);
    const outcomeItems = service?.outcomes.map(({ title, body }) => ({ title, body }));
    const deliverableItems = service?.deliverables.map(({ title, body }) => ({ title, body }));
    const faqItems = service?.faqs.map(({ title, body }) => ({ question: title, answer: body }));
    const inline = service?.heroInline;
    return <><SiteHeader /><main className="service-detail">
      <TextRevealMotion />
      <section className="service-detail__hero" aria-labelledby="ux-audit-title">
        <div className="service-detail__hero-inner">
          <p className="eyebrow">{service?.name || "UX Research & Design Audits"}</p>
          <h1 id="ux-audit-title"><span className="service-detail__headline-line">{inline?.lineOneLead || "Find the"} <span className="service-detail__headline-portrait"><Image src="https://images.unsplash.com/photo-1776278806688-64ef6a7e2cc5?auto=format&fit=crop&w=480&q=85" alt="" fill sizes="(max-width: 580px) 44px, 96px" unoptimized /></span> {inline?.lineOneFocus || "friction"}</span><span className="service-detail__headline-line">{inline?.lineTwoLead || "Know what to"} <span className="service-detail__headline-portrait"><Image src="https://images.unsplash.com/photo-1791197738079-d25b54cd42dc?auto=format&fit=crop&w=480&q=85" alt="" fill sizes="(max-width: 580px) 44px, 96px" unoptimized /></span> <span className="service-detail__headline-accent">{inline?.lineTwoFocus || "improve."}</span></span></h1>
          <div className="service-detail__hero-bottom">
            <p>{service?.opening || "We look at how people use your product, where friction appears, and which changes can make the experience clearer."}</p>
            <Link className="kyte-button" href="/contact">Talk through an audit <ArrowRight size={18} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
      <ExpandingPhotoStage label="Digital design imagery for UX research and design audits" />
      <ServiceOfferings items={service?.offerings.length ? service.offerings.map(({ title, body }) => ({ title, description: body })) : undefined} serviceName={service?.name} heading={service?.offeringsHeading || "What we offer"} intro={service?.offeringsIntro} />
      <ServiceApproach items={service?.inclusions?.length ? service.inclusions : undefined} heading={service?.includedHeading} intro={service?.includedIntro} />
      <ServiceDecisionStory items={outcomeItems?.length ? outcomeItems : undefined} heading={service?.outcomesHeading} intro={service?.outcomesIntro} eyebrow="From scope to outcome" />
      <ServiceDeliverables items={deliverableItems?.length ? deliverableItems : undefined} heading={service?.deliverablesHeading || "Useful outputs for the next decision."} />
      <ServiceOurProcess intro={service?.processIntro} steps={service?.processSteps} />
      <WorkShowcase />
      <ServiceTestimonials />
      <HomeFaq items={faqItems?.length ? faqItems : undefined} heading={service?.faqHeading || "A few things you may be wondering."} />
    </main><SiteFooter /></>;
  }

  const service = await loadServicePageContent(path);
  if (service) return <ServiceDetailTemplate service={service} />;

  return <><SiteHeader /><main className="planned-page"><Link className="planned-page__back" href="/"><ArrowLeft size={18} strokeWidth={1.7} aria-hidden="true" /> Home</Link><p className="eyebrow">Page in progress</p><h1>{title}</h1><p>This page is being prepared for the new Kyte website.</p></main><SiteFooter /></>;
}
