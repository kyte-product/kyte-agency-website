/** Scope contracts. Child service pages inherit Website, never a landing-page override. */
export const designSystems = [
  { id: "website", title: "Website", href: "/design-system", route: "/", document: "docs/design-systems/website.md", inherits: null },
  { id: "branding", title: "Branding landing", href: "/design-system/branding", route: "/branding-marketing", document: "docs/design-systems/branding.md", inherits: null },
  { id: "product", title: "Product design landing", href: "/design-system/product", route: "/ui-ux-design-development", document: "docs/design-systems/product.md", inherits: "website" },
] as const;
export type DesignSystemId = typeof designSystems[number]["id"];
export function designSystemForRoute(pathname: string): DesignSystemId {
  return pathname === "/branding-marketing" ? "branding" : pathname === "/ui-ux-design-development" ? "product" : "website";
}
