import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, MoveUpRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { TextRevealMotion } from "@/components/TextRevealMotion";
import { ProductDesignHeroArt } from "@/components/ProductDesignIllustrations";
import { ProductDesignCarousel } from "@/components/ProductDesignCarousel";
import { WorkShowcase } from "@/components/WorkShowcase";
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

const framework = [
  { number: "01", title: "Discover", body: "Understand the audience, the business context, and where the current experience causes friction.", items: "Research · Audit · Strategy" },
  { number: "02", title: "Structure", body: "Shape useful journeys, information architecture, and prototypes before committing to polished screens.", items: "Flows · Content · Prototypes" },
  { number: "03", title: "Design", body: "Create clear interfaces and reusable patterns that work across devices and states.", items: "UI · Design systems · Validation" },
  { number: "04", title: "Bring it to life", body: "Prepare assets and decisions for development, with build support where it is part of the agreed scope.", items: "Handoff · Build · Refinement" },
];

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

export default function ProductDesignLandingPage() {
  return <><SiteHeader /><main className="product-landing"><TextRevealMotion />
    <section className="product-landing__hero" aria-labelledby="product-design-title">
      <div className="product-landing__hero-copy"><h1 id="product-design-title">Digital products built around <span className="product-landing__highlight">human experience<span className="product-landing__highlight-spark" aria-hidden="true">✳</span></span></h1><p>We connect research, design, and development to make useful websites and products that people can understand and enjoy using.</p><Link className="kyte-button" href="/contact">Talk about your product <ArrowRight size={18} aria-hidden="true" /></Link></div>
      <ProductDesignHeroArt />
    </section>

    <section className="product-landing__clients" aria-label="Selected product and digital experience clients"><p>Selected product and digital experience clients</p><ul>{clients.map(([name, slug]) => { const logo = clientLogoAsset(slug); return <li key={slug}><Image src={logo.src} alt={name} width={logo.width} height={logo.height} /></li>; })}</ul></section>

    <ProductDesignCarousel />

    <section className="product-landing__proof product-landing__section" aria-labelledby="product-proof-title"><div className="product-landing__proof-intro"><h2 id="product-proof-title">A wider view of the work behind better experiences.</h2><p>Our product design work draws on Kyte&apos;s wider practice across research, websites, brands, and digital communication. The figures below describe Kyte&apos;s overall work, rather than product design outcomes.</p></div><div className="product-landing__proof-grid"><div><strong>100+</strong><span>projects across the agency</span></div><div><strong>50+</strong><span>clients across the agency</span></div><div className="product-landing__proof-note"><span>Recognised work</span><p><a href="https://www.designrush.com/agency/profile/kyte-agency" target="_blank" rel="noopener noreferrer">DesignRush Verified Agency 2024 <MoveUpRight size={15} aria-hidden="true" /></a></p></div><div className="product-landing__proof-note"><span>Experience that connects</span><p>Research, interface design, content, identity, and delivery are considered together when the work calls for them.</p></div></div></section>

    <WorkShowcase title="Recent work" projectNames={["Fincart.", "Arka Inventory.", "SpicyBayer."]} />
    <ServiceTestimonials />

    <section className="product-landing__cta product-landing__section" aria-labelledby="product-cta-title"><div><h2 id="product-cta-title">Let&apos;s make the next product decision clearer.</h2><p>Tell us what you are building, improving, or trying to understand.</p></div><Link className="kyte-button" href="/contact">Start a conversation <ArrowRight size={18} aria-hidden="true" /></Link></section>

    <section className="product-landing__framework product-landing__section" aria-labelledby="product-framework-title"><div className="product-landing__section-head"><h2 id="product-framework-title">A framework that moves from evidence to experience.</h2><p>Each project takes its own shape. These four stages keep the work connected from the first question to the finished design.</p></div><div className="product-landing__framework-grid">{framework.map((step) => <article key={step.number}><span className="product-landing__step-number">{step.number}</span><h3>{step.title}</h3><p>{step.body}</p><small>{step.items}</small></article>)}</div></section>

    <section className="product-landing__process product-landing__section" aria-labelledby="product-process-title"><div className="product-landing__process-heading"><h2 id="product-process-title">How we work together.</h2><p>We keep decisions visible and make space to test what matters before it becomes expensive to change.</p></div><div className="product-landing__process-list"><div><Check size={20} aria-hidden="true" /><h3>Find the right problem</h3><p>Bring the team together around what customers are trying to do and where the experience can improve.</p></div><div><Check size={20} aria-hidden="true" /><h3>Make the work tangible</h3><p>Use flows, prototypes, and interface studies to review choices early and often.</p></div><div><Check size={20} aria-hidden="true" /><h3>Carry decisions through</h3><p>Document the patterns and details that help design and development stay aligned.</p></div></div></section>

    <section className="product-landing__partners product-landing__section" aria-labelledby="product-partners-title"><div className="product-landing__section-head"><h2 id="product-partners-title">For products at different stages.</h2><p>We adapt the work to the team, the product, and the question that needs an answer.</p></div><div className="product-landing__partner-grid">{["New products", "Growing platforms", "Established services", "Complex internal tools"].map((item, index) => <div key={item}><span>0{index + 1}</span><h3>{item}</h3><ArrowRight size={20} aria-hidden="true" /></div>)}</div></section>

    <section className="product-landing__services product-landing__section" aria-labelledby="product-services-title"><div className="product-landing__section-head"><h2 id="product-services-title">Explore our UI/UX services.</h2><p>Start with one focused question or connect several capabilities around the full experience.</p></div><div className="product-landing__service-list">{services.map((service) => <Link href={service.href} key={service.href}><span><strong>{service.title}</strong><small>{service.body}</small></span><MoveUpRight size={23} aria-hidden="true" /></Link>)}</div></section>

    <section className="product-landing__explore product-landing__section" aria-labelledby="product-explore-title"><div><h2 id="product-explore-title">Thinking through your next move?</h2><p>Explore the ideas, projects, and practical questions behind our design work.</p></div><div className="product-landing__explore-links"><Link href="/work">See the work <ArrowRight size={18} aria-hidden="true" /></Link><Link href="/insights/design-news">Read design news <ArrowRight size={18} aria-hidden="true" /></Link><Link href="/about">Meet Kyte <ArrowRight size={18} aria-hidden="true" /></Link></div></section>

    <section className="product-landing__outcomes product-landing__section" aria-labelledby="product-outcomes-title"><div className="product-landing__section-head"><h2 id="product-outcomes-title">What we design.</h2><p>Useful experiences are made of connected decisions, from the first interaction to the details people return to.</p></div><div className="product-landing__outcome-grid">{["Onboarding and activation", "Navigation and information architecture", "Dashboards and complex workflows", "Websites and content journeys", "Design systems and interface patterns", "Responsive product experiences"].map((item) => <p key={item}><Check size={18} aria-hidden="true" />{item}</p>)}</div></section>

    <section className="product-landing__benefits product-landing__section" aria-labelledby="product-benefits-title"><h2 id="product-benefits-title">Why teams work with Kyte.</h2><div><article><span>01</span><h3>Clarity before polish</h3><p>We make the product problem and the audience&apos;s needs easier to see before refining the interface.</p></article><article><span>02</span><h3>Connected thinking</h3><p>Strategy, content, visual design, and usability inform one another.</p></article><article><span>03</span><h3>Built for the handoff</h3><p>We make decisions and reusable patterns easier for the people building the product to carry forward.</p></article></div></section>

    <HomeFaq heading="Answers to common UI/UX questions." items={questions} allowMultiple />
  </main><SiteFooter /></>;
}
