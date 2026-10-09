import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { RevealWords } from "./RevealWords";
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
        <div><p className="kyte-approach__eyebrow" data-reveal-words><RevealWords text="How we work" /></p><h2 id="approach-title" data-reveal-words data-reveal-delay="90"><RevealWords text="Good design starts with understanding the work it needs to do." /></h2></div>
        <div className="kyte-approach__copy"><p data-reveal-words data-reveal-delay="180"><RevealWords text="We bring business goals, user needs and delivery together to shape useful digital experiences, with a clear path from first idea to launch." /></p><Link href="/about">Get to know Kyte <ChevronRight size={18} aria-hidden="true" /></Link></div>
      </div>
      <div className="kyte-approach__impact" aria-label="Kyte impact in numbers">{impact.map(({ value, label }) => <div className="kyte-approach__stat" key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>
    </div>
  </section>;
}
