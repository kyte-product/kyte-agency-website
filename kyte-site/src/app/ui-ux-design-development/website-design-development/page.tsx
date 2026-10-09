import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WebsiteServicePage } from "@/components/WebsiteServicePage";

export const metadata: Metadata = {
  title: "Website Design & Development | Kyte",
  description: "Kyte designs and builds websites that explain complex offers clearly, support useful journeys, and give teams room to grow.",
};

export default function WebsiteDesignDevelopmentPage() {
  return <><SiteHeader /><WebsiteServicePage /><SiteFooter /></>;
}
