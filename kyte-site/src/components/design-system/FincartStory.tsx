import Image from "next/image";
import { CaseStudyScreenRail, type CaseStudyScreen } from "./CaseStudyScreenRail";
import { FincartImpactNumber } from "./FincartImpactNumber";
import { FincartPillars } from "./FincartPillars";
import { FincartResearchNotes } from "./FincartResearchNotes";
import { RevealWords } from "@/components/RevealWords";
import "./FincartStory.css";

const asset = (number: number) => `/fincart/${String(number).padStart(2, "0")}.png`;

const onboarding: CaseStudyScreen[] = [
  [27, "Financial health introduction"], [28, "Account setup introduction"],
  [29, "Identity verification step"], [30, "Account created confirmation"],
  [31, "Fincart home dashboard"], [32, "Expense breakdown"],
  [33, "Expense category detail"], [34, "Goal planning overview"],
  [35, "Goal selection"], [36, "Goal contribution details"],
].map(([number, alt]) => ({ src: asset(Number(number)), alt: String(alt) }));

const planning: CaseStudyScreen[] = [
  [40, "Financial planning introduction"], [41, "Goal detail and investment amount"],
  [42, "Goal timeline"], [43, "Financial timeline"],
  [44, "Financial planning prompt"], [45, "Plan creation form"],
  [46, "Portfolio summary"], [47, "Financial plan overview"],
  [48, "Financial plan milestones"], [49, "Assets and liabilities"],
  [50, "Personalized plan recommendations"], [51, "Investment recommendations"],
].map(([number, alt]) => ({ src: asset(Number(number)), alt: String(alt) }));

const investing: CaseStudyScreen[] = [
  [54, "Recommended investment options"], [55, "Investment discovery screen"],
  [56, "Plan recommendations"], [57, "Investment product details"],
  [58, "Recommended investment amount"], [59, "Investment entry screen"],
  [60, "Investment dashboard"], [61, "Mutual funds overview"],
  [62, "Fund performance chart"], [63, "Investment amount entry"],
  [64, "Investment payment options"], [65, "Investment confirmation"],
].map(([number, alt]) => ({ src: asset(Number(number)), alt: String(alt) }));

function Picture({ number, alt, className = "" }: { number: number; alt: string; className?: string }) {
  return <figure className={`fincart-story__picture ${className}`} data-fincart-image-reveal><Image src={asset(number)} alt={alt} fill sizes="(max-width: 720px) 100vw, 85vw" /></figure>;
}

function Statement({ label, children }: { label: string; children: string }) {
  return <div className="fincart-story__statement"><h2 data-reveal-words><RevealWords text={label} /></h2><p data-reveal-words data-reveal-delay="90"><RevealWords text={children} /></p></div>;
}

const targetUsers = [
  { title: "Mid-Level Corporate Employees", detail: "Professionals in stable careers earning well but unsure how to allocate their savings effectively to achieve long-term financial goals.", image: "/fincart/user-corporate.webp" },
  { title: "Young Professionals", detail: "Early-career individuals beginning their financial journey, focused on building savings habits and exploring small, accessible investment options.", image: "/fincart/user-young.avif" },
  { title: "Affluent Individuals", detail: "High-income professionals or business owners seeking structured financial planning, portfolio diversification, and long-term wealth management strategies.", image: "/fincart/user-affluent.avif" },
  { title: "Pre-Retirees & Retirees", detail: "Individuals approaching or living in retirement who want clarity on preserving wealth, managing risk, and generating stable income from their investments.", image: "/fincart/user-retiree.avif" },
];

