import { IllustrationImage, IllustrationFrame } from "./IllustrationPalette";
import { ProductExperienceOrbitArt } from "../ProductDesignIllustrations";

const illustrations = [
  ["Workspace hero", "product-experience-embed.html", "Hero"],
  ["Experience orbit", "inline-orbit", "Product moments"],
  ["Dashboard laptop", "product-dashboard-laptop-embed.html", "Product moments"],
  ["Complex system", "product-complex-system.svg", "Product moments"],
  ["Evolving experience", "product-evolving-experience.svg", "Product moments"],
  ...["new", "growth", "established", "tools", "commerce", "web", "systems", "brands"].map(name=>[name.replaceAll("-"," "), `product-stage-${name}.svg`, "Product stages"]),
  ...["research-audit", "website-design", "mobile-app", "saas-web-app", "commerce"].map(name=>[name.replaceAll("-"," "), `product-${name}.svg`, "Services"]),
  ...["onboarding", "navigation", "workflow-hub", "content-journey", "design-patterns", "responsive-experience"].map(name=>[name.replaceAll("-"," "), `product-${name}.svg`, "What we design"]),
];
export function IllustrationLibrary({ compact = false }: { compact?: boolean }) {
  const entries = compact ? illustrations.filter(([,file])=>["product-complex-system.svg", "product-mobile-app.svg", "product-stage-commerce.svg"].includes(file)) : illustrations;
  return <div className="ds-gallery">{entries.map(([title,file,group])=><figure key={file}>
    <div className="ds-art">{file === "inline-orbit" ? <ProductExperienceOrbitArt /> : file.endsWith(".html") ? <IllustrationFrame src={`/hairline/${file}`} title={`${title} illustration preview`} loading="lazy" tabIndex={-1} /> : <IllustrationImage src={`/hairline/${file}`} alt="" width={620} height={420} loading="lazy" unoptimized />}</div>
    <figcaption><strong>{title}</strong><span>{group}</span><code>{file === "inline-orbit" ? "ProductExperienceOrbitArt" : file}</code></figcaption>
  </figure>)}</div>;
}
