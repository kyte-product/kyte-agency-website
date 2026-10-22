// All four stages have distinct artwork on every service route. These forty
// assignments are also unique across routes; the homepage Laptop is unchanged.
export const serviceProcessFigures = {
  "ui-ux-design-development/ux-research-design-audit": [
    { kind: "workstack", label: "Research briefs collected in a tray" },
    { kind: "loupe", label: "A loupe examining the research" },
    { kind: "sieve", label: "Findings separated into clear themes" },
    { kind: "riffle", label: "Research cards ready for handoff" },
  ],
  "ui-ux-design-development/website-design-development": [
    { kind: "branches", label: "Website paths branching from a plan" },
    { kind: "format", label: "Page structure aligned into a system" },
    { kind: "exploded", label: "Interface layers opened for development" },
    { kind: "router", label: "A connected site ready to launch" },
  ],
  "ui-ux-design-development/mobile-app-design": [
    { kind: "phone", label: "Mobile device layers opening apart" },
    { kind: "drawer", label: "App flows organized into groups" },
    { kind: "keyboard", label: "Controls responding to interaction" },
    { kind: "plug", label: "The finished app connecting to its system" },
  ],
  "ui-ux-design-development/saas-web-app-design": [
    { kind: "cabinet", label: "Software modules in a cabinet" },
    { kind: "stack", label: "Product logic arranged in a stack" },
    { kind: "rebuild", label: "Connected dependencies rebuilding together" },
    { kind: "terminal", label: "The developed product ready for handoff" },
  ],
  "ui-ux-design-development/ecommerce-shopify-websites": [
    { kind: "basket", label: "Shopping experience under review" },
    { kind: "rail", label: "Product categories organized on a rail" },
    { kind: "hub", label: "Storefront modules connected around a hub" },
    { kind: "vault", label: "A completed and secure checkout" },
  ],
  "branding-marketing/brand-strategy-identity": [
    { kind: "settle", label: "Brand elements finding their place" },
    { kind: "phosphor", label: "Visual patterns emerging on a grid" },
    { kind: "turntable", label: "Identity elements turning into a system" },
    { kind: "lockers", label: "A consistent system ready for use" },
  ],
  "branding-marketing/graphic-design": [
    { kind: "plot", label: "Graphic ideas explored on a plotting board" },
    { kind: "patch", label: "Visual components connected into a system" },
    { kind: "terrain", label: "A composition rising from a grid" },
    { kind: "palette", label: "Finished design swatches and artwork" },
  ],
  "branding-marketing/video-production-motion-graphics": [
    { kind: "dish", label: "A camera direction being explored" },
    { kind: "slow", label: "Motion timing under review" },
    { kind: "elevator", label: "Frames moving through production" },
    { kind: "storyboard", label: "A completed film storyboard" },
  ],
  "branding-marketing/social-media-marketing": [
    { kind: "relay", label: "Signals moving between content channels" },
    { kind: "social-map", label: "Content channels mapped around an idea" },
    { kind: "content-grid", label: "Posts arranged into a content system" },
    { kind: "publishing", label: "Finished content moving into publication" },
  ],
  "branding-marketing/seo-ai-search-optimisation": [
    { kind: "query", label: "A question revealing search intent" },
    { kind: "padlock", label: "Technical foundations checked and secured" },
    { kind: "search-map", label: "Search journeys and content paths mapped" },
    { kind: "index-grid", label: "Structured content ready to be found" },
  ],
} as const;

export type ServiceProcessPath = keyof typeof serviceProcessFigures;
export type ServiceProcessFigure = (typeof serviceProcessFigures)[ServiceProcessPath][number];

export function getServiceProcessFigure(path: string, stepIndex: number) {
  const figures = serviceProcessFigures[path as ServiceProcessPath] ?? serviceProcessFigures["ui-ux-design-development/ux-research-design-audit"];
  return figures[stepIndex] ?? figures[0];
}
