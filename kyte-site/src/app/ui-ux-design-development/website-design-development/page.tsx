import type { Metadata } from "next";
import { ServiceDetailTemplate } from "@/components/ServiceDetailTemplate";
import { servicePages } from "@/data/servicePages";
import { loadServicePageContent } from "@/lib/service-content";

const path = "ui-ux-design-development/website-design-development";

export async function generateMetadata(): Promise<Metadata> {
  const service = await loadServicePageContent(path);
  return { title: service?.title || servicePages[path].title, description: service?.description || servicePages[path].description };
}

export default async function WebsiteDesignDevelopmentPage() {
  const service = await loadServicePageContent(path);
  return <ServiceDetailTemplate service={service || servicePages[path]} />;
}
