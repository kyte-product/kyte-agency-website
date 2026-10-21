/** Single palette authority for all generated illustration material. */
import library from '../src/design-tokens/illustration-palettes.json' with {type:'json'};
import assignments from '../src/design-tokens/illustration-palette-assignments.json' with {type:'json'};
export {library,assignments};
export function assignedPalette(id,slot=0){const name=assignments[id]?.[slot];if(!name||!library.palettes[name])throw new Error('Missing palette assignment: '+id+' slot '+slot);return name;}
export const P=Object.fromEntries(Object.entries(library.palettes).map(([name,p])=>[name,Object.freeze(p.colors)]));
const slots={
 greenBlue:['base','green','blueLight','blue','teal','greenDeep'],
 amberGreen:['base','lime','amber','gold','green','light'],
 amberLime:['base','lime','orange','amber','green','light'],
 pinkViolet:['base','coral','pink','rose','violet','light'],
 coralViolet:['base','coral','pink','rose','violet','light'],
 amberViolet:['base','violet','orange','light','amber','coral'],
 mintCyan:['base','mint','blue','cyan','teal','green']
};
export const aliases=Object.freeze({sea:'greenBlue',warm:'amberLime',pink:'pinkViolet',violet:'pinkViolet'});
export function palette(name){const p=P[aliases[name]||name];if(!p)throw new Error('Unknown illustration palette: '+name);return p;}
export const palettes=Object.fromEntries(Object.entries(slots).map(([name,keys])=>[name,keys.map(k=>P[name][k])]));
export const cssPalettes=Object.fromEntries(Object.entries(slots).map(([name,keys])=>[name,keys.map(k=>`var(--art-${name}-${k})`)]));
for(const [alias,name]of Object.entries(aliases)){palettes[alias]=palettes[name];cssPalettes[alias]=cssPalettes[name];}
export const paletteVariables=Object.entries(P).flatMap(([name,colors])=>Object.entries(colors).map(([role,value])=>`--art-${name}-${role}:${value}`)).join(';')+';'+Object.entries(library.uiSignals.colors).map(([role,value])=>`--art-signal-${role}:${value}`).join(';');
