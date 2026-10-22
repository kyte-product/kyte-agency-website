"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { DotPattern } from "./ui/DotPattern";
import "./ServiceApproach.css";

export const auditInclusions = [
  {
    symbol: 0,
    title: "User needs and behaviours",
    description: "A clear readout of user needs, behaviours, and recurring friction, grounded in research and the context around your product.",
  },
  {
    symbol: 1,
    title: "Usability findings",
    description: "A review of key screens and task flows, with usability issues documented by their effect on people and the product.",
  },
  {
    symbol: 2,
    title: "Journey and flow review",
    description: "An end-to-end view of important journeys, showing where people lose clarity, encounter unnecessary steps, or struggle to complete a task.",
  },
  {
    symbol: 3,
    title: "Prioritised recommendations",
    description: "Practical improvements with clear rationale and next steps, so your team can decide what to address now and what to plan next.",
  },
] as const;

function ApproachMark({ symbol, active, seed }: { symbol: number; active: boolean; seed: string }) {
  const shapes = ["checker", "pinwheel", "quarters", "diamond"] as const;
  return <DotPattern shape={shapes[symbol % shapes.length]} tone={active ? "white" : "brand"} seed={seed} className="service-approach__mark" motifSlot={symbol} />;
}

export function ServiceApproach({ items = auditInclusions, heading = "A clearer view of what to improve.", intro = "A focused research and audit engagement connects evidence to action, giving your team a clear view of what users need, where they struggle, and which improvements to take forward.", patternSeed = "service-approach" }: { items?: readonly { symbol: number; title: string; description: string }[]; heading?: string; intro?: string; patternSeed?: string }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return <section className="service-approach" aria-labelledby="service-approach-title">
    <div className="service-approach__inner">
      <div className="service-approach__heading">
        <div><h2 id="service-approach-title">{heading}</h2></div>
        <p>{intro}</p>
      </div>
      <div className="service-approach__cards" aria-label="What this service includes">
        {items.map((inclusion, index) => {
          const isActive = activeIndex === index;
          return <article className={`service-approach__card${isActive ? " is-active" : ""}`} key={inclusion.title} onMouseEnter={() => setActiveIndex(index)}>
            <div className="service-approach__illustration">
              <ApproachMark symbol={inclusion.symbol} active={isActive} seed={`${patternSeed}:${inclusion.title}`} />
            </div>
            <div className="service-approach__card-content">
              <button className="service-approach__toggle" type="button" aria-expanded={isActive} aria-controls={`service-approach-copy-${index}`} onClick={() => setActiveIndex(index)} onFocus={() => setActiveIndex(index)}>
                <span>{inclusion.title}</span><span className="service-approach__icon" aria-hidden="true">{isActive ? <Minus size={18} strokeWidth={1.8} /> : <Plus size={18} strokeWidth={1.8} />}</span>
              </button>
              <div className="service-approach__copy" id={`service-approach-copy-${index}`} hidden={!isActive}><p>{inclusion.description}</p></div>
            </div>
          </article>;
        })}
      </div>
    </div>
  </section>;
}
