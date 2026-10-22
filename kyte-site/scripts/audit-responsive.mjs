import {spawn} from 'node:child_process';
import {writeFile,readFile} from 'node:fs/promises';
const baseUrl=(process.argv[2]||'http://127.0.0.1:3002').replace(/\/$/,'');
const routeReport=process.argv[3]||'/private/tmp/kyte-http-report.json';
const output=process.argv[4]||'/private/tmp/kyte-responsive-report.json';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const chrome=spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',['--headless','--disable-gpu','--no-first-run','--no-default-browser-check','--remote-debugging-port=9237','--user-data-dir=/private/tmp/kyte-dots-cdp-profile'],{stdio:'ignore'});
let ws;
try {
 let target;
 for(let i=0;i<30;i++){try{target=await(await fetch('http://127.0.0.1:9237/json/new?about:blank',{method:'PUT'})).json();break;}catch{await sleep(200);}}
 if(!target)throw Error('Chrome debugging endpoint unavailable');
 ws=new WebSocket(target.webSocketDebuggerUrl); await new Promise(r=>ws.addEventListener('open',r,{once:true}));
 let id=0;const calls=new Map(); ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id){const p=calls.get(m.id);calls.delete(m.id);if(m.error)p.reject(m.error);else p.resolve(m.result);}};
 const send=(method,params={})=>new Promise((resolve,reject)=>{const key=++id;calls.set(key,{resolve,reject});ws.send(JSON.stringify({id:key,method,params}));});
 await send('Page.enable'); await send('Runtime.enable');
 await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});

 const routes=JSON.parse(await readFile(routeReport,'utf8')).routes.map(r=>r.path).filter(p=>!p.startsWith('/graveyard'));
 const results=[];const errors=[];const old=ws.onmessage;ws.onmessage=e=>{old(e);const m=JSON.parse(e.data);if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails.text+': '+(m.params.exceptionDetails.exception?.description||''));};
 for(const width of [393,810,1440]){
  await send('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width<600});
  for(const route of routes){
   errors.length=0;await send('Page.navigate',{url:baseUrl+route});await sleep(850);
   const data=(await send('Runtime.evaluate',{expression:`(()=>{const main=[...document.querySelectorAll('main')].find(e=>e.getClientRects().length);if(!main)return {missingMain:true};const clips=[...main.querySelectorAll('article,button,p,h1,h2,h3,.service-process__active-copy')].filter(e=>{const c=getComputedStyle(e);return e.clientWidth>1&&e.clientHeight>1&&(c.overflowX==='hidden'||c.overflowX==='clip'||c.overflowY==='hidden'||c.overflowY==='clip')&&(e.scrollWidth>e.clientWidth+3||e.scrollHeight>e.clientHeight+3)}).map(e=>({class:e.className,text:e.textContent.slice(0,65),w:e.clientWidth,sw:e.scrollWidth,h:e.clientHeight,sh:e.scrollHeight}));return {pageWidth:document.documentElement.scrollWidth,viewport:innerWidth,h1:main.querySelectorAll('h1').length,clips,heroColor:getComputedStyle(main.querySelector('h1')).color,heroFont:getComputedStyle(main.querySelector('h1')).fontFamily,heroBg:main.querySelector('.service-detail__hero')?getComputedStyle(main.querySelector('.service-detail__hero')).backgroundColor:null,bodyPadding:getComputedStyle(document.body).paddingTop,unlabelled:[...document.querySelectorAll('button')].filter(e=>e.getClientRects().length&&!e.textContent.trim()&&!e.getAttribute('aria-label')&&!e.getAttribute('aria-labelledby')).map(e=>e.className)}})()`,returnByValue:true})).result.value;
   results.push({width,route,...data,errors:[...errors]});
   if(data.pageWidth>width||data.clips?.length||errors.length)console.log(JSON.stringify(results.at(-1)));
  }
  console.log('Finished width',width);
 }
 await writeFile(output,JSON.stringify(results,null,2));
 console.log('TOTAL',results.length,'OVERFLOW',results.filter(r=>r.pageWidth>r.width).length,'ERRORS',results.filter(r=>r.errors.length).length);
 await send('Browser.close').catch(()=>{});
}finally{ws?.close();chrome.kill();}
