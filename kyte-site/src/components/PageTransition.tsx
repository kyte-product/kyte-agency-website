"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Phase = "idle" | "covering" | "revealing";

const COVER_DURATION = 560;
const NAVIGATION_TIMEOUT = 10000;

export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const phaseRef = useRef<Phase>("idle");
  const previousPath = useRef(pathname);
  const coverTimer = useRef<number | null>(null);
  const fallbackTimer = useRef<number | null>(null);

  const changePhase = (next: Phase) => {
    phaseRef.current = next;
    setPhase(next);
  };

  useEffect(() => {
    if (previousPath.current !== pathname) {
      previousPath.current = pathname;
      if (phaseRef.current === "covering") {
        if (fallbackTimer.current !== null) window.clearTimeout(fallbackTimer.current);
        const frame = window.requestAnimationFrame(() => changePhase("revealing"));
        return () => window.cancelAnimationFrame(frame);
      }
    }
  }, [pathname]);

  useEffect(() => {
    const handleLinkClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest<HTMLAnchorElement>("a[href]");
      if (!link || link.hasAttribute("download") || (link.target && link.target !== "_self")) return;

      const destination = new URL(link.href, window.location.href);
      if (destination.origin !== window.location.origin || /\.[a-z0-9]+$/i.test(destination.pathname)) return;
      if (destination.pathname === window.location.pathname) return;

      event.preventDefault();
      if (phaseRef.current !== "idle") return;
      event.stopPropagation();

      const href = `${destination.pathname}${destination.search}${destination.hash}`;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        router.push(href);
        return;
      }

      changePhase("covering");
      coverTimer.current = window.setTimeout(() => {
        router.push(href);
        fallbackTimer.current = window.setTimeout(() => changePhase("revealing"), NAVIGATION_TIMEOUT);
      }, COVER_DURATION);
    };

    document.addEventListener("click", handleLinkClick, true);
    return () => {
      document.removeEventListener("click", handleLinkClick, true);
      if (coverTimer.current !== null) window.clearTimeout(coverTimer.current);
      if (fallbackTimer.current !== null) window.clearTimeout(fallbackTimer.current);
    };
  }, [router]);

  return <div
    aria-hidden="true"
    className={`page-transition page-transition--${phase}`}
    onTransitionEnd={(event) => {
      if (event.target === event.currentTarget && phaseRef.current === "revealing") changePhase("idle");
    }}
  />;
}
