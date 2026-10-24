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
    </main>
    <SiteFooter />
  </>;
}
