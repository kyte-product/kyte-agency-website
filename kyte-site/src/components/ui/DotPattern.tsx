"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { kiteDotMask } from "./kiteDotMask";
import { approachDotMasks } from "./approachDotMasks";
import "./DotPattern.css";

type DotShape = "ribbon" | "orbit" | "graph" | "field" | "kite" | keyof typeof approachDotMasks | "discover" | "define" | "develop" | "deliver";
type Dot = { x: number; y: number; state: "on" | "a" | "b" | "off"; delay: number };
type MotionDot = { x: number; y: number; dx: number; dy: number; fromOpacity: number; toOpacity: number; delay: number };
type ReferenceMotif = (x: number, y: number) => boolean;

// Physical CSS pixels, shared by every dot field. Never scale the SVG or its circles.
const DOT_STEP = 7;
const DOT_RADIUS = 1.55;

const inTile = (x: number, y: number) => Math.abs(x) <= .82 && Math.abs(y) <= .82;
const ring = (x: number, y: number, cx: number, cy: number, radius: number, thickness = .13) => Math.abs(Math.hypot(x - cx, y - cy) - radius) <= thickness;
const circle = (x: number, y: number, cx: number, cy: number, radius: number) => Math.hypot(x - cx, y - cy) <= radius;

// Bold, centered tiles adapted from the supplied geometric references. Each uses
// broad filled areas so the motif remains legible on the fixed 7px dot grid.
const referenceMotifs: readonly ReferenceMotif[] = [
  // Interlocking, broad diagonal checker facets.
  (x, y) => { const u = (x + .8) * 3.2; const v = (y + .8) * 3.2; const a = Math.floor(u); const b = Math.floor(v); const p = u % 1; const q = v % 1; return (a + b) % 2 === 0 ? p + q < 1.15 : p + q > .85; },
  // Paired, broad arch bands replace the rejected four-point cross wherever it was used.
  (x, y) => (ring(x, y, -.34, 0, .38, .2) && x < .12) || (ring(x, y, .34, 0, .38, .2) && x > -.12),
  // Nested diamond frame with a filled central diamond.
  (x, y) => { const d = Math.abs(x) + Math.abs(y); return (d > .54 && d < .86) || d < .27; },
  // Four diagonal lobes leave a clean, even diamond-shaped center.
  (x, y) => [-1, 1].some((sx) => [-1, 1].some((sy) => circle(x, y, sx * .34, sy * .34, .32))) && Math.abs(x) + Math.abs(y) > .2,
  // Interlocking, broad diagonal checker facets replace the rejected hexagon bands.
  (x, y) => { const u = (x + .8) * 3.2; const v = (y + .8) * 3.2; const a = Math.floor(u); const b = Math.floor(v); const p = u % 1; const q = v % 1; return (a + b) % 2 === 0 ? p + q < 1.15 : p + q > .85; },
  // Four thick quarter-arc bands form a single rounded square tile.
  (x, y) => [-1, 1].some((sx) => [-1, 1].some((sy) => ring(x, y, sx * .38, sy * .38, .35, .16) && (x * sx > .12 || y * sy > .12))),
  // Four distinct rounded petals with a generous diamond of negative space.
  (x, y) => [-1, 1].some((sx) => [-1, 1].some((sy) => circle(x, y, sx * .4, sy * .4, .27))),
  // Four broad diamond facets form a balanced, connected rosette.
  (x, y) => [-1, 1].some((sx) => [-1, 1].some((sy) => Math.abs(x - sx * .3) + Math.abs(y - sy * .3) < .42)),
  // Alternating quarter tiles make a compact, high-contrast mosaic.
  (x, y) => { const a = Math.floor((x + .8) * 2.5); const b = Math.floor((y + .8) * 2.5); return (a + b) % 2 === 0 && Math.abs(x) < .8 && Math.abs(y) < .8; },
  // Paired, broad arch bands form a clear linked path.
  (x, y) => (ring(x, y, -.34, 0, .38, .2) && x < .12) || (ring(x, y, .34, 0, .38, .2) && x > -.12),
  // A scalloped rosette band with rounded, four-way symmetry.
  (x, y) => { const angle = Math.atan2(y, x); const radius = Math.hypot(x, y); return Math.abs(radius - (.48 + .14 * Math.cos(angle * 4))) < .19; },
  // A nested diamond frame with a filled center replaces the rejected square bands.
  (x, y) => { const d = Math.abs(x) + Math.abs(y); return (d > .54 && d < .86) || d < .27; },
];

