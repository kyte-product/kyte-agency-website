import Image from "next/image";
import { clientBrands } from "@/data/clientBrands";
import { clientLogoAsset } from "@/data/clientLogoAssets";
import "./ClientBrandTicker.css";

export function ClientBrandTicker({ title = "Work with these brands" }: { title?: string | null }) {
  return <section className="client-brand-ticker" aria-label="Brands Kyte has worked with">
    {title && <p className="client-brand-ticker__title">{title}</p>}
    <div className="client-brand-ticker__window">
      <div className="client-brand-ticker__track">
        {[false, true].map((duplicate) => <ul key={String(duplicate)} aria-hidden={duplicate || undefined}>
          {clientBrands.map(([name, file]) => {
            const logo = clientLogoAsset(file);
              return <li className={logo.colored ? "client-brand-ticker__color" : "client-brand-ticker__mono"} key={file}>
                <Image src={logo.src} alt={duplicate ? "" : name} width={logo.width} height={logo.height} style={{ filter: logo.colored ? "grayscale(1)" : "brightness(0)", opacity: logo.colored ? 0.62 : 0.52 }} />
            </li>;
          })}
        </ul>)}
      </div>
    </div>
  </section>;
}
