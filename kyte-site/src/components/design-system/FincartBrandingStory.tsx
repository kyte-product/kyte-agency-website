import Image from "next/image";
import { RevealWords } from "@/components/RevealWords";
import { FincartBrandingMotion } from "./FincartBrandingMotion";
import "./FincartStory.css";

function Statement({ label, children, body = [], className = "" }: { label: string; children: string; body?: string[]; className?: string }) {
  const copy = [children, ...body].join(" ");

  return <div className={`fincart-brand-story__statement ${className}`}>
    <h2 className="fincart-brand-story__label" data-reveal-words><RevealWords text={label} /></h2>
    <div className="fincart-brand-story__copy">
      <p data-reveal-words data-reveal-continuous><RevealWords text={copy} /></p>
    </div>
  </div>;
}

function Still({ label, src, width, height, className = "", sizes = "(max-width: 760px) 100vw, 90vw" }: { label: string; src: string; width: number; height: number; className?: string; sizes?: string }) {
  return <figure className={`fincart-brand-story__media ${className}`} data-fincart-image-reveal>
    <Image src={src} alt={label} width={width} height={height} sizes={sizes} />
  </figure>;
}

function Motion({ label, src, className = "" }: { label: string; src: string; className?: string }) {
  return <figure className={`fincart-brand-story__media fincart-brand-story__video ${className}`} data-fincart-image-reveal>
    <video src={src} aria-label={label} data-fincart-motion loop muted playsInline preload="metadata" />
  </figure>;
}

function HtmlExperience({ title, src, className = "" }: { title: string; src: string; className?: string }) {
  return <figure className={`fincart-brand-story__media fincart-brand-story__html ${className}`} data-fincart-image-reveal>
    <iframe src={src} title={title} loading="lazy" data-fincart-motion-frame />
  </figure>;
}

export function FincartBrandingStory() {
  return <div className="fincart-brand-story">
    <section className="fincart-brand-story__opening">
      <Statement
        label="The brief"
        className="fincart-brand-story__statement--wide"
        body={[
          "Fincart helps people connect their money to life goals through financial planning, investing, a mobile app, and access to qualified wealth managers. The brand and website needed to explain that range in a way that felt clear, useful, and easy to navigate.",
          "This draft brings the supplied identity system, current website experience, and existing Fincart product story into one working case study. Client-approved results will be added before publication."
        ]}
      >Build one coherent experience around financial clarity, guidance, and long-term progress.</Statement>
      <div className="fincart-brand-story__scope">
        <p>Scope</p>
        <ul><li>Brand strategy and identity</li><li>Website strategy and UX</li><li>Content and interface design</li><li>Motion and rollout templates</li></ul>
      </div>
    </section>

    <section className="fincart-brand-story__composition">
      <HtmlExperience title="Fincart color palette motion study" src="/fincart-branding/html/palette-motion.html" />
      <div className="fincart-brand-story__brand-pair">
        <Still label="Fincart logo clear-space construction grid" src="/fincart-branding/fincart-logo-clear-space.png" width={3840} height={2160} className="fincart-brand-story__logo-grid" sizes="(max-width: 760px) 100vw, 54vw" />
        <Still label="Fincart brand application tote mockup" src="/fincart-branding/brand-tote.jpg" width={2508} height={2508} className="fincart-brand-story__tote" sizes="(max-width: 760px) 100vw, 34vw" />
      </div>
    </section>

    <section className="fincart-brand-story__chapter fincart-brand-story__chapter--stacked">
      <Statement
        label="Identity"
        body={[
          "The symbol combines ideas of navigation, fluidity, and growth. Paired with a clean Geist wordmark, it gives Fincart a recognisable identity that can move between product screens, guidance, presentations, and physical applications.",
          "The system uses clear space and simple logo rules to preserve visibility across large campaign moments and small interface details."
        ]}
      >A visual language for direction, progress, and financial confidence.</Statement>
      <Motion label="Fincart website motion study" src="/fincart-branding/website-motion.mp4" className="fincart-brand-story__signage" />
    </section>

    <Motion label="Fincart brand motion study" src="/fincart-branding/brand-motion.mp4" className="fincart-brand-story__media--wide" />

    <div className="fincart-brand-story__lottie-frame fincart-brand-story__motion--full" data-fincart-image-reveal><FincartBrandingMotion /></div>

    <section className="fincart-brand-story__chapter">
      <Statement
        label="Digital experience"
        body={[
          "The website leads with one clear promise: financial planning built around life goals. It then gives people structured routes into goal planning, investments, insurance, retirement, estate planning, and the different ways they can work with Fincart.",
          "The journey explains Fincart's Discover, Blueprint, Align, Build, and Evolve process before introducing the mobile app, personal wealth manager support, and portfolio management service."
        ]}
      >Turn a broad financial offering into a website people can understand and act on.</Statement>
    </section>

    <section className="fincart-brand-story__web-grid">
      <Still label="Fincart brand signage mockup for Mr. Tanvir Alam" src="/fincart-branding/office-signage.jpg" width={3840} height={2160} className="fincart-brand-story__signage" sizes="(max-width: 760px) 100vw, 45vw" />
      <Still label="Fincart desktop website mockup" src="/fincart-branding/advisor-website-mockup.jpg" width={2890} height={2176} className="fincart-brand-story__desktop" />
    </section>

    <HtmlExperience title="Fincart website promo animation" src="/fincart-branding/html/website-promo-animation.html" className="fincart-brand-story__motion--full" />

    <section className="fincart-brand-story__chapter">
      <Statement
        label="Useful by design"
        body={[
          "Brandeis blue anchors the experience, with mint and yellow adding emphasis where people need guidance. Black, white, and a restrained type system keep detailed financial information readable.",
          "The same principles extend across campaign graphics, business cards, presentation templates, event material, the website, and product communication, giving teams a practical system for everyday use."
        ]}
      >One system connects the website, product, and everyday brand communication.</Statement>
    </section>

    <Still label="Fincart product campaign poster set" src="/fincart-branding/planning-posters.jpg" width={3072} height={2048} className="fincart-brand-story__media--wide" />

    <section className="fincart-brand-story__final-grid">
      <Still label="Fincart SIP calculator interface mockup" src="/fincart-branding/sip-calculator.jpg" width={2872} height={3400} className="fincart-brand-story__calculator" sizes="(max-width: 760px) 100vw, 40vw" />
      <Motion label="Fincart website and identity overview" src="/fincart-branding/hero.mp4" className="fincart-brand-story__final-motion" />
    </section>
    <section className="fincart-brand-story__chapter fincart-brand-story__closing-copy">
      <Statement
          label="Working outcome"
          body={[
            "The draft system brings Fincart's financial planning story, visual identity, website, and supporting brand applications into a shared foundation. It gives the product and marketing experience a consistent voice while leaving room for new services and content.",
            "This section intentionally avoids performance claims. Verified business results and the final client-approved closing statement will be added before the case study is published."
          ]}
        >A clearer foundation for a financial brand designed to guide people over time.</Statement>
    </section>
  </div>;
}
