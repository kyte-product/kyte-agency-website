import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { EditorialBody, editorialSections } from "@/components/design-system/EditorialBody";
import { ArticleTopics } from "@/components/design-system/ArticleTopics";
import { designNewsEntry } from "@/lib/editorial";
import "@/components/design-system/EditorialPages.css";

type Props = { params: Promise<{ slug: string }> };
export const instant = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await designNewsEntry(slug);
  return { title: article ? `${article.title} | Design News | Kyte` : "Design News | Kyte", description: article?.summary || undefined };
}

export default async function DesignNewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await designNewsEntry(slug);
  if (!article) notFound();
  const category = article.category?.split(",").at(-1)?.trim() || "Design News";
  const sections = editorialSections(article.body);
  const date = article.publishedAt || article.updatedAt;
  const formattedDate = date && new Date(date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" });

  return <><SiteHeader /><main className="editorial-detail editorial-detail--news">
    <header className="editorial-detail__heading">
      <nav className="editorial-detail__breadcrumbs" aria-label="Breadcrumb">
        <Link className="editorial-detail__breadcrumb-link" href="/insights/design-news"><ChevronLeft size={18} strokeWidth={1.8} aria-hidden="true" /> Design News</Link>
        <span className="editorial-detail__breadcrumb-separator" aria-hidden="true">/</span>
        <span aria-current="page">{article.title}</span>
      </nav>
      <div className="editorial-detail__news-heading">
        <h1>{article.title}</h1>
        <div className="editorial-detail__news-details">
          {article.summary && <p className="editorial-detail__summary">{article.summary}</p>}
          <div className="editorial-detail__work-aside">
            <dl className="editorial-detail__facts">
              <div><dt>Author</dt><dd>{article.author || "Kyte team"}</dd></div>
              <div><dt>Topic</dt><dd>{category}</dd></div>
              {formattedDate && <div><dt>{article.publishedAt ? "Published" : "Updated"}</dt><dd><time dateTime={date || undefined}>{formattedDate}</time></dd></div>}
            </dl>
          </div>
        </div>
      </div>
    </header>
    {article.cover.url && <figure className="editorial-detail__work-cover editorial-detail__news-cover" data-nav-theme="dark"><Image src={article.cover.url} alt="" fill unoptimized sizes="(max-width: 700px) 100vw, 90vw" /></figure>}
    <div className="editorial-detail__article-layout">
      {sections.length > 0 && <ArticleTopics sections={sections} />}
      <article className="editorial-detail__article-main"><EditorialBody blocks={article.body} /></article>
    </div>
  </main><SiteFooter /></>;
}