function hashSeed(seed: string) {
  let hash = 2166136261;
  for (let index = 0; index < seed.length; index++) hash = Math.imul(hash ^ seed.charCodeAt(index), 16777619);
  return hash >>> 0;
}

function getReferenceMotif(seed: string, motifSlot?: number) {
  if (motifSlot !== undefined) {
    const groupSeed = seed.includes(":") ? seed.slice(0, seed.lastIndexOf(":")) : seed;
    const pageOffset = hashSeed(groupSeed) % referenceMotifs.length;
    return referenceMotifs[(pageOffset + motifSlot * 7) % referenceMotifs.length];
  }
  const text = seed.toLowerCase();
  const family = /journey|workflow|onboard|handoff|task|flow|deliver|process|path/.test(text) ? [1, 4, 5, 8, 9]
    : /trust|confidence|finance|payment|account|security|decision|risk|metric|impact/.test(text) ? [2, 5, 6, 7, 9]
      : /system|component|permission|roles|dashboard|data|interface|screen|commerce|store/.test(text) ? [0, 2, 7, 8, 10]
        : /research|evidence|user|audience|discover|insight|need|behavio/.test(text) ? [1, 3, 5, 6, 9]
          : /content|story|brand|identity|campaign|creative|motion|video/.test(text) ? [0, 3, 4, 6, 8]
            : referenceMotifs.map((_, index) => index);
  const hash = hashSeed(seed);
  const motif = referenceMotifs[family[hash % family.length]];
  const rotation = (hash >>> 5) % 4;
  const reflect = (hash & 0x100) !== 0;
  return (x: number, y: number) => {
    const mirroredX = reflect ? -x : x;
    if (rotation === 1) return motif(y, -mirroredX);
    if (rotation === 2) return motif(-mirroredX, -y);
    if (rotation === 3) return motif(-y, mirroredX);
    return motif(mirroredX, y);
  };
}

function isReferenceColored(x: number, y: number, width: number, height: number, motif: ReferenceMotif) {
  const side = Math.min(width, height) * .9;
  const nx = (x - width / 2) / side * 2;
  const ny = (y - height / 2) / side * 2;
  return inTile(nx, ny) && motif(nx, ny);
}

