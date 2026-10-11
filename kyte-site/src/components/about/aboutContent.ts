export type AboutPerson = { name: string; role: string; image?: string };

export const aboutTeams: { title: string; people: AboutPerson[] }[] = [
  {
    title: "Leadership",
    people: [
      { name: "Varun Padmanabhan", role: "Co-Founder", image: "/team-images/ff98cefc-7213-4103-9472-0a3142e5b048.png" },
      { name: "Pratham", role: "Co-Founder", image: "/team-images/5eb7c535-2022-4e64-8e6e-df3888827fe1.png" },
      { name: "Vedant", role: "Advisor", image: "/team-images/6e210ad3-3439-45ae-9851-b6a6424c0324.png" },
    ],
  },
  {
    title: "UI/UX and Product Design Team",
    people: [
      { name: "Mahir Malde", role: "Head of Product Design", image: "/team-images/0392e3a4-d611-45e0-83f2-089bb0035181.png" },
      { name: "Riya Pathak", role: "Senior Product Designer", image: "/team-images/riya.jpg" },
      { name: "Vishwas Patel", role: "Senior Product Designer", image: "/team-images/vishwas.png" },
      { name: "Prem Damoor", role: "Senior Product Designer", image: "/team-images/prem.png" },
      { name: "Ayush Goswami", role: "Product Designer", image: "/team-images/ayush.png" },
    ],
  },
  {
    title: "Branding & Marketing Team",
    people: [
      { name: "Aishwarya Krishnan", role: "Head of Cluster" },
      { name: "Ayush Madan", role: "Head of Copy & Creative Direction" },
      { name: "Udaijit Wahi", role: "Head of Production & Content Direction" },
      { name: "Tanmay Sharma", role: "Account & Creative Lead", image: "/team-images/tanmay---kyte-headshot.png" },
      { name: "Mohammed Aayan C", role: "Lead Designer", image: "/team-images/aayan-kyte.png" },
      { name: "Aryan Thombare", role: "Video Editor", image: "/team-images/aryan-n1.png" },
      { name: "Shashank Pandit", role: "Video Editor" },
      { name: "Shulamit BP", role: "Videographer" },
    ],
  },
];

export const aboutImpact = [
  { value: 150, suffix: "+", description: "Projects completed across branding, product design, websites and content" },
  { value: 200, suffix: "M+", description: "Impressions generated across client campaigns and content" },
  { value: 22, suffix: "%", description: "Average conversion increase across client projects" },
  { value: 85, suffix: "%", description: "Of brands increased revenue while working with Kyte" },
] as const;
