import Image from "next/image";
import { clientBrands } from "@/components/ClientLogos";
import { clientLogoAsset } from "@/data/clientLogoAssets";
import "./ClientBrandTicker.css";

export function ClientBrandTicker({ title = "Work with these brands" }: { title?: string }) {
  return <section className="client-brand-ticker" aria-label="Brands Kyte has worked with">
    <p className="client-brand-ticker__title">{title}</p>
    <div className="client-brand-ticker__window">
      <div className="client-brand-ticker__track">
        {[false, true].map((duplicate) => <ul key={String(duplicate)} aria-hidden={duplicate || undefined}>
          {clientBrands.map(([name, file]) => {
            const logo = clientLogoAsset(file);
            return <li className={logo.colored ? "client-brand-ticker__color" : "client-brand-ticker__mono"} key={file}>
              <Image src={logo.src} alt={duplicate ? "" : name} width={logo.width} height={logo.height} />
            </li>;
          })}
        </ul>)}
      </div>
    </div>
  </section>;
}
