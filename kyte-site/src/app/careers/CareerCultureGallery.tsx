"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { DotPattern } from "@/components/ui/DotPattern";

const themes = [
  { label: "People", title: "Good work starts with listening.", copy: "Make space for different perspectives and bring care to the conversations behind the work." },
  { label: "Learning", title: "Stay curious about the next question.", copy: "Share what you learn, ask for context and use feedback to make the work clearer." },
  { label: "Making", title: "Make ideas tangible, together.", copy: "Use sketches, prototypes and conversations to explore a direction before committing to it." },
  { label: "Shared moments", title: "Leave room for the people behind the work.", copy: "A thoughtful team makes space for connection as well as focused collaboration." },
  { label: "Progress", title: "Notice the progress along the way.", copy: "Reflect on what changed, recognise contributions and carry useful lessons into the next project." },
];

export function CareerCultureGallery() {
  const [selected, setSelected] = useState(0);
  const theme = themes[selected];
  const reducedMotion = useReducedMotion();
  const blueSlots = [[1, 3], [0, 5], [2, 4], [0, 4], [1, 5]][selected];
  return <section id="careers-culture" className="career-culture" aria-labelledby="career-culture-title">
    <div className="careers-page__inner">
      <div className="career-culture__heading"><h2 id="career-culture-title">Life around the work</h2><p>A closer look at the people, learning and everyday moments we want to make room for.</p></div>
      <div className="career-culture__tabs" aria-label="Culture themes">{themes.map((item, index) => <button key={item.label} type="button" aria-pressed={selected === index} aria-controls="career-culture-gallery" onClick={() => setSelected(index)}>{item.label}</button>)}</div>
      <div id="career-culture-gallery" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={theme.label} className="career-culture__grid" initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: reducedMotion ? 1 : 0, y: 0 }} transition={{ duration: reducedMotion ? 0 : 0.2 }}>
            {Array.from({ length: 6 }, (_, slot) => {
              const card = blueSlots.indexOf(slot);
              return card >= 0 ? <article key={slot} className="career-culture__card"><DotPattern shape={card === 0 ? "kite" : "discover"} tone="white" />{card === 0 ? <h3>{theme.title}</h3> : <p>{theme.copy}</p>}</article> : <div key={slot} className="career-culture__placeholder" role="img" aria-label={`${theme.label} photo placeholder`} />;
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  </section>;
}
