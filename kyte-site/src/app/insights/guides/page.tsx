import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { EditorialGuides } from "@/components/design-system/EditorialCollections";
import "@/components/design-system/DesignNews.css";

export const metadata: Metadata = {
  title: "Guides | Kyte",
  description: "Practical guides for teams designing digital products and services.",
  robots: { index: false, follow: false },
};

export default function GuidesPage() {
  return <><SiteHeader /><main className="design-news"><EditorialGuides standalone /></main><SiteFooter /></>;
}
