import { readdir, readFile } from 'node:fs/promises';
const failures=[];
const branding=file=>file.includes('/branding/')||['src/components/ServiceEditorialClose.css','src/app/branding-marketing-actions.css','src/app/branding-marketing/branding-editorial.css'].includes(file);
async function walk(dir){for(const item of await readdir(dir,{withFileTypes:true})){
 if(item.name==='graveyard')continue;
 const file=`${dir}/${item.name}`;
 if(item.isDirectory()){await walk(file);continue;}
 if(!file.endsWith('.css'))continue;
 const source=await readFile(file,'utf8');
 const retired=/--(?:type-(?:action|subtitle|card(?:-large)?|title|section(?:-large)?|feature|display)|heading-(?:display-large|page-mobile|section-mobile))\b/;
 if(!branding(file)&&!file.endsWith('branding-tokens.css')&&retired.test(source))failures.push(`${file}: retired typography role`);
 if(branding(file)){
  if(/var\(--(?:type-|heading-|color-|page-|section-|body-|lead-|ink\b|muted\b)/.test(source))failures.push(`${file}: Website visual token in Branding`);
 }else if(!file.endsWith('branding-tokens.css')){
  if(/(?<![\w-])font-size\s*:\s*[\d.]+px/.test(source))failures.push(`${file}: literal interface font size`);
  for(const m of source.matchAll(/font-weight\s*:\s*(\d+)\s*(?=[;}])/g))if(!['400','425','450'].includes(m[1]))failures.push(`${file}: unregistered weight ${m[1]}`);
 }
 if(file!=='src/app/globals.css'&&!file.endsWith('branding-tokens.css')&&/#[\da-fA-F]{3,8}\b/.test(source))failures.push(`${file}: unregistered color literal`);
}}
await walk('src');
if(failures.length){console.error(failures.join('\n'));process.exitCode=1;}else console.log('Style contracts passed: registered Website typography/colors and independent Branding tokens.');