function isColored(shape: DotShape, x: number, y: number, row: number, column: number, phase: number, width: number, height: number) {
  if (shape in approachDotMasks) {
    const side = Math.min(width, height) * .84;
    const mx = Math.floor((x - (width - side) / 2) / side * 32);
    const my = Math.floor((y - (height - side) / 2) / side * 32);
    const mask = approachDotMasks[shape as keyof typeof approachDotMasks];
    return mx >= 0 && mx < 32 && my >= 0 && my < 32 && mask[my][mx] === "1" && (row * 7 + column * 11 + phase * 3) % 31 > 0;
  }
  // The design-system preview and homepage keep the approved shared base motifs.
  if (shape === "discover") return [[-.22,-.18],[.2,-.12],[-.08,.23]].some(([cx, cy]) => Math.hypot((x - width / 2) / Math.min(width, height) - cx, (y - height / 2) / Math.min(width, height) - cy) < .14 + phase * .012);
  if (shape === "define") {
    const diamond = Math.abs((x - width / 2) / Math.min(width, height)) + Math.abs((y - height / 2) / Math.min(width, height));
    return diamond < .13 || Math.abs(diamond - .32 - phase * .015) < .045;
  }
  if (shape === "develop") {
    const sx = (x - width / 2) / Math.min(width, height);
    const sy = (y - height / 2) / Math.min(width, height);
    const tile = Math.abs(Math.abs(sx) - .21) < .12 && Math.abs(Math.abs(sy) - .21) < .12;
    return tile || (Math.abs(sx) < .025 + phase * .008 && Math.abs(sy) < .21) || (Math.abs(sy) < .025 && Math.abs(sx) < .21);
  }
  if (shape === "deliver") {
    const sx = (x - width / 2) / Math.min(width, height);
    const sy = (y - height / 2) / Math.min(width, height);
    return (Math.abs(sy + sx) < .055 && Math.abs(sx) < .3) || (sx > .03 && sx < .33 && sy > -.33 && sy < -.25) || (sx > .25 && sx < .33 && sy > -.33 && sy < -.03);
  }
  if (shape === "kite") {
    const side = Math.min(width, height) * .72;
    const mx = Math.floor((x - (width - side) / 2) / side * 64);
    const my = Math.floor((y - (height - side) / 2) / side * 64);
    return mx >= 0 && mx < 64 && my >= 0 && my < 64 && kiteDotMask[my][mx] === "1" && (row * 7 + column * 11 + phase * 3) % 29 > 1;
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
  const curve = 177 - nx * .41 + Math.sin(nx / 19) * 20 + phase * 7;
  return Math.abs(ny - curve) < 4;
}

function createDots(shape: DotShape, width: number, height: number, seed: string, motifSlot?: number): Dot[] {
  const motif = seed === "default" ? null : getReferenceMotif(seed, motifSlot);
  const columns = Math.floor(width / DOT_STEP);
  const rows = Math.floor(height / DOT_STEP);
  const insetX = (width - (columns - 1) * DOT_STEP) / 2;
  const insetY = (height - (rows - 1) * DOT_STEP) / 2;
  return Array.from({ length: columns * rows }, (_, index) => {
    const row = Math.floor(index / columns);
    const column = index % columns;
    const x = insetX + column * DOT_STEP;
    const y = insetY + row * DOT_STEP;
    const first = motif ? isReferenceColored(x, y, width, height, motif) : isColored(shape, x, y, row, column, 0, width, height);
    const second = motif ? isReferenceColored(x, y, width, height, motif) : isColored(shape, x, y, row, column, 1, width, height);
    const breathing = first && second && (row * 7 + column * 11) % 19 === 0;
    const state = breathing ? (row + column) % 2 === 0 ? "a" : "b" : first && second ? "on" : first ? "a" : second ? "b" : "off";
    return { x, y, state, delay: (row * 7 + column * 11) % 8 };
  });
}

/** Fills its container with a fixed 7px dot grid. Dot radius can vary for legacy treatments. */
export function DotPattern({ shape = "ribbon", tone = "brand", className = "", seed = "default", animateOnChange = false, motifSlot, dotRadius = DOT_RADIUS }: {
  shape?: DotShape;
  tone?: "brand" | "white" | "charcoal";
  className?: string;
  seed?: string;
  animateOnChange?: boolean;
  motifSlot?: number;
  dotRadius?: number;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const gridId = `dot-grid-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const previousConfig = useRef({ seed, motifSlot, shape });
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [isRearranging, setIsRearranging] = useState(false);
  const [motionStarted, setMotionStarted] = useState(false);
  const [motionDots, setMotionDots] = useState<MotionDot[] | null>(null);
  const [displaySeed, setDisplaySeed] = useState(seed);
  const [displayMotifSlot, setDisplayMotifSlot] = useState(motifSlot);
  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const observer = new ResizeObserver(([entry]) => {
      const width = Math.round(entry.contentRect.width);
      const height = Math.round(entry.contentRect.height);
      setSize(previous => previous.width === width && previous.height === height ? previous : { width, height });
    });
    observer.observe(svg);
    let visible = false;
    const updatePlayback = () => {
      svg.dataset.animating = String(visible && !document.hidden);
    };
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      updatePlayback();
    }, { rootMargin: "120px" });
    visibility.observe(svg);
    document.addEventListener("visibilitychange", updatePlayback);
    return () => {
      observer.disconnect();
      visibility.disconnect();
      document.removeEventListener("visibilitychange", updatePlayback);
      svg.dataset.animating = "false";
    };
  }, []);
  useEffect(() => {
    const previous = previousConfig.current;
    if (previous.seed === seed && previous.motifSlot === motifSlot && previous.shape === shape) return;
    previousConfig.current = { seed, motifSlot, shape };
    if (!animateOnChange || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const frame = window.requestAnimationFrame(() => {
        setDisplaySeed(seed);
        setDisplayMotifSlot(motifSlot);
      });
      return () => window.cancelAnimationFrame(frame);
    }
    const oldDots = createDots(previous.shape, size.width, size.height, displaySeed, displayMotifSlot).filter((dot) => dot.state !== "off");
    const nextDots = createDots(shape, size.width, size.height, seed, motifSlot).filter((dot) => dot.state !== "off");
    const motionCount = Math.max(oldDots.length, nextDots.length);
    const nextMotionDots = Array.from({ length: motionCount }, (_, index) => {
      const from = oldDots[index] ?? nextDots[index];
      const to = nextDots[index] ?? from;
      return { x: from.x, y: from.y, dx: to.x - from.x, dy: to.y - from.y, fromOpacity: index < oldDots.length ? 1 : 0, toOpacity: index < nextDots.length ? 1 : 0, delay: (index % 12) * 14 };
    });
    let moveFrame = 0;
    const prepareFrame = window.requestAnimationFrame(() => {
      setMotionDots(nextMotionDots);
      setIsRearranging(true);
      moveFrame = window.requestAnimationFrame(() => setMotionStarted(true));
    });
    const timeout = window.setTimeout(() => {
      setDisplaySeed(seed);
      setDisplayMotifSlot(motifSlot);
      setIsRearranging(false);
      setMotionStarted(false);
      setMotionDots(null);
    }, 900);
    return () => {
      window.cancelAnimationFrame(prepareFrame);
      window.cancelAnimationFrame(moveFrame);
      window.clearTimeout(timeout);
    };
  }, [animateOnChange, displayMotifSlot, displaySeed, motifSlot, seed, shape, size.height, size.width]);
  const dots = useMemo(() => createDots(shape, size.width, size.height, displaySeed, displayMotifSlot), [shape, size.width, size.height, displaySeed, displayMotifSlot]);
  const renderedDotRadius = seed === "default" ? dotRadius : dotRadius * 1.3;
  return <svg ref={ref} className={`dot-pattern dot-pattern--${shape} dot-pattern--${tone} ${className}`} aria-hidden="true" focusable="false" data-animating="false" data-rearranging={isRearranging}>
    <defs><pattern id={gridId} patternUnits="userSpaceOnUse" width={DOT_STEP} height={DOT_STEP} x={(dots[0]?.x ?? 0) - DOT_STEP / 2} y={(dots[0]?.y ?? 0) - DOT_STEP / 2}><circle cx={DOT_STEP / 2} cy={DOT_STEP / 2} r={renderedDotRadius} fill="var(--dot-rest)" /></pattern></defs>
    {dots.length > 0 && <rect x={dots[0].x - renderedDotRadius} y={dots[0].y - renderedDotRadius} width={dots[dots.length - 1].x - dots[0].x + renderedDotRadius * 2} height={dots[dots.length - 1].y - dots[0].y + renderedDotRadius * 2} fill={`url(#${gridId})`} />}
    {dots.map(({ x, y, state, delay }, index) => state === "off" ? null : <circle className={`dot-pattern__dot dot-pattern__dot--${isRearranging ? "off" : state} dot-pattern__delay-${delay}`} key={index} cx={x} cy={y} r={renderedDotRadius} />)}
    {motionDots?.map(({ x, y, dx, dy, fromOpacity, toOpacity, delay }, index) => <circle className="dot-pattern__motion-dot" key={`motion-${index}`} cx={x} cy={y} r={dotRadius * 1.3} style={{ opacity: motionStarted ? toOpacity : fromOpacity, transform: `translate(${motionStarted ? dx : 0}px, ${motionStarted ? dy : 0}px)`, transitionDelay: `${delay}ms` }} />)}
  </svg>;
}
