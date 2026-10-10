"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { DesignNewsArticle } from "@/lib/sanity";
import { EditorialGuides, EditorialResources, EditorialShortcuts } from "./EditorialCollections";
import "./DesignNews.css";

function topic(article: DesignNewsArticle) {
  return article.category?.split(",").at(-1)?.trim() || "Design News";
}

function date(article: DesignNewsArticle) {
  const value = article.publishedAt || article.updatedAt;
  return value
    ? new Date(value).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" })
    : null;
}

function articleMeta(article: DesignNewsArticle) {
  const publishedDate = date(article);
  return publishedDate ? `${topic(article)} · ${publishedDate}` : topic(article);
}

export function DesignNewsIndex({ articles, showPlaceholders = false, newsOnly = false }: { articles: DesignNewsArticle[]; showPlaceholders?: boolean; newsOnly?: boolean }) {
  const featured = useMemo(() => {
    if (newsOnly) return [];
    const selected = articles.filter((article) => article.featured && article.cover?.url);
    return (selected.length ? selected : articles.filter((article) => article.cover?.url)).slice(0, 4);
  }, [articles, newsOnly]);
  const ListingHeading = newsOnly ? "h1" : "h2";
  const topics = useMemo(() => [...new Set(articles.map(topic))], [articles]);
  const [slide, setSlide] = useState(0);
  const [activeTopic, setActiveTopic] = useState("All");
  const [shown, setShown] = useState(8);
  const filtered = articles.filter((article) => activeTopic === "All" || topic(article) === activeTopic);

  useEffect(() => {
    if (featured.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setSlide((current) => (current + 1) % featured.length), 8000);
    return () => window.clearInterval(timer);
  }, [featured.length]);

  const changeSlide = (direction: -1 | 1) => setSlide((current) => (current + direction + featured.length) % featured.length);

  return <main className="design-news">
    {!newsOnly && <div className="design-news__soft">
      <section className="design-news__hero" aria-labelledby="design-news-heading">
        <div className="design-news__intro">
          <p className="eyebrow">Design News</p>
          <h1 id="design-news-heading">Ideas from Kyte</h1>
          <p>Writing on visual culture, branding, and the ideas shaping how people experience products.</p>
          <a className="kyte-button" href="#all-stories">See all stories <ArrowUpRight size={17} aria-hidden="true" /></a>
        </div>
        {featured.length > 0 && <div className="design-news__feature" aria-roledescription="carousel" aria-label="Featured Design News">
          {featured.map((article, index) => <Link
            key={article._id}
            href={`/insights/${encodeURIComponent(article.slug)}`}
            className={`design-news__slide${index === slide ? " is-active" : ""}`}
            aria-hidden={index !== slide}
            tabIndex={index === slide ? 0 : -1}
          >
            {article.cover.url && <Image src={article.cover.url} alt="" fill unoptimized sizes="(max-width: 900px) 100vw, 70vw" />}
            <span className="design-news__slide-shade" />
            <span className="design-news__slide-top"><span>Kyte Design News</span><span>{String(index + 1).padStart(2, "0")} / {String(featured.length).padStart(2, "0")}</span></span>
            <span className="design-news__slide-copy"><span className="design-news__slide-meta">{articleMeta(article)}</span><strong>{article.title}</strong><span className="design-news__slide-cta">Read story <ArrowUpRight size={17} aria-hidden="true" /></span></span>
          </Link>)}
          {featured.length > 1 && <div className="design-news__arrows">
            <button type="button" aria-label="Previous featured story" onClick={() => changeSlide(-1)}><ArrowLeft size={18} /></button>
            <button type="button" aria-label="Next featured story" onClick={() => changeSlide(1)}><ArrowRight size={18} /></button>
          </div>}
        </div>}
      </section>
    </div>}
    {!newsOnly && showPlaceholders && <EditorialShortcuts showPlaceholders />}
    <section className="design-news__listing" id="all-stories" aria-labelledby="all-stories-heading">
      <div className="design-news__listing-head"><ListingHeading id="all-stories-heading">Design News</ListingHeading></div>
      <div className="design-news__filters" role="group" aria-label="Filter stories">
        {["All", ...topics].map((item) => <button key={item} type="button" aria-pressed={activeTopic === item} onClick={() => { setActiveTopic(item); setShown(8); }}>{item}</button>)}
      </div>
      {filtered.length === 0 && <p className="design-news__empty" role="status">No stories match this topic.</p>}
      <div className="design-news__rows">{filtered.slice(0, shown).map((article) => <Link className="design-news__row" key={article._id} href={`/insights/${encodeURIComponent(article.slug)}`}>
        <span className="design-news__row-date" title={article.publishedAt ? "Published date" : "Last updated"}>{date(article) || "Date pending"}</span>
        <span className="design-news__row-main"><span className="design-news__row-topic">{topic(article)}</span><strong>{article.title}</strong>{date(article) && <small>{article.author || "Kyte team"}</small>}</span>
        <span className="design-news__row-image">{article.cover.url && <Image src={article.cover.url} alt="" fill unoptimized sizes="(max-width: 700px) 35vw, 22vw" />}</span>
      </Link>)}</div>
      {shown < filtered.length && <button className="design-news__more" type="button" onClick={() => setShown((value) => value + 8)}>Load more <ArrowRight size={16} aria-hidden="true" /></button>}
      {!newsOnly && <Link className="kyte-button design-news__view-all" href="/insights/design-news">View all Design News <ArrowRight size={17} aria-hidden="true" /></Link>}
    </section>
    {!newsOnly && showPlaceholders && <><EditorialResources /><EditorialGuides /></>}
  </main>;
}
