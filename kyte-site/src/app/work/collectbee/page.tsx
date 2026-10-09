import type { Metadata } from "next";
import { CaseStudyTemplate, type CaseStudyData } from "@/components/design-system/CaseStudyTemplate";

export const metadata: Metadata = {
  title: "Collectbee case study | Kyte",
  description: "Kyte's website design and development work for Collectbee, an AI accounts receivable platform.",
};

const caseStudy: CaseStudyData = {
  client: "Collectbee",
  title: "Collectbee",
  summary: "A product website for an AI accounts receivable platform.",
  details: [
    { label: "Industry", value: "AI accounts receivable" },
    { label: "Services", value: "Website UX, UI design, Framer development" },
    { label: "Platform", value: "Framer" },
  ],
  cover: { alt: "Placeholder for the Collectbee case study cover", label: "Cover image · 16:9", ratio: "cover" },
  introduction: {
    label: "ABOUT THE PROJECT",
    title: "Presenting Collectbee's accounts receivable platform.",
    paragraphs: [
      "Collectbee brings invoice processing, follow-ups, dispute resolution, and payment visibility together for finance teams. Kyte designed and built a website to present the product and its workflows.",
    ],
  },
  impact: [
    { label: "Verified result to add" },
    { label: "Verified result to add" },
    { label: "Verified result to add" },
  ],
  story: {
    label: "THE WORK",
    title: "A website organized around the product workflow.",
    paragraphs: [
      "The page structure introduces the platform, explains its capabilities, and gives visitors routes to pricing and getting started. Product screens sit alongside descriptions of the relevant workflow.",
      "Kyte worked across information architecture, responsive interface design, and Framer development. Reusable page sections allow the team to add product content over time.",
    ],
  },
  gallery: [
    { alt: "Placeholder for a Collectbee website overview", label: "Project image 01 · landscape", ratio: "landscape" },
    { alt: "Placeholder for a Collectbee interface detail", label: "Project image 02 · portrait", ratio: "portrait" },
  ],
  outcome: {
    label: "OUTCOME",
    title: "Website design and Framer development.",
    paragraphs: [
      "The delivered website brings the product narrative, interface views, and next steps into one experience. Add approved launch outcomes and performance results here when they are available.",
    ],
  },
  finalImage: { alt: "Placeholder for a final Collectbee project image", label: "Project image 03 · landscape", ratio: "landscape" },
  // Add a verified testimonial when the client provides an approved quote and attribution.
};

export default function CollectbeeCaseStudy() {
  return <CaseStudyTemplate data={caseStudy} />;
}
