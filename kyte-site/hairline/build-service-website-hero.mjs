import {readFileSync,writeFileSync} from 'node:fs';
import vm from 'node:vm';
import {assemble} from '../../.agents/skills/hairline-create/build.mjs';
import {__iconData as code} from '../node_modules/lucide-react/dist/esm/icons/check.mjs';
import {__iconData as user} from '../node_modules/lucide-react/dist/esm/icons/image.mjs';
import {__iconData as dev} from '../node_modules/lucide-react/dist/esm/icons/code-xml.mjs';
import {__iconData as globe} from '../node_modules/lucide-react/dist/esm/icons/globe.mjs';
import {__iconData as arrow} from '../node_modules/lucide-react/dist/esm/icons/arrow-right.mjs';
import {__iconData as link} from '../node_modules/lucide-react/dist/esm/icons/link-2.mjs';
import {__iconData as layout} from '../node_modules/lucide-react/dist/esm/icons/panels-top-left.mjs';
const here=new URL('.',import.meta.url),out=new URL('../public/hairline/',here),source=readFileSync(new URL('service-website-hero.js',here),'utf8');
const context=vm.createContext({hairline(){}});vm.runInContext(readFileSync(new URL('../../.agents/skills/hairline-create/kernel.js',here),'utf8')+'\n'+source,context);
const scene=vm.runInContext('makeWebsiteHeroScene(HL)',context);
if(scene.bounds.right-scene.bounds.x>840||scene.bounds.bottom-scene.bounds.y>490)throw new Error('Website hero exceeds its frame');
const esc=v=>String(v).replaceAll('&','&amp;').replaceAll('"','&quot;');
const path=(d,style)=>`<path d="${esc(d)}" style="${style}"/>`;
const native=data=>`<svg xmlns="http://www.w3.org/2000/svg" class="native" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${data.node.map(([tag,attrs])=>`<${tag} ${Object.entries(attrs).filter(([k])=>k!=='key').map(([k,v])=>`${k}="${esc(v)}"`).join(' ')}/>`).join('')}</svg>`;
const brandLogo=name=>readFileSync(new URL('../public/tool-logos/'+name+'.svg',here),'utf8').replace(/<svg\b/, '<svg class="native brand-logo"');
let flat=readFileSync(new URL('service-website-hero-ui.html',here),'utf8');for(const [key,data]of Object.entries({CHECK:code,IMAGE:user,CODE:dev,GLOBE:globe,ARROW:arrow,LINK:link,LAYOUT:layout}))flat=flat.replaceAll('{{'+key+'}}',native(data));for(const [key,name] of Object.entries({"FRAMER": "framer", "WEBFLOW": "webflow-color", "WORDPRESS": "wordpress-color", "SANITY": "sanity-color"})) flat=flat.replaceAll('{{'+key+'}}',brandLogo(name));const css=flat.match(/<style>([\s\S]*?)<\/style>/)[1].slice(flat.match(/<style>([\s\S]*?)<\/style>/)[1].indexOf('.website-face,.website-face *'));
const templates=Object.fromEntries([...flat.matchAll(/<template id="([^"]+)">([\s\S]*?)<\/template>/g)].map(([,id,markup])=>[id,markup]));
const maskCss='.website-face.mask{background:#000!important}.website-face.mask *{visibility:hidden!important}.website-face.mask [data-color-zone]{visibility:visible!important;background:#fff!important;box-shadow:none!important}.website-face.mask .field:after{display:none!important}';
function face(s,mask,top=false){
 const id=top?s.id+'-top':s.id;
 const {p0,p1,p3,width:w,height:h}=top?s.topPlane:s.plane,matrix=[(p1[0]-p0[0])/w,(p1[1]-p0[1])/w,(p3[0]-p0[0])/h,(p3[1]-p0[1])/h,...p0];
 const markup=templates[id].replace('class="website-face"',`xmlns="http://www.w3.org/1999/xhtml" class="website-face${mask?' mask':''}" style="width:${w}px;height:${h}px"`);
 return `<g clip-path="url(#${id}-face)"><foreignObject width="${w}" height="${h}" transform="matrix(${matrix})"><div xmlns="http://www.w3.org/1999/xhtml"><style>${css}${mask?maskCss:''}</style>${markup}</div></foreignObject></g>`;
}
const defs=scene.parts.map(s=>`<clipPath id="${s.id}-solid">${path(s.silhouette,'fill:white')}</clipPath><clipPath id="${s.id}-face">${path(s.face,'fill:white')}</clipPath>${s.topPlane?`<clipPath id="${s.id}-top-face">${path(s.top,'fill:white')}</clipPath>`:''}`).join('')+'<radialGradient id="website-floor-opacity" gradientUnits="userSpaceOnUse" cx="480" cy="280" r="450" gradientTransform="translate(480 280) scale(1 .65) translate(-480 -280)"><stop offset="18%" stop-color="white"/><stop offset="64%" stop-color="white" stop-opacity=".55"/><stop offset="100%" stop-color="white" stop-opacity="0"/></radialGradient><mask id="website-floor-fade"><rect width="960" height="560" fill="url(#website-floor-opacity)"/></mask>';
const floor=`<g mask="url(#website-floor-fade)"><g transform="translate(${scene.offset})">${scene.ground.tiles.map(d=>path(d,'fill:#eff1f1;opacity:.4;stroke:none')).join('')}${path(scene.ground.lines.join(''),'fill:none;stroke:#e5e8e8;stroke-width:.5;opacity:.62')}</g></g>`;
const contour=d=>path(d,'fill:none;stroke:#a9b0b2;stroke-width:1.25;stroke-linejoin:round;stroke-linecap:round');
function svg(structure=false,mask=false){return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 560" role="img" aria-label="Large content and development structures connected to a website and publishing hub"><defs>${defs}</defs>${mask?'<rect width="960" height="560" fill="black"/>':floor}<g transform="translate(${scene.offset})">${scene.parts.map(s=>`${path(s.silhouette,`fill:${mask?'black':'#f0f2f2'};stroke:none`)}<g clip-path="url(#${s.id}-solid)">${s.top?path(s.top,`fill:${mask?'black':'white'};stroke:none`):''}${path(s.face,`fill:${mask?'black':'white'};stroke:none`)}${structure||!s.plane?'':face(s,mask)}${structure||!s.topPlane?'':face(s,mask,true)}${s.seam&&!mask?path(s.seam,'fill:none;stroke:#e0e4e5;stroke-width:.8;stroke-linecap:round'):''}</g>${mask?'':contour(s.silhouette)}`).join('')}</g></svg>`;}
const html=(markup,bg='#f8f9f9')=>`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Kyte website design and development hero</title><style>html,body{margin:0;width:100%;height:100%;overflow:hidden;background:${bg}}body{display:grid;place-items:center}body>svg{display:block;width:100%;height:100%}</style></head><body>${markup}</body></html>`;
writeFileSync(new URL('service-website-hero.svg',out),svg());
writeFileSync(new URL('service-website-hero-embed.html',out),html(svg()));
writeFileSync(new URL('service-website-hero-structure.html',out),html(svg(true)));
writeFileSync(new URL('service-website-hero-ui.html',out),flat);
writeFileSync(new URL('service-website-hero-mask.html',here),html(svg(false,true),'black'));
writeFileSync(new URL('hairline-service-website-hero.html',here),assemble(source));
console.log(JSON.stringify({bounds:scene.bounds,offset:scene.offset}));
