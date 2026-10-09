import Image from "next/image";
import { ArrowRight } from "lucide-react";
import "./AnandImpact.css";

const oemLogos = [
  { name: "BMW", file: "bmw.png", width: 95, height: 107 },
  { name: "Maruti Suzuki", file: "marutisuzuki.png", width: 249, height: 28 },
  { name: "Tata Motors", file: "tatamotors.png", width: 244, height: 26 },
  { name: "Mahindra", file: "mahindrarise.png", width: 248, height: 65 },
  { name: "Hyundai", file: "hyundai.png", width: 247, height: 34 },
  { name: "Volkswagen", file: "volkswagen.png", width: 211, height: 124 },
  { name: "Toyota", file: "toyota.png", width: 140, height: 114 },
  { name: "Honda", file: "honda.png", width: 142, height: 93 },
] as const;

const impactNumbers = [
  { value: "1961", label: "Year the Group was established" },
  { value: "17", label: "Companies in the ANAND family" },
  { value: "22,000+", label: "People across the Group" },
  { value: "87", label: "Locations across 14 Indian states" },
  { value: "US$2.2B+", label: "Group revenue" },
] as const;

export function AnandImpact() {
  return (
    <section className="anand-impact" aria-label="About ANAND and group impact">
      <div className="anand-impact__logos">
        <p className="anand-impact__caption">Trusted by the world&apos;s leading OEMs</p>
        <div className="anand-impact__marquee" aria-label="OEM partners">
          <div className="anand-impact__logo-track">
            {oemLogos.map((logo) => <Image key={logo.name} src={`/anand-impact/oem/${logo.file}`} alt={logo.name} width={logo.width} height={logo.height} />)}
          </div>
          <div className="anand-impact__logo-track" aria-hidden="true">
            {oemLogos.map((logo) => <Image key={logo.name} src={`/anand-impact/oem/${logo.file}`} alt="" width={logo.width} height={logo.height} />)}
          </div>
        </div>
      </div>

      <div className="anand-impact__content">
        <div className="anand-impact__about">
          <div>
            <p className="anand-impact__eyebrow">About ANAND</p>
            <h2>Six Decades of Shaping How the World Moves</h2>
          </div>
          <div className="anand-impact__copy">
            <p>For over six decades, ANAND has been shaping the future of mobility through <strong>engineering excellence, innovation, trusted partnerships</strong> and a commitment to sustainable growth.</p>
            <p>Beyond automotive, the Group keeps widening its impact. <strong>ANEVOLVE</strong>, ANAND&apos;s future-tech platform, is advancing clean mobility and emerging technologies. <strong>SUJÁN</strong> redefines experiential luxury through conservation-led hospitality, and the <strong>SNS Foundation</strong> drives change through education, skill development, health, hygiene and community conservation.</p>
            <a href="#anand-glance">The ANAND Way <ArrowRight size={18} aria-hidden="true" /></a>
          </div>
        </div>

        <div className="anand-impact__facts">
          {impactNumbers.map(({ value, label }) => (
            <div className="anand-impact__item" key={value}>
              <p className="anand-impact__value">{value}</p>
              <p className="anand-impact__label">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
