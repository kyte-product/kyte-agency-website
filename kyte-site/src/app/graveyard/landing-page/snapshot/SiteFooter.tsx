import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { FooterGradientEffect } from "./FooterGradientEffect";

const productServices = [
  ["UX Research & Design Audits", "/ui-ux-design-development/ux-research-design-audit"],
  ["Website Design & Development", "/ui-ux-design-development/website-design-development"],
  ["Mobile App Design", "/ui-ux-design-development/mobile-app-design"],
  ["SaaS & Web App Design", "/ui-ux-design-development/saas-web-app-design"],
  ["eCommerce & Shopify Websites", "/ui-ux-design-development/ecommerce-shopify-websites"],
] as const;

const brandServices = [
  ["Brand Strategy & Identity", "/branding-marketing/brand-strategy-identity"],
  ["Graphic Design", "/branding-marketing/graphic-design"],
  ["Video Production & Motion Graphics", "/branding-marketing/video-production-motion-graphics"],
  ["Social Media Marketing", "/branding-marketing/social-media-marketing"],
  ["SEO & AI Search Optimisation", "/branding-marketing/seo-ai-search-optimisation"],
] as const;

const industries = [
  ["Fintech", "/industries/fintech"],
  ["SaaS & Startups", "/industries/saas-startups"],
  ["D2C & eCommerce", "/industries/d2c-ecommerce"],
  ["Hospitality & Food", "/industries/hospitality-food-beverage"],
] as const;

function FooterLinks({ items }: { items: readonly (readonly [string, string])[] }) {
  return <ul>{items.map(([label, href]) => <li key={href}><Link href={href}>{label}</Link></li>)}</ul>;
}

export function SiteFooter({ showBanner = true }: { showBanner?: boolean }) {
  return <>
    {showBanner && <section className="contact-banner" id="contact-banner" aria-labelledby="contact-banner-title">
      <div className="contact-banner__frame">
        <div className="contact-banner__card">
          <div className="contact-banner__motion" aria-hidden="true">
            <Image src="/graveyard/landing-page/kyte-motion-mark.svg" alt="" width={1000} height={1000} />
          </div>
          <div className="contact-banner__content">
            <div className="contact-banner__top">
              <div className="contact-banner__main">
                <p className="contact-banner__eyebrow">Product, website &amp; brand design</p>
                <h2 id="contact-banner-title">Have a project in mind?</h2>
                <p className="contact-banner__lede">Tell us what you&apos;re building. We&apos;ll help you find a clear way forward.</p>
              </div>
            </div>
            <div className="contact-banner__bottom">
              <div className="contact-banner__actions">
                <Link className="contact-banner__button contact-banner__button--secondary kyte-button" href="/work">Explore our work <ArrowRight size={17} aria-hidden="true" /></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>}

    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <Link className="site-footer__logo" href="/" aria-label="Kyte home"><Image src="/graveyard/landing-page/kyte-mark.png" alt="" width={34} height={34} /><span>kyte</span></Link>
            <p>Product, website and brand design for the next stage of your business.</p>
            <Link className="site-footer__more" href="/contact">Start a project <ArrowUpRight size={15} aria-hidden="true" /></Link>
          </div>

          <nav className="site-footer__column" aria-label="Product design services">
            <h2><Link href="/ui-ux-design-development">Product design</Link></h2>
            <p className="site-footer__label">UI/UX Design &amp; Development</p>
            <FooterLinks items={productServices} />
          </nav>

          <nav className="site-footer__column" aria-label="Brand and marketing services">
            <h2><Link href="/branding-marketing">Brand &amp; marketing</Link></h2>
            <p className="site-footer__label">Branding &amp; Marketing</p>
            <FooterLinks items={brandServices} />
          </nav>

          <nav className="site-footer__column" aria-label="Industries">
            <h2><Link href="/industries">Industries</Link></h2>
            <p className="site-footer__label">Selected experience</p>
            <FooterLinks items={industries} />
          </nav>

          <nav className="site-footer__column" aria-label="Explore Kyte">
            <h2>Explore</h2>
            <p className="site-footer__label">The studio</p>
            <FooterLinks items={[["Work", "/work"], ["Insights", "/insights"], ["About", "/about"], ["Careers", "/careers"], ["Contact", "/contact"]]} />
          </nav>
        </div>
        <div className="site-footer__bottom">
          <span>© 2026 Kyte Agency</span>
          <div><Link href="/privacy-policy">Privacy policy</Link><Link href="/terms">Terms</Link></div>
        </div>
      </div>
      <FooterGradientEffect />
    </footer>
  </>;
}
