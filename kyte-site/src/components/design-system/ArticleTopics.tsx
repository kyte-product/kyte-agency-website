"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Section = { id: string; title: string };

export function ArticleTopics({ sections }: { sections: Section[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const midpoint = window.innerHeight / 2;
      let current: string | null = null;
      for (const section of sections) {
        const heading = document.getElementById(section.id);
        if (heading && heading.getBoundingClientRect().top <= midpoint) current = section.id;
        else break;
      }
      setActiveId((previous) => previous === current ? previous : current);
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [sections]);

  return <aside className="editorial-detail__topics"><nav aria-label="Article topics">
    <div className="editorial-detail__topics-cta">
      <span className="editorial-detail__topics-cta-art" aria-hidden="true"><Image src="/kyte-motion-mark.svg" alt="" width={220} height={220} unoptimized /></span>
      <div className="editorial-detail__topics-cta-content"><strong>Have a project in mind?</strong><Link className="kyte-button" href="/contact">Contact Us <ChevronRight size={16} aria-hidden="true" /></Link></div>
    </div>
    <ol>{sections.map((section) => <li key={section.id}><a href={`#${section.id}`} aria-current={activeId === section.id ? "location" : undefined}>{section.title}</a></li>)}</ol>
  </nav></aside>;
}
