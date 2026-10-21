type CarouselDirection = -1 | 1;

function getCardStops(track: HTMLElement, selector: string) {
  const cards = Array.from(track.querySelectorAll<HTMLElement>(selector));
  if (!cards.length) return [];

  const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
  const trackLeft = track.getBoundingClientRect().left;

  return cards.map((card, index) => {
    if (index === 0) return 0;
    if (index === cards.length - 1) return maxScroll;

    const cardLeft = track.scrollLeft + card.getBoundingClientRect().left - trackLeft;
    return Math.min(maxScroll, Math.max(0, Math.ceil(cardLeft)));
  });
}

export function nearestCardCarouselIndex(track: HTMLElement, selector: string) {
  const stops = getCardStops(track, selector);
  if (!stops.length) return 0;

  return stops.reduce((nearest, stop, index) =>
    Math.abs(stop - track.scrollLeft) < Math.abs(stops[nearest] - track.scrollLeft) ? index : nearest, 0);
}

export function scrollCardCarouselTo(track: HTMLElement, selector: string, index: number) {
  const stops = getCardStops(track, selector);
  if (!stops.length) return 0;

  const next = Math.max(0, Math.min(stops.length - 1, index));
  track.scrollTo({ left: stops[next], behavior: "smooth" });
  return next;
}

export function moveCardCarousel(track: HTMLElement, selector: string, direction: CarouselDirection) {
  return scrollCardCarouselTo(track, selector, nearestCardCarouselIndex(track, selector) + direction);
}
