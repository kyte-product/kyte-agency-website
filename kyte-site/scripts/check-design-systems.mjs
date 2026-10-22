import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
const root = new URL('../',import.meta.url);
for(const name of ['website','branding','product']) {
  const doc = new URL(`docs/design-systems/${name}.md`,root);
  if(!existsSync(doc)) throw new Error('Missing system document: '+name);
}
for(const file of ['src/app/design-system/page.tsx','src/app/design-system/branding/page.tsx','src/app/design-system/product/page.tsx','src/data/designSystems.ts']) if(!existsSync(new URL(file,root)))throw new Error('Missing system entry: '+file);
const registry=readFileSync(new URL('src/data/designSystems.ts',root),'utf8');
if((registry.match(/id: "/g)||[]).length!==3)throw new Error('Expected three systems');
const currentDocs=['docs/README.md','docs/template-system.md','docs/design-systems/README.md','docs/design-systems/website.md','docs/design-systems/branding.md','docs/design-systems/product.md','docs/content-population.md'];
for(const file of currentDocs){
 const source=readFileSync(new URL(file,root),'utf8');
 for(const [,link] of source.matchAll(/\]\(([^)]+)\)/g)){
  if(/^(https?:|#|\/)/.test(link))continue;
  const path=link.split('#')[0];
  if(!existsSync(resolve(new URL('.',new URL(file,root)).pathname,path)))throw new Error(`${file}: broken relative link ${link}`);
 }
}
console.log('Design-system guard passed: three registered systems, page entries and current documentation links.');
