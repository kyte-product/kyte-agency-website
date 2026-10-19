import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, Layers3, MoveUpRight, PanelsTopLeft, ScanSearch, Sparkles, Workflow } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { TextRevealMotion } from "@/components/TextRevealMotion";
import { ProductDesignCardArt, ProductDesignHeroArt } from "@/components/ProductDesignIllustrations";
import { ProductDesignCarousel } from "@/components/ProductDesignCarousel";
import { ProductDesignFramework } from "@/components/ProductDesignFramework";
import { ServiceTestimonials } from "@/components/ServiceTestimonials";
import { HomeFaq } from "@/components/HomeFaq";
import { clientLogoAsset } from "@/data/clientLogoAssets";
import "./product-design.css";

export const metadata: Metadata = {
  title: "UI/UX Design & Development | Kyte Agency",
  description: "Research, product design, and development support for useful digital products, websites, and customer journeys.",
};

const clients = [
  ["Fincart", "fincart"], ["Revenue Grid", "revenue-grid"], ["Comet", "comet"],
  ["Emergent", "emergent"], ["Banza", "banza"], ["Contractzy", "contractzy"],
] as const;

const services = [
  { title: "UX research & design audits", body: "Find the friction and decide what deserves attention first.", href: "/ui-ux-design-development/ux-research-design-audit" },
  { title: "Website design & development", body: "Make a website clearer, more useful, and easier to maintain.", href: "/ui-ux-design-development/website-design-development" },
  { title: "Mobile app design", body: "Shape focused journeys for the screen people use every day.", href: "/ui-ux-design-development/mobile-app-design" },
  { title: "SaaS & web app design", body: "Make complex tools and workflows easier to navigate.", href: "/ui-ux-design-development/saas-web-app-design" },
  { title: "eCommerce & Shopify websites", body: "Connect discovery, product decisions, and checkout.", href: "/ui-ux-design-development/ecommerce-shopify-websites" },
];

const questions = [
  { question: "What does a UI/UX design project include?", answer: "The scope depends on the challenge. It can include research, an experience audit, information architecture, user flows, prototypes, visual interface design, a design system, testing, and a handoff to development." },
  { question: "Can you improve an existing product?", answer: "Yes. We can review a specific journey or the wider experience, identify priorities with your team, and design changes around what users need to do." },
  { question: "Do you also build what you design?", answer: "We offer website development and can plan build support where it fits the project. For apps and other products, we can work with your engineering team on a clear implementation handoff." },
  { question: "Can you work with our internal product team?", answer: "Yes. We can define the work, reviews, files, and handoff around the team already responsible for your product." },
  { question: "Where do we start if the brief is still forming?", answer: "Start with the product, audience, and the decision you need to make next. A focused discovery or audit can help turn that into a practical scope." },
];

const recentWork = [
  { name: "Fincart", type: "Financial product experience", description: "A connected experience for planning, investing, and understanding progress.", image: "/fincart-branding/launch-event-cover.jpg", href: "/work/fincart-website-branding" },
  { name: "Collectbee", type: "Digital product design", description: "A clearer way to bring complex information and everyday tasks together.", image: "/kyte-work/collectbee.png", href: "/work/collectbee" },
  { name: "Revenue Grid", type: "Platform experience", description: "Interface work for a product with many moving parts and decisions.", image: "/kyte-work/revenue-grid.png", href: "/work" },
];

const process = [
  { icon: Compass, title: "Context", body: "Understand the product, audience, goals, and constraints that shape the work." },
  { icon: ScanSearch, title: "Research", body: "Look at existing evidence and learn where people need more clarity." },
  { icon: Workflow, title: "Experience architecture", body: "Map journeys, navigation, and the steps people need to complete." },
  { icon: PanelsTopLeft, title: "Interface design", body: "Turn the agreed structure into responsive screens and reusable patterns." },
  { icon: Sparkles, title: "Validation", body: "Review prototypes and test the decisions that matter with the right people." },
  { icon: Layers3, title: "Handoff", body: "Carry the details into implementation with clear files and shared decisions." },
];

