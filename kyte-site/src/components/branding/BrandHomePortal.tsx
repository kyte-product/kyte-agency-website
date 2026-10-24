"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import "./BrandHomePortal.css";

const clamp=(n:number)=>Math.max(0,Math.min(1,n));
const noise=(n:number)=>{const x=Math.sin(n*127.1+19.2)*43758.5453;return x-Math.floor(x);};

/** A scroll-reversible pixel triangle, revealing the route back to the main site. */
export function BrandHomePortal() {
  const sectionRef=useRef<HTMLElement>(null);
  const canvasRef=useRef<HTMLCanvasElement>(null);
  useEffect(()=>{
    const section=sectionRef.current,canvas=canvasRef.current;
    const ctx=canvas?.getContext("2d",{alpha:false});
    if(!section||!canvas||!ctx)return;
    const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame=0;
    const draw=()=>{
      frame=0;
      const rect=section.getBoundingClientRect();
      const h=section.clientHeight,w=section.clientWidth;
      const ratio=Math.min(devicePixelRatio,2);
      if(canvas.width!==Math.round(w*ratio)||canvas.height!==Math.round(h*ratio)){
        canvas.width=Math.round(w*ratio);canvas.height=Math.round(h*ratio);ctx.setTransform(ratio,0,0,ratio,0,0);
      }
      const p=reduced.matches?1:clamp((window.innerHeight-rect.top)/Math.max(1,h));
      ctx.fillStyle="#0249d9";ctx.fillRect(0,0,w,h);
      const cell=w/112;
      // The final bottom band is white, including corners and fractional rows.
      ctx.fillStyle="#fff";ctx.fillRect(0,h-cell*2,w,cell*2);
      const apex=h*(.72-p*.7);
      for(let row=0;row<Math.ceil(h/cell);row++)for(let col=0;col<112;col++){
        const x=(col+.5)*cell,y=(row+.5)*cell;
        const halfWidth=Math.max(0,(y-apex)/Math.max(1,h-apex))*w*.62;
        const distance=halfWidth-Math.abs(x-w/2);
        const rough=(noise(col*13+row*7)-.5)*cell*2.4;
        if(y<apex-cell||distance+rough < -cell*1.5)continue;
        if(distance+rough>cell*1.2)ctx.fillStyle="#fff";
        else{
          const n=noise(row*112+col+Math.floor(p*24));
          ctx.fillStyle=p>.96?(n>.72?"#a2f887":n>.57?"#5bb8ff":n>.35?"#fff":"#0249d9"):n>.6?"#fff":n>.34?"#5bb8ff":n>.23?"#a2f887":"#0249d9";
        }
        ctx.fillRect(Math.floor(col*cell),Math.floor(row*cell),Math.ceil(cell),Math.ceil(cell));
      }
      ctx.fillStyle="#fff";ctx.fillRect(0,h-cell*1.25,w,cell*1.25);
      section.style.setProperty("--portal-opacity",String(clamp((p-.35)/.3)));
      section.dataset.ready=String(p>.4);
    };
    const request=()=>{if(!frame)frame=requestAnimationFrame(draw);};
    const observer=new ResizeObserver(request);observer.observe(section);
    draw();window.addEventListener("scroll",request,{passive:true});window.addEventListener("resize",request);reduced.addEventListener("change",request);
    return()=>{cancelAnimationFrame(frame);observer.disconnect();window.removeEventListener("scroll",request);window.removeEventListener("resize",request);reduced.removeEventListener("change",request);};
  },[]);
  return <section ref={sectionRef} className="brand-home-portal" aria-label="Continue to the Kyte homepage" data-site-reveal-ignore>
    <div className="brand-home-portal__sticky"><canvas ref={canvasRef} aria-hidden="true" /><div className="brand-home-portal__content"><p>There’s more to Kyte.</p><Link className="branding-nav-action" href="/">Go to Kyte homepage <ArrowRight size={18} aria-hidden="true" /></Link></div></div>
  </section>;
}
