"use client";

import { Exploded, Hub, Plot, Relay } from "@lucasmarkes/hairline/react";
import Image from "next/image";
import illustrationPaletteLibrary from "@/design-tokens/illustration-palettes.json";
const P={greenBlue:illustrationPaletteLibrary.palettes.greenBlue.colors,mintCyan:illustrationPaletteLibrary.palettes.mintCyan.colors};

const figures = { hub: Hub, relay: Relay, plot: Plot, exploded: Exploded };

function ProductExperienceOrbitArt() {
  return <svg className="product-landing__orbit-art" viewBox="0 0 824 596" role="img" aria-label="Product experience and sales shown as connected spheres above a softly colored circular platform" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="orbit-floor-grid" width="160" height="92" patternUnits="userSpaceOnUse"><path d="M80 0 160 46 80 92 0 46Z" fill="none" stroke="#e7e9e9" strokeWidth="1.25" /></pattern>
      <radialGradient id="orbit-floor-fade"><stop offset="25%" stopColor="white" /><stop offset="100%" stopColor="black" /></radialGradient>
      <mask id="orbit-grid-mask"><rect width="824" height="596" fill="url(#orbit-floor-fade)" /></mask>
      <mask id="orbit-band-mask" x="222" y="184" width="380" height="196" maskUnits="userSpaceOnUse"><rect x="222" y="184" width="380" height="196" fill="black" /><ellipse cx="412" cy="282" rx="171" ry="82" fill="white" /><ellipse cx="412" cy="282" rx="136" ry="56" fill="black" /></mask>
      <clipPath id="orbit-sphere-clip"><circle cx="410" cy="264" r="59" /></clipPath>
      <radialGradient id="orbit-sphere-rim"><stop offset=".72" stopColor="#fff" stopOpacity="0" /><stop offset=".9" stopColor="#fff" stopOpacity=".07" /><stop offset="1" stopColor="#fff" stopOpacity=".46" /></radialGradient>
      <filter id="orbit-color-blend" x="-50%" y="-100%" width="200%" height="300%"><feGaussianBlur stdDeviation="18" /></filter>
      <filter id="orbit-inner-wash" x="-35%" y="-70%" width="170%" height="240%"><feGaussianBlur stdDeviation="5" /></filter>
      <filter id="orbit-sphere-blend" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="12" /></filter>
      <filter id="orbit-shadow" x="-40%" y="-60%" width="180%" height="220%"><feGaussianBlur stdDeviation="8" /></filter>
    </defs>
    <rect width="824" height="596" fill="#f8f9f9" />
    <rect width="824" height="596" fill="url(#orbit-floor-grid)" mask="url(#orbit-grid-mask)" opacity=".66" />
    <g transform="translate(0 40)">
    <path d="M150 288C150 208 267 143 412 143S675 208 675 288V365C675 446 557 511 412 511S150 446 150 365Z" fill="#fff" stroke="#a9b0b2" strokeWidth="2" strokeLinejoin="round" />
    <path d="M194 287C194 220 291 165 412 165S630 220 630 287C630 354 533 409 412 409S194 354 194 287Z" fill="#fff" stroke="#e7e9e9" strokeWidth="1.65" />
    <path d="M167 339C200 399 294 445 412 445S624 399 657 339" fill="none" stroke="#e9ecec" strokeWidth="1.6" strokeLinecap="round" />
    <g mask="url(#orbit-band-mask)">
      <rect x="235" y="198" width="354" height="169" fill={P.greenBlue.blue} />
      <g filter="url(#orbit-color-blend)">
        <ellipse cx="395" cy="217" rx="154" ry="48" fill={P.greenBlue.blue} />
        <ellipse cx="270" cy="278" rx="67" ry="68" fill={P.greenBlue.base} />
        <ellipse cx="315" cy="333" rx="102" ry="53" fill={P.mintCyan.light} />
        <ellipse cx="556" cy="279" rx="79" ry="72" fill={P.greenBlue.base} />
        <ellipse cx="514" cy="333" rx="107" ry="54" fill={P.mintCyan.mint} />
      </g>
      <ellipse cx="412" cy="368" rx="210" ry="52" fill="#fff" opacity=".72" filter="url(#orbit-color-blend)" />
      <g fill="none" stroke="#fff" strokeWidth="8" opacity=".40" filter="url(#orbit-inner-wash)"><ellipse cx="412" cy="282" rx="170" ry="81" /><ellipse cx="412" cy="282" rx="137" ry="57" /></g>
    </g>
    <ellipse cx="412" cy="313" rx="79" ry="38" fill="#fff" stroke="#e8ebeb" strokeWidth="1.5" />
    <ellipse cx="412" cy="323" rx="71" ry="31" fill="#e9ecec" opacity=".78" />
    <ellipse cx="412" cy="343" rx="54" ry="13" fill="#cfd8d8" opacity=".24" filter="url(#orbit-shadow)" />
    <g clipPath="url(#orbit-sphere-clip)">
      <circle cx="410" cy="264" r="59" fill={P.mintCyan.light} />
      <g filter="url(#orbit-sphere-blend)"><ellipse cx="376" cy="276" rx="48" ry="64" fill={P.mintCyan.light} /><ellipse cx="442" cy="239" rx="49" ry="49" fill={P.greenBlue.blueLight} /><ellipse cx="440" cy="288" rx="48" ry="43" fill={P.greenBlue.blue} /><ellipse cx="391" cy="208" rx="45" ry="25" fill={P.greenBlue.mint} /></g>
      <circle cx="410" cy="264" r="59" fill="url(#orbit-sphere-rim)" />
      <circle cx="410" cy="264" r="55" fill="none" stroke="#fff" strokeWidth="9" opacity=".27" filter="url(#orbit-inner-wash)" />
    </g>
    <circle cx="410" cy="264" r="59" fill="none" stroke="#edf4f3" strokeWidth="1" opacity=".75" />
    <g fill="#fff" stroke="#a9b0b2" strokeWidth="2"><circle cx="304" cy="57" r="53" /><circle cx="540" cy="141" r="53" /></g>
    <g fill="none" stroke="#e3e7e7" strokeWidth="1.5" strokeLinecap="round"><path d="M260 83c22 21 67 22 89 1" /><path d="M496 166c24 18 65 19 89 0" /></g>
    <g fill="#fff" stroke="#e8ebeb" strokeWidth="1.3"><rect x="179" y="150" width="161" height="66" rx="9" /><rect x="362" y="340" width="97" height="47" rx="8" /></g>
    <g fill="#252a2b" fontFamily="Arial, Helvetica, sans-serif" fontWeight="400" textAnchor="middle"><text x="259.5" y="180" fontSize="22">Product</text><text x="259.5" y="202" fontSize="22">experience</text><text x="410.5" y="370" fontSize="22">Sales</text></g>
    </g>
  </svg>;
}

