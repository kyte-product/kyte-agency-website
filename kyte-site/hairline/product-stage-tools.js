/** Two complete forms for a small product-stage symbol. */
function makeToolsScene(HL){
 const {Cam,proj,hull,fillet,poly,rrect}=HL,P=proj(Cam(45,.5,1.13)),extent=[];
 const ring=Array.from({length:6},(_,i)=>{const a=(i*60+15)*Math.PI/180;return [38*Math.cos(a),38*Math.sin(a)];});
 const top=ring.map(([x,y])=>P(x,y,12)),bottom=ring.map(([x,y])=>P(x,y,0));
 const round=pts=>poly(fillet(pts,pts.map(()=>2),12));
 const base={silhouette:round(hull([...top,...bottom])),face:round(top)};extent.push(...top,...bottom);
 const w=48,h=46,x=-24,y=-3,z=12;
 const F=(u,v)=>P(x+w*u,y,z+h*(1-v)),panelRing=rrect(0,0,w,h,3,16);
 const front=panelRing.map(q=>F(q.u/w,q.v/h)),back=panelRing.map(q=>P(x+q.u,y-2.8,z+h-q.v));
 const panel={silhouette:poly(hull([...front,...back])),face:poly(front),p0:F(0,0),p1:F(1,0),p3:F(0,1),icon:{p0:F(.23,.23),p1:F(.77,.23),p3:F(.23,.77)}};extent.push(...front,...back);
 const xs=extent.map(p=>p[0]),ys=extent.map(p=>p[1]),bounds={x:Math.min(...xs),y:Math.min(...ys),right:Math.max(...xs),bottom:Math.max(...ys)};
 return {width:160,height:128,bounds,offset:[80-(bounds.x+bounds.right)/2,64-(bounds.y+bounds.bottom)/2],base,panel};
}
function mount({stage,svg,read}){
 const bag=HL.disposer(),s=makeToolsScene(HL),root=HL.mk('g',{transform:`translate(${s.offset[0]*2.5} ${s.offset[1]*2.5}) scale(2.5)`},svg);
 [s.base,s.panel].forEach(shape=>HL.mk('path',{d:shape.silhouette,class:'sil'},root));
 const clock=HL.register(stage,()=>false);bag.add(clock.unregister);bag.add(HL.pointer(stage,{move(){read.textContent='clear controls for internal workflows';},leave(){read.textContent='rest';}}));bag.add(()=>svg.replaceChildren());read.textContent='rest';return {set(){},destroy:bag.dispose};
}
hairline({name:'product-stage-tools',means:'A focused control panel sits on a shared white hexagonal foundation.',rules:[6,9],range:[0,.5,1],tour:[[200,135],[170,225],null],mount});
