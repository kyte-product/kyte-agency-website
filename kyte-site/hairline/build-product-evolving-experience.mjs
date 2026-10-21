import {assignedPalette} from './illustration-palettes.mjs';
import {surface} from './illustration-materials.mjs';
import {readFileSync,writeFileSync} from 'node:fs';
import vm from 'node:vm';
import {assemble} from '../../.agents/skills/hairline-create/build.mjs';
const here=new URL('.',import.meta.url),source=readFileSync(new URL('product-evolving-experience.js',here),'utf8');
const kernel=readFileSync(new URL('../../.agents/skills/hairline-create/kernel.js',here),'utf8'),context=vm.createContext({hairline(){}});
vm.runInContext(kernel+'\n'+source,context);
const scene=vm.runInContext('makeEvolutionScene(HL)',context),o=scene.orb;
if(scene.bounds.right-scene.bounds.x>340||scene.bounds.bottom-scene.bounds.y>238)throw new Error('Evolution scene exceeds its card frame');
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('"','&quot;');
const path=(d,style,attrs='')=>`<path d="${esc(d)}" style="${style}" ${attrs}/>`;
const contour=d=>path(d,'fill:none;stroke:#a9b0b2;stroke-width:.93;stroke-linecap:round;stroke-linejoin:round','data-contour=""');
const defs=`<clipPath id="evolution-route"><path d="${scene.track.top}"/></clipPath><clipPath id="evolution-orb"><path d="${o.silhouette}"/></clipPath><filter id="evolution-fields" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="8"/></filter><filter id="evolution-rim" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="1.5"/></filter><filter id="evolution-contact"><feGaussianBlur stdDeviation="2"/></filter><radialGradient id="evolution-floor-opacity" gradientUnits="userSpaceOnUse" cx="200" cy="130" r="195" gradientTransform="translate(200 130) scale(1 .72) translate(-200 -130)"><stop offset="25%" stop-color="#fff"/><stop offset="68%" stop-color="#fff" stop-opacity=".6"/><stop offset="100%" stop-color="#fff" stop-opacity="0"/></radialGradient><mask id="evolution-floor-fade"><rect width="400" height="260" fill="url(#evolution-floor-opacity)"/></mask>`;
const floor=`<g mask="url(#evolution-floor-fade)"><g transform="translate(${scene.offset})">${scene.ground.tiles.map(d=>path(d,'fill:#eff1f1;stroke:none;opacity:.46')).join('')}${path(scene.ground.lines.join(''),'fill:none;stroke:#e5e8e8;stroke-width:.46;opacity:.62')}</g></g>`;

const material=surface({id:'evolution-orb-rich',silhouette:o.silhouette,face:o.silhouette,plane:{p0:[o.center[0]-o.radius,o.center[1]-o.radius],p1:[o.center[0]+o.radius,o.center[1]-o.radius],p3:[o.center[0]-o.radius,o.center[1]+o.radius]},palette:assignedPalette('product-evolving-experience'),volume:true});
// Thin translucent neutral frames, with quiet depth bands and rounded edges.
const portal=p=>`<g data-portal="">${path(p.back,'fill:#fff;fill-opacity:.38;stroke:#e1e4e4;stroke-width:.65;stroke-linejoin:round')}${path(p.cap,'fill:#f4f5f5;fill-opacity:.8;stroke:none')}${path(p.side,'fill:#f0f2f2;fill-opacity:.78;stroke:none')}${path(p.front,'fill:#fff;fill-opacity:.68;stroke:#d9dddd;stroke-width:.8;stroke-linejoin:round')}</g>`;
function svg(structure=false,mask=false){
 const body=mask?path(o.silhouette,'fill:#fff;stroke:none'):
 `${path(scene.track.silhouette,'fill:#eff1f2;stroke:none')}${path(scene.track.top,'fill:#fff;stroke:none')}${contour(scene.track.silhouette)}<g clip-path="url(#evolution-route)"><ellipse cx="${o.contact[0]}" cy="${o.contact[1]}" rx="${o.radius*.67}" ry="${o.radius*.28}" style="fill:#e9e8ec;stroke:none;opacity:.4" filter="url(#evolution-contact)"/></g>${scene.portals.slice(0,2).map(portal).join('')}${structure?path(o.silhouette,'fill:#fff;stroke:none')+contour(o.silhouette):material}${portal(scene.portals[2])}`;
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 260" role="img" aria-label="A pink and violet sphere follows a white route through three translucent rectangular portals"><defs>${defs}</defs>${mask?'<rect width="400" height="260" fill="#000"/>':floor}<g transform="translate(${scene.offset})">${body}</g></svg>`;
}
const html=(content,background='#f8f9f9')=>`<!doctype html><html><head><meta charset="utf-8"><title>Kyte evolving experience illustration</title><style>html,body{margin:0;width:100%;height:100%;overflow:hidden;background:${background}}body{display:grid;place-items:center}svg{display:block;width:100%;height:100%}</style></head><body>${content}</body></html>`;
const out=new URL('../public/hairline/',here);
writeFileSync(new URL('product-evolving-experience.svg',out),svg());
writeFileSync(new URL('product-evolving-experience-embed.html',out),html(svg()));
writeFileSync(new URL('product-evolving-experience-structure.html',out),html(svg(true)));
writeFileSync(new URL('product-evolving-experience-mask.html',here),html(svg(false,true),'#000'));
writeFileSync(new URL('hairline-product-evolving-experience.html',here),assemble(source));
console.log(JSON.stringify({bounds:scene.bounds,offset:scene.offset}));
