/** Published Sanity content only. Keep draft and write credentials on the server. */
const PROJECT_ID = "50pibtgs";
const DATASET = "production";
const API_VERSION = "2026-10-09";

export type CmsImage = { url: string | null; alt: string | null };

export type WorkProject = {
  _id: string;
  title: string;
  slug: string;
  summary: string | null;
  client: string | null;
  role: string | null;
  projectType: string | null;
  period?: string | null;
  cardService?: string | null;
  filterCategories?: string[] | null;
  projectUrl?: string | null;
  featured: boolean | null;
  sortOrder: number | null;
  cover: CmsImage;
  body?: PortableTextBlock[];
  outcomes?: { value?: string; label?: string }[] | null;
  gallery?: CmsImage[] | null;
};

export type PortableTextBlock = {
  _key: string;
  _type: "block";
  style?: string;
  children?: { _key: string; _type: "span"; text: string; marks?: string[] }[];
};

export type ServicePageItem = {
  _key?: string;
  title: string;
  subtitle?: string;
  description: string;
};

export type ServicePage = {
  _id: string;
  title: string;
  slug: string;
  summary: string | null;
  hero?: {
    lineOne?: string;
    lineTwo?: string;
    lineOneLead?: string;
    lineOneFocus?: string;
    lineTwoLead?: string;
    lineTwoFocus?: string;
    opening?: string;
  } | null;
  offeringsHeading?: string | null;
  offeringsIntro?: string | null;
  offerings?: ServicePageItem[] | null;
  includedHeading?: string | null;
  includedIntro?: string | null;
  inclusions?: ServicePageItem[] | null;
  outcomesHeading?: string | null;
  outcomesIntro?: string | null;
  outcomes?: ServicePageItem[] | null;
  deliverablesHeading?: string | null;
  deliverables?: ServicePageItem[] | null;
  processIntro?: string | null;
  processSteps?: ServicePageItem[] | null;
  faqHeading?: string | null;
  faqs?: ServicePageItem[] | null;
  seo?: { title?: string | null; description?: string | null } | null;
  sections?: unknown[];
};

export type DesignNewsArticle = {
  _id: string;
  title: string;
  slug: string;
  summary: string | null;
  publishedAt: string | null;
  updatedAt?: string | null;
  author: string | null;
  category: string | null;
  tags: string[] | null;
  featured: boolean | null;
  sortOrder: number | null;
  cover: CmsImage;
  body?: PortableTextBlock[];
};

export type CareerRole = {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  team: string | null;
  location: string;
  workMode: string;
  experienceLevel: string | null;
  employmentType: string | null;
  responsibilities: string[];
  requirements: string[];
  hiringProcess: string | null;
  applyUrl: string | null;
  isPlaceholder: boolean | null;
  sortOrder: number | null;
  seo: { title?: string; description?: string } | null;
};


async function query<T>(groq: string, params: Record<string, string> = {}): Promise<T> {
  const url = new URL(`https://${PROJECT_ID}.apicdn.sanity.io/v${API_VERSION}/data/query/${DATASET}`);
  url.searchParams.set("query", groq);
  url.searchParams.set("perspective", "published");
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(`$${key}`, JSON.stringify(value));
  }

  const response = await fetch(url, { next: { revalidate: 300 } });
  if (!response.ok) throw new Error(`Sanity published query failed (${response.status})`);
  const data: { result: T } = await response.json();
  return data.result;
}

const workFields = `_id,title,"slug":slug.current,summary,client,role,projectType,period,cardService,filterCategories,featured,sortOrder,
  "cover":{"url":coverImage.asset->url,"alt":coverImage.alt}`;
const newsFields = `_id,title,"slug":slug.current,summary,publishedAt,"updatedAt":_updatedAt,author,category,tags,featured,sortOrder,
  "cover":{"url":coverImage.asset->url,"alt":coverImage.alt}`;

export function getPublishedWork(): Promise<WorkProject[]> {
  return query(`*[_type == "workProject" && defined(slug.current)] | order(sortOrder asc, title asc){${workFields}}`);
}

export function getPublishedWorkBySlug(slug: string): Promise<WorkProject | null> {
  return query(`*[_type == "workProject" && slug.current == $slug][0]{${workFields},projectUrl,body,outcomes,"gallery":gallery[]{"url":asset->url,"alt":alt}}`, { slug });
}

export function getPublishedServices(): Promise<ServicePage[]> {
  return query(`*[_type == "servicePage" && defined(slug.current)] | order(sortOrder asc, title asc){_id,title,"slug":slug.current,summary}`);
}

export function getPublishedServiceBySlug(slug: string): Promise<ServicePage | null> {
  return query(`*[_type == "servicePage" && slug.current == $slug][0]{
    _id,title,"slug":slug.current,summary,hero,
    offeringsHeading,offeringsIntro,"offerings":offerings[]{_key,title,description},
    includedHeading,includedIntro,"inclusions":inclusions[]{_key,title,description},
    outcomesHeading,outcomesIntro,"outcomes":outcomes[]{_key,title,description},
    deliverablesHeading,"deliverables":deliverables[]{_key,title,description},
    processIntro,"processSteps":processSteps[]{_key,title,subtitle,description},faqHeading,"faqs":faqs[]{_key,title,description},seo
  }`, { slug });
}

export function getPublishedDesignNews(): Promise<DesignNewsArticle[]> {
  return query(`*[_type == "designNews" && defined(slug.current)] | order(publishedAt desc, title asc){${newsFields}}`);
}

export function getPublishedDesignNewsBySlug(slug: string): Promise<DesignNewsArticle | null> {
  return query(`*[_type == "designNews" && slug.current == $slug][0]{${newsFields},body}`, { slug });
}

const careerFilter = `_type == "careerRole" && status == "open" && defined(title) && defined(slug.current)`;
const careerFields = `_id,title,"slug":slug.current,summary,team,location,workMode,experienceLevel,employmentType,responsibilities,requirements,hiringProcess,applyUrl,isPlaceholder,sortOrder,seo`;

export function getPublishedCareerRoles(): Promise<CareerRole[]> {
  return query(`*[${careerFilter}] | order(sortOrder asc, title asc){${careerFields}}`);
}

export function getPublishedCareerRoleBySlug(slug: string): Promise<CareerRole | null> {
  return query(`*[${careerFilter} && slug.current == $slug][0]{${careerFields}}`, { slug });
}

export function isSafeApplicationUrl(value: string | null | undefined): boolean {
  if (!value) return false;
  try {
    return ["https:", "http:"].includes(new URL(value).protocol);
  } catch {
    return false;
  }
}
