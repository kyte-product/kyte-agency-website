import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Download } from "lucide-react";
import { resourceItems } from "@/lib/editorial-items";
import { EditorialArticleTemplate } from "@/components/design-system/EditorialArticleTemplate";
import "@/components/design-system/GuideDocumentation.css";

export const instant = false;

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return resourceItems.map(item => ({ slug: item.article.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = resourceItems.find(item => item.article.slug === slug);
  return { title: item ? `${item.article.title} | Resources | Kyte` : "Resource | Kyte", description: item?.article.summary || undefined, robots: { index: false, follow: false } };
}
export default async function ResourceItemPage({ params }: Props) {
  const { slug } = await params;
  const item = resourceItems.find(item => item.article.slug === slug);
  if (!item) notFound();
  const download = item.download && <a className="kyte-button" href={item.download.url} download><Download size={18} aria-hidden="true" /> {item.download.label} ({item.download.fileType})</a>;
  const description = item.article.body?.filter(block => block.style === "normal").map(block => block.children?.map(child => child.text).join("")).join(" ");
  const sidebar = <aside className="editorial-detail__topics editorial-resource-facts" aria-label="Resource details"><dl className="editorial-detail__facts"><div><dt>Status</dt><dd>Sample content</dd></div><div><dt>Topic</dt><dd>{item.article.category}</dd></div><div><dt>Format</dt><dd>{item.format}</dd></div><div><dt>For</dt><dd>{item.audience}</dd></div></dl></aside>;
  return <EditorialArticleTemplate article={item.article} collectionLabel="Resources" collectionHref="/insights/resources" hideHeaderFacts cover={<div className="editorial-resource-cover" role="img" aria-label="Resource cover image placeholder" />} actions={download} sidebar={sidebar} content={<div className="editorial-resource-description"><p>{description}</p>{download}</div>} />;
}
