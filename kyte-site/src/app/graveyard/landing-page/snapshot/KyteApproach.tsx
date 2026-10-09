import Link from "next/link";
import { ArrowRight } from "lucide-react";

const fields = [
  { number: "01", title: "Understand", text: "Find the people, constraints and questions behind the brief." },
  { number: "02", title: "Structure", text: "Give the experience a clear flow and the content a useful order." },
  { number: "03", title: "Design", text: "Make the system feel distinct, consistent and easy to use." },
  { number: "04", title: "Build", text: "Turn the agreed direction into working screens and assets." },
  { number: "05", title: "Improve", text: "Review what works and make the next decision with evidence." },
] as const;

export function KyteApproach() {
  return <section className="kyte-approach" id="approach" aria-labelledby="approach-title">
    <div className="kyte-approach__inner">
      <div className="kyte-approach__intro">
        <div><p className="kyte-approach__eyebrow">How we work</p><h2 id="approach-title">Good design starts with understanding the work it needs to do.</h2></div>
        <div className="kyte-approach__copy"><p>We start by getting close to the product, the business and the people who will use it. That gives us a clearer way to decide what belongs in the experience and what can wait.</p><p>From there, we connect strategy, design and delivery so the thinking holds up beyond a presentation. The scope changes with the project, but the goal stays the same: work that is useful, clear and ready to grow.</p><Link href="/about">Get to know Kyte <ArrowRight size={18} aria-hidden="true" /></Link></div>
      </div>
      <div className="kyte-approach__steps">{fields.map(({ number, title, text }) => <div className="kyte-approach__step" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></div>)}</div>
    </div>
  </section>;
}
