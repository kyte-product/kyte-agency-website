import Image from "next/image";
import { clientLogoAsset } from "./clientLogoAssets";

const clients = [
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

export function ClientLogos() {
  return (
    <section className="clients" aria-labelledby="clients-title">
      <div className="clients__inner">
        <h2 className="eyebrow" id="clients-title">Brands we have worked with</h2>
        <ul className="clients__grid">
          {clients.map(([name, file]) => {
            const logo = clientLogoAsset(file);
            return <li className={`clients__item${logo.colored ? " clients__item--color" : ""}${compactMarks.has(file) ? " clients__item--compact" : ""}`} key={file}>
              <Image src={logo.src} alt={name} width={logo.width} height={logo.height} />
            </li>;
          })}
        </ul>
      </div>
    </section>
  );
}
