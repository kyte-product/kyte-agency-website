import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { AboutGlance, AboutImpact, AboutPhilosophy } from "@/components/about/AboutSections";
import { AboutScrollMotion } from "@/components/about/AboutMotion";
import { aboutPeople } from "@/components/about/aboutContent";
import "./about.css";

export const metadata: Metadata = {
  title: "About Kyte | The people behind the work",
  description: "Meet the people behind Kyte's product, brand and communications work.",
};

export default function AboutPage() {
  return <>
    <SiteHeader />
    <main className="about-page">
      <AboutScrollMotion />
      <section className="about-page__hero" aria-labelledby="about-title">
        <div className="about-page__inner">
          <p className="eyebrow">About Kyte</p>
          <h1 id="about-title">The people behind the work<span>.</span></h1>
          <div className="about-page__hero-bottom">
            <p>We bring product, brand and communications work together around the people who will use it. Meet some of the team shaping that work at Kyte.</p>
            <Link href="/work">Explore our work <ArrowRight size={18} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <AboutPhilosophy />
      <AboutGlance />
      <AboutImpact />

      <section className="about-page__team" aria-labelledby="about-team-title">
        <div className="about-page__inner">
          <div className="about-page__section-head">
            <div><p className="eyebrow">The team</p><h2 id="about-team-title">Meet the people behind Kyte</h2></div>
            <p>A selection of the designers and creative leads behind our work.</p>
          </div>
          <div className="about-page__people">
            {aboutPeople.map((person) => <article className="about-page__person" key={person.name}>
              <div className="about-page__portrait"><Image src={person.image} alt={person.name} fill sizes="(max-width: 580px) 80vw, (max-width: 900px) 45vw, 22vw" /></div>
              <div className="about-page__person-copy"><h3>{person.name}</h3><p>{person.role}</p></div>
            </article>)}
          </div>
        </div>
      </section>
    </main>
    <SiteFooter />
  </>;
}
