"use client";

import { useEffect, useRef } from "react";
import "./BrandPixelTransition.css";

// Keep the same 4:1 field proportions while making the tiles finer and more numerous.
const COLUMNS = 64;
const ROWS = 16;
const COLORS = {
  blue: "#0249d9",
  deepBlue: "#0036b8",
  sky: "#5bb8ff",
  lime: "#a2f887",
  white: "#ffffff",
};

/** A reversible, scroll-position-driven pixel boundary between blue and white sections. */
export function BrandPixelTransition({ reverse = false, tone = "blue" }: { reverse?: boolean; tone?: "blue" | "gray" }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: false });
    if (!section || !canvas || !context) return;

    const colors = tone === "gray" ? { blue: "#f3f4f6", deepBlue: "#c9cdd4", sky: "#e2e5ea", lime: "#edf0f3", white: "#ffffff" } : COLORS;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const randoms = Array.from({ length: COLUMNS * ROWS }, (_, index) => {
      const seed = Math.sin((index + 1) * 127.1) * 43758.5453;
      return seed - Math.floor(seed);
    });
    let width = 0;
    let height = 0;
    let frame = 0;

    const resize = () => {
      const rect = section.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw();
    };

    const draw = () => {
      if (!width || !height) return;
      const rect = section.getBoundingClientRect();
      const progress = reduceMotion.matches
        ? 1
        : Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
      const cell = width / COLUMNS;
      const rowHeight = cell;
      const rows = Math.ceil(height / cell);
      const palette = [colors.deepBlue, colors.blue, colors.sky, colors.lime, colors.white];
      context.fillStyle = colors.white;
      context.fillRect(0, 0, width, height);

      for (let column = 0; column < COLUMNS; column += 1) {
        const columnNoise = randoms[column];
        const softWave = Math.sin(progress * Math.PI * 2.4 + column * 0.72) * 0.32;
        // Deliberately vary each column by more than a tile so the edge rises and dips irregularly.
        const roughness = (columnNoise - 0.5) * 2.5 + softWave;
        const frontier = 0.38 + progress * (rows - 1.1) + roughness;

        for (let row = 0; row < rows; row += 1) {
          const stableNoise = randoms[row * COLUMNS + column];
          const distance = frontier - row;
          const x = column * cell;
          const y = row * rowHeight;
          if (distance > 0.72) {
            context.fillStyle = colors.blue;
          } else if (distance < -0.72) {
            context.fillStyle = colors.white;
          } else if (reduceMotion.matches || progress < 0.07 || progress > 0.93) {
            // Keep a deliberately uneven, two-colour edge at rest instead of resolving to a rule.
            context.fillStyle = stableNoise > 0.48 ? colors.blue : colors.white;
          } else {
            // The moving edge carries a richer mix; it collapses back to the brand pair at either end.
            const mix = Math.sin((progress + stableNoise * 0.31 + row * 0.17) * Math.PI * 7);
            const index = Math.min(palette.length - 1, Math.floor(((mix + 1) / 2) * palette.length));
            context.fillStyle = palette[index];
          }
          context.fillRect(Math.floor(x), Math.floor(y), Math.ceil(cell), Math.ceil(rowHeight));
        }
      }
    };

    const requestDraw = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        draw();
      });
    };

    resize();
    window.addEventListener("scroll", requestDraw, { passive: true });
    window.addEventListener("resize", resize, { passive: true });
    reduceMotion.addEventListener("change", requestDraw);
    const observer = new ResizeObserver(resize);
    observer.observe(section);

    return () => {
      window.removeEventListener("scroll", requestDraw);
      window.removeEventListener("resize", resize);
      reduceMotion.removeEventListener("change", requestDraw);
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [tone]);

  return <div ref={sectionRef} className={`brand-pixel-transition${reverse ? " brand-pixel-transition--reverse" : ""}${tone === "gray" ? " brand-pixel-transition--gray" : ""}`} aria-hidden="true">
    <canvas ref={canvasRef} className="brand-pixel-transition__canvas" />
  </div>;
}
