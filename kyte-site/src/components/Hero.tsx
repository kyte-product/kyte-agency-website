import { StoryPromos } from "./StoryPromos";

export function Hero() {
  return <section className="hero" aria-labelledby="hero-title">
    <div className="hero__inner">
      <h1 className="hero__title" id="hero-title"><span className="hero__title-line">Design for what</span><span className="hero__title-line hero__title-line--accent">comes next</span></h1>
      <p className="hero__body"><strong>Kyte is a product, website and brand design agency.</strong> We help ambitious teams make their next stage clear, useful and distinctive.</p>
    </div>
    <StoryPromos />
  </section>;
}
