import type { ReactNode } from "react";

type EditorialGlyphName = "seal" | "coordinates" | "roof" | "flower" | "phone" | "reply" | "brain" | "squareQ" | "circleC" | "arrows";

export function EditorialGlyph({ name }: { name: EditorialGlyphName }) {
  const glyphs: Record<EditorialGlyphName, ReactNode> = {
    seal: <><path d="M12 1.8 22.2 12 12 22.2 1.8 12 12 1.8Z" /><path d="M9 15V9h2.3l3.7 6V9" /></>,
    coordinates: <><path d="M3 8h18M3 16h18" /><path d="m6 5-3 3 3 3M18 13l3 3-3 3" /></>,
    roof: <><path d="M3 13 12 5l9 8" /><path d="M6 13v6h12v-6" /></>,
    flower: <><circle cx="12" cy="12" r="2" /><circle cx="12" cy="5.5" r="3.2" /><circle cx="18.5" cy="12" r="3.2" /><circle cx="12" cy="18.5" r="3.2" /><circle cx="5.5" cy="12" r="3.2" /></>,
    phone: <path d="M7 3.5 4.5 5c-.8.5-.9 1.5-.6 2.5 1.8 5.8 7.3 11.3 13.1 13.1 1 .3 2 .2 2.5-.6l1.5-2.5-4.6-3-2 2c-2.5-1.1-4.3-2.9-5.4-5.4l2-2L7 3.5Z" />,
    reply: <><path d="M8 6H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8l5 3v-3h1a2 2 0 0 0 2-2v-2" /><path d="M13 4h8m-3-3 3 3-3 3" /></>,
    brain: <><path d="M9.1 4.2a3.2 3.2 0 0 0-5.3 2.4 3.5 3.5 0 0 0-.4 6.1 3.4 3.4 0 0 0 2.8 5.2 3.2 3.2 0 0 0 5.8 1.2V5.7a2.5 2.5 0 0 0-2.9-1.5ZM14.9 4.2a3.2 3.2 0 0 1 5.3 2.4 3.5 3.5 0 0 1 .4 6.1 3.4 3.4 0 0 1-2.8 5.2 3.2 3.2 0 0 1-5.8 1.2V5.7a2.5 2.5 0 0 1 2.9-1.5Z" /><path d="M8 8c1.8 0 2.4 1.1 2.4 2.3M6.2 13c1.9 0 2.5 1.1 2.5 2.5m7.3-7.5c-1.8 0-2.4 1.1-2.4 2.3m4.2 2.7c-1.9 0-2.5 1.1-2.5 2.5" /></>,
    squareQ: <><rect x="3" y="3" width="18" height="18" /><path d="M10 10a2.2 2.2 0 1 1 3.8 1.5c-.8.8-1.8 1-1.8 2.5m0 2h.01" /></>,
    circleC: <><circle cx="12" cy="12" r="9" /><path d="M14.8 9.2a4 4 0 1 0 0 5.6" /></>,
    arrows: <><path d="M4 8h15l-3-3m4 11H5l3 3" /></>,
  };

  return <svg className="brand-helix-notes__glyph" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{glyphs[name]}</svg>;
}
