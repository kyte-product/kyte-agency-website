import { KyteApproach } from "@/components/KyteApproach";
import { Hero } from "@/components/Hero";
import { SiteHeader } from "@/components/SiteHeader";
import { ClientLogos } from "@/components/ClientLogos";
import { ClientStories } from "@/components/ClientStories";
import { ServiceDepth } from "@/components/ServiceDepth";
import { SectionBreak } from "@/components/SectionBreak";
import { WorkShowcase } from "@/components/WorkShowcase";
import { SiteFooter } from "@/components/SiteFooter";

export default function Home() {
  return <><SiteHeader /><main><Hero /><ClientLogos /><WorkShowcase /><KyteApproach /><SectionBreak /><ServiceDepth /><ClientStories /></main><SiteFooter /></>;
}
