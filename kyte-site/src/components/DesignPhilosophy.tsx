"use client";

import { useEffect, useRef } from "react";

const philosophy = "We design digital products around the people who use them, giving every screen a clear purpose, every interaction a natural rhythm, and every detail the care it needs to make complex journeys feel clear, useful, and easy to navigate.";

export function DesignPhilosophy() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = section?.querySelector("h2");
    if (!section || !heading) return;

    const characters = Array.from(heading.querySelectorAll<HTMLElement>(".philosophy__char"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const updateReveal = () => {
      frame = 0;
      if (reducedMotion.matches) {
        characters.forEach((character) => { character.style.color = "var(--color-ink)"; });
        return;
      }

      const bounds = heading.getBoundingClientRect();
      const start = window.innerHeight * 0.83;
      const end = window.innerHeight * 0.18;
      const reveal = Math.max(0, Math.min(1, (start - bounds.top) / (start - end)));
      characters.forEach((character, index) => {
        const position = index / Math.max(1, characters.length - 1);
        const amount = Math.max(0, Math.min(1, (reveal - position) * 12 + 0.08));
        const pale = [197, 199, 200];
        const dark = [26, 26, 22];
        const color = pale.map((value, channel) => Math.round(value + (dark[channel] - value) * amount));
        character.style.color = `rgb(${color.join(" ")})`;
      });
    };

    const scheduleReveal = () => {
      if (!frame) frame = window.requestAnimationFrame(updateReveal);
    };

    updateReveal();
    window.addEventListener("scroll", scheduleReveal, { passive: true });
    window.addEventListener("resize", scheduleReveal);
    reducedMotion.addEventListener("change", scheduleReveal);
    return () => {
      window.removeEventListener("scroll", scheduleReveal);
      window.removeEventListener("resize", scheduleReveal);
      reducedMotion.removeEventListener("change", scheduleReveal);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="philosophy" aria-labelledby="philosophy-title" ref={sectionRef}>
      <div className="philosophy__inner">
        <p className="eyebrow">Design Philosophy</p>
        <h2 id="philosophy-title" aria-label={philosophy}>
          {Array.from(philosophy).map((character, index) => (
            character === " " ? " " : <span className="philosophy__char" aria-hidden="true" key={`${character}-${index}`}>{character}</span>
          ))}
        </h2>
      </div>
    </section>
  );
}
