import type { Metadata } from "next";
import { ServiceDetailTemplate } from "@/components/ServiceDetailTemplate";
import { servicePages } from "@/data/servicePages";

export const metadata: Metadata = { title: servicePages["ui-ux-design-development/website-design-development"].title, description: servicePages["ui-ux-design-development/website-design-development"].description };

export default function WebsiteDesignDevelopmentPage() {
  return <ServiceDetailTemplate service={servicePages["ui-ux-design-development/website-design-development"]} />;
}
