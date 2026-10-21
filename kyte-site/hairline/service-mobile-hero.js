/** One mobile experience connects identity, notifications and task completion. */
function makeMobileHeroScene(HL){
 const {Cam,proj,rrect,hull,poly,open,fillet}=HL,S=3.15,P=proj(Cam(45,.5,S)),extent=[],surfaces=[],parts=[];
 const record=o=>{parts.push(o);if(o.plane&&!o.id.includes('link'))surfaces.push(o);else delete o.plane;return o};
 function slab(id,x,y,z,w,h,depth,r=4){const ring=rrect(0,0,w,h,r,24),F=(u,v)=>P(x+w*u,y+h*v,z),front=ring.map(q=>F(q.u/w,q.v/h)),back=ring.map(q=>P(x+q.u,y+q.v,z-depth));extent.push(...front,...back);return record({id,silhouette:poly(hull([...front,...back])),face:poly(front),plane:{p0:F(0,0),p1:F(1,0),p3:F(0,1),width:w*10,height:h*10}})}
 function pad(id,cx,cy,r,h,hex=false){let ring;if(hex){const corners=Array.from({length:6},(_,i)=>{const a=(i*60+30)*Math.PI/180;return [cx+r*Math.cos(a),cy+r*Math.sin(a)]});ring=fillet(corners,corners.map(()=>3),18).map(q=>({u:q[0],v:q[1]}));}else ring=Array.from({length:144},(_,i)=>({u:cx+r*Math.cos(i/144*Math.PI*2),v:cy+r*Math.sin(i/144*Math.PI*2)}));const top=ring.map(q=>P(q.u,q.v,h)),bottom=ring.map(q=>P(q.u,q.v,0)),F=(u,v)=>P(cx-r+2*r*u,cy-r+2*r*v,h);extent.push(...top,...bottom);return record({id,silhouette:poly(hull([...top,...bottom])),face:poly(top),plane:{p0:F(0,0),p1:F(1,0),p3:F(0,1),width:r*20,height:r*20}})}
 function arch(){const x=40,y=-38,w=52,h=68,r=26,ring=[];for(let i=0;i<=96;i++){const a=Math.PI-i/96*Math.PI;ring.push([r+r*Math.cos(a),r-r*Math.sin(a)]);}for(let i=0;i<=24;i++){const a=i/24*Math.PI/2;ring.push([w-3+3*Math.cos(a),h-3+3*Math.sin(a)]);}for(let i=0;i<=24;i++){const a=Math.PI/2+i/24*Math.PI/2;ring.push([3+3*Math.cos(a),h-3+3*Math.sin(a)]);}const F=(u,v)=>P(x+w*u,y,h*(1-v)),front=ring.map(q=>F(q[0]/w,q[1]/h)),back=ring.map(q=>P(x+q[0],y-9,h-q[1]));extent.push(...front,...back);record({id:'notifications',silhouette:poly(hull([...front,...back])),face:poly(front),plane:{p0:F(0,0),p1:F(1,0),p3:F(0,1),width:520,height:680}});}
 slab('identity-link',-77,-39,8,34,16,8,4);
 slab('notification-link',12,-39,7,53,17,7,4);
 slab('completion-link',13,56,7,47,18,7,4);
 pad('identity',-98,-41,28,20);
 arch();
 slab('phone',-50,-30,13,70,130,8,7);
 slab('interaction',-61,50,24,92,28,3.4,4);
 pad('completion',80,65,30,12,true);
 const xs=extent.map(p=>p[0]),ys=extent.map(p=>p[1]),bounds={x:Math.min(...xs),y:Math.min(...ys),right:Math.max(...xs),bottom:Math.max(...ys)},offset=[480-(bounds.x+bounds.right)/2,280-(bounds.y+bounds.bottom)/2],lines=[],tiles=[];
 for(let x=-360;x<=360;x+=20)lines.push(open([P(x,-360,-1),P(x,360,-1)]));for(let y=-360;y<=360;y+=20)lines.push(open([P(-360,y,-1),P(360,y,-1)]));for(let x=-340;x<=340;x+=20)for(let y=-340;y<=340;y+=20)if((x/20+y/20)%7===0)tiles.push(poly([P(x,y,-1),P(x+20,y,-1),P(x+20,y+20,-1),P(x,y+20,-1)]));
 return {width:960,height:560,bounds,offset,surfaces,parts,ground:{lines,tiles}};
}
function mount({stage,svg,read}){const bag=HL.disposer(),s=makeMobileHeroScene(HL),root=HL.mk('g',{transform:`translate(${200+(s.offset[0]-480)*.4} ${160+(s.offset[1]-280)*.4}) scale(.4)`},svg);HL.mk('path',{d:s.ground.lines.join(''),class:'lo nf'},root);s.parts.forEach(p=>HL.mk('path',{d:p.silhouette,class:'sil'},root));const clock=HL.register(stage,()=>false);bag.add(clock.unregister);bag.add(HL.pointer(stage,{move(){read.textContent='identity, interaction, notification, completion';},leave(){read.textContent='rest';}}));bag.add(()=>svg.replaceChildren());read.textContent='rest';return{set(){},destroy:bag.dispose};}
hairline({name:'service-mobile-hero',means:'A diagonal handset and floating interaction tile connect identity, notifications and completion modules.',rules:[6,9],range:[0,.5,1],tour:[[100,220],[200,120],[300,150],null],mount});
