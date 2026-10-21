import DitherHelixCarousel from "@/components/ui/dither-helix-carousel";
import { EditorialGlyph } from "@/components/branding/EditorialGlyph";
import "./BrandHelixSection.css";

const items = [
  { image: "/branding-helix/mountain-lake.webp", title: "Mountain lake" },
  { image: "/branding-helix/puppy-portrait.webp", title: "Woodland portrait" },
  { image: "/branding-helix/forest-path.webp", title: "Waterfall" },
  { image: "/branding-helix/desert-dunes.webp", title: "Mountain valley" },
  { image: "/branding-helix/old-bridge.webp", title: "Coastal cliffs" },
  { image: "/branding-helix/city-alley.webp", title: "Quiet morning" },
];

export function BrandHelixSection() {
  return <section className="brand-helix-scroll" aria-label="Kyte image carousel">
    <div className="brand-helix-scroll__sticky">
      <DitherHelixCarousel id="branding-helix" items={items} brand="Kyte" accent="#1a1a16" />
      <div className="brand-helix-notes" aria-hidden="true">
        <div className="brand-helix-notes__top brand-helix-notes__row">
          <p><EditorialGlyph name="seal" /> Kyte Agency <EditorialGlyph name="coordinates" /><br />Independent branding studio <EditorialGlyph name="roof" /></p>
          <p>Strategy <EditorialGlyph name="arrows" /> identity<br />Digital <EditorialGlyph name="squareQ" /> culture <EditorialGlyph name="brain" /></p>
        </div>

        <div className="brand-helix-notes__bottom brand-helix-notes__row">
          <p>Creative partner<br />Bengaluru, India <EditorialGlyph name="flower" /><EditorialGlyph name="squareQ" /><EditorialGlyph name="circleC" /></p>
          <p>Designing for what&apos;s next<br />contact@kyte-agency.com <EditorialGlyph name="phone" /><EditorialGlyph name="reply" /></p>
        </div>
      </div>
    </div>
  </section>;
}
