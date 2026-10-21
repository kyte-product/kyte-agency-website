/** Research evidence becomes a clear set of product priorities. */
function makeResearchHeroScene(HL){
 const {Cam,proj,rrect,hull,poly,open}=HL,S=2.38,P=proj(Cam(45,.5,S)),extent=[],surfaces=[],parts=[];
 function slab(id,x,y,z,w,h,depth,flat=false){
  const ring=rrect(0,0,w,h,3,18),F=(u,v)=>flat?P(x+w*u,y+h*v,z):P(x+w*u,y,z+h*(1-v));
  const front=ring.map(q=>F(q.u/w,q.v/h)),back=ring.map(q=>flat?P(x+q.u,y+q.v,z-depth):P(x+q.u,y-depth,z+h-q.v));extent.push(...front,...back);
  const surface={id,silhouette:poly(hull([...front,...back])),face:poly(front),plane:{p0:F(0,0),p1:F(1,0),p3:F(0,1),width:w*10,height:h*10}};surfaces.push(surface);parts.push(surface);
 }
 function tube(id,a,b,r=4){const dx=b[0]-a[0],dy=b[1]-a[1],len=Math.hypot(dx,dy),nx=-dy/len,ny=dx/len,ring=c=>Array.from({length:100},(_,i)=>{const t=i/100*Math.PI*2;return P(c[0]+nx*r*Math.cos(t),c[1]+ny*r*Math.cos(t),c[2]+r*Math.sin(t))}),front=ring(a),back=ring(b);extent.push(...front,...back);parts.push({id,silhouette:poly(hull([...front,...back])),face:poly(front)});}
 slab('evidence' ,-65,-32,20,146,106,3.2);
 tube('interview-link',[-60,-32,40],[-60,-4,40]);
 slab('interview',-100,-2,12,45,76,3);
 tube('priorities-link',[78,-32,40],[97,-24,40]);
 slab('priorities',88,-22,12,48,72,3);
 slab('journey',-83,43,4,130,54,3,true);
 tube('usability-link',[18,-32,29],[18,36,29]);
 slab('usability',-20,38,10,72,64,3);
 const xs=extent.map(p=>p[0]),ys=extent.map(p=>p[1]),bounds={x:Math.min(...xs),y:Math.min(...ys),right:Math.max(...xs),bottom:Math.max(...ys)};
 const offset=[480-(bounds.x+bounds.right)/2,280-(bounds.y+bounds.bottom)/2],lines=[],tiles=[];
 for(let x=-360;x<=360;x+=20)lines.push(open([P(x,-360,-1),P(x,360,-1)]));
 for(let y=-360;y<=360;y+=20)lines.push(open([P(-360,y,-1),P(360,y,-1)]));
 for(let x=-340;x<=340;x+=20)for(let y=-340;y<=340;y+=20)if((x/20+y/20)%7===0)tiles.push(poly([P(x,y,-1),P(x+20,y,-1),P(x+20,y+20,-1),P(x,y+20,-1)]));
 return {width:960,height:560,bounds,offset,surfaces,parts:[...parts.filter(p=>!p.plane),...surfaces],ground:{lines,tiles}};
}
function mount({stage,svg,read}){const bag=HL.disposer(),s=makeResearchHeroScene(HL),root=HL.mk('g',{transform:`translate(${200+(s.offset[0]-480)*.4} ${160+(s.offset[1]-280)*.4}) scale(.4)`},svg);HL.mk('path',{d:s.ground.lines.join(''),class:'lo nf'},root);s.parts.forEach(p=>HL.mk('path',{d:p.silhouette,class:'sil'},root));const clock=HL.register(stage,()=>false);bag.add(clock.unregister);bag.add(HL.pointer(stage,{move(){read.textContent='evidence, friction, priorities';},leave(){read.textContent='rest';}}));bag.add(()=>svg.replaceChildren());read.textContent='rest';return{set(){},destroy:bag.dispose};}
hairline({name:'service-research-hero',means:'A research evidence board, interview notes, journey map and usability review lead to prioritised findings.',rules:[6,9],range:[0,.5,1],tour:[[100,220],[200,120],[300,150],null],mount});
