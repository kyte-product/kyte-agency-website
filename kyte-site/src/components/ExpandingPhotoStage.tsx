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

    const layers = Array.from(frame.querySelectorAll<HTMLElement>(".expanding-photo-stage__slide"));
    const wipe = frame.querySelector<HTMLElement>(".expanding-photo-stage__wipe");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frameId = 0;

    const render = () => {
      frameId = 0;
      if (reducedMotion.matches) {
        frame.style.clipPath = "none";
        layers.forEach((layer, index) => {
          layer.style.transition = "none";
          layer.style.opacity = index === 0 ? "1" : "0";
          layer.style.clipPath = index === 0 ? "none" : "inset(0 100% 0 0)";
        });
        wipe?.getAnimations().forEach((animation) => animation.cancel());
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
      frame.style.clipPath = `inset(${insetY - lift}px ${insetX}px ${insetY + lift}px ${insetX}px round ${8 * (1 - eased)}px)`;
    };

    const schedule = () => { if (!frameId) frameId = requestAnimationFrame(render); };
    let active = 0;
    let busy = false;
    let disposed = false;
    const advance = async () => {
      if (busy || reducedMotion.matches || document.hidden || !wipe) return;
      busy = true;
      const incomingIndex = (active + 1) % layers.length;
      const incoming = layers[incomingIndex];
      incoming.style.transition = "none";
      const timing: KeyframeAnimationOptions = { duration: 600, easing: "cubic-bezier(.7, 0, 0, 1)", fill: "forwards" };
      try {
        const cover = wipe.animate([{ transform: "translateX(-101%)" }, { transform: "translateX(0)" }], timing);
        await cover.finished;
        wipe.style.transform = "translateX(0)";
        cover.cancel();
        if (disposed) return;
        layers[active].style.opacity = "0";
        incoming.style.clipPath = "none";
        incoming.style.opacity = "1";
        active = incomingIndex;
        const reveal = wipe.animate([{ transform: "translateX(0)" }, { transform: "translateX(101%)" }], timing);
        await reveal.finished;
        wipe.style.transform = "translateX(-101%)";
        reveal.cancel();
      } catch {
        wipe.style.transform = "translateX(-101%)";
      } finally {
        busy = false;
      }
    };

    render();
    const intervalId = window.setInterval(advance, 4600);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reducedMotion.addEventListener("change", schedule);
    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      window.clearInterval(intervalId);
      wipe?.getAnimations().forEach((animation) => animation.cancel());
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reducedMotion.removeEventListener("change", schedule);
    };
  }, []);

  return <section ref={sectionRef} className="expanding-photo-stage" aria-label={label} data-site-reveal-ignore>
    <div className="expanding-photo-stage__frame-wrap"><div ref={frameRef} className="expanding-photo-stage__frame">
      {slides.map((slide, index) => <div className="expanding-photo-stage__slide" key={slide.image} style={index ? { clipPath: "inset(0 100% 0 0)" } : undefined} aria-hidden="true">
        <Image src={slide.image} alt={slide.alt} fill sizes="100vw" unoptimized />
      </div>)}
      <div className="expanding-photo-stage__wipe" aria-hidden="true" />
    </div></div>
  </section>;
}
