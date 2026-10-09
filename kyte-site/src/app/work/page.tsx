import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WorkIndex } from "@/components/design-system/WorkIndex";
import { workEntries } from "@/lib/editorial";
import "@/components/design-system/EditorialPages.css";

export const metadata: Metadata = {
  title: "Case Studies | Kyte Agency",
  description: "See Kyte's product, website, brand, and content projects.",
};
export const instant = false;

export default async function WorkPage() {
  const projects = await workEntries();
  return <><SiteHeader /><main className="work-index">
    <header className="work-index__head"><p className="eyebrow">Case studies</p><h1>Take a look at our <span className="work-index__accent">work</span>.</h1><p>Browse product, website, brand, and content projects, and see what we made for each client.</p></header>
    <WorkIndex projects={projects} />
  </main><SiteFooter /></>;
}
