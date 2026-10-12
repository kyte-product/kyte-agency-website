"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { RevealWords } from "./RevealWords";
import "./HomeFaq.css";

const questions = [
  {
    question: "What kind of work can Kyte help with?",
    answer: "We bring product and website design together with branding and marketing. We can help shape a new experience, improve an existing one, or make the way a brand communicates more consistent.",
  },
  {
    question: "Can you work with our existing team?",
    answer: "Yes. Tell us who is already involved and where you need extra thinking or delivery support. We can define a scope that fits the people, decisions, and processes already in place.",
  },
  {
    question: "Do we need a finished brief before getting in touch?",
    answer: "No. A description of the challenge and what you hope to change is enough to begin. We can work through the audience, priorities, and useful next steps together.",
  },
  {
    question: "How do you plan the timeline and scope?",
    answer: "We start by understanding the work, the people it serves, and any constraints. From there, we can propose the deliverables, stages, responsibilities, and timing for your project.",
  },
  {
    question: "What happens when the project is delivered?",
    answer: "The handoff is part of the agreed scope. We plan the files, documentation, and any launch support your team needs, then discuss further work if there is more to build or improve.",
  },
] as const;

export function HomeFaq({ items = questions, heading = "A few things you may be wondering." }: { items?: readonly { question: string; answer: string }[]; heading?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return <section className="home-faq" aria-labelledby="home-faq-title">
    <div className="home-faq__inner">
      <div className="home-faq__intro">
        <p className="eyebrow" data-reveal-words><RevealWords text="FAQ" /></p>
        <h2 id="home-faq-title" data-reveal-words data-reveal-delay="70"><RevealWords text={heading} /></h2>
        <p data-reveal-words data-reveal-delay="120"><RevealWords text="If your question is not here, tell us what you are working through." /></p>
      </div>
      <div className="home-faq__list">
        {items.map((item, index) => <article className={openIndex === index ? "is-open" : ""} key={item.question}>
          <h3><button type="button" aria-expanded={openIndex === index} aria-controls={`home-faq-answer-${index}`} onClick={() => setOpenIndex(openIndex === index ? null : index)}>{item.question}<span aria-hidden="true">{openIndex === index ? <Minus size={20} strokeWidth={1.7} /> : <Plus size={20} strokeWidth={1.7} />}</span></button></h3>
          <div id={`home-faq-answer-${index}`} hidden={openIndex !== index}><p>{item.answer}</p></div>
        </article>)}
      </div>
    </div>
  </section>;
}
