import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ServiceCardFigure } from "./ServiceCardFigure";
import { RevealWords } from "./RevealWords";
import "./ServicesIntro.css";

export function ServicesIntro() {
  return (
    <section className="services-intro" id="services" aria-labelledby="services-intro-title">
      <div className="services-intro__inner">
        <p className="eyebrow" data-reveal-words><RevealWords text="Our services" /></p>
        <div className="services-intro__row">
          <h2 id="services-intro-title" data-reveal-words data-reveal-delay="90"><RevealWords text="Two expert departments, covering all your design, development, and marketing needs." /></h2>
          <Link className="kyte-button services-intro__cta" href="/contact">
            Request a consultation <ChevronRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="services-intro__cards">
          <div className="services-intro__card services-intro__card--interactive">
            <Link className="services-intro__card-link" href="/ui-ux-design-development">
              <span className="services-intro__card-heading">UI/UX Design &amp; Development</span>
              <span className="services-intro__card-description">Digital products and websites designed around how people use them.</span>
              <span className="services-intro__card-more">Explore Service <ChevronRight size={16} aria-hidden="true" /></span>
            </Link>
            <ServiceCardFigure kind="laptop" href="/ui-ux-design-development" />
          </div>
          <div className="services-intro__card services-intro__card--interactive">
            <Link className="services-intro__card-link" href="/branding-marketing">
              <span className="services-intro__card-heading">Branding &amp; Marketing</span>
              <span className="services-intro__card-description">A clear brand and the creative work that carries it into the world.</span>
              <span className="services-intro__card-more">Explore Service <ChevronRight size={16} aria-hidden="true" /></span>
            </Link>
            <ServiceCardFigure kind="riffle" href="/branding-marketing" />
          </div>
        </div>
      </div>
    </section>
  );
}
