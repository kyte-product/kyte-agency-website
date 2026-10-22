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
        <DepartmentCards />
      </div>
    </section>
  );
}

type DepartmentCard = { title: string; description: string; href?: string };
const departments: DepartmentCard[] = [
  { title: "UI/UX Design & Development", description: "Digital products and websites designed around how people use them.", href: "/ui-ux-design-development" },
  { title: "Branding & Marketing", description: "A clear brand and the creative work that carries it into the world.", href: "/branding-marketing" },
];

export function DepartmentCards({ cards = departments, patternSeed }: { cards?: DepartmentCard[]; patternSeed?: string }) {
  return <div className="services-intro__cards" data-site-reveal-ignore>
    {cards.map((card, index) => {
      const copy = <><span className="services-intro__card-heading">{card.title}</span><span className="services-intro__card-description">{card.description}</span></>;
      return <article key={card.title} className={`services-intro__card services-intro__card--${index === 0 ? "product" : "branding"} ${card.href ? "services-intro__card--interactive" : "services-intro__card--informative"}`}>
        {card.href ? <Link className="services-intro__card-link" href={card.href}>{copy}<span className="services-intro__card-more">Explore Service <ChevronRight size={16} aria-hidden="true" /></span></Link> : <div className="services-intro__card-copy">{copy}</div>}
        <DotPattern shape="field" tone={index === 0 ? "charcoal" : "white"} {...(patternSeed ? { seed: `${patternSeed}:${card.title}`, motifSlot: index } : { dotRadius: 1 })} className="services-intro__pattern" />
      </article>;
    })}
  </div>;
}
