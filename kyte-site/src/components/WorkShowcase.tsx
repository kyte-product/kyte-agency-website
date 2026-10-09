"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, LayoutGrid, List } from "lucide-react";
import { useState } from "react";
import { RevealWords } from "./RevealWords";
import "./WorkShowcase.css";

const projects = [
  // Preview-only dates requested for layout review. Replace with verified project timelines before publishing.
  {
    name: "Fincart.",
    description: "A connected mobile experience for financial planning, investing, and tracking progress.",
    period: "",
    category: "Mobile app · Product design",
    image: "/fincart/work-cover.png",
    alt: "Two Fincart app screens showing a financial overview and a goal roadmap",
    href: "/work/fincart",
  },
  {
    name: "SpicyBayer.",
    description: "A warm website for a Bavarian, Indian and Tamil fusion restaurant.",
    period: "2025",
    category: "Restaurant · Website design",
    image: "/kyte-work/spicy-bayer.webp",
    alt: "SpicyBayer restaurant website displayed on a desktop monitor",
    href: "/work",
  },
  {
    name: "Arka Inventory.",
    description: "A refreshed website for an inventory management platform.",
    period: "2025–2026",
    category: "Inventory management · Website design",
    image: "https://cdn.sanity.io/images/50pibtgs/production/01099437810383d1335759cf2a3324e451f08385-1672x941.png",
    alt: "Arka Inventory website displayed on a desktop monitor against a pink background",
    href: "/work",
  },
  {
    name: "Maya.",
    description: "An explainer that introduces an AI-powered hiring platform.",
    period: "2026",
    category: "AI hiring · Explainer video",
    image: "/kyte-work/maya.webp",
    alt: "Orange Maya explainer artwork with illustrated characters",
    href: "/work",
  },
] as const;

export function WorkShowcase() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [hasChangedView, setHasChangedView] = useState(false);

  function changeView(nextView: "grid" | "list") {
    if (nextView === view) return;
    setView(nextView);
    setHasChangedView(true);
  }

  return (
    <section className="work-showcase" id="work-preview" aria-labelledby="work-title">
      <div className="work-showcase__inner">
        <div className="work-showcase__heading">
          <div>
            <p className="work-showcase__eyebrow" data-reveal-words><RevealWords text="Case studies" /></p>
            <h2 id="work-title" data-reveal-words data-reveal-delay="90"><RevealWords text="Selected work" /></h2>
          </div>
          <div className="work-showcase__view-toggle" role="group" aria-label="Project layout">
            <button type="button" aria-label="List view" aria-pressed={view === "list"} onClick={() => changeView("list")}>
              <List size={18} strokeWidth={1.8} aria-hidden="true" />
            </button>
            <button type="button" aria-label="Grid view" aria-pressed={view === "grid"} onClick={() => changeView("grid")}>
              <LayoutGrid size={18} strokeWidth={1.8} aria-hidden="true" />
            </button>
          </div>
        </div>
        <div key={view} className={`work-showcase__list work-showcase__list--${view}${hasChangedView ? " work-showcase__list--entering" : ""}`}>
          {projects.map((project) => (
            <article className="work-project" key={project.name}>
              <Link className="work-project__visual" href={project.href} aria-label={`Explore ${project.name} project`}>
                <Image src={project.image} alt={project.alt} fill sizes="(max-width: 760px) 90vw, 47vw" unoptimized={project.image.startsWith("https://")} />
              </Link>
              <Link className="work-project__summary" href={project.href} aria-label={`View ${project.name} project`}><strong>{project.name}</strong> <span>{project.description}</span></Link>
              <div className="work-project__details"><span className="work-project__period">{project.period || "\u00a0"}</span><span className="work-project__separator" aria-hidden="true">·</span><span className="work-project__category">{project.category}</span></div>
            </article>
          ))}
        </div>
        <Link className="work-showcase__all kyte-button" href="/work">All Case studies <ChevronRight size={16} aria-hidden="true" /></Link>
      </div>
    </section>
  );
}
