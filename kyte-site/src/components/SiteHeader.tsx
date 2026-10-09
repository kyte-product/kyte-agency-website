"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChevronDown, ChevronRight, Mail, Menu, Sparkles, X } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

type Menu = "services" | "industries" | null;

const services = [
  { title: "UI/UX Design & Development", href: "/ui-ux-design-development", description: "Digital products and websites designed around how people use them.", items: [
    ["UX Research & Design Audits", "/ui-ux-design-development/ux-research-design-audit"],
    ["Website Design & Development", "/ui-ux-design-development/website-design-development"],
    ["Mobile App Design", "/ui-ux-design-development/mobile-app-design"],
    ["SaaS & Web App Design", "/ui-ux-design-development/saas-web-app-design"],
    ["eCommerce & Shopify Websites", "/ui-ux-design-development/ecommerce-shopify-websites"],
  ] },
  { title: "Branding & Marketing", href: "/branding-marketing", description: "A clear brand and the creative work that carries it into the world.", items: [
    ["Brand Strategy & Identity", "/branding-marketing/brand-strategy-identity"],
    ["Graphic Design", "/branding-marketing/graphic-design"],
    ["Video Production & Motion Graphics", "/branding-marketing/video-production-motion-graphics"],
    ["Social Media Marketing", "/branding-marketing/social-media-marketing"],
    ["SEO & AI Search Optimisation", "/branding-marketing/seo-ai-search-optimisation"],
  ] },
] as const;

const serviceDescriptions: Record<string, string> = {
  "UX Research & Design Audits": "Find the friction in an existing experience.",
  "Website Design & Development": "Make your offer clear and easy to use.",
  "Mobile App Design": "Shape useful journeys for smaller screens.",
  "SaaS & Web App Design": "Bring clarity to complex product workflows.",
  "eCommerce & Shopify Websites": "Help people discover and choose products.",
  "Brand Strategy & Identity": "Define a distinct direction for your brand.",
  "Graphic Design": "Keep the details consistent wherever you appear.",
  "Video Production & Motion Graphics": "Explain ideas through movement and film.",
  "Social Media Marketing": "Create content for ongoing conversations.",
  "SEO & AI Search Optimisation": "Make useful content easier to find.",
};

const industries = [
  { title: "Fintech", href: "/industries/fintech", description: "Clearer experiences for complex financial products." },
  { title: "SaaS & Startups", href: "/industries/saas-startups", description: "Products that make the important work easier." },
  { title: "D2C & eCommerce", href: "/industries/d2c-ecommerce", description: "Better journeys from discovery to purchase." },
  { title: "Hospitality & F&B", href: "/industries/hospitality-food-beverage", description: "Distinct brands and easy digital journeys." },
] as const;

