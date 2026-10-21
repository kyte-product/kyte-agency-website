import {continuousPrism} from './prism-continuous-material.mjs';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { parseArgs } from 'node:util';
import vm from 'node:vm';


const here=new URL('.',import.meta.url);
const {values}=parseArgs({options:{hairline:{type:'string'},output:{type:'string'}}});
const hairline=values.hairline?pathToFileURL(resolve(values.hairline)+'/'):new URL('../../.agents/skills/hairline-create/',here);
const outputDirectory=values.output?pathToFileURL(resolve(values.output)+'/'):new URL('../public/hairline/',here);
const {assemble}=await import(new URL('build.mjs',hairline));
const source=readFileSync(new URL('product-complex-system.js',here),'utf8');
const kernel=readFileSync(new URL('kernel.js',hairline),'utf8');
// Run the unchanged Hairline math API without mounting its browser bench.
const context=vm.createContext({hairline(){}});
vm.runInContext(kernel+'\n'+source,context);
const scene=vm.runInContext('makeComplexScene(HL)',context);
const esc=value=>String(value).replaceAll('&','&amp;').replaceAll('"','&quot;');
const path=(d,style,extra='')=>`<path d="${esc(d)}" style="${style}" ${extra}/>`;

const bounds=scene.bounds;
if(bounds.right-bounds.x>340||bounds.bottom-bounds.y>238)throw new Error('Scene exceeds the card framing budget');
const clips=scene.shapes.filter(s=>s.faces).map(s=>`<clipPath id="${s.id}-outer" clipPathUnits="userSpaceOnUse">${path(s.silhouette,'fill:#fff;stroke:none')}</clipPath>`+Object.entries(s.faces).map(([role,d])=>`<clipPath id="${s.id}-${role}" clipPathUnits="userSpaceOnUse">${path(d,'fill:#fff;stroke:none')}</clipPath>`).join('')).join('');
const outer='#a9b0b2',seam='#e5e8e8';
const contour=d=>path(d,`fill:none;stroke:${outer};stroke-width:.93;stroke-linejoin:round;stroke-linecap:round`,'data-contour=""');
function drawSolid(s,structureOnly=false){
  if(!s.faces)return `<g id="${s.id}">${path(s.silhouette,'fill:#fff;stroke:none')}${s.seams.map(d=>path(d,`fill:none;stroke:${seam};stroke-width:.58;stroke-linecap:round`)).join('')}${contour(s.silhouette)}</g>`;
  if(s.id==='core'&&!structureOnly)return `<g id="core">${continuousPrism(s)}${s.seams.map(d=>path(d,'fill:none;stroke:white;stroke-width:.76;stroke-opacity:.42;stroke-linecap:round;stroke-linejoin:round')).join('')}</g>`;
  const facePaint=Object.entries(s.faces).map(([role,d])=>path(d,`fill:${role==='right'?'#f2f4f4':'#fff'};stroke:none`)).join('');
  return `<g id="${s.id}">${path(s.silhouette,'fill:#fff;stroke:none')}<g clip-path="url(#${s.id}-outer)" data-material="${s.id}">${facePaint}</g>${s.seams.map(d=>path(d,`fill:none;stroke:${seam};stroke-width:.57;stroke-linecap:round`)).join('')}${contour(s.silhouette)}</g>`;
}
const floor=`<g mask="url(#floor-fade)"><g transform="translate(${scene.offset})">${scene.ground.tiles.map(d=>path(d,'fill:#eff1f1;stroke:none;opacity:.46')).join('')}${path(scene.ground.lines.join(''),'fill:none;stroke:#e5e8e8;stroke-width:.46;opacity:.62')}</g></g>`;
function svg(structureOnly=false){
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${scene.width} ${scene.height}" role="img" aria-label="A shared colored product core among a white block, sphere, and cone"><defs>${clips}<radialGradient id="floor-opacity" gradientUnits="userSpaceOnUse" cx="200" cy="130" r="195" gradientTransform="translate(200 130) scale(1 .72) translate(-200 -130)"><stop offset="25%" stop-color="#fff"/><stop offset="68%" stop-color="#fff" stop-opacity=".6"/><stop offset="100%" stop-color="#fff" stop-opacity="0"/></radialGradient><mask id="floor-fade" maskUnits="userSpaceOnUse" x="0" y="0" width="400" height="260"><rect width="400" height="260" fill="url(#floor-opacity)"/></mask></defs>${floor}<g transform="translate(${scene.offset})">${scene.shapes.map(s=>drawSolid(s,structureOnly)).join('')}</g></svg>`;
}
const html=markup=>`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Kyte product system illustration</title><style>html,body{margin:0;width:100%;height:100%;overflow:hidden;background:#f8f9f9}body{display:grid;place-items:center}svg{display:block;width:100%;height:100%}</style></head><body>${markup}</body></html>`;
const output=new URL('product-complex-system-embed.html',outputDirectory);
writeFileSync(output,html(svg()));
writeFileSync(new URL('product-complex-system.svg',outputDirectory),svg());
writeFileSync(new URL('product-complex-system-structure.html',outputDirectory),html(svg(true)));
writeFileSync(new URL('hairline-product-complex-system.html',here),assemble(source));
console.log(JSON.stringify({output:fileURLToPath(output),bounds,offset:scene.offset}));
