/** The public service URLs follow the approved IA, independent of editor titles. */
export const serviceRoutes = {
  "ux-research-design-audit": "/ui-ux-design-development/ux-research-design-audit",
  "website-design-development": "/ui-ux-design-development/website-design-development",
  "mobile-app-design": "/ui-ux-design-development/mobile-app-design",
  "saas-web-app-design": "/ui-ux-design-development/saas-web-app-design",
  "ecommerce-shopify-websites": "/ui-ux-design-development/ecommerce-shopify-websites",
  "brand-strategy-identity": "/branding-marketing/brand-strategy-identity",
  "graphic-design": "/branding-marketing/graphic-design",
  "video-production-motion-graphics": "/branding-marketing/video-production-motion-graphics",
  "social-media-marketing": "/branding-marketing/social-media-marketing",
  "seo-ai-search-optimisation": "/branding-marketing/seo-ai-search-optimisation",
} as const;

export function servicePathForSlug(slug: string): string | null {
  return serviceRoutes[slug as keyof typeof serviceRoutes] ?? null;
}
