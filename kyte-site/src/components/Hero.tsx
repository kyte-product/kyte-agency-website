import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ClientLogos } from "@/components/ClientLogos";
import { RevealWords } from "@/components/RevealWords";

export function Hero() {
  return <section className="hero" aria-labelledby="home-hero-title">
    <div className="hero__inner">
      <div className="hero__explore">
        <nav className="hero__explore-actions" aria-label="Explore Kyte services">
          <Link className="hero__explore-button" href="/ui-ux-design-development">UI/UX Design &amp; Development <ChevronRight size={16} aria-hidden="true" /></Link>
          <Link className="hero__explore-button" href="/branding-marketing">Branding &amp; Marketing <ChevronRight size={16} aria-hidden="true" /></Link>
        </nav>
      </div>
      <h1 id="home-hero-title" data-reveal-words><RevealWords text="We design, build & market exceptional digital experiences." accentWord="exceptional" /></h1>
    </div>
    <ClientLogos />
    <div className="hero__showreel" data-nav-theme="dark">
      <video
        className="hero__showreel-video"
        src="/kyte-showreel.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="Kyte agency showreel"
      />
    </div>
  </section>;
}
