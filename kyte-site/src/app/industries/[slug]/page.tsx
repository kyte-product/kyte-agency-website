import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { IndustryEditorialExperience } from "@/components/IndustryEditorialExperience";
import { industryPages } from "@/data/industryPages";

type IndustryParams = { slug: string };

export const instant = false;

export function generateStaticParams() {
  return Object.keys(industryPages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<IndustryParams> }): Promise<Metadata> {
  const { slug } = await params;
  const industry = industryPages[slug];
  if (!industry) return {};
  return { title: industry.title, description: industry.description };
}

export default async function IndustryDetailPage({ params }: { params: Promise<IndustryParams> }) {
  const { slug } = await params;
  const industry = industryPages[slug];
  if (!industry) notFound();

  return <><SiteHeader /><main className="industry-detail">

    <IndustryEditorialExperience industry={industry} />
  </main><SiteFooter /></>;
}
