"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { moveCardCarousel } from "@/lib/card-carousel";
import { ProductDesignCardArt } from "./ProductDesignIllustrations";

const moments = [
  { title: "When the product is taking shape", body: "Turn an early idea into journeys people can understand, test, and use. Research and prototypes help the team decide what to build first." },
  { title: "When more people start using it", body: "Revisit onboarding, core tasks, and the design system as the audience grows. Small points of friction become more visible at scale." },
  { title: "When the work gets complex", body: "Bring clarity to dense information, roles, and workflows so customers and internal teams can make confident decisions." },
  { title: "When the experience needs to evolve", body: "Connect research, interface design, and implementation around a product that needs to move forward without losing what works." },
];

export function ProductDesignCarousel() {
  const track = useRef<HTMLDivElement>(null);
  const move = (direction: -1 | 1) => { if (track.current) moveCardCarousel(track.current, ".product-landing__moment", direction); };
  return <section className="product-landing__section product-landing__moments" aria-labelledby="product-moments-title">
    <div className="product-landing__section-head"><div><h2 id="product-moments-title">Design for the moments that move a product forward.</h2></div><div className="product-landing__carousel-controls carousel-arrow-controls"><button type="button" onClick={() => move(-1)} aria-label="Previous product design moments"><ArrowLeft size={20} /></button><button type="button" onClick={() => move(1)} aria-label="Next product design moments"><ArrowRight size={20} /></button></div></div>
    <div className="product-landing__carousel" ref={track}>{moments.map((moment, index) => <article className="product-landing__moment" key={moment.title}><ProductDesignCardArt scene={(["orbit", "dashboard", "complex", "evolution"] as const)[index]} /><div className="product-landing__moment-copy"><h3>{moment.title}</h3><p>{moment.body}</p></div></article>)}</div>
  </section>;
}
