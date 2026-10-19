"use client";

import { Exploded, Hub, Plot, Relay } from "@lucasmarkes/hairline/react";

const figures = { hub: Hub, relay: Relay, plot: Plot, exploded: Exploded };

export function ProductDesignHeroArt() {
  return <div className="product-landing__art" role="img" aria-label="Isometric product workspace with a keyboard, layered interface panels, connected tools, and soft color gradients">
    <iframe className="product-landing__art-embed" src="/hairline/product-experience-embed.html" title="Custom Hairline product experience illustration" loading="eager" tabIndex={-1} aria-hidden="true" />
  </div>;
}

export function ProductDesignCardArt({ kind }: { kind: keyof typeof figures }) {
  const Figure = figures[kind];
  return <div className={`product-landing__card-art product-landing__card-art--${kind}`}><span className="product-landing__card-glow" /><Figure theme="light" play intensity={0.2} label="Interactive fine-line product design illustration" /></div>;
}
