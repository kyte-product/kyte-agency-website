"use client";

import { useEffect, useRef } from "react";
import "./ProcessMotion.css";

export function ProcessMotion() {
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videos = [desktopVideoRef.current, mobileVideoRef.current].filter((video): video is HTMLVideoElement => video !== null);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const visible = new Set<HTMLVideoElement>();
    const updatePlayback = () => {
      for (const video of videos) {
        if (visible.has(video) && !reducedMotion.matches) void video.play().catch(() => {});
        else video.pause();
      }
    };
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target as HTMLVideoElement);
        else visible.delete(entry.target as HTMLVideoElement);
      }
      updatePlayback();
    }, { threshold: 0.25 });

    videos.forEach((video) => observer.observe(video));
    reducedMotion.addEventListener("change", updatePlayback);
    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", updatePlayback);
      videos.forEach((video) => video.pause());
    };
  }, []);

  return <div className="process-motion" id="process-motion" role="img" aria-label="An animated double-diamond diagram. Discover and define the problem through research, then develop and deliver a solution through prototyping, testing, and refinement.">
      <div className="process-motion__frame">
        <video className="process-motion__video--desktop" ref={desktopVideoRef} muted loop playsInline preload="metadata" poster="/process/process-diagram-poster.png?v=lines-1" aria-hidden="true">
          <source src="/process/process-diagram.mp4?v=lines-1" type="video/mp4" />
        </video>
        <video className="process-motion__video--mobile" ref={mobileVideoRef} muted loop playsInline preload="metadata" poster="/process/process-diagram-mobile-poster.png?v=lines-1" aria-hidden="true">
          <source src="/process/process-diagram-mobile.mp4?v=lines-1" type="video/mp4" />
        </video>
      </div>
  </div>;
}
