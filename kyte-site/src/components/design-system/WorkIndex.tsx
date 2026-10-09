"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { WorkProject } from "@/lib/sanity";
import "../WorkShowcase.css";

const FILTERS = ["Website Design", "Brand Identity", "Content Marketing", "Media Production"] as const;
type WorkFilter = (typeof FILTERS)[number];

function categoriesFor(project: WorkProject): WorkFilter[] {
  const source = [project.cardService, project.role, project.projectType, project.title, project.slug]
    .filter(Boolean).join(" ").toLowerCase();
  const inferred = [
    /web|shopify|ecom|app design/.test(source) && "Website Design",
    /brand|identity|packaging/.test(source) && "Brand Identity",
    /social|content|marketing/.test(source) && "Content Marketing",
    /video|production|explainer/.test(source) && "Media Production",
  ].filter((category): category is WorkFilter => Boolean(category));
  const explicit = (project.filterCategories || []).filter(
    (category): category is WorkFilter => FILTERS.includes(category as WorkFilter),
  );
  return explicit.length ? explicit : inferred;
}

export function WorkIndex({ projects }: { projects: WorkProject[] }) {
  const [activeFilter, setActiveFilter] = useState<WorkFilter | "All">("All");
  const categories = useMemo(
    () => FILTERS.filter((category) => projects.some((project) => categoriesFor(project).includes(category))),
    [projects],
  );
  const visibleProjects = activeFilter === "All"
    ? projects
    : projects.filter((project) => categoriesFor(project).includes(activeFilter));

  if (!projects.length) return <p className="work-index__empty">Case studies will appear here when they are published.</p>;

  return <>
    <div className="work-index__filters" role="group" aria-label="Filter case studies by service">
      {(["All", ...categories] as const).map((category) => <button
        key={category}
        type="button"
        aria-pressed={activeFilter === category}
        onClick={() => setActiveFilter(category)}
      >{category}</button>)}
    </div>
    <div className="work-showcase__list work-showcase__list--grid work-index__projects">{visibleProjects.map((project) => {
      const href = `/work/${encodeURIComponent(project.slug)}`;
      const name = project.client || project.title;
      const detail = project.cardService || project.role || project.projectType || "Case study";
      const period = project.period || "Date pending";
      return <article className="work-project" key={project._id}>
        <Link className="work-project__visual" href={href} aria-label={`Explore ${name} project`} data-nav-theme="dark">
          {project.cover.url && <Image src={project.cover.url} alt={project.cover.alt || ""} fill unoptimized sizes="(max-width: 760px) 90vw, 47vw" />}
        </Link>
        <Link className="work-project__summary" href={href} aria-label={`View ${name} project`}><strong>{name}</strong>{project.summary && <> <span>{project.summary}</span></>}</Link>
        <div className="work-project__details"><span className="work-project__period">{period}</span><span className="work-project__separator" aria-hidden="true">·</span><span className="work-project__category">{detail}</span></div>
      </article>;
    })}</div>
  </>;
}
