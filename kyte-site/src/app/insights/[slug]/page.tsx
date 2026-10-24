import type { Metadata } from "next";
import { designNewsEntry } from "@/lib/editorial";
import { notFound } from "next/navigation";
import { EditorialArticleTemplate } from "@/components/design-system/EditorialArticleTemplate";

type Props = { params: Promise<{ slug: string }> };
export const instant = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await designNewsEntry(slug);
  return { title: article ? `${article.title} | Design News | Kyte` : "Design News | Kyte", description: article?.summary || undefined };
}

export default async function DesignNewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await designNewsEntry(slug);
  if (!article) notFound();
  return <EditorialArticleTemplate article={article} />;
}
