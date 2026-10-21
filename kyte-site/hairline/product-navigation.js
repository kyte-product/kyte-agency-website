/** A sitemap, nested menu and page preview make a complex information space legible. */
function makeNavigationScene(HL){
 const {Cam,proj,rrect,hull,poly,open}=HL,S=1.44,P=proj(Cam(-45,.5,S)),extent=[],surfaces=[];
 function slab(id,x,y,z,w,h,depth){
  const ring=rrect(0,0,w,h,3,16),F=(u,v)=>P(x+w*u,y,z+h*(1-v));
  const front=ring.map(q=>F(q.u/w,q.v/h)),back=ring.map(q=>P(x+q.u,y-depth,z+h-q.v));extent.push(...front,...back);
  const s={id,silhouette:poly(hull([...front,...back])),face:poly(front),plane:{p0:F(0,0),p1:F(1,0),p3:F(0,1),width:w*10,height:h*10}};surfaces.push(s);return s;
 }
 slab('backpage',62,-5,19,43,62,2.8);
 slab('workspace',-67,-23,18,128,96,3.2);
 slab('menu',-95,20,6,43,71,2.8);
 slab('page',57,22,6,48,64,2.8);
 const xs=extent.map(p=>p[0]),ys=extent.map(p=>p[1]),bounds={x:Math.min(...xs),y:Math.min(...ys),right:Math.max(...xs),bottom:Math.max(...ys)};
 const offset=[200-(bounds.x+bounds.right)/2,140-(bounds.y+bounds.bottom)/2],lines=[],tiles=[];
 for(let x=-240;x<=240;x+=24)lines.push(open([P(x,-240,-1),P(x,240,-1)]));
 for(let y=-240;y<=240;y+=24)lines.push(open([P(-240,y,-1),P(240,y,-1)]));
 for(let x=-216;x<=216;x+=24)for(let y=-216;y<=216;y+=24)if((x/24+y/24)%5===0)tiles.push(poly([P(x,y,-1),P(x+24,y,-1),P(x+24,y+24,-1),P(x,y+24,-1)]));
 return {width:400,height:280,bounds,offset,surfaces,ground:{lines,tiles}};
}
function mount({stage,svg,read}){const bag=HL.disposer(),s=makeNavigationScene(HL),root=HL.mk('g',{transform:`translate(${s.offset[0]} ${s.offset[1]+20})`},svg);HL.mk('path',{d:s.ground.lines.join(''),class:'lo nf'},root);s.surfaces.forEach(p=>HL.mk('path',{d:p.silhouette,class:'sil'},root));const clock=HL.register(stage,()=>false);bag.add(clock.unregister);bag.add(HL.pointer(stage,{move(){read.textContent='from a clear hierarchy to a findable page';},leave(){read.textContent='rest';}}));bag.add(()=>svg.replaceChildren());read.textContent='rest';return{set(){},destroy:bag.dispose};}
hairline({name:'product-navigation',means:'A structured sitemap, nested menu and selected page preview share one coherent perspective.',rules:[6,9],range:[0,.5,1],tour:[[100,220],[200,120],[300,150],null],mount});
