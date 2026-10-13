"use client";

import { useRouter } from "next/navigation";
import { Exploded, Laptop } from "@lucasmarkes/hairline/react";

type ServiceCardFigureProps = {
  kind: "laptop" | "exploded";
  href: "/ui-ux-design-development" | "/branding-marketing";
};

export function ServiceCardFigure({ kind, href }: ServiceCardFigureProps) {
  const router = useRouter();
  const openService = () => router.push(href);

  if (kind === "laptop") {
    return <Laptop className="services-intro__figure services-intro__laptop" theme="dark" play label="An interactive laptop opening and closing its lid." onClick={openService} />;
  }

  return <Exploded className="services-intro__figure services-intro__riffle" theme="dark" play label="An interactive set of visual layers that open to show how a brand system comes together." onClick={openService} onKeyDown={(event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      openService();
    }
  }} />;
}
