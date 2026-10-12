"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { RevealWords } from "./RevealWords";
import "./HomeTestimonials.css";

// Short excerpts were already published on the Kyte homepage.
// Source: https://www.kyte-agency.com/ (Testimonials, checked 12 October 2026).
const testimonials = [
  {
    quote: "Highly recommend kyte for outstanding design",
    name: "Vaishali Chitnis",
    role: "Founder, Spicy Tango",
  },
  {
    quote: "Professional, communicative, and efficient",
    name: "Gautami Raiker",
    role: "Co-Founder, Contractzy",
  },
  {
    quote: "Consistently delivered high-quality work on time",
    name: "Vikram Shastry",
    role: "CEO, Black Lotus",
  },
  {
    quote: "Exceeded our expectations",
    name: "Dr. Pooja Malhotra",
    role: "Cofounder, VNA Hospital",
  },
] as const;

function ScrollRevealQuote({ quote }: { quote: string }) {
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const words = quote.split(/\s+/);
  const [activeWords, setActiveWords] = useState(1);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!quoteRef.current) return;
        const rect = quoteRef.current.getBoundingClientRect();
        const travel = window.innerHeight + rect.height * .3;
        const progress = Math.min(1, Math.max(0, (window.innerHeight * .78 - rect.top) / travel));
        setActiveWords(Math.max(1, Math.ceil(progress * words.length)));
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, [quote, words.length]);

  return <blockquote ref={quoteRef} aria-label={quote}>{words.map((word, index) => <span className={index < activeWords ? "is-active" : ""} aria-hidden="true" key={`${word}-${index}`}>{word}{index < words.length - 1 ? " " : ""}</span>)}</blockquote>;
}

export function HomeTestimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(true);

  const updateControls = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCanGoBack(track.scrollLeft > 2);
    setCanGoForward(track.scrollLeft + track.clientWidth < track.scrollWidth - 2);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: 0, behavior: "instant" });
    updateControls();
    track.addEventListener("scroll", updateControls, { passive: true });
    const observer = new ResizeObserver(updateControls);
    observer.observe(track);
    return () => {
      track.removeEventListener("scroll", updateControls);
      observer.disconnect();
    };
  }, [updateControls]);

  function move(direction: -1 | 1) {
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>(".home-testimonial");
    if (!track || !card) return;
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: "smooth" });
  }

  return <section className="home-testimonials" aria-labelledby="home-testimonials-title">
    <div className="home-testimonials__inner">
      <div className="home-testimonials__heading">
        <div>
          <p className="eyebrow" data-reveal-words><RevealWords text="Client perspectives" /></p>
          <h2 id="home-testimonials-title" data-reveal-words data-reveal-delay="70"><RevealWords text="Good work, in their words." /></h2>
        </div>
        <p data-reveal-words data-reveal-delay="120"><RevealWords text="A few words from people and teams we have worked with." /></p>
      </div>

      <div className="home-testimonials__controls" aria-label="Testimonial carousel controls">
        <button type="button" aria-label="Previous testimonial" disabled={!canGoBack} onClick={() => move(-1)}><ArrowLeft size={19} strokeWidth={1.7} aria-hidden="true" /></button>
        <button type="button" aria-label="Next testimonial" disabled={!canGoForward} onClick={() => move(1)}><ArrowRight size={19} strokeWidth={1.7} aria-hidden="true" /></button>
      </div>

      <div className="home-testimonials__track" ref={trackRef} tabIndex={0} aria-label="Client testimonials">
        {testimonials.map((item) => <article className="home-testimonial" key={item.name}>
          <div className="home-testimonial__portrait" role="img" aria-label={`Placeholder for a future video testimonial from ${item.name}`}>
            <span>Client story</span>
            <strong>Video coming soon</strong>
          </div>
          <div className="home-testimonial__body">
            <span className="home-testimonial__mark" aria-hidden="true">“</span>
            <ScrollRevealQuote quote={item.quote} />
            <div className="home-testimonial__attribution">
              <span className="home-testimonial__logo-placeholder" aria-hidden="true" />
              <div className="home-testimonial__person"><strong>{item.name}</strong><span>{item.role}</span></div>
            </div>
          </div>
        </article>)}
      </div>
    </div>
  </section>;
}
