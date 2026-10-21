/** Three restrained layers form a shared internal system. */
function makeSystemsScene(HL){
 const {Cam,proj,hull,poly,rrect}=HL,P=proj(Cam(45,.5,1.11)),extent=[];
 function slab(z){
  const w=58,h=58,F=(u,v)=>P(-29+w*u,-29+h*v,z),ring=rrect(0,0,w,h,4,16),top=ring.map(q=>F(q.u/w,q.v/h)),bottom=ring.map(q=>P(-29+q.u,-29+q.v,z-6));extent.push(...top,...bottom);
  return {silhouette:poly(hull([...top,...bottom])),face:poly(top),p0:F(0,0),p1:F(1,0),p3:F(0,1),F};
 }
 const base=slab(6),middle=slab(22),panel=slab(38);panel.icon={p0:panel.F(.27,.27),p1:panel.F(.73,.27),p3:panel.F(.27,.73)};
 const xs=extent.map(p=>p[0]),ys=extent.map(p=>p[1]),bounds={x:Math.min(...xs),y:Math.min(...ys),right:Math.max(...xs),bottom:Math.max(...ys)};
 return {width:160,height:128,bounds,offset:[80-(bounds.x+bounds.right)/2,64-(bounds.y+bounds.bottom)/2],base,middle,panel};
}
function mount({stage,svg,read}){
 const bag=HL.disposer(),s=makeSystemsScene(HL),root=HL.mk('g',{transform:`translate(${s.offset[0]*2.5} ${s.offset[1]*2.5}) scale(2.5)`},svg);
 [s.base,s.middle,s.panel].forEach(shape=>HL.mk('path',{d:shape.silhouette,class:'sil'},root));
 const clock=HL.register(stage,()=>false);bag.add(clock.unregister);bag.add(HL.pointer(stage,{move(){read.textContent='a shared foundation for connected workflows';},leave(){read.textContent='rest';}}));bag.add(()=>svg.replaceChildren());read.textContent='rest';return {set(){},destroy:bag.dispose};
}
hairline({name:'product-stage-systems',means:'A workflow layer and two neutral foundations form one internal system.',rules:[6,9],range:[0,.5,1],tour:[[200,115],[160,200],[240,230],null],mount});
