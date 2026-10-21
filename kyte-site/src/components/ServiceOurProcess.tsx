"use client";

import { useState } from "react";
import Image from "next/image";
import { Basket, Branches, Cabinet, Dish, Drawer, Elevator, Exploded, Format, Hub, Keyboard, Lockers, Loupe, Padlock, Patch, Phone, Phosphor, Plot, Plug, Query, Rail, Rebuild, Relay, Riffle, Router, Settle, Sieve, Slow, Stack, Terminal, Terrain, Turntable, Vault } from "@lucasmarkes/hairline/react";
import { getServiceProcessFigure } from "@/data/serviceProcessFigures";
import { isCustomProcessFigure, ServiceProcessCustomFigure } from "./ServiceProcessCustomFigure";
import "./ServiceOurProcess.css";

const nativeFigures = { basket: Basket, branches: Branches, cabinet: Cabinet, dish: Dish, drawer: Drawer, elevator: Elevator, exploded: Exploded, format: Format, hub: Hub, keyboard: Keyboard, lockers: Lockers, loupe: Loupe, padlock: Padlock, patch: Patch, phone: Phone, phosphor: Phosphor, plot: Plot, plug: Plug, query: Query, rail: Rail, rebuild: Rebuild, relay: Relay, riffle: Riffle, router: Router, settle: Settle, sieve: Sieve, slow: Slow, stack: Stack, terminal: Terminal, terrain: Terrain, turntable: Turntable, vault: Vault };

export { sharedSteps } from "@/data/processSteps";
import { sharedSteps } from "@/data/processSteps";

function ProcessFigure({ servicePath, stepIndex }: { servicePath: string; stepIndex: number }) {
  const { kind, label } = getServiceProcessFigure(servicePath, stepIndex);
  const palette = "kyte";
  if (stepIndex === 0) return <Image className="service-process__figure service-process__figure--discover" src="/hairline/process-discover.svg" width={400} height={320} sizes="(max-width: 780px) 205px, 440px" alt="" unoptimized />;
  if (stepIndex === 1) return <Image className="service-process__figure service-process__figure--define" src="/hairline/process-define.svg" width={400} height={320} sizes="(max-width: 780px) 205px, 440px" alt="" unoptimized />;
  if (stepIndex === 2) return <Image className="service-process__figure service-process__figure--develop" src="/hairline/process-develop.svg" width={400} height={320} sizes="(max-width: 780px) 205px, 440px" alt="" unoptimized />;
  if (stepIndex === 3) return <Image className="service-process__figure service-process__figure--deliver" src="/hairline/process-deliver.svg" width={400} height={320} sizes="(max-width: 780px) 205px, 440px" alt="" unoptimized />;
  if (isCustomProcessFigure(kind)) return <ServiceProcessCustomFigure kind={kind} />;
  if (kind !== "workstack") {
    const Figure = nativeFigures[kind];
    return <Figure className="service-process__figure service-process__figure--native" data-figure={kind} theme="light" play label={label} aria-hidden="true" tabIndex={-1} />;
  }
  return <iframe
    className="service-process__figure"
    data-figure={kind}
    src={`/hairline/workstack-embed.html?theme=light&play=1&palette=${palette}`}
    title={label}
    aria-hidden="true"
    tabIndex={-1}
  />;
}

export function ServiceOurProcess({ servicePath, steps = sharedSteps, showFigures = true, intro = "As a digital agency working across product design, branding, content, and video, we run every project through the same four stages, so nothing gets lost between idea and launch." }: { servicePath: string; steps?: readonly { name: string; title: string; description: string }[]; showFigures?: boolean; intro?: string }) {
  const [activeStep, setActiveStep] = useState(1);

  return <section className={`service-process${showFigures ? "" : " service-process--text-only"}`} aria-labelledby="service-process-title">
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
            aria-controls={`service-process-panel-${index}`}
            aria-label={`${number} ${step.name}`}
            aria-describedby={isActive ? `service-process-panel-${index}` : undefined}
            key={step.name}
            onClick={() => setActiveStep(index)}
            onMouseMove={() => setActiveStep(index)}
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
              {showFigures && <ProcessFigure servicePath={servicePath} stepIndex={index} />}
            </>}
          </button>;
        })}
      </div>
    </div>
  </section>;
}
