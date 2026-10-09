import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./CaseStudyTemplate.css";

type ImageSlot = {
  src?: string;
  alt: string;
  label: string;
  ratio: "cover" | "landscape" | "portrait";
};

type TextSection = {
  label: string;
  title: string;
  paragraphs: string[];
};

export type CaseStudyData = {
  client: string;
  title: string;
  summary: string;
  details: { label: string; value: string }[];
  cover: ImageSlot;
  introduction: TextSection;
  impact: { value?: string; label: string }[];
  story: TextSection;
  gallery: ImageSlot[];
  outcome: TextSection;
  finalImage: ImageSlot;
  testimonial?: { quote: string; name: string; role?: string };
};

function CaseStudyImage({ image }: { image: ImageSlot }) {
  return <figure className={`case-template__image case-template__image--${image.ratio}`}>
    {image.src
      ? <Image src={image.src} alt={image.alt} fill sizes={image.ratio === "portrait" ? "(max-width: 700px) 100vw, 45vw" : "100vw"} />
      : <div className="case-template__image-placeholder" role="img" aria-label={image.alt}><span>{image.label}</span></div>}
  </figure>;
}

function CaseStudyText({ section }: { section: TextSection }) {
  return <section className="case-template__text-section">
    <p className="case-template__label">{section.label}</p>
    <div><h2>{section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
  </section>;
}

export function CaseStudyTemplate({ data }: { data: CaseStudyData }) {
  return <>
    <SiteHeader />
    <main className="case-template">
      <header className="case-template__hero">
        <Link className="case-template__back" href="/work"><ArrowLeft size={18} strokeWidth={1.7} aria-hidden="true" /> All work</Link>
        <p className="case-template__label">CASE STUDY / {data.client.toUpperCase()}</p>
        <div className="case-template__hero-grid">
          <div><h1>{data.title}</h1><p className="case-template__summary">{data.summary}</p></div>
          <dl className="case-template__details">{data.details.map(({ label, value }) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
        </div>
      </header>

      <CaseStudyImage image={data.cover} />

      <div className="case-template__body">
        <CaseStudyText section={data.introduction} />

        {data.impact.length > 0 && <section className="case-template__impact" aria-labelledby="case-impact-title">
          <div className="case-template__impact-head"><p className="case-template__label">PROJECT IMPACT</p><h2 id="case-impact-title">The impact, in numbers.</h2></div>
          <div className="case-template__impact-panel"><div className="case-template__impact-grid">{data.impact.map((item, index) => <div className="case-template__impact-card" key={index}><strong className={item.value ? undefined : "case-template__impact-pending"}>{item.value ?? "—"}</strong><p>{item.label}</p></div>)}</div></div>
        </section>}

        <CaseStudyText section={data.story} />
        <div className="case-template__gallery">{data.gallery.map((image) => <CaseStudyImage image={image} key={image.label} />)}</div>
        <CaseStudyText section={data.outcome} />
        <CaseStudyImage image={data.finalImage} />

        {data.testimonial && <section className="case-template__testimonial"><p className="case-template__label">CLIENT TESTIMONIAL</p><blockquote>“{data.testimonial.quote}”<footer><strong>{data.testimonial.name}</strong>{data.testimonial.role && <span>{data.testimonial.role}</span>}</footer></blockquote></section>}
      </div>
    </main>
    <SiteFooter />
  </>;
}
