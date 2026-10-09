import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, ChevronLeft } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { EditorialBody } from "@/components/design-system/EditorialBody";
import { workEntry } from "@/lib/editorial";
import "@/components/design-system/EditorialPages.css";

type Props = { params: Promise<{ slug: string }> };
export const instant = false;

function liveProjectUrl(value: string | null | undefined): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await workEntry(slug);
  return { title: project ? `${project.title} | Work | Kyte` : "Work | Kyte", description: project?.summary || undefined };
}

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await workEntry(slug);
  if (!project) notFound();
  const gallery = project.gallery?.filter((image): image is typeof image & { url: string } => Boolean(image.url)) ?? [];
  const projectUrl = liveProjectUrl(project.projectUrl);

  return <><SiteHeader /><main className="editorial-detail editorial-detail--work">
    <header className="editorial-detail__heading">
      <nav className="editorial-detail__breadcrumbs" aria-label="Breadcrumb">
        <Link className="editorial-detail__breadcrumb-link" href="/work"><ChevronLeft size={18} strokeWidth={1.8} aria-hidden="true" /> Case study</Link>
        <span className="editorial-detail__breadcrumb-separator" aria-hidden="true">/</span>
        <span aria-current="page">{project.client || project.title}</span>
      </nav>
      <div className="editorial-detail__work-heading-grid">
        <div><h1>{project.title}</h1>{project.summary && <p className="editorial-detail__summary">{project.summary}</p>}</div>
        <div className="editorial-detail__work-aside">
          <dl className="editorial-detail__facts"><div><dt>Client</dt><dd>{project.client || project.title}</dd></div>{project.role && project.role !== project.title && <div><dt>Kyte&apos;s role</dt><dd>{project.role}</dd></div>}{project.projectType?.trim() && <div><dt>Project type</dt><dd>{project.projectType}</dd></div>}</dl>
          {projectUrl && <a className="editorial-detail__live-link kyte-button" href={projectUrl} target="_blank" rel="noopener noreferrer">View live work <ArrowUpRight size={18} strokeWidth={1.8} aria-hidden="true" /></a>}
        </div>
      </div>
    </header>
    {project.cover.url && <figure className="editorial-detail__work-cover" data-nav-theme="dark"><Image src={project.cover.url} alt={project.cover.alt || ""} fill unoptimized sizes="(max-width: 700px) 100vw, 90vw" /></figure>}
    <div className="editorial-detail__work-body"><EditorialBody blocks={project.body} /></div>
    {project.outcomes && project.outcomes.length > 0 && <section className="editorial-detail__outcomes"><p className="eyebrow">Project impact</p><div>{project.outcomes.map((item, index) => <div key={index}><strong>{item.value}</strong><p>{item.label}</p></div>)}</div></section>}
    {gallery.length > 0 && <div className="editorial-detail__gallery">{gallery.map((image, index) => <figure key={`${image.url}-${index}`}><Image src={image.url} alt={image.alt || ""} fill unoptimized sizes={gallery.length % 2 === 1 && index === gallery.length - 1 ? "(max-width: 700px) 100vw, 90vw" : "(max-width: 700px) 100vw, 48vw"} /></figure>)}</div>}
  </main><SiteFooter /></>;
}
