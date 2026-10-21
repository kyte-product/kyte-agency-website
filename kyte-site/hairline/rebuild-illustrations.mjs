/** Rebuild all illustration outputs from the canonical palette data and existing geometry. */
import {readdirSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const here=new URL('.',import.meta.url);
function run(file){const r=spawnSync(process.execPath,[fileURLToPath(new URL(file,here))],{stdio:'inherit'});if(r.status!==0)process.exit(r.status||1);}
run('update-material-css.mjs');
for(const file of readdirSync(here).filter(n=>/^build-.*\.mjs$/.test(n)&&n!=='build-process-stage.mjs').sort())run(file);
run('check-illustration-palettes.mjs');
