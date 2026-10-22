"use client";

import { createContext, useContext, useMemo, useState, type IframeHTMLAttributes, type ReactNode } from "react";
import Image, { type ImageProps } from "next/image";

export type IllustrationMode = "brand" | "original";
const PaletteContext = createContext<{ mode: IllustrationMode; setMode: (mode: IllustrationMode) => void }>({ mode: "brand", setMode: () => {} });

/** One preview selection across the site. A fresh page load starts with brand blue. */
export function IllustrationPaletteProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<IllustrationMode>("brand");
  const value = useMemo(() => ({ mode, setMode }), [mode]);
  return <PaletteContext.Provider value={value}>{children}</PaletteContext.Provider>;
}

export const useIllustrationPalette = () => useContext(PaletteContext);
export function illustrationAsset(src: string, mode: IllustrationMode) {
  return mode === "brand" && src.startsWith("/hairline/") && !src.startsWith("/hairline/brand/") ? src.replace("/hairline/", "/hairline/brand/") : src;
}

export function IllustrationImage(props: ImageProps) {
  const { mode } = useIllustrationPalette();
  return <Image {...props} alt={props.alt} src={typeof props.src === "string" ? illustrationAsset(props.src, mode) : props.src} />;
}

export function IllustrationFrame({ src, ...props }: Omit<IframeHTMLAttributes<HTMLIFrameElement>, "src"> & { src: string }) {
  const { mode } = useIllustrationPalette();
  return <iframe {...props} src={illustrationAsset(src, mode)} />;
}

export function IllustrationPaletteToggle() {
  const { mode, setMode } = useIllustrationPalette();
  return <div className="ds-palette-control">
    <div role="group" aria-label="Illustration color version" className="ds-palette-toggle">
      <button type="button" aria-pressed={mode === "brand"} onClick={() => setMode("brand")}>Brand blue</button>
      <button type="button" aria-pressed={mode === "original"} onClick={() => setMode("original")}>Original color</button>
    </div>
    <p aria-live="polite">{mode === "brand" ? "Brand blue is selected. Original color artwork is preserved." : "Original color is selected. Switch back to compare the blue version."} Your selection follows site links until the next full page load.</p>
  </div>;
}
