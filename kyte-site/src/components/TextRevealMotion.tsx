"use client";

import { useEffect } from "react";

export function TextRevealMotion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window) || typeof Element.prototype.animate !== "function") {
      document.querySelectorAll<HTMLElement>("main [data-reveal-words]").forEach((target) => target.classList.add("is-revealed"));
      return;
    }

    const targets = document.querySelectorAll<HTMLElement>("main [data-reveal-words]");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const target = entry.target as HTMLElement;
        observer.unobserve(target);
        target.classList.add("is-revealed");
        const words = target.querySelectorAll<HTMLElement>(".reveal-word");
        const isHeading = /^H[1-6]$/.test(target.tagName);
        const stagger = isHeading ? 42 : 24;
        const start = Number(target.dataset.revealDelay ?? 0);

        words.forEach((word, index) => {
          const animation = word.animate(
            [
              { opacity: 0, transform: "translateY(.45em)", filter: "blur(3px)" },
              { opacity: 1, transform: "translateY(0)", filter: "blur(0)" },
            ],
            {
              duration: isHeading ? 620 : 480,
              delay: start + Math.min(index * stagger, 620),
              easing: "cubic-bezier(.22,1,.36,1)",
              fill: "both",
            },
          );
          animation.onfinish = () => animation.cancel();
        });
      });
    }, { threshold: .15, rootMargin: "0px 0px -8% 0px" });

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return null;
}
