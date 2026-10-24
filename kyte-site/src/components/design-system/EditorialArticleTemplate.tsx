import { Breadcrumbs } from "@/components/design-system/Breadcrumbs";
import type { ReactNode } from "react";
import Image from "next/image";

import type { DesignNewsArticle } from "@/lib/sanity";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { EditorialBody, editorialSections } from "./EditorialBody";
import { ArticleTopics } from "./ArticleTopics";
import "./EditorialPages.css";

type Props = { article: DesignNewsArticle; collectionLabel?: string; collectionHref?: string; sample?: boolean; facts?: { label: string; value: string }[]; cover?: ReactNode; actions?: ReactNode; sidebar?: ReactNode; content?: ReactNode; hideHeaderFacts?: boolean };
export function EditorialArticleTemplate({ article, collectionLabel = "Design News", collectionHref = "/insights/design-news", sample = false, facts = [], cover, actions, sidebar, content, hideHeaderFacts = false }: Props) {
  const category = article.category?.split(",").at(-1)?.trim() || collectionLabel;
  const sections = editorialSections(article.body);
  const date = article.publishedAt || article.updatedAt;
  const formattedDate = date && new Date(date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" });

  return <><SiteHeader /><main className={`editorial-detail editorial-detail--news${hideHeaderFacts ? " editorial-detail--resource" : ""}`}>
    <header className="editorial-detail__heading">
      <Breadcrumbs href={collectionHref} label={collectionLabel} current={article.title} />
      <div className="editorial-detail__news-heading">
        <h1>{article.title}</h1>
        <div className="editorial-detail__news-details">
          {article.summary && <p className="editorial-detail__summary">{article.summary}</p>}
          {!hideHeaderFacts && <div className="editorial-detail__work-aside">
            <dl className="editorial-detail__facts">
              {sample ? <div><dt>Status</dt><dd>Sample content</dd></div> : <div><dt>Author</dt><dd>{article.author || "Kyte team"}</dd></div>}
              <div><dt>Topic</dt><dd>{category}</dd></div>
              {facts.map(fact => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}
              {formattedDate && <div><dt>{article.publishedAt ? "Published" : "Updated"}</dt><dd><time dateTime={date || undefined}>{formattedDate}</time></dd></div>}
            </dl>
          </div>}
          {actions}
        </div>
      </div>
    </header>
    {(article.cover.url || cover) && <figure className={`editorial-detail__work-cover editorial-detail__news-cover${article.slug === "why-sensory-branding-is-the-next-big-thing-in-2026" ? " editorial-detail__news-cover--cropped" : ""}`} data-nav-theme={article.cover.url ? "dark" : undefined}>{article.cover.url ? <Image src={article.cover.url} alt={article.cover.alt || ""} fill unoptimized sizes="100vw" priority /> : cover}</figure>}
    <div className={`editorial-detail__article-layout${sidebar || sections.length ? "" : " editorial-detail__article-layout--single"}`}>
      {sidebar || (sections.length > 0 && <ArticleTopics sections={sections} />)}
      <article className="editorial-detail__article-main">{content || <EditorialBody blocks={article.body} />}</article>
    </div>
  </main><SiteFooter /></>;
}
