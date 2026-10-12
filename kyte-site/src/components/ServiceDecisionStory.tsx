"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Gauge, Route, Search, Target, TrendingUp } from "lucide-react";
import "./ServiceDecisionStory.css";

export const auditDecisions = [
  {
    title: "A focused research plan",
    body: "Align on the questions to answer, the people to learn from, and the methods that fit the product and project scope.",
    image: "https://images.unsplash.com/photo-1587355760421-b9de3226a046?auto=format&fit=crop&w=1400&q=85",
    alt: "Designer reviewing wireframes at a desk",
    Icon: Target,
  },
  {
    title: "Evidence from real users",
    body: "Bring interview notes, observed behaviors, and usability findings together to show where expectations and experience differ.",
    image: "https://images.unsplash.com/photo-1766555766657-ea8f81a67934?auto=format&fit=crop&w=1400&q=85",
    alt: "Laptop and planning notes on a design workspace",
    Icon: Search,
  },
  {
    title: "A clearer view of key journeys",
    body: "See how important tasks connect across screens, including the steps that cause friction, confusion, or drop-off.",
    image: "https://images.unsplash.com/photo-1700887944225-f148dd124305?auto=format&fit=crop&w=1400&q=85",
    alt: "Digital design work open on a computer screen",
    Icon: Route,
  },
  {
    title: "Prioritised next steps",
    body: "Turn the findings into a practical sequence of improvements, with context your team can use to plan and evaluate the work.",
    image: "https://images.unsplash.com/photo-1573805672213-81b449b17e8a?auto=format&fit=crop&w=1400&q=85",
    alt: "Responsive digital interface displayed on a laptop",
    Icon: TrendingUp,
  },
  {
    title: "A baseline for measuring progress",
    body: "Capture where the experience stands today and identify useful signals to revisit after improvements are made.",
    image: "https://images.unsplash.com/photo-1587355760421-b9de3226a046?auto=format&fit=crop&w=1400&q=85",
    alt: "Designer reviewing wireframes at a desk",
    Icon: Gauge,
  },
] as const;

export type Decision = { title: string; body: string; image?: string; alt?: string };
export type Deliverable = { title: string; body: string };
const decisionIcons = [Target, Search, Route, TrendingUp, Gauge];
const fallbackImages = auditDecisions.map(({ image, alt }) => ({ image, alt }));

export function ServiceDecisionStory({ items = auditDecisions, eyebrow = "Research to recommendations", heading = "A useful picture of what to improve.", intro = "Bring user evidence, interface reviews, and product context together. Leave with a shared understanding of the experience and a clear path for the next design decisions." }: { items?: readonly Decision[]; eyebrow?: string; heading?: string; intro?: string }) {
  const [active, setActive] = useState(0);

  return <section className="service-decisions" aria-labelledby="service-decisions-title">
    <div className="service-decisions__inner">
      <div className="service-decisions__layout">
        <div className="service-decisions__feature">
          <div className="service-decisions__heading"><p className="eyebrow">{eyebrow}</p><h2 id="service-decisions-title">{heading}</h2><p>{intro}</p>
            <Link className="kyte-button" href="/contact">Discuss your product <ArrowRight size={18} aria-hidden="true" /></Link>
          </div>
          <figure className="service-decisions__visual-frame" aria-live="polite">
            <Image key={items[active].image ?? fallbackImages[active].image} src={items[active].image ?? fallbackImages[active].image} alt={items[active].alt ?? fallbackImages[active].alt} fill unoptimized sizes="(max-width: 800px) 100vw, 48vw" />
          </figure>
        </div>
        <div className="service-decisions__steps" aria-label="Service outcomes">
          {items.map((decision, index) => { const Icon = decisionIcons[index]; return <article className={`service-decisions__step${active === index ? " is-active" : ""}`} key={decision.title}>
            <button id={`service-decision-tab-${index}`} className="service-decisions__toggle" type="button" aria-expanded={active === index} aria-controls={`service-decision-panel-${index}`} onClick={() => setActive(index)}>
              <span className="service-decisions__icon" aria-hidden="true"><Icon size={19} strokeWidth={1.8} /></span><span>{decision.title}</span>
            </button>
            <div id={`service-decision-panel-${index}`} className="service-decisions__panel" role="region" aria-labelledby={`service-decision-tab-${index}`} hidden={active !== index}>
              <p>{decision.body}</p>
            </div>
          </article>; })}
        </div>
      </div>
    </div>
  </section>;
}

export const auditDeliverables = [
  { title: "Research plan", body: "A focused plan for the questions, audiences, and methods that will guide the audit." },
  { title: "User and stakeholder interviews", body: "Discussion notes that bring user needs and internal context into the same view." },
  { title: "Usability findings", body: "Clear observations of where people hesitate, make errors, or need extra support." },
  { title: "Journey and flow review", body: "A map of key tasks across screens, with friction points and missed opportunities called out." },
  { title: "Interface and accessibility review", body: "A practical assessment of interface consistency, responsive behavior, and accessibility basics." },
  { title: "Prioritised recommendations", body: "A sequenced set of next steps your team can use to plan improvements." },
  { title: "Evidence summary", body: "A concise account of what the research supports, with assumptions kept separate from observed findings." },
  { title: "Opportunity map", body: "Themes grouped by user need and likely impact to help shape a practical design backlog." },
  { title: "Handoff discussion", body: "A working session to review findings, answer questions, and agree on the next decisions." },
] as const;

export function ServiceDeliverables({ items = auditDeliverables, heading = "Useful outputs for the next decision." }: { items?: readonly Deliverable[]; heading?: string }) {
  return <section className="service-deliverables" aria-labelledby="service-deliverables-title">
    <div className="service-deliverables__inner">
      <div className="service-deliverables__heading">
        <p className="eyebrow">What you receive</p>
        <h2 id="service-deliverables-title">{heading}</h2>
      </div>
      <div className="service-deliverables__grid">
        {items.map((item) => <article className="service-deliverables__item" key={item.title}>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
        </article>)}
      </div>
    </div>
  </section>;
}
