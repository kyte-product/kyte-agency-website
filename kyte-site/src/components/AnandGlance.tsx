"use client";

import Image from "next/image";
import { ArrowUpRight, Check, Expand, X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import data from "@/data/anand-glance.json";
import mapDots from "@/data/anand-map-dots.json";
import "./AnandGlance.css";

type CardId = "global" | "revenue" | "companies" | "people" | "sujan";
type LinkItem = { label: string; href: string; primary?: boolean };
type ExtraItem = { img?: string; cover?: boolean; text?: string; link?: string; href?: string; name?: string; products?: string; logo?: string; url?: string; photo?: string; role?: string };
type Entry = {
  title: string;
  body: string;
  list: string[];
  ctas: LinkItem[];
  graphics: { left: { src?: string; caption?: string; type?: string }; right: { src: string; caption?: string }[] };
  map?: { hq: { x: number; y: number; label: string }; countries: { id: string; name: string; x: number; y: number; type: string; partners: string[][] }[] };
  extra: { type: "cards" | "directory" | "leaders"; title: string; items: ExtraItem[] };
  quote: { text: string; name: string; role?: string; logo?: string };
  footer: { title: string; ctas: LinkItem[] };
};

const entries = data as Record<CardId, Entry>;
const asset = (name: string) => `/anand-glance/${name}`;
const logos = ["Gabriel.png", "DANA.png", "Forvia.png", "mahle.png", "Henkel.png", "valeo.png", "Joyson.png", "HL_mando.png", "HL-Klemove.png", "SK_enmove.png", "Jinhap.png", "APAG.png", "CY_Myutec.png", "ANEVOLVE.png", "iPower.png"];
const leaders = [
  ["leader-deep-c-anand.jpg", "Deep C. Anand", "Founder"],
  ["leader-mahendra-goyal.jpg", "Mahendra K. Goyal", "CEO & MD"],
  ["leader-anjali-singh.jpg", "Anjali Singh", "Chairperson, Supervisory Board"],
  ["leader-jaisal-singh.jpg", "Jaisal Singh", "Vice Chairman, Executive Board"],
];
const partners = [["USA", "Dana, Joyson"], ["France", "Forvia, Valeo"], ["Germany", "Henkel, MAHLE"], ["South Korea", "HL Mando, HL Klemove"], ["Japan", "KYB, Yamaha"]];
const bars = [["Forvia", "29.5", "100%"], ["Valeo", "23.8", "80.7%"], ["Henkel", "23.3", "79%"], ["MAHLE", "13.9", "47.1%"], ["Dana", "10.3", "34.9%"]];

function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = canvas?.parentElement;
    const card = canvas?.closest(".ag-card");
    if (!canvas || !wrapper || !card) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hq: [number, number] = [28.6139, 77.209];
    const markers: { id: string; location: [number, number]; label?: string }[] = [
      { id: "hq", location: hq, label: "New Delhi" },
      { id: "usa", location: [41.56, -83.65], label: "USA" },
      { id: "fra", location: [48.8566, 2.3522], label: "France" },
      { id: "deu", location: [48.7758, 9.1829], label: "Germany" },
      { id: "che", location: [47.3769, 8.5417] },
      { id: "nld", location: [52.3676, 4.9041] },
      { id: "esp", location: [40.4168, -3.7038] },
      { id: "kor", location: [37.5665, 126.978], label: "Korea · Japan" },
      { id: "jpn", location: [35.6762, 139.6503] },
    ];
    let phi = Math.PI - (hq[1] * Math.PI / 180 - Math.PI / 2);
    let speed = reducedMotion ? 0 : 0.0025;
    let frame = 0;
    let width = 0;
    let generation = 0;
    let visible = true;
    let globe: { update: (options: { phi: number; theta: number }) => void; destroy: () => void } | undefined;
    let disposed = false;

    const enter = () => { if (!reducedMotion) speed = 0.006; };
    const leave = () => { if (!reducedMotion) speed = 0.0025; };
    card.addEventListener("mouseenter", enter);
    card.addEventListener("mouseleave", leave);
    const visibility = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    visibility.observe(wrapper);
    const labels = markers.filter((marker) => marker.label).map((marker) => {
      const label = document.createElement("span");
      label.className = `ag-cobe-label${marker.id === "hq" ? " ag-cobe-label--hq" : ""}`;
      label.textContent = marker.label ?? "";
      label.style.setProperty("position-anchor", `--cobe-${marker.id}`);
      label.style.opacity = `var(--cobe-visible-${marker.id}, 0)`;
      label.style.filter = `blur(calc((1 - var(--cobe-visible-${marker.id}, 0)) * 8px))`;
      wrapper.appendChild(label);
      return label;
    });

    const build = async () => {
      const size = Math.round(wrapper.clientWidth);
      if (!size || Math.abs(size - width) < 2) return;
      width = size;
      const currentGeneration = ++generation;
      if (frame) window.cancelAnimationFrame(frame);
      globe?.destroy();
      const { default: createGlobe } = await import("@/vendor/cobe");
      if (disposed || currentGeneration !== generation) return;
      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2), width: size, height: size, phi,
        theta: 0.22, opacity: 0.7, markerColor: [0, 0.68, 0.94], baseColor: [1, 1, 1],
        arcColor: [0, 0.68, 0.94], glowColor: [0.9, 0.95, 0.99], dark: 0,
        mapBrightness: 10, markerElevation: 0.01, arcWidth: 0.5,
        arcHeight: 0.25, diffuse: 1.5, mapSamples: 16000,
        markers: markers.map((marker) => ({ location: marker.location, size: 0.025, id: marker.id })),
        arcs: markers.filter((marker) => marker.id !== "hq").map((marker) => ({ from: hq, to: marker.location, id: `hq-${marker.id}` })),
      });
      canvas.style.opacity = "1";
      const tick = () => {
        if (visible && !document.hidden) {
          phi += speed;
          globe?.update({ phi, theta: 0.22 });
        }
        frame = window.requestAnimationFrame(tick);
      };
      tick();
    };
    const resize = new ResizeObserver(() => { void build(); });
    resize.observe(wrapper);
    void build();

    return () => {
      disposed = true;
      generation++;
      resize.disconnect();
      visibility.disconnect();
      card.removeEventListener("mouseenter", enter);
      card.removeEventListener("mouseleave", leave);
      if (frame) window.cancelAnimationFrame(frame);
      globe?.destroy();
      labels.forEach((label) => label.remove());
    };
  }, []);

  return <span className="ag-globe"><canvas ref={canvasRef} aria-hidden="true" /></span>;
}

