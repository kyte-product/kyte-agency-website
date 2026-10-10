"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { DesignNewsArticle } from "@/lib/sanity";
import { RevealWords } from "./RevealWords";

export function ClientStories({ articles }: { articles: DesignNewsArticle[] }) {
  const stories = articles.filter((article) => article.slug && article.cover?.url).slice(0, 8);
  const trackRef = useRef<HTMLDivElement>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);

  const updateControls = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCanGoBack(track.scrollLeft > 2);
    setCanGoForward(track.scrollLeft + track.clientWidth < track.scrollWidth - 2);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: 0, behavior: "instant" });
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
    const cards = Array.from(track.querySelectorAll<HTMLElement>(".client-story"));
    if (!cards.length) return;
    const rail = track.getBoundingClientRect().left;
    const positions = cards.map((card, index) => index === 0 ? 0 : card.getBoundingClientRect().left - rail + track.scrollLeft);
    const current = positions.reduce((nearest, position, index) =>
      Math.abs(position - track.scrollLeft) < Math.abs(positions[nearest] - track.scrollLeft) ? index : nearest, 0);
    const next = Math.max(0, Math.min(cards.length - 1, current + direction));
    track.scrollTo({ left: positions[next], behavior: "smooth" });
  };

  return <section className="client-stories" aria-labelledby="client-stories-title">
    <div className="client-stories__inner">
      <div className="client-stories__intro">
        <div>
          <h2 id="client-stories-title" data-reveal-words><RevealWords text="Ideas and observations from Design News." /></h2>
          <Link className="client-stories__cta kyte-button" href="/insights">Explore Design News <ChevronRight size={16} aria-hidden="true" /></Link>
        </div>
        <p className="client-stories__description" data-reveal-words data-reveal-delay="150"><RevealWords text="Writing from the Kyte team on visual culture, branding and the ideas shaping how people experience products." /></p>
      </div>

      {stories.length > 0 && <div className="client-stories__controls" aria-label="Design News carousel controls">
        <button type="button" aria-label="Show previous articles" disabled={!canGoBack} onClick={() => move(-1)}><ChevronLeft size={18} aria-hidden="true" /></button>
        <button type="button" aria-label="Show more articles" disabled={!canGoForward} onClick={() => move(1)}><ChevronRight size={18} aria-hidden="true" /></button>
      </div>}

      <div className="client-stories__track" ref={trackRef} tabIndex={stories.length ? 0 : -1} aria-label="Design News articles">
        {stories.map((story) => <article className="client-story" key={story._id}>
          <Link className="client-story__link" href={`/insights/${encodeURIComponent(story.slug)}`} aria-label={`Read ${story.title}`}>
            <div className={`client-story__visual${story.slug === "why-sensory-branding-is-the-next-big-thing-in-2026" ? " client-story__visual--cropped" : ""}`}>
              <Image className="client-story__art" src={story.cover.url!} alt={story.cover.alt || ""} fill unoptimized sizes="(max-width: 760px) 82vw, 340px" />
              <span className="client-story__brandname">{story.category?.split(",").at(-1)?.trim() || "Design News"}</span>
            </div>
            <p>{story.title}</p>
            <span className="client-story__action">Read story <ChevronRight size={15} aria-hidden="true" /></span>
          </Link>
        </article>)}
      </div>
    </div>
  </section>;
}
