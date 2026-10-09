import type { Metadata } from "next";
import { Hero } from "./snapshot/Hero";
import { SiteHeader } from "./snapshot/SiteHeader";
import { ClientLogos } from "./snapshot/ClientLogos";
import { ClientStories } from "./snapshot/ClientStories";
import { WorkShowcase } from "./snapshot/WorkShowcase";
import { KyteApproach } from "./snapshot/KyteApproach";
import { SectionBreak } from "./snapshot/SectionBreak";
import { ServiceDepth } from "./snapshot/ServiceDepth";
import { SiteFooter } from "./snapshot/SiteFooter";
import "./globals-snapshot.css";
import "./archive.css";

export const metadata: Metadata = {
  title: "Previous landing page | Kyte archive",
  robots: { index: false, follow: false },
};

export default function PreviousLandingPage() {
  return <div className="landing-page-2-archive"><SiteHeader /><main><Hero /><ClientLogos /><WorkShowcase /><KyteApproach /><SectionBreak /><ServiceDepth /><ClientStories /></main><SiteFooter /></div>;
}
