/** A confirmed service stands on a stable neutral foundation. */
function makeEstablishedScene(HL){
 const {Cam,proj,hull,fillet,poly}=HL,P=proj(Cam(45,.5,1.25)),extent=[];
 const ring=Array.from({length:6},(_,i)=>{const a=(i*60+15)*Math.PI/180;return [33*Math.cos(a),33*Math.sin(a)];}),top=ring.map(([x,y])=>P(x,y,10)),bottom=ring.map(([x,y])=>P(x,y,0)),round=pts=>poly(fillet(pts,pts.map(()=>2),12));
 const base={silhouette:round(hull([...top,...bottom])),face:round(top)};extent.push(...top,...bottom);
 const radius=23,cz=35,y=-2,F=(u,v)=>P(-radius+2*radius*u,y,cz+radius-2*radius*v);
 const circle=Array.from({length:100},(_,i)=>{const a=i*2*Math.PI/100;return [radius*Math.cos(a),cz+radius*Math.sin(a)];}),front=circle.map(([x,z])=>P(x,y,z)),back=circle.map(([x,z])=>P(x,y-3,z));extent.push(...front,...back);
 const panel={silhouette:poly(hull([...front,...back])),face:poly(front),p0:F(0,0),p1:F(1,0),p3:F(0,1),icon:{p0:F(.24,.24),p1:F(.76,.24),p3:F(.24,.76)}};
 const xs=extent.map(p=>p[0]),ys=extent.map(p=>p[1]),bounds={x:Math.min(...xs),y:Math.min(...ys),right:Math.max(...xs),bottom:Math.max(...ys)};
 return {width:160,height:128,bounds,offset:[80-(bounds.x+bounds.right)/2,64-(bounds.y+bounds.bottom)/2],base,panel};
}
function mount({stage,svg,read}){const bag=HL.disposer(),s=makeEstablishedScene(HL),root=HL.mk('g',{transform:`translate(${s.offset[0]*2.5} ${s.offset[1]*2.5}) scale(2.5)`},svg);[s.base,s.panel].forEach(shape=>HL.mk('path',{d:shape.silhouette,class:'sil'},root));const clock=HL.register(stage,()=>false);bag.add(clock.unregister);bag.add(HL.pointer(stage,{move(){read.textContent='a reliable service ready to evolve';},leave(){read.textContent='rest';}}));bag.add(()=>svg.replaceChildren());read.textContent='rest';return {set(){},destroy:bag.dispose};}
hairline({name:'product-stage-established',means:'A confirmed service medallion stands on a stable white foundation.',rules:[6,9],range:[0,.5,1],tour:[[200,125],[160,220],null],mount});
