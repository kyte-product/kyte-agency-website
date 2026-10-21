"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import "./BrandProcessSection.css";

const stages = [
  { number: "01", name: "Discover", text: "We listen, research and find the opportunity that matters.", diagram: "left" },
  { number: "02", name: "Define", text: "We turn what we learn into a clear direction for the work.", diagram: "right" },
  { number: "03", name: "Develop", text: "We explore, shape and test ideas with your team.", diagram: "left" },
  { number: "04", name: "Deliver", text: "We bring the chosen idea to life and prepare it to grow.", diagram: "right" },
];

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const stageRevealStagger = 0.16;
const stageRevealDuration = 0.38;

export function BrandProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sticky = section.querySelector<HTMLElement>(".brand-process__sticky");
    if (!sticky) return;
    let frame = 0;
    const updateProgress = () => {
      frame = 0;
      if (reduceMotion.matches) {
        setProgress(1);
        return;
      }
      const stickyTop = Number.parseFloat(window.getComputedStyle(sticky).top) || 72;
      const stickyHeight = Math.max(1, sticky.offsetHeight);
      const headingHeight = section.querySelector(".brand-process__header")?.getBoundingClientRect().height ?? 0;
      const travel = Math.max(1, section.offsetHeight - headingHeight - stickyHeight);
      const stickyStart = stickyTop - headingHeight;
      setProgress(clamp((stickyStart - section.getBoundingClientRect().top) / travel));
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });
    reduceMotion.addEventListener("change", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      reduceMotion.removeEventListener("change", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const activeStage = Math.min(stages.length - 1, Math.floor(progress / stageRevealStagger));
  return <section ref={sectionRef} className="brand-process" aria-labelledby="brand-process-title" style={{ "--process-progress": progress } as CSSProperties}>
    <header className="brand-process__header">
      <h2 id="brand-process-title">Our process</h2>
    </header>
    <div className="brand-process__sticky">
      <div className="brand-process__cards">
        {stages.map((stage, index) => {
          const reveal = clamp((progress - index * stageRevealStagger) / stageRevealDuration);
          return <article
            className={`brand-process__card${index === activeStage ? " is-active" : ""}${reveal >= 0.99 ? " is-revealed" : ""}`}
            key={stage.number}
            style={{ "--card-reveal": reveal } as CSSProperties}
            aria-current={index === activeStage ? "step" : undefined}
          >
            <span className="brand-process__number">{stage.number}</span>
            <svg className="brand-process__card-diagram brand-process__card-diagram--desktop" viewBox="0 0 250 300" preserveAspectRatio="none" aria-hidden="true">
              {stage.diagram === "left"
                ? <path d="M0 150 250 8 M0 150 250 292" />
                : <path d="M0 8 250 150 M250 150 0 292" />}
            </svg>
            <svg className="brand-process__card-diagram brand-process__card-diagram--mobile" viewBox="0 0 1000 360" preserveAspectRatio="none" aria-hidden="true">
              {stage.diagram === "left"
                ? <path d="M0 180 500 14 M0 180 500 346" />
                : <path d="M500 14 1000 180 M1000 180 500 346" />}
            </svg>
            <div className="brand-process__copy">
              <h3>{stage.name}</h3>
              <p>{stage.text}</p>
            </div>
          </article>;
        })}
      </div>
    </div>
  </section>;
}
