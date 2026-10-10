"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ChevronDown, Download } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

type Menu = "services" | "industries" | null;

function isDarkUnderNav(header: HTMLElement): boolean {
  const navRow = header.querySelector<HTMLElement>(".nav-row");
  if (!navRow) return false;
  const { top, height } = navRow.getBoundingClientRect();
  const y = Math.max(0, Math.min(window.innerHeight - 1, top + height / 2));
  const samplePoints = [.25, .5, .75].map((part) => window.innerWidth * part);
  const darkPoints = samplePoints.filter((x) => {
    const underneath = document.elementsFromPoint(x, y).find((element) =>
      !header.contains(element) && !element.closest(".nav-overlay, .page-transition, nextjs-portal"));
    for (let element: Element | null | undefined = underneath; element && element !== document.body; element = element.parentElement) {
      const theme = element.getAttribute("data-nav-theme");
      if (theme) return theme === "dark";
      const color = getComputedStyle(element).backgroundColor.match(/rgba?\(([^)]+)\)/);
      if (!color) continue;
      const [red, green, blue, alpha = 1] = color[1].split(",").map(Number);
      if (alpha < .9) continue;
      return (.2126 * red + .7152 * green + .0722 * blue) / 255 < .42;
    }
    return false;
  }).length;
  return darkPoints >= 2;
}

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
  const [openMenu, setOpenMenu] = useState<Menu>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkUnderNav, setDarkUnderNav] = useState(false);
  const [previousMenu, setPreviousMenu] = useState<Menu>(null);
  const [slideDirection, setSlideDirection] = useState<-1 | 0 | 1>(0);
  const [menuHeight, setMenuHeight] = useState(0);
  const headerRef = useRef<HTMLElement>(null);
  const megaMenuRef = useRef<HTMLElement>(null);
  const servicesPanelRef = useRef<HTMLDivElement>(null);
  const industriesPanelRef = useRef<HTMLDivElement>(null);
  const panelTransitionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuOpenTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeMenu = openMenu;
  const menuPanelRef = activeMenu === "services" ? servicesPanelRef : activeMenu === "industries" ? industriesPanelRef : null;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      setOpenMenu(null);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    const onOutside = (event: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) setOpenMenu(null);
    };
    const onDesktopWidth = (event: MediaQueryListEvent) => {
      if (event.matches) { setMobileOpen(false); setOpenMenu(null); }
    };
    const desktop = window.matchMedia("(min-width: 1200px)");
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onOutside);
    desktop.addEventListener("change", onDesktopWidth);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onOutside);
      desktop.removeEventListener("change", onDesktopWidth);
    };
  }, []);

  useEffect(() => {
    let frame = 0;
    const updateTheme = () => {
      frame = 0;
      if (headerRef.current) setDarkUnderNav(isDarkUnderNav(headerRef.current));
    };
    const scheduleThemeUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateTheme);
    };
    window.addEventListener("scroll", scheduleThemeUpdate, { passive: true });
    window.addEventListener("resize", scheduleThemeUpdate);
    window.addEventListener("load", scheduleThemeUpdate);
    scheduleThemeUpdate();
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleThemeUpdate);
      window.removeEventListener("resize", scheduleThemeUpdate);
      window.removeEventListener("load", scheduleThemeUpdate);
    };
  }, []);

  useLayoutEffect(() => {
    const fitMenu = () => {
      const panel = menuPanelRef?.current;
      const wrapper = megaMenuRef.current;
      if (!activeMenu || !panel || !wrapper || mobileOpen) {
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
    if (menuOpenTimer.current) clearTimeout(menuOpenTimer.current);
    if (menuCloseTimer.current) clearTimeout(menuCloseTimer.current);
  }, []);

  const cancelMenuClose = () => {
    if (menuCloseTimer.current) clearTimeout(menuCloseTimer.current);
    menuCloseTimer.current = null;
  };
  const closeDesktopMenu = () => {
    if (menuOpenTimer.current) clearTimeout(menuOpenTimer.current);
    setPreviousMenu(null);
    setOpenMenu(null);
  };
  const scheduleMenuClose = () => {
    cancelMenuClose();
    menuCloseTimer.current = setTimeout(closeDesktopMenu, 180);
  };
  const showDesktopMenu = (menu: Exclude<Menu, null>) => {
    cancelMenuClose();
    if (activeMenu === menu) return;
    if (activeMenu) {
      setPreviousMenu(activeMenu);
      setSlideDirection(activeMenu === "services" ? 1 : -1);
      if (panelTransitionTimer.current) clearTimeout(panelTransitionTimer.current);
      panelTransitionTimer.current = setTimeout(() => setPreviousMenu(null), 500);
    } else {
      setPreviousMenu(null);
      setSlideDirection(0);
    }
    setOpenMenu(menu);
  };
  const hoverDesktopMenu = (menu: Exclude<Menu, null>) => {
    if (menuOpenTimer.current) clearTimeout(menuOpenTimer.current);
    menuOpenTimer.current = setTimeout(() => showDesktopMenu(menu), activeMenu ? 0 : 80);
  };
  const toggleDesktopMenu = (menu: Exclude<Menu, null>) => {
    if (menuOpenTimer.current) clearTimeout(menuOpenTimer.current);
    if (activeMenu === menu) closeDesktopMenu();
    else showDesktopMenu(menu);
  };
  const panelMotionClass = (menu: Exclude<Menu, null>) => {
    const isActive = activeMenu === menu && !mobileOpen;
    const classes = ["mega-menu__panel"];
    if (isActive) classes.push("is-active");
    if (isActive && previousMenu && slideDirection !== 0) classes.push(menu === "services" ? "is-entering-left" : "is-entering-right");
    return classes.join(" ");
  };

  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [mobileOpen]);

  return <>
    <header ref={headerRef} className={`site-header${scrolled ? " is-scrolled" : ""}${darkUnderNav && !mobileOpen && !activeMenu ? " is-dark" : ""}${mobileOpen ? " is-mobile-open" : ""}${activeMenu && !mobileOpen ? " is-menu-open" : ""}`} style={{ backdropFilter: mobileOpen || activeMenu ? "none" : "blur(12px)", WebkitBackdropFilter: mobileOpen || activeMenu ? "none" : "blur(12px)" }} onMouseEnter={cancelMenuClose} onMouseLeave={scheduleMenuClose} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) closeDesktopMenu(); }}>
      <div className="announcement-bar">
        <p>Find your biggest digital opportunities in 30 minutes. <Link href="/contact">Book a consultation</Link></p>
      </div>
      <div className={`nav-shell${activeMenu && !mobileOpen ? " is-open" : ""}`}>
        <div className="nav-row">
          <Link className="brand" href="/" aria-label="Kyte home" onClick={() => { setOpenMenu(null); setMobileOpen(false); }}><Image className="brand__logo" src="/kyte-agency-logo.svg" alt="" width={1379} height={200} priority unoptimized /></Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            <Link className="nav-link" href="/work" onMouseEnter={scheduleMenuClose}>Work</Link>
            <button className="nav-trigger" type="button" aria-expanded={activeMenu === "services"} aria-controls="services-menu" onMouseEnter={() => hoverDesktopMenu("services")} onMouseLeave={() => { if (menuOpenTimer.current) clearTimeout(menuOpenTimer.current); }} onClick={() => toggleDesktopMenu("services")} onKeyDown={(event) => { if (event.key === "ArrowDown") { event.preventDefault(); showDesktopMenu("services"); requestAnimationFrame(() => servicesPanelRef.current?.querySelector("a")?.focus()); } }}>Services <ChevronDown aria-hidden="true" /></button>
            <button className="nav-trigger" type="button" aria-expanded={activeMenu === "industries"} aria-controls="industries-menu" onMouseEnter={() => hoverDesktopMenu("industries")} onMouseLeave={() => { if (menuOpenTimer.current) clearTimeout(menuOpenTimer.current); }} onClick={() => toggleDesktopMenu("industries")} onKeyDown={(event) => { if (event.key === "ArrowDown") { event.preventDefault(); showDesktopMenu("industries"); requestAnimationFrame(() => industriesPanelRef.current?.querySelector("a")?.focus()); } }}>Industries <ChevronDown aria-hidden="true" /></button>
            <Link className="nav-link" href="/insights" onMouseEnter={scheduleMenuClose}>Insights</Link>
            <Link className="nav-link" href="/about" onMouseEnter={scheduleMenuClose}>About</Link>
          </nav>
          <div className="nav-actions">
            <button className="brochure-button kyte-button kyte-button--outline" type="button" onMouseEnter={scheduleMenuClose}><Download size={16} aria-hidden="true" /> Brochure</button>
            <Link className="contact-button kyte-button" href="/contact" onMouseEnter={scheduleMenuClose}>Contact Us <ChevronRight size={16} aria-hidden="true" /></Link>
          </div>
          <div className="mobile-actions"><button className="mobile-toggle" type="button" aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen} aria-controls="mobile-menu" onClick={() => { setMobileOpen(!mobileOpen); setOpenMenu(null); }}><span /><span /></button></div>
        </div>
        <nav ref={megaMenuRef} className={`mega-menu${activeMenu && !mobileOpen ? " is-open" : ""}`} aria-label="Expanded navigation" aria-hidden={!activeMenu || mobileOpen} inert={!activeMenu || mobileOpen} style={{ height: activeMenu && !mobileOpen ? `${menuHeight}px` : "0px" }}>
          <div ref={servicesPanelRef} id="services-menu" className={panelMotionClass("services")} role="region" aria-label="Services menu" aria-hidden={activeMenu !== "services" || mobileOpen} inert={activeMenu !== "services" || mobileOpen}>
          <div className="mega-menu__grid">
            {services.map(group => <section className="mega-menu__column" key={group.href}>
              <h2>{group.title}</h2>
              <ul className="mega-menu__list">{group.items.map(([title, href]) => <li key={href}><Link href={href}><b>{title}</b><span>{serviceDescriptions[title]}</span></Link></li>)}</ul>
            </section>)}
            <aside className="mega-menu__aside"><div className="mega-menu__feature"><div className="mega-menu__image-placeholder" aria-hidden="true" /><span className="mega-menu__eyebrow">Featured</span><strong>How we work</strong><p>See how Kyte connects research, design and delivery around each project.</p><Link className="mega-menu__more" href="/#approach">Explore our approach <ChevronRight size={15} aria-hidden="true" /></Link></div></aside>
            <div className="mega-menu__foot"><Link className="mega-menu__more" href="/contact">Talk about your project <ChevronRight size={16} aria-hidden="true" /></Link></div>
          </div>
          </div>
          <div ref={industriesPanelRef} id="industries-menu" className={panelMotionClass("industries")} role="region" aria-label="Industries menu" aria-hidden={activeMenu !== "industries" || mobileOpen} inert={activeMenu !== "industries" || mobileOpen}>
          <div className="mega-menu__grid">
            <section className="mega-menu__column"><h2>Digital products</h2><ul className="mega-menu__list">{industries.slice(0, 2).map(industry => <li key={industry.href}><Link href={industry.href}><b>{industry.title}</b><span>{industry.description}</span></Link></li>)}</ul></section>
            <section className="mega-menu__column"><h2>Consumer experiences</h2><ul className="mega-menu__list">{industries.slice(2).map(industry => <li key={industry.href}><Link href={industry.href}><b>{industry.title}</b><span>{industry.description}</span></Link></li>)}</ul></section>
            <aside className="mega-menu__aside"><div className="mega-menu__feature"><span className="mega-menu__eyebrow">Selected experience</span><strong>Work shaped by context</strong><p>Explore the sectors where Kyte has built products, websites and brands.</p><Link className="mega-menu__more" href="/work">View our work <ChevronRight size={15} aria-hidden="true" /></Link></div></aside>
            <div className="mega-menu__foot"><Link className="mega-menu__more" href="/industries">Explore industries <ChevronRight size={16} aria-hidden="true" /></Link></div>
          </div>
          </div>
        </nav>
        {mobileOpen && <nav className="mobile-menu" id="mobile-menu" aria-label="Mobile navigation" onClick={(event) => { if ((event.target as HTMLElement).closest("a")) setMobileOpen(false); }}>
          <div className="mobile-menu__links">
            <Link className="mobile-menu__link" href="/work">Work</Link>
            <button className="mobile-menu__trigger" type="button" aria-expanded={openMenu === "services"} aria-controls="mobile-services" onClick={() => setOpenMenu(openMenu === "services" ? null : "services")}>Services <ChevronDown aria-hidden="true" /></button>
            {openMenu === "services" && <div className="mobile-menu__sub" id="mobile-services">{services.map(group => <div className="mobile-menu__group" key={group.href}><h2>{group.title}</h2><ul>{group.items.map(([name, href]) => <li key={href}><Link href={href}><b>{name}</b><span>{serviceDescriptions[name]}</span></Link></li>)}</ul><Link className="mobile-menu__more" href={group.href}>Explore {group.title} <ChevronRight size={15} aria-hidden="true" /></Link></div>)}</div>}
            <button className="mobile-menu__trigger" type="button" aria-expanded={openMenu === "industries"} aria-controls="mobile-industries" onClick={() => setOpenMenu(openMenu === "industries" ? null : "industries")}>Industries <ChevronDown aria-hidden="true" /></button>
            {openMenu === "industries" && <div className="mobile-menu__sub" id="mobile-industries"><div className="mobile-menu__group"><h2>Selected experience</h2><ul>{industries.map(industry => <li key={industry.href}><Link href={industry.href}><b>{industry.title}</b><span>{industry.description}</span></Link></li>)}</ul><Link className="mobile-menu__more" href="/industries">Explore industries <ChevronRight size={15} aria-hidden="true" /></Link></div></div>}
            <Link className="mobile-menu__link" href="/insights">Insights</Link><Link className="mobile-menu__link" href="/about">About</Link>
          </div>
          <div className="mobile-menu__contact"><Link className="kyte-button" href="/contact">Contact Us <ChevronRight size={16} aria-hidden="true" /></Link></div>
        </nav>}
      </div>
    </header>
    {activeMenu && !mobileOpen && <div className={`nav-overlay${scrolled ? " is-scrolled" : ""}`} onMouseEnter={scheduleMenuClose} onClick={closeDesktopMenu} aria-hidden="true" />}
  </>;
}
