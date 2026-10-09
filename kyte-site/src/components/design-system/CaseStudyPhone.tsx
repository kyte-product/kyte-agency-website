import Image from "next/image";

/** The supplied transparent iPhone 16 frame sits above the actual app screen. */
export function CaseStudyPhone({ src, alt }: { src: string; alt: string }) {
  return <span className="case-study-phone">
    <span className="case-study-phone__screen">
      <Image src={src} alt={alt} fill sizes="(max-width: 650px) 62vw, 280px" />
    </span>
    <Image className="case-study-phone__frame" src="/fincart/iphone-16-frame.png" alt="" fill sizes="(max-width: 650px) 62vw, 280px" aria-hidden="true" />
  </span>;
}
