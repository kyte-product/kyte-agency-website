import { Breadcrumbs } from "@/components/design-system/Breadcrumbs";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { guideItems } from "@/lib/editorial-items";
import { SiteHeader } from "@/components/SiteHeader";
import { SplitCtaBanner } from "@/components/SplitCtaBanner";
import { SiteFooter } from "@/components/SiteFooter";
import { editorialSections } from "@/components/design-system/EditorialBody";
import "@/components/design-system/EditorialPages.css";
import "@/components/design-system/GuideDocumentation.css";

export const instant = false;

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return guideItems.map(item => ({ slug: item.article.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = guideItems.find(item => item.article.slug === slug);
  return { title: item ? `${item.article.title} | Guides | Kyte` : "Guide | Kyte", description: item?.article.summary || undefined, robots: { index: false, follow: false } };
}
export default async function GuideItemPage({ params }: Props) {
  const { slug } = await params;
  const index = guideItems.findIndex(item => item.article.slug === slug);
  if (index < 0) notFound();
  const item = guideItems[index];
  const sections = editorialSections(item.article.body);
  const previous = guideItems[index - 1];
  const next = guideItems[index + 1];
  return <><SiteHeader /><main className="guide-docs">
    <aside className="guide-docs__sidebar" data-site-reveal-ignore data-lenis-prevent tabIndex={0} aria-label="Guide navigation"><nav aria-label="Guide library"><h2>Guides</h2><ul>{guideItems.map(guide => <li key={guide.article.slug}><Link href={`/insights/guides/${guide.article.slug}`} aria-current={guide.article.slug === slug ? "page" : undefined}>{guide.article.title}</Link></li>)}</ul></nav></aside>
    <div className="guide-docs__reading"><article className="guide-docs__article"><header><Breadcrumbs href="/insights/guides" label="Guides" current={item.article.title} /><h1>{item.article.title}</h1><p className="guide-docs__summary">{item.article.summary}</p><dl className="guide-docs__facts"><div><dt>For</dt><dd>{item.audience}</dd></div><div><dt>Level</dt><dd>{item.level}</dd></div><div><dt>Steps</dt><dd>{item.steps.length}</dd></div></dl></header>
    <nav className="guide-docs__contents" aria-label="On this page"><h2>On this page</h2><ol>{sections.map(section => <li key={section.id}><a href={`#${section.id}`}>{section.title}</a></li>)}</ol></nav>
    <div className="editorial-body">{item.steps.map((step, index) => <section key={sections[index].id}><h2 id={sections[index].id}>{step.title}</h2><p>{step.description}</p>{index % 2 === 0 && <figure className="guide-docs__image-placeholder" role="img" aria-label={`Image placeholder for ${step.title}`} />}</section>)}</div>
    <nav className="guide-docs__pagination" aria-label="Guide navigation">{previous ? <Link href={`/insights/guides/${previous.article.slug}`}><span>Previous guide</span><strong>{previous.article.title}</strong><ChevronLeft className="guide-docs__pagination-chevron" size={20} aria-hidden="true" /></Link> : <span />}{next && <Link href={`/insights/guides/${next.article.slug}`}><span>Next guide</span><strong>{next.article.title}</strong><ChevronRight className="guide-docs__pagination-chevron" size={20} aria-hidden="true" /></Link>}</nav></article><SplitCtaBanner /></div>
  </main><SiteFooter showBanner={false} /></>;
}
