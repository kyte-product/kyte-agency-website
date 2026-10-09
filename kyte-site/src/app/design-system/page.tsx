import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChevronDown, Maximize, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import "./design-system.css";

export const metadata: Metadata = {
  title: "Design system | Kyte website preview",
  description: "Working colors, typography, layout, and interface styles for the Kyte website redesign.",
  robots: { index: false, follow: false },
};

// Keep these documented swatches in sync with the live tokens in globals.css.
const colors = [
  { name: "Near black", token: "--color-night", value: "#050505", use: "High contrast surfaces and primary navigation" },
  { name: "Warm ink", token: "--color-ink", value: "#1A1A16", use: "Headings and body text" },
  { name: "Brand blue", token: "--color-blue", value: "#4F65E8", use: "Actions, links, focus, eyebrows, and hero accent" },
  { name: "Light violet", token: "--color-electric", value: "#A88AF2", use: "Gradient transitions and illustration" },
  { name: "Cyan", token: "--color-cyan", value: "#64C8EA", use: "Bright artwork accents" },
  { name: "Coral", token: "--color-coral", value: "#F35C70", use: "Expressive artwork and gradients" },
  { name: "Orange", token: "--color-orange", value: "#FF713D", use: "Warm artwork and gradients" },
  { name: "Gold", token: "--color-gold", value: "#FFCB65", use: "Warm artwork highlights" },
  { name: "Lime", token: "--color-lime", value: "#C7EB55", use: "Selective artwork highlights" },
  { name: "Lavender", token: "--color-sky", value: "#D9CAFA", use: "Soft accents" },
  { name: "Pale lavender", token: "--color-ice", value: "#E9E2FA", use: "Hero cells and soft artwork" },
  { name: "Violet wash", token: "--color-aqua", value: "#F5F1FD", use: "Gentle color surfaces" },
  { name: "Soft violet", token: "--color-mint", value: "#F1F0F7", use: "Gentle violet surfaces" },
  { name: "White", token: "--color-white", value: "#FFFFFF", use: "Main page background and cards" },
  { name: "Surface", token: "--color-surface", value: "#F8F8F7", use: "Subtle section and card backgrounds" },
  { name: "Section surface", token: "--color-surface-secondary", value: "#FAFAFA", use: "Selected Work and Services section backgrounds" },
  { name: "Control hover", token: "--color-control-hover", value: "#F5F5F5", use: "Neutral hover fill for outlined controls" },
  { name: "Border", token: "--color-border", value: "#EEEEEC", use: "Rails, dividers, and field outlines" },
] as const;

const spacing = [4, 8, 12, 16, 24, 32, 48, 64, 96] as const;
const radii = [
  { name: "Small", value: "4px", token: "--radius-small", use: "Compact tiles and inset elements" },
  { name: "Medium", value: "6px", token: "--radius-medium", use: "Small cards and image frames" },
  { name: "Large", value: "8px", token: "--radius-large", use: "Cards, controls, menus, and dialogs" },
] as const;

