import type { Metadata } from "next";
import "@fontsource-variable/dm-sans";
import { PageTransition } from "@/components/PageTransition";
import { SiteRevealMotion } from "@/components/SiteRevealMotion";
import { ContactModal } from "@/components/ContactExperience";
import { CookieSettings } from "@/components/CookieSettings";
import { SiteSmoothScroll } from "@/components/SiteSmoothScroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import "./globals.css";
import "./branding-theme.css";

export const metadata: Metadata = {
  title: "Kyte | Product, website and brand design",
  description: "Kyte brings product, web and brand design together to help people understand, use and choose what you make.",
  robots: { index: false, follow: false },
  icons: { icon: [
    { url: "/kyte-agency-mark.png", media: "(prefers-color-scheme: light)" },
    { url: "/kyte-agency-mark-white.png", media: "(prefers-color-scheme: dark)" },
  ] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-palette="kyte" suppressHydrationWarning><body>{children}<SiteSmoothScroll /><SiteRevealMotion /><ContactModal /><CookieSettings /><PageTransition /></body></html>;
}
