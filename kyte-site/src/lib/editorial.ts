import { readFile } from "node:fs/promises";
import path from "node:path";
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
  if (preview) return preview.work;
  try { return await getPublishedWork(); } catch (error) { console.error("Work content could not load", error); return []; }
}

export async function workEntry(slug: string): Promise<WorkProject | null> {
  const preview = await localPreview();
  if (preview) return preview.work.find((entry) => entry.slug === slug) ?? null;
  try { return await getPublishedWorkBySlug(slug); } catch (error) { console.error("Work content could not load", error); return null; }
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
