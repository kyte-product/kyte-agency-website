/** Approved color-field material. Paint is always clipped after blur, never outside a solid. */
import {palettes, P} from './illustration-palettes.mjs';
export {palettes};
const shape=(d,attrs)=>`<path d="${d}" ${attrs}/>`;
export function surface({id,silhouette,face,plane,palette='greenBlue',rim,shade=1,volume=false}){
 const c=palettes[palette].map(hex=>shade===1?hex:'#'+hex.slice(1).match(/../g).map(v=>Math.min(255,Math.round(parseInt(v,16)*shade)).toString(16).padStart(2,'0')).join(''));
 const {p0,p1,p3}=plane,m=[(p1[0]-p0[0])/100,(p1[1]-p0[1])/100,(p3[0]-p0[0])/100,(p3[1]-p0[1])/100,...p0];
 const width=rim??Math.max(1.6,Math.min(8,Math.min(Math.hypot(p1[0]-p0[0],p1[1]-p0[1]),Math.hypot(p3[0]-p0[0],p3[1]-p0[1]))*.055));
 const d=face,clip=`${id}-material-face`,solid=`${id}-material-solid`;
 const lobes=[[8,63,38,59],[58,20,45,44],[91,44,35,35],[88,99,48,40],[24,100,29,28]];
 return `<defs><clipPath id="${solid}">${shape(silhouette,'fill="white"')}</clipPath><clipPath id="${clip}">${shape(d,'fill="white"')}</clipPath><filter id="${id}-blend" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="12"/></filter><filter id="${id}-rim" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="${width*.225}"/></filter><radialGradient id="${id}-volume" cx="30%" cy="22%" r="85%"><stop stop-color="white" stop-opacity=".20"/><stop offset=".48" stop-color="white" stop-opacity="0"/><stop offset="1" stop-color="${P.greenBlue.blue}" stop-opacity=".22"/></radialGradient></defs><g clip-path="url(#${solid})"><g clip-path="url(#${clip})">${shape(d,`fill="${c[0]}" stroke="none"`)}<g transform="matrix(${m})"><g filter="url(#${id}-blend)">${lobes.map(([x,y,rx,ry],i)=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${c[i+1]}"/>`).join('')}</g></g>${volume?shape(d,`fill="url(#${id}-volume)"`):''}${width?shape(d,`fill="none" stroke="white" stroke-width="${width}" stroke-opacity=".40" filter="url(#${id}-rim)"`)+shape(d,`fill="none" stroke="white" stroke-width="${width*.2}" stroke-opacity=".32"`):''}</g></g>`;
}
