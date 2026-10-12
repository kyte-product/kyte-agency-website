"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { RevealWords } from "./RevealWords";
import "./HomeTestimonials.css";

// Short excerpts and portraits were already published on the Kyte homepage.
// Source: https://www.kyte-agency.com/ (Testimonials, checked 12 October 2026).
const testimonials = [
  {
    quote: "Highly recommend kyte for outstanding design",
    context: "Visuals for Spicy Tango’s social channels and product packaging.",
    name: "Vaishali Chitnis",
    role: "Founder, Spicy Tango",
    image: "/testimonials/vaishali-chitnis.jpg",
    imageAlt: "Vaishali Chitnis with Spicy Tango products",
  },
  {
    quote: "Professional, communicative, and efficient",
    context: "A rebrand from The Legal Capsule to Contractzy, with identity and web design.",
    name: "Gautami Raiker",
    role: "Co-Founder, Contractzy",
    image: "/testimonials/gautami-raiker.jpg",
    imageAlt: "Portrait of Gautami Raiker",
  },
  {
    quote: "Consistently delivered high-quality work on time",
    context: "Social and search advertising work for Black Lotus.",
    name: "Vikram Shastry",
    role: "CEO, Black Lotus",
    image: "/testimonials/vikram-shastry.jpg",
    imageAlt: "Portrait of Vikram Shastry",
  },
  {
    quote: "Exceeded our expectations",
    context: "Brochures, flyers and marketing materials for VNA Hospital.",
    name: "Dr. Pooja Malhotra",
    role: "Cofounder, VNA Hospital",
    image: "/testimonials/pooja-malhotra.png",
    imageAlt: "Portrait of Dr. Pooja Malhotra",
  },
] as const;

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
          <div className="home-testimonial__portrait">
            <Image src={item.image} alt={item.imageAlt} fill sizes="(max-width: 700px) 88vw, 410px" />
          </div>
          <div className="home-testimonial__body">
            <span className="home-testimonial__mark" aria-hidden="true">“</span>
            <blockquote>{item.quote}</blockquote>
            <p className="home-testimonial__context">{item.context}</p>
            <div className="home-testimonial__person"><strong>{item.name}</strong><span>{item.role}</span></div>
          </div>
        </article>)}
      </div>
    </div>
  </section>;
}
