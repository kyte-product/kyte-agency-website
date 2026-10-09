import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function StoryPromos() {
  return <section className="story-promos-section" aria-label="Explore Kyte services">
    <div className="story-promos">
      <Link className="story-promo story-promo--product" href="/ui-ux-design-development">
        <span className="story-promo__copy"><span><strong>Product design.</strong> Shape a product people can understand, use, and choose, with a clear path from idea to launch.</span><span className="story-promo__link">Explore product design <ArrowRight size={17} aria-hidden="true" /></span></span>
        <span className="story-promo__art story-promo__art--violet" aria-hidden="true" />
      </Link>
      <Link className="story-promo story-promo--brand" href="/branding-marketing">
        <span className="story-promo__copy"><span><strong>Brand and websites.</strong> Build a distinctive identity and a digital home that gives your next stage room to grow.</span><span className="story-promo__link">Explore brand and web <ArrowRight size={17} aria-hidden="true" /></span></span>
        <span className="story-promo__art story-promo__art--cyan" aria-hidden="true" />
      </Link>
    </div>
  </section>;
}
