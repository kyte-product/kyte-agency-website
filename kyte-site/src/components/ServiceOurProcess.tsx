"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DotPattern } from "./ui/DotPattern";
import "./ServiceOurProcess.css";

export { sharedSteps } from "@/data/processSteps";
import { sharedSteps } from "@/data/processSteps";

type ProcessStep = { name: string; title: string; description: string };

export function ServiceOurProcess({ servicePath, steps: customSteps, intro = "A clear sequence keeps the work focused, reviewed, and ready for the next decision." }: { servicePath: string; steps?: readonly ProcessStep[]; intro?: string }) {
  const sectionId = servicePath.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "");
  const steps = sharedSteps.map((fallback, index) => customSteps?.[index] ?? fallback);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const dragStart = useRef<{ x: number; scrollLeft: number } | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const copy = section?.querySelector<HTMLElement>(".service-process__step.is-active .service-process__step-copy");
    if (activeStep === null || !section || !copy) return;
    const measure = () => {
      const reserve = window.matchMedia("(max-width: 1100px)").matches ? 238 : 124;
      section.style.setProperty("--expanded-card-height", `${Math.max(360, Math.ceil(copy.scrollHeight) + reserve)}px`);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(copy);
    window.addEventListener("resize", measure);
    return () => { observer.disconnect(); window.removeEventListener("resize", measure); };
  }, [activeStep, customSteps]);

  const startDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0 || (event.target as HTMLElement).closest("button")) return;
    dragStart.current = { x: event.clientX, scrollLeft: railRef.current?.scrollLeft ?? 0 };
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.dataset.dragging = "false";
  };

  const moveDrag = (event: PointerEvent<HTMLDivElement>) => {
    const rail = railRef.current;
    const start = dragStart.current;
    if (event.pointerType === "mouse") {
      const bounds = event.currentTarget.getBoundingClientRect();
      event.currentTarget.style.setProperty("--cursor-x", `${event.clientX - bounds.left}px`);
      event.currentTarget.style.setProperty("--cursor-y", `${event.clientY - bounds.top}px`);
      event.currentTarget.dataset.cursorVisible = "true";
    }
    if (!rail || !start || event.buttons !== 1) return;
    const distance = event.clientX - start.x;
    if (Math.abs(distance) > 4) event.currentTarget.dataset.dragging = "true";
    if (event.currentTarget.dataset.dragging === "true") rail.scrollLeft = start.scrollLeft - distance;
  };

  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    dragStart.current = null;
    event.currentTarget.dataset.dragging = "false";
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const handleStepClick = (index: number) => {
    if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) {
      setActiveStep((current) => current === index ? null : index);
    }
  };

  return <section ref={sectionRef} className="service-process" aria-labelledby={`service-process-${sectionId}-title`} data-service={servicePath} data-expanded={activeStep !== null} style={{ "--active-step-index": activeStep ?? 0 } as CSSProperties}>
    <div className="service-process__inner">
      <div className="service-process__intro">
        <h2 id={`service-process-${sectionId}-title`}>Our Process</h2>
        <p>{intro}</p>
      </div>
      <div className="service-process__rail-window" onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={endDrag} onPointerCancel={endDrag} onPointerLeave={(event) => { event.currentTarget.dataset.cursorVisible = "false"; if (dragStart.current) endDrag(event); }}>
        <div className="service-process__rail" ref={railRef} role="region" aria-label="Kyte process stages" tabIndex={0}>
          <div className="service-process__track">
            {steps.map((step, index) => {
              const number = String(index + 1).padStart(2, "0");
              const isActive = activeStep === index;
              return <button
                className={`service-process__step${isActive ? " is-active" : ""}`}
                style={{ "--step-index": index } as CSSProperties}
                type="button"
                key={step.name}
                aria-expanded={isActive}
                aria-controls={`service-process-${sectionId}-panel-${index}`}
                onPointerDown={(event) => { if (event.pointerType === "mouse") event.preventDefault(); }}
                onPointerEnter={(event) => { if (event.pointerType === "mouse" && !dragStart.current) setActiveStep(index); }}
                onPointerLeave={() => setActiveStep((current) => current === index ? null : current)}
                onFocus={(event) => { if (event.currentTarget.matches(":focus-visible")) setActiveStep(index); }}
                onBlur={(event) => { if (!event.relatedTarget || !(event.relatedTarget as HTMLElement).closest(".service-process__step")) setActiveStep(null); }}
                onClick={() => handleStepClick(index)}
              >
                <span className="service-process__step-header">
                  <span className="service-process__step-name">{step.name}</span>
                  <span className="service-process__step-meta">Phase {number}</span>
                </span>
                <span className="service-process__step-details" id={`service-process-${sectionId}-panel-${index}`} aria-hidden={!isActive}>
                  <span className="service-process__step-copy">
                    <strong>{step.title}</strong>
                    <span>{step.description}</span>
                  </span>
                  <DotPattern shape="kite" tone={index % 2 === 0 ? "white" : "charcoal"} seed={`${servicePath}:process:${step.name}`} className="service-process__step-pattern" />
                  <span className="service-process__progress" aria-hidden="true">{steps.map((_, dotIndex) => <i className={dotIndex === index ? "is-current" : ""} key={dotIndex} />)}</span>
                </span>
              </button>;
            })}
          </div>
        </div>
        <span className="service-process__drag-cursor" aria-hidden="true"><ChevronLeft size={15} /><span>Drag</span><ChevronRight size={15} /></span>
      </div>
    </div>
  </section>;
}
