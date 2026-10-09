import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import { CaseStudyReveal } from "@/components/CaseStudyReveal";
import { SiteFooter } from "@/components/SiteFooter";
import "./collectbee.css";

export const metadata: Metadata = {
  title: "Collectbee case study | Kyte",
  description: "How Kyte designed and built a clear, product-led website for Collectbee's AI accounts receivable platform.",
};

const challenges = [
  ["Clarity", "Explain connected workflows without turning the site into a dense feature list."],
  ["Credibility", "Give finance teams enough product detail to evaluate an AI tool for trust-sensitive work."],
  ["Conversion", "Support a direct path to self-serve trials and enterprise sales conversations."],
] as const;

const objectives = [
  ["Positioning", "Frame Collectbee around the move from manual collections work to clearer, AI-assisted action."],
  ["Product proof", "Tie every capability to real product screens, workflows, and outcomes finance teams understand."],
  ["Scalability", "Create a modular website system that can hold new features, pricing, and product stories."],
] as const;

const featured = [
  ["Revenue Grid", "Making a data-heavy sales platform easier to understand.", "/kyte-work/revenue-grid.png"],
  ["Ogale Machines", "Turning industrial expertise into a focused website story.", "/kyte-work/ogale.png"],
  ["Banza", "Giving a new idea a distinctive visual presence.", "/kyte-work/banza.png"],
] as const;

function CaseStudyHeader() {
  return <header className="cs-header">
    <span>Product &amp; website design</span>
    <Link className="cs-header__brand" href="/" aria-label="Kyte home"><Image src="/kyte-mark.png" alt="" width={28} height={28} /><b>kyte</b></Link>
    <Link href="/work">Our work</Link>
  </header>;
}

