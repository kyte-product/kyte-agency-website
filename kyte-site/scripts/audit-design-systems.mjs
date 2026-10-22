import {mkdir,writeFile,readFile} from 'node:fs/promises';
import {auditBrowser,sleep} from './lib/audit-browser.mjs';
const base=(process.argv[2]||'http://127.0.0.1:3003').replace(/\/$/,'');
const out=process.argv[3]||'/private/tmp/kyte-design-system-audit';
await mkdir(out,{recursive:true});
const browser=await auditBrowser();const {send,evaluate:js,viewport,navigate,events}=browser;
const checks=[];const record=(name,data,pass)=>{checks.push({name,pass,...data});if(!pass)console.log('FAIL',name,JSON.stringify(data));};
const screenshot=async name=>{const r=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});await writeFile(`${out}/${name}.png`,Buffer.from(r.data,'base64'));};
const click=async selector=>js(`document.querySelector(${JSON.stringify(selector)})?.click()`);
try{
 await send('Page.addScriptToEvaluateOnNewDocument',{source:`window.__audit={lcp:0,cls:0,longTasks:0};try{new PerformanceObserver(l=>{for(const e of l.getEntries())window.__audit.lcp=e.startTime}).observe({type:'largest-contentful-paint',buffered:true});new PerformanceObserver(l=>{for(const e of l.getEntries())if(!e.hadRecentInput)window.__audit.cls+=e.value}).observe({type:'layout-shift',buffered:true});new PerformanceObserver(l=>{window.__audit.longTasks+=l.getEntries().length}).observe({type:'longtask',buffered:true})}catch{}`});
 for(const width of [393,1440]){
  await viewport(width);
  for(const route of ['/design-system','/design-system/branding','/design-system/product']){
   await navigate(base+route);await click('.cookie-notice__accept');let data=await js(`(()=>{const m=document.querySelector('main');return {h1:m.querySelectorAll('h1').length,tabs:m.querySelectorAll('.ds-nav a').length,pressed:m.querySelector('.ds-palette-toggle button[aria-pressed=true]')?.textContent,art:[...m.querySelectorAll('.ds-art img,.ds-art iframe')].map(e=>e.getAttribute('src')),pageWidth:document.documentElement.scrollWidth,figures:m.querySelectorAll('.ds-gallery figure').length}})()`);
   record(`DS default ${width} ${route}`,data,data.h1===1&&data.tabs===3&&data.pressed==='Brand blue'&&data.art.every(x=>x.includes('/hairline/brand/'))&&data.pageWidth===width);
   await click('.ds-palette-toggle button:last-child');await sleep(250);
   data=await js(`({pressed:document.querySelector('.ds-palette-toggle button[aria-pressed=true]')?.textContent,original:[...document.querySelectorAll('.ds-art img,.ds-art iframe')].every(e=>!e.getAttribute('src').includes('/brand/'))})`);
   record(`DS original ${width} ${route}`,data,data.pressed==='Original color'&&data.original);
   if(route==='/design-system/product'){
    await js(`document.querySelector('#illustration-library').scrollIntoView({block:'start'})`);await sleep(500);await screenshot(`product-system-original-${width}`);
    await click('.ds-palette-toggle button:first-child');await sleep(400);await screenshot(`product-system-brand-${width}`);
    if(width===1440){
     await click('.ds-palette-toggle button:last-child');await sleep(150);
     await click('.ds-header a[href="/ui-ux-design-development"]');await sleep(2200);
     data=await js(`({route:location.pathname,system:document.documentElement.dataset.designSystem,hero:document.querySelector('.product-landing__art-embed')?.getAttribute('src')})`);
     record('Palette follows client navigation',data,data.route==='/ui-ux-design-development'&&data.system==='product'&&!data.hero.includes('/brand/'));
     await navigate(base+'/ui-ux-design-development');data=await js(`({hero:document.querySelector('.product-landing__art-embed')?.getAttribute('src')})`);record('Full reload defaults to brand',data,data.hero.includes('/brand/'));
    }
   }
  }
 }
 const http=JSON.parse(await readFile('/private/tmp/kyte-content-ready-http.json','utf8'));
 const services=http.routes.map(x=>x.path).filter(x=>/^\/(branding-marketing|ui-ux-design-development)\/[^/]+$/.test(x));
 for(const width of [393,810,1440]){
  await viewport(width);
  for(const route of services){
   await navigate(base+route);
   let data=await js(`(()=>{const s=document.querySelector('.service-process'),r=s?.querySelector('.service-process__rail'),cards=[...s.querySelectorAll('.service-process__step')];return {count:cards.length,pageWidth:document.documentElement.scrollWidth,labels:cards.map(e=>e.querySelector('.service-process__step-name').textContent),palette:cards.map(e=>getComputedStyle(e).backgroundColor),railWidth:r.clientWidth,scrollWidth:r.scrollWidth}})()`);
   record(`Service structure ${width} ${route}`,data,data.count===4&&data.pageWidth===width);
   for(let i=0;i<5;i++){await click(`#service-decision-tab-${i}`);await sleep(140);const selected=await js(`document.querySelector('#service-decision-tab-${i}')?.getAttribute('aria-expanded')`);record(`Outcome ${width} ${route} ${i}`,{selected},selected==='true');}
   if(width>780){
    for(let i=0;i<4;i++){
     await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:10,y:10});await sleep(60);
     const before=await js(`(()=>{const s=document.querySelector('.service-process'),r=s.querySelector('.service-process__rail'),b=s.querySelectorAll('.service-process__step')[${i}];r.scrollLeft=0;window.scrollTo({top:b.getBoundingClientRect().top+scrollY-260,behavior:'instant'});const a=b.getBoundingClientRect();return {x:Math.min(innerWidth-30,a.x+a.width/2),y:a.y+32,scroll:r.scrollLeft,width:r.scrollWidth,sectionHeight:s.getBoundingClientRect().height}})()`);
     await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:before.x,y:before.y});await sleep(700);
     data=await js(`(()=>{const s=document.querySelector('.service-process'),r=s.querySelector('.service-process__rail'),b=s.querySelector('.service-process__step.is-active');return {index:s.style.getPropertyValue('--active-step-index'),active:!!b,height:b?.getBoundingClientRect().height,railHeight:r.clientHeight,scrollHeight:r.scrollHeight,scroll:r.scrollLeft,width:r.scrollWidth,sectionHeight:s.getBoundingClientRect().height,pattern:b?.querySelector('.dot-pattern')?.className.baseVal,copyFits:!b||b.querySelector('.service-process__step-copy').getBoundingClientRect().bottom<=b.querySelector('.service-process__step-details').getBoundingClientRect().bottom+1}})()`);
     record(`Process hover ${route} ${i}`,data,data.active&&Number(data.index)===i&&data.height>=359&&data.scrollHeight<=data.railHeight+1&&data.scroll===before.scroll&&data.width===before.width&&data.copyFits&&Math.abs(data.sectionHeight-before.sectionHeight)<2);
     if(route.endsWith('social-media-marketing')&&i===2)await screenshot('process-create-hover');
    }
    await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:10,y:10});await sleep(700);
    data=await js(`(()=>{const s=document.querySelector('.service-process'),r=s.querySelector('.service-process__rail'),cs=[...s.querySelectorAll('.service-process__step')];r.scrollLeft=0;const first=cs[0].getBoundingClientRect(),head=s.querySelector('h2').getBoundingClientRect();r.scrollLeft=r.scrollWidth;const last=cs.at(-1).getBoundingClientRect();return {firstInset:first.left,headingInset:head.left,lastInset:innerWidth-last.right,gaps:cs.slice(1).map((c,i)=>c.getBoundingClientRect().top-cs[i].getBoundingClientRect().bottom)}})()`);
    record(`Process rail insets ${route}`,data,Math.abs(data.firstInset-data.headingInset)<2&&Math.abs(data.firstInset-data.lastInset)<2&&data.gaps.every(g=>g>=0));
   }else{
    await click('.service-process__step:nth-child(3)');await sleep(700);data=await js(`(()=>{const r=document.querySelector('.service-process__rail');return {active:document.querySelectorAll('.service-process__step.is-active').length,height:r.clientHeight,scrollHeight:r.scrollHeight,overflow:getComputedStyle(r).overflowY}})()`);record(`Mobile process ${route}`,data,data.active===1&&data.overflow==='visible');
   }
  }
  console.log('Finished service interactions',width);
 }
 await viewport(1440,760);await navigate(base+'/insights/the-menu-is-the-message');
 let data=await js(`(()=>{const a=document.querySelector('.editorial-detail__topics'),n=a?.querySelector('nav'),o=n?.querySelector('ol');return {asideOverflow:a&&getComputedStyle(a).overflowY,navOverflow:n&&getComputedStyle(n).overflowY,listOverflow:o&&getComputedStyle(o).overflowY,mark:!!a?.querySelector('.dot-pattern--kite.dot-pattern--charcoal'),pageWidth:document.documentElement.scrollWidth}})()`);
 record('Article topics scroll and mark',data,data.listOverflow==='auto'&&data.mark&&!['auto','scroll'].includes(data.asideOverflow));
 await navigate(base+'/contact');data=await js(`({valid:document.querySelector('form')?.checkValidity(),fields:[...document.querySelectorAll('form input,form textarea,form select')].filter(e=>e.type!=='hidden'&&e.getAttribute('aria-hidden')!=='true').map(e=>({name:e.name,label:!!document.querySelector('label[for="'+e.id+'"]')||!!e.getAttribute('aria-label')||!!e.labels?.length}))})`);record('Contact empty validation and labels',data,data.valid===false&&data.fields.every(f=>f.label));
 const routes=['/','/branding-marketing','/ui-ux-design-development','/branding-marketing/social-media-marketing','/industries/saas-startups','/work','/work/fincart','/insights','/about','/careers','/contact','/design-system/product'];
 await send('Network.setCacheDisabled',{cacheDisabled:true});
 const performance=[];
 for(const route of routes){await viewport(1440);await navigate(base+route);await sleep(500);const m=await js(`({...window.__audit,dom:document.querySelectorAll('*').length,bytes:performance.getEntriesByType('resource').reduce((s,r)=>s+r.transferSize,0),jsBytes:performance.getEntriesByType('resource').filter(r=>r.initiatorType==='script').reduce((s,r)=>s+r.transferSize,0),domContentLoaded:performance.getEntriesByType('navigation')[0]?.domContentLoadedEventEnd})`);performance.push({route,...m});}
 const errors=events.filter(e=>e.method==='Runtime.exceptionThrown').map(e=>e.params.exceptionDetails.exception?.description||e.params.exceptionDetails.text);
 record('Uncaught browser exceptions',{errors},errors.length===0);
 await writeFile(`${out}/report.json`,JSON.stringify({checks,performance},null,2));console.log('Interaction checks',checks.length,'failures',checks.filter(x=>!x.pass).length);console.log('Evidence',out);
}finally{await browser.close();}
