import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import "./SplitCtaBanner.css";

export function SplitCtaBanner() {
  return <section className="split-cta" aria-labelledby="split-cta-title">
    <div className="split-cta__inner">
      <div className="split-cta__card" data-nav-theme="dark">
        <div className="split-cta__content">
          <div>
            <h2 id="split-cta-title">Let&apos;s make your next idea real.</h2>
            <p>Product, website, and brand design for what comes next.</p>
            <Link className="kyte-button" href="/contact">Start a project <ChevronRight size={16} aria-hidden="true" /></Link>
          </div>
        </div>
        <div className="split-cta__art">
          <Image className="split-cta__motion-mark" src="/kyte-motion-mark.svg" alt="Animated Kyte logo" width={1000} height={1000} unoptimized />
        </div>
      </div>
    </div>
  </section>;
}
