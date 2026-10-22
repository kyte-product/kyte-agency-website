import Image from "next/image";
import { clientLogoAsset } from "@/data/clientLogoAssets";
import "./ClientGrid.css";

import { clientBrands, compactMarks } from "@/data/clientBrands";

export function ClientGrid() {
  return <section className="client-grid" aria-labelledby="client-grid-title">
    <div className="client-grid__inner">
      <h2 id="client-grid-title">Brands We Have Worked With</h2>
      <ul className="client-grid__logos">
        {clientBrands.map(([name, file]) => {
          const logo = clientLogoAsset(file);
          return <li className={`client-grid__item${logo.colored ? " client-grid__item--color" : ""}${compactMarks.has(file) ? " client-grid__item--compact" : ""}${file === "emergent" ? " client-grid__item--emergent" : ""}`} key={file}>
            <Image src={logo.src} alt={name} width={logo.width} height={logo.height} style={{ color: "transparent" }} />
          </li>;
        })}
      </ul>
    </div>
  </section>;
}
