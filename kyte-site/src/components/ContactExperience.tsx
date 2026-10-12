"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { clientLogoAsset } from "@/data/clientLogoAssets";
import "./ContactExperience.css";

const contactEmail = "contact@kyte-agency.com";
const clientMarks = [
  ["JioHotstar", "jio-hotstar"], ["District by Zomato", "district"],
  ["Daily Objects", "daily-objects"], ["ITC Infotech", "itc-infotech"],
  ["Decathlon", "decathlon"], ["Wispr Flow", "wispr-flow"],
  ["Lovable", "lovable"], ["Emergent", "emergent"],
  ["Gully Labs", "gully-labs"], ["Comet", "comet"],
  ["Fincart", "fincart"], ["BTG", "btg"],
  ["Agilitas", "agilitas"], ["Banza", "banza"],
  ["MAD", "mad"], ["Smash Guys", "smash-guys"],
  ["Red Rhino", "red-rhino"], ["Hot Ice", "hot-ice"],
  ["Kiara", "kiara"], ["AMAIVI", "amaivi"],
  ["Revenue Grid", "revenue-grid"], ["Papa Johns", "papa-johns"],
  ["Crepdog Crew", "crepdog-crew"], ["Contractzy", "contractzy"],
] as const;

type ContactContentProps = { idPrefix: "modal" | "page"; onNavigate?: () => void };

