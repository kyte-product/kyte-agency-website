import Link from "next/link";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import "./LegalPlaceholder.css";

export function LegalPlaceholder({ title, sections }: { title: string; sections: { heading: string; body: string }[] }) {
  return <><SiteHeader /><main className="legal-page"><div className="legal-page__inner">

    <h1>{title}</h1>
    <p className="legal-page__notice">Draft placeholder. The final policy will be added after legal and operational review.</p>
    <div className="legal-page__sections">{sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2><p>{section.body}</p></section>)}</div>
    <p className="legal-page__contact">Questions? <a href="mailto:contact@kyte-agency.com">contact@kyte-agency.com</a></p>
    <Link className="legal-page__home" href="/">Back to home</Link>
  </div></main><SiteFooter /></>;
}
