import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { CSSProperties } from "react";
import { clientLogoAsset } from "@/data/clientLogoAssets";
import { aboutImpact, aboutPeople } from "./aboutContent";
import { ImpactNumber, PhilosophyReveal } from "./AboutMotion";
import "./AboutSections.css";

const clientMarks = [
  ["fincart", "Fincart"], ["lovable", "Lovable"], ["emergent", "Emergent"],
  ["jio-hotstar", "JioHotstar"], ["district", "District"], ["daily-objects", "Daily Objects"],
] as const;

export function AboutPhilosophy() {
  return <section className="about-philosophy" aria-labelledby="about-philosophy-label" data-nav-theme="dark">
    <div className="about-section-inner">
      <p className="eyebrow" id="about-philosophy-label">Our philosophy</p>
      <PhilosophyReveal />
      <div className="about-philosophy__founder" data-about-reveal>
        <Image src="/kyte-glance/varun.png" alt="" width={64} height={64} />
        <div><strong>Varun Padmanabhan</strong><span>Co-Founder, Kyte Agency</span></div>
        <a href="https://www.instagram.com/varun__padmanabhan/" target="_blank" rel="noreferrer">Meet Varun <ArrowUpRight size={17} aria-hidden="true" /></a>
      </div>
    </div>
  </section>;
}

export function AboutGlance() {
  return <section className="about-glance" aria-labelledby="about-glance-title">
    <div className="about-section-inner">
      <div className="about-glance__heading"><p className="eyebrow">At a glance</p><h2 id="about-glance-title">One team, connected around the work.</h2><p>From first questions to a finished product, identity or campaign, different disciplines work from the same brief.</p></div>
      <div className="about-glance__grid">
        <article className="about-glance__card about-glance__agency" data-about-reveal>
          <Image className="about-glance__mark" src="/kyte-motion-mark.svg" alt="" width={125} height={125} />
          <div><h3>Kyte Agency</h3><p>We shape useful digital experiences and distinct brands, bringing research, design and communication into one clear direction.</p></div>
          <Link className="kyte-button" href="/contact">Start a project <ArrowRight size={17} aria-hidden="true" /></Link>
        </article>
        <article className="about-glance__card about-glance__tools" data-about-reveal>
          <h3>Tools &amp; platforms</h3><p>The right tools support the work, from an early prototype to a site or system a team can maintain.</p>
          <div className="about-glance__tool-window" aria-label="Tools used in Kyte projects"><div className="about-glance__tool-track">{["Figma", "Framer", "Sanity", "Shopify", "Next.js", "Figma", "Framer", "Sanity", "Shopify", "Next.js"].map((tool, index) => <span key={`${tool}-${index}`} aria-hidden={index > 4}>{tool}</span>)}</div></div>
        </article>
        <article className="about-glance__card about-glance__focus" data-about-reveal><h3>Our focus</h3><p>Find the real problem, make the work clear, and keep improving it as we learn.</p><span aria-hidden="true" /></article>
        <article className="about-glance__card about-glance__clients" data-about-reveal><div className="about-glance__clients-number">50<span>+</span></div><Image src="/kyte-motion-mark.svg" alt="" width={96} height={96} /><div><h3>Clients across domains</h3><p>Work across technology, fintech, consumer brands and more.</p></div></article>
        <div className="about-glance__logos" aria-label="Selected clients"><div className="about-glance__logo-track">{[...clientMarks, ...clientMarks].map(([slug, name], index) => { const asset = clientLogoAsset(slug); return <Image key={`${slug}-${index}`} src={asset.src} alt={index < clientMarks.length ? name : ""} width={asset.width} height={asset.height} />; })}</div></div>
        <div className="about-glance__team" data-about-reveal><div className="about-glance__avatars">{aboutPeople.slice(0, 3).map((person) => <Image src={person.image} alt="" width={42} height={42} key={person.name} />)}</div><div><h3>The people behind Kyte</h3><p>Designers and creative leads working across disciplines.</p></div><Link href="#about-team-title">View team <ArrowRight size={17} aria-hidden="true" /></Link></div>
      </div>
    </div>
  </section>;
}

export function AboutImpact() {
  return <section className="about-impact" aria-labelledby="about-impact-title" data-nav-theme="dark">
    <div className="about-section-inner about-impact__layout"><div className="about-impact__intro"><p className="eyebrow">The work in numbers</p><h2 id="about-impact-title">Our impact,<br />in numbers.</h2><p>Results across product, brand, website and content projects.</p></div><div className="about-impact__cards">{aboutImpact.map((item, index) => <article className="about-impact__card" data-about-reveal key={item.description} style={{ "--card-offset": `${index * 6}%` } as CSSProperties}><strong><ImpactNumber value={item.value} suffix={item.suffix} /></strong><p>{item.description}</p></article>)}</div></div>
  </section>;
}
