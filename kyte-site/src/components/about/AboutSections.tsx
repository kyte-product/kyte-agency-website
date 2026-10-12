import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";
import { clientLogoAsset } from "@/data/clientLogoAssets";
import { aboutImpact, aboutTeams } from "./aboutContent";
import { PhilosophyReveal } from "./AboutMotion";
import { FincartImpactNumber } from "@/components/design-system/FincartImpactNumber";
import { AboutFocusFigure } from "./AboutFocusFigure";
import "./AboutSections.css";

const clientMarks = [
  ["fincart", "Fincart"], ["lovable", "Lovable"],
  ["district", "District"], ["red-rhino", "Red Rhino"],
] as const;
const toolMarks = [
  { name: "Figma", file: "figma" },
  { name: "Framer", file: "framer" },
  { name: "Adobe Creative Cloud", file: "adobe-creative-cloud" },
  { name: "Webflow", file: "webflow" },
  { name: "WordPress", file: "wordpress" },
  { name: "Sanity", file: "sanity" },
  { name: "Shopify", file: "shopify" },
  { name: "Next.js", file: "nextjs" },
  { name: "Ubersuggest", file: "ubersuggest", wordmark: true },
  { name: "Claude", file: "claude" },
  { name: "ChatGPT", file: "chatgpt", raster: true },
] as const;

export function AboutPhilosophy() {
  return <section className="about-philosophy" aria-labelledby="about-philosophy-label">
    <div className="about-section-inner">
      <p className="eyebrow" id="about-philosophy-label">Our philosophy</p>
      <PhilosophyReveal />
      <div className="about-philosophy__founder" data-about-reveal>
        <Image src="/team-images/ff98cefc-7213-4103-9472-0a3142e5b048.png" alt="" width={64} height={64} />
        <div><strong>Varun Padmanabhan</strong><span>Co-Founder, Kyte Agency</span></div>
        <a href="https://www.instagram.com/varun__padmanabhan/" target="_blank" rel="noopener noreferrer" aria-label="Varun Padmanabhan on Instagram"><span>80K Followers | 7M+ Monthly Impressions</span><Image src="/social-icons/instagram.png" alt="" width={22} height={22} /></a>
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
          <Image src="/kyte-agency-mark.png" alt="" width={38} height={38} className="about-glance__agency-mark" unoptimized />
          <div><h3>Kyte Agency</h3><p>We shape useful digital experiences and distinct brands, bringing research, design and communication into one clear direction.</p></div>
          <Link className="kyte-button kyte-button--outline" href="/contact">Start a project <ArrowRight size={17} aria-hidden="true" /></Link>
        </article>
        <article className="about-glance__card about-glance__tools" data-about-reveal>
          <h3>Tools &amp; platforms</h3><p>The right tools support the work, from an early prototype to a site or system a team can maintain.</p>
          <div className="about-glance__tool-window" aria-label="Tools used in Kyte projects"><div className="about-glance__tool-track">{[0, 1].map((copy) => <div className="about-glance__tool-group" key={copy} aria-hidden={copy === 1}>{toolMarks.map((tool) => <span className={`about-glance__tool--${tool.file}${"wordmark" in tool ? " about-glance__tool-wordmark" : ""}`} key={`${copy}-${tool.file}`}><Image src={"raster" in tool ? "/ai-logos/chatgpt.png" : `/tool-logos/${tool.file}.svg`} alt={"wordmark" in tool ? tool.name : ""} width={"wordmark" in tool ? 108 : 24} height={24} />{"wordmark" in tool ? null : tool.name}</span>)}</div>)}</div></div>
        </article>
        <article className="about-glance__card about-glance__focus" data-about-reveal><h3>Our focus</h3><p>Find the real problem, make the work clear, and keep improving it as we learn.</p><AboutFocusFigure /></article>
        <article className="about-glance__card about-glance__clients" data-about-reveal><div className="about-glance__clients-number">50<span>+</span></div><div><h3>Clients across domains</h3><p>Work across technology, fintech, consumer brands and more.</p></div></article>
        <div className="about-glance__logos" aria-label="Selected clients"><div className="about-glance__logo-track">{[0, 1, 2].map((copy) => <div className="about-glance__logo-group" key={copy} aria-hidden={copy !== 0}>{clientMarks.map(([slug, name]) => { const asset = clientLogoAsset(slug); return <span className={`about-glance__logo-slot about-glance__logo-slot--${slug}`} key={`${slug}-${copy}`}><Image src={asset.src} alt={copy === 0 ? name : ""} width={asset.width} height={asset.height} /></span>; })}</div>)}</div></div>
        <div className="about-glance__team" data-about-reveal><div className="about-glance__team-copy"><p className="eyebrow">Our team</p><h3>The people behind Kyte</h3></div><div className="about-glance__avatars" aria-label="Leadership: Varun, Pratham and Vedant, plus the rest of the team">{aboutTeams[0].people.map((person) => person.image ? <Image src={person.image} alt={person.name} width={42} height={42} key={person.name} /> : <span aria-label={person.name} key={person.name}>{person.name.slice(0, 1)}</span>)}<span aria-label={`${aboutTeams.reduce((total, group) => total + group.people.length, 0) - aboutTeams[0].people.length} more team members`}>+{aboutTeams.reduce((total, group) => total + group.people.length, 0) - aboutTeams[0].people.length}</span></div></div>
      </div>
    </div>
  </section>;
}

export function AboutImpact() {
  return <section className="about-impact" aria-labelledby="about-impact-title">
    <div className="about-section-inner about-impact__layout"><div className="about-impact__intro"><p className="eyebrow">The work in numbers</p><h2 id="about-impact-title">Our impact, in numbers.</h2><p>Results across product, brand, website and content projects.</p></div><div className="about-impact__cards">{aboutImpact.map((item, index) => <article className="about-impact__card" data-about-reveal key={item.description} style={{ "--card-delay": `${index * 90}ms`, "--step": index } as CSSProperties}><FincartImpactNumber value={item.value} suffix={item.suffix} /><p>{item.description}</p></article>)}</div></div>
  </section>;
}
