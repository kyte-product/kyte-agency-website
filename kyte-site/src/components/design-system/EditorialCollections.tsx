"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, FileText, Newspaper } from "lucide-react";
import { useState } from "react";
import { guideSamples, resourceSamples } from "@/lib/editorial-collections";
import "./EditorialCollections.css";

export function EditorialShortcuts({ showPlaceholders }: { showPlaceholders: boolean }) {
  const items = [
    { title: "Design News", description: "Stories and ideas from the Kyte team.", href: "/insights/design-news", icon: Newspaper },
    ...(showPlaceholders ? [
      { title: "Resources", description: "Practical tools and reading for product teams.", href: "/insights/resources", icon: FileText },
      { title: "Guides", description: "Step-by-step thinking for better digital work.", href: "/insights/guides", icon: BookOpen },
    ] : []),
  ];

  return <nav className={`editorial-shortcuts${showPlaceholders ? "" : " editorial-shortcuts--single"}`} aria-label="Explore insights">
    {items.map(({ title, description, href, icon: Icon }) => <div className="editorial-shortcuts__item" key={title}>
      <Icon className="editorial-shortcuts__icon" size={40} strokeWidth={1.5} aria-hidden="true" />
      <h2>{title}</h2><p>{description}</p>
      <Link href={href}>Explore {title} <ArrowRight size={17} aria-hidden="true" /></Link>
    </div>)}
  </nav>;
}

export function EditorialResources({ standalone = false }: { standalone?: boolean }) {
  const Heading = standalone ? "h1" : "h2";
  return <section className={`design-news__resources${standalone ? " editorial-collection--standalone" : ""}`} aria-labelledby="design-news-resources-heading">
    <div className="design-news__resources-head"><div><Heading id="design-news-resources-heading">Resources</Heading><p>Practical material for teams working through product and brand decisions.</p></div>{!standalone && <Link className="kyte-button design-news__resources-link" href="/insights/resources">See all resources <ArrowUpRight size={18} aria-hidden="true" /></Link>}</div>
    <div className="design-news__resource-grid">{resourceSamples.map((sample) => <article className="design-news__resource" key={sample.title}>
      <span className="design-news__resource-shelf"><span className="design-news__resource-book"><span className="design-news__resource-back" /><span className="design-news__resource-pages" /><span className="design-news__resource-face editorial-collection__book-face" style={{ backgroundColor: sample.color, color: sample.accent }}><Image className="editorial-collection__book-logo" src="/kyte-agency-logo.svg" alt="" width={1379} height={200} unoptimized /><span className="editorial-collection__book-title">{sample.title}</span><span className="design-news__resource-binding" /></span></span></span>
      <span className="design-news__resource-topic">{sample.kind}</span><strong>{sample.title}</strong>
    </article>)}</div>
  </section>;
}

export function EditorialGuides({ standalone = false }: { standalone?: boolean }) {
  const Heading = standalone ? "h1" : "h2";
  const [featured, setFeatured] = useState(0);
  const [offset, setOffset] = useState(0);
  const selected = guideSamples[featured];
  const ordered = [...guideSamples.slice(offset), ...guideSamples.slice(0, offset)];
  const moveFeatured = (direction: -1 | 1) => setFeatured((value) => (value + direction + guideSamples.length) % guideSamples.length);

  return <section className={`editorial-guides${standalone ? " editorial-collection--standalone" : ""}`} aria-labelledby="editorial-guides-heading">
    <div className="editorial-guides__lead">
      <div className="editorial-guides__intro"><Heading id="editorial-guides-heading">Guides</Heading><p>Clear, practical starting points for teams designing products and services.</p>{!standalone && <Link href="/insights/guides">See all guides <ArrowRight size={17} aria-hidden="true" /></Link>}</div>
      <div className="editorial-guides__featured" aria-live="polite">
        <Image className="editorial-guides__mark" src="/kyte-mark.png" alt="" width={512} height={512} unoptimized />
        <div className="editorial-guides__featured-copy"><h3>{selected.title}</h3><p>{selected.summary}</p></div>
        <div className="editorial-guides__featured-controls"><button type="button" onClick={() => moveFeatured(-1)} aria-label="Previous sample guide"><ArrowLeft size={18} /></button><button type="button" onClick={() => moveFeatured(1)} aria-label="Next sample guide"><ArrowRight size={18} /></button></div>
      </div>
    </div>
    <div className="editorial-guides__highlights-head"><h3>Recent highlights</h3><div><button type="button" onClick={() => setOffset((value) => (value - 1 + guideSamples.length) % guideSamples.length)} aria-label="Previous guide highlights"><ArrowLeft size={18} /></button><button type="button" onClick={() => setOffset((value) => (value + 1) % guideSamples.length)} aria-label="Next guide highlights"><ArrowRight size={18} /></button></div></div>
    <div className="editorial-guides__highlights">{ordered.map((sample) => <article key={sample.title} className="editorial-guides__highlight" style={{ backgroundColor: sample.color }}><h4>{sample.title}</h4><p>{sample.preview}</p><Image src="/kyte-mark.png" alt="" width={44} height={44} unoptimized /></article>)}</div>
  </section>;
}
