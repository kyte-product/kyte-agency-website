"use client";

import { useRouter } from "next/navigation";
import { Laptop, Riffle } from "@lucasmarkes/hairline/react";

type ServiceCardFigureProps = {
  kind: "laptop" | "riffle";
  href: "/ui-ux-design-development" | "/branding-marketing";
};

export function ServiceCardFigure({ kind, href }: ServiceCardFigureProps) {
  const router = useRouter();
  const openService = () => router.push(href);

  if (kind === "laptop") {
    return <Laptop className="services-intro__figure services-intro__laptop" theme="dark" play label="An interactive laptop opening and closing its lid." onClick={openService} />;
  }

  return <Riffle className="services-intro__figure services-intro__riffle" theme="dark" play label="An interactive tray of eight cards. Use the arrow keys to explore them." onClick={openService} onKeyDown={(event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      openService();
    }
  }} />;
}
