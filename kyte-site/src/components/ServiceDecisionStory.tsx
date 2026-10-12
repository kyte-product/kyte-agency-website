"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import "./ServiceDecisionStory.css";

const decisions = [
  {
    title: "Where do people lose momentum?",
    body: "Look closely at the moments where a task slows down, a choice becomes unclear, or someone leaves a journey unfinished. These are the moments worth investigating before changing a screen.",
    image: "https://images.unsplash.com/photo-1587355760421-b9de3226a046?auto=format&fit=crop&w=1400&q=85",
    alt: "Designer reviewing wireframes at a desk",
  },
  {
    title: "Which needs are still assumptions?",
    body: "Compare what the team believes with what people actually say and do. That distinction helps everyone agree on the problem before deciding on a solution.",
    image: "https://images.unsplash.com/photo-1766555766657-ea8f81a67934?auto=format&fit=crop&w=1400&q=85",
    alt: "Laptop and planning notes on a design workspace",
  },
  {
    title: "What should change first?",
    body: "Put the findings in context: how often a problem appears, how much it affects a task, and what it may take to address. That creates a useful order for the next design decisions.",
    image: "https://images.unsplash.com/photo-1700887944225-f148dd124305?auto=format&fit=crop&w=1400&q=85",
    alt: "Digital design work open on a computer screen",
  },
  {
    title: "How will we know it helped?",
    body: "Define the signals to revisit after a change, from task completion and support questions to feedback from the people using the product. The audit can then guide the next round of learning.",
    image: "https://images.unsplash.com/photo-1573805672213-81b449b17e8a?auto=format&fit=crop&w=1400&q=85",
    alt: "Responsive digital interface displayed on a laptop",
  },
] as const;

export function ServiceDecisionStory() {
  const [active, setActive] = useState(0);
  const stepsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const steps = [...(stepsRef.current?.querySelectorAll<HTMLElement>(".service-decisions__step") ?? [])];
    if (!steps.length || !window.matchMedia("(min-width: 801px)").matches) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const center = window.innerHeight * .48;
        const nearest = steps.reduce((best, step, index) => {
          const rect = step.getBoundingClientRect();
          const distance = Math.abs(rect.top + rect.height / 2 - center);
          const bestRect = steps[best].getBoundingClientRect();
          return distance < Math.abs(bestRect.top + bestRect.height / 2 - center) ? index : best;
        }, 0);
        setActive(nearest);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);

  return <section className="service-decisions" aria-labelledby="service-decisions-title">
    <div className="service-decisions__inner">
      <div className="service-decisions__heading"><p className="eyebrow">From evidence to action</p><h2 id="service-decisions-title">The decisions an audit should help you make.</h2><p>Beyond a list of findings, an audit gives your team a clearer basis for the choices ahead.</p></div>
      <div className="service-decisions__layout">
        <div className="service-decisions__steps" ref={stepsRef}>
          {decisions.map((decision, index) => <article className={`service-decisions__step${active === index ? " is-active" : ""}`} key={decision.title}>
            <span className="service-decisions__number">0{index + 1}</span><h3>{decision.title}</h3><p>{decision.body}</p>
            <figure className="service-decisions__mobile-image"><Image src={decision.image} alt={decision.alt} fill unoptimized sizes="(max-width: 800px) 100vw, 1px" /></figure>
          </article>)}
        </div>
        <div className="service-decisions__visual" aria-hidden="true"><div className="service-decisions__visual-frame">
          {decisions.map((decision, index) => <div className={`service-decisions__visual-image${active === index ? " is-active" : ""}`} key={decision.title}><Image src={decision.image} alt="" fill unoptimized sizes="(max-width: 800px) 1px, 48vw" /></div>)}
          <span className="service-decisions__visual-counter">0{active + 1} / 04</span>
        </div></div>
      </div>
    </div>
  </section>;
}

const visualWork = [
  { src: "/kyte-work/collectbee-browser.png", alt: "CollectBee website interface" },
  { src: "/kyte-work/revenue-grid.png", alt: "Revenue Grid product interface" },
  { src: "/kyte-work/spicy-bayer.webp", alt: "Spicy Bayer digital design" },
  { src: "/kyte-work/maya.webp", alt: "Maya digital experience" },
  { src: "/fincart/fincart-phone-cover.png", alt: "Fincart mobile app design" },
] as const;

export function ServiceVisualBento() {
  return <section className="service-visuals" aria-labelledby="service-visuals-title"><div className="service-visuals__inner">
    <div className="service-visuals__heading"><p className="eyebrow">The work in view</p><h2 id="service-visuals-title">Across screens and experiences.</h2></div>
    <div className="service-visuals__grid">{visualWork.map((item, index) => <figure className={`service-visuals__tile service-visuals__tile--${index + 1}`} key={item.src}><Image src={item.src} alt={item.alt} fill sizes={index > 2 ? "(max-width: 700px) 100vw, 50vw" : "(max-width: 700px) 100vw, 33vw"} /></figure>)}</div>
  </div></section>;
}