function PartnerMap({ map }: { map: NonNullable<Entry["map"]> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const rows = mapDots.split("|").map((row) => row.split(",").map((run) => run.split("+").map(Number)));
    const draw = () => {
      const width = parent.clientWidth;
      if (!width) return;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(parent.clientHeight * ratio);
      const context = canvas.getContext("2d");
      if (!context) return;
      const step = width / 198 * ratio;
      context.fillStyle = "rgba(0,168,232,.4)";
      const radius = Math.max(0.22 * step, 0.8 * ratio);
      rows.forEach((runs, rowIndex) => {
        const y = rowIndex * 0.8660254 * step;
        runs.forEach(([start, count]) => {
          for (let index = 0; index < count; index++) {
            context.beginPath();
            context.arc((start / 2 + index) * step, y, radius, 0, Math.PI * 2);
            context.fill();
          }
        });
      });
    };
    const observer = new ResizeObserver(draw);
    observer.observe(parent);
    draw();
    return () => observer.disconnect();
  }, []);

  const selected = active === null ? null : map.countries[active];
  return <div className="ag-partner-map">
    <canvas ref={canvasRef} aria-hidden="true" />
    <svg viewBox="0 0 198 100" aria-label="Map of ANAND global partners">
      {map.countries.map((country, index) => {
        const curve = `M ${map.hq.x} ${map.hq.y} Q ${(map.hq.x + country.x) / 2} ${Math.min(map.hq.y, country.y) - 14} ${country.x} ${country.y}`;
        return <g key={country.id}><path className="ag-map-arc" d={curve} pathLength="1" style={{ animationDelay: `${index * 0.3}s` }} /><circle className="ag-map-marker" cx={country.x} cy={country.y} r="1.1" role="button" tabIndex={0} aria-label={`${country.name}: ${country.partners.map((partner) => partner[0]).join(", ")}`} onMouseEnter={() => setActive(index)} onMouseLeave={() => setActive(null)} onFocus={() => setActive(index)} onBlur={() => setActive(null)} onClick={() => setActive(active === index ? null : index)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setActive(active === index ? null : index); } }} /></g>;
      })}
      <circle cx={map.hq.x} cy={map.hq.y} r="1.5" fill="#00a8e8" />
    </svg>
    <span className="ag-map-hq" style={{ left: `${map.hq.x / 1.98}%`, top: `${map.hq.y}%` }}>{map.hq.label}</span>
    {selected && <div className="ag-map-tooltip" role="status" style={{ left: `${Math.min(74,Math.max(2,selected.x / 1.98))}%`, top: `${Math.max(4,selected.y - 6)}%` }}><strong>{selected.name}</strong><small>{selected.type === "jv" ? "Joint venture" : "Tech collaboration"}</small>{selected.partners.map((partner) => <span key={partner[0]}><Image src={asset(partner[1])} alt="" width={38} height={28} /><span><b>{partner[0]}</b>{partner[2] && <small>Revenue {partner[2]} · Employees {partner[3]}</small>}</span></span>)}</div>}
  </div>;
}

