import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { EditorialResources } from "@/components/design-system/EditorialCollections";
import { showEditorialPlaceholders } from "@/lib/editorial-collections";
import "@/components/design-system/DesignNews.css";

export const metadata: Metadata = {
  title: "Resources | Kyte",
  description: "Practical material for teams working through product and brand decisions.",
  robots: { index: false, follow: false },
};

export default function ResourcesPage() {
  if (!showEditorialPlaceholders) notFound();
  return <><SiteHeader /><main className="design-news"><EditorialResources standalone /></main><SiteFooter /></>;
}
