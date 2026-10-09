import { SplitCtaBanner } from "./SplitCtaBanner";
import { TeamPreviewFooter } from "./TeamPreviewFooter";

/** The active page shell shares the same closing components as the homepage. */
export function SiteFooter() {
  return <>
    <SplitCtaBanner />
    <TeamPreviewFooter />
  </>;
}
