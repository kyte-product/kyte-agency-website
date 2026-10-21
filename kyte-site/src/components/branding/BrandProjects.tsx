"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { workShowcaseProjects } from "@/components/WorkShowcase";
import "./BrandProjects.css";

const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function ScrambleName({ name, active }: { name: string; active: boolean }) {
  const [display, setDisplay] = useState(name);

  useEffect(() => {
    if (!active) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let frame = 0;
    const totalFrames = 16;
    const timer = window.setInterval(() => {
      frame += 1;
      const resolved = Math.floor((frame / totalFrames) * name.length);
      setDisplay(name.split("").map((character, index) => {
        if (character === " " || character === ".") return character;
        if (index < resolved || frame >= totalFrames) return character;
        return glyphs[Math.floor(Math.random() * glyphs.length)];
      }).join(""));

      if (frame >= totalFrames) window.clearInterval(timer);
    }, 32);

    return () => window.clearInterval(timer);
  }, [active, name]);

  return <span aria-hidden="true">{active ? display : name}</span>;
}

export function BrandProjects() {
  return <section className="brand-projects" id="branding-projects" aria-labelledby="brand-projects-title">
    <div className="brand-projects__inner">
      <header className="brand-projects__heading">
        <h2 id="brand-projects-title">Selected work</h2>
      </header>
      <div className="brand-projects__list">
        {workShowcaseProjects.map((project) => (
          <ProjectRow key={project.name} project={project} />
        ))}
      </div>
      <Link className="brand-projects__all kyte-tertiary" href="/work">View all work</Link>
    </div>
  </section>;
}

function ProjectRow({ project }: { project: (typeof workShowcaseProjects)[number] }) {
  const [active, setActive] = useState(false);
  const readableName = project.name.replace(/\.$/, "");

  return <article className={`brand-project${active ? " is-active" : ""}`}>
    <Link
      className="brand-project__link"
      href={project.href}
      onPointerEnter={() => setActive(true)}
      onPointerLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      aria-label={`View ${readableName}: ${project.description}`}
    >
      <span className="brand-project__name"><span className="brand-project__sr-only">{readableName}</span><ScrambleName name={readableName} active={active} /></span>
      <span className="brand-project__description">{project.description}</span>
      <span className="brand-project__preview" aria-hidden="true">
        <Image src={project.image} alt="" fill sizes="(max-width: 760px) 78vw, 19vw" unoptimized={project.image.startsWith("https://")} />
      </span>
      <span className="brand-project__category">{project.category.split(" · ").map((part) => <span key={part}>{part}</span>)}</span>
      <span className="brand-project__action kyte-tertiary">View case study</span>
    </Link>
  </article>;
}
