import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { RevealWords } from "./RevealWords";
import { DotPattern } from "./ui/DotPattern";
import "./ServicesIntro.css";

export function ServicesIntro() {
  return (
    <section className="services-intro" id="services" aria-labelledby="services-intro-title">
      <div className="services-intro__inner">

        <div className="services-intro__row" data-site-reveal-ignore>
          <h2 id="services-intro-title" data-reveal-words data-reveal-delay="90"><RevealWords text="Two Expert Departments" /></h2>
          <Link className="kyte-button services-intro__cta" href="/contact">
            Request a consultation <ChevronRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="services-intro__cards" data-site-reveal-ignore>
          <div className="services-intro__card services-intro__card--interactive services-intro__card--product">
            <Link className="services-intro__card-link" href="/ui-ux-design-development">
              <span className="services-intro__card-heading">UI/UX Design &amp; Development</span>
              <span className="services-intro__card-description">Digital products and websites designed around how people use them.</span>
              <span className="services-intro__card-more">Explore Service <ChevronRight size={16} aria-hidden="true" /></span>
            </Link>
            <DotPattern shape="field" tone="charcoal" className="services-intro__pattern" />
          </div>
          <div className="services-intro__card services-intro__card--interactive services-intro__card--branding">
            <Link className="services-intro__card-link" href="/branding-marketing">
              <span className="services-intro__card-heading">Branding &amp; Marketing</span>
              <span className="services-intro__card-description">A clear brand and the creative work that carries it into the world.</span>
              <span className="services-intro__card-more">Explore Service <ChevronRight size={16} aria-hidden="true" /></span>
            </Link>
            <DotPattern shape="field" tone="white" className="services-intro__pattern" />
          </div>
        </div>
      </div>
    </section>
  );
}
