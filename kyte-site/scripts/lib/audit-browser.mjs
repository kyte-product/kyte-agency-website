import {spawn} from 'node:child_process';
export const sleep=ms=>new Promise(r=>setTimeout(r,ms));
export async function auditBrowser(port=9238){
 const chrome=spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',['--headless','--no-first-run','--no-default-browser-check',`--remote-debugging-port=${port}`,`--user-data-dir=/private/tmp/kyte-audit-profile-${port}`],{stdio:'ignore'});
 let target;
 for(let i=0;i<40;i++){try{target=await(await fetch(`http://127.0.0.1:${port}/json/new?about:blank`,{method:'PUT'})).json();break;}catch{await sleep(200);}}
 if(!target){chrome.kill();throw Error('Audit browser unavailable');}
 const ws=new WebSocket(target.webSocketDebuggerUrl);await new Promise(r=>ws.addEventListener('open',r,{once:true}));
 let id=0;const pending=new Map(),events=[];
 ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);if(!p)return;clearTimeout(p.timeout);if(m.error)p.reject(Error(m.error.message));else p.resolve(m.result);}else events.push(m);};
 const send=(method,params={})=>new Promise((resolve,reject)=>{const key=++id;const timeout=setTimeout(()=>{pending.delete(key);reject(Error('CDP timeout: '+method));},20000);pending.set(key,{resolve,reject,timeout});ws.send(JSON.stringify({id:key,method,params}));});
 const evaluate=async expression=>{const r=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(r.exceptionDetails.exception?.description||r.exceptionDetails.text);return r.result.value;};
 await send('Page.enable');await send('Runtime.enable');await send('Network.enable');
 const viewport=async(width,height=900)=>{await send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<600});await send('Emulation.setTouchEmulationEnabled',{enabled:width<600,maxTouchPoints:1});};
 const navigate=async url=>{await send('Page.navigate',{url});for(let i=0;i<35;i++){await sleep(150);if(await evaluate('document.readyState === "complete" && !!document.querySelector("main")'))break;}await sleep(600);};
 const close=async()=>{await send('Browser.close').catch(()=>{});ws.close();chrome.kill();};
 return {send,evaluate,viewport,navigate,close,events};
}