export function SiteHeader() {
  const [bannerVisible, setBannerVisible] = useState(true);
  const [openMenu, setOpenMenu] = useState<Menu>(null);
  const [pinnedMenu, setPinnedMenu] = useState<Menu>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [previousMenu, setPreviousMenu] = useState<Menu>(null);
  const [slideDirection, setSlideDirection] = useState<-1 | 0 | 1>(0);
  const [menuHeight, setMenuHeight] = useState(0);
  const headerRef = useRef<HTMLElement>(null);
  const megaMenuRef = useRef<HTMLElement>(null);
  const servicesPanelRef = useRef<HTMLDivElement>(null);
  const industriesPanelRef = useRef<HTMLDivElement>(null);
  const previousScrollY = useRef(0);
  const panelTransitionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const currentY = Math.max(0, window.scrollY);
      const difference = currentY - previousScrollY.current;
      setScrolled(currentY > 12);

      if (mobileOpen || currentY <= 24 || difference < -4) {
        setNavHidden(false);
      } else if (difference > 4 && currentY > 80) {
        setNavHidden(true);
        setOpenMenu(null);
        setPinnedMenu(null);
      }

      previousScrollY.current = currentY;
    };
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpenMenu(null); setPinnedMenu(null); setMobileOpen(false); } };
    const onOutside = (event: PointerEvent) => { if (headerRef.current && !headerRef.current.contains(event.target as Node)) { setOpenMenu(null); setPinnedMenu(null); } };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onOutside);
    return () => { window.removeEventListener("scroll", onScroll); document.removeEventListener("keydown", onKey); document.removeEventListener("pointerdown", onOutside); };
  }, [mobileOpen]);

  const activeMenu = pinnedMenu ?? openMenu;
  const menuPanelRef = activeMenu === "services" ? servicesPanelRef : activeMenu === "industries" ? industriesPanelRef : null;

  useLayoutEffect(() => {
    const fitMenu = () => {
      const panel = menuPanelRef?.current;
      const wrapper = megaMenuRef.current;
      if (!activeMenu || !panel || !wrapper) {
        setMenuHeight(0);
        return;
      }
      const availableHeight = Math.max(0, window.innerHeight - wrapper.getBoundingClientRect().top - 12);
      setMenuHeight(Math.min(panel.scrollHeight, availableHeight));
    };

    fitMenu();
    window.addEventListener("resize", fitMenu);
    return () => window.removeEventListener("resize", fitMenu);
  }, [activeMenu, menuPanelRef, mobileOpen]);

  useEffect(() => () => {
    if (panelTransitionTimer.current) clearTimeout(panelTransitionTimer.current);
    if (menuCloseTimer.current) clearTimeout(menuCloseTimer.current);
  }, []);

  const cancelMenuClose = () => {
    if (menuCloseTimer.current) clearTimeout(menuCloseTimer.current);
    menuCloseTimer.current = null;
  };
  const scheduleMenuClose = () => {
    cancelMenuClose();
    menuCloseTimer.current = setTimeout(() => {
      setPreviousMenu(null);
      setPinnedMenu(null);
      setOpenMenu(null);
    }, 180);
  };

  const openDesktopMenu = (menu: Exclude<Menu, null>) => {
    // Mouse entry and focus can fire together on click. Keep an active panel's
    // transition state intact when the same trigger is reported twice.
    if (activeMenu === menu) {
      cancelMenuClose();
      return;
    }

    if (activeMenu && activeMenu !== menu) {
      setPreviousMenu(activeMenu);
      setSlideDirection(activeMenu === "services" ? 1 : -1);
      if (panelTransitionTimer.current) clearTimeout(panelTransitionTimer.current);
      panelTransitionTimer.current = setTimeout(() => setPreviousMenu(null), 500);
    } else {
      setPreviousMenu(null);
      setSlideDirection(0);
    }
    setPinnedMenu(current => current && current !== menu ? null : current);
    setOpenMenu(menu);
  };
  const togglePinnedMenu = (menu: Exclude<Menu, null>) => {
    if (pinnedMenu === menu) {
      setPreviousMenu(null);
      setPinnedMenu(null);
      setOpenMenu(null);
    } else {
      setPreviousMenu(null);
      setSlideDirection(0);
      setPinnedMenu(menu);
      setOpenMenu(menu);
    }
  };
  const closeDesktopMenu = () => { setPreviousMenu(null); setPinnedMenu(null); setOpenMenu(null); };
  const panelMotionClass = (menu: Exclude<Menu, null>) => {
    const isActive = activeMenu === menu && !mobileOpen;
    const isExiting = previousMenu === menu && activeMenu !== menu && !mobileOpen;
    const classes = ["mega-menu__panel"];
    if (isActive) classes.push("is-active");
    if (isExiting) classes.push(slideDirection === 1 ? "is-exiting-left" : "is-exiting-right");
    if (isActive && previousMenu && slideDirection !== 0) {
      const entersFromLeft = menu === "services" && slideDirection === -1;
      classes.push(entersFromLeft ? "is-entering-left" : "is-entering-right");
    }
    return classes.join(" ");
  };

  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [mobileOpen]);

  return <>
    {bannerVisible && <div className="announcement"><Link href="/#work-preview">A new Kyte is taking shape <Sparkles size={14} aria-hidden="true" /> See what we&apos;re building</Link><button className="announcement__close" type="button" aria-label="Dismiss announcement" onClick={() => setBannerVisible(false)}><X size={17} aria-hidden="true" /></button></div>}
    <header ref={headerRef} className={`site-header${scrolled ? " is-scrolled" : ""}${navHidden ? " is-hidden" : ""}`} onMouseEnter={cancelMenuClose} onMouseLeave={scheduleMenuClose}>
      <div className={`nav-shell${activeMenu && !mobileOpen ? " is-open" : ""}`}>
        <div className="nav-row">
          <Link className="brand" href="/" aria-label="Kyte home" onClick={() => { setOpenMenu(null); setMobileOpen(false); }}><Image className="brand__mark" src="/kyte-mark.png" alt="" width={34} height={34} priority /><span className="brand__name">kyte</span></Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            <Link className="nav-link" href="/work" onMouseEnter={closeDesktopMenu}>Work</Link>
            <button className="nav-trigger" type="button" aria-expanded={activeMenu === "services"} aria-controls="services-menu" onMouseEnter={() => openDesktopMenu("services")} onFocus={() => openDesktopMenu("services")} onClick={() => togglePinnedMenu("services")}>Services <ChevronDown aria-hidden="true" /></button>
            <button className="nav-trigger" type="button" aria-expanded={activeMenu === "industries"} aria-controls="industries-menu" onMouseEnter={() => openDesktopMenu("industries")} onFocus={() => openDesktopMenu("industries")} onClick={() => togglePinnedMenu("industries")}>Industries <ChevronDown aria-hidden="true" /></button>
            <Link className="nav-link" href="/insights" onMouseEnter={closeDesktopMenu}>Insights</Link>
            <Link className="nav-link" href="/about" onMouseEnter={closeDesktopMenu}>About</Link>
          </nav>
          <Link className="contact-button" href="/contact" onMouseEnter={closeDesktopMenu}>Contact Us</Link>
          <div className="mobile-actions"><Link className="mobile-contact" href="/contact" aria-label="Contact Kyte"><Mail size={18} aria-hidden="true" /></Link><button className="mobile-toggle" type="button" aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen} aria-controls="mobile-menu" onClick={() => { setMobileOpen(!mobileOpen); setOpenMenu(null); setPinnedMenu(null); }}>{mobileOpen ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}</button></div>
        </div>
        <nav ref={megaMenuRef} className={`mega-menu${activeMenu && !mobileOpen ? " is-open" : ""}`} aria-label="Expanded navigation" aria-hidden={!activeMenu || mobileOpen} inert={!activeMenu || mobileOpen} style={{ height: activeMenu && !mobileOpen ? `${menuHeight}px` : "0px" }}>
          <div ref={servicesPanelRef} id="services-menu" className={panelMotionClass("services")} role="region" aria-label="Services menu" aria-hidden={activeMenu !== "services" || mobileOpen} inert={activeMenu !== "services" || mobileOpen}>
          <div className="mega-menu__grid">
            {services.map(group => <section className="mega-menu__column" key={group.href}>
              <h2>{group.title}</h2>
              <ul className="mega-menu__list">{group.items.map(([title, href]) => <li key={href}><Link href={href}><b>{title}</b><span>{serviceDescriptions[title]}</span></Link></li>)}</ul>
            </section>)}
            <aside className="mega-menu__aside"><div className="mega-menu__feature"><span className="mega-menu__eyebrow">Featured</span><strong>How we work</strong><p>See how Kyte connects research, design and delivery around each project.</p><Link className="mega-menu__more" href="/#approach">Explore our approach <ChevronRight size={15} aria-hidden="true" /></Link></div></aside>
            <div className="mega-menu__foot"><Link className="mega-menu__more" href="/contact">Talk about your project <ArrowRight size={16} aria-hidden="true" /></Link></div>
          </div>
          </div>
          <div ref={industriesPanelRef} id="industries-menu" className={panelMotionClass("industries")} role="region" aria-label="Industries menu" aria-hidden={activeMenu !== "industries" || mobileOpen} inert={activeMenu !== "industries" || mobileOpen}>
          <div className="mega-menu__grid">
            <section className="mega-menu__column"><h2>Digital products</h2><ul className="mega-menu__list">{industries.slice(0, 2).map(industry => <li key={industry.href}><Link href={industry.href}><b>{industry.title}</b><span>{industry.description}</span></Link></li>)}</ul></section>
            <section className="mega-menu__column"><h2>Consumer experiences</h2><ul className="mega-menu__list">{industries.slice(2).map(industry => <li key={industry.href}><Link href={industry.href}><b>{industry.title}</b><span>{industry.description}</span></Link></li>)}</ul></section>
            <aside className="mega-menu__aside"><div className="mega-menu__feature"><span className="mega-menu__eyebrow">Selected experience</span><strong>Work shaped by context</strong><p>Explore the sectors where Kyte has built products, websites and brands.</p><Link className="mega-menu__more" href="/work">View our work <ChevronRight size={15} aria-hidden="true" /></Link></div></aside>
            <div className="mega-menu__foot"><Link className="mega-menu__more" href="/industries">Explore industries <ArrowRight size={16} aria-hidden="true" /></Link></div>
          </div>
          </div>
        </nav>
        {mobileOpen && <nav className="mobile-menu" id="mobile-menu" aria-label="Mobile navigation" style={{ height: `calc(100dvh - ${scrolled || !bannerVisible ? 80 : 128}px)` }}>
          <div className="mobile-menu__links">
            <Link className="mobile-menu__link" href="/work">Work</Link>
            <button className="mobile-menu__trigger" type="button" aria-expanded={openMenu === "services"} aria-controls="mobile-services" onClick={() => setOpenMenu(openMenu === "services" ? null : "services")}>Services <ChevronDown aria-hidden="true" /></button>
            {openMenu === "services" && <div className="mobile-menu__sub" id="mobile-services">{services.map(group => <div className="mobile-menu__group" key={group.href}><h2>{group.title}</h2><ul>{group.items.map(([name, href]) => <li key={href}><Link href={href}><b>{name}</b><span>{serviceDescriptions[name]}</span></Link></li>)}</ul><Link className="mobile-menu__more" href={group.href}>Explore {group.title} <ArrowRight size={15} aria-hidden="true" /></Link></div>)}</div>}
            <button className="mobile-menu__trigger" type="button" aria-expanded={openMenu === "industries"} aria-controls="mobile-industries" onClick={() => setOpenMenu(openMenu === "industries" ? null : "industries")}>Industries <ChevronDown aria-hidden="true" /></button>
            {openMenu === "industries" && <div className="mobile-menu__sub" id="mobile-industries"><div className="mobile-menu__group"><h2>Selected experience</h2><ul>{industries.map(industry => <li key={industry.href}><Link href={industry.href}><b>{industry.title}</b><span>{industry.description}</span></Link></li>)}</ul><Link className="mobile-menu__more" href="/industries">Explore industries <ArrowRight size={15} aria-hidden="true" /></Link></div></div>}
            <Link className="mobile-menu__link" href="/insights">Insights</Link><Link className="mobile-menu__link" href="/about">About</Link>
          </div>
          <div className="mobile-menu__contact"><div><p>Have a project in mind?</p><Link href="/contact">Let&apos;s talk <ArrowUpRight size={16} aria-hidden="true" /></Link></div></div>
        </nav>}
      </div>
    </header>
    {activeMenu && !mobileOpen && <div className="nav-overlay" onClick={closeDesktopMenu} aria-hidden="true" />}
  </>;
}
