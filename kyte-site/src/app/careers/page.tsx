import { CareerCultureGallery } from "./CareerCultureGallery";
import { ServiceApproach } from "@/components/ServiceApproach";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ClientBrandTicker } from "@/components/ClientBrandTicker";
import { getPublishedCareerRoles } from "@/lib/sanity";
import { CareerOpportunities } from "./CareerOpportunities";
import "./careers.css";

export const metadata: Metadata = {
  title: "Careers at Kyte | Work with our team",
  description: "Explore careers at Kyte Agency and introduce yourself to our product design, branding and marketing team.",
};
export const instant = false;

export default async function CareersPage() {
  let roles = [] as Awaited<ReturnType<typeof getPublishedCareerRoles>>;
  let rolesUnavailable = false;
  try {
    roles = await getPublishedCareerRoles();
  } catch {
    rolesUnavailable = true;
  }

  return <>
    <SiteHeader />
    <main className="careers-page">
      <section className="careers-page__stage" aria-labelledby="careers-title">
        <div className="careers-page__inner">
          <div className="careers-page__hero">
            <h1 id="careers-title"><span className="careers-page__headline-line">Make useful</span><span className="careers-page__headline-line careers-page__headline-accent">work with people.</span></h1>
            <div className="careers-page__hero-bottom">
              <p className="careers-page__intro">Product design, branding and marketing come together here. If you care about making useful work with a thoughtful team, we would like to hear from you.</p>
              <a className="kyte-button careers-page__jump" href="#careers-openings-title">View opportunities</a>
            </div>
          </div>
          <ClientBrandTicker />
        </div>
      </section>

      <section className="careers-page__openings-section" aria-labelledby="careers-openings-title">
        <div className="careers-page__inner">
          <div className="careers-page__opportunities" aria-labelledby="careers-openings-title">
            <div className="careers-page__section-heading">
              <h2 id="careers-openings-title">Current opportunities</h2>
            </div>
            {rolesUnavailable ? <p className="careers-page__empty">We cannot load current opportunities right now. Please check back shortly.</p> : roles.length === 0 ? <p className="careers-page__empty">We do not have any confirmed openings right now.</p> : null}
            {roles.length > 0 && <CareerOpportunities roles={roles} />}
            <div className="careers-page__team-card"><p>Want to know who you might work with?</p><Link href="/about">Meet the team <ArrowRight size={17} aria-hidden="true" /></Link></div>
          </div>
        </div>
      </section>
      <ServiceApproach heading="How we work together." intro="Our approach to culture starts with how we listen, share ideas and support the work. These are the principles we want to bring to everyday collaboration." patternSeed="careers-culture" ctaHref="/about" ctaLabel="Meet the team" cardsLabel="Our culture principles" items={[
        { symbol: 0, title: "Listen with care", description: "Ask questions, understand the context and make room for perspectives beyond your own." },
        { symbol: 1, title: "Build together", description: "Bring design, brand and development into the conversation, and make decisions visible to the team." },
        { symbol: 2, title: "Keep learning", description: "Seek useful feedback, share what you learn and stay open to changing direction when the evidence calls for it." },
        { symbol: 3, title: "Care for the craft", description: "Give attention to the details that help people use, understand and trust the things we make." },
      ]} />
      <CareerCultureGallery />
    </main>
    <SiteFooter />
  </>;
}
