"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { CookieSettingsButton } from "../FooterActions";
import "./BrandingFooter.css";

export function BrandingFooter() {
  return <footer className="branding-footer" id="branding-footer" data-site-reveal-ignore>
    <div className="branding-footer__information">
      <div className="branding-footer__brand"><Link href="/" aria-label="Kyte home"><Image src="/kyte-agency-logo-white.svg" alt="" width={200} height={29} unoptimized /></Link><p>Independent minds.<br />Shared ambition.</p><span>Bengaluru, India</span></div>
      <nav className="branding-footer__links" aria-label="Footer navigation">
        <div><Link href="/work">Work</Link><Link href="/about">About</Link><Link href="/ui-ux-design-development">Product design</Link><Link href="/branding-marketing">Brand & marketing</Link></div>
        <div><Link href="/insights">Design news</Link><Link href="/careers">Careers</Link><Link href="/contact">Contact</Link><a href="https://www.instagram.com/kyte.agency/" target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={12} /></a><a href="https://www.linkedin.com/company/kyte-agency/" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={12} /></a></div>
      </nav>
      <div className="branding-footer__contact"><p>YOUR NEXT CHAPTER<br />STARTS WITH A HELLO.</p><a href="mailto:contact@kyte-agency.com">contact@kyte-agency.com <ArrowUpRight size={18} /></a><Link className="branding-footer__cta" href="/contact">Start a project <ArrowRight size={17} /></Link></div>
    </div>
    <div className="branding-footer__legal"><span>© 2026 Kyte Agency</span><div><CookieSettingsButton /><Link href="/privacy-policy">Privacy policy</Link><Link href="/terms">Terms & conditions</Link></div><Link href="#branding-title" aria-label="Back to top">Back to top ↑</Link></div>
  </footer>;
}
