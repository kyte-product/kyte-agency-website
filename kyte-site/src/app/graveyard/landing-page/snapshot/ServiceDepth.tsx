import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, LayoutTemplate, ScanSearch, Shapes } from "lucide-react";

const topics = [
  { category: "Research", title: "Know where the experience is getting in the way", tone: "forest", href: "/ui-ux-design-development/ux-research-design-audit" },
  { category: "Product design", title: "Make complex web apps easier to navigate", tone: "royal", href: "/ui-ux-design-development/saas-web-app-design" },
  { category: "Websites", title: "Make your offer clear from the first page", tone: "cyan", href: "/ui-ux-design-development/website-design-development" },
  { category: "Commerce", title: "Help shoppers find, choose and buy", tone: "navy", href: "/ui-ux-design-development/ecommerce-shopify-websites" },
  { category: "Brand identity", title: "Give people a reason to remember you", tone: "cyan", href: "/branding-marketing/brand-strategy-identity" },
  { category: "Visual design", title: "Keep the details consistent wherever the brand appears", tone: "navy", href: "/branding-marketing/graphic-design" },
  { category: "Motion", title: "Explain the idea when a still image is not enough", tone: "green", href: "/branding-marketing/video-production-motion-graphics" },
  { category: "Discoverability", title: "Make useful content easier to find", tone: "royal", href: "/branding-marketing/seo-ai-search-optimisation" },
] as const;

export function ServiceDepth() {
  return <section className="service-depth" id="services-overview" aria-labelledby="service-depth-title">
    <div className="service-depth__inner">
      <div className="service-depth__intro">
        <p className="service-depth__eyebrow">Services</p>
        <h2 id="service-depth-title">The right mix of skills for the next challenge</h2>
        <p className="service-depth__lede">We work across product experience, websites, brand and content. Start with the challenge you have, and we can shape the scope around it.</p>
        <Link className="service-depth__button kyte-button" href="/contact">Talk about your project <ArrowRight aria-hidden="true" size={16} /></Link>
        <div className="service-depth__foundation">
          <h3>Two connected practices</h3>
          <p>Explore the work in more detail, or bring a mixed brief and we will help define the right starting point.</p>
          <ul>
            <li><ScanSearch aria-hidden="true" />Research</li>
            <li><LayoutTemplate aria-hidden="true" />Product &amp; web</li>
            <li><Shapes aria-hidden="true" />Brand &amp; content</li>
            <li><BriefcaseBusiness aria-hidden="true" />Delivery</li>
          </ul>
        </div>
      </div>
      <div className="service-depth__column service-depth__column--staggered">{topics.slice(0,4).map((topic) => <TopicCard topic={topic} key={topic.title} />)}</div>
      <div className="service-depth__column">{topics.slice(4).map((topic) => <TopicCard topic={topic} key={topic.title} />)}</div>
    </div>
  </section>;
}

function TopicCard({ topic }: { topic: (typeof topics)[number] }) {
  return <Link className={`service-depth-card service-depth-card--${topic.tone}`} href={topic.href}>
    <span className="service-depth-card__content"><span className="service-depth-card__category">{topic.category}</span><span className="service-depth-card__title">{topic.title}</span></span>
    <span className="service-depth-card__more">Explore service <ArrowRight aria-hidden="true" size={16} /></span>
  </Link>;
}
