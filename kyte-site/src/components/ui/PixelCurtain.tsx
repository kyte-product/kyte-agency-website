"use client";

import { useLayoutEffect, useRef } from "react";

type Phase = "idle" | "covering" | "revealing";
const smooth = (value: number) => { const t = Math.max(0, Math.min(1, value)); return t * t * (3 - 2 * t); };

/** The weighted parent swipe carries an edge that grows, then settles flat. */
export function PixelCurtain({ phase, dark = false }: { phase: Phase; dark?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    const canvas = ref.current;
    if (!canvas || phase === "idle") return;
    const context = canvas.getContext("2d");
    if (!context) return;
    let frame = 0;
    let width = 0;
    let height = 0;
    let tile = 0;
    let edge = 0;
    const started = performance.now();
    const duration = phase === "covering" ? 740 : 720;
    const delay = phase === "covering" ? (dark ? 0 : 170) : (dark ? 140 : 0);
    const colors = dark
      ? ["#013bb0", "#0249d9", "#1b5cdd", "#3778ee"]
      : ["#0249d9", "#1b5cdd", "#3778ee", "#75a2f2"];
    const resize = () => {
      width = window.innerWidth;
      tile = Math.max(16, Math.ceil(width / 56));
      edge = tile * 6;
      height = window.innerHeight + edge * 2;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.parentElement?.style.setProperty("--transition-edge", `${edge}px`);
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const draw = (now: number) => {
      const progress = Math.max(0, Math.min(1, (now - started - delay) / duration));
      // A small rough edge opens once, then steadily condenses before arrival.
      const spread = progress < .48 ? .2 + .8 * smooth((progress - .2) / .28) : 1 - smooth((progress - .48) / .44);
      context.clearRect(0, 0, width, height);
      context.fillStyle = colors[0];
      context.fillRect(0, edge, width, height - edge * 2);
      const columns = Math.ceil(width / tile);
      const stage = Math.floor(progress * 10);
      for (let column = 0; column < columns; column++) {
        const noise = Math.sin(column * 127.1 + 311.7) * 43758.5453;
        const seed = Math.floor((noise - Math.floor(noise)) * 997);
        const blocks = Math.round((2 + seed % 5) * spread);
        for (let row = 0; row < blocks; row++) {
          context.fillStyle = colors[(seed + row * 3 + stage) % colors.length];
          const y = phase === "covering" ? edge - (row + 1) * tile : height - edge + row * tile;
          context.fillRect(column * tile, y, tile, tile);
        }
      }
      if (progress < 1) frame = requestAnimationFrame(draw);
    };
    resize();
    draw(started);
    const onResize = () => { cancelAnimationFrame(frame); resize(); draw(performance.now()); };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", onResize); };
  }, [phase, dark]);

  return <canvas ref={ref} aria-hidden="true" />;
}
