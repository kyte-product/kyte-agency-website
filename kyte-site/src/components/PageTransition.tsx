"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { PageTransition as TransitionSurface } from "./ui/page-transition";

type Phase = "idle" | "covering" | "revealing";
const NAVIGATION_TIMEOUT = 10000;

export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const phaseRef = useRef<Phase>("idle");
  const previousPath = useRef(pathname);
  const pendingHref = useRef<string | null>(null);
  const fallbackTimer = useRef<number | null>(null);
  const revealTimer = useRef<number | null>(null);

  useLayoutEffect(() => {
    document.documentElement.dataset.page = pathname;
    document.documentElement.dataset.cornerScope = pathname === "/branding-marketing" ? "branding" : "compact";
  }, [pathname]);

  const changePhase = useCallback((next: Phase) => {
    phaseRef.current = next;
    setPhase(next);
  }, []);

  const onComplete = useCallback(() => {
    if (phaseRef.current === "covering" && pendingHref.current) {
      const href = pendingHref.current;
      pendingHref.current = null;
      router.push(href, { scroll: false });
      fallbackTimer.current = window.setTimeout(() => changePhase("revealing"), NAVIGATION_TIMEOUT);
    } else if (phaseRef.current === "revealing") {
      changePhase("idle");
    }
  }, [router, changePhase]);

  useEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;
    if (phaseRef.current === "covering") {
      if (fallbackTimer.current !== null) window.clearTimeout(fallbackTimer.current);
      revealTimer.current = window.setTimeout(() => changePhase("revealing"), 180);
    }
  }, [pathname, changePhase]);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotionChange = () => {
      if (!motion.matches) return;
      if (revealTimer.current !== null) window.clearTimeout(revealTimer.current);
      if (fallbackTimer.current !== null) window.clearTimeout(fallbackTimer.current);
      if (pendingHref.current) {
        router.push(pendingHref.current, { scroll: false });
        pendingHref.current = null;
      }
      changePhase("idle");
    };
    const handleLinkClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>("a[href]");
      if (!link || link.hasAttribute("download") || (link.target && link.target !== "_self")) return;
      const destination = new URL(link.href, window.location.href);
      if (destination.origin !== window.location.origin || /\.[a-z0-9]+$/i.test(destination.pathname)) return;
      if (destination.pathname === "/contact" || destination.pathname === window.location.pathname) return;
      event.preventDefault();
      event.stopPropagation();
      if (phaseRef.current !== "idle") return;
      const href = `${destination.pathname}${destination.search}${destination.hash}`;
      if (motion.matches) { router.push(href, { scroll: false }); return; }
      pendingHref.current = href;
      changePhase("covering");
    };
    motion.addEventListener("change", onMotionChange);
    document.addEventListener("click", handleLinkClick, true);
    return () => {
      motion.removeEventListener("change", onMotionChange);
      document.removeEventListener("click", handleLinkClick, true);
      if (fallbackTimer.current !== null) window.clearTimeout(fallbackTimer.current);
      if (revealTimer.current !== null) window.clearTimeout(revealTimer.current);
    };
  }, [router, changePhase]);

  return phase === "idle" ? null : <div aria-hidden="true" data-page-transition={phase}>
    <TransitionSurface type="double-stairs" isVisible={phase === "covering"} onComplete={onComplete} />
  </div>;
}
