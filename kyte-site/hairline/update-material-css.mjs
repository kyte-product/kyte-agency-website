/** Regenerate the scoped material rules in flat UI sources before running their builders. */
import {readFileSync,writeFileSync,readdirSync} from 'node:fs';
import {cssPalettes, paletteVariables, assignedPalette} from './illustration-palettes.mjs';
const here=new URL('.',import.meta.url);
export function fieldBackground(name){const c=cssPalettes[name];if(!c)throw new Error('Unknown palette '+name);
 if(name==='warm'||name==='amberLime')return `radial-gradient(ellipse 72% 78% at 24% 38%,${c[2]} 12%,transparent 95%),radial-gradient(ellipse 64% 70% at 91% 78%,${c[4]} 10%,transparent 98%),radial-gradient(ellipse 58% 61% at 58% 8%,${c[3]} 8%,transparent 98%),${c[0]}`;
 if(name==='pink'||name==='pinkViolet')return `radial-gradient(ellipse 72% 70% at 13% 17%,${c[1]} 8%,transparent 98%),radial-gradient(ellipse 67% 74% at 88% 87%,${c[4]} 10%,transparent 98%),radial-gradient(ellipse 57% 67% at 48% 60%,${c[2]} 8%,transparent 98%),${c[0]}`;
 return `radial-gradient(ellipse 48% 55% at 58% 20%,${c[2]} 12%,transparent 93%),radial-gradient(ellipse 48% 48% at 91% 44%,${c[3]} 8%,transparent 96%),radial-gradient(ellipse 55% 51% at 88% 99%,${c[4]} 10%,transparent 96%),radial-gradient(ellipse 45% 45% at 24% 100%,${c[5]} 8%,transparent 96%),radial-gradient(ellipse 48% 73% at 8% 63%,${c[1]} 12%,transparent 96%),${c[0]}`;}

const rim='inset 0 0 18px 3px #ffffff66,inset 0 0 3px 1px #ffffff45';
const paint=(selector,palette)=>`${selector}{background:${fieldBackground(palette)};box-shadow:${rim}}`;
for(const file of readdirSync(here).filter(n=>/^(product|service)-.*-ui\.html$/.test(n))){
 let s=readFileSync(new URL(file,here),'utf8');
 s=s.replace(/\n\/\* Palette tokens start \*\/[\s\S]*?\/\* Palette tokens end \*\/\n/g,'');
 s=s.replace(/\n\/\* Approved material start \*\/[\s\S]*?\/\* Approved material end \*\/\n/g,'');
 const root=s.match(/\.([\w-]+-face),\.[\w-]+-face \*/)?.[1];let css='';
 if(root){
  const q='.'+root,select=q+' .field:not(.brand-plane)';
  css+=paint(select,assignedPalette(file.replace('-ui.html','')));
  css+=paint(q+' .field.warm:not(.brand-plane)','warm')+paint(q+' .field.pink:not(.brand-plane)','pink')+paint(q+' .field.violet:not(.brand-plane)','violet');
  // Old blurred paint only. Content and native icons remain above the material.
  css+=`${q} .field:not(.brand-plane):before{display:none}${q} .field:not(.brand-plane)>.colors{display:none}${q} .field:not(.brand-plane):after{background:none;box-shadow:${rim}}`;
  if(file==='product-mobile-app-ui.html')css+=paint(q+'.interaction','pink')+`${q}.interaction>.colors{display:none}${q}.interaction:after{background:none;box-shadow:${rim}}`;
 }else if(file==='product-experience-ui.html'){
  css+=paint('.face .screen-panel','sea')+paint('.face .gradient-media','warm')+paint('.face .gradient-search','pink')+paint('.face .mail-disc','pink')+paint('.face .chart-bar','pink');
  css+=`.face .screen-panel:after,.face .gradient-media:after,.face .gradient-search:after{background:none;box-shadow:${rim}}`;
  css+=`.face .pie{background:radial-gradient(circle at 24% 15%,#ffffff24,transparent 60%),conic-gradient(from -90deg,${cssPalettes.pinkViolet[4]} 0deg,${cssPalettes.pinkViolet[2]} 55deg,${cssPalettes.amberLime[2]} 120deg,${cssPalettes.pinkViolet[4]} 120deg,${cssPalettes.pinkViolet[2]} 175deg,${cssPalettes.amberLime[2]} 240deg,${cssPalettes.pinkViolet[4]} 240deg,${cssPalettes.pinkViolet[2]} 295deg,${cssPalettes.amberLime[2]} 360deg);box-shadow:${rim}}`;
 }else if(file==='product-dashboard-laptop-ui.html'){
  css+=paint('.face .analytics','pink')+`.face .panel.analytics:after{background:none;box-shadow:${rim}}.face .pie{background:radial-gradient(circle at 22% 15%,#ffffff30,transparent 65%),conic-gradient(from -90deg,${cssPalettes.mintCyan[1]} 0 31%,#fff 31% 33%,${cssPalettes.mintCyan[4]} 33% 64%,#fff 64% 66%,${cssPalettes.mintCyan[2]} 66% 98%,#fff 98%);box-shadow:${rim}}`;
 }
 if(!css)throw new Error('Unmapped material source: '+file);
 s=s.replace('</style>',`\n/* Palette tokens start */\n.${root||'face'}{${paletteVariables}}\n/* Palette tokens end */\n</style>`);
 s=s.replace('</style>',`\n/* Approved material start */\n${css}\n/* Approved material end */\n</style>`);
 writeFileSync(new URL(file,here),s);
 console.log(file);
}