export function FincartStory() {
  return <div className="fincart-story">
    <section className="fincart-story__intro">
      <Statement label="The brief">Fincart set out to bring financial planning, investing, and portfolio tracking into one app. Kyte helped shape a mobile experience that gives people a clearer view of their money and connects everyday decisions to longer-term goals.</Statement>
      <div className="fincart-story__intro-aside"><p>What we worked on</p><ul><li>Product strategy and information architecture</li><li>UX research and interaction design</li><li>Mobile interface and design system</li><li>Developer handoff and product testing</li></ul></div>
    </section>

    <section className="fincart-story__section">
      <Statement label="The challenge">People could make investments, yet still struggle to see whether those decisions supported their goals. The product needed to connect budgets, plans, investments, and portfolio progress without losing the depth of Fincart&apos;s existing financial tools.</Statement>
      <FincartResearchNotes />
    </section>

    <section className="fincart-story__section">
      <Statement label="Target users">Research highlighted four groups at different stages of their financial lives. Each needed a clear view of their money and a way to connect daily decisions to longer-term plans.</Statement>
      <div className="fincart-story__users">{targetUsers.map((user, index) => <article key={user.title}><div className="fincart-story__user-image"><Image src={user.image} alt="" fill sizes="100px" /></div>{index === 0 && <span className="fincart-story__user-primary">✦ Primary Users</span>}<h3>{user.title}</h3><p>{user.detail}</p></article>)}</div>
    </section>

    <section className="fincart-story__section">
      <Statement label="Product direction">We organized the experience around four connected jobs: understand cash flow, plan for goals, invest with purpose, and track progress. This structure gave the app a clear path from a first financial snapshot to ongoing decisions.</Statement>
      <FincartPillars />
    </section>

    <section className="fincart-story__section">
      <Statement label="Information architecture">The structure connects goals, budgeting, investments, financial planning, and portfolio tracking without disrupting the product&apos;s existing infrastructure. The full map shows how people can move between these parts of the app.</Statement>
      <Picture number={16} alt="Complete Fincart information architecture, from account creation through Home, Plan, Invest, Prosper, and Profile" className="fincart-story__architecture" />
    </section>

    <section className="fincart-story__section">
      <Statement label="Design system">A shared system of colors, components, navigation patterns, and spacing rules supports the breadth of the product. It gives designers and developers a consistent foundation for new flows and refinements.</Statement>
      <div className="fincart-story__ds-grid">
        <div className="fincart-story__ds-main">
          <Picture number={11} alt="Fincart color palette and contrast rules" />
          <Picture number={14} alt="Fincart forms and buttons in multiple states" />
          <Picture number={17} alt="Fincart reusable financial overview components" />
        </div>
        <div className="fincart-story__ds-side">
          <Picture number={13} alt="Fincart navigation components" />
          <Picture number={12} alt="Fincart spacing and component annotation" />
        </div>
      </div>
    </section>

    <section className="fincart-story__section">
      <Statement label="Illustration style">We also established a consistent illustration style for goals, financial concepts, and people throughout the app. Shared colors, forms, and lighting help these moments feel like part of one experience.</Statement>
      <figure className="fincart-story__illustrations" role="region" tabIndex={0} aria-label="Fincart illustration library, scroll horizontally on narrow screens" data-fincart-image-reveal><Image src="/fincart/illustration-style.png" alt="Colorful Fincart illustrations for savings, goals, investments, protection, and life events" width={7500} height={4000} sizes="(max-width: 720px) 780px, 85vw" /></figure>
    </section>

    <section className="fincart-story__section fincart-story__section--showcase">
      <Statement label="The mobile experience">The app gives people a personal starting point, then helps them move from understanding their finances to creating a plan and acting on it.</Statement>
      <div className="fincart-story__store-carousel" role="region" tabIndex={0} aria-label="Fincart app preview screens, scroll horizontally" data-fincart-image-reveal>
        {[21, 22, 19, 20, 24, 25, 26].map((number, index) => <Picture key={number} number={number} alt={`Fincart app store preview ${index + 1}`} />)}
      </div>
    </section>

    <section className="fincart-story__section">
      <Statement label="A clear first step">From sign in to a clear overview, account setup introduces financial health and helps people add the information needed for a more relevant plan. The home screen then brings spending, key balances, and goals into one view.</Statement>
      <CaseStudyScreenRail label="Account setup and home" screens={onboarding} />
    </section>

    <section className="fincart-story__section">
      <Statement label="Planning around real goals">A plan takes shape from the first goal details through calculators, timelines, and recommendations. People can review and adjust it as their assets, liabilities, income, expenses, and risk information change.</Statement>
      <CaseStudyScreenRail label="Goal and financial planning" screens={planning} />
    </section>

    <section className="fincart-story__section">
      <Statement label="From plan to action">Investing stays connected to the wider financial plan. People can explore options, examine a fund, choose an amount, confirm an investment, and track portfolio performance in one flow.</Statement>
      <CaseStudyScreenRail label="Investment discovery and checkout" screens={investing} />
    </section>

    <section className="fincart-story__section">
      <Statement label="All features at a glance">The app brings financial snapshots, portfolio tracking, health checks, life goals, and group accounts into one connected experience. Each tool helps people understand where they stand and what to do next.</Statement>
      <div className="fincart-story__features-grid">
        <Picture number={66} alt="Fincart app widgets on a phone" className="fincart-story__feature-phone" />
        <Picture number={67} alt="Monthly surplus and linked accounts" className="fincart-story__feature-cash" />
        <Picture number={68} alt="Investment categories" className="fincart-story__feature-categories" />
        <Picture number={69} alt="Personal financial snapshot with an investment reminder" className="fincart-story__feature-snapshot" />
        <Picture number={70} alt="Portfolio overview and performance" className="fincart-story__feature-portfolio" />
        <Picture number={76} alt="Financial health check" className="fincart-story__feature-health" />
        <Picture number={77} alt="Import and track investments" className="fincart-story__feature-manage" />
        <Picture number={78} alt="Life goals and progress" className="fincart-story__feature-goals" />
        <Picture number={79} alt="Family group account" className="fincart-story__feature-group" />
      </div>
    </section>

    <section className="fincart-story__impact" aria-labelledby="fincart-impact-title">
      <div className="fincart-story__impact-head"><p className="eyebrow">Project impact</p><h2 id="fincart-impact-title">A connected app for planning, investing, and tracking financial progress.</h2></div>
      <div className="fincart-story__impact-grid">
        <div><FincartImpactNumber value={33000} suffix="+" /><span>Monthly Active Users</span></div>
        <div><FincartImpactNumber value={10} prefix="~" suffix="×" /><span>Faster Financial Plan Creation</span></div>
        <div><FincartImpactNumber value={160} suffix="+" /><span>Features and Flows Designed</span></div>
      </div>
    </section>

    <section className="fincart-story__section fincart-story__closing"><Statement label="The outcome">Fincart now has a connected mobile experience across budgeting, financial planning, investing, and portfolio review, supported by a shared design system for ongoing product work.</Statement></section>
  </div>;
}
