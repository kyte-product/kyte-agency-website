import Image from "next/image";
import { clientLogoAsset } from "@/data/clientLogoAssets";
import "./ClientGrid.css";

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

export function ClientGrid() {
  return <section className="client-grid" aria-labelledby="client-grid-title">
    <div className="client-grid__inner">
      <h2 id="client-grid-title">Brands we have worked with</h2>
      <ul className="client-grid__logos">
        {clients.map(([name, file]) => {
          const logo = clientLogoAsset(file);
          return <li className={`client-grid__item${logo.colored ? " client-grid__item--color" : ""}${compactMarks.has(file) ? " client-grid__item--compact" : ""}${file === "emergent" ? " client-grid__item--emergent" : ""}`} key={file}>
            <Image src={logo.src} alt={name} width={logo.width} height={logo.height} />
          </li>;
        })}
      </ul>
    </div>
  </section>;
}
