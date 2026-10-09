import { KyteApproach } from "@/components/KyteApproach";
import { Hero } from "@/components/Hero";
import { SiteHeader } from "@/components/SiteHeader";
import { ServicesIntro } from "@/components/ServicesIntro";
import { ClientStories } from "@/components/ClientStories";
import { WorkShowcase } from "@/components/WorkShowcase";
import { TeamPreviewFooter } from "@/components/TeamPreviewFooter";
import { TextRevealMotion } from "@/components/TextRevealMotion";
import { ClientGrid } from "@/components/ClientGrid";
import { SplitCtaBanner } from "@/components/SplitCtaBanner";

export default function Home() {
  return <><SiteHeader /><main><TextRevealMotion /><Hero /><ServicesIntro /><ClientGrid /><WorkShowcase /><KyteApproach /><ClientStories /><SplitCtaBanner /></main><TeamPreviewFooter /></>;
}
