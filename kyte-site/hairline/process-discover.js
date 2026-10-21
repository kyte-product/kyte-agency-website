/** A magnifying lens brings a small stack of research evidence into focus. */
function makeProcessDiscoverScene(HL){
 const {Cam,proj,rrect,hull,poly,fillet,open}=HL,P=proj(Cam(45,.5,2.15)),parts=[],extent=[];
 function card(id,x,y,z,w,h,d){const ring=rrect(0,0,w,h,4,20),F=(u,v)=>P(x+w*u,y+h*v,z),front=ring.map(q=>F(q.u/w,q.v/h)),back=ring.map(q=>P(x+q.u,y+q.v,z-d));extent.push(...front,...back);const o={id,silhouette:poly(hull([...front,...back])),face:poly(front),F};parts.push(o);return o;}
 card('back-card',-57,-14,5,91,62,4);
 const evidence=card('evidence',-47,-22,12,91,62,5);
 const cx=-8,y=-1,cz=62,R=27,ring=(r,yy)=>Array.from({length:180},(_,i)=>{const a=i*Math.PI/90;return P(cx+r*Math.cos(a),yy,cz+r*Math.sin(a))});
 // The handle meets the lens frame in the same x/z plane.
 const a=[10,43],b=[39,14],nx=3.8,nz=3.8,front=[[a[0]-nx,a[1]-nz],[b[0]-nx,b[1]-nz],[b[0]+nx,b[1]+nz],[a[0]+nx,a[1]+nz]].map(([x,z])=>P(x,y,z)),back=[[a[0]-nx,a[1]-nz],[b[0]-nx,b[1]-nz],[b[0]+nx,b[1]+nz],[a[0]+nx,a[1]+nz]].map(([x,z])=>P(x,y-4,z));
 extent.push(...front,...back);parts.push({id:'handle',silhouette:poly(fillet(hull([...front,...back]),hull([...front,...back]).map(()=>3),14)),face:poly(fillet(front,front.map(()=>2),14))});
 const outer=ring(R,y),rear=ring(R,y-4);extent.push(...outer,...rear);parts.push({id:'lens',silhouette:poly(hull([...outer,...rear])),face:poly(outer),glass:poly(ring(21.5,y)),F:(u,v)=>P(cx-21.5+43*u,y,cz+21.5-43*v)});
 const xs=extent.map(p=>p[0]),ys=extent.map(p=>p[1]),bounds={x:Math.min(...xs),y:Math.min(...ys),right:Math.max(...xs),bottom:Math.max(...ys)},offset=[200-(bounds.x+bounds.right)/2,160-(bounds.y+bounds.bottom)/2];
 const lines=[];for(let q=-160;q<=160;q+=20){lines.push(open([P(q,-160,0),P(q,160,0)]));lines.push(open([P(-160,q,0),P(160,q,0)]));}
 const detail=(x,y,w,h)=>poly(rrect(x,y,x+w,y+h,1.3,10).map(q=>evidence.F(q.u/91,q.v/62)));
 return {width:400,height:320,bounds,offset,parts,lines,details:[detail(9,10,24,14),detail(9,32,51,3),detail(9,41,37,3),detail(9,50,44,3)]};
}
function mount({stage,svg,read}){const bag=HL.disposer(),s=makeProcessDiscoverScene(HL),g=HL.mk('g',{transform:`translate(${s.offset})`},svg);for(const p of s.parts)HL.mk('path',{d:p.silhouette,class:'sil'},g);const clock=HL.register(stage,()=>false);bag.add(clock.unregister);bag.add(HL.pointer(stage,{move(){read.textContent='look closer at the evidence';},leave(){read.textContent='rest';}}));bag.add(()=>svg.replaceChildren());read.textContent='rest';return{set(){},destroy:bag.dispose};}
hairline({name:'process-discover',means:'A magnifying lens brings research evidence into focus.',rules:[6,9],range:[0,.5,1],tour:[[170,120],[245,200],null],mount});
