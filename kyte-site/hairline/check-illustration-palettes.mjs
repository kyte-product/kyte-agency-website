/** Prevent ad hoc material colors and missing preset assignments from returning. */
import {readFileSync,readdirSync} from 'node:fs';
import {library,assignments,P,paletteVariables} from './illustration-palettes.mjs';
const here=new URL('.',import.meta.url),errors=[];
for(const [name,p]of Object.entries(library.palettes))for(const [role,hex]of Object.entries(p.colors)){
 if(!/^#[\da-f]{6}$/.test(hex))errors.push(`${name}.${role}: invalid RGB token`);
 const measured='#'+p.samples[role].rgb.map(v=>v.toString(16).padStart(2,'0')).join('');
 if(hex!==measured)errors.push(`${name}.${role}: diverges from recorded sample`);
}
for(const [id,names]of Object.entries(assignments))for(const name of names)if(!P[name])errors.push(`${id}: unknown palette ${name}`);
const chromatic=hex=>{if(hex.length<=5)hex='#'+hex.slice(1,4).split('').map(x=>x+x).join('');const a=hex.slice(1,7).match(/../g).map(x=>parseInt(x,16));return Math.max(...a)-Math.min(...a)>28&&Math.min(...a)<220;};
const vars=new Set(paletteVariables.split(';').map(x=>x.split(':')[0]));
const files=readdirSync(here).filter(n=>/^build-.*\.mjs$/.test(n)||n==='process-develop-gradient-trial.mjs'||/^(product|service)-.*-ui\.html$/.test(n));
files.push('../src/components/ProductDesignIllustrations.tsx','illustration-materials.mjs','prism-continuous-material.mjs','update-material-css.mjs');
for(const file of files){
 let source=readFileSync(new URL(file,here),'utf8');
 source=source.replace(/\/\* Palette tokens start \*\/[\s\S]*?\/\* Palette tokens end \*\//g,'').replace(/\/\*[\s\S]*?\*\//g,'');
 for(const m of source.matchAll(/rgba?\(\s*(\d+),\s*(\d+),\s*(\d+)/g)){const h='#'+m.slice(1,4).map(v=>Number(v).toString(16).padStart(2,'0')).join('');if(chromatic(h))errors.push(`${file}: ad hoc RGB accent ${m[0]}`);}
 for(const hex of new Set(source.match(/#(?:[\da-fA-F]{8}|[\da-fA-F]{6}|[\da-fA-F]{4}|[\da-fA-F]{3})\b/g)||[]))if(chromatic(hex))errors.push(`${file}: ad hoc accent ${hex}`);
 for(const m of source.matchAll(/var\((--art-[\w-]+)\)/g))if(!vars.has(m[1]))errors.push(`${file}: undefined CSS token ${m[1]}`);
}
if(Object.keys(assignments).length!==33)errors.push('Expected all 33 illustration assignments');
if(errors.length){console.error(errors.join('\n'));process.exit(1);}
console.log(`Palette guard passed: ${Object.keys(P).length} measured palettes, ${Object.keys(assignments).length} assignments, ${files.length} sources; no ad hoc accent hexes or undefined CSS tokens.`);