function DetailGraphic({ id, entry }: { id: CardId; entry: Entry }) {
  if (id === "global" && entry.map) return <PartnerMap map={entry.map} />;
  if (id === "revenue") return <div className="ag-detail-chart"><small>JV partners&apos; global revenue, US$ Bn (CY 2024)</small>{[["Forvia",29.5],["Valeo",23.8],["Henkel",23.3],["MAHLE",13.9],["Dana",10.3],["HL Mando",6.4],["Joyson",5],["SK Enmove",3.5],["HL Klemove",1.3],["Jinhap",.408]].map(([name, value]) => <span key={name}><b>{name}</b><i><em style={{ width: `${Number(value) / 29.5 * 100}%` }} /></i><small>{Number(value) < 1 ? `${Math.round(Number(value) * 1000)} Mn` : value}</small></span>)}</div>;
  if (id === "companies") return <div className="ag-detail-logos">{logos.map((logo) => <span key={logo}><Image src={asset(logo)} alt="" width={120} height={48} /></span>)}</div>;
  return null;
}

function Card({ id, title, large = false, children, onOpen, expanded }: { id: CardId; title: string; large?: boolean; children: ReactNode; onOpen: (id: CardId, opener: HTMLButtonElement) => void; expanded: boolean }) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const onPointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mouse-x", `${event.clientX - rect.left - rect.width / 2}px`);
    event.currentTarget.style.setProperty("--mouse-y", `${event.clientY - rect.top - rect.height / 2}px`);
  };

  return (
    <button ref={buttonRef} className={`ag-card ${large ? "ag-card--large" : "ag-card--small"} ag-card--${id}`} type="button" aria-haspopup="dialog" aria-expanded={expanded} aria-label={`${title}, open details`} onPointerMove={onPointerMove} onClick={() => { if (buttonRef.current) onOpen(id, buttonRef.current); }}>
      <span className="ag-card__entry" aria-hidden="true"><span><Expand size={14} strokeWidth={1.7} /></span></span>
      <span className="ag-card__text"><span className="ag-card__title">{title}</span></span>
      <span className="ag-card__border" aria-hidden="true"><span><span /></span></span>
      <span className="ag-card__inner"><span className="ag-card__content"><span className={`ag-graphic ag-graphic--${id}`}>{children}</span></span></span>
    </button>
  );
}

