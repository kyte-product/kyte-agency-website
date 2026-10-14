import { readFile } from "node:fs/promises";
import path from "node:path";
import { fincartProject, fincartWebsiteBrandingProject } from "./fincart";
import {
  getPublishedDesignNews,
  getPublishedDesignNewsBySlug,
  getPublishedWork,
  getPublishedWorkBySlug,
  type DesignNewsArticle,
  type WorkProject,
} from "./sanity";

type PreviewSnapshot = { work: WorkProject[]; news: DesignNewsArticle[] };

async function localPreview(): Promise<PreviewSnapshot | null> {
  if (process.env.NODE_ENV !== "development") return null;
  try {
    const file = path.join(process.cwd(), ".local", "sanity-preview.json");
    return JSON.parse(await readFile(file, "utf8")) as PreviewSnapshot;
  } catch {
    return null;
  }
}

export async function workEntries(): Promise<WorkProject[]> {
  const preview = await localPreview();
  const withFallbacks = (projects: WorkProject[]) => {
    const additions = [fincartProject, fincartWebsiteBrandingProject].filter((fallback) => !projects.some((entry) => entry.slug === fallback.slug));
    return [...additions, ...projects];
  };
  if (preview) return withFallbacks(preview.work);
  try {
    const projects = await getPublishedWork();
    return withFallbacks(projects);
  } catch (error) { console.error("Work content could not load", error); return [fincartProject, fincartWebsiteBrandingProject]; }
}

export async function workEntry(slug: string): Promise<WorkProject | null> {
  const localFallback = slug === fincartProject.slug ? fincartProject : slug === fincartWebsiteBrandingProject.slug ? fincartWebsiteBrandingProject : null;
  const preview = await localPreview();
  if (preview) return preview.work.find((entry) => entry.slug === slug) ?? localFallback;
  try { return await getPublishedWorkBySlug(slug) ?? localFallback; }
  catch (error) { console.error("Work content could not load", error); return localFallback; }
}

export async function designNewsEntries(): Promise<DesignNewsArticle[]> {
  const preview = await localPreview();
  if (preview) return preview.news;
  try { return await getPublishedDesignNews(); } catch (error) { console.error("Design News could not load", error); return []; }
}

export async function designNewsEntry(slug: string): Promise<DesignNewsArticle | null> {
  const preview = await localPreview();
  if (preview) return preview.news.find((entry) => entry.slug === slug) ?? null;
  try { return await getPublishedDesignNewsBySlug(slug); } catch (error) { console.error("Design News could not load", error); return null; }
}
