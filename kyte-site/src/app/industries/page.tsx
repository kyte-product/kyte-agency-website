import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Landmark, Layers3, ShoppingBag, Utensils } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WorkShowcase } from "@/components/WorkShowcase";
import { TextRevealMotion } from "@/components/TextRevealMotion";
import { RevealWords } from "@/components/RevealWords";
import "./industries.css";

export const metadata: Metadata = {
  title: "Industries | Kyte Agency",
  description: "Explore how Kyte approaches design challenges across fintech, SaaS, ecommerce, and hospitality.",
};

const sectors = [
  {
    number: "01",
    title: "Fintech",
    href: "/industries/fintech",
    icon: Landmark,
    summary: "Make financial products easier to understand and use, from first decisions to everyday money tasks.",
    challenge: "Clarity, confidence, and trust across complex financial flows.",
    services: ["Product design", "UX research", "Mobile apps"],
  },
  {
    number: "02",
    title: "SaaS & Startups",
    href: "/industries/saas-startups",
    icon: Layers3,
    summary: "Turn complex software into focused workflows that help people get useful work done as products grow.",
    challenge: "Making powerful tools feel clear, coherent, and ready to scale.",
    services: ["SaaS design", "Design systems", "Websites"],
  },
  {
    number: "03",
    title: "D2C & eCommerce",
    href: "/industries/d2c-ecommerce",
    icon: ShoppingBag,
    summary: "Connect brand, product discovery, and checkout into a shopping experience that works across screens.",
    challenge: "Helping people find the right product and move through purchase with confidence.",
    services: ["eCommerce", "Brand identity", "Digital campaigns"],
  },
  {
    number: "04",
    title: "Hospitality & Food",
    href: "/industries/hospitality-food-beverage",
    icon: Utensils,
    summary: "Bring the promise of a place, meal, or stay into the moments people discover, book, order, and return.",
    challenge: "Keeping the experience memorable while making each practical step easy.",
    services: ["Brand design", "Websites", "Content"],
  },
] as const;

export default function IndustriesPage() {
  return <><SiteHeader /><main className="industries-page">
    <TextRevealMotion />
    <section className="industries-hero" aria-labelledby="industries-title">
      <div className="industries-hero__inner">

        <h1 id="industries-title" data-reveal-words data-reveal-delay="80"><RevealWords text="Design shaped around the work your industry does." /></h1>
        <p className="industries-hero__intro">Every market has its own users, decisions, and constraints. We bring product, web, and brand design together around the details that matter in yours.</p>
        <Link className="industries-hero__link" href="#industry-directory">Explore industries <ArrowRight size={17} aria-hidden="true" /></Link>
      </div>
    </section>

    <section className="industry-directory" id="industry-directory" aria-labelledby="industry-directory-title">
      <div className="industry-directory__inner">
        <div className="industry-directory__heading">
          <div><h2 id="industry-directory-title">Different contexts. Thoughtful design.</h2></div>
          <p>Start with the challenges your customers and teams face. Then explore the services that can help address them.</p>
        </div>
        <div className="industry-directory__grid">
          {sectors.map(({ number, title, href, icon: Icon, summary, challenge, services }) => <article className="industry-card" key={href}>
            <div className="industry-card__top"><span className="industry-card__icon"><Icon size={23} strokeWidth={1.55} aria-hidden="true" /></span><span className="industry-card__number">{number}</span></div>
            <h3>{title}</h3>
            <p className="industry-card__summary">{summary}</p>
            <div className="industry-card__detail"><span>Design focus</span><p>{challenge}</p></div>
            <ul aria-label={`Relevant services for ${title}`}>{services.map(service => <li key={service}>{service}</li>)}</ul>
            <Link className="industry-card__link" href={href}>Explore {title} <ArrowRight size={16} aria-hidden="true" /></Link>
          </article>)}
        </div>
      </div>
    </section>

    <WorkShowcase />
  </main><SiteFooter /></>;
}