function Modal({ id, onClose }: { id: CardId; onClose: () => void }) {
  const entry = entries[id];
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => { dialogRef.current?.focus(); }, []);

  const keepFocusInside = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab" || !dialogRef.current) return;
    const controls = Array.from(dialogRef.current.querySelectorAll<HTMLElement>("button, a[href]"));
    if (!controls.length) return;
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <div className="ag-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="ag-dialog" role="dialog" aria-modal="true" aria-labelledby="ag-dialog-title" tabIndex={-1} ref={dialogRef} onKeyDown={keepFocusInside}>
        <button className="ag-dialog__close" type="button" aria-label="Close details" onClick={onClose}><X size={20} aria-hidden="true" /></button>
        <div className="ag-dialog__intro"><div><h2 id="ag-dialog-title">{entry.title}</h2><p>{entry.body}</p><div className="ag-dialog__actions">{entry.ctas.map((link) => <a href={link.href} key={link.label} className={link.primary ? "ag-dialog__primary" : "ag-dialog__secondary"} onClick={(event) => { if (link.href === "#") event.preventDefault(); }}>{link.label}{link.primary && <ArrowUpRight size={15} aria-hidden="true" />}</a>)}</div></div><ul>{entry.list.map((item) => <li key={item}><Check size={16} aria-hidden="true" />{item}</li>)}</ul></div>
        <div className="ag-dialog__visuals">
          {entry.graphics.left.src ? <div className="ag-dialog__visual"><Image src={entry.graphics.left.src} alt={entry.graphics.left.caption ?? ""} fill sizes="(max-width: 760px) 90vw, 55vw" /><span>{entry.graphics.left.caption}</span></div> : <div className="ag-dialog__visual ag-dialog__visual--abstract"><DetailGraphic id={id} entry={entry} />{entry.graphics.left.caption && <span>{entry.graphics.left.caption}</span>}</div>}
          {entry.graphics.right.length > 0 && <div className="ag-dialog__visuals-side">{entry.graphics.right.map((image) => <div className="ag-dialog__visual" key={image.src}><Image src={image.src} alt={image.caption ?? ""} fill sizes="(max-width: 760px) 90vw, 30vw" /><span>{image.caption}</span></div>)}</div>}
        </div>
        <section className={`ag-dialog__extra ag-dialog__extra--${entry.extra.type}`} aria-label={entry.extra.title}><h3>{entry.extra.title}</h3><div className="ag-dialog__extra-grid">{entry.extra.items.map((item, index) => <article key={`${item.name ?? item.link ?? "item"}-${index}`}>{item.img && <div className="ag-dialog__extra-image"><Image src={item.img} alt="" fill sizes="(max-width: 760px) 90vw, 26vw" /></div>}{item.logo && <div className="ag-dialog__extra-image"><Image src={item.logo} alt="" fill sizes="(max-width: 760px) 90vw, 26vw" /></div>}{item.photo && <div className="ag-dialog__extra-image"><Image src={item.photo} alt="" fill sizes="(max-width: 760px) 90vw, 26vw" /></div>}{item.name && <h4>{item.name}</h4>}{item.role && <small>{item.role}</small>}{item.text && <p>{item.text}</p>}{item.products && <p>{item.products}</p>}{(item.href || item.url) && <a href={item.href ?? item.url} onClick={(event) => { if ((item.href ?? item.url) === "#") event.preventDefault(); }}>{item.link ?? "View details"}<ArrowUpRight size={14} aria-hidden="true" /></a>}</article>)}</div></section>
        <div className="ag-dialog__quote"><blockquote>“{entry.quote.text}”</blockquote><p>{entry.quote.name}{entry.quote.role ? ` · ${entry.quote.role}` : ""}</p></div>
        <div className="ag-dialog__footer"><h3>{entry.footer.title}</h3><div className="ag-dialog__actions">{entry.footer.ctas.map((link) => <a href={link.href} key={link.label} className={link.primary ? "ag-dialog__primary" : "ag-dialog__secondary"} onClick={(event) => { if (link.href === "#") event.preventDefault(); }}>{link.label}</a>)}</div></div>
      </div>
    </div>
  );
}

