import {P} from './illustration-palettes.mjs';
import {readFileSync,writeFileSync} from 'node:fs';
import vm from 'node:vm';
import {assemble} from '../../.agents/skills/hairline-create/build.mjs';
import {__iconData as search} from '../node_modules/lucide-react/dist/esm/icons/search.mjs';
const here=new URL('.',import.meta.url),out=new URL('../public/hairline/',here);
const source=readFileSync(new URL('product-research-audit.js',here),'utf8');
const context=vm.createContext({hairline(){}});
vm.runInContext(readFileSync(new URL('../../.agents/skills/hairline-create/kernel.js',here),'utf8')+'\n'+source,context);
const scene=vm.runInContext('makeResearchScene(HL)',context),core=scene.shapes[1];
if(scene.bounds.right-scene.bounds.x>320||scene.bounds.bottom-scene.bounds.y>238)throw new Error('Research artwork exceeds its frame');
const esc=v=>String(v).replaceAll('&','&amp;').replaceAll('"','&quot;');
const path=(d,style,extra='')=>`<path d="${esc(d)}" style="${style}" ${extra}/>`;
const contour=d=>path(d,'fill:none;stroke:#a9b0b2;stroke-width:1;stroke-linecap:round;stroke-linejoin:round');
const matrix=(p0,p1,p3,w,h)=>[(p1[0]-p0[0])/w,(p1[1]-p0[1])/w,(p3[0]-p0[0])/h,(p3[1]-p0[1])/h,...p0];
const clips=scene.shapes.map(s=>`<clipPath id="${s.id}-clip">${path(s.silhouette,'fill:white')}</clipPath>`+Object.entries(s.faces).map(([k,d])=>`<clipPath id="${s.id}-${k}">${path(d,'fill:white')}</clipPath>`).join('')).join('');
const defs=`${clips}<clipPath id="footprint-clip">${path(scene.footprint,'fill:white')}</clipPath><filter id="field-blend" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="9"/></filter><filter id="edge-wash" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="1.5"/></filter><radialGradient id="floor-opacity" gradientUnits="userSpaceOnUse" cx="200" cy="140" r="194" gradientTransform="translate(200 140) scale(1 .70) translate(-200 -140)"><stop offset="18%" stop-color="white"/><stop offset="64%" stop-color="white" stop-opacity=".55"/><stop offset="100%" stop-color="white" stop-opacity="0"/></radialGradient><mask id="floor-fade"><rect width="400" height="280" fill="url(#floor-opacity)"/></mask>`;
function field(role,base,blobs){
 const p=core.points,[p0,p1,p3]=role==='left'?[p.d,p.c,p.D]:role==='right'?[p.c,p.b,p.C]:[p.a,p.b,p.d];
 return `<g clip-path="url(#finding-${role})">${path(core.faces[role],`fill:${base};stroke:none`)}<g transform="matrix(${matrix(p0,p1,p3,100,100)})"><g filter="url(#field-blend)">${blobs.map(([x,y,rx,ry,c])=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${c}"/>`).join('')}</g></g></g>`;
}
const material=field('left',P.amberGreen.base,[[12,4,65,42,P.amberGreen.gold],[24,72,70,60,P.amberGreen.amber],[100,30,30,80,P.amberGreen.lime]])+field('right',P.amberGreen.olive,[[86,32,63,63,P.amberGreen.green],[14,93,75,50,P.amberGreen.light],[100,100,40,50,P.amberGreen.olive]])+field('top',P.amberGreen.lime,[[16,52,76,64,P.amberGreen.gold],[98,55,54,77,P.amberGreen.olive]]);
const {p0,p1,p3}=scene.iconFrame;
const icon=`<g transform="matrix(${matrix(p0,p1,p3,24,24)})" fill="none" stroke="#fff" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" data-icon="lucide-search">${search.node.map(([tag,attributes])=>`<${tag} ${Object.entries(attributes).filter(([key])=>key!=='key').map(([key,v])=>`${key}="${esc(v)}"`).join(' ')}/>`).join('')}</g>`;
const floor=`<g mask="url(#floor-fade)"><g transform="translate(${scene.offset})">${scene.ground.tiles.map(d=>path(d,'fill:#eff1f1;opacity:.4;stroke:none')).join('')}${path(scene.ground.lines.join(''),'fill:none;stroke:#e5e8e8;stroke-width:.5;opacity:.62')}</g></g>`;
function svg(structure=false,mask=false){
 const base=scene.shapes[0];
 const footprintMatrix=matrix(base.points.a,base.points.b,base.points.d,116,90);
 const footprint=structure?'':`<g clip-path="url(#footprint-clip)" opacity=".50">${path(scene.footprint,"fill:"+P.amberGreen.lime+";stroke:none")}<g transform="matrix(${footprintMatrix})"><g filter="url(#field-blend)"><ellipse cx="42" cy="30" rx="25" ry="28" fill="${P.amberGreen.olive}"/><ellipse cx="74" cy="57" rx="28" ry="25" fill="${P.amberGreen.gold}"/></g></g>${path(scene.footprint,'fill:none;stroke:white;stroke-width:10;stroke-opacity:.85','filter="url(#edge-wash)"')}</g>`;
 const body=mask?path(core.silhouette,'fill:white;stroke:none')+path(scene.footprint,'fill:white;stroke:none'):
 `${path(base.silhouette,'fill:#f0f2f2;stroke:none')}<g clip-path="url(#foundation-clip)">${path(base.faces.left,'fill:#fff;stroke:none')}${path(base.faces.top,'fill:#fff;stroke:none')}${footprint}</g>${contour(base.silhouette)}${path(core.silhouette,'fill:#fff;stroke:none')}<g clip-path="url(#finding-clip)">${structure?Object.entries(core.faces).map(([k,d])=>path(d,`fill:${k==='right'?'#f0f2f2':'#fff'};stroke:none`)).join(''):material+path(core.silhouette,'fill:none;stroke:white;stroke-width:5;stroke-opacity:.40','filter="url(#edge-wash)"')}</g>${core.seams.map(d=>path(d,`fill:none;stroke:${structure?'#e5e8e8':P.amberGreen.lime};stroke-width:.65;stroke-opacity:.7;stroke-linecap:round`)).join('')}${structure?'':icon}${contour(core.silhouette)}`;
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280" role="img" aria-label="A colored insight cube with a search mark floats above a white research platform"><defs>${defs}</defs>${mask?'<rect width="400" height="280" fill="black"/>':floor}<g transform="translate(${scene.offset})">${body}</g></svg>`;
}
const html=(markup,bg='#f8f9f9')=>`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Kyte research and audit illustration</title><style>html,body{margin:0;width:100%;height:100%;background:${bg};overflow:hidden}body{display:grid;place-items:center}svg{display:block;width:100%;height:100%}</style></head><body>${markup}</body></html>`;
writeFileSync(new URL('product-research-audit.svg',out),svg());
writeFileSync(new URL('product-research-audit-embed.html',out),html(svg()));
writeFileSync(new URL('product-research-audit-structure.html',out),html(svg(true)));
writeFileSync(new URL('product-research-audit-mask.html',here),html(svg(false,true),'#000'));
writeFileSync(new URL('hairline-product-research-audit.html',here),assemble(source));
console.log(JSON.stringify({bounds:scene.bounds,offset:scene.offset,icon:search.name}));
