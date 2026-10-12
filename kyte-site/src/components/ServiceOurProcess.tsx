"use client";

import { useState } from "react";
import { Laptop } from "@lucasmarkes/hairline/react";
import "./ServiceOurProcess.css";

export const sharedSteps = [
  {
    name: "Discover",
    title: "Understand the problem, not the assumption.",
    description: "We start divergent with user research, stakeholder interviews, and market and competitor analysis, so we solve the real problem rather than the first idea pitched.",
  },
  {
    name: "Define",
    title: "Turn insight into direction.",
    description: "Research becomes a clear brief with a defined scope, so every track, whether design, branding, content, or video, solves the same problem from the same point of view.",
  },
  {
    name: "Develop",
    title: "Build, test, refine.",
    description: "We work in tight loops and test early, so nothing goes to final until it is proven, whether that is a prototype, a brand system, a content plan, or a rough cut.",
  },
  {
    name: "Deliver",
    title: "Ship something that holds up.",
    description: "You get a finished, documented handoff, ready to launch, whether that is a live product, a brand guideline, a content calendar, or a finished film.",
  },
] as const;

function ProcessFigure() {
  return <Laptop
    className="service-process__figure"
    theme="light"
    play
    label="Laptop illustration"
    aria-hidden="true"
    tabIndex={-1}
  />;
}

export function ServiceOurProcess({ steps = sharedSteps, intro = "As a digital agency working across product design, branding, content, and video, we run every project through the same four stages, so nothing gets lost between idea and launch." }: { steps?: readonly { name: string; title: string; description: string }[]; intro?: string }) {
  const [activeStep, setActiveStep] = useState(1);

  return <section className="service-process" aria-labelledby="service-process-title">
    <div className="service-process__inner">
      <div className="service-process__intro">
        <p className="eyebrow">How we work</p>
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
            aria-controls={`service-process-panel-${index}`}
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
              <ProcessFigure />
            </>}
          </button>;
        })}
      </div>
    </div>
  </section>;
}
