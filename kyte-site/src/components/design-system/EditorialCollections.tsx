"use client";

import { Breadcrumbs } from "./Breadcrumbs";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { DotPattern } from "@/components/ui/DotPattern";
import { useState } from "react";
import { guideSamples, resourceSamples } from "@/lib/editorial-collections";
import "./EditorialCollections.css";

export function EditorialShortcuts({ showPlaceholders }: { showPlaceholders: boolean }) {
  const items = [
    { title: "Design News", description: "Stories and ideas from the Kyte team.", href: "/insights/design-news", shape: "ribbon" as const },
    ...(showPlaceholders ? [
      { title: "Resources", description: "Practical tools and reading for product teams.", href: "/insights/resources", shape: "define" as const },
      { title: "Guides", description: "Step-by-step thinking for better digital work.", href: "/insights/guides", shape: "discover" as const },
    ] : []),
  ];

  return <nav id="insights-collections" className={`editorial-shortcuts${showPlaceholders ? "" : " editorial-shortcuts--single"}`} aria-label="Explore insights">
    {items.map(({ title, description, href, shape }) => <div className="editorial-shortcuts__item" key={title}>
      <div className="editorial-shortcuts__art" aria-hidden="true"><DotPattern shape={shape} tone="brand" /></div>
      <h2>{title}</h2><p>{description}</p>
      <Link href={href}>Explore {title} <ArrowRight size={17} aria-hidden="true" /></Link>
    </div>)}
  </nav>;
}

export function EditorialResources({ standalone = false }: { standalone?: boolean }) {
  const Heading = standalone ? "h1" : "h2";
  return <section className={`design-news__resources${standalone ? " editorial-collection--standalone" : ""}`} aria-labelledby="design-news-resources-heading">
    {standalone && <Breadcrumbs href="/insights" label="Insights" current="Resources" />}
    <div className="design-news__resources-head"><div><Heading id="design-news-resources-heading">Resources</Heading><p>Practical material for teams working through product and brand decisions.</p></div>{!standalone && <Link className="kyte-button design-news__resources-link" href="/insights/resources">See all resources <ArrowRight size={18} aria-hidden="true" /></Link>}</div>
    <div className="design-news__resource-grid">{resourceSamples.map((sample) => <Link href={`/insights/resources/${sample.slug}`} className="design-news__resource" key={sample.title}>
      <span className="design-news__resource-shelf"><span className="design-news__resource-book"><span className="design-news__resource-back" /><span className="design-news__resource-pages" /><span className="design-news__resource-face editorial-collection__book-face" style={{ backgroundColor: sample.color, color: sample.accent }}><Image className="editorial-collection__book-logo" src="/kyte-agency-logo.svg" alt="" width={1379} height={200} unoptimized /><span className="editorial-collection__book-title">{sample.title}</span><span className="design-news__resource-binding" /></span></span></span>
      <span className="design-news__resource-topic">{sample.kind}</span><strong>{sample.title}</strong>
    </Link>)}</div>
  </section>;
}

export function EditorialGuides({ standalone = false }: { standalone?: boolean }) {
  const Heading = standalone ? "h1" : "h2";
  const [featured, setFeatured] = useState(0);
  const selected = guideSamples[featured];
  const moveFeatured = (direction: -1 | 1) => setFeatured((value) => (value + direction + guideSamples.length) % guideSamples.length);

  return <section className={`editorial-guides${standalone ? " editorial-collection--standalone" : ""}`} aria-labelledby="editorial-guides-heading">
    {standalone && <Breadcrumbs href="/insights" label="Insights" current="Guides" />}
    <div className="editorial-guides__lead">
      <div className="editorial-guides__intro"><Heading id="editorial-guides-heading">Guides</Heading><p>Clear, practical starting points for teams designing products and services.</p>{!standalone && <Link href="/insights/guides">See all guides <ArrowRight size={17} aria-hidden="true" /></Link>}</div>
      <div className="editorial-guides__featured" aria-live="polite">

        <div className="editorial-guides__featured-art" aria-hidden="true"><DotPattern shape="orbit" tone="white" seed={`insights-featured:${selected.title}`} motifSlot={featured} /></div>
        <div className="editorial-guides__featured-copy"><h3><Link href={`/insights/guides/${selected.slug}`}>{selected.title}</Link></h3><p>{selected.summary}</p><Link className="editorial-guides__read" href={`/insights/guides/${selected.slug}`}>Read guide <ArrowRight size={18} aria-hidden="true" /></Link></div>
        <div className="editorial-guides__featured-controls carousel-arrow-controls"><button type="button" onClick={() => moveFeatured(-1)} aria-label="Previous sample guide"><ArrowLeft size={18} /></button><button type="button" onClick={() => moveFeatured(1)} aria-label="Next sample guide"><ArrowRight size={18} /></button></div>
      </div>
    </div>
    <div className="editorial-guides__highlights-head"><h3>Recent highlights</h3></div>
    <div className="editorial-guides__highlights">{guideSamples.map((sample) => <article key={sample.title} className="editorial-guides__highlight" style={{ backgroundColor: sample.color }}><Link className="editorial-guides__highlight-link" href={`/insights/guides/${sample.slug}`}><div className="editorial-guides__highlight-art" aria-hidden="true"><DotPattern shape="kite" tone="white" /></div><h4>{sample.title}</h4><p>{sample.preview}</p><span className="kyte-tertiary kyte-tertiary--white">Read guide <ArrowRight size={18} aria-hidden="true" /></span></Link></article>)}</div>
  </section>;
}
