import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { EditorialBody } from "@/components/design-system/EditorialBody";
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

  return <><SiteHeader /><main className="editorial-detail editorial-detail--news">
    <header className="editorial-detail__heading">
      <Link className="editorial-detail__back" href="/insights"><ArrowLeft size={18} strokeWidth={1.7} aria-hidden="true" /> All Design News</Link>
      <p className="eyebrow">{category}</p>
      <h1>{article.title}</h1>
      {article.summary && <p className="editorial-detail__summary">{article.summary}</p>}
    </header>
    <div className="editorial-detail__grid">
      <div className="editorial-detail__side">
        <div><span>Author</span><strong>{article.author || "Kyte team"}</strong></div>
        {article.publishedAt && <div><span>Date</span><strong>{new Date(article.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</strong></div>}
      </div>
      <article className="editorial-detail__main">
        {article.cover.url && <figure className="editorial-detail__cover"><Image src={article.cover.url} alt="" fill unoptimized sizes="(max-width: 900px) 100vw, 75vw" /></figure>}
        <EditorialBody blocks={article.body} />
      </article>
    </div>
  </main><SiteFooter /></>;
}
