"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const selector = "h1, h2, h3, h4, h5, h6, p, blockquote, figcaption, dt, dd, .work-project__summary, .work-project__details, img, video";
const customMotion = "[data-reveal-words], [data-about-reveal], [data-fincart-image-reveal], .about-philosophy__statement, [data-site-reveal-ignore]";

export function SiteRevealMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const main = document.querySelector("main");
    if (!main || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !('IntersectionObserver' in window) || typeof Element.prototype.animate !== "function") return;

    const seen = new WeakSet<Element>();
    const pending = new Map<HTMLElement, Animation>();
    const animations = new Set<Animation>();
    const reveal = (target: HTMLElement) => {
      observer.unobserve(target);
      pending.get(target)?.cancel();
      pending.delete(target);
      const media = target.matches("img, video");
      const animation = target.animate(
        media
          ? [{ opacity: 0, filter: "blur(6px)" }, { opacity: 1, filter: "blur(0)" }]
          : [{ opacity: 0, transform: "translateY(.4em)", filter: "blur(3px)" }, { opacity: 1, transform: "translateY(0)", filter: "blur(0)" }],
        { duration: media ? 650 : 540, easing: "cubic-bezier(.22,1,.36,1)", fill: "both" },
      );
      animations.add(animation);
      animation.onfinish = () => { animation.cancel(); animations.delete(animation); };
    };
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) reveal(entry.target as HTMLElement);
    }, { threshold: .1, rootMargin: "0px 0px -8% 0px" });

    const register = (root: ParentNode) => {
      const targets = root instanceof HTMLElement && root.matches(selector) ? [root, ...root.querySelectorAll<HTMLElement>(selector)] : root.querySelectorAll<HTMLElement>(selector);
      for (const target of targets) {
        if (seen.has(target) || target.closest(customMotion) || target.closest(".about-glance__tool-window, .about-glance__logos, .client-logos, .client-grid")) continue;
        if (target.matches(".about-page__service-mark, .about-glance__agency-mark, .split-cta__motion-mark, .website-service__inline-cta-art img")) continue;
        if (target.getBoundingClientRect().width === 0 || target.getBoundingClientRect().height === 0) continue;
        seen.add(target);
        const bounds = target.getBoundingClientRect();
        if (bounds.bottom < 0) continue;
        if (bounds.top <= window.innerHeight * .92) reveal(target);
        else {
          // Keep streamed React markup untouched until its route has hydrated.
          pending.set(target, target.animate([{ opacity: 0 }, { opacity: 0 }], { duration: 1, fill: "forwards" }));
          observer.observe(target);
        }
      }
    };

    register(main);
    const changes = new MutationObserver((records) => {
      for (const record of records) for (const node of record.addedNodes) if (node instanceof HTMLElement) register(node);
    });
    changes.observe(main, { childList: true, subtree: true });
    return () => {
      changes.disconnect();
      observer.disconnect();
      pending.forEach((animation) => animation.cancel());
      animations.forEach((animation) => animation.cancel());
    };
  }, [pathname]);

  return null;
}