export function ProductDesignHeroArt() {
  return <div className="product-landing__art" role="img" aria-label="Isometric product workspace with a keyboard, layered interface panels, connected tools, and soft color gradients">
    <iframe className="product-landing__art-embed" src="/hairline/product-experience-embed.html" title="Custom Hairline product experience illustration" loading="eager" tabIndex={-1} aria-hidden="true" />
  </div>;
}

export function ProductDesignCardArt({ kind, orbit = false, dashboard = false, complex = false, evolution = false, research = false, website = false, mobile = false, saas = false, commerce = false, onboarding = false, navigation = false, workflowHub = false, contentJourney = false, designPatterns = false, responsiveExperience = false }: { kind: keyof typeof figures; orbit?: boolean; dashboard?: boolean; complex?: boolean; evolution?: boolean; research?: boolean; website?: boolean; mobile?: boolean; saas?: boolean; commerce?: boolean; onboarding?: boolean; navigation?: boolean; workflowHub?: boolean; contentJourney?: boolean; designPatterns?: boolean; responsiveExperience?: boolean }) {
  if (responsiveExperience) return <div className="product-landing__card-art product-landing__card-art--responsive-experience"><Image className="product-landing__responsive-experience-art" src="/hairline/product-responsive-experience.svg?v=1" width={400} height={280} alt="" loading="lazy" unoptimized /></div>;
  if (designPatterns) return <div className="product-landing__card-art product-landing__card-art--design-patterns"><Image className="product-landing__design-patterns-art" src="/hairline/product-design-patterns.svg?v=1" width={400} height={280} alt="" loading="lazy" unoptimized /></div>;
  if (contentJourney) return <div className="product-landing__card-art product-landing__card-art--content-journey"><Image className="product-landing__content-journey-art" src="/hairline/product-content-journey.svg?v=1" width={400} height={280} alt="" loading="lazy" unoptimized /></div>;
  if (workflowHub) return <div className="product-landing__card-art product-landing__card-art--workflow-hub"><Image className="product-landing__workflow-hub-art" src="/hairline/product-workflow-hub.svg?v=1" width={400} height={280} alt="" loading="lazy" unoptimized /></div>;
  if (navigation) return <div className="product-landing__card-art product-landing__card-art--navigation"><Image className="product-landing__navigation-art" src="/hairline/product-navigation.svg?v=1" width={400} height={280} alt="" loading="lazy" unoptimized /></div>;
  if (onboarding) return <div className="product-landing__card-art product-landing__card-art--onboarding"><Image className="product-landing__onboarding-art" src="/hairline/product-onboarding.svg?v=1" width={400} height={280} alt="" loading="lazy" unoptimized /></div>;
  if (orbit) return <div className="product-landing__card-art product-landing__card-art--orbit"><ProductExperienceOrbitArt /></div>;
  if (dashboard) return <div className="product-landing__card-art product-landing__card-art--dashboard"><ProductDashboardLaptopArt /></div>;
  if (complex) return <div className="product-landing__card-art product-landing__card-art--complex"><Image className="product-landing__complex-art" src="/hairline/product-complex-system.svg?v=3" width={400} height={260} alt="" loading="lazy" unoptimized /></div>;
  if (evolution) return <div className="product-landing__card-art product-landing__card-art--evolution"><Image className="product-landing__evolution-art" src="/hairline/product-evolving-experience.svg?v=3" width={400} height={260} alt="" loading="lazy" unoptimized /></div>;
  if (research) return <div className="product-landing__card-art product-landing__card-art--research"><Image className="product-landing__research-art" src="/hairline/product-research-audit.svg?v=1" width={400} height={280} alt="" loading="lazy" unoptimized /></div>;
  if (website) return <div className="product-landing__card-art product-landing__card-art--website"><Image className="product-landing__website-art" src="/hairline/product-website-design.svg?v=1" width={400} height={280} alt="" loading="lazy" unoptimized /></div>;
  if (mobile) return <div className="product-landing__card-art product-landing__card-art--mobile"><Image className="product-landing__mobile-art" src="/hairline/product-mobile-app.svg?v=1" width={400} height={280} alt="" loading="lazy" unoptimized /></div>;
  if (saas) return <div className="product-landing__card-art product-landing__card-art--saas"><Image className="product-landing__saas-art" src="/hairline/product-saas-web-app.svg?v=1" width={400} height={280} alt="" loading="lazy" unoptimized /></div>;
  if (commerce) return <div className="product-landing__card-art product-landing__card-art--commerce"><Image className="product-landing__commerce-art" src="/hairline/product-commerce.svg?v=1" width={400} height={280} alt="" loading="lazy" unoptimized /></div>;
  const Figure = figures[kind];
  return <div className={`product-landing__card-art product-landing__card-art--${kind}`}><span className="product-landing__card-glow" /><Figure theme="light" play intensity={0.2} label="Interactive fine-line product design illustration" /></div>;
}

