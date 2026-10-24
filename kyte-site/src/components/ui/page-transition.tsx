"use client";

import React, { useEffect, useRef } from "react";
import { motion, type Variants } from "framer-motion";
import "./page-transition.css";

export type TransitionType =
  | "double-stairs"
  | "shutter-stairs"
  | "split-stairs"
  | "horizontal-split"
  | "vertical-split"
  | "slash"
  | "lattice"
  | "curtain-shred"
  | "pixel"
  | "pixel-wave"
  | "pixel-spiral"
  | "vortex"
  | "cross-fade"
  | "expand-grow"
  | "push-slide"
  | "pop-over"
  | "depth-forward"
  | "liquid-wave";

export interface PageTransitionProps {
  type?: TransitionType;
  isVisible: boolean;
  onComplete?: () => void;
  className?: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  type = "double-stairs",
  isVisible,
  onComplete,
  className = "",
}) => {
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);

  useEffect(() => {
    if (type !== "liquid-wave" || !isVisible) return;
    let animId: number;
    const numPoints = 12;
    const numPaths = 3;
    const startTime = performance.now();

    const delays = Array.from({ length: numPaths }, (_, i) =>
      Array.from({ length: numPoints }, () => i * 0.08 + Math.random() * 0.15),
    );

    const animateFrame = (now: number) => {
      const elapsedSec = (now - startTime) / 1000;
      pathRefs.current.forEach((path, i) => {
        if (!path) return;
        const stepX = 100 / (numPoints - 1);
        const pointsY = delays[i].map((delay) => {
          const rawProgress = Math.max(
            0,
            Math.min(1, (elapsedSec - delay) / 0.65),
          );
          const easeProgress =
            rawProgress < 0.5
              ? 2 * rawProgress * rawProgress
              : 1 - Math.pow(-2 * rawProgress + 2, 2) / 2;
          return 100 - easeProgress * 110;
        });

        let d = `M 0 100 V ${pointsY[0]}`;
        for (let j = 0; j < numPoints - 1; j++) {
          const currentX = j * stepX;
          const nextX = (j + 1) * stepX;
          const cpX = currentX + stepX * 0.5;
          d += ` C ${cpX} ${pointsY[j]} ${cpX} ${pointsY[j + 1]} ${nextX} ${pointsY[j + 1]}`;
        }
        d += ` V 100 H 0 Z`;
        path.setAttribute("d", d);
      });

      if (now - startTime < 1300) {
        animId = requestAnimationFrame(animateFrame);
      } else if (onComplete) {
        onComplete();
      }
    };

    animId = requestAnimationFrame(animateFrame);
    return () => cancelAnimationFrame(animId);
  }, [isVisible, type, onComplete]);

  // Keep the component mounted through exit; the route controller unmounts at completion.

  if (type === "double-stairs") {
    const COLUMNS = 5;
    const variants: Variants = {
      initial: (i: number) => ({ y: i % 2 === 0 ? "-100%" : "100%" }),
      enter: (i: number) => ({
        y: "0%",
        transition: {
          duration: 0.8,
          ease: [0.76, 0, 0.24, 1],
          delay: i * 0.05,
        },
      }),
      exit: (i: number) => ({
        y: i % 2 === 0 ? "100%" : "-100%",
        transition: {
          duration: 0.8,
          ease: [0.76, 0, 0.24, 1],
          delay: i * 0.05,
        },
      }),
    };

    return (
      <motion.div
        className={`route-stairs ${className}`}
        initial="initial"
        animate={isVisible ? "enter" : "exit"}
      >
        {[...Array(COLUMNS)].map((_, i) => (
          <motion.div
            key={i}
            variants={variants}
            custom={i}
            onAnimationComplete={() => { if (i === COLUMNS - 1) onComplete?.(); }}
            className="route-stairs__column"
          />
        ))}
      </motion.div>
    );
  }

  if (type === "liquid-wave") {
    return (
      <svg
        className={`route-liquid ${className}`}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          ref={(el) => {
            pathRefs.current[0] = el;
          }}
          fill="#3f3f46"
          style={{ opacity: 0.4 }}
        />
        <path
          ref={(el) => {
            pathRefs.current[1] = el;
          }}
          fill="#27272a"
          style={{ opacity: 0.75 }}
        />
        <path
          ref={(el) => {
            pathRefs.current[2] = el;
          }}
          fill="#09090b"
        />
      </svg>
    );
  }

  return (
    <motion.div
      className={`route-fade ${className}`}
      initial={{ opacity: 0 }}
      animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.4 }}
    />
  );
};

export default PageTransition;
