"use client";

import Image from "next/image";
import { ArrowUpRight, Check, Maximize, X } from "lucide-react";
import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { clientLogoAsset } from "@/data/clientLogoAssets";
import "./AnandGlance.css";
import "./KyteGlance.css";

type CardId = "global" | "revenue" | "companies" | "people" | "sujan";
type CardContent = { title: string; body?: string; facts?: string[]; image?: string; imageAlt?: string; link?: { label: string; href: string } };

const clients = [
  ["fincart", "Fincart"], ["jio-hotstar", "JioHotstar"], ["daily-objects", "Daily Objects"],
  ["decathlon", "Decathlon"], ["district", "District"], ["lovable", "Lovable"],
  ["smash-guys", "Smash Guys"], ["revenue-grid", "Revenue Grid"], ["contractzy", "Contractzy"],
  ["itc-infotech", "ITC Infotech"], ["banza", "Banza"], ["emergent", "Emergent"],
  ["comet", "Comet"], ["wispr-flow", "Wispr Flow"], ["btg", "BTG"],
  ["agilitas", "Agilitas"], ["crepdog-crew", "Crepdog Crew"], ["gully-labs", "Gully Labs"],
  ["red-rhino", "Red Rhino"], ["papa-johns", "Papa Johns"], ["mad", "MAD"],
] as const;

const team = [
  { name: "Varun Padmanabhan", role: "Co-Founder", image: "/kyte-glance/varun.png" },
  { name: "Tanmay", role: "Head of Communications", image: "/kyte-glance/tanmay.png" },
  { name: "Mohammed Aayan", role: "Brand Designer", image: "/kyte-glance/aayan.png" },
  { name: "Riya Pathak", role: "Product Designer", image: "/kyte-glance/riya.jpg" },
] as const;

const content: Record<CardId, CardContent> = {
  global: { title: "Fincart Financial Planners", body: "A recent Kyte project for Fincart.", image: "/kyte-glance/fincart-banner-v2.jpg", imageAlt: "Fincart financial planning app screens" },
  revenue: { title: "Kyte by the numbers", body: "Figures shown on Kyte's current website.", facts: ["100+ projects", "50+ clients", "5M+ impressions", "3M+ views in one year"] },
  companies: { title: "Clients we have worked with", body: "A selection of brands featured in Kyte's client roster.", facts: clients.map(([, name]) => name) },
  people: { title: "The people behind Kyte", body: "A selection of the people behind Kyte's work. The current website describes a team of 16+ members.", facts: team.map(({ name, role }) => `${name}, ${role}`), image: "/kyte-glance/varun-speaking-poster.jpg", imageAlt: "Varun Padmanabhan speaking", link: { label: "Watch Varun's reel", href: "https://www.instagram.com/reel/DPTwBd5j9zn/" } },
  sujan: { title: "aftrhrs, animation by Kyte", body: "Explore aftrhrs, Kyte's animation company.", image: "/kyte-glance/aftrhrs-illustration.jpg", imageAlt: "Illustrated character from aftrhrs' Instagram", link: { label: "Visit aftrhrs", href: "https://www.instagram.com/_aftrhrs_/" } },
};

function Card({ id, title, large, children, onOpen, expanded }: { id: CardId; title: string; large?: boolean; children: ReactNode; onOpen: (id: CardId, opener: HTMLButtonElement) => void; expanded: boolean }) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mouse-x", `${event.clientX - rect.left - rect.width / 2}px`);
    event.currentTarget.style.setProperty("--mouse-y", `${event.clientY - rect.top - rect.height / 2}px`);
  };
  if (id === "sujan") return <a className="ag-card ag-card--small ag-card--sujan" href="https://www.instagram.com/_aftrhrs_/" target="_blank" rel="noopener noreferrer" aria-label="View aftrhrs on Instagram" onPointerMove={onPointerMove}>
    <span className="ag-card__text"><span className="ag-card__title">{title}</span></span>
    <span className="kg-aftrhrs-cta">View aftrhrs <ArrowUpRight size={17} aria-hidden="true" /></span>
    <span className="ag-card__border" aria-hidden="true"><span><span /></span></span>
    <span className="ag-card__inner"><span className="ag-card__content"><span className="ag-graphic ag-graphic--sujan">{children}</span></span></span>
  </a>;
  return <button ref={buttonRef} className={`ag-card ${large ? "ag-card--large" : "ag-card--small"} ag-card--${id}`} type="button" aria-haspopup="dialog" aria-expanded={expanded} aria-label={`${title}, open details`} onPointerMove={onPointerMove} onClick={() => { if (buttonRef.current) onOpen(id, buttonRef.current); }}>
    <span className="ag-card__entry" aria-hidden="true"><span><Maximize size={18} strokeWidth={1.8} /></span></span>
    <span className="ag-card__text">{id === "global" ? <Image className="kg-fincart-title" src="/kyte-glance/fincart-title.png" alt="" width={1072} height={232} /> : <span className="ag-card__title">{title}</span>}</span>
    <span className="ag-card__border" aria-hidden="true"><span><span /></span></span>
    <span className="ag-card__inner"><span className="ag-card__content"><span className={`ag-graphic ag-graphic--${id}`}>{children}</span></span></span>
  </button>;
}

