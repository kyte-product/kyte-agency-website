"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { clientTestimonials } from "./HomeTestimonials";
import "./ServiceTestimonials.css";

// Stock placeholders from Unsplash, to be replaced with approved client portraits.
const portraitPlaceholders = [
  "https://images.unsplash.com/photo-1581065178047-8ee15951ede6?auto=format&fit=crop&crop=faces&w=240&h=240&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&crop=faces&w=240&h=240&q=80",
  "https://images.unsplash.com/photo-1734434570358-21badf4ba1c6?auto=format&fit=crop&crop=faces&w=240&h=240&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&crop=faces&w=240&h=240&q=80",
] as const;

const sampleRatings = [
  ["4.8", "4.9", "4.9", "4.8"],
  ["4.9", "4.8", "4.8", "4.9"],
  ["4.8", "4.9", "4.7", "4.8"],
  ["4.9", "4.8", "4.9", "4.8"],
] as const;
const ratingLabels = ["Quality", "Collaboration", "Schedule", "Value"] as const;

export function ServiceTestimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  function goTo(index: number) {
    const next = Math.max(0, Math.min(clientTestimonials.length - 1, index));
    const track = trackRef.current;
    const card = track?.querySelectorAll<HTMLElement>(".service-testimonial")[next];
    if (track && card) track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
    setActiveIndex(next);
  }
  return <section className="service-testimonials" aria-labelledby="service-testimonials-title">
    <div className="service-testimonials__inner">
      <div className="service-testimonials__heading"><p className="eyebrow">Testimonials</p><h2 id="service-testimonials-title">What our clients say</h2></div>
      <div className="service-testimonials__controls" role="group" aria-label="Testimonial controls">
        <button type="button" aria-label="Previous testimonial" onClick={() => goTo(activeIndex - 1)} disabled={activeIndex === 0}><ArrowLeft size={20} aria-hidden="true" /></button>
        <button type="button" aria-label="Next testimonial" onClick={() => goTo(activeIndex + 1)} disabled={activeIndex === clientTestimonials.length - 1}><ArrowRight size={20} aria-hidden="true" /></button>
      </div>
      <div className="service-testimonials__track" ref={trackRef} aria-label="Client testimonials" onScroll={() => {
        const track = trackRef.current;
        if (!track) return;
        const cards = [...track.querySelectorAll<HTMLElement>(".service-testimonial")];
        const nearest = cards.reduce((best, card, index) => Math.abs(card.offsetLeft - track.scrollLeft) < Math.abs(cards[best].offsetLeft - track.scrollLeft) ? index : best, 0);
        setActiveIndex(nearest);
      }}>
        {clientTestimonials.map((testimonial, index) => {
          return <article className="service-testimonial" key={testimonial.name}>
            <div className="service-testimonial__story">
              <blockquote>“{testimonial.quote}”</blockquote>
              <div className="service-testimonial__person"><span className="service-testimonial__avatar"><Image src={portraitPlaceholders[index]} alt="" fill sizes="55px" unoptimized /></span><div><strong>{testimonial.name}</strong><span>{testimonial.role}</span></div></div>
            </div>
            <div className="service-testimonial__proof">
              <div className="service-testimonial__score-head"><span>Project feedback</span><strong><Star size={17} fill="currentColor" aria-hidden="true" /> 4.9</strong></div>
              <dl className="service-testimonial__ratings">{ratingLabels.map((label, ratingIndex) => <div key={label}><dt>{label}</dt><dd>{sampleRatings[index][ratingIndex]}</dd></div>)}</dl>
              <Link className="service-testimonial__case" href="/work/fincart" aria-label="Explore the separate Fincart case study"><span className="service-testimonial__case-image"><Image src="/fincart/fincart-phone-cover.png" alt="Fincart mobile app case study preview" fill sizes="80px" /></span><span><small>Explore a separate case study</small><strong>Fincart</strong></span><ArrowRight size={18} aria-hidden="true" /></Link>
            </div>
          </article>;
        })}
      </div>
    </div>
  </section>;
}
