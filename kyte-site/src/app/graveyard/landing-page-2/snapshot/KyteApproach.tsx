import Link from "next/link";
import { ArrowRight } from "lucide-react";
import "./KyteApproach.css";

const impact = [
  { value: "100+", label: "Projects" },
  { value: "50+", label: "Clients" },
  { value: "200M+", label: "Impressions" },
  { value: "3M+", label: "Views in one year" },
] as const;

export function KyteApproach() {
  return <section className="kyte-approach" id="approach" aria-labelledby="approach-title">
    <div className="kyte-approach__inner">
      <div className="kyte-approach__intro">
        <div><p className="kyte-approach__eyebrow">How we work</p><h2 id="approach-title">Good design starts with understanding the work it needs to do.</h2></div>
        <div className="kyte-approach__copy"><p>We start by getting close to the product, the business and the people who will use it. That gives us a clearer way to decide what belongs in the experience and what can wait.</p><p>From there, we connect strategy, design and delivery so the thinking holds up beyond a presentation. The scope changes with the project, but the goal stays the same: work that is useful, clear and ready to grow.</p><Link href="/about">Get to know Kyte <ArrowRight size={18} aria-hidden="true" /></Link></div>
      </div>
      <div className="kyte-approach__impact" aria-label="Kyte impact in numbers">{impact.map(({ value, label }) => <div className="kyte-approach__stat" key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>
    </div>
  </section>;
}
