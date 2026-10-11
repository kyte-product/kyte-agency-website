"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function SiteSmoothScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;
    const lenis = new Lenis({
      autoRaf: true,
      autoToggle: true,
      anchors: true,
      allowNestedScroll: true,
      stopInertiaOnNavigate: true,
      lerp: 0.1,
      prevent: (node) => Boolean(node.closest("dialog")),
    });
    return () => lenis.destroy();
  }, []);
  return null;
}
