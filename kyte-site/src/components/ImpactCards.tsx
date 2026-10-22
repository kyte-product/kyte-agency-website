import Link from "next/link";
import type { IndustryMetric } from "@/data/industrySnapshots";
import { kyteImpactMetrics } from "@/data/kyteImpact";
import { ChevronRight } from "lucide-react";
import { DotPattern } from "./ui/DotPattern";
import "./HomeProjectScroll.css";
import "./ImpactCards.css";

export function ImpactCards({ items, patternSeed = "impact-cards", label = "Industry statistics" }: { items?: IndustryMetric[]; patternSeed?: string; label?: string }) {
  if (items) return <div className="impact-cards-row" role="group" aria-label={label} tabIndex={0}>
    {items.map((item, index) => <article key={item.label} className={`home-project-scroll__stat home-project-scroll__stat--${["projects", "clients", "views", "impressions"][index % 4]}`}>
      <div className="home-project-scroll__stat-copy"><h3>{item.label}</h3><strong>{item.value}</strong><p>{item.description}</p></div>
      <DotPattern shape={(["ribbon", "orbit", "field", "graph"] as const)[index % 4]} tone={index === 1 ? "white" : index === 2 ? "charcoal" : "brand"} seed={`${patternSeed}:${item.label}`} className="home-project-scroll__pattern" motifSlot={index} />
    </article>)}
  </div>;
  const cards = <>
          <article className="home-project-scroll__stat home-project-scroll__stat--projects">
            <div className="home-project-scroll__stat-copy">
              <h3>{kyteImpactMetrics[0].label}</h3><strong>{kyteImpactMetrics[0].value}</strong>
              <p>{kyteImpactMetrics[0].description}</p>
              <Link className="kyte-button home-project-scroll__impact-link" href="/work">View All Projects <ChevronRight size={16} aria-hidden="true" /></Link>
            </div>
            <DotPattern shape="ribbon" className="home-project-scroll__pattern" />
          </article>
          <article className="home-project-scroll__stat home-project-scroll__stat--clients">
            <div className="home-project-scroll__stat-copy"><h3>{kyteImpactMetrics[1].label}</h3><strong>{kyteImpactMetrics[1].value}</strong><p>{kyteImpactMetrics[1].description}</p></div>
            <DotPattern shape="orbit" tone="white" className="home-project-scroll__pattern" />
          </article>
          <article className="home-project-scroll__stat home-project-scroll__stat--views">
            <div className="home-project-scroll__stat-copy">
              <h3>{kyteImpactMetrics[2].label}</h3>
              <div className="home-project-scroll__stat-metric-row"><strong>{kyteImpactMetrics[2].value}</strong><p>Stories, content and motion<br />that reach people.</p></div>
            </div>
            <DotPattern shape="field" tone="charcoal" className="home-project-scroll__pattern" />
          </article>
          <article className="home-project-scroll__stat home-project-scroll__stat--impressions">
            <div className="home-project-scroll__stat-copy"><h3>{kyteImpactMetrics[3].label}</h3><strong>{kyteImpactMetrics[3].value}</strong><p>{kyteImpactMetrics[3].description}</p></div>
            <DotPattern shape="graph" className="home-project-scroll__pattern" />
          </article>
  </>;
  return cards;
}
