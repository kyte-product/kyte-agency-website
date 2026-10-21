import Link from "next/link";
import { clientTestimonials } from "@/data/clientTestimonials";
import "./BrandTestimonials.css";

// Verified figures currently published at https://www.kyte-agency.com/.
const publishedImpacts = [
  { value: "5M+", label: "Impressions generated in one year" },
  { value: "100+", label: "Projects brought to life" },
  { value: "3M+", label: "Views generated in one year" },
  { value: "50+", label: "Clients across industries" },
] as const;

const columns = [
  { cards: [{ kind: "impact", index: 0 }, { kind: "quote", index: 0 }] },
  { cards: [{ kind: "quote", index: 1 }, { kind: "impact", index: 1 }] },
  { cards: [{ kind: "impact", index: 2 }, { kind: "quote", index: 2 }] },
  { cards: [{ kind: "quote", index: 3 }, { kind: "impact", index: 3 }] },
] as const;

const highlights = [
  "visually stunning social media and product packaging",
  "rebranding The Legal Capsule to Contractzy",
  "extremely effective and engaging",
  "beautiful brochures, flyers and other marketing materials",
] as const;

function QuoteCard({ index }: { index: 0 | 1 | 2 | 3 }) {
  const copy = clientTestimonials[index];
  const highlight = highlights[index];
  const [before, after = ""] = copy.quote.split(highlight);

  return <article className="brand-testimonial brand-testimonial--quote">
    <blockquote>“{before}<mark data-highlight={index}>{highlight}</mark>{after}”</blockquote>
    <footer>
      <strong>{copy.name}</strong>
      <span>{copy.role}</span>
    </footer>
  </article>;
}

function ImpactCard({ index, clone }: { index: 0 | 1 | 2 | 3; clone?: boolean }) {
  const impact = publishedImpacts[index];
  return <article className="brand-testimonial brand-testimonial--impact">
    <strong>{impact.value}</strong>
    <span>{impact.label}</span>
    <Link className="kyte-button kyte-button--light brand-testimonial__cta" href="/contact" tabIndex={clone ? -1 : undefined}>
      Start a project
    </Link>
  </article>;
}

function TestimonialColumn({ index, clone }: { index: 0 | 1 | 2 | 3; clone?: boolean }) {
  return <div className="brand-testimonial-column">
    {columns[index].cards.map((card, cardIndex) => card.kind === "impact"
      ? <ImpactCard key={`impact-${cardIndex}`} index={card.index} clone={clone} />
      : <QuoteCard key={`quote-${cardIndex}`} index={card.index} />)}
  </div>;
}

function TestimonialSet({ clone = false }: { clone?: boolean }) {
  return <div className="brand-testimonials__set" aria-hidden={clone || undefined}>
    {columns.map((_, index) => <TestimonialColumn key={index} index={index as 0 | 1 | 2 | 3} clone={clone} />)}
  </div>;
}

export function BrandTestimonials() {
  return <section className="brand-testimonials" aria-labelledby="brand-testimonials-title">
    <h2 id="brand-testimonials-title">WHAT OUR CLIENTS SAY</h2>
    <div className="brand-testimonials__viewport" role="region" aria-label="Client testimonials" tabIndex={0}>
      <div className="brand-testimonials__track">
        <TestimonialSet />
        <TestimonialSet clone />
      </div>
    </div>
  </section>;
}
