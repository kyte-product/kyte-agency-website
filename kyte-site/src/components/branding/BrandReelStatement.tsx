"use client";

import { useEffect, useRef } from "react";
import { EditorialGlyph } from "@/components/branding/EditorialGlyph";
import "./BrandReelStatement.css";

const statement = "Design on the web isn't static anymore. Today's brands need energy, personality and meaning. We bring together strategy, design and storytelling to build digital experiences that grab attention, move fast and make people feel.";
const statementWords = statement.split(" ");

export function BrandReelStatement() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let isNearViewport = false;
    let smoothProgress = 0;
    let previousTime = 0;

    const update = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const stageBounds = section.getBoundingClientRect();
      const scrollDistance = viewportHeight * 1.25;
      const targetProgress = reducedMotion.matches
        ? 1
        : Math.min(Math.max(-stageBounds.top / scrollDistance, 0), 1);
      const now = performance.now();
      const dt = previousTime ? Math.min(64, now - previousTime) : 16;
      previousTime = now;
      smoothProgress = reducedMotion.matches ? targetProgress : smoothProgress + (targetProgress - smoothProgress) * (1 - Math.exp(-dt / 110));
      if (Math.abs(targetProgress - smoothProgress) < .00001) smoothProgress = targetProgress;
      const progress = smoothProgress;
      const gutter = Math.max(22, viewportWidth * 0.022);
      const restingWidth = Math.min(viewportWidth * (viewportWidth <= 760 ? 0.38 : 0.24), viewportWidth <= 760 ? 160 : 430);
      // Enlarge only up and right: keep the existing resting bottom edge.
      const endWidth = restingWidth * 1.002;
      const endHeight = endWidth * (9 / 16);
      const baselineCorrection = (endWidth - restingWidth) * 9 / 32;

      const startWidth = viewportWidth - gutter * 2;
      const startHeight = startWidth * 9 / 16;
      const startTop = Math.max(viewportHeight * 0.26, viewportHeight / 2 - startHeight / 2 + viewportHeight * 0.05);
      const alignmentLift = viewportWidth <= 760 ? 6 : 12;
      const centerY = viewportHeight / 2;
      const centerTop = centerY - startHeight / 2;
      const scaleStart = Math.min(Math.max((startTop + startHeight / 2 - centerY) / scrollDistance, 0), 0.95);
      const approachProgress = scaleStart > 0 ? Math.min(progress / scaleStart, 1) : 1;
      const approachEase = approachProgress * approachProgress * (3 - 2 * approachProgress);
      const scaleProgress = Math.min(Math.max((progress - scaleStart) / (1 - scaleStart), 0), 1);
      const easedProgress = scaleProgress * scaleProgress * (3 - 2 * scaleProgress);
      const scale = 1 + (endWidth / startWidth - 1) * easedProgress;
      const x = gutter;
      const visibleTop = progress < scaleStart
        ? startTop + (centerTop - startTop) * approachEase
        : centerY - startHeight * scale / 2 - (alignmentLift + baselineCorrection) * easedProgress;
      const y = scrollDistance * targetProgress + visibleTop;
      const endTop = scrollDistance + centerY - endHeight / 2 - baselineCorrection;

      section.style.setProperty("--reel-x", `${x}px`);
      section.style.setProperty("--reel-y", `${y}px`);
      section.style.setProperty("--reel-base-width", `${startWidth}px`);
      section.style.setProperty("--reel-base-height", `${startHeight}px`);
      section.style.setProperty("--reel-scale", `${scale}`);
      section.style.setProperty("--final-width", `${endWidth}px`);
      section.style.setProperty("--final-height", `${endHeight}px`);
      section.style.setProperty("--final-y", `${endTop}px`);
      section.style.setProperty("--reel-final-y", `${endTop - alignmentLift}px`);
    };

    const tick = () => {
      update();
      if (isNearViewport) frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(([entry]) => {
      isNearViewport = entry.isIntersecting;
      cancelAnimationFrame(frame);
      if (isNearViewport) frame = requestAnimationFrame(tick);
    }, { rootMargin: "100% 0px" });
    observer.observe(section);

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    reducedMotion.addEventListener("change", update);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      reducedMotion.removeEventListener("change", update);
    };
  }, []);

  return <section ref={sectionRef} className="brand-reel-stage" aria-label="Kyte showreel and introduction" data-site-reveal-ignore data-nav-theme="dark">
    <div className="brand-reel-stage__canvas">
      <div className="brand-reel-stage__topline">
          <p>Strategy <EditorialGlyph name="brain" /> Design,<br />Performance <EditorialGlyph name="coordinates" /></p>
        <p>We are a branding studio<br />that helps businesses <EditorialGlyph name="flower" /></p>
      </div>
      <div className="brand-reel-stage__frame">
        <video src="/kyte-showreel.mp4" autoPlay muted loop playsInline preload="metadata" aria-label="Kyte Agency showreel" />
      </div>
      <div className="brand-reel-stage__intro">
        <p>[ ! ] Be the brand they never stop talking about</p>
      </div>
      <p className="brand-reel-stage__statement" aria-label={statement}>
        {statementWords.map((word, index) => <span key={`${word}-${index}`}>{word}{index < statementWords.length - 1 ? " " : ""}</span>)}
      </p>
    </div>
  </section>;
}
