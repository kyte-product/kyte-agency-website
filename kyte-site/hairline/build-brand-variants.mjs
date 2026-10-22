/** Additive material variants. Never write to the original artwork or its palette library. */
import { readFileSync, readdirSync, mkdirSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import brand from '../src/design-tokens/illustration-brand.json' with { type: 'json' };
import original from '../src/design-tokens/illustration-palettes.json' with { type: 'json' };
const root = new URL('../public/hairline/', import.meta.url);
const out = new URL('brand/', root);
const hash = value => createHash('sha256').update(value).digest('hex');
const rgb = hex => hex.slice(1).match(/../g).map(x => parseInt(x, 16));
const tones = brand.tones.map(rgb);
export function brandColor(value) {
  const hex = value.length === 4 ? '#' + value.slice(1).split('').map(x=>x+x).join('') : value;
  const channels = rgb(hex.slice(0, 7));
  if (Math.max(...channels) - Math.min(...channels) <= brand.preserveNeutralThreshold) return value;
  const linear = channels.map(v => { const x = v / 255; return x <= .04045 ? x / 12.92 : ((x + .055) / 1.055) ** 2.4; });
  const light = linear[0] * .2126 + linear[1] * .7152 + linear[2] * .0722;
  let slot = brand.tonePositions.findIndex(x => x >= light);
  if (slot <= 0) slot = 1;
  const amount = Math.min(1, Math.max(0, (light - brand.tonePositions[slot-1]) / (brand.tonePositions[slot] - brand.tonePositions[slot-1])));
  return '#' + tones[slot-1].map((v,i) => Math.round(v + (tones[slot][i]-v)*amount).toString(16).padStart(2,'0')).join('') + hex.slice(7);
}
const hexPattern = /#[\da-f]{8}\b|#[\da-f]{6}\b|#[\da-f]{3}\b/gi;
const rgbPattern = /\brgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(\s*,\s*[\d.]+)?\s*\)/gi;
function recolor(source) {
  // Embedded official logo/image payloads retain their original content.
  const images = [];
  let text = source.replace(/<image\b[^>]*>|data:image\/[^"'\s<>]+/gi, match => { images.push(match); return `__KYTE_IMAGE_${images.length-1}__`; });
  text = text.replace(hexPattern, brandColor).replace(rgbPattern, (match,r,g,b,alpha='') => {
    const mapped = brandColor('#' + [r,g,b].map(v=>Number(v).toString(16).padStart(2,'0')).join(''));
    return `${alpha ? 'rgba' : 'rgb'}(${rgb(mapped).join(',')}${alpha})`;
  });
  return text.replace(/__KYTE_IMAGE_(\d+)__/g, (_,i)=>images[Number(i)]);
}
mkdirSync(out, { recursive:true });
const files = readdirSync(root).filter(name => /^(product-|service-|process-).*(\.svg|-embed\.html)$/.test(name) && !/before|trial|mask|structure|check/.test(name)).sort();
const records = files.map(name => {
  const before = readFileSync(new URL(name,root),'utf8');
  const after = recolor(before);
  const target = new URL(name,out);
  writeFileSync(target,after);
  if (readFileSync(new URL(name,root),'utf8') !== before) throw new Error('Original changed: '+name);
  return {file:name,originalSha256:hash(before),brandSha256:hash(after),original:'/hairline/'+name,brand:'/hairline/brand/'+name};
});
writeFileSync(new URL('illustration-brand-palettes.json',new URL('../src/design-tokens/',import.meta.url)),JSON.stringify(Object.fromEntries(Object.entries(original.palettes).map(([name,p])=>[name,Object.fromEntries(Object.entries(p.colors).map(([role,value])=>[role,brandColor(value)]))])),null,2)+'\n');
writeFileSync(new URL('variant-manifest.json',root),JSON.stringify({version:1,defaultMode:'brand',anchor:brand.anchor,files:records},null,2)+'\n');
console.log(`Built ${records.length} separate brand-blue assets. All original SHA-256 checksums retained. Output: ${fileURLToPath(out)}`);
