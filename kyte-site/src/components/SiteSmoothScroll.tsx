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

  // Cross-route links opt out of Next's scrolling during the curtain. Restore
  // their destination anchor after commit, including content streamed later.
  useLayoutEffect(() => {
    if (!window.location.hash) return;
    let id: string;
    try { id = decodeURIComponent(window.location.hash.slice(1)); }
    catch { return; }
    let frame = 0;
    let observer: MutationObserver | undefined;
    const align = () => {
      const target = Array.from(document.querySelectorAll<HTMLElement>("[id]"))
        .find((element) => element.id === id && element.getClientRects().length > 0);
      if (!target) return false;
      target.scrollIntoView({ behavior: "instant", block: "start" });
      observer?.disconnect();
      return true;
    };
    frame = requestAnimationFrame(() => {
      if (align()) return;
      observer = new MutationObserver(() => { align(); });
      observer.observe(document.body, { childList: true, subtree: true });
    });
    const timeout = window.setTimeout(() => observer?.disconnect(), 10000);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
      observer?.disconnect();
    };
  }, [pathname]);

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
        // destroy() stops the engine. Calling stop() first with autoToggle
        // writes inline overflow:clip that survives destroy and freezes native routes.
        if (root.style.overflow === "clip") root.style.removeProperty("overflow");
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
      if (reducedMotion.matches || pathname.startsWith("/insights/guides/")) {
        if (root.style.overflow === "clip") root.style.removeProperty("overflow");
        root.classList.remove("lenis-stopped", "lenis-locked");
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
