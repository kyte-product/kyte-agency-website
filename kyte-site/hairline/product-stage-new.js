/** A new idea lifts above a neutral circular foundation. */
function makeNewScene(HL){
 const {Cam,proj,hull,poly,rrect}=HL,S=1.30,P=proj(Cam(45,.5,S)),extent=[];
 const c=P(0,0,10),b=P(0,0,0),rx=33*S,ry=16.5*S;
 const base={face:`M${c[0]-rx} ${c[1]}A${rx} ${ry} 0 1 0 ${c[0]+rx} ${c[1]}A${rx} ${ry} 0 1 0 ${c[0]-rx} ${c[1]}Z`,silhouette:`M${c[0]-rx} ${c[1]}A${rx} ${ry} 0 0 1 ${c[0]+rx} ${c[1]}L${b[0]+rx} ${b[1]}A${rx} ${ry} 0 0 1 ${b[0]-rx} ${b[1]}Z`};extent.push([c[0]-rx,c[1]-ry],[b[0]+rx,b[1]+ry]);
 const F=(u,v)=>P(-22+44*u,-22+44*v,36),ring=rrect(0,0,44,44,4,16),top=ring.map(q=>F(q.u/44,q.v/44)),bottom=ring.map(q=>P(-22+q.u,-22+q.v,33));extent.push(...top,...bottom);
 const panel={silhouette:poly(hull([...top,...bottom])),face:poly(top),p0:F(0,0),p1:F(1,0),p3:F(0,1),icon:{p0:F(.25,.25),p1:F(.75,.25),p3:F(.25,.75)}};
 const xs=extent.map(p=>p[0]),ys=extent.map(p=>p[1]),bounds={x:Math.min(...xs),y:Math.min(...ys),right:Math.max(...xs),bottom:Math.max(...ys)};
 return {width:160,height:128,bounds,offset:[80-(bounds.x+bounds.right)/2,64-(bounds.y+bounds.bottom)/2],base,panel};
}
function mount({stage,svg,read}){
 const bag=HL.disposer(),s=makeNewScene(HL),root=HL.mk('g',{transform:`translate(${s.offset[0]*2.5} ${s.offset[1]*2.5}) scale(2.5)`},svg);
 [s.base,s.panel].forEach(shape=>HL.mk('path',{d:shape.silhouette,class:'sil'},root));const clock=HL.register(stage,()=>false);bag.add(clock.unregister);bag.add(HL.pointer(stage,{move(){read.textContent='a new product idea taking shape';},leave(){read.textContent='rest';}}));bag.add(()=>svg.replaceChildren());read.textContent='rest';return {set(){},destroy:bag.dispose};
}
hairline({name:'product-stage-new',means:'A new idea tile lifts above a rounded white foundation.',rules:[6,9],range:[0,.5,1],tour:[[200,120],[160,220],null],mount});
