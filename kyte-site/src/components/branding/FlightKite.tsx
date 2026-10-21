"use client";

import { useEffect, useRef, type RefObject } from "react";
import type { Shape } from "three";

type Point = [number, number];
const random = (n: number) => { const x = Math.sin(n * 127.1) * 43758.5453; return x - Math.floor(x); };
const outlines: Point[][] = [
  [[-.035,.025],[-.96,.42],[-.96,.97],[-.14,.97]],
  [[.035,.025],[.45,.97],[.97,.97],[.97,.42]],
  [[-.035,-.025],[-.96,-.42],[-.96,-.97],[-.14,-.97]],
  [[.035,-.025],[.45,-.97],[.97,-.97],[.97,-.42]],
];

// Clip each little mirror against its blade, so edge tiles follow the silhouette.
function clip(subject: Point[], polygon: Point[]) {
  let output = subject;
  for (let edge=0; edge<polygon.length; edge++) {
    const a=polygon[edge], b=polygon[(edge+1)%polygon.length];
    const input=output; output=[];
    const side=(p:Point)=>(b[0]-a[0])*(p[1]-a[1])-(b[1]-a[1])*(p[0]-a[0]);
    for(let i=0;i<input.length;i++) {
      const p=input[i], q=input[(i+1)%input.length];
      const sp=side(p), sq=side(q);
      if(sp>=0) output.push(p);
      if((sp>=0)!==(sq>=0)) {const t=sp/(sp-sq);output.push([p[0]+t*(q[0]-p[0]),p[1]+t*(q[1]-p[1])]);}
    }
    if(!output.length) break;
  }
  return output;
}

