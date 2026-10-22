"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { DesignNewsArticle } from "@/lib/sanity";
import { RevealWords } from "./RevealWords";
import { moveCardCarousel } from "@/lib/card-carousel";

export function ClientStories({ articles, variant = "carousel" }: { articles: DesignNewsArticle[]; variant?: "carousel" | "branding" }) {
  if (variant === "branding") return <BrandingDesignNews articles={articles} />;
  return <ClientStoriesCarousel articles={articles} />;
}

function BrandingDesignNews({ articles }: { articles: DesignNewsArticle[] }) {
  const stories = articles.filter((article) => article.slug && article.cover?.url).slice(0, 10);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const activeStory = activeIndex === null ? null : stories[activeIndex];
  const activateRow = (row: HTMLElement, index: number) => {
    const list = listRef.current;
    if (list) {
      const rowBounds = row.getBoundingClientRect();
      const listBounds = list.getBoundingClientRect();
      list.style.setProperty("--pointer-line-y", `${rowBounds.top - listBounds.top + rowBounds.height / 2}px`);
    }
    setActiveIndex(index);
  };

  return <section className="client-stories client-stories--branding" aria-labelledby="branding-news-title">
    <div className="client-stories__inner">
      <div className="client-stories__editorial-head">
        <h2 id="branding-news-title" data-reveal-words><RevealWords text="Design News" /></h2>
        <Link href="/insights" className="client-stories__editorial-link branding-nav-action">Explore all stories <ArrowRight size={16} aria-hidden="true" /></Link>
      </div>

      {stories.length > 0 ? <div className="client-stories__editorial-list" ref={listRef} data-active={activeIndex !== null} data-active-last={activeIndex === stories.length - 1} onMouseLeave={() => setActiveIndex(null)} onMouseMove={(event) => { const list = listRef.current; if (list) list.style.setProperty("--pointer-line-y", `${event.clientY - list.getBoundingClientRect().top}px`); }}>
        {stories.map((story, index) => <article className="client-stories__editorial-row" key={story._id} data-active={activeIndex === index} onMouseEnter={(event) => activateRow(event.currentTarget, index)}>
          <Link className="client-stories__editorial-link-row" href={`/insights/${encodeURIComponent(story.slug)}`} onFocus={(event) => { const row = event.currentTarget.closest<HTMLElement>(".client-stories__editorial-row"); if (row) activateRow(row, index); }} onBlur={(event) => { if (!event.currentTarget.closest(".client-stories__editorial-list")?.contains(event.relatedTarget as Node | null)) setActiveIndex(null); }}>
            <span className="client-stories__editorial-title">{story.title}</span>
            <time className="client-stories__editorial-date" dateTime={story.publishedAt || story.updatedAt || undefined} title={story.publishedAt ? "Published date" : "Last updated"}>
              {formatEditorialDate(story.publishedAt || story.updatedAt)}
            </time>
            <span className="client-stories__editorial-category">{story.category?.split(",").at(-1)?.trim() || "Design News"}</span>
          </Link>
        </article>)}
        <div className="client-stories__editorial-hover-rule" aria-hidden="true" />
        <div className={`client-stories__editorial-preview${activeStory ? " is-visible" : ""}`} aria-hidden="true">
          {activeStory && <Image key={activeStory._id} src={activeStory.cover.url!} alt="" fill unoptimized sizes="(max-width: 700px) 40vw, 18vw" />}
        </div>
      </div> : <p className="client-stories__editorial-empty">New stories are on the way.</p>}
    </div>
  </section>;
}

function formatEditorialDate(value: string | null | undefined) {
  if (!value) return "Date pending";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Date pending";
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" }).format(date);
}

function ClientStoriesCarousel({ articles }: { articles: DesignNewsArticle[] }) {
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
    moveCardCarousel(track, ".client-story", direction);
  };

  return <section className="client-stories" aria-labelledby="client-stories-title">
    <div className="client-stories__inner">
      <div className="client-stories__intro">
        <div>

          <h2 id="client-stories-title" data-reveal-words><RevealWords text="Ideas and observations from Design News." /></h2>
        </div>
        <div className="client-stories__intro-copy">
          <p className="client-stories__description" data-reveal-words data-reveal-delay="150"><RevealWords text="Writing from the Kyte team on visual culture, branding and the ideas shaping how people experience products." /></p>
          <Link className="client-stories__cta kyte-tertiary" href="/insights">Explore Design News <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      </div>

      {stories.length > 0 && <div className="client-stories__controls carousel-arrow-controls" aria-label="Design News carousel controls">
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
            <span className="client-story__action kyte-tertiary">Read story <ArrowRight size={16} aria-hidden="true" /></span>
          </Link>
        </article>)}
      </div>
    </div>
  </section>;
}
