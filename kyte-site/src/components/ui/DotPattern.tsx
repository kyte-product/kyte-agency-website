"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { kiteDotMask } from "./kiteDotMask";
import { approachDotMasks } from "./approachDotMasks";
import "./DotPattern.css";

type DotShape = "ribbon" | "orbit" | "graph" | "field" | "kite" | keyof typeof approachDotMasks | "discover" | "define" | "develop" | "deliver";
type Dot = { x: number; y: number; state: "on" | "a" | "b" | "off"; delay: number };

// Physical CSS pixels, shared by every dot field. Never scale the SVG or its circles.
const DOT_STEP = 7;
const DOT_RADIUS = 1;

function isColored(shape: DotShape, x: number, y: number, row: number, column: number, phase: number, width: number, height: number) {
  if (shape in approachDotMasks) {
    const side = Math.min(width, height) * .84;
    const mx = Math.floor((x - (width - side) / 2) / side * 32);
    const my = Math.floor((y - (height - side) / 2) / side * 32);
    const mask = approachDotMasks[shape as keyof typeof approachDotMasks];
    return mx >= 0 && mx < 32 && my >= 0 && my < 32 && mask[my][mx] === "1" && (row * 7 + column * 11 + phase * 3) % 31 > 0;
  }
  // Stage motifs: explore clusters, focus the brief, connect modules, then launch.
  const unit = Math.min(width, height);
  const sx = (x - width / 2) / unit;
  const sy = (y - height / 2) / unit;
  if (shape === "discover") return [[-.22,-.18],[.2,-.12],[-.08,.23]].some(([cx, cy]) => Math.hypot(sx - cx, sy - cy) < .14 + phase * .012);
  if (shape === "define") {
    const diamond = Math.abs(sx) + Math.abs(sy);
    return diamond < .13 || Math.abs(diamond - .32 - phase * .015) < .045;
  }
  if (shape === "develop") {
    const tile = Math.abs(Math.abs(sx) - .21) < .12 && Math.abs(Math.abs(sy) - .21) < .12;
    return tile || (Math.abs(sx) < .025 + phase * .008 && Math.abs(sy) < .21) || (Math.abs(sy) < .025 && Math.abs(sx) < .21);
  }
  if (shape === "deliver") return (Math.abs(sy + sx) < .055 && Math.abs(sx) < .3) || (sx > .03 && sx < .33 && sy > -.33 && sy < -.25) || (sx > .25 && sx < .33 && sy > -.33 && sy < -.03);
  if (shape === "kite") {
    const side = Math.min(width, height) * .72;
    const mx = Math.floor((x - (width - side) / 2) / side * 64);
    const my = Math.floor((y - (height - side) / 2) / side * 64);
    return mx >= 0 && mx < 64 && my >= 0 && my < 64 &&
      kiteDotMask[my][mx] === "1" && (row * 7 + column * 11 + phase * 3) % 29 > 1;
  }
  const nx = x / width * 320;
  const ny = y / height * 224;
  if (shape === "ribbon") {
    const center = 160 + Math.sin(ny / 43 + phase * .3) * 27;
    const halfWidth = 58 + Math.cos(ny / 31 + phase * .3) * 27;
    return Math.abs(nx - center) < halfWidth;
  }
  if (shape === "orbit") {
    const dx = (nx - 160) / 112;
    const dy = (ny - 112) / 90;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);
    return Math.abs(distance - (.62 + Math.sin(angle * 3 + phase * .25) * .17)) < .2;
  }
  if (shape === "field") return (row * 37 + column * 19 + phase * 13) % 43 < 2;
  // Decorative composition, not a plotted series of business results.
  const curve = 177 - nx * .41 + Math.sin(nx / 19) * 20 + phase * 7;
  return Math.abs(ny - curve) < 4;
}

function createDots(shape: DotShape, width: number, height: number): Dot[] {
  const columns = Math.floor(width / DOT_STEP);
  const rows = Math.floor(height / DOT_STEP);
  const insetX = (width - (columns - 1) * DOT_STEP) / 2;
  const insetY = (height - (rows - 1) * DOT_STEP) / 2;
  return Array.from({ length: columns * rows }, (_, index) => {
    const row = Math.floor(index / columns);
    const column = index % columns;
    const x = insetX + column * DOT_STEP;
    const y = insetY + row * DOT_STEP;
    const first = isColored(shape, x, y, row, column, 0, width, height);
    const second = isColored(shape, x, y, row, column, 1, width, height);
    return { x, y, state: first && second ? "on" : first ? "a" : second ? "b" : "off", delay: (row * 7 + column * 11) % 8 };
  });
}

/** Fills its container with a fixed 2px dot on a 7px grid. Only solid fill colors change. */
export function DotPattern({ shape = "ribbon", tone = "brand", className = "" }: {
  shape?: DotShape;
  tone?: "brand" | "white" | "charcoal";
  className?: string;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const observer = new ResizeObserver(([entry]) => {
      const width = Math.round(entry.contentRect.width);
      const height = Math.round(entry.contentRect.height);
      setSize(previous => previous.width === width && previous.height === height ? previous : { width, height });
    });
    observer.observe(svg);
    return () => observer.disconnect();
  }, []);
  const dots = useMemo(() => createDots(shape, size.width, size.height), [shape, size.width, size.height]);
  return <svg ref={ref} className={`dot-pattern dot-pattern--${shape} dot-pattern--${tone} ${className}`} aria-hidden="true" focusable="false">
    {dots.map(({ x, y, state, delay }, index) => <circle className={`dot-pattern__dot dot-pattern__dot--${state} dot-pattern__delay-${delay}`} key={index} cx={x} cy={y} r={DOT_RADIUS} />)}
  </svg>;
}
