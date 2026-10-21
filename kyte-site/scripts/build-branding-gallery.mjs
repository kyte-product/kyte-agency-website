import sharp from "sharp";
import { readFile, mkdir } from "node:fs/promises";

const source = await readFile(new URL("../src/components/branding-hero/gallery-data.ts", import.meta.url), "utf8");
const entries = [...source.matchAll(/src: "([^"]+)", preview: "([^"]+)".*?aspect: ([\d.]+)/g)];
if (!entries.length) throw new Error("No gallery texture definitions found.");
const publicRoot = new URL("../public/", import.meta.url);
await mkdir(new URL("branding-gallery/", publicRoot), { recursive: true });
await Promise.all(entries.map(async ([, src, preview, aspect]) => {
  const height = 760;
  await sharp(new URL(src.slice(1), publicRoot).pathname)
    .resize(Math.round(height * Number(aspect)), height, { fit: "cover", position: "attention" })
    .webp({ quality: 82 })
    .toFile(new URL(preview.slice(1), publicRoot).pathname);
}));
console.log(`Prepared ${entries.length} local gallery textures.`);
