import Link from "next/link";
import type { IndustryMetric } from "@/data/industrySnapshots";
import { ChevronRight } from "lucide-react";
import { DotPattern } from "./ui/DotPattern";
import "./HomeProjectScroll.css";
import "./ImpactCards.css";

export function ImpactCards({ items, patternSeed = "impact-cards" }: { items?: IndustryMetric[]; patternSeed?: string }) {
  if (items) return <div className="impact-cards-row" role="group" aria-label="Industry statistics" tabIndex={0}>
    {items.map((item, index) => <article key={item.label} className={`home-project-scroll__stat home-project-scroll__stat--${["projects", "clients", "views", "impressions"][index % 4]}`}>
      <div className="home-project-scroll__stat-copy"><h3>{item.label}</h3><strong>{item.value}</strong><p>{item.description}</p></div>
      <DotPattern shape={(["ribbon", "orbit", "field", "graph"] as const)[index % 4]} tone={index === 1 ? "white" : index === 2 ? "charcoal" : "brand"} seed={`${patternSeed}:${item.label}`} className="home-project-scroll__pattern" motifSlot={index} />
    </article>)}
  </div>;
  const cards = <>
          <article className="home-project-scroll__stat home-project-scroll__stat--projects">
            <div className="home-project-scroll__stat-copy">
              <h3>Projects</h3><strong>100+</strong>
              <p>Digital products, websites and brands brought to life.</p>
              <Link className="kyte-button home-project-scroll__impact-link" href="/work">View All Projects <ChevronRight size={16} aria-hidden="true" /></Link>
            </div>
            <DotPattern shape="ribbon" className="home-project-scroll__pattern" />
          </article>
          <article className="home-project-scroll__stat home-project-scroll__stat--clients">
            <div className="home-project-scroll__stat-copy"><h3>Clients</h3><strong>50+</strong><p>Teams we’ve partnered with.</p></div>
            <DotPattern shape="orbit" tone="white" className="home-project-scroll__pattern" />
          </article>
          <article className="home-project-scroll__stat home-project-scroll__stat--views">
            <div className="home-project-scroll__stat-copy">
              <h3>Views in one year</h3>
              <div className="home-project-scroll__stat-metric-row"><strong>3M+</strong><p>Stories, content and motion<br />that reach people.</p></div>
            </div>
            <DotPattern shape="field" tone="charcoal" className="home-project-scroll__pattern" />
          </article>
          <article className="home-project-scroll__stat home-project-scroll__stat--impressions">
            <div className="home-project-scroll__stat-copy"><h3>Impressions</h3><strong>200M+</strong><p>Campaign reach across channels.</p></div>
            <DotPattern shape="graph" className="home-project-scroll__pattern" />
          </article>
  </>;
  return cards;
}