export default function ProductDesignLandingPage() {
  return <><SiteHeader /><main className="product-landing"><TextRevealMotion />
    <section className="product-landing__hero" aria-labelledby="product-design-title">
      <div className="product-landing__hero-copy"><h1 id="product-design-title">Digital products built around <span className="product-landing__highlight">human experience<span className="product-landing__highlight-spark" aria-hidden="true">✳</span></span></h1><p>We connect research, design, and development to make useful websites and products that people can understand and enjoy using.</p><Link className="kyte-button" href="/contact">Talk about your product <ArrowRight size={18} aria-hidden="true" /></Link></div>
      <ProductDesignHeroArt />
    </section>

    <section className="product-landing__clients" aria-label="Selected product and digital experience clients"><p>Selected product and digital experience clients</p><ul>{clients.map(([name, slug]) => { const logo = clientLogoAsset(slug); return <li key={slug}><Image src={logo.src} alt={name} width={logo.width} height={logo.height} /></li>; })}</ul></section>

    <ProductDesignCarousel />

    <section className="product-landing__proof product-landing__section" aria-labelledby="product-proof-title"><h2 id="product-proof-title" className="product-landing__overline">Our background</h2><div className="product-landing__proof-grid"><div><strong>100+</strong><span>projects across Kyte</span></div><div className="product-landing__proof-icon"><span aria-hidden="true"><Compass /><Layers3 /><Sparkles /></span><small>Research, design, and development</small></div><div><strong>50+</strong><span>clients across Kyte</span></div><div className="product-landing__proof-icon"><span aria-hidden="true"><ScanSearch /><PanelsTopLeft /><Workflow /></span><small>Product, web, and brand experience</small></div></div></section>

    <section className="product-landing__work product-landing__section" aria-labelledby="product-work-title"><div className="product-landing__work-head"><h2 id="product-work-title">Recent work</h2><Link href="/work">Explore all work <ArrowRight size={18} aria-hidden="true" /></Link></div><div className="product-landing__work-list">{recentWork.map((work) => <article className="product-landing__work-row" key={work.name}><div className="product-landing__work-copy"><div><span className="product-landing__work-mark" aria-hidden="true">{work.name.slice(0,1)}</span><h3>{work.name}</h3><p>{work.description}</p></div><div className="product-landing__work-bottom"><small>{work.type}</small><Link href={work.href} aria-label={`Explore ${work.name} work`}>View work <MoveUpRight size={18} aria-hidden="true" /></Link></div></div><Link className="product-landing__work-image" href={work.href} aria-label={`Explore ${work.name} work`}><Image src={work.image} alt={`${work.name} project visual`} fill sizes="(max-width: 700px) 100vw, 50vw" /></Link></article>)}</div></section>
    <ServiceTestimonials />

    <section className="product-landing__cta-wrap product-landing__section"><div className="product-landing__cta" aria-labelledby="product-cta-title"><div className="product-landing__cta-panel"><h2 id="product-cta-title">Let&apos;s make the next product decision clearer.</h2><p>Tell us what you are building, improving, or trying to understand.</p><Link className="kyte-button" href="/contact">Start a conversation <ArrowRight size={18} aria-hidden="true" /></Link></div><span className="product-landing__cta-orb" aria-hidden="true" /></div></section>

    <section className="product-landing__framework product-landing__section" aria-labelledby="product-framework-title"><h2 id="product-framework-title">A framework that moves from evidence to experience.</h2><ProductDesignFramework /></section>

    <section className="product-landing__process product-landing__section" aria-labelledby="product-process-title"><h2 id="product-process-title">How we work together.</h2><div className="product-landing__process-grid">{process.map(({ icon: Icon, title, body }) => <article key={title}><span className="product-landing__process-icon"><Icon size={27} strokeWidth={1.4} aria-hidden="true" /></span><h3>{title}</h3><p>{body}</p></article>)}</div></section>

    <section className="product-landing__partners product-landing__section" aria-labelledby="product-partners-title"><div className="product-landing__section-head"><h2 id="product-partners-title">For products at different stages.</h2><p>We adapt the work to the team, the product, and the question that needs an answer.</p></div><div className="product-landing__partner-grid">{["New products", "Growing platforms", "Established services", "Complex internal tools", "Commerce journeys", "Web platforms", "Internal systems", "Connected brands"].map((item, index) => <div key={item}><span className={`product-landing__partner-symbol product-landing__partner-symbol--${index % 4}`} aria-hidden="true"><i /></span><h3>{item}</h3></div>)}</div></section>

    <section className="product-landing__services product-landing__section" aria-labelledby="product-services-title"><h2 id="product-services-title">Explore our UI/UX services.</h2><div className="product-landing__service-list">{services.slice(0,3).map((service, index) => <Link href={service.href} key={service.href}><ProductDesignCardArt kind={(["hub", "relay", "exploded"] as const)[index]} /><div><strong>{service.title}</strong><MoveUpRight size={21} aria-hidden="true" /></div><small>{service.body}</small></Link>)}</div><div className="product-landing__service-more">{services.slice(3).map((service) => <Link href={service.href} key={service.href}>{service.title} <ArrowRight size={18} aria-hidden="true" /></Link>)}</div></section>

    <section className="product-landing__explore product-landing__section" aria-labelledby="product-explore-title"><h2 id="product-explore-title">Thinking through your next move?</h2><div className="product-landing__explore-grid"><Link href="/work"><div className="product-landing__explore-visual product-landing__explore-visual--work"><PanelsTopLeft size={88} strokeWidth={.8} /></div><span>Projects</span><strong>See the work <ArrowRight size={18} /></strong></Link><Link href="/insights/design-news"><div className="product-landing__explore-visual product-landing__explore-visual--news"><Layers3 size={88} strokeWidth={.8} /></div><span>Design news</span><strong>Read our thinking <ArrowRight size={18} /></strong></Link><Link href="/about"><div className="product-landing__explore-visual product-landing__explore-visual--about"><Compass size={88} strokeWidth={.8} /></div><span>About Kyte</span><strong>Meet the team <ArrowRight size={18} /></strong></Link></div></section>

    <section className="product-landing__outcomes product-landing__section" aria-labelledby="product-outcomes-title"><h2 id="product-outcomes-title">What we design.</h2><div className="product-landing__outcome-grid">{["Onboarding and activation", "Navigation and information architecture", "Dashboards and complex workflows", "Websites and content journeys", "Design systems and interface patterns", "Responsive product experiences"].map((item, index) => <article key={item}><ProductDesignCardArt kind={(["exploded", "relay", "plot", "hub"] as const)[index % 4]} /><h3>{item}</h3><ArrowRight size={20} aria-hidden="true" /></article>)}</div></section>

    <section className="product-landing__benefits-wrap product-landing__section"><div className="product-landing__benefits" aria-labelledby="product-benefits-title"><h2 id="product-benefits-title">Why teams work with Kyte.</h2><div>{[{ title: "Clarity before polish", body: "We make the product problem and the audience's needs easier to see before refining the interface.", icon: ScanSearch }, { title: "Connected thinking", body: "Strategy, content, visual design, and usability inform one another.", icon: Layers3 }, { title: "Built for the handoff", body: "We make decisions and reusable patterns easier for the people building the product to carry forward.", icon: Workflow }, { title: "A scope that fits", body: "A focused engagement can answer one question or connect several parts of an experience.", icon: Compass }, { title: "Shared decisions", body: "Regular reviews keep the team close to the work as the product takes shape.", icon: PanelsTopLeft }, { title: "Useful detail", body: "The little moments receive the same attention as the big screens.", icon: Sparkles }].map(({ title, body, icon: Icon }) => <article key={title}><span><Icon size={24} strokeWidth={1.5} aria-hidden="true" /></span><h3>{title}</h3><p>{body}</p></article>)}</div></div></section>

    <section className="product-landing__cta-wrap product-landing__section"><div className="product-landing__cta product-landing__cta--last"><div className="product-landing__cta-panel"><h2>What could a clearer experience unlock?</h2><p>Start with the challenge in front of your team and we can shape the right next step.</p><Link className="kyte-button" href="/contact">Talk to Kyte <ArrowRight size={18} aria-hidden="true" /></Link></div><span className="product-landing__cta-orb" aria-hidden="true" /></div></section>

    <HomeFaq heading="Answers to common UI/UX questions." items={questions} allowMultiple />
  </main><SiteFooter /></>;
}
