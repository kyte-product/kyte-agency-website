/** A handset, lifted interaction, and two round controls share one ground plane. */
function makeMobileScene(HL){
 const {Cam,proj,rrect,hull,poly,open}=HL,S=1.70,P=proj(Cam(45,.5,S)),surfaces=[],disks=[],extent=[];
 function slab(id,x,y,w,h,z,depth,radius){
  const ring=rrect(0,0,w,h,radius,16),F=(u,v)=>P(x+w*u,y+h*v,z);
  const top=ring.map(q=>F(q.u/w,q.v/h)),bottom=ring.map(q=>P(x+q.u,y+q.v,z-depth)),outer=hull([...top,...bottom]);
  extent.push(...outer);
  const s={id,silhouette:poly(outer),face:poly(top),plane:{p0:F(0,0),p1:F(1,0),p3:F(0,1),width:w*10,height:h*10}};
  surfaces.push(s);return s;
 }
 slab('phone',-38,-65,76,130,8,5,4.5);
 function disk(z){
  const center=P(92,-3,z),bottom=P(92,-3,z-4),rx=14*S,ry=7*S;
  const silhouette=`M${center[0]-rx} ${center[1]}A${rx} ${ry} 0 0 1 ${center[0]+rx} ${center[1]}L${bottom[0]+rx} ${bottom[1]}A${rx} ${ry} 0 0 1 ${bottom[0]-rx} ${bottom[1]}Z`;
  const face=`M${center[0]-rx} ${center[1]}A${rx} ${ry} 0 1 0 ${center[0]+rx} ${center[1]}A${rx} ${ry} 0 1 0 ${center[0]-rx} ${center[1]}Z`;
  extent.push([center[0]-rx,center[1]-ry],[center[0]+rx,bottom[1]+ry]);disks.push({silhouette,face});
 }
 disk(4);disk(10);
 slab('interaction',-34,-42,68,48,34,1.6,2.8);
 const xs=extent.map(p=>p[0]),ys=extent.map(p=>p[1]),bounds={x:Math.min(...xs),y:Math.min(...ys),right:Math.max(...xs),bottom:Math.max(...ys)};
 const offset=[200-(bounds.x+bounds.right)/2,140-(bounds.y+bounds.bottom)/2],lines=[],tiles=[];
 for(let x=-240;x<=240;x+=24)lines.push(open([P(x,-240,-1),P(x,240,-1)]));
 for(let y=-240;y<=240;y+=24)lines.push(open([P(-240,y,-1),P(240,y,-1)]));
 for(let x=-216;x<=216;x+=24)for(let y=-216;y<=216;y+=24)if((x/24+y/24)%5===0)tiles.push(poly([P(x,y,-1),P(x+24,y,-1),P(x+24,y+24,-1),P(x,y+24,-1)]));
 return {width:400,height:280,bounds,offset,surfaces,disks,ground:{lines,tiles}};
}
function mount({stage,svg,read}){
 const bag=HL.disposer(),scene=makeMobileScene(HL),root=HL.mk('g',{transform:`translate(${scene.offset[0]} ${scene.offset[1]+20})`},svg);
 HL.mk('path',{d:scene.ground.lines.join(''),class:'lo nf'},root);
 HL.mk('path',{d:scene.surfaces[0].silhouette,class:'sil'},root);
 scene.disks.forEach(s=>HL.mk('path',{d:s.silhouette,class:'sil'},root));
 HL.mk('path',{d:scene.surfaces[1].silhouette,class:'sil'},root);
 const clock=HL.register(stage,()=>false);bag.add(clock.unregister);
 bag.add(HL.pointer(stage,{move(){read.textContent='an interaction lifted into focus';},leave(){read.textContent='rest';}}));
 bag.add(()=>svg.replaceChildren());read.textContent='rest';return {set(){},destroy:bag.dispose};
}
hairline({name:'product-mobile-app',means:'A mobile interaction lifts above its handset, beside two circular controls.',rules:[6,9],range:[0,.5,1],tour:[[160,130],[250,210],[308,190],null],mount});
