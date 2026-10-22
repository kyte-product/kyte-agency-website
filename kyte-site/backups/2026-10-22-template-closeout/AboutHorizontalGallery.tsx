"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const moments = [
  { src: "/about-architecture/glass-facade.avif", alt: "Sunlit glass facade of a modern building" },
  { src: "/about-architecture/glass-concrete-theatre.jpg", alt: "Glass and concrete theatre exterior" },
  { src: "/about-architecture/spiral-staircase.avif", alt: "Spiral staircase in a minimal interior" },
  { src: "/about-architecture/reflective-glass.jpg", alt: "Geometric reflections in a glass building" },
  { src: "/about-architecture/concrete-facade.avif", alt: "Geometric concrete building facade" },
  { src: "/about-architecture/greenery-facade.jpg", alt: "Modern building facade among green trees" },
] as const;

export function AboutHorizontalGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!section || !viewport || !track) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const narrow = window.matchMedia("(max-width: 700px)");
    let frame = 0;
    let distance = 0;

    const draw = () => {
      frame = 0;
      if (motion.matches || narrow.matches) {
        track.style.transform = "";
        return;
      }
      const bounds = section.getBoundingClientRect();
      const start = window.innerHeight * 0.72;
      const end = -window.innerHeight * 0.12;
      const progress = Math.min(1, Math.max(0, (start - bounds.top) / (start - end)));
      track.style.transform = `translate3d(${-distance * progress}px, 0, 0)`;
    };
    const measure = () => {
      track.style.transform = "";
      distance = Math.max(0, track.scrollWidth - viewport.clientWidth);
      draw();
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(draw); };
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    observer.observe(viewport);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure);
    motion.addEventListener("change", measure);
    narrow.addEventListener("change", measure);
    measure();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      motion.removeEventListener("change", measure);
      narrow.removeEventListener("change", measure);
      track.style.transform = "";
    };
  }, []);

  return <div ref={sectionRef} className="about-gallery" aria-label="Architectural image gallery" data-site-reveal-ignore>
    <div className="about-gallery__sticky">
      <div ref={viewportRef} className="about-gallery__viewport" tabIndex={0} aria-label="Architectural image gallery">
        <ul ref={trackRef} className="about-gallery__track">
          {moments.map((moment, index) => <li className={`about-gallery__item about-gallery__item--${index + 1}`} key={moment.src}><Image src={moment.src} alt={moment.alt} fill sizes="(max-width: 700px) 80vw, 50vw" /></li>)}
        </ul>
      </div>
    </div>
  </div>;
}
