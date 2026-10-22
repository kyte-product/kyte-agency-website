"use client";

import { useEffect, useRef } from "react";

type LedShape = {
  x: number;
  y: number;
  color: string;
  startTime: number;
  delay: number;
  duration: number;
};

const size = 10;
const gap = 2;
const probability = 4;
const animSpeed = 55;

export function LedMatrix() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const shapes: LedShape[] = [];
    let primary = "#c9c7cd";
    let secondary = "#f2f2f4";
    let visible = true;
    let width = 0;
    let height = 0;

    const pickColor = () => Math.random() < probability / 100 ? primary : secondary;

    const readColors = () => {
      const styles = getComputedStyle(canvas);
      const nextPrimary = styles.getPropertyValue("--hero-led-accent").trim() || primary;
      const nextSecondary = styles.getPropertyValue("--hero-led-base").trim() || secondary;
      if (nextPrimary !== primary || nextSecondary !== secondary) {
        primary = nextPrimary;
        secondary = nextSecondary;
        shapes.forEach((shape) => { shape.color = pickColor(); });
        draw();
      }
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      for (const shape of shapes) {
        context.fillStyle = shape.color;
        context.fillRect(shape.x, shape.y, size, size);
      }
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      const scale = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * scale);
      canvas.height = Math.round(height * scale);
      context.setTransform(scale, 0, 0, scale, 0, 0);
      shapes.length = 0;
      const now = performance.now();
      for (let y = 0; y < height; y += size + gap) {
        for (let x = 0; x < width; x += size + gap) {
          shapes.push({
            x,
            y,
            delay: Math.random() * (-99.9 * animSpeed + 10099.9),
            duration: Math.random() * (-99.9 * animSpeed + 10099.9),
            startTime: now + Math.random() * 5000,
            color: pickColor(),
          });
        }
      }
      readColors();
      draw();
    };

    const tick = () => {
      if (document.hidden || motionPreference.matches || !visible) return;
      readColors();
      const now = performance.now();
      let changed = false;
      for (const shape of shapes) {
        if (now > shape.startTime + shape.delay + shape.duration) {
          shape.startTime = now + shape.delay;
          shape.color = pickColor();
          changed = true;
        }
      }
      if (changed) draw();
    };

    const resizeObserver = new ResizeObserver(resize);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    resizeObserver.observe(canvas);
    visibilityObserver.observe(canvas);
    resize();
    const timer = setInterval(tick, 80);
    return () => {
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      clearInterval(timer);
    };
  }, []);

  return <canvas className="hero__led-canvas" ref={canvasRef} aria-hidden="true" />;
}
