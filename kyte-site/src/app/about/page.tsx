import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { AboutImpact, AboutPhilosophy } from "@/components/about/AboutSections";
import { AboutScrollMotion } from "@/components/about/AboutMotion";
import { AboutTeamShowcase } from "@/components/about/AboutTeamShowcase";
import { aboutTeams } from "@/components/about/aboutContent";
import "./about.css";

export const metadata: Metadata = {
  title: "About Kyte | The people behind the work",
  description: "Meet the people behind Kyte's product design, branding and marketing work.",
};

export default function AboutPage() {
  const headlinePortraits = {
    firstPortrait: { url: "/team-images/0392e3a4-d611-45e0-83f2-089bb0035181.png", alt: "Mahir Malde of Kyte" },
    secondPortrait: { url: "/team-images/riya.jpg", alt: "Riya Pathak of Kyte" },
  };
  return <>
    <SiteHeader />
    <main className="about-page">
      <AboutScrollMotion />
      <section className="about-page__hero" aria-labelledby="about-title">
        <div className="about-page__inner">
          <p className="eyebrow">About Kyte</p>
          <h1 id="about-title"><span className="about-page__headline-line">The people <span className="about-page__headline-portrait"><Image src={headlinePortraits.firstPortrait.url} alt="" fill sizes="(max-width: 580px) 44px, 96px" unoptimized /></span></span><span className="about-page__headline-line">behind <span className="about-page__headline-portrait"><Image src={headlinePortraits.secondPortrait.url} alt="" fill sizes="(max-width: 580px) 44px, 96px" unoptimized /></span> <span className="about-page__headline-accent">the work.</span></span></h1>
          <div className="about-page__hero-bottom">
            <p>We bring product design, branding and marketing work together around the people who will use it. Meet some of the team shaping that work at Kyte.</p>
            <Link className="kyte-button" href="/work">Explore our work <ArrowRight size={18} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <AboutTeamShowcase />

      <AboutPhilosophy />
      <AboutImpact />

      <section className="about-page__team" aria-labelledby="about-team-title">
        <div className="about-page__inner">
          <div className="about-page__section-head">
            <div><p className="eyebrow">The team</p><h2 id="about-team-title">Meet the people behind Kyte</h2></div>
            <p>Meet the people working across Kyte&apos;s leadership, product and branding teams.</p>
          </div>
          {aboutTeams.map((team, index) => <section className="about-page__team-group" aria-labelledby={`about-team-${index}`} key={team.title}>
            <div className="about-page__team-group-heading"><h3 id={`about-team-${index}`}>{team.title}</h3></div>
            <div className="about-page__people">
              {team.people.map((person) => <article className="about-page__person" key={person.name}>
                <div className="about-page__portrait">{person.image ? <Image src={person.image} alt="" fill sizes="(max-width: 580px) 44vw, (max-width: 900px) 44vw, 23vw" /> : <span aria-hidden="true">{person.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}</span>}</div>
                <div className="about-page__person-copy"><h4>{person.name}</h4><p>{person.role}</p></div>
              </article>)}
              {team.title === "Branding & Marketing Team" && <article className="about-page__service-extra"><Image src="/kyte-agency-mark.png" alt="" width={42} height={42} className="about-page__service-mark" unoptimized /><p className="eyebrow">Branding &amp; marketing</p><h4>Explore how we build brands people recognize.</h4><Link className="kyte-button" href="/branding-marketing">See our approach <ArrowRight size={17} aria-hidden="true" /></Link></article>}
            </div>
          </section>)}
        </div>
      </section>
    </main>
    <SiteFooter />
  </>;
}