export default function CollectbeeCaseStudy() {
  return <>
    <CaseStudyReveal />
    <CaseStudyHeader />
    <main className="case-study">
      <section className="cs-hero">
        <p className="cs-kicker cs-reveal">COLLECTBEE · AI ACCOUNTS RECEIVABLE</p>
        <h1 className="cs-reveal">Making AI-powered collections feel <span>clear, credible and ready to use.</span></h1>
        <div className="cs-tags cs-reveal" aria-label="Services provided">
          <span>WEBSITE EXPERIENCE</span><span>UX &amp; UI DESIGN</span><span>FRAMER DEVELOPMENT</span>
        </div>

        <div className="cs-overview cs-reveal">
          <div className="cs-overview__visual">
            <Image src="/kyte-work/collectbee.png" alt="Collectbee accounts receivable platform displayed on a tablet" fill priority sizes="(max-width: 760px) 100vw, 64vw" />
          </div>
          <aside className="cs-overview__aside" aria-label="Project overview">
            <details open>
              <summary>About the company <span><Plus size={18} /></span></summary>
              <p>Collectbee is an AI-powered accounts receivable platform designed to automate invoice processing, follow-ups, dispute resolution, and payment visibility for finance teams.</p>
            </details>
            <details>
              <summary>Overview <span><Plus size={18} /></span></summary>
              <p>Kyte designed and built a product-led Framer website that explains a technical platform through a clear problem-to-solution story.</p>
            </details>
            <details>
              <summary>Services <span><Plus size={18} /></span></summary>
              <p>Information architecture, website UX, interface design, responsive design, visual direction, and Framer development.</p>
            </details>
            <Link className="cs-connect" href="/contact">Let&apos;s connect <ArrowRight size={17} aria-hidden="true" /></Link>
          </aside>
        </div>
      </section>

      <section className="cs-vision">
        <div className="cs-chapter cs-reveal"><p>THE VISION</p><h2>Turn a complex automation platform into a clear digital experience that finance teams can understand and act on.</h2></div>
        <div className="cs-vision__gallery cs-reveal" aria-label="Collectbee visual direction">
          <div className="cs-poster cs-poster--copy"><span>Less chasing.<br />More clarity.</span><small>COLLECTBEE</small></div>
          <div className="cs-poster cs-poster--crop"><Image src="/kyte-work/collectbee.png" alt="" fill sizes="26vw" /></div>
          <div className="cs-poster cs-poster--quote"><span>Keep every invoice on track.</span><i aria-hidden="true">✦</i></div>
          <div className="cs-poster cs-poster--screen"><Image src="/kyte-work/collectbee-browser.png" alt="" fill sizes="26vw" /></div>
        </div>
      </section>

      <section className="cs-challenges cs-section">
        <div className="cs-chapter cs-reveal"><p>THE CHALLENGE</p><h2>Accounts receivable touches many workflows. The website had to explain each one without losing the bigger story.</h2></div>
        <div className="cs-challenge-grid cs-reveal">
          {challenges.map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
      </section>

      <section className="cs-concept cs-section">
        <div className="cs-concept__intro cs-reveal">
          <p>CORE CONCEPT</p>
          <h2>From manual work to a clear, guided flow.</h2>
          <div><p>We structured the story around the shift finance teams want to make: less manual data entry, fewer disconnected follow-ups, and a clearer view of every payment.</p><p>This idea shaped the page order, diagrams, product explanations, and calls to action.</p></div>
        </div>
        <div className="cs-flow cs-reveal" aria-label="Collectbee workflow illustration">
          <div className="cs-flow__input"><span>Invoices</span><span>Follow-ups</span><span>Payment data</span></div>
          <div className="cs-flow__lines" aria-hidden="true"><i /><i /><i /></div>
          <div className="cs-flow__core"><b>✦</b><span>Collectbee</span></div>
          <div className="cs-flow__lines cs-flow__lines--right" aria-hidden="true"><i /><i /><i /></div>
          <div className="cs-flow__output"><span>Validated data</span><span>Visible status</span><span>Next action</span></div>
        </div>
      </section>

      <section className="cs-identity cs-section">
        <div className="cs-identity__intro cs-reveal">
          <p>VISUAL SYSTEM</p>
          <h2>A dashboard-led language softened by one friendly, recognisable accent.</h2>
          <p>Product screens carry the proof. Generous space, restrained type, soft mint surfaces, and the Collectbee mark make a technical finance product feel easier to approach.</p>
        </div>
        <div className="cs-identity__mosaic cs-reveal">
          <div className="cs-identity__tile cs-identity__tile--mark"><span>✦</span><small>AI ASSISTED</small></div>
          <div className="cs-identity__tile cs-identity__tile--image"><Image src="/kyte-work/collectbee.png" alt="Collectbee platform interface" fill sizes="50vw" /></div>
          <div className="cs-identity__tile cs-identity__tile--type"><span>Aa</span><p>Clear information<br />Calm decisions</p></div>
        </div>
      </section>

      <section className="cs-objectives cs-section">
        <div className="cs-objectives__head cs-reveal"><p>STRATEGIC OBJECTIVE</p><h2>Three principles guided the website from structure to launch.</h2></div>
        <div className="cs-objectives__list cs-reveal">
          {objectives.map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
      </section>

      <section className="cs-website cs-section">
        <div className="cs-website__intro cs-reveal"><p>WEBSITE EXPERIENCE</p><h2>A story built around the decisions finance teams need to make.</h2><p>The experience moves from the manual problems teams know, into a guided explanation of how Collectbee works, product features, pricing, and a clear next step for trial or enterprise sales.</p></div>
        <div className="cs-website__hero cs-reveal"><Image src="/kyte-work/collectbee-browser.png" alt="Collectbee website shown in a desktop browser" fill sizes="94vw" /></div>
        <div className="cs-website__pair cs-reveal">
          <div><Image src="/kyte-work/collectbee.png" alt="Collectbee responsive website interface" fill sizes="48vw" /></div>
          <div className="cs-ui-card"><span>01</span><h3>Problem to solution</h3><p>Manual data entry and limited payment visibility lead into the platform&apos;s AI capabilities.</p><b>One clear story <ArrowUpRight size={18} /></b></div>
        </div>
      </section>

      <section className="cs-future">
        <div className="cs-future__copy cs-reveal"><p>THE RESULT</p><h2>A complete marketing website designed to make a complex product easier to understand.</h2><div><p>The final site gives product screens a central role and connects each feature to the finance workflow it supports.</p><p>Its modular structure is ready to support new capabilities, pricing, and product stories as Collectbee grows.</p></div></div>
        <div className="cs-future__art cs-reveal"><span>COLLECT</span><b>✦</b><span>CLARITY</span></div>
      </section>

      <section className="cs-team cs-section cs-reveal">
        <p>THE TEAM</p><h2>Kyte worked across strategy, UX, interface design, and Framer development to shape the experience end to end.</h2>
      </section>

      <section className="cs-featured cs-section">
        <div className="cs-featured__head cs-reveal"><p>FEATURED WORK</p><h2>More work built around clarity.</h2></div>
        <div className="cs-featured__track cs-reveal">
          {featured.map(([name, description, image]) => <Link href="/work" key={name}><div><Image src={image} alt="" fill sizes="(max-width: 760px) 82vw, 32vw" /></div><h3>{name}</h3><p>{description}</p></Link>)}
        </div>
      </section>

      <section className="cs-final-cta cs-reveal">
        <h2>Ready to <Link href="/contact">start</Link> a project?</h2>
        <p>Tell us what you&apos;re building and where you need clarity. We&apos;ll help you find the right next step.</p>
        <Link href="/contact">Let&apos;s connect <ArrowRight size={18} aria-hidden="true" /></Link>
      </section>
    </main>
    <SiteFooter showBanner={false} />
  </>;
}
