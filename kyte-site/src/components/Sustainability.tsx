import { ArrowRight, GraduationCap, HeartPulse, Trees, Wrench } from "lucide-react";
import "./Sustainability.css";

const topics = [
  { category: "Community & wildlife", title: "100 sq km of Wilderness Protected in Rajasthan", tone: "forest" },
  { category: "Education & diversity", title: "3.78 Lakh Students Reached Through 100+ Partner Schools", tone: "royal" },
  { category: "Skill development", title: "45,000+ Young People Trained, 80% of Them Women", tone: "cyan" },
  { category: "ANAND School", title: "800+ Students and 100% Class X Board Results (2024–25)", tone: "navy" },
  { category: "Community & livelihoods", title: "1,000+ Self-Help Groups Supported with 170 mn in Micro-Credit", tone: "cyan" },
  { category: "Health & hygiene", title: "Health Services for 27 Lakh People in Rural India", tone: "navy" },
  { category: "Sustainability", title: "Solar Power, Wind Energy and Miyawaki Forests", tone: "green" },
  { category: "Scholarships", title: "SNSF Scholars: Free English-Medium Schooling Since 2018–19", tone: "royal" },
] as const;

export function Sustainability() {
  return (
    <section className="sustainability" id="sustainability" aria-labelledby="sustainability-title">
      <div className="sustainability__inner">
        <div className="sustainability__intro">
          <p className="sustainability__eyebrow">Sustainability &amp; CSR</p>
          <h2 id="sustainability-title">Progress That Reaches Past the Factory Floor</h2>
          <p className="sustainability__lede">Guided by ESG principles, ANAND&apos;s businesses use resources more responsibly, while the SNS Foundation, our CSR arm since 1976, builds capabilities and protects wildlife in line with the UN SDGs.</p>
          <a className="sustainability__button" href="https://www.anandgroupindia.com/snsf/">Explore Sustainability &amp; CSR <ArrowRight aria-hidden="true" size={16} /></a>
          <div className="sustainability__foundation">
            <h3>SNS Foundation</h3>
            <p>ANAND&apos;s CSR arm, named after Sant Nischal Singhji (1882–1978), a social reformer devoted to education.</p>
            <ul>
              <li><GraduationCap aria-hidden="true" />Education</li>
              <li><HeartPulse aria-hidden="true" />Health &amp; hygiene</li>
              <li><Wrench aria-hidden="true" />Skill development</li>
              <li><Trees aria-hidden="true" />Community conservation</li>
            </ul>
          </div>
        </div>
        <div className="sustainability__column sustainability__column--staggered">
          {topics.slice(0, 4).map((topic) => <TopicCard key={topic.title} topic={topic} />)}
        </div>
        <div className="sustainability__column">
          {topics.slice(4).map((topic) => <TopicCard key={topic.title} topic={topic} />)}
        </div>
      </div>
    </section>
  );
}

function TopicCard({ topic }: { topic: (typeof topics)[number] }) {
  return (
    <a className={`sustainability-card sustainability-card--${topic.tone}`} href="https://www.anandgroupindia.com/snsf/">
      <span className="sustainability-card__content">
        <span className="sustainability-card__category">{topic.category}</span>
        <span className="sustainability-card__title">{topic.title}</span>
      </span>
      <span className="sustainability-card__more">Read More <ArrowRight aria-hidden="true" size={16} /></span>
    </a>
  );
}
