/** A web surface and one colored sphere form a small platform symbol. */
function makeWebScene(HL){
 const {Cam,proj,hull,poly,rrect}=HL,S=1.09,P=proj(Cam(45,.5,S)),extent=[];
 const w=80,h=46,x=-40,y=-7,z=10,F=(u,v)=>P(x+w*u,y,z+h*(1-v));
 const ring=rrect(0,0,w,h,3,16),front=ring.map(q=>F(q.u/w,q.v/h)),back=ring.map(q=>P(x+q.u,y-3,z+h-q.v));extent.push(...front,...back);
 const panel={silhouette:poly(hull([...front,...back])),face:poly(front),p0:F(0,0),p1:F(1,0),p3:F(0,1),icon:{p0:F(.36,.30),p1:F(.64,.30),p3:F(.36,.787)}};
 const dots=[.11,.17,.23].map(u=>({center:F(u,.13),p1:F(u+.018,.13),p3:F(u,.13+.0255)}));
 const address=poly(rrect(29,5.5,57,8,1,10).map(q=>F(q.u/w,q.v/h)));
 const center=P(44,4,17),radius=17*S,sphere={center,radius,face:`M${center[0]-radius} ${center[1]}a${radius} ${radius} 0 1 0 ${radius*2} 0a${radius} ${radius} 0 1 0 ${-radius*2} 0Z`};extent.push([center[0]-radius,center[1]-radius],[center[0]+radius,center[1]+radius]);
 const xs=extent.map(p=>p[0]),ys=extent.map(p=>p[1]),bounds={x:Math.min(...xs),y:Math.min(...ys),right:Math.max(...xs),bottom:Math.max(...ys)};
 return {width:160,height:128,bounds,offset:[80-(bounds.x+bounds.right)/2,64-(bounds.y+bounds.bottom)/2],panel,sphere,dots,address};
}
function mount({stage,svg,read}){
 const bag=HL.disposer(),s=makeWebScene(HL),root=HL.mk('g',{transform:`translate(${s.offset[0]*2.5} ${s.offset[1]*2.5}) scale(2.5)`},svg);
 HL.mk('path',{d:s.panel.silhouette,class:'sil'},root);HL.mk('path',{d:s.sphere.face,class:'sil'},root);
 const clock=HL.register(stage,()=>false);bag.add(clock.unregister);bag.add(HL.pointer(stage,{move(){read.textContent='a web platform connected to a wider world';},leave(){read.textContent='rest';}}));bag.add(()=>svg.replaceChildren());read.textContent='rest';return {set(){},destroy:bag.dispose};
}
hairline({name:'product-stage-web',means:'A neutral browser and one colored sphere represent a web platform.',rules:[6,9],range:[0,.5,1],tour:[[185,130],[248,220],null],mount});