/** Physical metal, individual beveled mirror tiles, and a procedural studio environment. */
export function FlightKite({ progressRef }: { progressRef: RefObject<number> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if(!canvas) return;
    let disposed=false, cleanup: (()=>void) | undefined;
    const init = async () => {
      const [T,{mergeGeometries}] = await Promise.all([import("three"),import("three/addons/utils/BufferGeometryUtils.js")]);
      if(disposed) return;
      let renderer: InstanceType<typeof T.WebGLRenderer>;
      try { renderer=new T.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:"low-power"}); } catch { return; }
      renderer.setPixelRatio(Math.min(devicePixelRatio,1.75));
      renderer.setClearColor(0x000000,0);
      renderer.toneMapping=T.ACESFilmicToneMapping;
      renderer.toneMappingExposure=1.3;
      const scene=new T.Scene();
      const camera=new T.PerspectiveCamera(35,1,.1,50); camera.position.z=4.7;
      // Large white softboxes on a dark studio give chrome its sharp bright/dark reflections.
      const environmentCanvas=document.createElement("canvas"); environmentCanvas.width=2048; environmentCanvas.height=1024;
      const ctx=environmentCanvas.getContext("2d")!;
      ctx.fillStyle="#141621";ctx.fillRect(0,0,2048,1024);
      const gradient=ctx.createLinearGradient(0,0,0,1024);gradient.addColorStop(0,"#969da8");gradient.addColorStop(.5,"#292c38");gradient.addColorStop(1,"#13131c");ctx.fillStyle=gradient;ctx.fillRect(0,0,2048,1024);
      ctx.fillStyle="#ffffff";ctx.fillRect(160,110,170,630);ctx.fillRect(1040,90,440,210);ctx.fillRect(1800,340,100,530);
      ctx.fillStyle="#c5b3ff";ctx.fillRect(600,650,540,280);
      ctx.fillStyle="#f7f8ff";ctx.fillRect(1470,550,300,70);
      const texture=new T.CanvasTexture(environmentCanvas);texture.mapping=T.EquirectangularReflectionMapping;texture.colorSpace=T.SRGBColorSpace;
      const pmrem=new T.PMREMGenerator(renderer);const environment=pmrem.fromEquirectangular(texture);
      scene.environment=environment.texture;
      const group=new T.Group();scene.add(group);
      const base=new T.MeshPhysicalMaterial({color:0xc6c8d2,metalness:1,roughness:.105,clearcoat:1,clearcoatRoughness:.07,envMapIntensity:1.5});
      const silver=new T.MeshPhysicalMaterial({color:0xf3f3f8,metalness:1,roughness:.065,clearcoat:1,clearcoatRoughness:.035,envMapIntensity:1.7});
      const violet=silver.clone();violet.color.set(0xb5a1e8);
      const geometries: InstanceType<typeof T.ExtrudeGeometry>[]=[];
      const mirrors: InstanceType<typeof T.ExtrudeGeometry>[]=[];
      const purpleMirrors: InstanceType<typeof T.ExtrudeGeometry>[]=[];
      const shapeFrom=(points:Point[],rounded=false):Shape=>{
        const shape=new T.Shape();
        if(!rounded){shape.moveTo(...points[0]);points.slice(1).forEach(p=>shape.lineTo(...p));shape.closePath();return shape;}
        points.forEach((p,i)=>{
          const previous=points[(i+points.length-1)%points.length],next=points[(i+1)%points.length];
          const a:Point=[p[0]*.92+previous[0]*.08,p[1]*.92+previous[1]*.08];
          const b:Point=[p[0]*.92+next[0]*.08,p[1]*.92+next[1]*.08];
          if(!i)shape.moveTo(...a);else shape.lineTo(...a);
          shape.quadraticCurveTo(...p,...b);
        });shape.closePath();return shape;
      };
      outlines.forEach((outline,blade)=>{
        let points=outline;
        const area=points.reduce((sum,p,i)=>sum+p[0]*points[(i+1)%points.length][1]-points[(i+1)%points.length][0]*p[1],0);
        if(area<0)points=[...points].reverse();
        const geometry=new T.ExtrudeGeometry(shapeFrom(points,true),{depth:.2,bevelEnabled:true,bevelSegments:6,steps:1,bevelSize:.035,bevelThickness:.04,curveSegments:10});
        geometry.translate(0,0,-.1);geometries.push(geometry);
        const center:Point=points.reduce((a,p)=>[a[0]+p[0]/4,a[1]+p[1]/4],[0,0] as Point);
        const inset=points.map(p=>[p[0]*.92+center[0]*.08,p[1]*.92+center[1]*.08] as Point);
        const step=.078, gap=.004;
        for(let x=-1;x<1;x+=step)for(let y=-1;y<1;y+=step){
          const cell=clip([[x+gap,y+gap],[x+step-gap,y+gap],[x+step-gap,y+step-gap],[x+gap,y+step-gap]],inset);
          if(cell.length<3)continue;
          for(const side of [-1,1]){
            const tile=new T.ExtrudeGeometry(shapeFrom(cell),{depth:.004,bevelEnabled:true,bevelSegments:2,steps:1,bevelSize:.0017,bevelThickness:.002,curveSegments:1});
            const tileCenter=new T.Vector3();tile.computeBoundingBox();tile.boundingBox!.getCenter(tileCenter);
            tile.translate(-tileCenter.x,-tileCenter.y,0);
            const seed=(x+2)*71+(y+2)*131+blade*37;
            tile.rotateX((random(seed)-.5)*.035);tile.rotateY((random(seed+9)-.5)*.035);
            if(side<0)tile.rotateY(Math.PI);
            tile.translate(tileCenter.x,tileCenter.y,side*.146);
            (blade===3 && y<-.25 && random(seed+4)>.35?purpleMirrors:mirrors).push(tile);
          }
        }
      });
      const resources: InstanceType<typeof T.BufferGeometry>[]=[];
      for(const [parts,material] of [[geometries,base],[mirrors,silver],[purpleMirrors,violet]] as const){
        if(!parts.length)continue;
        const merged=mergeGeometries(parts,false)!;resources.push(merged);parts.forEach(g=>g.dispose());group.add(new T.Mesh(merged,material));
      }
      const key=new T.DirectionalLight(0xffffff,4);key.position.set(-3,4,4);scene.add(key);
      const rim=new T.DirectionalLight(0xbca5ff,3);rim.position.set(3,-2,1);scene.add(rim);
      // Restrained star glints, attached to the reflective outer corners.
      const starCanvas=document.createElement("canvas");starCanvas.width=128;starCanvas.height=128;
      const starCtx=starCanvas.getContext("2d")!;const glow=starCtx.createRadialGradient(64,64,0,64,64,62);glow.addColorStop(0,"#fff");glow.addColorStop(.08,"#fff");glow.addColorStop(.24,"#ffffff88");glow.addColorStop(1,"#ffffff00");starCtx.fillStyle=glow;starCtx.fillRect(0,0,128,128);
      starCtx.strokeStyle="#ffffffaa";starCtx.lineWidth=1;starCtx.beginPath();starCtx.moveTo(64,3);starCtx.lineTo(64,125);starCtx.moveTo(3,64);starCtx.lineTo(125,64);starCtx.stroke();
      const starTexture=new T.CanvasTexture(starCanvas);
      const starMaterial=new T.SpriteMaterial({map:starTexture,transparent:true,blending:T.AdditiveBlending,depthWrite:false,opacity:.8});
      const stars=[[.87,.86,.13],[-.87,-.83,.13]].map(p=>{const star=new T.Sprite(starMaterial.clone());star.position.set(p[0],p[1],p[2]);star.scale.setScalar(.27);group.add(star);return star;});
      const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");
      let frame=0,lastProgress=Number.NaN;
      const resize=()=>{ renderer.setSize(canvas.clientWidth,canvas.clientHeight,false); lastProgress=Number.NaN; };
      const draw=()=>{
        if(disposed)return;
        if(progressRef.current>=0 && progressRef.current!==lastProgress && !document.hidden && !reduced.matches){
          const progress=progressRef.current;
          group.rotation.set(-.15+Math.sin(progress*3)*.08,.14+progress*2.9,.025*Math.sin(progress*4));
          stars.forEach((star,i)=>{star.material.opacity=Math.pow(Math.max(0,Math.sin(progress*9+i*2.5)),8)*.9;});
          renderer.render(scene,camera);
          lastProgress=progress;
        }
        frame=requestAnimationFrame(draw);
      };
      resize();const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(canvas);frame=requestAnimationFrame(draw);
      cleanup=()=>{cancelAnimationFrame(frame);resizeObserver.disconnect();resources.forEach(g=>g.dispose());base.dispose();silver.dispose();violet.dispose();stars.forEach(s=>s.material.dispose());starMaterial.dispose();starTexture.dispose();environment.dispose();texture.dispose();pmrem.dispose();renderer.dispose();};
    };
    let started=false;
    const observer=new IntersectionObserver(([entry])=>{
      if(entry.isIntersecting && !started){started=true;void init();}
    },{rootMargin:"800px"});
    observer.observe(canvas.closest(".brand-closing") ?? canvas);
    return()=>{disposed=true;observer.disconnect();cleanup?.();};
  },[progressRef]);
  return <canvas ref={canvasRef} aria-hidden="true" />;
}
