import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Download } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { TeamPreviewFooter } from "@/components/TeamPreviewFooter";
import { ServicesIntro } from "@/components/ServicesIntro";
import { SplitCtaBanner } from "@/components/SplitCtaBanner";
import "./team-system.css";

export const metadata: Metadata = {
  title: "Design system | Kyte",
  description: "The approved visual foundation for the Kyte website.",
  robots: { index: false, follow: false },
};

const colors = [
  ["Primary blue", "#0249D9", "--color-blue", "Actions, links, eyebrows and focus"],
  ["Blue hover", "#013BB0", "--color-blue-hover", "Primary action hover"],
  ["Ink", "#1A1A16", "--color-ink", "Headlines and body copy"],
  ["Muted", "#70706E", "--color-muted", "Secondary copy"],
  ["Card black", "#171717", "component surface", "Service card surface"],
  ["White", "#FFFFFF", "--color-white", "Page and card surfaces"],
  ["Section surface", "#FAFAFA", "--color-surface-secondary", "Quiet section separation"],
  ["Rule", "#EEEEEC", "--color-border", "Page rails and dividers"],
] as const;

export default function DesignSystemPage() {
  return <><SiteHeader /><main className="team-system">
    <section className="team-system__hero"><p className="eyebrow">KYTE WEBSITE / FINAL DIRECTION</p><h1>Design system<span>.</span></h1><p>The team preview is the source for the active homepage and shared visual foundation. Deep blue actions, DM Sans typography, white space, black service cards, thin neutral rules and restrained motion define the interface.</p><Link href="/">View the landing page <ChevronRight size={17} aria-hidden="true" /></Link></section>

    <section className="team-system__section" aria-labelledby="system-type"><div className="team-system__section-heading"><p className="eyebrow">01 / FOUNDATION</p><h2 id="system-type">Typography</h2><p>DM Sans Variable. Regular weight carries the large headings, with tight tracking and a compact line height. Body copy stays clear and neutral. Work case study sections use 18px gray uppercase labels above 27px medium-weight black paragraphs at 1.3 line height, scaling to 15px labels and 22px paragraphs on mobile.</p></div><div className="team-system__type"><div><small>DISPLAY / 50–80 PX · 1.08 LINE HEIGHT</small><strong className="team-system__display">We design, build &amp; market <em>exceptional</em> digital experiences.</strong></div><div><small>SECTION / 30–44 PX · 1.2 LINE HEIGHT</small><strong className="team-system__section-type">Two expert departments, covering all your needs.</strong></div><div><small>BODY / 16–18 PX</small><p>Digital products and websites designed around how people use them.</p></div><div><small>LABEL / 12 PX · UPPERCASE</small><span className="eyebrow">Our services</span></div></div></section>

    <section className="team-system__section" aria-labelledby="system-color"><div className="team-system__section-heading"><p className="eyebrow">02 / FOUNDATION</p><h2 id="system-color">Color</h2><p>The page stays white and neutral. Blue is the single interface accent. Richer colors belong to client work, the showreel and editorial imagery.</p></div><div className="team-system__swatches">{colors.map(([name,value,token,use]) => <article key={name}><div style={{ background: value }} /><strong>{name}</strong><code>{value}</code><small>{token}</small><p>{use}</p></article>)}</div></section>

    <section className="team-system__section" aria-labelledby="system-controls"><div className="team-system__section-heading"><p className="eyebrow">03 / COMPONENTS</p><h2 id="system-controls">Controls and navigation</h2><p>The shared header has a 40px blue announcement and a 72px translucent navigation row with 12px backdrop blur and a very subtle bottom rule over light sections. Its logo and navigation links turn white over dark sections and return to ink over light sections; the Brochure control stays on a filled white surface in both states. Opening Services or Industries joins the navigation row and dropdown into one bordered card within the page rails, with rounded top corners and no header or overlay color beyond the rails. Controls use 4px corners and small directional icons.</p></div><div className="team-system__controls"><span className="team-system__button team-system__button--primary">Contact Us <ChevronRight size={16} /></span><span className="team-system__button team-system__button--outline"><Download size={16} /> Brochure</span><span className="team-system__text-link">View our work <ChevronRight size={16} /></span></div><p className="team-system__note">The brochure control is a visual placeholder until an approved brochure file is supplied. The production header uses the same treatment as the landing page.</p></section>

    <section className="team-system__section team-system__section--services" aria-labelledby="system-service-cards"><div className="team-system__section-heading"><p className="eyebrow">04 / COMPONENTS</p><h2 id="system-service-cards">Service cards</h2><p>Two black cards with large white headings and interactive Hairline artwork introduce the two service departments. Hover and focus turn the surface blue.</p></div><ServicesIntro /></section>

    <section className="team-system__section team-system__section--cta" aria-labelledby="system-cta"><div className="team-system__section-heading"><p className="eyebrow">05 / COMPONENTS</p><h2 id="system-cta">Project CTA</h2><p>A dark split card closes every active page. The left half carries the invitation and the shared primary button; a solid dark-gray panel holds the animated Kyte mark at 10% opacity. On small screens, the mark leads and the copy follows.</p></div><SplitCtaBanner /></section>

    <section className="team-system__section" aria-labelledby="system-layout"><div className="team-system__section-heading"><p className="eyebrow">06 / LAYOUT</p><h2 id="system-layout">Spacing and motion</h2><p>The content frame reaches 1,344px, with a 16px outer gutter and a 20–32px section inset. Editorial headings stay inset, while tickers and horizontal carousels reach the page rails. A carousel&apos;s first card starts aligned with its heading, later cards scroll to the left rail, and the final card ends with the matching right inset. The homepage and Work index share the same two-column project card: 16:9 media, inline client and summary copy, then date and project category below. Article pages share the case study breadcrumb, title and right-side facts; the Design News summary and facts align at the top. Their sticky topic rail has a compact contact card and a neutral topic container, and highlights the section at the viewport center. On mobile, the card and topic links sit above the body. Work filters use the shared 4px control radius and black active and hover treatment. The showreel fills the page width below the hero. The previous homepage&apos;s client grid now follows Services: six columns on desktop, three on mobile, with thin rules and grayscale logos that reveal color on hover. The shared footer uses the light gray section surface. Internal page links use a full-viewport blue panel that rises to cover the old page and clears upward after navigation. Same-page anchors and reduced-motion preferences bypass this transition.</p></div><div className="team-system__rules"><div><strong>4px</strong><span>Controls</span></div><div><strong>6px</strong><span>Service cards</span></div><div><strong>8px</strong><span>Other cards</span></div><div><strong>200ms</strong><span>Hover transitions</span></div></div><p className="team-system__note">Respect reduced motion by stopping the logo ticker and nonessential transitions. Preserve visible keyboard focus, readable contrast and descriptive media alternatives.</p></section>
  </main><TeamPreviewFooter /></>;
}