export function AnandGlance() {
  const [active, setActive] = useState<CardId | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const elements = sectionRef.current?.querySelectorAll<HTMLElement>(".ag-reveal");
    if (!elements) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.15 });
    elements.forEach((element, index) => {
      element.style.transitionDelay = `${index * 60}ms`;
      observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setActive(null); };
    document.addEventListener("keydown", onEscape);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onEscape);
      opener.current?.focus();
    };
  }, [active]);

  const open = (id: CardId, button: HTMLButtonElement) => { opener.current = button; setActive(id); };

  return <>
    <section className="anand-glance" id="anand-glance" aria-labelledby="ag-title" ref={sectionRef}>
      <div className="ag-wrap">
        <div className="ag-head"><div className="ag-reveal"><p className="ag-eyebrow">ANAND at a glance</p><h2 id="ag-title">A Global Mobility Group, Built on Six Decades of Partnership</h2></div><p className="ag-lede ag-reveal">Seventeen automotive companies, 22,000+ people and world-class partners, working together to engineer the future of mobility.</p></div>
        <div className="ag-grid">
          <Card id="global" title="A Global Footprint, Rooted in India" large onOpen={open} expanded={active === "global"}>
            <i className="ag-glow ag-glow--a" /><i className="ag-glow ag-glow--b" /><Globe />
            <span className="ag-mini"><span className="ag-mini__tile"><small>Headquarters</small><strong>New Delhi</strong><em>India</em></span><span className="ag-mini__tile"><small>Locations</small><strong className="ag-mini__number">87</strong><em>across the Group</em></span><span className="ag-mini__tile ag-mini__tile--wide"><small>Partners around the world</small>{partners.map(([country, names]) => <span className="ag-mini__row" key={country}><span>{country}</span><span>{names}</span></span>)}</span></span>
          </Card>
          <Card id="revenue" title="US$2.2B+ in Group Revenue" onOpen={open} expanded={active === "revenue"}>
            <i className="ag-glow ag-glow--a" /><i className="ag-glow ag-glow--b" />
            <span className="ag-revenue"><span className="ag-revenue__head"><Image src={asset("logo.png")} width={105} height={22} alt="ANAND" /><span>CY 2024</span></span><span className="ag-revenue__stats"><span><b>8%</b>Return on sales target</span><span><b>11</b>Global JV partners</span></span><span className="ag-revenue__chart"><small>JV partners&apos; global revenue, US$ Bn</small>{bars.map(([name, value, width]) => <span className="ag-revenue__bar" key={name}><span>{name}</span><i><b style={{ width }} /></i><em>{value}</em></span>)}</span></span>
          </Card>
          <Card id="companies" title="17 Companies, One Unified Group" onOpen={open} expanded={active === "companies"}><span className="ag-logos">{[...logos, ...logos].map((logo, index) => <span key={`${logo}-${index}`}><Image src={asset(logo)} width={110} height={40} alt="" /></span>)}</span></Card>
          <Card id="people" title="22,000+ People, Led with Purpose" onOpen={open} expanded={active === "people"}><span className="ag-people-photo" /><span className="ag-leaders">{leaders.map(([photo, name, role]) => <span key={name}><Image src={asset(photo)} width={28} height={28} alt="" /><span><b>{name}</b><small>{role}</small></span></span>)}</span></Card>
          <Card id="sujan" title="Experiential Luxury, Rooted in Conservation" onOpen={open} expanded={active === "sujan"}><Image className="ag-sujan-photo" src={asset("sujan-leopard-rocks.jpg")} fill sizes="(max-width: 760px) 90vw, 32vw" alt="Leopard at SUJÁN Jawai" /><span className="ag-sujan-panel"><span className="ag-sujan-panel__head"><Image src={asset("sujan-wordmark-navy.svg")} width={90} height={22} alt="SUJÁN" /><small>Hospitality</small></span>{[["sujan-jawai.jpg", "SUJÁN Jawai", "Jawai Bandh"], ["sujan-the-serai.jpg", "SUJÁN The Serai", "Jaisalmer"], ["sujan-sher-bagh.jpg", "SUJÁN Sher Bagh", "Ranthambhore"]].map(([image, name, place]) => <span className="ag-sujan-panel__row" key={name}><Image src={asset(image)} width={40} height={40} alt="" /><span><b>{name}</b><small>{place}</small></span></span>)}</span></Card>
        </div>
      </div>
    </section>
    {active && <Modal id={active} onClose={() => setActive(null)} />}
  </>;
}
