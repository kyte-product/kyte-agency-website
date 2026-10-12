import type { Metadata } from "next";
import { LegalPlaceholder } from "@/components/LegalPlaceholder";

export const metadata: Metadata = { title: "Terms and conditions | Kyte Agency", robots: { index: false, follow: false } };

export default function TermsPage() {
  return <LegalPlaceholder title="Terms and conditions" sections={[
    { heading: "Using this website", body: "This section will set out the terms for visiting and using the Kyte Agency website." },
    { heading: "Website content", body: "The final terms will explain the ownership and permitted use of text, images, case studies, and other material on this site." },
    { heading: "Enquiries and services", body: "The final terms will explain how project enquiries relate to a separate service agreement." },
    { heading: "Changes and contact", body: "The final terms will describe how updates are published and how to contact Kyte with questions." },
  ]} />;
}
