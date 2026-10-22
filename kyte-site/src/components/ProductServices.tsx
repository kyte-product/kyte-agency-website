import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductDesignCardArt } from "./ProductDesignIllustrations";
import "../app/ui-ux-design-development/product-design.css";

const services = [
  { title: "UX research & design audits", body: "Find the friction and decide what deserves attention first.", href: "/ui-ux-design-development/ux-research-design-audit" },
  { title: "Website design & development", body: "Make a website clearer, more useful, and easier to maintain.", href: "/ui-ux-design-development/website-design-development" },
  { title: "Mobile app design", body: "Shape focused journeys for the screen people use every day.", href: "/ui-ux-design-development/mobile-app-design" },
  { title: "SaaS & web app design", body: "Make complex tools and workflows easier to navigate.", href: "/ui-ux-design-development/saas-web-app-design" },
  { title: "eCommerce & Shopify websites", body: "Connect discovery, product decisions, and checkout.", href: "/ui-ux-design-development/ecommerce-shopify-websites" },
];

export function ProductServices() {
  return <section className="product-landing__services product-landing__section" aria-labelledby="product-services-title"><h2 id="product-services-title">Explore Our UI/UX Services</h2><div className="product-landing__service-list">{services.map((service, index) => <article key={service.href}><ProductDesignCardArt kind={( ["hub", "relay", "exploded", "plot", "relay"] as const)[index]} research={index === 0} website={index === 1} mobile={index === 2} saas={index === 3} commerce={index === 4} /><div><strong>{service.title}</strong></div><small>{service.body}</small><Link className="product-landing__service-link kyte-tertiary" href={service.href}>View Service <ArrowRight size={17} aria-hidden="true" /></Link></article>)}</div></section>;
}
