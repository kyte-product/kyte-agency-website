"use client";

import { useState } from "react";

const questions = [
  "How might we build trust in financial apps so that users feel safe sharing data and engaging more deeply with the platform?",
  "How might we make budgeting feel effortless, empowering, and non-judgmental for users who avoid traditional tracking?",
  "How might we help users easily track, prioritize, and adjust their financial goals in a way that fits their real-life decisions?",
  "How might we create a unified dashboard that gives users a clear, holistic view of their entire financial life in one place?",
  "How might we deliver financial advice that feels tailored, respectful, and empowering, rather than generic or overwhelming?",
  "How might we use AI to assist users in their financial journey while giving them full control and clarity over decisions?",
];

export function FincartResearchNotes() {
  const [selected, setSelected] = useState<number | null>(null);

  return <div className="fincart-story__research-notes" aria-label="Questions from user research">
    {questions.map((question, index) => <button
      className="fincart-story__research-note"
      type="button"
      key={question}
      aria-pressed={selected === index}
      onClick={() => setSelected(selected === index ? null : index)}
    >
      <span className="fincart-story__pin" aria-hidden="true"><span /><span /><span /><span /><span /></span>
      <span className="fincart-story__research-note-copy">{question}</span>
    </button>)}
  </div>;
}
