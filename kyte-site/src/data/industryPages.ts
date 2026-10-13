export type IndustryPageContent = {
  slug: string;
  name: string;
  title: string;
  description: string;
  hero: [string, string];
  opening: string;
  showBrandsTicker?: boolean;
  challengeIntro: string;
  challenges: string[];
  focusHeading: string;
  focusIntro: string;
  focus: { title: string; body: string }[];
  servicesHeading: string;
  servicesIntro: string;
  services: { title: string; body: string; href: string }[];
  outputsHeading: string;
  outputs: { title: string; body: string }[];
  faqs: { question: string; answer: string }[];
  editorial: {
    heroAside: string;
    opportunityHeading: string;
    approachHeading: string;
    impactHeading: string;
    impactCopy: string[];
    metricLabels: [string, string, string, string];
  };
};

export const industryPages: Record<string, IndustryPageContent> = {
  fintech: {
    slug: "fintech", name: "Fintech",
    title: "Fintech Product Design | Kyte Agency",
    description: "Design financial products that make complex decisions, money tasks, and account journeys easier to understand and use.",
    hero: ["Make financial decisions", "feel clearer."],
    opening: "Financial products ask people to make decisions with real consequences. We design the journeys, interfaces, and brand cues that help people understand their options and move through important tasks with confidence.",
    showBrandsTicker: true,
    challengeIntro: "Financial services combine sensitive information, complex choices, and tasks people need to complete with confidence. Small points of friction can make the whole experience harder to trust.",
    challenges: ["Explaining financial choices in plain, useful language", "Helping people complete onboarding without losing context", "Making balances, plans, and activity easier to interpret", "Creating consistent experiences across mobile and web", "Connecting operational requirements with clear customer journeys"],
    focusHeading: "Trust is built in the details of the journey.",
    focusIntro: "From first use to recurring money tasks, each step needs to explain what is happening and what a person can do next.",
    focus: [
      { title: "Onboarding and account setup", body: "Make requirements, progress, and next steps easy to follow while collecting the information a service needs." },
      { title: "Financial comprehension", body: "Present balances, plans, fees, and choices in a way people can scan, compare, and understand." },
      { title: "Dense data and tools", body: "Organize dashboards and controls around the questions people are trying to answer." },
      { title: "Confidence at key moments", body: "Use clear language, feedback, and recovery paths around payments, investments, and account changes." },
      { title: "Consistent product systems", body: "Connect screens and states with reusable patterns that help teams extend the experience responsibly." },
    ],
    servicesHeading: "The right design support for financial products.",
    servicesIntro: "The scope can focus on a single journey or connect research, product design, and brand expression across a wider experience.",
    services: [
      { title: "UX research & design audit", body: "Find points of confusion across core financial tasks and define what to improve first.", href: "/ui-ux-design-development/ux-research-design-audit" },
      { title: "Mobile app design", body: "Shape account, planning, payment, and portfolio journeys for everyday use.", href: "/ui-ux-design-development/mobile-app-design" },
      { title: "SaaS & web app design", body: "Make complex financial tools and operational workflows easier to navigate.", href: "/ui-ux-design-development/saas-web-app-design" },
      { title: "Brand strategy & identity", body: "Build a clear and consistent identity for a financial product and its audience.", href: "/branding-marketing/brand-strategy-identity" },
    ],
    outputsHeading: "Useful foundations for the next product decision.",
    outputs: [
      { title: "Journey and task flows", body: "A view of how people move through priority financial tasks, including important states and handoffs." },
      { title: "Interface and prototype designs", body: "Reviewed screen designs or interactive prototypes for the agreed platform and scope." },
      { title: "Content and hierarchy guidance", body: "Recommendations for explaining choices, information, and next actions in context." },
      { title: "Reusable interface patterns", body: "Components and usage notes that support consistency across related screens." },
      { title: "Research and usability findings", body: "Evidence and observations from agreed research or testing activities." },
      { title: "Prioritised next steps", body: "A practical handoff that records decisions, open questions, and the next design opportunities." },
    ],
    editorial: {
      heroAside: "We design clear journeys for the money decisions people make every day, from first setup to the moments that need extra confidence.",
      opportunityHeading: "Make the important moments easier to understand.",
      approachHeading: "Trust is built across the whole journey.",
      impactHeading: "Design for the decisions that matter at scale.",
      impactCopy: [
        "Financial products ask people to make important choices while balancing risk, uncertainty, and unfamiliar language. A useful interface shows what a choice means, what happens next, and where someone can find help before they commit.",
        "Research helps us see where a journey slows down: a form field that needs explanation, a comparison that hides a cost, or a status message that leaves progress unclear. We examine onboarding, account information, planning flows, and support moments as one connected experience.",
        "Those findings give product teams a shared basis for deciding which journeys to improve first, which patterns to align across web and mobile, and which questions to test with real users. The work turns scattered observations into clear product decisions.",
        "We then test the revised journeys with people, refine the details with engineering, and document what the team should measure after release. Comprehension, avoidable errors, and task completion are outcomes to examine, with results reported when verified.",
      ],
      metricLabels: ["priority journeys reviewed", "task completion change", "product screens designed", "research participants"],
    },
    faqs: [
      { question: "Can you redesign an existing finance app?", answer: "Yes. We can review the current experience, identify priority journeys, and agree on a focused redesign or a broader product scope." },
      { question: "Do you provide financial or regulatory advice?", answer: "No. We design the product experience with your subject matter and compliance teams. Your organization remains responsible for financial, legal, and regulatory decisions." },
      { question: "Can you work with our product and engineering teams?", answer: "Yes. We can align the design scope, review points, and handoff with the teams already building and maintaining the product." },
    ],
  },
  "saas-startups": {
    slug: "saas-startups", name: "SaaS & Startups",
    title: "SaaS & Startup Product Design | Kyte Agency",
    description: "Shape SaaS and startup products around clear workflows, validated priorities, and design systems that can grow with the product.",
    hero: ["Build software people", "can move through."],
    opening: "Software products often grow faster than their experience. We help teams clarify the core workflow, make complex tools easier to learn, and create a design foundation that can support what comes next.",
    challengeIntro: "As software products add features, roles, and integrations, the experience can become difficult to learn and maintain. Design needs to support both the people using the product and the teams extending it.",
    challenges: ["Helping new users reach value sooner", "Reducing friction across complex or repeated workflows", "Making roles, permissions, and shared work understandable", "Keeping navigation coherent as features expand", "Extending the interface without fragmenting the design system"],
    focusHeading: "Bring clarity to products as they take shape and scale.",
    focusIntro: "Good product design connects the value a team wants to deliver with the work users need to get done.",
    focus: [
      { title: "Early product direction", body: "Define the audience, core problem, and smallest useful journey before committing to a larger feature set." },
      { title: "Complex workflows", body: "Reduce unnecessary steps across setup, collaboration, data entry, review, and reporting." },
      { title: "Roles and permissions", body: "Make it clear what different people can see and do across shared workspaces." },
      { title: "Product onboarding", body: "Help new users understand the product and reach a useful first outcome." },
      { title: "Design systems for growth", body: "Create reusable components and principles that keep new features coherent." },
    ],
    servicesHeading: "Design support across the product lifecycle.",
    servicesIntro: "Choose a focused engagement or connect discovery, product design, website, and brand work as needs evolve.",
    services: [
      { title: "SaaS & web app design", body: "Design workflows, interfaces, and systems for software products and internal tools.", href: "/ui-ux-design-development/saas-web-app-design" },
      { title: "UX research & design audit", body: "Understand where users struggle and which product changes deserve attention.", href: "/ui-ux-design-development/ux-research-design-audit" },
      { title: "Website design & development", body: "Explain the product clearly and help the right visitors find a useful next step.", href: "/ui-ux-design-development/website-design-development" },
      { title: "Brand strategy & identity", body: "Create a shared position and identity for a product entering or expanding in a market.", href: "/branding-marketing/brand-strategy-identity" },
    ],
    outputsHeading: "A practical path from product question to usable design.",
    outputs: [
      { title: "Product and user brief", body: "A shared view of the audience, problem, constraints, and product goals." },
      { title: "Workflow maps", body: "Priority journeys and key states across the people, tasks, and systems involved." },
      { title: "Wireframes and prototypes", body: "A way to review structure and interaction before committing to detailed implementation." },
      { title: "Interface design", body: "Responsive screens and interaction states for the agreed features and platforms." },
      { title: "Design system foundations", body: "Reusable patterns, components, and guidance suited to the product's needs." },
      { title: "Developer handoff", body: "Organized files, specifications, and review sessions aligned to the delivery scope." },
    ],
    editorial: {
      heroAside: "We help software teams turn growing feature sets into journeys people can learn, navigate, and use with confidence.",
      opportunityHeading: "Make complex workflows feel coherent.",
      approachHeading: "A useful product grows from a clear foundation.",
      impactHeading: "Design for the work people return to every day.",
      impactCopy: [
        "Software products often serve different roles, tasks, and levels of experience. We look at how people enter the product, find their next action, and complete the work they came to do.",
        "Research and workflow mapping reveal where navigation, language, permissions, or repeated steps slow people down. This gives teams a clearer basis for prioritizing changes across the product.",
        "We explore interface patterns that make important actions easier to find and related features feel connected. Shared components also help the team extend the experience without rebuilding decisions for every new screen.",
        "The scope can begin with one critical workflow or cover a broader product system. Any improvement should be tested against the tasks and people it is meant to support.",
      ],
      metricLabels: ["workflows mapped", "task completion change", "interface states designed", "research participants"],
    },
    faqs: [
      { question: "Can you help before we have a complete product brief?", answer: "Yes. We can begin by clarifying the users, problem, assumptions, and decisions the team needs to make." },
      { question: "Can you work with an existing design system?", answer: "Yes. We can work within the current system, identify gaps, and extend it where the product needs new patterns." },
      { question: "Do you support product teams after the initial design?", answer: "Ongoing design support can be scoped around roadmap priorities, team capacity, and the product's review process." },
    ],
  },
  "d2c-ecommerce": {
    slug: "d2c-ecommerce", name: "D2C & eCommerce",
    title: "D2C & eCommerce Design | Kyte Agency",
    description: "Connect brand, product discovery, product detail, and checkout in a clear eCommerce experience across devices.",
    hero: ["Make every step", "to purchase feel clear."],
    opening: "A strong storefront helps customers discover the right product, understand why it fits, and move through purchase without avoidable uncertainty. We connect the brand and shopping journey across the screens and touchpoints your team uses.",
    challengeIntro: "Online shoppers compare products quickly and expect each step to feel connected. Storefronts need to make discovery, product details, and purchase decisions work together across devices.",
    challenges: ["Helping customers find the right product across large ranges", "Making product details easy to scan and compare", "Showing delivery, returns, and availability at the right moment", "Reducing friction between product selection and checkout", "Keeping the brand experience consistent across mobile and desktop"],
    focusHeading: "Make the product easier to find, understand, and choose.",
    focusIntro: "A useful shopping experience brings merchandising, product information, and customer confidence together.",
    focus: [
      { title: "Product discovery", body: "Organize categories, search, and filters around how customers explore the range." },
      { title: "Product detail", body: "Bring key specifications, imagery, sizing, ingredients, and care information into a useful order." },
      { title: "Purchase confidence", body: "Make delivery, returns, availability, and other decision details easy to find." },
      { title: "Cart and checkout preparation", body: "Reduce surprises and clarify what happens before customers move into payment." },
      { title: "Mobile shopping", body: "Design product browsing and buying tasks for the smaller screens many customers use." },
    ],
    servicesHeading: "Connected storefront and brand design.",
    servicesIntro: "Bring the product experience and the visual identity together across your key customer touchpoints.",
    services: [
      { title: "eCommerce & Shopify websites", body: "Review and design the discovery, product, cart, and storefront experience.", href: "/ui-ux-design-development/ecommerce-shopify-websites" },
      { title: "Brand strategy & identity", body: "Clarify the brand position and build a recognizable identity system.", href: "/branding-marketing/brand-strategy-identity" },
      { title: "Graphic design", body: "Create campaign, product, and channel assets that work within the brand system.", href: "/branding-marketing/graphic-design" },
      { title: "Social media marketing", body: "Plan content themes and creative formats around the channels and audience.", href: "/branding-marketing/social-media-marketing" },
    ],
    outputsHeading: "A storefront system ready for thoughtful iteration.",
    outputs: [
      { title: "Shopping journey review", body: "A view of the discovery-to-purchase journey and the questions customers meet along the way." },
      { title: "Navigation and collection structure", body: "A considered way to organize products, categories, search, and filters." },
      { title: "Product page framework", body: "A content and interface hierarchy for product details, imagery, options, and trust information." },
      { title: "Responsive storefront designs", body: "Priority page and interaction designs for desktop and mobile screens." },
      { title: "Brand and campaign assets", body: "Agreed visual assets and templates for selected customer touchpoints." },
      { title: "Launch and handoff notes", body: "The agreed implementation details, content needs, and checks for the next stage." },
    ],
    editorial: {
      heroAside: "We connect product discovery, useful information, and purchase journeys so customers can make choices with greater clarity.",
      opportunityHeading: "Help customers find the right product.",
      approachHeading: "A connected shopping journey builds confidence.",
      impactHeading: "Design around the decisions behind a purchase.",
      impactCopy: [
        "Customers move between search, collections, product details, and the cart while comparing what matters to them. Each step should help them narrow the choice and understand what they will receive.",
        "We examine how categories, filters, imagery, specifications, availability, and delivery information work together. Gaps in that chain can make a straightforward purchase feel uncertain.",
        "The design work joins brand expression with practical shopping tasks across mobile and desktop. Clear content and interface patterns help customers compare options and move forward when they are ready.",
        "We review proposed changes against real customer questions and the store's platform constraints. The next iteration can then focus on the points that matter most to the experience.",
      ],
      metricLabels: ["shopping journeys reviewed", "task completion change", "storefront screens designed", "research participants"],
    },
    faqs: [
      { question: "Can you improve an existing Shopify store?", answer: "Yes. We can assess the storefront and focus on the pages or shopping tasks that need the most attention." },
      { question: "Do you work on checkout?", answer: "We can review the steps leading into checkout and define design or implementation needs. Platform and payment constraints are confirmed during scoping." },
      { question: "Can you also create the brand and campaign assets?", answer: "Yes. Brand, graphic design, and social content can be included when they support the agreed storefront and customer experience." },
    ],
  },
  "hospitality-food-beverage": {
    slug: "hospitality-food-beverage", name: "Hospitality & Food",
    title: "Hospitality & Food Brand and Digital Design | Kyte Agency",
    description: "Design clear digital and brand experiences for hospitality and food businesses, from discovery to reservations, orders, and return visits.",
    hero: ["Make the experience", "memorable at every step."],
    opening: "People experience a hospitality or food brand before, during, and after a visit or order. We connect the way a place feels with the practical details that help customers discover, decide, book, order, and come back.",
    challengeIntro: "A guest's experience starts before they arrive and continues after they leave. Brand and digital touchpoints need to communicate the character of the place while making practical tasks straightforward.",
    challenges: ["Communicating what makes a place, menu, or stay distinctive", "Making menus and service details easy to find and understand", "Helping people book, order, or enquire without uncertainty", "Connecting online experiences with the in-person brand", "Keeping information useful across changing offers and channels"],
    focusHeading: "Carry the promise of the experience into every interaction.",
    focusIntro: "The brand, information, and service journey need to work together across the moments customers rely on.",
    focus: [
      { title: "Discovery and first impression", body: "Show what makes the place, menu, stay, or service distinctive and who it is for." },
      { title: "Menus and product information", body: "Present choices, ingredients, options, and practical details in a readable format." },
      { title: "Reservations and ordering", body: "Make availability, booking, ordering, and confirmation steps easier to complete." },
      { title: "Brand across touchpoints", body: "Connect digital experiences with selected print, packaging, signage, and campaign materials." },
      { title: "Return visits and loyalty", body: "Plan useful follow-up and content moments that fit the relationship and the channel." },
    ],
    servicesHeading: "Brand and digital design for service experiences.",
    servicesIntro: "Choose the touchpoints that matter to your customers and operations, then build a consistent experience around them.",
    services: [
      { title: "Website design & development", body: "Help people understand the offer and move into useful booking or enquiry journeys.", href: "/ui-ux-design-development/website-design-development" },
      { title: "Brand strategy & identity", body: "Define the character and visual system people should recognize across the experience.", href: "/branding-marketing/brand-strategy-identity" },
      { title: "Graphic design", body: "Create practical, coordinated assets for menus, campaigns, packaging, or print where scoped.", href: "/branding-marketing/graphic-design" },
      { title: "Social media marketing", body: "Plan channel content around the stories, offers, and moments your audience cares about.", href: "/branding-marketing/social-media-marketing" },
    ],
    outputsHeading: "A connected experience for customers and teams.",
    outputs: [
      { title: "Audience and experience brief", body: "A shared view of customer groups, operational context, and the moments to improve." },
      { title: "Service journey map", body: "Key steps before, during, and after a visit, stay, booking, or order." },
      { title: "Website and booking direction", body: "Page structures and interface designs for the agreed discovery and service tasks." },
      { title: "Brand identity applications", body: "Selected examples that show how the identity works across agreed touchpoints." },
      { title: "Campaign and content assets", body: "Creative formats and content direction matched to the channels in scope." },
      { title: "Practical handoff", body: "Organized files, usage guidance, and next steps for the people maintaining the experience." },
    ],
    editorial: {
      heroAside: "We bring brand character and practical service journeys together, from first discovery to booking, ordering, and return visits.",
      opportunityHeading: "Make the next step easy for every guest.",
      approachHeading: "The experience begins before arrival.",
      impactHeading: "Design for moments guests remember and use.",
      impactCopy: [
        "A guest may first encounter a place through a menu, a recommendation, a search result, or a social post. The details they find there shape expectations before any visit or order begins.",
        "We look at how the brand is expressed alongside practical information such as availability, options, location, and service details. A clear path helps people decide whether the experience fits their plans.",
        "The digital journey should carry the same character across website, booking, ordering, and selected physical touchpoints. Consistent information also makes updates easier for the team responsible for the experience.",
        "We focus the design scope on the moments that matter to guests and operations, then review those moments with the people who use and maintain them.",
      ],
      metricLabels: ["guest journeys reviewed", "task completion change", "touchpoints designed", "research participants"],
    },
    faqs: [
      { question: "Can you work on both the brand and website?", answer: "Yes. The project can connect brand direction with the website and other selected customer touchpoints." },
      { question: "Can you design menus, packaging, or signage?", answer: "These can be included where the formats, production needs, and responsibilities are clear in the scope." },
      { question: "Do you build reservation or ordering systems?", answer: "We can design the customer journey and interface. The platform, integrations, and development responsibilities are confirmed during scoping." },
    ],
  },
};
