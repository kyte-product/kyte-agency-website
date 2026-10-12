import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ExpandingPhotoStage } from "@/components/ExpandingPhotoStage";
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

export default async function PlannedPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const path = slug.join("/");
  const title = plannedPages[path];
  if (!title) notFound();

  if (path === "ui-ux-design-development/ux-research-design-audit") {
    return <><SiteHeader /><main className="service-detail">
      <section className="service-detail__hero" aria-labelledby="ux-audit-title">
        <div className="service-detail__hero-inner">
          <p className="eyebrow">UX Research &amp; Design Audits</p>
          <h1 id="ux-audit-title"><span className="service-detail__headline-line">Find the friction <span className="service-detail__headline-portrait"><Image src="/team-images/5eb7c535-2022-4e64-8e6e-df3888827fe1.png" alt="" fill sizes="(max-width: 580px) 44px, 96px" unoptimized /></span></span><span className="service-detail__headline-line">Know what to <span className="service-detail__headline-accent">improve.</span> <span className="service-detail__headline-portrait"><Image src="/team-images/ff98cefc-7213-4103-9472-0a3142e5b048.png" alt="" fill sizes="(max-width: 580px) 44px, 96px" unoptimized /></span></span></h1>
          <div className="service-detail__hero-bottom">
            <p>We look at how people use your product, where friction appears, and which changes can make the experience clearer.</p>
            <Link className="kyte-button" href="/contact">Talk through an audit <ArrowRight size={18} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
      <ExpandingPhotoStage label="Architectural photography showcase for UX research and design audits" />
    </main><SiteFooter /></>;
  }

  return <><SiteHeader /><main className="planned-page"><Link className="planned-page__back" href="/"><ArrowLeft size={18} strokeWidth={1.7} aria-hidden="true" /> Home</Link><p className="eyebrow">Page in progress</p><h1>{title}</h1><p>This page is being prepared for the new Kyte website.</p></main><SiteFooter /></>;
}
