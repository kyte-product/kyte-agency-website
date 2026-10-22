"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { PagePhoto } from "@/data/pagePhotography";
import "./ExpandingPhotoStage.css";

const clamp = (value: number) => Math.min(1, Math.max(0, value));

export function ExpandingPhotoStage({ label = "Digital design showcase", slides }: { label?: string; slides: PagePhoto[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    if (!section || !frame) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frameId = 0;

    const render = () => {
      frameId = 0;
      if (reducedMotion.matches) {
        frame.style.clipPath = "none";
        return;
      }

      const bounds = section.getBoundingClientRect();
      // Expand the crop while the image moves normally through the viewport.
      const expansion = clamp((window.innerHeight * .88 - bounds.top) / (window.innerHeight * .88));
      const eased = 1 - Math.pow(1 - expansion, 3);
      const smallSide = Math.min(500, frame.clientWidth * (frame.clientWidth < 700 ? .76 : .46), frame.clientHeight * .88);
      const insetX = Math.max(0, (frame.clientWidth - smallSide) / 2) * (1 - eased);
      const insetY = Math.max(0, (frame.clientHeight - smallSide) / 2) * (1 - eased);
      const lift = Math.min(frame.clientWidth < 700 ? 200 : 120, insetY * .75) * (1 - eased);
      frame.style.clipPath = `inset(${insetY - lift}px ${insetX}px ${insetY + lift}px ${insetX}px round calc(var(--site-corner-radius, 8px) * ${1 - eased}))`;
    };

    const schedule = () => { if (!frameId) frameId = requestAnimationFrame(render); };
    render();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reducedMotion.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reducedMotion.removeEventListener("change", schedule);
    };
  }, []);

  return <section ref={sectionRef} className="expanding-photo-stage" aria-label={label} data-site-reveal-ignore>
    <div className="expanding-photo-stage__frame-wrap"><div ref={frameRef} className="expanding-photo-stage__frame">
      {slides.slice(0, 1).map((slide) => <div className="expanding-photo-stage__slide" key={slide.image} aria-hidden="true">
        <Image src={slide.image} alt={slide.alt} fill sizes="100vw" unoptimized />
      </div>)}
    </div></div>
  </section>;
}
