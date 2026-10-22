import "./SectionBreak.css";

export function SectionBreak() {
  return <div className="section-break" aria-hidden="true">
    <span className="section-break__bar section-break__bar--cyan" />
    <span className="section-break__bar section-break__bar--blue" />
    <span className="section-break__bar section-break__bar--violet" />
  </div>;
}
