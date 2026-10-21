"use client";

import { useLayoutEffect, useRef } from "react";
import type LocomotiveScroll from "locomotive-scroll";
import { usePathname } from "next/navigation";

export function SiteSmoothScroll() {
  const pathname = usePathname();
  const previousPath = useRef(pathname);

  useLayoutEffect(() => {
    const previousRestoration = history.scrollRestoration;
    history.scrollRestoration = "manual";
    const restore = (event: PageTransitionEvent) => {
      if (event.persisted) window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    };
    window.addEventListener("pageshow", restore);
    return () => {
      history.scrollRestoration = previousRestoration;
      window.removeEventListener("pageshow", restore);
    };
  }, []);

  useLayoutEffect(() => {
    const root = document.documentElement;
    const changed = previousPath.current !== pathname;
    previousPath.current = pathname;
    if (changed || !window.location.hash) window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false;
    let generation = 0;
    let scroll: LocomotiveScroll | undefined;
    let startFrame = 0;
    let initialized = false;

    const destroy = () => {
      cancelAnimationFrame(startFrame);
      const previous = scroll;
      scroll = undefined;
      if (previous) {
        previous.stop();
        // V5 initializes its observers in the next frame. Let that finish before
        // destroying an instance abandoned by navigation or React Strict Mode.
        if (initialized) previous.destroy();
        else requestAnimationFrame(() => previous.destroy());
      }
      initialized = false;
      delete root.dataset.scrollEngine;
    };

    const setup = () => {
      const current = ++generation;
      destroy();
      if (reducedMotion.matches) {
        root.dataset.scrollEngine = "native";
        return;
      }
      void import("locomotive-scroll").then(({ default: Locomotive }) => {
        if (disposed || current !== generation) return;
        scroll = new Locomotive({
          autoStart: false,
          lenisOptions: {
            autoRaf: false,
            autoToggle: true,
            anchors: true,
            allowNestedScroll: true,
            stopInertiaOnNavigate: true,
            lerp: 0.1,
            prevent: (node) => Boolean(node.closest("dialog")),
          },
        });
        startFrame = requestAnimationFrame(() => {
          initialized = true;
          scroll?.start();
          root.dataset.scrollEngine = "locomotive";
        });
      }).catch((error: unknown) => {
        if (disposed || current !== generation) return;
        root.dataset.scrollEngine = "native";
        console.error("Locomotive Scroll could not start; using native scrolling.", error);
      });
    };

    setup();
    reducedMotion.addEventListener("change", setup);
    return () => {
      disposed = true;
      generation++;
      reducedMotion.removeEventListener("change", setup);
      destroy();
      root.removeAttribute("data-scroll-orientation");
    };
  }, [pathname]);

  return null;
}
