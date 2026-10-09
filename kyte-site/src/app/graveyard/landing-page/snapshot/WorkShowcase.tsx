import Image from "next/image";
import Link from "next/link";

const projects = [
  // Preview-only dates requested for layout review. Replace with verified project timelines before publishing.
  {
    name: "Collectbee.",
    logo: "/graveyard/landing-page/kyte-work/collectbee-icon.png",
    description: "A product-led website that makes an AI accounts receivable platform easier to understand.",
    period: "2024–2025",
    category: "AI accounts receivable · Website design",
    image: "/graveyard/landing-page/kyte-work/collectbee.png",
    alt: "Collectbee accounts receivable platform shown on a tablet",
    href: "/work/collectbee",
  },
  {
    name: "SpicyBayer.",
    logo: "/graveyard/landing-page/kyte-work/spicy-bayer-icon.png",
    description: "A warm website for a Bavarian, Indian and Tamil fusion restaurant.",
    period: "2025",
    category: "Restaurant · Website design",
    image: "/graveyard/landing-page/kyte-work/spicy-bayer.webp",
    alt: "SpicyBayer restaurant website displayed on a desktop monitor",
    href: "/work",
  },
  {
    name: "Arka Inventory.",
    logo: "/graveyard/landing-page/kyte-work/arka-inventory-icon.png",
    description: "A refreshed website for an inventory management platform.",
    period: "2025–2026",
    category: "Inventory management · Website design",
    image: "https://cdn.sanity.io/images/50pibtgs/production/01099437810383d1335759cf2a3324e451f08385-1672x941.png",
    alt: "Arka Inventory website displayed on a desktop monitor against a pink background",
    href: "/work",
  },
  {
    name: "Maya.",
    logo: "/graveyard/landing-page/kyte-work/maya-icon.png",
    description: "An explainer that introduces an AI-powered hiring platform.",
    period: "2026",
    category: "AI hiring · Explainer video",
    image: "/graveyard/landing-page/kyte-work/maya.webp",
    alt: "Orange Maya explainer artwork with illustrated characters",
    href: "/work",
  },
] as const;

export function WorkShowcase() {
  return (
    <section className="work-showcase" id="work-preview" aria-labelledby="work-title">
      <div className="work-showcase__inner">
        <h2 id="work-title">Selected work</h2>
        <div className="work-showcase__list">
          {projects.map((project) => (
            <article className="work-project" key={project.name}>
              <span className="work-project__mark" aria-hidden="true"><Image src={project.logo} alt="" width={52} height={52} /></span>
              <Link className="work-project__summary" href={project.href} aria-label={`View ${project.name} project`}><strong>{project.name}</strong> <span>{project.description}</span></Link>
              <div className="work-project__details"><span className="work-project__period">{project.period || "\u00a0"}</span><span className="work-project__category">{project.category}</span></div>
              <Link className="work-project__visual" href={project.href} aria-label={`Explore ${project.name} project`}>
                <Image src={project.image} alt={project.alt} fill sizes="(max-width: 760px) 90vw, (max-width: 1100px) 32vw, 24vw" unoptimized={project.image.startsWith("https://")} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
