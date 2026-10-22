"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { DotPattern } from "./ui/DotPattern";
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
        </div>
      </div>
    </div>
  </section>;
}
