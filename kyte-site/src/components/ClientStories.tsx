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
  const stories = articles.filter((article) => article.slug && article.cover?.url).slice(0, 3);

  return <section className="client-stories client-stories--branding" aria-labelledby="branding-news-title">
    <div className="client-stories__inner">
      <div className="client-stories__editorial-head">
        <h2 id="branding-news-title" data-reveal-words><RevealWords text="Design News" /></h2>
        <Link href="/insights" className="client-stories__editorial-link branding-nav-action">All stories <ArrowRight size={16} aria-hidden="true" /></Link>
      </div>

      {stories.length > 0 ? <div className="client-stories__editorial-grid">
        {stories.map((story, index) => <article className="client-stories__news-card" key={story._id} data-accent={index % 4}>
          <Link className="client-stories__news-card-link" href={`/insights/${encodeURIComponent(story.slug)}`} aria-label={`Read ${story.title}`}>
            <div className="client-stories__news-card-image">
              <Image src={story.cover.url!} alt={story.cover.alt || ""} fill unoptimized sizes="(max-width: 700px) 90vw, (max-width: 1050px) 45vw, 30vw" />
            </div>
            <span className="client-stories__news-card-category">{story.category?.split(",").at(-1)?.trim() || "Design News"}</span>
            <h3><span>{story.title}</span></h3>
            {story.summary && <p>{story.summary}</p>}
            <time dateTime={story.publishedAt || story.updatedAt || undefined}>{formatEditorialDate(story.publishedAt || story.updatedAt)}</time>
          </Link>
        </article>)}
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
      <div className="client-stories__intro section-intro">
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
