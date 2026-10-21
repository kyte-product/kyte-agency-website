/** Shared scene geometry for the Hairline bench and the final static SVG. */
function makeComplexScene(HL) {
  const { Cam, proj, hull, fillet, poly, open } = HL;
  const S = 1.32, P = proj(Cam(45, .5, S));
  const lerp = (a,b,t) => [a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t];
  const round = points => poly(fillet(points,points.map(()=>2.9),10));
  const ellipse = (cx,cy,rx,ry) => `M${cx-rx} ${cy}A${rx} ${ry} 0 1 0 ${cx+rx} ${cy}A${rx} ${ry} 0 1 0 ${cx-rx} ${cy}Z`;
  const shapes = [], extent = [];
  function box(id,x0,y0,x1,y1,height) {
    const A=P(x0,y0,0),B=P(x1,y0,0),C=P(x1,y1,0),D=P(x0,y1,0);
    const a=P(x0,y0,height),b=P(x1,y0,height),c=P(x1,y1,height),d=P(x0,y1,height);
    const outline=hull([A,B,C,D,a,b,c,d]);
    extent.push(...outline);
    const start=lerp(d,c,.075),turn=lerp(c,d,.085),end=lerp(c,C,.055),foot=lerp(C,c,.07);
    const seam=`M${start}L${turn}Q${c} ${end}L${foot}`;
    const incoming=open([lerp(b,c,.09),lerp(c,b,.09)]);
    const shape={id,type:'box',silhouette:round(outline),faces:{left:poly([d,c,C,D]),right:poly([b,c,C,B]),top:poly([a,b,c,d])},seams:[seam,incoming],points:{a,b,c,d,A,B,C,D}};
    shapes.push(shape);return shape;
  }
  box('shell',-53,-21,55,42,62);
  box('core',-4,24,48,69,103);
  const sphere=P(33,120,21),sphereR=25;
  extent.push([sphere[0]-sphereR,sphere[1]-sphereR],[sphere[0]+sphereR,sphere[1]+sphereR]);
  shapes.push({id:'sphere',type:'round',silhouette:ellipse(...sphere,sphereR,sphereR),seams:[`M${sphere[0]-sphereR*.91} ${sphere[1]+sphereR*.34}C${sphere[0]-sphereR*.55} ${sphere[1]+sphereR*.7} ${sphere[0]+sphereR*.55} ${sphere[1]+sphereR*.7} ${sphere[0]+sphereR*.91} ${sphere[1]+sphereR*.34}`]});
  const foot=P(79,41,0),apex=P(79,41,58),rx=29,ry=14.5,h=foot[1]-apex[1];
  const ty=-ry*ry/h,tx=rx*Math.sqrt(1-ry*ry/(h*h)),t=.025;
  const rt=[foot[0]+tx,foot[1]+ty],lt=[foot[0]-tx,foot[1]+ty];
  const rtip=lerp(apex,rt,t),ltip=lerp(apex,lt,t);
  const cone=`M${ltip}Q${apex} ${rtip}L${rt}A${rx} ${ry} 0 1 1 ${lt}Z`;
  const section=(z)=>{const q=1-z/58,c=P(79,41,z),r=rx*q,rr=ry*q;return `M${c[0]-r*.94} ${c[1]+rr*.26}A${r} ${rr} 0 0 0 ${c[0]+r*.94} ${c[1]+rr*.26}`;};
  extent.push([foot[0]-rx,apex[1]],[foot[0]+rx,foot[1]+ry]);
  shapes.push({id:'cone',type:'round',silhouette:cone,seams:[section(8),section(29)]});
  const xs=extent.map(p=>p[0]),ys=extent.map(p=>p[1]);
  const bounds={x:Math.min(...xs),y:Math.min(...ys),right:Math.max(...xs),bottom:Math.max(...ys)};
  const offset=[200-(bounds.x+bounds.right)/2,132-(bounds.y+bounds.bottom)/2];
  const lines=[],tiles=[];
  for(let x=-240;x<=240;x+=24)lines.push(open([P(x,-240,-1),P(x,240,-1)]));
  for(let y=-240;y<=240;y+=24)lines.push(open([P(-240,y,-1),P(240,y,-1)]));
  for(let x=-216;x<=216;x+=24)for(let y=-216;y<=216;y+=24)if((x/24+y/24)%5===0)tiles.push(poly([P(x,y,-1),P(x+24,y,-1),P(x+24,y+24,-1),P(x,y+24,-1)]));
  return {width:400,height:260,offset,bounds,shapes,ground:{lines,tiles}};
}

function mount({stage,svg,read}) {
  const bag=HL.disposer(),scene=makeComplexScene(HL);
  const root=HL.mk('g',{transform:`translate(${scene.offset[0]} ${scene.offset[1]+30})`},svg);
  const floor=HL.mk('g',{},root);
  HL.mk('path',{d:scene.ground.lines.join(''),class:'lo nf'},floor);
  scene.shapes.forEach(shape=>{
    const g=HL.mk('g',{},root);
    HL.mk('path',{d:shape.silhouette,class:'sil'},g);
    shape.seams.forEach(d=>HL.mk('path',{d,class:'lo nf'},g));
  });
  const clock=HL.register(stage,()=>false);bag.add(clock.unregister);
  bag.add(HL.pointer(stage,{move(){read.textContent='shared product core';},leave(){read.textContent='rest';}}));
  bag.add(()=>svg.replaceChildren());read.textContent='rest';
  return {set(){},destroy:bag.dispose};
}
hairline({name:'product-complex-system',means:'Different product parts share one coherent core.',rules:[6,9],range:[0,.5,1],tour:[[196,95],[136,225],[270,226],null],mount});
