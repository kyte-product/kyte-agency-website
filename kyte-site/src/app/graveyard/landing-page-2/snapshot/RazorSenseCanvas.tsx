"use client";

import { useEffect, useState } from "react";
import { BladeProvider, RazorSense } from "@razorpay/blade/components";
import { bladeTheme } from "@razorpay/blade/tokens";

export default function RazorSenseCanvas({ className }: { className?: string }) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(query.matches);
    updateMotion();
    query.addEventListener("change", updateMotion);
    return () => query.removeEventListener("change", updateMotion);
  }, []);

  if (failed) return <div className={`${className ?? ""} contact-banner__effect--fallback`} aria-hidden="true" />;

  return (
    <BladeProvider themeTokens={bladeTheme} colorScheme="light">
      <RazorSense
        className={className}
        assetsPath="/razorsense"
        enableCenterElement={false}
        paused={reducedMotion}
        width="100%"
        height="100%"
        onError={() => setFailed(true)}
      />
    </BladeProvider>
  );
}
