"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function TextRevealMotion() {
  const pathname = usePathname();
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window) || typeof Element.prototype.animate !== "function") {
      document.querySelectorAll<HTMLElement>("main [data-reveal-words]").forEach((target) => target.classList.add("is-revealed"));
      return;
    }

    const animations = new Set<Animation>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const target = entry.target as HTMLElement;
        observer.unobserve(target);
        target.classList.add("is-revealed");
        const words = target.querySelectorAll<HTMLElement>(".reveal-word");
        const isHeading = /^H[1-6]$/.test(target.tagName);
        const isContinuous = target.hasAttribute("data-reveal-continuous");
        const stagger = isHeading ? 42 : isContinuous ? 18 : 24;
        const start = Number(target.dataset.revealDelay ?? 0);

        words.forEach((word, index) => {
          const animation = word.animate(
            [
              { opacity: 0, transform: "translateY(.45em)", filter: "blur(3px)" },
              { opacity: 1, transform: "translateY(0)", filter: "blur(0)" },
            ],
            {
              duration: isHeading ? 620 : 480,
              delay: start + (isContinuous ? index * stagger : Math.min(index * stagger, 620)),
              easing: "cubic-bezier(.22,1,.36,1)",
              fill: "both",
            },
          );
          animations.add(animation);
          animation.onfinish = () => {
            animation.cancel();
            animations.delete(animation);
          };
        });
      });
    }, { threshold: .15, rootMargin: "0px 0px -8% 0px" });

    const observeTargets = (root: ParentNode) => {
      if (root instanceof HTMLElement && root.matches("[data-reveal-words]:not(.is-revealed)")) observer.observe(root);
      root.querySelectorAll<HTMLElement>("[data-reveal-words]:not(.is-revealed)").forEach((target) => observer.observe(target));
    };
    const main = Array.from(document.querySelectorAll("main")).find((element) => element.getClientRects().length > 0);
    if (!main) return;
    observeTargets(main);
    const additions = new MutationObserver((records) => {
      records.forEach((record) => record.addedNodes.forEach((node) => {
        if (node instanceof HTMLElement) observeTargets(node);
      }));
    });
    additions.observe(main, { childList: true, subtree: true });
    return () => {
      additions.disconnect();
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
    };
  }, [pathname]);

  return null;
}