const stageScenes = {
  "New products": "new",
  "Growing platforms": "growth",
  "Established services": "service",
  "Complex internal tools": "tools",
  "Commerce journeys": "commerce",
  "Web platforms": "web",
  "Internal systems": "systems",
  "Connected brands": "brands",
} as const;

export type ProductStageTitle = keyof typeof stageScenes;
type StageSceneKey = ProductStageTitle;

function StageScene({ scene }: { scene: typeof stageScenes[StageSceneKey] }) {
  if (scene === "new") return <Image className="product-landing__stage-art product-landing__stage-art--new" src="/hairline/product-stage-new.svg?v=1" width={160} height={128} alt="" unoptimized />;
  if (scene === "growth") return <Image className="product-landing__stage-art product-landing__stage-art--growth" src="/hairline/product-stage-growth.svg?v=1" width={160} height={128} alt="" unoptimized />;
  if (scene === "service") return <Image className="product-landing__stage-art product-landing__stage-art--established" src="/hairline/product-stage-established.svg?v=1" width={160} height={128} alt="" unoptimized />;
  if (scene === "commerce") return <Image className="product-landing__stage-art product-landing__stage-art--journeys" src="/hairline/product-stage-commerce.svg?v=1" width={160} height={128} alt="" unoptimized />;
  if (scene === "systems") return <Image className="product-landing__stage-art product-landing__stage-art--systems" src="/hairline/product-stage-systems.svg?v=1" width={160} height={128} alt="" unoptimized />;
  if (scene === "web") return <Image className="product-landing__stage-art product-landing__stage-art--web" src="/hairline/product-stage-web.svg?v=1" width={160} height={128} alt="" unoptimized />;
  if (scene === "tools") return <Image className="product-landing__stage-art product-landing__stage-art--tools" src="/hairline/product-stage-tools.svg?v=1" width={160} height={128} alt="" unoptimized />;
  return <Image className="product-landing__stage-art product-landing__stage-art--brands" src="/hairline/product-stage-brands.svg?v=1" width={160} height={128} alt="" unoptimized />;
}
export function ProductStageIllustration({ title }: { title: StageSceneKey }) {
  return <StageScene scene={stageScenes[title]} />;
}

function ProductDashboardLaptopArt() {
  return <iframe className="product-landing__dashboard-art" src="/hairline/product-dashboard-laptop-embed.html" title="Isometric laptop dashboard illustration" loading="lazy" tabIndex={-1} aria-hidden="true" />;
}
