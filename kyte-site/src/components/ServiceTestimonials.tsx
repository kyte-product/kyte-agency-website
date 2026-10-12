"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { clientTestimonials } from "./HomeTestimonials";
import "./ServiceTestimonials.css";

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
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  function goTo(index: number) {
    const next = Math.max(0, Math.min(clientTestimonials.length - 1, index));
    trackRef.current?.querySelectorAll<HTMLElement>(".service-testimonial")[next]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
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
          const initials = testimonial.name.split(/\s+/).map((part) => part[0]).slice(0, 2).join("");
          const expanded = expandedIndex === index;
          return <article className="service-testimonial" key={testimonial.name}>
            <div className="service-testimonial__story">
              <span className="service-testimonial__count">{index + 1} <span>/ {clientTestimonials.length}</span></span>
              <blockquote className={expanded ? "is-expanded" : ""}>“{testimonial.quote}”</blockquote>
              <button className="service-testimonial__read-more" type="button" aria-expanded={expanded} onClick={() => setExpandedIndex(expanded ? null : index)}>{expanded ? "Collapse −" : "Read more +"}</button>
              <div className="service-testimonial__person"><span className="service-testimonial__avatar" aria-hidden="true">{initials}</span><div><strong>{testimonial.name}</strong><span>{testimonial.role}</span></div></div>
            </div>
            <div className="service-testimonial__proof">
              <div className="service-testimonial__score-head"><span>Project feedback</span><strong><Star size={17} fill="currentColor" aria-hidden="true" /> 4.9</strong></div>
              <span className="service-testimonial__sample">Sample ratings pending client verification</span>
              <dl className="service-testimonial__ratings">{ratingLabels.map((label, ratingIndex) => <div key={label}><dt>{label}</dt><dd>{sampleRatings[index][ratingIndex]}</dd></div>)}</dl>
              <Link className="service-testimonial__case" href="/work/fincart" aria-label="Explore the Fincart case study"><span className="service-testimonial__case-image"><Image src="/fincart/fincart-phone-cover.png" alt="Fincart mobile app case study preview" fill sizes="80px" /></span><span><small>Selected case study</small><strong>Fincart</strong></span><ArrowRight size={18} aria-hidden="true" /></Link>
            </div>
          </article>;
        })}
      </div>
    </div>
  </section>;
}
