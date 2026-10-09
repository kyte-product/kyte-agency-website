"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Expand, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import "./KyteCapabilities.css";

const capabilities = [
  {
    id: "research", title: "Find the problem worth solving", label: "Research and audits",
    description: "We review the current experience, speak to the people involved and turn scattered observations into a clear set of priorities.",
    detail: "A useful starting point for a product with unclear journeys, a website that is hard to navigate, or a team deciding what to improve first.",
    deliverables: ["UX research", "Experience audits", "Opportunity mapping"],
    href: "/ui-ux-design-development/ux-research-design-audit", image: "/kyte-work/collectbee-browser.png", alt: "Collectbee website interface",
  },
  {
    id: "product", title: "Make complex products easier to use", label: "Product and interface design",
    description: "From first flows to detailed screens, we design the decisions and interactions that help people get things done.",
    detail: "This work can cover mobile apps, SaaS platforms and web products, with a system the delivery team can carry forward.",
    deliverables: ["User flows", "Interface design", "Design systems"],
    href: "/ui-ux-design-development", image: "/kyte-work/collectbee.png", alt: "Collectbee product and website presentation",
  },
  {
    id: "website", title: "Give the business a clearer digital home", label: "Websites",
    description: "We bring structure, copy direction, design and development together so a site explains the offer and gives people a next step.",
    detail: "The scope can include information architecture, responsive design, CMS planning and a managed build, depending on the project.",
    deliverables: ["Website strategy", "Responsive design", "Development"],
    href: "/ui-ux-design-development/website-design-development", image: "/kyte-work/ogale.png", alt: "Ogale Machines website shown on a laptop",
  },
  {
    id: "brand", title: "Build a brand people can recognise", label: "Brand and identity",
    description: "We work from positioning through visual identity to the practical assets a team needs to show up consistently.",
    detail: "A brand system can connect the message, look and feel across a website, presentation, campaign and everyday communication.",
    deliverables: ["Positioning", "Visual identity", "Brand guidelines"],
    href: "/branding-marketing/brand-strategy-identity", image: "/kyte-work/banza.png", alt: "Banza visual content artwork",
  },
  {
    id: "content", title: "Help the idea travel further", label: "Content and motion",
    description: "Clear explanations, useful visuals and motion can make a complicated offer easier to understand across channels.",
    detail: "We shape the right format for the message, from graphic assets to video and motion, then make it usable where the audience meets it.",
    deliverables: ["Graphic design", "Video and motion", "Social content"],
    href: "/branding-marketing", image: "/kyte-work/revenue-grid.png", alt: "Revenue Grid platform presentation",
  },
] as const;

type Capability = (typeof capabilities)[number];

export function KyteCapabilities() {
  const [active, setActive] = useState<Capability | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const dialog = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key !== "Tab" || !dialog.current) return;
      const focusable = Array.from(dialog.current.querySelectorAll<HTMLElement>("button, a[href]"));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = previous; document.removeEventListener("keydown", onKeyDown); opener.current?.focus(); };
  }, [active]);

  return <>
    <section className="kyte-capabilities" id="capabilities" aria-labelledby="capabilities-title">
      <div className="kyte-capabilities__inner">
        <div className="kyte-capabilities__heading"><div><p className="kyte-capabilities__eyebrow">What we bring together</p><h2 id="capabilities-title">Different skills, connected around the same problem</h2></div><p>Some projects need a focused audit. Others need a product, brand and website to work together. We shape the team and scope around what will make the biggest difference.</p></div>
        <div className="kyte-capabilities__grid">
          {capabilities.map((item, index) => <button className={`kyte-capability kyte-capability--${item.id}`} key={item.id} type="button" aria-haspopup="dialog" aria-label={`${item.title}, open details`} onClick={(event) => { opener.current = event.currentTarget; setActive(item); }}>
            <span className="kyte-capability__visual"><Image src={item.image} alt="" fill sizes={index === 0 ? "(max-width: 940px) 90vw, 60vw" : "(max-width: 940px) 45vw, 30vw"} /></span>
            <span className="kyte-capability__top"><span>{item.label}</span><Expand size={17} aria-hidden="true" /></span>
            <span className="kyte-capability__bottom"><strong>{item.title}</strong><span>{item.description}</span></span>
          </button>)}
        </div>
      </div>
    </section>
    {active && <div className="kyte-capabilities__overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) setActive(null); }}>
      <div className="kyte-capabilities__dialog" ref={dialog} role="dialog" aria-modal="true" aria-labelledby="capability-dialog-title" tabIndex={-1}>
        <button className="kyte-capabilities__close" type="button" aria-label="Close details" onClick={() => setActive(null)}><X size={20} /></button>
        <p className="kyte-capabilities__eyebrow">{active.label}</p><h2 id="capability-dialog-title">{active.title}</h2><p>{active.description}</p><p>{active.detail}</p>
        <div className="kyte-capabilities__dialog-image"><Image src={active.image} alt={active.alt} fill sizes="(max-width: 700px) 90vw, 720px" /></div>
        <h3>What this can include</h3><ul>{active.deliverables.map((item) => <li key={item}>{item}</li>)}</ul>
        <Link href={active.href}>Explore this service <ArrowRight size={17} aria-hidden="true" /></Link>
      </div>
    </div>}
  </>;
}
