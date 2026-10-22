"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Gauge, Route, Search, Target, TrendingUp } from "lucide-react";
import { DotPattern } from "./ui/DotPattern";
import "./ServiceDecisionStory.css";

export const auditDecisions = [
  {
    title: "A focused research plan",
    body: "Align on the questions to answer, the people to learn from, and the methods that fit the product and project scope.",
    Icon: Target,
  },
  {
    title: "Evidence from real users",
    body: "Bring interview notes, observed behaviors, and usability findings together to show where expectations and experience differ.",
    Icon: Search,
  },
  {
    title: "A clearer view of key journeys",
    body: "See how important tasks connect across screens, including the steps that cause friction, confusion, or drop-off.",
    Icon: Route,
  },
  {
    title: "Prioritised next steps",
    body: "Turn the findings into a practical sequence of improvements, with context your team can use to plan and evaluate the work.",
    Icon: TrendingUp,
  },
  {
    title: "A baseline for measuring progress",
    body: "Capture where the experience stands today and identify useful signals to revisit after improvements are made.",
    Icon: Gauge,
  },
] as const;

export type Decision = { title: string; body: string; image?: string; alt?: string };
export type Deliverable = { title: string; body: string };
const decisionIcons = [Target, Search, Route, TrendingUp, Gauge];
const decisionPatterns = ["discover", "define", "develop", "deliver", "orbit"] as const;
const decisionSurfaces = ["blue", "black", "white", "blue", "black"] as const;

export function ServiceDecisionStory({ items = auditDecisions, ctaLabel = "Discuss your product", itemsLabel = "Service outcomes", heading = "A useful picture of what to improve.", intro = "Bring user evidence, interface reviews, and product context together. Leave with a shared understanding of the experience and a clear path for the next design decisions." }: { items?: readonly Decision[]; eyebrow?: string; heading?: string; intro?: string; ctaLabel?: string; itemsLabel?: string }) {
  const [active, setActive] = useState(0);

  return <section className="service-decisions" aria-labelledby="service-decisions-title">
    <div className="service-decisions__inner">
      <div className="service-decisions__layout">
        <div className="service-decisions__feature">
          <div className="service-decisions__heading"><h2 id="service-decisions-title">{heading}</h2><p>{intro}</p>
            <Link className="kyte-button" href="/contact">{ctaLabel} <ArrowRight size={18} aria-hidden="true" /></Link>
          </div>
          <div className={`service-decisions__visual-frame service-decisions__visual-frame--${decisionSurfaces[active % decisionSurfaces.length]}`} aria-hidden="true" data-pattern={decisionPatterns[active % decisionPatterns.length]}>
            <DotPattern shape={decisionPatterns[active % decisionPatterns.length]} tone={decisionSurfaces[active % decisionSurfaces.length] === "blue" ? "white" : decisionSurfaces[active % decisionSurfaces.length] === "black" ? "charcoal" : "brand"} className="service-decisions__dot-pattern" />
          </div>
        </div>
        <div className="service-decisions__steps" aria-label={itemsLabel}>
          {items.map((decision, index) => { const Icon = decisionIcons[index % decisionIcons.length]; return <article className={`service-decisions__step${active === index ? " is-active" : ""}`} key={decision.title}>
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
