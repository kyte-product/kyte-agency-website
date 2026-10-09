"use client";

import Image from "next/image";
import type { PointerEvent } from "react";

const pillars = [
  { name: "Budget", icon: "/fincart/pillar-budget-icon.avif", hover: "/fincart/pillar-budget-hover.avif", detail: "Understand where money flows. Build awareness that forms the foundation for every financial decision." },
  { name: "Plan", icon: "/fincart/pillar-plan-icon.avif", hover: "/fincart/pillar-plan-hover.avif", detail: "Turn aspirations into structured, achievable financial goals. Create a clear path with direction, timelines, and intent." },
  { name: "Invest", icon: "/fincart/pillar-invest-icon.avif", hover: "/fincart/pillar-invest-hover.avif", detail: "Put money to work with purpose. Align investments with goals to build long-term value." },
  { name: "Prosper", icon: "/fincart/pillar-prosper-icon.avif", hover: "/fincart/pillar-prosper-hover.avif", detail: "Track progress as everything comes together over time. Grow with clarity, confidence, and a sense of control." },
];

function followPointer(event: PointerEvent<HTMLElement>) {
  if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
  const row = event.currentTarget;
  const bounds = row.getBoundingClientRect();
  const x = Math.max(115, Math.min(event.clientX - bounds.left, bounds.width - 115));
  const y = Math.max(115, Math.min(event.clientY - bounds.top, bounds.height - 115));
  row.style.setProperty("--pointer-x", `${x}px`);
  row.style.setProperty("--pointer-y", `${y}px`);
}

export function FincartPillars() {
  return <div className="fincart-story__pillars" aria-label="Four pillars of the Fincart product">
    {pillars.map((pillar, index) => <article className="fincart-story__pillar" key={pillar.name} tabIndex={0} onPointerEnter={followPointer} onPointerMove={followPointer}>
      <Image className="fincart-story__pillar-icon" src={pillar.icon} alt="" width={72} height={72} />
      <div className="fincart-story__pillar-copy"><h3>{pillar.name}</h3><p>{pillar.detail}</p></div>
      <span className="fincart-story__pillar-number">0{index + 1}</span>
      <span className="fincart-story__pillar-hover"><Image src={pillar.hover} alt="" fill sizes="220px" /></span>
    </article>)}
  </div>;
}
