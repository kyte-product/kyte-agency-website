/** Two brand touchpoints share one physical colored connection. */
function makeBrandsScene(HL){
 const {Cam,proj,hull,poly,rrect}=HL,P=proj(Cam(45,.5,1.14)),extent=[];
 function slab(x,y,w,h,z,depth,radius){
  const F=(u,v)=>P(x+w*u,y+h*v,z),ring=rrect(0,0,w,h,radius,18),top=ring.map(q=>F(q.u/w,q.v/h)),bottom=ring.map(q=>P(x+q.u,y+q.v,z-depth));extent.push(...top,...bottom);
  return {silhouette:poly(hull([...top,...bottom])),face:poly(top),p0:F(0,0),p1:F(1,0),p3:F(0,1),F};
 }
 const base=slab(-51,-21,42,42,7,6,4),middle=slab(9,-21,42,42,7,6,4),panel=slab(-26,-11,52,22,11,4,10.5);
 panel.icon={p0:panel.F(18/52,3/22),p1:panel.F(34/52,3/22),p3:panel.F(18/52,19/22)};
 const xs=extent.map(p=>p[0]),ys=extent.map(p=>p[1]),bounds={x:Math.min(...xs),y:Math.min(...ys),right:Math.max(...xs),bottom:Math.max(...ys)};
 return {width:160,height:128,bounds,offset:[80-(bounds.x+bounds.right)/2,64-(bounds.y+bounds.bottom)/2],base,middle,panel};
}
function mount({stage,svg,read}){
 const bag=HL.disposer(),s=makeBrandsScene(HL),root=HL.mk('g',{transform:`translate(${s.offset[0]*2.5} ${s.offset[1]*2.5}) scale(2.5)`},svg);
 [s.base,s.middle,s.panel].forEach(shape=>HL.mk('path',{d:shape.silhouette,class:'sil'},root));
 const clock=HL.register(stage,()=>false);bag.add(clock.unregister);bag.add(HL.pointer(stage,{move(){read.textContent='one connection across brand touchpoints';},leave(){read.textContent='rest';}}));bag.add(()=>svg.replaceChildren());read.textContent='rest';return {set(){},destroy:bag.dispose};
}
hairline({name:'product-stage-brands',means:'Two white brand tiles are joined by a colored link.',rules:[6,9],range:[0,.5,1],tour:[[130,140],[200,160],[270,190],null],mount});
