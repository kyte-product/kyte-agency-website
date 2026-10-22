import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
const root = new URL('../public/hairline/', import.meta.url);
const manifest = JSON.parse(readFileSync(new URL('variant-manifest.json',root),'utf8'));
const hash = text => createHash('sha256').update(text).digest('hex');
const colors = /#[\da-f]{8}\b|#[\da-f]{6}\b|#[\da-f]{3}\b|\brgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+(?:\s*,\s*[\d.]+)?\s*\)/gi;
const structure = text => text.replace(colors,'__COLOR__');
for (const item of manifest.files) {
  const original = readFileSync(new URL(item.file,root),'utf8');
  const brand = readFileSync(new URL('brand/'+item.file,root),'utf8');
  if(hash(original)!==item.originalSha256) throw new Error('Original checksum changed: '+item.file);
  if(hash(brand)!==item.brandSha256) throw new Error('Brand output is stale or edited: '+item.file);
  if(structure(original)!==structure(brand)) throw new Error('Non-color geometry/markup changed: '+item.file);
  const material=brand.replace(/<image\b[^>]*>|data:image\/[^"'\s<>]+/gi,'');
  for(const color of material.match(/#[\da-f]{6}\b/gi)||[]){
    const [r,g,b]=color.slice(1).match(/../g).map(x=>parseInt(x,16));
    if(Math.max(r,g,b)-Math.min(r,g,b)>28 && !(b>=g && g>=r)) throw new Error('Non-blue material remains: '+item.file+' '+color);
  }
}
if(manifest.defaultMode!=='brand' || manifest.anchor!=='#0249d9') throw new Error('Brand default or anchor changed');
console.log(`Variant guard passed: ${manifest.files.length} original checksums, blue checksums and identical non-color geometry/markup.`);
