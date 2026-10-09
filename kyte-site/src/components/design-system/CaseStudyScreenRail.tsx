"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { CaseStudyPhone } from "./CaseStudyPhone";

export type CaseStudyScreen = { src: string; alt: string };

export function CaseStudyScreenRail({ label, screens }: { label: string; screens: CaseStudyScreen[] }) {
  const track = useRef<HTMLDivElement>(null);
  const move = (direction: number) => {
    const current = track.current;
    if (!current) return;
    const card = current.querySelector<HTMLElement>(".case-study-rail__item");
    current.scrollBy({ left: direction * ((card?.offsetWidth ?? 280) + 20), behavior: "smooth" });
  };

  return <section className="case-study-rail" aria-label={label}>
    <div className="case-study-rail__controls">
      <button type="button" aria-label={`Scroll ${label} left`} onClick={() => move(-1)}><ChevronLeft size={20} /></button>
      <button type="button" aria-label={`Scroll ${label} right`} onClick={() => move(1)}><ChevronRight size={20} /></button>
    </div>
    <div className="case-study-rail__stage" data-fincart-image-reveal>
      <div className="case-study-rail__track" ref={track} tabIndex={0} role="region" aria-label={`${label} screens, scroll horizontally`}>
        {screens.map((screen) => <figure className="case-study-rail__item" key={screen.src}>
          <CaseStudyPhone src={screen.src} alt={screen.alt} />
        </figure>)}
      </div>
    </div>
  </section>;
}
