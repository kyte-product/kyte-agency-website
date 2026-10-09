import type { Metadata } from "next";
import { ClientLogos } from "./snapshot/ClientLogos";
import { ClientStories } from "./snapshot/ClientStories";
import { DesignPhilosophy } from "./snapshot/DesignPhilosophy";
import { Hero } from "./snapshot/Hero";
import { KyteApproach } from "./snapshot/KyteApproach";
import { KyteGlance } from "./snapshot/KyteGlance";
import { ServiceDepth } from "./snapshot/ServiceDepth";
import { SiteFooter } from "./snapshot/SiteFooter";
import { SiteHeader } from "./snapshot/SiteHeader";
import { StoryPromos } from "./snapshot/StoryPromos";
import { WorkShowcase } from "./snapshot/WorkShowcase";
import "./legacy.css";

export const metadata: Metadata = {
  title: "Archived landing page | Kyte",
  description: "A saved version of the Kyte landing page from before the hero redesign.",
  robots: { index: false, follow: false },
};

export default function ArchivedLandingPage() {
  return <div className="graveyard-page">
    <SiteHeader />
    <main>
      <Hero />
      <ClientLogos />
      <StoryPromos />
      <WorkShowcase />
      <DesignPhilosophy />
      <KyteGlance />
      <KyteApproach />
      <ServiceDepth />
      <ClientStories />
    </main>
    <SiteFooter />
  </div>;
}
