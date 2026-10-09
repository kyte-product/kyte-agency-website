"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const stories = [
  { name: "Visual culture", image: "/design-news/dior.webp", title: "How Dior Redefined Luxury in India by Embracing Its Visual Language", summary: "Most global luxury houses simplify when they enter India. Dior did the opposite, and the Mumbai showcase shows what amplification instead of adaptation actually looks like." },
  { name: "Brand strategy", image: "/design-news/menu.webp", title: "The Menu Is the Message", summary: "Read a restaurant's menu for two minutes and you already know what it thinks of itself, and of you. Most brands make the same positioning choices without realising it." },
  { name: "Sound & identity", image: "/design-news/playlist.webp", title: "What Your Playlist Says About You (And Why Brands Should Be Listening)", summary: "A playlist is a self-portrait, and most brands have no idea what theirs sounds like. Here is what DJs and curators understand about voice that most content teams don't." },
  { name: "Campaigns", image: "/design-news/car-wrap.webp", title: "The Wrap Is the Campaign: What Car Camouflage Teaches Us About Building Desire", summary: "Dazzle wraps on test cars were built to hide a car's body lines. Somewhere along the way, automakers figured out they also build desire, and stopped hiding." },
  { name: "Advertising", image: "/design-news/tech-marketing.webp", title: "When Advertising Was Unhinged: Why Early 2000s Tech Marketing Still Hits Different", summary: "For a brief window in the late 1990s and early 2000s, tech brands chased discomfort over clarity. Here is the strategy underneath the shock value, and what it says about advertising today." },
  { name: "Brand experience", image: "/design-news/sensory-branding.webp", title: "Why Sensory Branding Is the Next Big Thing in 2026", summary: "Branding is quietly shifting from how a brand looks to how it feels. Texture, scent, sound and weight are becoming the new differentiator, and beauty brands are already proving it." },
] as const;

export function ClientStories() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(true);
  const [selected, setSelected] = useState<(typeof stories)[number] | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!selected) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setSelected(null); };
    document.addEventListener("keydown", onEscape);
    return () => { document.body.style.overflow = previous; document.removeEventListener("keydown", onEscape); opener.current?.focus(); };
  }, [selected]);

  const updateControls = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCanGoBack(track.scrollLeft > 2);
    setCanGoForward(track.scrollLeft + track.clientWidth < track.scrollWidth - 2);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    updateControls();
    track.addEventListener("scroll", updateControls, { passive: true });
    const observer = new ResizeObserver(updateControls);
    observer.observe(track);
    return () => {
      track.removeEventListener("scroll", updateControls);
      observer.disconnect();
    };
  }, [updateControls]);

  const move = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(".client-story");
    if (!card) return;
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 16;
    track.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: "smooth" });
  };

  return <>
    <section className="client-stories" aria-labelledby="client-stories-title">
      <div className="client-stories__inner">
        <div className="client-stories__intro">
          <div>
            <h2 id="client-stories-title">Ideas and observations from Design News.</h2>
            <Link className="client-stories__cta kyte-button" href="/insights">Explore Design News <ArrowUpRight size={16} aria-hidden="true" /></Link>
          </div>
          <p className="client-stories__description">Writing from the Kyte team on visual culture, branding and the ideas shaping how people experience products.</p>
        </div>

        <div className="client-stories__controls" aria-label="Design News carousel controls">
          <button type="button" aria-label="Show previous articles" disabled={!canGoBack} onClick={() => move(-1)}>
            <ArrowLeft size={18} aria-hidden="true" />
          </button>
          <button type="button" aria-label="Show more articles" disabled={!canGoForward} onClick={() => move(1)}>
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="client-stories__track" ref={trackRef} tabIndex={0} aria-label="Design News article previews">
          {stories.map((story) => (
            <article className="client-story" key={story.title}>
              <button className="client-story__link" type="button" aria-label={`View preview: ${story.title}`} onClick={(event) => { opener.current = event.currentTarget; setSelected(story); }}>
                <div className="client-story__visual">
                  <Image className="client-story__art" src={story.image} alt="" fill sizes="(max-width: 760px) 82vw, 340px" />
                  <span className="client-story__brandname">{story.name}</span>
                </div>
                <p>{story.title}</p>
                <span className="client-story__action">View preview <ArrowUpRight size={15} aria-hidden="true" /></span>
              </button>
            </article>
          ))}
        </div>

      </div>
    </section>
    {selected && <div className="design-news-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}><div className="design-news-dialog" role="dialog" aria-modal="true" aria-labelledby="design-news-title" onKeyDown={(event) => { if (event.key === "Tab") { event.preventDefault(); closeRef.current?.focus(); } }}><button ref={closeRef} className="design-news-dialog__close" type="button" aria-label="Close article preview" onClick={() => setSelected(null)}><X size={20} aria-hidden="true" /></button><div className="design-news-dialog__image"><Image src={selected.image} alt="" fill sizes="(max-width: 760px) 90vw, 450px" /></div><div className="design-news-dialog__copy"><p className="eyebrow">Design News · Draft preview</p><h2 id="design-news-title">{selected.title}</h2><p>{selected.summary}</p></div></div></div>}
  </>;
}
