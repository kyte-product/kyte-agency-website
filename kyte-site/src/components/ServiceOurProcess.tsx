"use client";

import { useState } from "react";
import { DotPattern } from "./ui/DotPattern";
import "./ServiceOurProcess.css";

export { sharedSteps } from "@/data/processSteps";
import { sharedSteps } from "@/data/processSteps";

function ProcessFigure({ stepIndex }: { stepIndex: number }) {
  const shapes = ["discover", "define", "develop", "deliver"] as const;
  return <DotPattern shape={shapes[stepIndex % shapes.length]} tone="white" className="service-process__figure service-process__figure--dots" />;
}

export function ServiceOurProcess({ servicePath, steps = sharedSteps, showFigures = true, intro = "As a digital agency working across product design, branding, content, and video, we run every project through the same four stages, so nothing gets lost between idea and launch." }: { servicePath: string; steps?: readonly { name: string; title: string; description: string }[]; showFigures?: boolean; intro?: string }) {
  const [activeStep, setActiveStep] = useState(1);

  return <section className={`service-process${showFigures ? "" : " service-process--text-only"}`} aria-labelledby="service-process-title" data-service={servicePath}>
    <div className="service-process__inner">
      <div className="service-process__intro">

        <h2 id="service-process-title">Our Process</h2>
        <p>{intro}</p>
      </div>
      <div className="service-process__steps" aria-label="Our process">
        {steps.map((step, index) => {
          const number = String(index + 1).padStart(2, "0");
          const isActive = activeStep === index;
          return <button
            className={`service-process__step${isActive ? " is-active" : ""}`}
            type="button"
            id={`service-process-tab-${index}`}
            aria-expanded={isActive}
            aria-controls={isActive ? `service-process-panel-${index}` : undefined}
            aria-label={`${number} ${step.name}`}
            aria-describedby={isActive ? `service-process-panel-${index}` : undefined}
            key={step.name}
            onClick={() => setActiveStep(index)}
            onMouseEnter={() => setActiveStep(index)}
            onFocus={() => setActiveStep(index)}
          >
            <span className="service-process__step-number">{number}</span>
            <span className="service-process__step-name">{step.name}</span>
            {isActive && <>
              <span className="service-process__active-number" aria-hidden="true">{number}</span>
              <span className="service-process__active-copy" id={`service-process-panel-${index}`}>
                <strong>{step.title}</strong>
                <span>{step.description}</span>
              </span>
              {showFigures && <ProcessFigure stepIndex={index} />}
            </>}
          </button>;
        })}
      </div>
    </div>
  </section>;
}
