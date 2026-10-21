/** Reusable visual tokens and controls assemble into a complete interface pattern. */
function makeDesignPatternsScene(HL){
 const {Cam,proj,rrect,hull,poly,open}=HL,S=1.52,P=proj(Cam(45,.5,S)),extent=[],surfaces=[];
 function slab(id,x,y,w,h,z,depth,r=3){const F=(u,v)=>P(x+w*u,y+h*v,z),ring=rrect(0,0,w,h,r,18),top=ring.map(q=>F(q.u/w,q.v/h)),bottom=ring.map(q=>P(x+q.u,y+q.v,z-depth));extent.push(...top,...bottom);return{id,silhouette:poly(hull([...top,...bottom])),face:poly(top),plane:{p0:F(0,0),p1:F(1,0),p3:F(0,1),width:w*10,height:h*10}};}
 surfaces.push(slab('foundation',-48,-38,104,100,8,6,4),slab('library',-35,-25,90,80,38,4,3),slab('tokens',-85,-27,30,82,42,4,3),slab('pattern',-5,-35,65,67,76,3,3));
 const guides=[[-29,-19],[-29,49],[49,49]].map(([x,y])=>open([P(x,y,10),P(x,y,33)]));
 const xs=extent.map(p=>p[0]),ys=extent.map(p=>p[1]),bounds={x:Math.min(...xs),y:Math.min(...ys),right:Math.max(...xs),bottom:Math.max(...ys)};
 const offset=[200-(bounds.x+bounds.right)/2,140-(bounds.y+bounds.bottom)/2],lines=[],tiles=[];
 for(let x=-240;x<=240;x+=24)lines.push(open([P(x,-240,-1),P(x,240,-1)]));for(let y=-240;y<=240;y+=24)lines.push(open([P(-240,y,-1),P(240,y,-1)]));
 for(let x=-216;x<=216;x+=24)for(let y=-216;y<=216;y+=24)if((x/24+y/24)%5===0)tiles.push(poly([P(x,y,-1),P(x+24,y,-1),P(x+24,y+24,-1),P(x,y+24,-1)]));
 return{width:400,height:280,bounds,offset,surfaces,guides,ground:{lines,tiles}};
}
function mount({stage,svg,read}){const bag=HL.disposer(),s=makeDesignPatternsScene(HL),root=HL.mk('g',{transform:`translate(${s.offset[0]} ${s.offset[1]+20})`},svg);HL.mk('path',{d:s.ground.lines.join(''),class:'lo nf'},root);s.surfaces.forEach(p=>HL.mk('path',{d:p.silhouette,class:'sil'},root));const clock=HL.register(stage,()=>false);bag.add(clock.unregister);bag.add(HL.pointer(stage,{move(){read.textContent='from reusable tokens to a consistent interface';},leave(){read.textContent='rest';}}));bag.add(()=>svg.replaceChildren());read.textContent='rest';return{set(){},destroy:bag.dispose};}
hairline({name:'product-design-patterns',means:'Type and color tokens, reusable controls and an assembled interface float above a shared foundation.',rules:[6,9],range:[0,.5,1],tour:[[105,180],[200,200],[260,90],null],mount});
