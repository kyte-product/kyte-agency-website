import {prismField} from './prism-field-data.mjs';
/** One continuous projected field. No palette reset or artificial tonal seam between faces. */
export function continuousPrism(core){
 const pts=Object.values(core.points),xs=pts.map(p=>p[0]),ys=pts.map(p=>p[1]);
 const x=Math.min(...xs),y=Math.min(...ys),w=Math.max(...xs)-x,h=Math.max(...ys)-y;
 const color=(u,v)=>{const c=[0,0,0];prismField.terms.forEach(([i,j],k)=>{for(let ch=0;ch<3;ch++)c[ch]+=Math.pow(u,i)*Math.pow(v,j)*prismField.coefficients[k][ch];});return '#'+c.map(q=>Math.max(0,Math.min(255,Math.round(q))).toString(16).padStart(2,'0')).join('');};
 const cols=24,rows=40,cells=[];
 for(let j=-2;j<rows+2;j++)for(let i=-2;i<cols+2;i++)cells.push(`<rect x="${x+i*w/cols}" y="${y+j*h/rows}" width="${w/cols+.12}" height="${h/rows+.12}" fill="${color((i+.5)/cols,(j+.5)/rows)}"/>`);
 return `<defs><filter id="prism-field-blend" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="${w*.018}"/></filter><filter id="prism-edge-light" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="${w*.014}"/></filter></defs><g clip-path="url(#core-outer)"><g filter="url(#prism-field-blend)">${cells.join('')}</g><path d="${core.silhouette}" fill="none" stroke="white" stroke-width="${w*.07}" stroke-opacity=".58" filter="url(#prism-edge-light)"/></g>`;
}
