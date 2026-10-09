import { ArrowRight } from "lucide-react";
import { LedMatrix } from "./LedMatrix";

export function Hero() {
  return <section className="hero" aria-labelledby="hero-title">
    <div className="hero__led" aria-hidden="true"><LedMatrix /></div>
    <div className="hero__inner">
      <p className="eyebrow">PRODUCT, WEBSITE &amp; BRAND DESIGN AGENCY</p>
      <h1 className="hero__title" id="hero-title"><span className="hero__title-line">Designing what</span><span className="hero__title-line">your <span className="hero__gradient">business needs</span></span><span className="hero__title-line">for the <span className="hero__gradient hero__gradient--second">next stage</span></span></h1>
      <p className="hero__body">We bring product, web and brand design together so people can understand, use and choose what you make.</p>
      <a className="hero__cta" href="#work-preview">Discover our work <ArrowRight size={15} aria-hidden="true" /></a>
    </div>
  </section>;
}
