import Image from "next/image";
import type { CSSProperties } from "react";
import { EditorialGlyph } from "./EditorialGlyph";
import "./BrandStoryHero.css";

function Picture({ name, className = "", width, height, index }: { name: string; className?: string; width: number; height: number; index: number }) {
  return <span className="brand-story__reveal" style={{ "--reveal-delay": `${100 + index * 72}ms` } as CSSProperties}><span className={`brand-story__picture ${className}`}><Image src={name.startsWith("supplied:") ? `/branding-supplied/${name.slice(9)}.webp` : `/branding-story/${name}.webp`} alt="" width={width} height={height} sizes="(max-width: 650px) 80px, 240px" priority /></span></span>;
}

function Word({ children, index }: { children: string; index: number }) {
  return <span className="brand-story__reveal" style={{ "--reveal-delay": `${100 + index * 72}ms` } as CSSProperties}><span className="brand-story__word">{children}</span></span>;
}

export function BrandStoryHero() {
  return <section className="brand-story" aria-labelledby="branding-title" data-site-reveal-ignore>
    <div className="brand-story__inner">
      <h1 id="branding-title" aria-label="Every brand has a story. We make yours unforgettable.">
        <span className="brand-story__line brand-story__line--one" aria-hidden="true"><Word index={0}>Every</Word><Picture index={1} name="design-books" className="brand-story__picture--books" width={1200} height={1200} /><Word index={2}>Brand</Word></span>
        <span className="brand-story__line brand-story__line--two" aria-hidden="true"><Word index={3}>Has A</Word><Picture index={4} name="supplied:arc-matrix-hero" className="brand-story__picture--chair" width={784} height={1168} /><Word index={5}>Story.</Word></span>
        <span className="brand-story__line brand-story__line--three" aria-hidden="true"><Word index={6}>We</Word><Picture index={7} name="yellow-symbol" className="brand-story__picture--symbol" width={1080} height={1080} /><Word index={8}>Make Yours</Word></span>
        <span className="brand-story__line brand-story__line--four" aria-hidden="true"><Picture index={9} name="supplied:colour-fan-hero" className="brand-story__picture--flower" width={1080} height={1434} /><Word index={10}>Unforgettable.</Word></span>
      </h1>
    </div>
    <div className="brand-story__corner-notes" aria-hidden="true">
      <p><EditorialGlyph name="seal" /> Independent branding studio<br />Bengaluru, India <EditorialGlyph name="flower" /></p>
      <p>Strategy <EditorialGlyph name="arrows" /> identity<br />Digital <EditorialGlyph name="squareQ" /> culture <EditorialGlyph name="brain" /></p>
    </div>
  </section>;
}
