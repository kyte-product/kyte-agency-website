"use client";

import { useEffect, useRef } from "react";

export function FincartBrandingMotion() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    let destroy: (() => void) | undefined;

    async function mountAnimation() {
      const [{ default: lottie }, response] = await Promise.all([
        import("lottie-web"),
        fetch("/fincart-branding/scene.json"),
      ]);
      if (!response.ok || cancelled || !container) return;
      const animationData = await response.json();
      if (cancelled) return;

      const animation = lottie.loadAnimation({
        container,
        renderer: "svg",
        loop: true,
        autoplay: false,
        animationData,
        rendererSettings: { preserveAspectRatio: "xMidYMid meet" },
      });
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
        animation.goToAndStop(0, true);
        destroy = () => animation.destroy();
        return;
      }

      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          if (!container.dataset.fincartPlayed) animation.goToAndStop(0, true);
          container.dataset.fincartPlayed = "true";
          animation.play();
        } else animation.pause();
      }, { threshold: .35 });
      observer.observe(container);
      destroy = () => {
        observer.disconnect();
        animation.destroy();
      };
    }

    void mountAnimation();
    return () => {
      cancelled = true;
      destroy?.();
    };
  }, []);

  return <div ref={containerRef} className="fincart-brand-story__lottie" role="img" aria-label="Animated Fincart brand and website composition" />;
}
