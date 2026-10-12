import type { Metadata } from "next";
import { LegalPlaceholder } from "@/components/LegalPlaceholder";

export const metadata: Metadata = { title: "Privacy policy | Kyte Agency", robots: { index: false, follow: false } };

export default function PrivacyPolicyPage() {
  return <LegalPlaceholder title="Privacy policy" sections={[
    { heading: "Information you share", body: "This section will explain the information collected when you contact Kyte or send an enquiry through this website." },
    { heading: "How it is handled", body: "The final policy will describe how enquiry information is used, stored, shared, and retained." },
    { heading: "Cookies and choices", body: "The current site uses a cookie to remember your cookie notice choice. Open Cookie settings in the footer to review the current controls." },
    { heading: "Your questions", body: "The final policy will explain how to request access, correction, or deletion where applicable." },
  ]} />;
}
