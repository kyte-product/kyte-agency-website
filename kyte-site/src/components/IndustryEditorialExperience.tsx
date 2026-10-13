"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { ClientBrandTicker } from "./ClientBrandTicker";
import { ClientStories } from "./ClientStories";
import { HomeFaq } from "./HomeFaq";
import { WorkShowcase } from "./WorkShowcase";
import { RevealWords } from "./RevealWords";
import type { IndustryPageContent } from "@/data/industryPages";
import { getIndustryPhotography } from "@/data/pagePhotography";
import type { DesignNewsArticle } from "@/lib/sanity";
import "./IndustryEditorialExperience.css";

function EditorialImage({ image, alt, className = "" }: { image: string; alt: string; className?: string }) {
  return <div className={`industry-editorial__media ${className}`}><Image src={image} alt={alt} fill sizes="(max-width: 700px) 100vw, 50vw" unoptimized /></div>;
}

export function IndustryEditorialExperience({ industry, designNews }: { industry: IndustryPageContent; designNews: DesignNewsArticle[] }) {
  const { editorial } = industry;
  const photos = getIndustryPhotography(industry.slug);
  const faqItems = [...industry.faqs, {
    question: "What can an initial engagement include?",
    answer: "We can begin with a focused review of one journey or define a wider scope across research, interface design, and brand. The starting point depends on your project and team.",
  }];

  return <div className="industry-editorial">
    <section className="industry-editorial__hero industry-editorial__shell" aria-labelledby="industry-title">
      <div className="industry-editorial__hero-content">
        <h1 id="industry-title" data-reveal-words><RevealWords text={`${industry.hero[0]} ${industry.hero[1]}`} /></h1>
        <div className="industry-editorial__hero-aside"><p data-reveal-words data-reveal-delay="140"><RevealWords text={editorial.heroAside} /></p><Link className="industry-editorial__explore" href="#opportunity">Explore industry <ArrowDown size={18} aria-hidden="true" /></Link></div>
      </div>
      <EditorialImage {...photos[0]} className="industry-editorial__hero-image" />
    </section>

    <section className="industry-editorial__section industry-editorial__shell" id="opportunity" aria-labelledby="opportunity-title">
      <div className="industry-editorial__intro"><h2 id="opportunity-title" data-reveal-words><RevealWords text={editorial.opportunityHeading} /></h2><p>{industry.opening}</p></div>
      <div className="industry-editorial__image-pair"><EditorialImage {...photos[1]} /><EditorialImage {...photos[2]} /></div>
      <div className="industry-editorial__three">{industry.focus.slice(0, 3).map((item) => <article key={item.title}><h3 data-reveal-words><RevealWords text={item.title} /></h3><p>{item.body}</p></article>)}</div>
    </section>

    <section className="industry-editorial__section industry-editorial__shell" id="approach" aria-labelledby="approach-title">
      <div className="industry-editorial__intro"><h2 id="approach-title" data-reveal-words><RevealWords text={editorial.approachHeading} /></h2><p>{industry.focusIntro}</p></div>
      <EditorialImage {...photos[3]} className="industry-editorial__wide-image" />
    </section>

    <section className="industry-editorial__statement industry-editorial__shell" aria-label="Brands we have worked with"><ClientBrandTicker title="Brands we have worked with" /></section>

    <section className="industry-editorial__section industry-editorial__impact industry-editorial__shell" id="impact" aria-labelledby="impact-title">
      <div className="industry-editorial__impact-story"><h2 id="impact-title" data-reveal-words><RevealWords text={editorial.impactHeading} /></h2><div className="industry-editorial__impact-copy">{editorial.impactCopy.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></div>
      <div className="industry-editorial__metric-grid" aria-label="Placeholder impact metrics">{editorial.metricLabels.map((label, index) => <div className="industry-editorial__metric" key={label}><strong>{["00+", "00%", "000+", "00+"][index]}</strong><span>{label}</span></div>)}</div>
    </section>

    <section className="industry-editorial__section industry-editorial__shell" aria-labelledby="services-title">
      <div className="industry-editorial__intro"><h2 id="services-title" data-reveal-words><RevealWords text={industry.servicesHeading} /></h2><p>{industry.servicesIntro}</p></div>
      <div className="industry-editorial__service-grid">{industry.services.map((service, index) => <Link href={service.href} key={service.href}><EditorialImage {...photos[index + 4]} /><span><strong>{service.title}</strong><ArrowRight size={18} aria-hidden="true" /></span><p>{service.body}</p></Link>)}</div>
    </section>

    <WorkShowcase />
    <ClientStories articles={designNews} />
    <HomeFaq items={faqItems} heading={`Questions about ${industry.name.toLowerCase()} design.`} allowMultiple />
  </div>;
}
