import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { BrandStoryHero } from "@/components/branding/BrandStoryHero";
import { BrandReelStatement } from "@/components/branding/BrandReelStatement";
import { BrandHelixSection } from "@/components/branding/BrandHelixSection";
import { BrandProjects } from "@/components/branding/BrandProjects";
import { BrandPixelTransition } from "@/components/branding/BrandPixelTransition";
import { BrandProcessSection } from "@/components/branding/BrandProcessSection";
import { BrandTestimonials } from "@/components/branding/BrandTestimonials";
import { ServiceEditorialDirectory, ServiceFlightCta } from "@/components/ServiceEditorialClose";
import "../branding-marketing-actions.css";

export const metadata: Metadata = {
  title: "Branding & Marketing | Kyte Agency",
  description: "Brand strategy, identity, creative design, and marketing from Kyte Agency.",
};

export default function BrandingMarketingPage() {
  return <>
    <SiteHeader />
    <main className="branding-marketing-page"><BrandStoryHero /><BrandReelStatement /><BrandPixelTransition /><BrandHelixSection /><BrandProjects /><BrandPixelTransition /><BrandProcessSection /><div className="brand-process-afterspace" aria-hidden="true" /><BrandPixelTransition tone="gray" reverse /><BrandTestimonials /><BrandPixelTransition tone="gray" /><ServiceEditorialDirectory /></main>
    <ServiceFlightCta />
  </>;
}