export default function DesignSystemPage() {
  return <>
    <SiteHeader />
    <main className="system-page">
      <section className="system-hero" aria-labelledby="system-title">
        <div className="system-hero__copy">
          <p className="eyebrow">KYTE WEBSITE / WORKING FOUNDATION</p>
          <h1 id="system-title">Design system</h1>
          <p>The live foundations for the Kyte homepage: one type scale, violet interface actions, expressive artwork accents, and three corner sizes.</p>
          <Link href="/">Back to the homepage <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </div>
        <div className="system-hero__art" aria-label="Cobalt, violet, coral, orange, and gold gradient artwork">
          <span className="system-hero__art-label">01 / COLOR DIRECTION</span>
          <span className="system-hero__art-caption">From depth to light.</span>
        </div>
      </section>

      <section className="system-section" aria-labelledby="system-colors-title">
        <div className="system-section__intro"><p className="eyebrow">01 / FOUNDATIONS</p><h2 id="system-colors-title">Color</h2><p>Near black and warm ink carry the text. Kyte cobalt marks actions, links, focus, eyebrows, and the hero accent. Cyan, violet, coral, orange, gold, and lime give artwork more range while page surfaces stay neutral. Client and project artwork retains its source colors.</p></div>
        <div className="system-swatch-grid">
          {colors.map((color) => <article className="system-swatch" key={color.token}>
            <div className="system-swatch__color" style={{ backgroundColor: `var(${color.token})` }} />
            <div className="system-swatch__info"><strong>{color.name}</strong><code>{color.value}</code><span>{color.token}</span><p>{color.use}</p></div>
          </article>)}
        </div>
        <div className="system-gradient-grid"><div className="system-gradient system-gradient--brand"><span>Primary gradient</span><code>--gradient-brand</code></div><div className="system-gradient system-gradient--expressive"><span>Expressive gradient</span><code>--gradient-expressive</code></div><div className="system-gradient system-gradient--soft"><span>Soft gradient</span><code>--gradient-soft</code></div></div>
        <p className="system-note">Use ink for reading and violet for controls. Keep page surfaces white or neutral, with broader colors reserved for selected artwork and motion. The homepage service cards use the archived warm neutral surface, fine border, violet and teal clipped artwork, and compact editorial copy.</p>
      </section>

      <section className="system-section" aria-labelledby="system-type-title">
        <div className="system-section__intro"><p className="eyebrow">02 / FOUNDATIONS</p><h2 id="system-type-title">Typography</h2><p>DM Sans is the only interface font. Display, section, and card headings use a 1.2 line height and a lighter weight. Section eyebrows use 12px uppercase brand blue, 0.09em tracking, and 1.3 line height.</p></div>
        <div className="system-type-list">
          <div><span>Homepage display / 60-104</span><p className="system-type-display">Design for what comes next</p></div>
          <div><span>Section / 30-44</span><p className="system-type-section">A clearer way forward.</p></div>
          <div><span>Title / 26-36</span><p className="system-type-title">Every detail has a purpose.</p></div>
          <div><span>Card / 19-26</span><p className="system-type-card">Design that works harder.</p></div>
          <div><span>Lead / 18-20</span><p className="system-type-body">We bring product, website, and brand design together so people can understand and use what you make.</p></div>
          <div><span>Body / 16</span><p className="system-type-regular">Clear information helps people decide what to do next.</p></div>
          <div><span>Caption / 14</span><p className="system-type-caption">Supporting details and secondary actions</p></div>
          <div><span>Label / 12</span><p className="system-type-label">A POINT OF VIEW, MADE PRACTICAL</p></div>
        </div>
      </section>

      <section className="system-section" aria-labelledby="system-radius-title">
        <div className="system-section__intro"><p className="eyebrow">03 / FOUNDATIONS</p><h2 id="system-radius-title">Corners</h2><p>Visible interface corners use 4, 6, or 8 pixels. Circular portraits and decorative dots keep their round shape, and the unscrolled navbar stays square against the page rails.</p></div>
        <div className="system-radius-grid">{radii.map((radius) => <article className="system-radius" key={radius.token} style={{ borderRadius: `var(${radius.token})` }}><strong>{radius.name} / {radius.value}</strong><code>{radius.token}</code><p>{radius.use}</p></article>)}</div>
      </section>

      <section className="system-section" aria-labelledby="system-layout-title">
        <div className="system-section__intro"><p className="eyebrow">04 / FOUNDATIONS</p><h2 id="system-layout-title">Layout and spacing</h2><p>The page rails share a 1,344px maximum frame. Sections have a 32px inset at desktop sizes, scaling down to 20px on mobile. The How We Work section uses a four-column impact row that becomes two columns on mobile. A diagonal edge takes the white page into the #FAFAFA Services surface, with three parallel color bars on the right.</p></div>
        <div className="system-layout-demo"><span>RAIL</span><div><span>SECTION CONTENT</span></div><span>RAIL</span></div>
        <div className="system-spacing-grid">{spacing.map((space) => <div className="system-spacing" key={space}><span>{space}px</span><i style={{ width: space }} /></div>)}</div>
      </section>

      <section className="system-section" aria-labelledby="system-components-title">
        <div className="system-section__intro"><p className="eyebrow">05 / COMPONENTS</p><h2 id="system-components-title">Interface pieces</h2><p>Buttons, fields, cards, and navigation draw from the same type, color, and corner tokens. The dark navigation action and white button on the dark contact banner are contrast variants.</p></div>
        <div className="system-component-grid">
          <article className="system-component"><span className="system-component__name">Actions</span><div className="system-component__actions"><span className="system-button system-button--primary">Start a project <ArrowUpRight size={16} aria-hidden="true" /></span><span className="system-button system-button--icon" aria-hidden="true"><Maximize size={18} strokeWidth={1.8} /></span><span className="system-button system-button--secondary">Explore our work <ArrowRight size={16} aria-hidden="true" /></span><span className="system-button system-button--text">View details <ArrowUpRight size={16} aria-hidden="true" /></span></div><p>Primary actions use brand blue. The icon-only expand control uses one fullscreen glyph in a black button with the same 8px corner and inset shadow. The navigation contact action is also black. Outlined controls use a #F5F5F5 hover fill and retain the neutral border.</p></article>
          <article className="system-component"><span className="system-component__name">Fields and focus</span><label className="system-field">Your work email<input type="email" placeholder="name@company.com" /></label><p>Fields use a pale border, a white surface, and a visible brand blue focus ring.</p></article>
          <article className="system-component"><span className="system-component__name">Card</span><div className="system-sample-card"><span><Sparkles size={20} aria-hidden="true" /></span><h3>Built around your next step</h3><p>A light surface, a clear title, and one useful action.</p><span className="system-sample-card__link">Explore this service <ArrowUpRight size={16} aria-hidden="true" /></span></div></article>
          <article className="system-component"><span className="system-component__name">Navigation states</span><div className="system-nav-sample"><span>Work</span><span className="system-nav-sample__active">Services <ChevronDown size={14} aria-hidden="true" /></span><span>Industries <ChevronDown size={14} aria-hidden="true" /></span></div><p>The expanded desktop menu attaches to the bar with divided text columns, a pale feature panel, a footer link, and a blurred page backdrop. Its selected trigger stays dark. The closed bar retains its existing style and narrows after scrolling.</p></article>
          <article className="system-component system-component--wide"><span className="system-component__name">Selected work list view</span><div className="system-work-row"><span className="system-work-row__mark"><Image src="/kyte-work/collectbee-icon.png" alt="" width={42} height={42} /></span><span><strong>Project name.</strong> A short description of the work.</span><span className="system-work-row__details"><small>Project period</small>Industry · Service</span><span className="system-work-row__image">Project image</span></div><p>The two-column image grid is the default, with the client mark, project summary, period, and category below each image. The view toggle switches to these editorial rows. Dates are provisional preview values and must be verified before publishing.</p></article>
          <article className="system-component system-component--wide"><span className="system-component__name">Case study template</span><p>Case studies use the shared navigation, page rails, DM Sans type tokens, and neutral rules. The reusable sequence is project title and details, cover, editorial content, a three-card impact panel, project images, and an optional approved testimonial. The impact panel has a section label and heading above a pale surface with white metric cards. Image and impact slots remain placeholders until verified material is supplied.</p></article>
          <article className="system-component system-component--wide"><span className="system-component__name">Contact banner</span><div className="system-contact-banner"><span className="system-contact-banner__mark" aria-hidden="true" /><span className="system-contact-banner__copy">Have a project in mind?</span></div><p>The short banner has a white section background, the animated mark at the left, and copy that stays within the black area. The supplied gradient image appears on the right. Its single action is a white “Explore our work” button.</p></article>
          <article className="system-component system-component--wide"><span className="system-component__name">Footer utility row</span><p>The footer uses a four-column utility row on desktop and a balanced two-by-two layout at tablet widths. The supplied DesignRush badge remains unaltered; labels, contact controls, and Lucide interface icons use DM Sans and shared type, color, stroke, spacing, and corner tokens. Social marks keep recognizable brand shapes. Contact controls hover to #F5F5F5 and keep a neutral border. Neutral rules span the page rails and sit below the copyright row.</p></article>
        </div>
      </section>

      <section className="system-section system-section--last" aria-labelledby="system-motion-title">
        <div className="system-section__intro"><p className="eyebrow">06 / BEHAVIOR</p><h2 id="system-motion-title">Motion and use</h2><p>Small hover changes take about 200ms. The navbar width transition takes 400ms. Switching Selected Work between grid and list uses a 420ms fade and slight upward settle, with the selected toggle surface transitioning between icons. Reduced-motion settings skip the content animation. The hero uses a static cobalt text accent and understated line art on the service cards. The How We Work diagram is currently hidden while its motion is reviewed. Its source and preview assets remain available for a later revision.</p></div>
        <div className="system-rule-grid"><p><strong>Contrast</strong><span>Use dark ink for reading on light surfaces. Violet marks actions and focus. Check text contrast individually on colorful artwork.</span></p><p><strong>Icons</strong><span>Use Lucide icons for interface actions with consistent stroke weight and size. Keep social icons faithful to their recognizable brand marks.</span></p><p><strong>Imagery</strong><span>Client logos are gray at rest. On hover, logos with a color asset show that color; the rest turn solid black. Wider visual bounds and extra height for compact marks balance their apparent size. Color assets blend into the tile so baked white pixels do not form a rectangle. The people tile uses a muted four-second portrait loop and a still image for reduced motion.</span></p></div>
      </section>
    </main>
  </>;
}
