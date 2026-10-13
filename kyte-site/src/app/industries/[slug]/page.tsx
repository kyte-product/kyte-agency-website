import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { IndustryEditorialExperience } from "@/components/IndustryEditorialExperience";
import { TextRevealMotion } from "@/components/TextRevealMotion";
import { industryPages } from "@/data/industryPages";
import { designNewsEntries } from "@/lib/editorial";

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
  const designNews = await designNewsEntries();

  return <><SiteHeader /><main className="industry-detail">
    <TextRevealMotion />
    <IndustryEditorialExperience industry={industry} designNews={designNews} />
  </main><SiteFooter /></>;
}