export function ContactContent({ idPrefix, onNavigate }: ContactContentProps) {
  const [submissionState, setSubmissionState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [submissionMessage, setSubmissionMessage] = useState("");
  const pendingId = useRef<string | null>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const TitleTag = idPrefix === "page" ? "h1" : "h2";

  useEffect(() => {
    if (submissionState === "success") successHeadingRef.current?.focus();
  }, [submissionState]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());
    pendingId.current ||= crypto.randomUUID();
    setSubmissionState("sending");
    setSubmissionMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, id: pendingId.current }),
      });
      const result: { message?: string } = await response.json();
      if (!response.ok) throw new Error(result.message || "We couldn't send your enquiry. Please try again.");
      form.reset();
      pendingId.current = null;
      setSubmissionState("success");
    } catch (error) {
      setSubmissionState("error");
      setSubmissionMessage(error instanceof Error ? error.message : "We couldn't send your enquiry. Please try again.");
    }
  };

  if (submissionState === "success") {
    return <div className="contact-experience contact-experience--success" role="status">
      <div className="contact-experience__success-mark" aria-hidden="true">
        <svg viewBox="0 0 80 80" fill="none"><path d="m21 40 13 13 25-26" pathLength="1" /></svg>
      </div>
      <p className="contact-experience__success-eyebrow">Message received</p>
      <TitleTag id={`${idPrefix}-contact-title`} ref={successHeadingRef} tabIndex={-1}>Thanks for reaching out.</TitleTag>
      <p className="contact-experience__success-copy">We&apos;ve received your enquiry. The Kyte team will follow up by email.</p>
      <div className="contact-experience__success-actions">
        <Link className="kyte-button" href="/work" onClick={onNavigate}>Explore our work <ArrowUpRight size={17} aria-hidden="true" /></Link>
        <Link className="kyte-button kyte-button--outline" href="/" onClick={onNavigate}>Back to home</Link>
      </div>
    </div>;
  }

  return <div className="contact-experience">
    <div className="contact-experience__intro">
      <p className="contact-experience__eyebrow"><span className="contact-experience__eyebrow-mark" aria-hidden="true" /> Start a project</p>
      <TitleTag id={`${idPrefix}-contact-title`}>Let&apos;s make the next steps clearer.</TitleTag>
      <ol className="contact-experience__expect">
        <li><span aria-hidden="true">1</span><strong>Define what needs to change</strong></li>
        <li><span aria-hidden="true">2</span><strong>Explore how design can help</strong></li>
        <li><span aria-hidden="true">3</span><strong>Agree on the next step</strong></li>
      </ol>
      <div className="contact-experience__clients" aria-label="Brands we have worked with">
        <p>Brands we have worked with</p>
        <div className="contact-experience__clients-window"><div className="contact-experience__clients-track">
          {[false, true].map(duplicate => <ul key={String(duplicate)} aria-hidden={duplicate || undefined}>{clientMarks.map(([name, slug]) => { const logo = clientLogoAsset(slug); return <li key={slug}><Image src={`/client-logos/${slug}.avif`} alt={duplicate ? "" : name} width={logo.width} height={logo.height} /></li>; })}</ul>)}
        </div></div>
      </div>
    </div>
    <div className="contact-experience__form-panel">
      <p className="contact-experience__form-heading">Tell us about your project</p>
      <form className="contact-experience__form" onSubmit={handleSubmit}>
        <div className="contact-experience__form-grid">
          <label className="contact-experience__field"><span>Your name <abbr title="required">*</abbr></span><input name="name" type="text" autoComplete="name" required placeholder="Your name" /></label>
          <label className="contact-experience__field"><span>Work email <abbr title="required">*</abbr></span><input name="email" type="email" autoComplete="email" required placeholder="you@company.com" /></label>
          <label className="contact-experience__field contact-experience__field--full"><span>Company or website</span><input name="company" type="text" autoComplete="organization" placeholder="Company name or website" /></label>
          <label className="contact-experience__field"><span>What are you looking for? <abbr title="required">*</abbr></span><span className="contact-experience__select"><select name="service" required defaultValue=""><option value="" disabled>Select a service</option><optgroup label="UI/UX Design & Development"><option>UX Research & Design Audits</option><option>Website Design & Development</option><option>Mobile App Design</option><option>SaaS & Web App Design</option><option>eCommerce & Shopify Websites</option></optgroup><optgroup label="Branding & Marketing"><option>Brand Strategy & Identity</option><option>Graphic Design</option><option>Video Production & Motion Graphics</option><option>Social Media Marketing</option><option>SEO & AI Search Optimisation</option></optgroup><option>More than one service</option><option>Not sure yet</option></select><ChevronDown aria-hidden="true" size={16} strokeWidth={1.75} /></span></label>
          <label className="contact-experience__field"><span>Timeline</span><span className="contact-experience__select"><select name="timeline" defaultValue=""><option value="">Not sure yet</option><option>As soon as possible</option><option>In the next 1–3 months</option><option>Later this year</option><option>Exploring options</option></select><ChevronDown aria-hidden="true" size={16} strokeWidth={1.75} /></span></label>
          <label className="contact-experience__field contact-experience__field--full"><span>What are you working on? <abbr title="required">*</abbr></span><textarea name="project" required rows={4} placeholder="A little context about the challenge, project, or idea" /></label>
        </div>
        <input className="contact-experience__honeypot" name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <button className="kyte-button contact-experience__submit" type="submit" disabled={submissionState === "sending"}>{submissionState === "sending" ? "Sending…" : "Submit"} <ArrowUpRight size={17} aria-hidden="true" /></button>
        {submissionMessage && <p className={`contact-experience__feedback contact-experience__feedback--${submissionState}`} role={submissionState === "error" ? "alert" : "status"}>{submissionMessage}</p>}
      </form>
      <p className="contact-experience__email">Prefer to write directly? <a href={`mailto:${contactEmail}`}>{contactEmail}</a></p>
    </div>
  </div>;
}

export function ContactModal() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const intercept = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest<HTMLAnchorElement>("a[href]");
      if (!link || link.hasAttribute("download") || (link.target && link.target !== "_self")) return;
      const destination = new URL(link.href, window.location.href);
      if (destination.origin !== window.location.origin || destination.pathname !== "/contact" || window.location.pathname === "/contact") return;
      event.preventDefault();
      triggerRef.current = link;
      window.dispatchEvent(new Event("kyte:contact-open"));
      setOpen(true);
    };
    document.addEventListener("click", intercept, true);
    return () => document.removeEventListener("click", intercept, true);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !dialog) return;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    dialog.querySelector<HTMLInputElement>("input")?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      if (dialog.open) dialog.close();
    };
  }, [open]);

  const close = () => dialogRef.current?.close();

  return <dialog ref={dialogRef} className="contact-dialog" aria-labelledby="modal-contact-title" onClose={() => { setOpen(false); triggerRef.current?.focus(); }} onClick={(event) => { if (event.target === dialogRef.current) close(); }}>
    <button className="contact-dialog__close" type="button" aria-label="Close contact form" onClick={close}><X size={22} aria-hidden="true" /></button>
    {open && <ContactContent idPrefix="modal" onNavigate={close} />}
  </dialog>;
}
