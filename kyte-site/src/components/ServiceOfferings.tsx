import "./ServiceOfferings.css";

const offerings = [
  {
    title: "User research & discovery",
    description: "Research plans and stakeholder conversations to clarify user needs, context, and the questions the project needs to answer.",
  },
  {
    title: "UX and usability audits",
    description: "Structured reviews of key screens and flows to surface friction, consistency, and accessibility issues.",
  },
  {
    title: "Journey and task-flow analysis",
    description: "Map important user journeys and task flows to see where people lose momentum or need clearer guidance.",
  },
  {
    title: "Prioritised recommendations",
    description: "A clear set of evidence-informed design opportunities and next steps, ordered to support planning and delivery.",
  },
] as const;

export function ServiceOfferings() {
  return <section className="service-offerings" aria-labelledby="service-offerings-title">
    <div className="service-offerings__inner">
      <p className="eyebrow">UX research &amp; design audits</p>
      <h2 id="service-offerings-title">What we offer</h2>
      <div className="service-offerings__list">
        {offerings.map((offering, index) => <article className="service-offering" key={offering.title}>
          <h3>{offering.title}</h3>
          <p>{offering.description}</p>
          <span className="service-offering__number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
        </article>)}
      </div>
    </div>
  </section>;
}
