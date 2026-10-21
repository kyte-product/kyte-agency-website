import {readFileSync,writeFileSync} from 'node:fs';
import vm from 'node:vm';
import {assemble} from '../../.agents/skills/hairline-create/build.mjs';
import {__iconData as chart} from '../node_modules/lucide-react/dist/esm/icons/chart-no-axes-combined.mjs';
import {__iconData as inbox} from '../node_modules/lucide-react/dist/esm/icons/inbox.mjs';
import {__iconData as branch} from '../node_modules/lucide-react/dist/esm/icons/git-branch.mjs';
import {__iconData as check} from '../node_modules/lucide-react/dist/esm/icons/check.mjs';
import {__iconData as task} from '../node_modules/lucide-react/dist/esm/icons/list-checks.mjs';
const here=new URL('.',import.meta.url),out=new URL('../public/hairline/',here),source=readFileSync(new URL('product-workflow-hub.js',here),'utf8');
const context=vm.createContext({hairline(){}});vm.runInContext(readFileSync(new URL('../../.agents/skills/hairline-create/kernel.js',here),'utf8')+'\n'+source,context);
const scene=vm.runInContext('makeWorkflowHubScene(HL)',context);
if(scene.bounds.right-scene.bounds.x>340||scene.bounds.bottom-scene.bounds.y>238)throw new Error('Workflow scene exceeds its frame');
const esc=v=>String(v).replaceAll('&','&amp;').replaceAll('"','&quot;');
const path=(d,style)=>`<path d="${esc(d)}" style="${style}"/>`;
const native=data=>`<svg xmlns="http://www.w3.org/2000/svg" class="native" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${data.node.map(([tag,attrs])=>`<${tag} ${Object.entries(attrs).filter(([k])=>k!=='key').map(([k,v])=>`${k}="${esc(v)}"`).join(' ')}/>`).join('')}</svg>`;
let flat=readFileSync(new URL('product-workflow-hub-ui.html',here),'utf8');for(const [key,data]of Object.entries({CHART:chart,INBOX:inbox,BRANCH:branch,CHECK:check,TASK:task}))flat=flat.replaceAll('{{'+key+'}}',native(data));const css=flat.match(/<style>([\s\S]*?)<\/style>/)[1];
const templates=Object.fromEntries([...flat.matchAll(/<template id="([^"]+)">([\s\S]*?)<\/template>/g)].map(([,id,markup])=>[id,markup]));
const maskCss='.workflow-face.mask{background:#000!important}.workflow-face.mask *{visibility:hidden!important}.workflow-face.mask [data-color-zone]{visibility:visible!important;background:#fff!important;box-shadow:none!important}.workflow-face.mask .field:after{display:none!important}';
function face(s,mask){
 const {p0,p1,p3,width:w,height:h}=s.plane,matrix=[(p1[0]-p0[0])/w,(p1[1]-p0[1])/w,(p3[0]-p0[0])/h,(p3[1]-p0[1])/h,...p0];
 const markup=templates[s.id].replace('class="workflow-face"',`xmlns="http://www.w3.org/1999/xhtml" class="workflow-face${mask?' mask':''}" style="width:${w}px;height:${h}px"`);
 return `<g clip-path="url(#${s.id}-face)"><foreignObject width="${w}" height="${h}" transform="matrix(${matrix})"><div xmlns="http://www.w3.org/1999/xhtml"><style>${css}${mask?maskCss:''}</style>${markup}</div></foreignObject></g>`;
}
const defs=scene.surfaces.map(s=>`<clipPath id="${s.id}-face">${path(s.face,'fill:white')}</clipPath>`).join('')+'<radialGradient id="workflow-floor-opacity" gradientUnits="userSpaceOnUse" cx="200" cy="140" r="194" gradientTransform="translate(200 140) scale(1 .70) translate(-200 -140)"><stop offset="18%" stop-color="white"/><stop offset="64%" stop-color="white" stop-opacity=".55"/><stop offset="100%" stop-color="white" stop-opacity="0"/></radialGradient><mask id="workflow-floor-fade"><rect width="400" height="280" fill="url(#workflow-floor-opacity)"/></mask>';
const floor=`<g mask="url(#workflow-floor-fade)"><g transform="translate(${scene.offset})">${scene.ground.tiles.map(d=>path(d,'fill:#eff1f1;opacity:.4;stroke:none')).join('')}${path(scene.ground.lines.join(''),'fill:none;stroke:#e5e8e8;stroke-width:.5;opacity:.62')}</g></g>`;
const contour=d=>path(d,'fill:none;stroke:#a9b0b2;stroke-width:1;stroke-linejoin:round;stroke-linecap:round');
const foundation=mask=>[...scene.routes,scene.base].map(s=>path(s.silhouette,`fill:${mask?'black':'#f0f2f2'};stroke:none`)+path(s.face,`fill:${mask?'black':'white'};stroke:none`)+(mask?'':contour(s.silhouette))).join('')+(mask?'':path(scene.routeLines.join(''),'fill:none;stroke:#e1e7e5;stroke-width:.75;stroke-linecap:round'));
function svg(structure=false,mask=false){return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280" role="img" aria-label="A circular dashboard console connects intake, routing and completion modules with raised paths"><defs>${defs}</defs>${mask?'<rect width="400" height="280" fill="black"/>':floor}<g transform="translate(${scene.offset})">${foundation(mask)}${scene.surfaces.map(s=>`${path(s.silhouette,`fill:${mask?'black':'#f0f2f2'};stroke:none`)}${path(s.face,`fill:${mask?'black':'white'};stroke:none`)}${structure?'':face(s,mask)}${mask?'':path(s.silhouette,'fill:none;stroke:#a9b0b2;stroke-width:1;stroke-linejoin:round;stroke-linecap:round')}`).join('')}</g></svg>`;}
const html=(markup,bg='#f8f9f9')=>`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Kyte dashboards and complex workflows illustration</title><style>html,body{margin:0;width:100%;height:100%;overflow:hidden;background:${bg}}body{display:grid;place-items:center}body>svg{display:block;width:100%;height:100%}</style></head><body>${markup}</body></html>`;
writeFileSync(new URL('product-workflow-hub.svg',out),svg());
writeFileSync(new URL('product-workflow-hub-embed.html',out),html(svg()));
writeFileSync(new URL('product-workflow-hub-structure.html',out),html(svg(true)));
writeFileSync(new URL('product-workflow-hub-ui.html',out),flat);
writeFileSync(new URL('product-workflow-hub-mask.html',here),html(svg(false,true),'black'));
writeFileSync(new URL('hairline-product-workflow-hub.html',here),assemble(source));
console.log(JSON.stringify({bounds:scene.bounds,offset:scene.offset}));
