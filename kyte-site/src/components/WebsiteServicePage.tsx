"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, BarChart3, Blocks, Braces, Compass, FileSearch, Gauge, Layers3, LayoutTemplate, Megaphone, Minus, Monitor, MousePointerClick, PanelsTopLeft, PenTool, Plus, Search, ShieldCheck, ShoppingBag, Sparkles } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import "./WebsiteServicePage.css";

const websiteTypes = [
  {
    name: "Company website",
    title: "A clear home for the whole business",
    description: "Give clients, partners and prospective hires one place to understand your offer, see the work behind it and take the next step.",
    image: "/kyte-work/collectbee.png",
    alt: "Collectbee website shown on a tablet",
    theme: "mint",
  },
  {
    name: "Marketing website",
    title: "Built around the journeys that bring people in",
    description: "Connect campaigns, search, content and conversion paths in a site your team can keep improving after launch.",
    image: "/kyte-work/spicy-bayer.webp",
    alt: "SpicyBayer website shown on a desktop display",
    theme: "sky",
  },
  {
    name: "Product website",
    title: "Make a complex product easier to choose",
    description: "Show what the product does, who it helps and how it fits into a real workflow, with details that support a buying decision.",
    image: "/kyte-work/collectbee-browser.png",
    alt: "Collectbee product website in a browser view",
    theme: "lilac",
  },
  {
    name: "Landing page",
    title: "One focused page, one clear next step",
    description: "Give a launch, campaign or audience its own story and action without asking visitors to search through the whole site.",
    image: "/kyte-work/banza.png",
    alt: "Website project presentation",
    theme: "peach",
  },
] as const;

const websiteJobs = [
  { title: "Make the first step easy", description: "A useful path from first visit to enquiry, trial or conversation.", icon: MousePointerClick },
  { title: "Build confidence early", description: "Show the team, work and details people look for before they get in touch.", icon: ShieldCheck },
  { title: "Connect every channel", description: "Give campaigns, social posts and search traffic a destination that makes sense.", icon: Megaphone },
  { title: "Explain the product", description: "Turn features and complex workflows into a story people can follow.", icon: Blocks },
  { title: "Help people find you", description: "Give search engines and visitors a clear page structure and useful content.", icon: Search },
  { title: "Keep working after launch", description: "Make updates manageable as the offer, team and content grow.", icon: Gauge },
] as const;

const work = [
  { name: "Collectbee", description: "A product led website that makes an AI accounts receivable platform easier to understand.", category: "AI accounts receivable · Website design", image: "/kyte-work/collectbee.png", logo: "/kyte-work/collectbee-icon.png", href: "/work/collectbee", alt: "Collectbee website on a tablet" },
  { name: "SpicyBayer", description: "A warm website for a Bavarian, Indian and Tamil fusion restaurant.", category: "Hospitality · Website design", image: "/kyte-work/spicy-bayer.webp", logo: "/kyte-work/spicy-bayer-icon.png", href: "/work", alt: "SpicyBayer website on a desktop screen" },
  { name: "Arka Inventory", description: "A refreshed website for an inventory management platform.", category: "Inventory software · Website design", image: "https://cdn.sanity.io/images/50pibtgs/production/01099437810383d1335759cf2a3324e451f08385-1672x941.png", logo: "/kyte-work/arka-inventory-icon.png", href: "/work", alt: "Arka Inventory website on a desktop screen" },
] as const;

const projectPriorities = [
  { number: "01", title: "Clarity for the buyer", body: "A visitor should be able to understand what you offer, who it is for and what to do next without having to decode the product first.", label: "Content and navigation" },
  { number: "02", title: "Room for the team to grow", body: "The page system should support new services, stories and campaigns without every update turning into a redesign project.", label: "Flexible design system" },
  { number: "03", title: "A launch you can use", body: "Design and development should meet in the browser, with responsive behavior, useful content and a clear handoff for the people who own it.", label: "Design through delivery" },
] as const;

