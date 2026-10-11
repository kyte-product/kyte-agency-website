"use client";

import { useEffect, useRef, useState } from "react";

const philosophy = "We make space for research, sharp thinking and the craft that turns an idea into something people can use. The strongest work comes when product, brand and communication decisions share a clear direction.";
const words = philosophy.split(/\s+/);

export function PhilosophyReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeWords, setActiveWords] = useState(5);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const travel = window.innerHeight + rect.height * .3;
        const progress = Math.min(1, Math.max(0, (window.innerHeight * .78 - rect.top) / travel));
        setActiveWords(Math.max(5, Math.ceil(progress * words.length)));
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);

  return <div ref={sectionRef} className="about-philosophy__statement-wrap"><h2 className="about-philosophy__statement" aria-label={philosophy}>{words.map((word, index) => <span aria-hidden="true" className={index < activeWords ? "is-active" : undefined} key={`${word}-${index}`}>{word} </span>)}</h2></div>;
}

export function AboutScrollMotion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const page = document.querySelector<HTMLElement>(".about-page");
    const items = document.querySelectorAll<HTMLElement>(".about-page [data-about-reveal]");
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }, { rootMargin: "0px 0px -8% 0px", threshold: .1 });
    items.forEach((item) => observer.observe(item));
    page?.classList.add("about-motion-ready");
    return () => { observer.disconnect(); page?.classList.remove("about-motion-ready"); };
  }, []);
  return null;
}

export function ImpactNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!ref.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const duration = 1100;
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        setDisplay(Math.round(value * (1 - (1 - t) ** 3)));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: .3 });
    observer.observe(ref.current);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [value]);

  return <span ref={ref} aria-label={`${value}${suffix}`}><span aria-hidden="true">{display}{suffix}</span></span>;
}
