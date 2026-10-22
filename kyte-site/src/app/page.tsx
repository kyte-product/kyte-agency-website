import { Hero } from "@/components/Hero";
import { SiteHeader } from "@/components/SiteHeader";
import { ServicesIntro } from "@/components/ServicesIntro";
import { HomeProjectScroll } from "@/components/HomeProjectScroll";
import { TeamPreviewFooter } from "@/components/TeamPreviewFooter";
import { TextRevealMotion } from "@/components/TextRevealMotion";
import { ClientGrid } from "@/components/ClientGrid";
import { SplitCtaBanner } from "@/components/SplitCtaBanner";
import { HomeTestimonials } from "@/components/HomeTestimonials";

export const instant = false;

export default function Home() {
  return <><SiteHeader /><main className="home-page"><TextRevealMotion /><Hero /><ServicesIntro /><ClientGrid /><HomeProjectScroll /><HomeTestimonials /><SplitCtaBanner /></main><TeamPreviewFooter /></>;
}
