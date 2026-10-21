/** Website and component surfaces share one camera and measured HTML planes. */
function makeWebsiteScene(HL){
 const {Cam,proj,rrect,hull,poly,open}=HL,P=proj(Cam(-45,.5,1.77)),extent=[],surfaces=[];
 function slab(id,x,y,z,width,height,depth){
  const ring=rrect(0,0,width,height,2.6,14),F=(u,v)=>P(x+width*u,y,z+height*(1-v));
  const front=ring.map(q=>F(q.u/width,q.v/height)),back=ring.map(q=>P(x+q.u,y-depth,z+height-q.v)),outer=hull([...front,...back]);
  extent.push(...outer);
  const surface={id,silhouette:poly(outer),face:poly(front),plane:{p0:F(0,0),p1:F(1,0),p3:F(0,1),width:width*10,height:height*10}};
  surfaces.push(surface);return surface;
 }
 slab('browser',-70,-16,16,130,88,3.2);
 slab('component',5,10,4,52,58,2.8);
 const xs=extent.map(p=>p[0]),ys=extent.map(p=>p[1]),bounds={x:Math.min(...xs),y:Math.min(...ys),right:Math.max(...xs),bottom:Math.max(...ys)};
 const offset=[200-(bounds.x+bounds.right)/2,140-(bounds.y+bounds.bottom)/2],lines=[],tiles=[];
 for(let x=-240;x<=240;x+=24)lines.push(open([P(x,-240,-1),P(x,240,-1)]));
 for(let y=-240;y<=240;y+=24)lines.push(open([P(-240,y,-1),P(240,y,-1)]));
 for(let x=-216;x<=216;x+=24)for(let y=-216;y<=216;y+=24)if((x/24+y/24)%5===0)tiles.push(poly([P(x,y,-1),P(x+24,y,-1),P(x+24,y+24,-1),P(x,y+24,-1)]));
 return {width:400,height:280,bounds,offset,surfaces,ground:{lines,tiles}};
}
function mount({stage,svg,read}){
 const bag=HL.disposer(),scene=makeWebsiteScene(HL),root=HL.mk('g',{transform:`translate(${scene.offset[0]} ${scene.offset[1]+20})`},svg);
 HL.mk('path',{d:scene.ground.lines.join(''),class:'lo nf'},root);
 scene.surfaces.forEach(s=>HL.mk('path',{d:s.silhouette,class:'sil'},root));
 const clock=HL.register(stage,()=>false);bag.add(clock.unregister);
 bag.add(HL.pointer(stage,{move(){read.textContent='a page and its reusable component';},leave(){read.textContent='rest';}}));
 bag.add(()=>svg.replaceChildren());read.textContent='rest';return {set(){},destroy:bag.dispose};
}
hairline({name:'product-website-design',means:'A website page and a reusable component share one coherent interface.',rules:[6,9],range:[0,.5,1],tour:[[128,153],[206,108],[300,195],null],mount});
