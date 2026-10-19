"use client";

import { Exploded, Hub, Keyboard, Plot, Relay } from "@lucasmarkes/hairline/react";

const figures = { hub: Hub, relay: Relay, plot: Plot, exploded: Exploded };

export function ProductDesignHeroArt() {
  return <div className="product-landing__art" role="img" aria-label="Fine-line keyboard and layered product interface panels with colorful gradients">
    <div className="product-landing__art-grid" />
    <div className="product-landing__keyboard"><Keyboard theme="light" play intensity={0.25} label="Interactive keyboard illustration" /></div>
    <div className="product-landing__art-panel product-landing__art-panel--back"><span className="product-landing__art-dots"><i /><i /><i /></span><div className="product-landing__art-gradient product-landing__art-gradient--mint" /><span className="product-landing__art-line" /><span className="product-landing__art-line short" /></div>
    <div className="product-landing__art-panel product-landing__art-panel--front"><span className="product-landing__art-dots"><i /><i /><i /></span><div className="product-landing__art-chart"><span /><span /><span /><span /><span /></div><div className="product-landing__art-gradient product-landing__art-gradient--sun" /></div>
    <div className="product-landing__art-orb product-landing__art-orb--one" /><div className="product-landing__art-orb product-landing__art-orb--two" />
  </div>;
}

export function ProductDesignCardArt({ kind }: { kind: keyof typeof figures }) {
  const Figure = figures[kind];
  return <div className={`product-landing__card-art product-landing__card-art--${kind}`}><span className="product-landing__card-glow" /><Figure theme="light" play intensity={0.2} label="Interactive fine-line product design illustration" /></div>;
}
