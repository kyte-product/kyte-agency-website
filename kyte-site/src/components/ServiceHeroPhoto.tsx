import Image from "next/image";
import type { PagePhoto } from "@/data/pagePhotography";
import "./ServiceHeroPhoto.css";

export function ServiceHeroPhoto({ label, slides }: { label: string; slides: PagePhoto[] }) {
  const photo = slides[0];
  if (!photo) return null;
  return <section className="service-hero-photo" aria-label={label} data-site-reveal-ignore>
    <Image src={photo.image} alt={photo.alt} fill sizes="100vw" unoptimized priority />
  </section>;
}
