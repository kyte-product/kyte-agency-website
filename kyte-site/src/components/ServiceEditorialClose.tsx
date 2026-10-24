"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FlightKite } from "./branding/FlightKite";
import { ServicePixelImage } from "./branding/ServicePixelImage";
import { BrandingFooter } from "./branding/BrandingFooter";
import { BrandHomePortal } from "./branding/BrandHomePortal";
import "./ServiceEditorialClose.css";

const services = [
  { title: "Brand Strategy & Identity", href: "/branding-marketing/brand-strategy-identity", image: "/branding-supplied/gradient-shapes.webp" },
  { title: "Graphic Design", href: "/branding-marketing/graphic-design", image: "/branding-supplied/pixel-ribbons.webp" },
  { title: "Video & Motion Graphics", href: "/branding-marketing/video-production-motion-graphics", image: "/branding-supplied/solimar.webp" },
  { title: "Social Media Marketing", href: "/branding-marketing/social-media-marketing", image: "/branding-supplied/web-archive.webp" },
  { title: "SEO & AI Search Optimisation", href: "/branding-marketing/seo-ai-search-optimisation", image: "/branding-supplied/lime-diagram.webp" },
] as const;

function ServiceRow({ service }: { service: typeof services[number] }) {
  const [active, setActive] = useState(false);
  const words = service.title.split(" ");
  const midpoint = Math.ceil(words.length / 2);
  return <Link className="service-editorial__row" href={service.href} aria-label={service.title}
    onPointerEnter={() => setActive(true)} onPointerLeave={() => setActive(false)}
    onFocus={() => setActive(true)} onBlur={() => setActive(false)}
    >
    <span className="service-editorial__title" aria-hidden="true">
      <span>{words.slice(0, midpoint).join(" ")}</span>
      <span className="service-editorial__preview"><span><ServicePixelImage src={service.image} active={active} /></span></span>
      <span>{words.slice(midpoint).join(" ")}</span>
    </span>
  </Link>;
}

export function ServiceEditorialDirectory() {
  return <section className="service-editorial" aria-labelledby="service-editorial-title" data-site-reveal-ignore>
    <div className="service-editorial__inner">
      <h2 id="service-editorial-title">Our Creative Services</h2>
      <div className="service-editorial__list">{services.map(service => <ServiceRow key={service.href} service={service} />)}</div>
    </div>
  </section>;
}

const flightPhrase = "Are you ready to fly with us?";
const clamp = (n: number) => Math.max(0, Math.min(1, n));
const noise = (i: number) => { const n = Math.sin(i * 127.1 + 41.7) * 43758.5453; return n - Math.floor(n); };
const ease = (n: number) => n * n * (3 - 2 * n);
// Three keyframes from the user's StickyAnimatedText component and property values.
const keyframes = (t: number, from: number, bounce: number) => t < .7
  ? from + (bounce - from) * (t / .7)
  : bounce * (1 - (t - .7) / .3);

export function ServiceFlightCta() {
  const sectionRef = useRef<HTMLElement>(null);
  const closingRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(-1);
  useEffect(() => {
    const section = sectionRef.current;
    const closing = closingRef.current;
    if (!section || !closing) return;
    const track = section.querySelector<HTMLElement>(".service-flight__track")!;
    const letters = Array.from(track.children) as HTMLElement[];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0, previous = 0, current = 0, target = 0;
    let handoff = 0, inRange = false;
    let offsets: number[] = [];
    const measureLetters = () => {
      offsets = letters.map(letter => letter.offsetLeft);
    };
    const render = () => {
      const h = window.innerHeight;
      const p = clamp(current);
      progressRef.current = inRange && !reduced.matches ? p + handoff : -1;
      const travel = clamp(p / .86);
      const distance = window.innerWidth + 300 + track.offsetWidth + 100;
      const trackX = window.innerWidth + 300 - travel * distance;
      track.style.transform = reduced.matches ? "none" : `translate3d(${trackX}px,0,0)`;
      letters.forEach((letter, i) => {
        // Match the supplied pattern: top, center, bottom, center, with sparse swaps.
        let direction = i % 2 ? 0 : (i % 4 === 0 ? -1 : 1);
        if (direction && noise(i + 21) < .1) direction *= -1;
        const end = (window.innerWidth + 300 + offsets[i] - window.innerWidth / 2) / distance;
        // A rolling window prevents later words from settling before they arrive.
        const start = Math.max(0, end - Math.min(.5, window.innerWidth * .65 / distance));
        const t = clamp((travel - start) / Math.max(.001, end - start));
        const y = direction ? keyframes(t, direction * 64, -direction * 12) : 0;
        const rotation = direction ? keyframes(t, 9, -3) : 0;
        letter.style.transform = reduced.matches ? "none" : `translate3d(0,${y}px,0) rotate(${rotation}deg)`;
      });
      // Enter halfway through the text pass and keep descending through the footer boundary.
      const descent = (p - .4) / .42;
      const y = (-.5 + descent * 1.7) * h;
      closing.style.setProperty("--kite-y", `${y}px`);
      closing.style.setProperty("--kite-opacity", `${inRange && p < .85 ? ease(clamp((p - .4) / .055)) : 0}`);
    };
    const tick = (now: number) => {
      frame = 0;
      const dt = previous ? Math.min(64, now - previous) : 16;
      previous = now;
      current = reduced.matches ? target : current + (target - current) * (1 - Math.exp(-dt / 150));
      if (Math.abs(target - current) < .000025) current = target;
      render();
      if (current !== target) frame = requestAnimationFrame(tick);
    };
    const request = () => {
      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, section.offsetHeight - window.innerHeight);
      target = clamp(-rect.top / travel);
      handoff = clamp((-rect.top - travel) / window.innerHeight);
      inRange = rect.top < window.innerHeight && closing.getBoundingClientRect().bottom > 0;
      if (!frame) { previous = 0; frame = requestAnimationFrame(tick); }
    };
    const resize = () => { measureLetters(); request(); };
    measureLetters(); request();
    document.fonts.ready.then(() => { if (section.isConnected) resize(); });
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", resize);
    reduced.addEventListener("change", request);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", request); window.removeEventListener("resize", resize); reduced.removeEventListener("change", request); };
  }, []);
  return <><div ref={closingRef} className="brand-closing" data-site-reveal-ignore>
    <section ref={sectionRef} className="service-flight" aria-labelledby="service-flight-title">
      <h2 id="service-flight-title" className="service-flight__sr-only">{flightPhrase}</h2>
      <div className="service-flight__sticky"><div className="service-flight__track" aria-hidden="true">{Array.from(flightPhrase).map((letter, i) => <span key={i}>{letter === " " ? "\u00a0" : letter}</span>)}</div></div>
    </section>
    <BrandingFooter />
    <div className="service-flight__kite" aria-hidden="true"><FlightKite progressRef={progressRef} /></div>
  </div><BrandHomePortal /></>;
}