function Modal({ id, onClose }: { id: CardId; onClose: () => void }) {
  const item = content[id];
  const dialogRef = useRef<HTMLDivElement>(null);
  useEffect(() => { dialogRef.current?.focus(); }, []);
  const keepFocusInside = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab" || !dialogRef.current) return;
    const controls = Array.from(dialogRef.current.querySelectorAll<HTMLElement>("button, a[href]"));
    if (!controls.length) return;
    if (event.shiftKey && (document.activeElement === controls[0] || document.activeElement === dialogRef.current)) { event.preventDefault(); controls.at(-1)?.focus(); }
    else if (!event.shiftKey && document.activeElement === controls.at(-1)) { event.preventDefault(); controls[0].focus(); }
  };
  return <div className="ag-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="ag-dialog" role="dialog" aria-modal="true" aria-labelledby="ag-dialog-title" tabIndex={-1} ref={dialogRef} onKeyDown={keepFocusInside}>
      <button className="ag-dialog__close" type="button" aria-label="Close details" onClick={onClose}><X size={20} aria-hidden="true" /></button>
      <div className="ag-dialog__intro"><div><h2 id="ag-dialog-title">{item.title}</h2>{item.body && <p>{item.body}</p>}{item.link && <div className="ag-dialog__actions"><a className="ag-dialog__primary kyte-button" href={item.link.href} target="_blank" rel="noopener noreferrer">{item.link.label}<ArrowUpRight size={15} aria-hidden="true" /></a></div>}</div>{item.facts && <ul>{item.facts.map((fact) => <li key={fact}><Check size={16} aria-hidden="true" />{fact}</li>)}</ul>}</div>
      {item.image && <div className="ag-dialog__visuals"><div className={`ag-dialog__visual ag-dialog__visual--${id}`}><Image src={item.image} alt={item.imageAlt ?? ""} fill sizes="(max-width: 760px) 90vw, 70vw" /></div></div>}
      {id === "companies" && <div className="ag-dialog__extra"><h3>Selected clients</h3><div className="ag-detail-logos">{clients.map(([slug, name]) => { const logo = clientLogoAsset(slug); return <span className={logo.colored ? "kg-logo--color" : undefined} key={slug}><Image src={logo.src} alt={name} width={logo.width} height={logo.height} /></span>; })}</div></div>}
    </div>
  </div>;
}

export function KyteGlance() {
  const [active, setActive] = useState<CardId | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const elements = sectionRef.current?.querySelectorAll<HTMLElement>(".ag-reveal");
    if (!elements) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { elements.forEach((element) => element.classList.add("is-visible")); return; }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } }), { threshold: 0.15 });
    elements.forEach((element, index) => { element.style.transitionDelay = `${index * 60}ms`; observer.observe(element); });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setActive(null); };
    document.addEventListener("keydown", onEscape);
    return () => { document.body.style.overflow = previous; document.removeEventListener("keydown", onEscape); opener.current?.focus(); };
  }, [active]);

  const open = (id: CardId, button: HTMLButtonElement) => { opener.current = button; setActive(id); };
  return <>
    <section className="anand-glance kyte-glance" id="kyte-glance" aria-labelledby="ag-title" ref={sectionRef}>
      <div className="ag-wrap"><div className="ag-head"><div className="ag-reveal"><p className="ag-eyebrow">Kyte at a glance</p><h2 id="ag-title">The work, the people and the partners behind Kyte</h2></div><p className="ag-lede ag-reveal">Explore a recent collaboration, the team behind the work and the brands Kyte has worked with.</p></div>
        <div className="ag-grid">
          <Card id="global" title={content.global.title} large onOpen={open} expanded={active === "global"}><Image className="kg-feature-image" src="/kyte-glance/fincart-banner-v2.jpg" alt="" fill sizes="(max-width: 939px) 90vw, 66vw" /><span className="ag-mini"><span className="ag-mini__tile"><small>Client</small><strong>Fincart</strong></span><span className="ag-mini__tile"><small>Project</small><strong>Digital experience</strong></span><span className="ag-mini__tile ag-mini__tile--wide"><small>Recent collaboration</small></span></span></Card>
          <Card id="revenue" title={content.revenue.title} onOpen={open} expanded={active === "revenue"}><i className="ag-glow ag-glow--a" /><i className="ag-glow ag-glow--b" /><span className="ag-revenue"><span className="ag-revenue__head"><strong>kyte</strong><span>Current website</span></span><span className="ag-revenue__stats">{[["01", "Projects", "100+"], ["02", "Clients", "50+"], ["03", "Impressions", "5M+"], ["04", "Views in one year", "3M+"]].map(([index, label, value]) => <span className="kg-stat" key={index}><small>{index}</small><span>{label}</span><b>{value}</b></span>)}</span></span></Card>
          <Card id="companies" title={content.companies.title} onOpen={open} expanded={active === "companies"}><span className="ag-logos">{clients.map(([slug, name]) => { const logo = clientLogoAsset(slug); return <span className={logo.colored ? "kg-logo--color" : undefined} key={slug}><Image src={logo.src} width={logo.width} height={logo.height} alt={name} /></span>; })}</span></Card>
          <Card id="people" title="16+ people behind Kyte" onOpen={open} expanded={active === "people"}><span className="ag-people-photo"><video autoPlay muted loop playsInline preload="metadata" poster="/kyte-glance/varun-speaking-poster.jpg" aria-hidden="true"><source src="/kyte-glance/varun-speaking-4s.mp4" type="video/mp4" /></video></span><span className="ag-leaders">{team.map(({ name, role, image }) => <span key={name}><Image src={image} width={28} height={28} alt="" /><span><b>{name}</b><small>{role}</small></span></span>)}</span></Card>
          <Card id="sujan" title={content.sujan.title} onOpen={open} expanded={active === "sujan"}><Image className="ag-sujan-photo" src="/kyte-glance/aftrhrs-illustration.jpg" fill sizes="(max-width: 760px) 90vw, 32vw" alt="Illustrated character from aftrhrs' Instagram" /></Card>
        </div>
      </div>
    </section>
    {active && <Modal id={active} onClose={() => setActive(null)} />}
  </>;
}
