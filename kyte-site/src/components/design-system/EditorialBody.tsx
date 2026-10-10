import type { PortableTextBlock } from "@/lib/sanity";

export function editorialSections(blocks: PortableTextBlock[] | undefined) {
  return (blocks ?? []).flatMap((block) => {
    if (block._type !== "block") return [];
    const title = block.children?.map((child) => child.text).join("").trim() ?? "";
    if (!title || block.style !== "h2") return [];
    return [{ id: `article-section-${block._key}`, title }];
  });
}

export function EditorialBody({ blocks }: { blocks: PortableTextBlock[] | undefined }) {
  if (!blocks?.length) return null;
  const sections = new Set(editorialSections(blocks).map((section) => section.id));

  return <div className="editorial-body">{blocks.map((block) => {
    if (block._type !== "block") return null;
    const text = block.children?.map((child) => child.text).join("") ?? "";
    if (!text.trim()) return null;
    if (sections.has(`article-section-${block._key}`)) return <h2 id={`article-section-${block._key}`} key={block._key}>{text}</h2>;
    if (block.style === "h3") return <h3 key={block._key}>{text}</h3>;
    if (block.style === "blockquote") return <blockquote key={block._key}>{text}</blockquote>;
    return <p key={block._key}>{text}</p>;
  })}</div>;
}
