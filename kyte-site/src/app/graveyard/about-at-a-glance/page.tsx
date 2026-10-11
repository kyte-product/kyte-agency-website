import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { AboutGlance } from "@/components/about/AboutSections";

export const metadata: Metadata = {
  title: "About at a glance | Kyte archive",
  robots: { index: false, follow: false },
};

export default function ArchivedAboutGlance() {
  return <><SiteHeader /><main className="about-page"><AboutGlance /></main><SiteFooter /></>;
}
