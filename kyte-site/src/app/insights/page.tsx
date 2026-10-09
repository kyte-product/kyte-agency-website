import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { DesignNewsIndex } from "@/components/design-system/DesignNewsIndex";
import { designNewsEntries } from "@/lib/editorial";

export const metadata: Metadata = {
  title: "Design News | Kyte",
  description: "Ideas and observations from the Kyte team on design, branding, and visual culture.",
};
export const instant = false;

export default async function InsightsPage() {
  const articles = await designNewsEntries();
  return <><SiteHeader /><DesignNewsIndex articles={articles} /><SiteFooter /></>;
}
