"use client";

import Image from "next/image";
import Link from "next/link";
import { LayoutGrid, List } from "lucide-react";
import { useState } from "react";
import "./WorkShowcase.css";

const projects = [
  // Preview-only dates requested for layout review. Replace with verified project timelines before publishing.
  {
    name: "Collectbee.",
    logo: "/kyte-work/collectbee-icon.png",
    description: "A product-led website that makes an AI accounts receivable platform easier to understand.",
    period: "2024–2025",
    category: "AI accounts receivable · Website design",
    image: "/kyte-work/collectbee.png",
    alt: "Collectbee accounts receivable platform shown on a tablet",
    href: "/work/collectbee",
  },
  {
    name: "SpicyBayer.",
    logo: "/kyte-work/spicy-bayer-icon.png",
    description: "A warm website for a Bavarian, Indian and Tamil fusion restaurant.",
    period: "2025",
    category: "Restaurant · Website design",
    image: "/kyte-work/spicy-bayer.webp",
    alt: "SpicyBayer restaurant website displayed on a desktop monitor",
    href: "/work",
  },
  {
    name: "Arka Inventory.",
    logo: "/kyte-work/arka-inventory-icon.png",
    description: "A refreshed website for an inventory management platform.",
    period: "2025–2026",
    category: "Inventory management · Website design",
    image: "https://cdn.sanity.io/images/50pibtgs/production/01099437810383d1335759cf2a3324e451f08385-1672x941.png",
    alt: "Arka Inventory website displayed on a desktop monitor against a pink background",
    href: "/work",
  },
  {
    name: "Maya.",
    logo: "/kyte-work/maya-icon.png",
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
            <p className="work-showcase__eyebrow">Case studies</p>
            <h2 id="work-title">Selected work</h2>
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
              <span className="work-project__mark" aria-hidden="true"><Image src={project.logo} alt="" width={52} height={52} /></span>
              <Link className="work-project__summary" href={project.href} aria-label={`View ${project.name} project`}><strong>{project.name}</strong> <span>{project.description}</span></Link>
              <div className="work-project__details"><span className="work-project__period">{project.period || "\u00a0"}</span><span className="work-project__separator" aria-hidden="true">·</span><span className="work-project__category">{project.category}</span></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
