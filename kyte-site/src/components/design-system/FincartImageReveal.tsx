"use client";

import { useEffect } from "react";

export function FincartImageReveal() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!("IntersectionObserver" in window)) return;

    const targets = document.querySelectorAll<HTMLElement>(".editorial-detail--fincart [data-fincart-image-reveal]");
    const videos = document.querySelectorAll<HTMLVideoElement>(".editorial-detail--fincart video[data-fincart-motion]");
    const frames = document.querySelectorAll<HTMLIFrameElement>(".editorial-detail--fincart iframe[data-fincart-motion-frame]");
    const viewportHeight = window.innerHeight;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        entry.target.classList.remove("is-image-reveal-pending");
      });
    }, { threshold: 0, rootMargin: "0px 0px -8% 0px" });

    targets.forEach((target) => {
      if (reducedMotion) return;
      // Keep content already on screen visible during hydration and on back navigation.
      if (target.getBoundingClientRect().top < viewportHeight) return;
      target.classList.add("is-image-reveal-pending");
      observer.observe(target);
    });

    const motionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const target = entry.target;
        if (target instanceof HTMLVideoElement) {
          if (entry.isIntersecting) {
            if (!target.dataset.fincartPlayed) target.currentTime = 0;
            target.dataset.fincartPlayed = "true";
            void target.play().catch(() => undefined);
          } else target.pause();
        }
        if (target instanceof HTMLIFrameElement) {
          target.contentWindow?.postMessage({ type: "kyte-visibility", visible: entry.isIntersecting }, window.location.origin);
        }
      });
    }, { threshold: .35 });

    videos.forEach((video) => {
      if (reducedMotion) {
        video.pause();
        video.currentTime = 0;
      } else motionObserver.observe(video);
    });
    frames.forEach((frame) => {
      const sendVisibility = () => {
        const rect = frame.getBoundingClientRect();
        const visible = !reducedMotion && rect.top < window.innerHeight * .8 && rect.bottom > window.innerHeight * .2;
        frame.contentWindow?.postMessage({ type: "kyte-visibility", visible }, window.location.origin);
      };
      frame.addEventListener("load", sendVisibility, { once: true });
      if (!reducedMotion) motionObserver.observe(frame);
    });

    return () => {
      observer.disconnect();
      motionObserver.disconnect();
    };
  }, []);

  return null;
}
