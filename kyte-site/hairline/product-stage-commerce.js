/** A cart and checkout surface form a compact commerce journey. */
function makeCommerceJourneyScene(HL){
 const {Cam,proj,hull,poly,rrect}=HL,P=proj(Cam(45,.5,1.04)),extent=[];
 function slab(x,y,w,h,z,depth,radius){
  const F=(u,v)=>P(x+w*u,y+h*v,z),ring=rrect(0,0,w,h,radius,16),front=ring.map(q=>F(q.u/w,q.v/h)),back=ring.map(q=>P(x+q.u,y+q.v,z-depth));extent.push(...front,...back);
  return {silhouette:poly(hull([...front,...back])),face:poly(front),p0:F(0,0),p1:F(1,0),p3:F(0,1),F};
 }
 const base=slab(-32,-41,64,82,7,4,4),panel=slab(-28,-29,56,38,27,2.2,2.8);
 panel.icon={p0:panel.F(.30,.18),p1:panel.F(.70,.18),p3:panel.F(.30,.82)};
 // Sparse checkout placeholders are authored in base-local coordinates.
 const detail=(x,y,w,h)=>poly(rrect(x,y,x+w,y+h,1,10).map(q=>base.F(q.u/64,q.v/82)));
 const details=[detail(12,50,38,3),detail(12,58,27,2.5),detail(12,67,35,6)];
 const xs=extent.map(p=>p[0]),ys=extent.map(p=>p[1]),bounds={x:Math.min(...xs),y:Math.min(...ys),right:Math.max(...xs),bottom:Math.max(...ys)};
 return {width:160,height:128,bounds,offset:[80-(bounds.x+bounds.right)/2,64-(bounds.y+bounds.bottom)/2],base,panel,details};
}
function mount({stage,svg,read}){
 const bag=HL.disposer(),s=makeCommerceJourneyScene(HL),root=HL.mk('g',{transform:`translate(${s.offset[0]*2.5} ${s.offset[1]*2.5}) scale(2.5)`},svg);
 [s.base,s.panel].forEach(shape=>HL.mk('path',{d:shape.silhouette,class:'sil'},root));
 const clock=HL.register(stage,()=>false);bag.add(clock.unregister);bag.add(HL.pointer(stage,{move(){read.textContent='from a cart to a clear checkout';},leave(){read.textContent='rest';}}));bag.add(()=>svg.replaceChildren());read.textContent='rest';return {set(){},destroy:bag.dispose};
}
hairline({name:'product-stage-commerce',means:'A warm cart tile lifts above a clear checkout surface.',rules:[6,9],range:[0,.5,1],tour:[[200,125],[180,220],null],mount});
