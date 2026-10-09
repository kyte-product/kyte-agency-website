import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const plannedPages: Record<string, string> = {
  work: "Work",
  "ui-ux-design-development": "UI/UX Design & Development",
  "ui-ux-design-development/ux-research-design-audit": "UX Research & Design Audits",
  "ui-ux-design-development/website-design-development": "Website Design & Development",
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
  about: "About",
  contact: "Contact",
  careers: "Careers",
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
  const title = plannedPages[slug.join("/")];
  if (!title) notFound();
  return <><SiteHeader /><main className="planned-page"><p className="eyebrow">KYTE WEBSITE PREVIEW</p><h1>{title}</h1><p>We&apos;re designing this page next. The navigation is ready so the rest of the website can be built around the same structure.</p><Link href="/">Back to the homepage <ArrowUpRight size={15} aria-hidden="true" /></Link></main><SiteFooter /></>;
}
