"use client";

import { useEffect, useRef } from "react";

/** Nearest-neighbour resolution ramp, replayed on every hover or keyboard focus. */
export function ServicePixelImage({ src, active }: { src: string; active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d", { alpha: false });
    if (!context) return;
    const image = imageRef.current ?? new window.Image();
    imageRef.current = image;
    let frame = 0, cancelled = false;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = () => {
      if (cancelled || !active) return;
      const started = performance.now();
      const draw = (now: number) => {
        if (cancelled) return;
        const progress = reduced ? 1 : Math.min(1, (now - started) / 450);
        const width = Math.round(4 * Math.pow(64, progress));
        canvas.width = width;
        canvas.height = Math.max(1, Math.round(width / 1.5));
        const ratio = image.naturalWidth / image.naturalHeight;
        const cropWidth = ratio > 1.5 ? image.naturalHeight * 1.5 : image.naturalWidth;
        const cropHeight = cropWidth / 1.5;
        context.imageSmoothingEnabled = false;
        context.drawImage(image, (image.naturalWidth-cropWidth)/2, (image.naturalHeight-cropHeight)/2, cropWidth, cropHeight, 0, 0, canvas.width, canvas.height);
        if (progress < 1) frame = requestAnimationFrame(draw);
      };
      frame = requestAnimationFrame(draw);
    };
    image.onload = start;
    if (image.src !== new URL(src, window.location.href).href) image.src = src;
    else if (image.complete) start();
    return () => { cancelled = true; cancelAnimationFrame(frame); image.onload = null; };
  }, [src, active]);
  return <canvas ref={canvasRef} aria-hidden="true" />;
}
