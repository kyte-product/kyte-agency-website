import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WorkIndex } from "@/components/design-system/WorkIndex";
import { workEntries } from "@/lib/editorial";
import "@/components/design-system/EditorialPages.css";

export const metadata: Metadata = {
  title: "Work | Kyte",
  description: "Selected product, website, brand, and content work from Kyte.",
};
export const instant = false;

export default async function WorkPage() {
  const projects = await workEntries();
  return <><SiteHeader /><main className="work-index">
    <header className="work-index__head"><p className="eyebrow">Case studies</p><h1>Our work</h1><p>Product, website, brand, and content projects from the Kyte team.</p></header>
    <WorkIndex projects={projects} />
  </main><SiteFooter /></>;
}