const process = [
  { name: "Discover", deliverables: ["Stakeholder conversations", "Audience and journey mapping", "Content audit", "Site architecture"], outcome: "A shared view of what the website needs to say, who it needs to help and which action matters most.", icon: Compass },
  { name: "Design", deliverables: ["Page structure", "Visual direction", "Responsive layouts", "Prototype and review"], outcome: "An experience that brings the offer, content and brand together across the key journeys.", icon: PenTool },
  { name: "Develop", deliverables: ["Front-end build", "CMS setup where needed", "Integrations", "SEO foundations"], outcome: "A working site built around the agreed experience and ready for the team to manage.", icon: Braces },
  { name: "Launch", deliverables: ["Device and browser QA", "Accessibility review", "Analytics checks", "Launch support"], outcome: "A site tested across the paths people will actually use, with issues resolved before handover.", icon: Gauge },
] as const;

const audiences = [
  { name: "SaaS and product teams", icon: Layers3 },
  { name: "Fintech and finance", icon: BarChart3 },
  { name: "eCommerce brands", icon: ShoppingBag },
  { name: "Hospitality and food", icon: Sparkles },
  { name: "Growing businesses", icon: Monitor },
] as const;

const deliverables = [
  { title: "A site built around the goal", description: "Every page has a purpose. We map content, journeys and calls to action around what the business and visitor need.", icon: Compass },
  { title: "A story people can follow", description: "Structure and writing direction help visitors understand the offer in the right order, from the first screen to the final action.", icon: LayoutTemplate },
  { title: "A manageable foundation", description: "We choose a build and content setup that suits the team responsible for keeping the site current.", icon: PanelsTopLeft },
  { title: "A reusable visual system", description: "Components and page patterns stay consistent while giving future pages enough room to be useful and distinct.", icon: Blocks },
  { title: "A considered launch", description: "Responsive review, accessibility, metadata and analytics checks are part of getting a website ready to use.", icon: Gauge },
] as const;

const engagement = [
  { title: "A new website", description: "Strategy, architecture, design and a build shaped together from the start.", icon: Sparkles },
  { title: "A considered redesign", description: "Rework the structure and experience around the business you are today.", icon: PenTool },
  { title: "A focused audit", description: "Find the clearest improvements in content, journeys, design and technical health.", icon: FileSearch },
] as const;

const benefits = [
  { title: "The right disciplines together", description: "Research, content, brand and product thinking inform the website rather than arriving as separate layers.", icon: Layers3 },
  { title: "Decisions with a reason", description: "We connect each design choice to the audience, the offer and what the page needs to do.", icon: Compass },
  { title: "Useful collaboration", description: "You can see the work take shape, review the details and make decisions at the moments that matter.", icon: MousePointerClick },
  { title: "A consistent system", description: "A small set of strong patterns keeps the site coherent as pages and content are added.", icon: Blocks },
  { title: "A clear path to launch", description: "The work moves through agreed stages with room for feedback and a practical handoff.", icon: Gauge },
  { title: "Space to keep improving", description: "The site can change with the product, the team and what you learn from visitors.", icon: Sparkles },
] as const;

const questions = [
  { question: "What is included in website design and development?", answer: "We shape the site around your goals, audience and content. A typical scope can include discovery, information architecture, page design, responsive components and a website build. The exact platform, CMS, integrations and launch support are agreed for each project." },
  { question: "Can Kyte redesign an existing website?", answer: "Yes. We can review what is working, identify where visitors lose the thread and redesign the structure, content and visual experience around the current offer. We define whether the existing platform can support the result before planning the build." },
  { question: "Do you work with our existing brand and content?", answer: "We can build on an established identity and content library. When the brand story or copy needs work, we can scope that alongside the website so the final experience feels coherent." },
  { question: "Which platform will the website use?", answer: "That depends on the content your team needs to manage, the interactions the site needs and the systems it connects to. We discuss the options during discovery and recommend a setup your team can maintain." },
  { question: "How long does a website project take?", answer: "The timeline depends on the number of page types, content readiness, integrations and review cycles. We map the phases and milestones once the scope is clear, so the team knows what is needed before launch." },
  { question: "What happens after the website launches?", answer: "We plan the handoff, documentation and any agreed launch support as part of the scope. Ongoing updates or new pages can be planned once the site is live and there is real feedback to work from." },
] as const;

