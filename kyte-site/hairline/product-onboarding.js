/** A guided setup workspace progresses from profile to an activated account. */
function makeOnboardingScene(HL){
 const {Cam,proj,rrect,hull,poly,open}=HL,S=1.54,P=proj(Cam(-45,.5,S)),extent=[],surfaces=[];
 function slab(id,x,y,z,w,h,depth){
  const ring=rrect(0,0,w,h,3,16),F=(u,v)=>P(x+w*u,y,z+h*(1-v));
  const front=ring.map(q=>F(q.u/w,q.v/h)),back=ring.map(q=>P(x+q.u,y-depth,z+h-q.v));extent.push(...front,...back);
  const s={id,silhouette:poly(hull([...front,...back])),face:poly(front),plane:{p0:F(0,0),p1:F(1,0),p3:F(0,1),width:w*10,height:h*10}};surfaces.push(s);return s;
 }
 const trackRing=rrect(-104,-26,116,-6,9,18),trackTop=trackRing.map(q=>P(q.u,q.v,3)),trackBottom=trackRing.map(q=>P(q.u,q.v,0));extent.push(...trackTop,...trackBottom);
 const track={silhouette:poly(hull([...trackTop,...trackBottom])),face:poly(trackTop),line:open([P(-90,-16,3.1),P(102,-16,3.1)])};
 const milestones=[-87,0,98].map(x=>{const c=P(x,-16,6),b=P(x,-16,3),rx=6*S,ry=3*S;extent.push([c[0]-rx,c[1]-ry],[b[0]+rx,b[1]+ry]);return{face:`M${c[0]-rx} ${c[1]}a${rx} ${ry} 0 1 0 ${2*rx} 0a${rx} ${ry} 0 1 0 ${-2*rx} 0Z`,silhouette:`M${c[0]-rx} ${c[1]}A${rx} ${ry} 0 0 1 ${c[0]+rx} ${c[1]}L${b[0]+rx} ${b[1]}A${rx} ${ry} 0 0 1 ${b[0]-rx} ${b[1]}Z`};});
 slab('complete',68,-16,24,42,49,3);
 slab('workspace',-61,-16,14,112,94,3.2);
 slab('profile',-91,20,8,42,62,2.8);
 slab('tasks',18,20,8,44,43,2.8);
 const xs=extent.map(p=>p[0]),ys=extent.map(p=>p[1]),bounds={x:Math.min(...xs),y:Math.min(...ys),right:Math.max(...xs),bottom:Math.max(...ys)};
 const offset=[200-(bounds.x+bounds.right)/2,140-(bounds.y+bounds.bottom)/2],lines=[],tiles=[];
 for(let x=-240;x<=240;x+=24)lines.push(open([P(x,-240,-1),P(x,240,-1)]));
 for(let y=-240;y<=240;y+=24)lines.push(open([P(-240,y,-1),P(240,y,-1)]));
 for(let x=-216;x<=216;x+=24)for(let y=-216;y<=216;y+=24)if((x/24+y/24)%5===0)tiles.push(poly([P(x,y,-1),P(x+24,y,-1),P(x+24,y+24,-1),P(x,y+24,-1)]));
 return {width:400,height:280,bounds,offset,surfaces,track,milestones,ground:{lines,tiles}};
}
function mount({stage,svg,read}){const bag=HL.disposer(),s=makeOnboardingScene(HL),root=HL.mk('g',{transform:`translate(${s.offset[0]} ${s.offset[1]+20})`},svg);HL.mk('path',{d:s.ground.lines.join(''),class:'lo nf'},root);[s.track,...s.milestones,...s.surfaces].forEach(p=>HL.mk('path',{d:p.silhouette,class:'sil'},root));const clock=HL.register(stage,()=>false);bag.add(clock.unregister);bag.add(HL.pointer(stage,{move(){read.textContent='from a first profile to a ready workspace';},leave(){read.textContent='rest';}}));bag.add(()=>svg.replaceChildren());read.textContent='rest';return{set(){},destroy:bag.dispose};}
hairline({name:'product-onboarding',means:'A guided setup screen, profile form and completion panel sit above a connected milestone track.',rules:[6,9],range:[0,.5,1],tour:[[100,220],[200,120],[300,150],null],mount});
