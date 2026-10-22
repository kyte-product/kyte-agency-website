"use client";

import { useState, type CSSProperties, type KeyboardEvent } from "react";
import { DotPattern } from "./ui/DotPattern";

const stages = [
  {
    title: "Discovery",
    deliverables: ["Stakeholder conversations", "Experience audit", "User research", "Product goals", "Scope & priorities"],
    outcome: "A shared view of the product, its audience, and the decisions that matter most.",
  },
  {
    title: "UX Architecture",
    deliverables: ["User flows", "Content structure", "Wireframes", "Interaction patterns", "Prototype"],
    outcome: "The main journeys and structure are clear enough to review before visual design begins.",
  },
  {
    title: "UI Design",
    deliverables: ["Visual direction", "Responsive screens", "Interface states", "Components", "Design system"],
    outcome: "The approved experience becomes a coherent interface across screens and states.",
  },
  {
    title: "Handoff & implementation",
    deliverables: ["Design files", "Component guidance", "Assets", "Build reviews", "Refinement"],
    outcome: "The people building the product have the details and context to carry the design through.",
  },
] as const;

export function ProductDesignFramework() {
  const [active, setActive] = useState(0);
  const stage = stages[active];

  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % stages.length;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (index - 1 + stages.length) % stages.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = stages.length - 1;
    else return;

    event.preventDefault();
    setActive(next);
    const tabs = event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>("[role=tab]");
    tabs?.[next]?.focus();
  }

  return (
    <div className="product-framework">
      <div className="product-framework__copy">
        <div className="product-framework__tabs" role="tablist" aria-label="Design framework stages" aria-orientation="vertical">
          {stages.map((item, index) => (
            <button
              type="button"
              role="tab"
              id={`product-framework-tab-${index}`}
              aria-controls="product-framework-panel"
              aria-selected={index === active}
              tabIndex={index === active ? 0 : -1}
              className={index === active ? "is-active" : ""}
              key={item.title}
              onClick={() => setActive(index)}
              onKeyDown={(event) => onTabKeyDown(event, index)}
            >{item.title}</button>
          ))}
        </div>
        <div className="product-framework__detail" role="tabpanel" id="product-framework-panel" aria-labelledby={`product-framework-tab-${active}`} key={stage.title}>
          <p className="product-framework__label">Deliverables</p>
          <ul className="product-framework__chips">{stage.deliverables.map((item) => <li key={item}>{item}</li>)}</ul>
          <p className="product-framework__label">Outcome</p>
          <p className="product-framework__outcome">{stage.outcome}</p>
        </div>
      </div>
      <div className="product-framework__visual" data-stage={active} aria-hidden="true">
        <div className="product-framework__visual-grid" />
        <div className="product-framework__track" style={{ "--track-offset": `${-(active * 328 + 136)}px`, "--track-rise": `${-(active * 110 + 52)}px`, "--mobile-track-offset": `${-(active * 230 + 95)}px`, "--mobile-track-rise": `${-(active * 70 + 44)}px` } as CSSProperties}>
          {stages.map((item, index) => {
            return <div className={`product-framework__node${index === active ? " is-active" : ""}`} key={item.title}>
              <span className="product-framework__node-pattern"><DotPattern seed={`product:framework:${item.title}`} motifSlot={index} /></span>
              <span>{item.title}</span>
              {index < stages.length - 1 && <svg className="product-framework__connector" viewBox="0 0 56 110" preserveAspectRatio="none" fill="none" aria-hidden="true"><path d="M0 0 H14 Q26 0 26 12 V98 Q26 110 38 110 H56" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>}
            </div>;
          })}
        </div>
      </div>
    </div>
  );
}
