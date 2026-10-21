import Image from "next/image";
import { clientLogoAsset } from "@/data/clientLogoAssets";

export const clientBrands = [
  ["JioHotstar", "jio-hotstar"],
  ["District by Zomato", "district"],
  ["Daily Objects", "daily-objects"],
  ["ITC Infotech", "itc-infotech"],
  ["Decathlon", "decathlon"],
  ["Wispr Flow", "wispr-flow"],
  ["Lovable", "lovable"],
  ["Emergent", "emergent"],
  ["Gully Labs", "gully-labs"],
  ["Comet", "comet"],
  ["Fincart", "fincart"],
  ["BTG", "btg"],
  ["Agilitas", "agilitas"],
  ["Banza", "banza"],
  ["MAD", "mad"],
  ["Smash Guys", "smash-guys"],
  ["Red Rhino", "red-rhino"],
  ["Hot Ice", "hot-ice"],
  ["Kiara", "kiara"],
  ["AMAIVI", "amaivi"],
  ["Revenue Grid", "revenue-grid"],
  ["Papa Johns", "papa-johns"],
  ["Crepdog Crew", "crepdog-crew"],
  ["Contractzy", "contractzy"],
] as const;

const compactMarks = new Set([
  "itc-infotech", "btg", "smash-guys", "red-rhino", "hot-ice", "kiara", "papa-johns", "crepdog-crew",
]);

export function ClientLogos({ title = "Brands we have worked with", visibleTitle = false }: { title?: string; visibleTitle?: boolean } = {}) {
  return (
    <section className={`clients${visibleTitle ? " clients--careers" : ""}`} aria-labelledby="clients-title">
      <div className="clients__inner">
        <h2 className="clients__title" id="clients-title">{title}</h2>
        <div className="clients__ticker">
          <div className="clients__ticker-track">
            {[false, true].map((duplicate) => (
              <ul className="clients__ticker-group" aria-hidden={duplicate || undefined} key={String(duplicate)}>
                {clientBrands.map(([name, file]) => {
                  const logo = clientLogoAsset(file);
                  return <li className={`clients__item${logo.colored ? " clients__item--color" : " clients__item--mono"}${compactMarks.has(file) ? " clients__item--compact" : ""}${file === "emergent" ? " clients__item--emergent" : ""}${file === "gully-labs" ? " clients__item--gully-labs" : ""}`} key={`${file}-${duplicate ? "duplicate" : "primary"}`}>
                    <Image src={logo.src} alt={duplicate ? "" : name} width={logo.width} height={logo.height} style={{ color: "transparent", filter: logo.colored ? "grayscale(1)" : "brightness(0)", opacity: logo.colored ? 0.72 : 0.58 }} />
                  </li>;
                })}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
