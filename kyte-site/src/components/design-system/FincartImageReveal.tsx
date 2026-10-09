"use client";

import { useEffect } from "react";

export function FincartImageReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;

    const targets = document.querySelectorAll<HTMLElement>(".editorial-detail--fincart [data-fincart-image-reveal]");
    const viewportHeight = window.innerHeight;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        entry.target.classList.remove("is-image-reveal-pending");
      });
    }, { threshold: 0, rootMargin: "0px 0px -8% 0px" });

    targets.forEach((target) => {
      // Keep content already on screen visible during hydration and on back navigation.
      if (target.getBoundingClientRect().top < viewportHeight) return;
      target.classList.add("is-image-reveal-pending");
      observer.observe(target);
    });
    return () => observer.disconnect();
  }, []);

  return null;
}
