import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Mail, Phone } from "lucide-react";
import RazorSenseCanvas from "./RazorSenseCanvas";
import "./SiteFooter.css";

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

const aiTools = [
  ["ChatGPT", "https://chatgpt.com/", "chatgpt"],
  ["Claude", "https://claude.ai/new", "claude"],
  ["Gemini", "https://gemini.google.com/app", "gemini"],
  ["Grok", "https://grok.com/", "grok"],
] as const;

function FooterLinks({ items }: { items: readonly (readonly [string, string])[] }) {
  return <ul>{items.map(([label, href]) => <li key={href}><Link href={href}>{label}</Link></li>)}</ul>;
}

export function SiteFooter({ showBanner = true }: { showBanner?: boolean }) {
  return <>
    {showBanner && <section className="contact-banner" id="contact-banner" aria-labelledby="contact-banner-title">
      <div className="contact-banner__frame">
        <div className="contact-banner__card">
          <RazorSenseCanvas className="contact-banner__effect" />
          <div className="contact-banner__content">
            <div className="contact-banner__main">
              <h2 id="contact-banner-title">Let&apos;s reach your next growth milestone</h2>
              <p className="contact-banner__lede">Tell us what you&apos;re building, scaling, or rethinking, and let&apos;s start from there. <ArrowDown size={16} strokeWidth={1.5} aria-hidden="true" /></p>
            </div>
            <Link className="contact-banner__button" href="/contact">Contact Us <ArrowUpRight size={17} strokeWidth={1.7} aria-hidden="true" /></Link>
          </div>
        </div>
      </div>
    </section>}

    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <Link className="site-footer__logo" href="/" aria-label="Kyte home"><Image src="/kyte-mark.png" alt="" width={34} height={34} /><span>kyte</span></Link>
            <p>Product, website and brand design for the next stage of your business.</p>
            <Link className="site-footer__more" href="/contact">Start a project <ArrowUpRight size={15} aria-hidden="true" /></Link>
          </div>

          <nav className="site-footer__column" aria-label="Product design services">
            <h2><Link href="/ui-ux-design-development">Product design</Link></h2>
            <FooterLinks items={productServices} />
          </nav>

          <nav className="site-footer__column" aria-label="Brand and marketing services">
            <h2><Link href="/branding-marketing">Brand &amp; marketing</Link></h2>
            <FooterLinks items={brandServices} />
          </nav>

          <nav className="site-footer__column" aria-label="Industries">
            <h2><Link href="/industries">Industries</Link></h2>
            <FooterLinks items={industries} />
          </nav>

          <nav className="site-footer__column" aria-label="Explore Kyte">
            <h2>Explore</h2>
            <FooterLinks items={[["Work", "/work"], ["Insights", "/insights"], ["About", "/about"], ["Careers", "/careers"], ["Contact", "/contact"]]} />
          </nav>
        </div>
      </div>
      <section className="site-footer__utility" aria-label="More ways to connect with Kyte">
        <div className="site-footer__utility-inner">
          <div className="site-footer__utility-grid">
            <a className="site-footer__utility-cell site-footer__designrush" href="https://www.designrush.com/" target="_blank" rel="noreferrer">
              <Image className="site-footer__designrush-badge" src="/designrush-verified-agency-2024.png" alt="DesignRush Verified Agency 2024" width={217} height={290} unoptimized />
              <span><strong>On DesignRush</strong><small>View agency profile <ArrowUpRight size={13} strokeWidth={1.7} aria-hidden="true" /></small></span>
            </a>
            <div className="site-footer__utility-cell">
              <p className="site-footer__utility-label">Ask AI about Kyte</p>
              <div className="site-footer__ai-links">{aiTools.map(([name, href, icon]) => <a className={`site-footer__ai-link site-footer__ai-link--${icon}`} href={href} target="_blank" rel="noreferrer" aria-label={`Ask about Kyte on ${name}`} key={name}><Image className="site-footer__ai-icon" src={`/ai-logos/${icon}.png`} alt="" width={24} height={24} /></a>)}</div>
            </div>
            <div className="site-footer__utility-cell">
              <p className="site-footer__utility-label">Social media</p>
              <div className="site-footer__social-links">
                <a href="https://www.instagram.com/kyte.agency/" target="_blank" rel="noreferrer" aria-label="Kyte on Instagram"><Image className="site-footer__social-icon" src="/social-icons/instagram.png" alt="" width={20} height={20} /></a>
                <a href="https://www.linkedin.com/company/kyte-agency/" target="_blank" rel="noreferrer" aria-label="Kyte on LinkedIn"><Image className="site-footer__social-icon" src="/social-icons/linkedin-exact.png" alt="" width={20} height={20} /></a>
              </div>
            </div>
            <div className="site-footer__utility-cell site-footer__reach">
              <p className="site-footer__utility-label">Reach out to us</p>
              <a href="mailto:contact@kyte-agency.com"><Mail size={16} strokeWidth={1.75} aria-hidden="true" />contact@kyte-agency.com</a>
              <a href="tel:+919876543210"><Phone size={16} strokeWidth={1.75} aria-hidden="true" />+91 9876543210</a>
            </div>
          </div>
          <div className="site-footer__bottom">
            <span>© 2026 Kyte Agency</span>
            <div><Link href="/privacy-policy">Privacy policy</Link><Link href="/terms">Terms</Link></div>
          </div>
        </div>
      </section>
    </footer>
  </>;
}