function SectionHeading({ id, label, title, description, centered = false }: { id: string; label?: string; title: string; description?: string; centered?: boolean }) {
  return <div className={`website-service__section-heading${centered ? " website-service__section-heading--center" : ""}`}>
    {label && <p className="eyebrow">{label}</p>}
    <h2 id={id}>{title}</h2>
    {description && <p>{description}</p>}
  </div>;
}

export function WebsiteServicePage() {
  const [activeType, setActiveType] = useState(0);
  const [activeProcess, setActiveProcess] = useState(0);
  const [activePriority, setActivePriority] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showAllWork, setShowAllWork] = useState(false);
  const [areaControls, setAreaControls] = useState({ back: false, forward: true });
  const areaTrack = useRef<HTMLDivElement>(null);
  const typeTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const restartTypeTimer = useCallback(() => {
    if (typeTimer.current) clearInterval(typeTimer.current);
    if (typeof window !== "undefined" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      typeTimer.current = setInterval(() => setActiveType((current) => (current + 1) % websiteTypes.length), 6500);
    }
  }, []);

  useEffect(() => {
    restartTypeTimer();
    return () => { if (typeTimer.current) clearInterval(typeTimer.current); };
  }, [restartTypeTimer]);

  const updateAreaControls = useCallback(() => {
    const track = areaTrack.current;
    if (!track) return;
    setAreaControls({ back: track.scrollLeft > 2, forward: track.scrollLeft + track.clientWidth < track.scrollWidth - 2 });
  }, []);

  useEffect(() => {
    const track = areaTrack.current;
    if (!track) return;
    const observer = new ResizeObserver(updateAreaControls);
    observer.observe(track);
    track.addEventListener("scroll", updateAreaControls, { passive: true });
    updateAreaControls();
    return () => { observer.disconnect(); track.removeEventListener("scroll", updateAreaControls); };
  }, [updateAreaControls]);

  function moveAreas(direction: -1 | 1) {
    const track = areaTrack.current;
    const card = track?.querySelector<HTMLElement>(".website-service__area-card");
    if (!track || !card) return;
    const gap = Number.parseFloat(getComputedStyle(track).gap) || 16;
    const step = card.offsetWidth + gap;
    const maxScroll = track.scrollWidth - track.clientWidth;
    const next = Math.max(0, Math.min(maxScroll, track.scrollLeft + direction * step));
    track.scrollTo({ left: next, behavior: "smooth" });
  }

  const selectedType = websiteTypes[activeType];
  const selectedProcess = process[activeProcess];
  const ProcessIcon = selectedProcess.icon;

  return <main className="website-service" id="main-content">
    <section className="website-service__hero" aria-labelledby="website-service-title">
      <p className="eyebrow">Website design &amp; development</p>
      <h1 id="website-service-title"><span>Websites</span> that make the right things clear.</h1>
      <p>We bring the offer, brand, content and digital experience into one useful website, built for the people who need to understand and choose you.</p>
      <a className="kyte-button" href="mailto:contact@kyte-agency.com?subject=Website%20project">Let&apos;s build your website <ArrowUpRight size={18} aria-hidden="true" /></a>
    </section>

    <div className="website-service__hero-art" aria-label="Kyte website design presentation">
      <div className="website-service__art-grid" aria-hidden="true" />
      <div className="website-service__art-ribbon website-service__art-ribbon--back" aria-hidden="true" />
      <div className="website-service__art-browser">
        <div className="website-service__art-browser-bar"><span /><span /><span /><i>kyte / digital experience</i></div>
        <div className="website-service__art-browser-screen"><Image src="/kyte-work/collectbee-browser.png" alt="Collectbee website, designed by Kyte" fill sizes="(max-width: 760px) 90vw, 700px" /></div>
      </div>
      <div className="website-service__art-ribbon website-service__art-ribbon--front" aria-hidden="true" />
      <span className="website-service__art-tag">Made to make sense.</span>
    </div>

    <div className="website-service__trusted" aria-label="Brands Kyte has worked with">
      <span>Brands we have worked with</span>
      {["lovable", "district", "fincart", "agilitas", "revenue-grid"].map((name) => <div key={name}><Image src={`/client-logos/${name}.avif`} alt={name.replace("-", " ")} width={150} height={62} /></div>)}
    </div>

    <section className="website-service__section website-service__types" aria-labelledby="website-service-types-title">
      <SectionHeading id="website-service-types-title" title="Types of websites we build" centered />
      <div className="website-service__tabs" role="tablist" aria-label="Website types">
        {websiteTypes.map((item, index) => <button key={item.name} id={`website-type-tab-${index}`} type="button" role="tab" aria-selected={activeType === index} aria-controls="website-type-panel" onClick={() => { setActiveType(index); restartTypeTimer(); }}>{item.name}</button>)}
      </div>
      <div key={activeType} id="website-type-panel" className={`website-service__type-panel website-service__type-panel--${selectedType.theme}`} role="tabpanel" aria-labelledby={`website-type-tab-${activeType}`}>
        <div className="website-service__type-copy"><h3>{selectedType.title}</h3><a className="kyte-button" href="mailto:contact@kyte-agency.com?subject=Website%20project">Talk about your website <ArrowUpRight size={16} aria-hidden="true" /></a><p>{selectedType.description}</p></div>
        <div className="website-service__type-visual"><Image src={selectedType.image} alt={selectedType.alt} fill sizes="(max-width: 760px) 90vw, 48vw" unoptimized={selectedType.image.startsWith("https://")} /></div>
      </div>
    </section>

    <section className="website-service__section website-service__jobs" aria-labelledby="website-service-jobs-title">
      <div className="website-service__split-heading"><h2 id="website-service-jobs-title">What your website needs to do</h2><div className="website-service__arrows" aria-label="Website purpose cards"><button type="button" onClick={() => moveAreas(-1)} disabled={!areaControls.back} aria-label="Previous cards"><ArrowLeft size={18} aria-hidden="true" /></button><button type="button" onClick={() => moveAreas(1)} disabled={!areaControls.forward} aria-label="Next cards"><ArrowRight size={18} aria-hidden="true" /></button></div></div>
      <div className="website-service__area-track" ref={areaTrack} tabIndex={0} aria-label="Website purpose cards">
        {websiteJobs.map(({ title, description, icon: Icon }, index) => <article className="website-service__area-card" key={title}><div className={`website-service__area-art website-service__area-art--${index % 3}`}><span><Icon size={54} strokeWidth={1.2} aria-hidden="true" /></span></div><div className="website-service__area-copy"><h3>{title}</h3><p>{description}</p></div></article>)}
      </div>
    </section>

    <section className="website-service__proof" aria-label="How Kyte approaches websites"><p className="eyebrow">Built for use</p><div><strong>Clear</strong><span>What you offer and who it helps.</span></div><div><strong>Flexible</strong><span>A system your team can keep using.</span></div><div><strong>Ready</strong><span>Reviewed across screens and journeys.</span></div></section>

    <section className="website-service__section website-service__work" aria-labelledby="website-service-work-title">
      <SectionHeading id="website-service-work-title" label="Case studies" title="Selected website work" />
      <div className="website-service__work-list">
        {work.slice(0, showAllWork ? work.length : 2).map((project) => <Link className="website-service__work-row" key={project.name} href={project.href}><span className="website-service__work-image"><Image src={project.image} alt={project.alt} fill sizes="(max-width: 760px) 90vw, 45vw" unoptimized={project.image.startsWith("https://")} /></span><span className="website-service__work-copy"><span className="website-service__work-name"><Image src={project.logo} alt="" width={44} height={44} /><span><strong>{project.name}.</strong> {project.description}</span></span><span className="website-service__work-meta">{project.category}</span></span></Link>)}
      </div>
      <button className="website-service__more" type="button" aria-expanded={showAllWork} onClick={() => setShowAllWork((show) => !show)}>{showAllWork ? "Show fewer projects" : "Show more work"} <ArrowUpRight size={17} aria-hidden="true" /></button>
    </section>

    <section className="website-service__section website-service__priorities" aria-labelledby="website-service-priorities-title">
      <div className="website-service__split-heading"><div><p className="eyebrow">Project priorities</p><h2 id="website-service-priorities-title">What the work is built around</h2></div><div className="website-service__arrows"><button type="button" onClick={() => setActivePriority((index) => Math.max(0, index - 1))} disabled={activePriority === 0} aria-label="Previous priority"><ArrowLeft size={18} aria-hidden="true" /></button><button type="button" onClick={() => setActivePriority((index) => Math.min(projectPriorities.length - 1, index + 1))} disabled={activePriority === projectPriorities.length - 1} aria-label="Next priority"><ArrowRight size={18} aria-hidden="true" /></button></div></div>
      <div className="website-service__priority-panel" aria-live="polite"><span>{activePriority + 1} / {projectPriorities.length}</span><h3>{projectPriorities[activePriority].title}</h3><p>{projectPriorities[activePriority].body}</p><div><strong>{projectPriorities[activePriority].label}</strong></div></div>
    </section>

    <section className="website-service__inline-cta"><div><p className="eyebrow">Start a project</p><h2>Let&apos;s make your next website useful from day one.</h2><p>Tell us what you&apos;re building. We&apos;ll help define the right starting point.</p><a className="kyte-button" href="mailto:contact@kyte-agency.com?subject=Website%20project">Start the conversation <ArrowUpRight size={18} aria-hidden="true" /></a></div><div className="website-service__inline-cta-art" aria-hidden="true"><Image src="/kyte-motion-mark.svg" alt="" width={1000} height={1000} unoptimized /></div></section>

    <section className="website-service__section website-service__process" aria-labelledby="website-service-process-title">
      <SectionHeading id="website-service-process-title" label="Framework" title="How we take a website from brief to launch" description="We begin with the business, the audience and the job each page needs to do. Then design and development move together toward a useful site." centered />
      <div className="website-service__process-layout"><div className="website-service__process-steps" role="tablist" aria-orientation="vertical" aria-label="Website project stages">{process.map((step, index) => <button key={step.name} type="button" role="tab" id={`website-process-tab-${index}`} aria-selected={activeProcess === index} aria-controls="website-process-panel" onClick={() => setActiveProcess(index)}>{String(index + 1).padStart(2, "0")} <span>{step.name}</span></button>)}</div><div id="website-process-panel" className="website-service__process-detail" role="tabpanel" aria-labelledby={`website-process-tab-${activeProcess}`} key={activeProcess}><div><p className="website-service__mini-label">Deliverables</p><div className="website-service__pills">{selectedProcess.deliverables.map((item) => <span key={item}>{item}</span>)}</div><p className="website-service__mini-label">Outcome</p><p>{selectedProcess.outcome}</p></div><div className="website-service__process-art"><ProcessIcon size={98} strokeWidth={.9} aria-hidden="true" /><span>{selectedProcess.name}</span></div></div></div>
    </section>

    <section className="website-service__section website-service__audiences" aria-labelledby="website-service-audience-title"><div className="website-service__split-heading"><h2 id="website-service-audience-title">Who we build with</h2><p>From product teams making complex tools easier to understand to growing brands ready for a clearer web presence.</p></div><div className="website-service__audience-track" tabIndex={0} aria-label="Website audiences">{audiences.map(({ name, icon: Icon }) => <article key={name}><div><Icon size={46} strokeWidth={1.2} aria-hidden="true" /></div><h3>{name}</h3></article>)}</div></section>

    <section className="website-service__section website-service__deliverables" aria-labelledby="website-service-deliverables-title"><SectionHeading id="website-service-deliverables-title" label="Deliverables" title="The details that make the site work" centered /><div className="website-service__deliverable-grid">{deliverables.map(({ title, description, icon: Icon }, index) => <article key={title} className={index > 2 ? "website-service__deliverable--wide" : ""}><div className="website-service__deliverable-art"><Icon size={74} strokeWidth={1} aria-hidden="true" /><span className="website-service__art-glow" /></div><h3>{title}</h3><p>{description}</p></article>)}</div></section>

    <section className="website-service__section website-service__resources" aria-labelledby="website-service-resources-title"><SectionHeading id="website-service-resources-title" label="Ideas" title="More thinking from Kyte" /><div className="website-service__resource-grid">{[{ title: "The Menu Is the Message", category: "Brand strategy", image: "/design-news/menu.webp" }, { title: "What Your Playlist Says About You", category: "Sound and identity", image: "/design-news/playlist.webp" }, { title: "Why Sensory Branding Matters", category: "Brand experience", image: "/design-news/sensory-branding.webp" }].map((item) => <Link href="/insights" key={item.title}><div><Image src={item.image} alt="" fill sizes="(max-width: 760px) 80vw, 30vw" /></div><span>{item.category}</span><h3>{item.title}</h3><span className="website-service__resource-link">Explore insights <ArrowUpRight size={16} aria-hidden="true" /></span></Link>)}</div></section>

    <section className="website-service__section website-service__engagement" aria-labelledby="website-service-engagement-title"><SectionHeading id="website-service-engagement-title" label="How we engage" title="A starting point that fits the work" /><div>{engagement.map(({ title, description, icon: Icon }) => <article key={title}><span><Icon size={25} strokeWidth={1.5} aria-hidden="true" /></span><h3>{title}</h3><p>{description}</p></article>)}</div></section>

    <section className="website-service__benefits" aria-labelledby="website-service-benefits-title"><div className="website-service__benefits-inner"><SectionHeading id="website-service-benefits-title" label="Benefits" title="What working with Kyte feels like" /><div>{benefits.map(({ title, description, icon: Icon }) => <article key={title}><span><Icon size={25} strokeWidth={1.5} aria-hidden="true" /></span><h3>{title}</h3><p>{description}</p></article>)}</div></div></section>

    <section className="website-service__section website-service__faq" aria-labelledby="website-service-faq-title"><div><p className="eyebrow">FAQ</p><h2 id="website-service-faq-title">Answers to common questions</h2><p>Every website starts with a different challenge. These answers cover how we shape the work.</p></div><div className="website-service__faq-list">{questions.map((item, index) => <article key={item.question} className={openFaq === index ? "is-open" : ""}><h3><button type="button" aria-expanded={openFaq === index} aria-controls={`website-faq-answer-${index}`} onClick={() => setOpenFaq(openFaq === index ? null : index)}>{item.question}<span>{openFaq === index ? <Minus size={20} strokeWidth={1.7} aria-hidden="true" /> : <Plus size={20} strokeWidth={1.7} aria-hidden="true" />}</span></button></h3><div id={`website-faq-answer-${index}`} hidden={openFaq !== index}><p>{item.answer}</p></div></article>)}</div></section>

    <nav className="website-service__breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><ArrowRight size={14} aria-hidden="true" /><Link href="/ui-ux-design-development">UI/UX design &amp; development</Link><ArrowRight size={14} aria-hidden="true" /><span>Website design &amp; development</span></nav>
  </main>;
}
