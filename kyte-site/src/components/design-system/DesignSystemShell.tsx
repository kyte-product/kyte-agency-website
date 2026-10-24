import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { SiteHeader } from "../SiteHeader";
import { TeamPreviewFooter } from "../TeamPreviewFooter";
import { designSystems, type DesignSystemId } from "@/data/designSystems";
import "../../app/design-system/system.css";

export function DesignSystemShell({ system, children }: { system: DesignSystemId; children: ReactNode }) {
  const current = designSystems.find(item => item.id === system)!;
  return <><SiteHeader /><main className="ds" data-design-system="website" data-site-reveal-ignore>
    <nav className="ds-nav" aria-label="Design systems">{designSystems.map(item => <Link key={item.id} href={item.href} aria-current={system === item.id ? "page" : undefined}>{item.title}</Link>)}</nav>
    <header className="ds-header"><p className="ds-label">Kyte design systems · 23 October 2026</p><h1>{current.title} design system.</h1><p>{system === "website" ? "The shared foundation for every page: tokens, components, interaction rules and content templates." : "The landing page’s visual language, component rules and responsive values are documented here."}</p><div className="ds-links"><Link href={current.route}>View live page <ArrowRight size={18} aria-hidden="true" /></Link>{current.inherits && <Link href="/design-system">Inherited Website foundation <ArrowRight size={18} aria-hidden="true" /></Link>}</div></header>
    {children}
    <footer className="ds-footer"><p>Implementation authority: <code>{current.document}</code>. Route ownership: <code>src/data/designSystems.ts</code>. Token source: <code>{system === "branding" ? "src/app/branding-marketing/branding-tokens.css" : "src/app/globals.css"}</code>.</p><p>Content approval, form delivery and analytics remain separate from visual-system verification.</p></footer>
  </main><TeamPreviewFooter /></>;
}
export function DsSection({ id, title, intro, children }: { id: string; title: string; intro?: string; children: ReactNode }) {
  return <section className="ds-section" id={id} aria-labelledby={`${id}-title`}><div className="ds-section-heading section-intro"><h2 id={`${id}-title`}>{title}</h2>{intro && <p>{intro}</p>}</div>{children}</section>;
}
export function DsTable({ headings, rows }: { headings: string[]; rows: (string | ReactNode)[][] }) {
  return <div className="ds-table-window" tabIndex={0} role="region" aria-label={headings.join(", ")}><table><thead><tr>{headings.map(h=><th key={h} scope="col">{h}</th>)}</tr></thead><tbody>{rows.map((row,index)=><tr key={index}>{row.map((cell,i)=><td key={i}>{cell}</td>)}</tr>)}</tbody></table></div>;
}
