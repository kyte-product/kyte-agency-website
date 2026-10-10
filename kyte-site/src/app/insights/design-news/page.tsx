import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { DesignNewsIndex } from "@/components/design-system/DesignNewsIndex";
import { designNewsEntries } from "@/lib/editorial";

export const metadata: Metadata = {
  title: "Design News | Kyte",
  description: "Browse design, branding, and visual culture stories from the Kyte team.",
};
export const instant = false;

export default async function DesignNewsCollectionPage() {
  const articles = await designNewsEntries();
  return <><SiteHeader /><DesignNewsIndex articles={articles} newsOnly /><SiteFooter /></>;
}
