import type { Metadata } from "next";
import "@fontsource-variable/dm-sans";
import { PageTransition } from "@/components/PageTransition";
import { SiteRevealMotion } from "@/components/SiteRevealMotion";
import { ContactModal } from "@/components/ContactExperience";
import { SiteSmoothScroll } from "@/components/SiteSmoothScroll";
import "lenis/dist/lenis.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kyte | Product, website and brand design",
  description: "Kyte brings product, web and brand design together to help people understand, use and choose what you make.",
  robots: { index: false, follow: false },
  icons: { icon: "/kyte-agency-mark.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}<SiteSmoothScroll /><SiteRevealMotion /><ContactModal /><PageTransition /></body></html>;
}
