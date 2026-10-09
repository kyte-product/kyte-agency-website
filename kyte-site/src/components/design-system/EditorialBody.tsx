import type { PortableTextBlock } from "@/lib/sanity";

export function EditorialBody({ blocks }: { blocks: PortableTextBlock[] | undefined }) {
  if (!blocks?.length) return null;

  return <div className="editorial-body">{blocks.map((block) => {
    if (block._type !== "block") return null;
    const text = block.children?.map((child) => child.text).join("") ?? "";
    if (!text.trim()) return null;
    if (block.style === "h2") return <h2 key={block._key}>{text}</h2>;
    if (block.style === "h3") return <h3 key={block._key}>{text}</h3>;
    if (block.style === "blockquote") return <blockquote key={block._key}>{text}</blockquote>;
    return <p key={block._key}>{text}</p>;
  })}</div>;
}
