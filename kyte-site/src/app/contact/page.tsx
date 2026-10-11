import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ContactContent } from "@/components/ContactExperience";

export const metadata: Metadata = {
  title: "Contact Kyte | Start a project",
  description: "Tell Kyte about the product, website or brand work you are considering.",
};

export default function ContactPage() {
  return <><SiteHeader /><main className="contact-page"><ContactContent idPrefix="page" /></main><SiteFooter /></>;
}
