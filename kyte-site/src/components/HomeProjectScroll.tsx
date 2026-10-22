"use client";

import { useEffect, useRef } from "react";
import { ImpactCards } from "./ImpactCards";
import "./HomeProjectScroll.css";

const projectPlaceholderCount = 5;

export function HomeProjectScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const track = trackRef.current;
    if (!section || !stage || !track) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compactHeight = window.matchMedia("(max-height: 700px)");
    const nativeRail = () => motion.matches || compactHeight.matches;
    let frame = 0;
    let travel = 0;
    const paint = () => {
      frame = 0;
      const distance = Math.max(0, Math.min(travel, -section.getBoundingClientRect().top));
      track.style.transform = nativeRail() ? "none" : `translate3d(${-distance}px,0,0)`;
    };
    const update = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const measure = () => {
      travel = Math.max(0, track.scrollWidth - stage.clientWidth);
      section.style.height = nativeRail() ? "auto" : `${stage.offsetHeight + travel}px`;
      update();
    };
    const resize = new ResizeObserver(measure);
    resize.observe(stage);
    resize.observe(track);
    window.addEventListener("scroll", update, { passive: true });
    motion.addEventListener("change", measure);
    compactHeight.addEventListener("change", measure);
    measure();
    return () => {
      resize.disconnect();
      window.removeEventListener("scroll", update);
      motion.removeEventListener("change", measure);
      compactHeight.removeEventListener("change", measure);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <section className="home-project-scroll" id="work-preview" ref={sectionRef} aria-labelledby="home-project-scroll-title">
    <div className="home-project-scroll__stage" ref={stageRef} data-site-reveal-ignore>
      <h2 className="home-project-scroll__heading" id="home-project-scroll-title">Selected Work</h2>
      <div className="home-project-scroll__track" ref={trackRef}>
        {Array.from({ length: projectPlaceholderCount }, (_, index) => <div className="home-project-scroll__card" key={index} aria-hidden="true" />)}
        <div className="home-project-scroll__impact" role="group" aria-label="Kyte by the numbers">
          <ImpactCards />
        </div>
      </div>
    </div>
  </section>;
}
