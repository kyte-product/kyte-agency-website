"use client";

import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { ClientBrandTicker } from "./ClientBrandTicker";
import { HomeFaq } from "./HomeFaq";
import { WorkShowcase } from "./WorkShowcase";
import { RevealWords } from "./RevealWords";
import type { IndustryPageContent } from "@/data/industryPages";
import { ServiceDecisionStory } from "./ServiceDecisionStory";
import { DepartmentCards } from "./ServicesIntro";
import { ImpactCards } from "./ImpactCards";
import { ProductServices } from "./ProductServices";
import { industrySnapshots } from "@/data/industrySnapshots";
import "./IndustryEditorialExperience.css";

export function IndustryEditorialExperience({ industry }: { industry: IndustryPageContent }) {
  const { editorial } = industry;
  const snapshot = industrySnapshots[industry.slug];
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
      <div className="industry-editorial__media industry-editorial__hero-image industry-editorial__hero-placeholder" aria-hidden="true" />
    </section>

    <section className="industry-editorial__section industry-editorial__shell" id="opportunity" aria-labelledby="opportunity-title">
      <div className="industry-editorial__intro"><h2 id="opportunity-title" data-reveal-words><RevealWords text={editorial.opportunityHeading} /></h2><p>{industry.opening}</p></div>
      <DepartmentCards cards={snapshot.cards} />
      <div className="industry-editorial__three">{industry.focus.slice(0, 3).map((item) => <article key={item.title}><h3 data-reveal-words><RevealWords text={item.title} /></h3><p>{item.body}</p></article>)}</div>
    </section>

    <div id="approach"><ServiceDecisionStory heading={industry.focusHeading} intro={industry.focusIntro} items={industry.focus.slice(0, 5)} ctaLabel="Discuss your project" itemsLabel="Industry focus areas" /></div>

    <section className="industry-editorial__statement industry-editorial__shell" aria-label="Brands we have worked with"><ClientBrandTicker title="Brands we have worked with" /></section>

    <section className="industry-editorial__section industry-editorial__impact industry-editorial__shell" id="impact" aria-labelledby="impact-title">
      <div className="industry-editorial__impact-story"><h2 id="impact-title" data-reveal-words><RevealWords text={editorial.impactHeading} /></h2><div className="industry-editorial__impact-copy">{editorial.impactCopy.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></div>
      <ImpactCards items={snapshot.metrics} />
      <p className="industry-editorial__source">{snapshot.context} Source: <a href={snapshot.sourceUrl} target="_blank" rel="noreferrer">{snapshot.source}</a>.</p>
    </section>

    <ProductServices />

    <WorkShowcase />
    <HomeFaq items={faqItems} heading={`Questions about ${industry.name.toLowerCase()} design.`} allowMultiple />
  </div>;
}
