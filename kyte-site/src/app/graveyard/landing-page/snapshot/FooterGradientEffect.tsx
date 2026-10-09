"use client";

import { useEffect, useId, useRef, useState } from "react";

const viewBoxWidth = 1271;
const viewBoxHeight = 599;
const barCount = 9;

const stops = [
  { offset: 0, color: "#17245C" },
  { offset: 0.1827, color: "#4F65E8" },
  { offset: 0.2837, color: "#8054E9" },
  { offset: 0.4135, color: "#F35C70" },
  { offset: 0.5866, color: "#FF713D" },
  { offset: 0.6827, color: "#FFCB65" },
  { offset: 0.8029, color: "#F7E7D0" },
  { offset: 1, color: "#F7E7D000" },
];

function barHeight(index: number) {
  const distanceFromCenter = Math.abs(index - (barCount - 1) / 2) / ((barCount - 1) / 2);
  const rise = 1 - Math.pow(distanceFromCenter, 1.24);
  return 0.98 * viewBoxHeight * (0.55 + 0.45 * rise);
}

export function FooterGradientEffect() {
  const id = useId().replace(/:/g, "");
  const bandRef = useRef<HTMLDivElement>(null);
  const [reveal, setReveal] = useState({ progress: 0.045, offset: 0 });

  useEffect(() => {
    const band = bandRef.current;
    if (!band) return;

    let frame = 0;
    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const height = band.offsetHeight || 1;
        const remaining = Math.max(0, document.documentElement.scrollHeight - window.innerHeight - window.scrollY);
        const amount = Math.max(0, Math.min(1, (height - remaining) / height));
        setReveal({
          progress: 0.045 + 0.955 * amount,
          offset: Math.min(height, remaining),
        });
      });
    };

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(band);
    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const width = viewBoxWidth / barCount;

  return <div className="site-footer__gradient-band" ref={bandRef} aria-hidden="true">
    <svg
      className="site-footer__gradient-art"
      style={{ transform: `translateY(-${reveal.offset}px) scaleY(${reveal.progress})` }}
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`footer-gradient-${id}`} x1="0" y1="1" x2="0" y2="0">
          {stops.map((stop) => <stop key={stop.offset} offset={stop.offset} stopColor={stop.color} />)}
        </linearGradient>
        <filter id={`footer-blur-${id}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="15" />
        </filter>
      </defs>
      {Array.from({ length: barCount }, (_, index) => {
        const height = barHeight(index);
        return <g key={index} filter={`url(#footer-blur-${id})`}>
          <rect
            x={index * width}
            y={viewBoxHeight - height}
            width={width * 1.23}
            height={height}
            fill={`url(#footer-gradient-${id})`}
          />
        </g>;
      })}
    </svg>
  </div>;
}
