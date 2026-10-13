"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
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

function ApproachMark({ symbol, active }: { symbol: number; active: boolean }) {
  const bounds: Record<number, [number, number, number, number]> = {
    0: [756, 139, 112, 112],
    1: [616, 0, 112, 112],
    2: [476, 558, 112, 112],
    3: [336, 976, 112, 112],
  };
  const [x, y, width, height] = bounds[symbol];
  const filterId = `approach-mark-${symbol}-${active ? "white" : "blue"}`;

  return <svg className="service-approach__mark" viewBox={`${x} ${y} ${width} ${height}`} role="presentation" aria-hidden="true">
    <defs>
      <filter id={filterId} colorInterpolationFilters="sRGB">
        <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -0.2126 -0.7152 -0.0722 0 1" result="symbolMask" />
        <feFlood floodColor={active ? "var(--color-white)" : "var(--color-blue)"} result="themeColor" />
        <feComposite in="themeColor" in2="symbolMask" operator="in" />
      </filter>
    </defs>
    <image href="/images/service-approach-symbols-v2.png" x="0" y="0" width="1200" height="1506" preserveAspectRatio="none" filter={`url(#${filterId})`} />
  </svg>;
}

export function ServiceApproach({ items = auditInclusions, heading = "A clearer view of what to improve.", intro = "A focused research and audit engagement connects evidence to action, giving your team a clear view of what users need, where they struggle, and which improvements to take forward." }: { items?: readonly { symbol: number; title: string; description: string }[]; heading?: string; intro?: string }) {
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
              <ApproachMark symbol={inclusion.symbol} active={isActive} />
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
