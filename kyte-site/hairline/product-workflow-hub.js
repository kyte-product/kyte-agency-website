/** A physical dashboard console coordinates intake, branching and completion. */
function makeWorkflowHubScene(HL){
 const {Cam,proj,rrect,hull,poly,open}=HL,S=1.38,P=proj(Cam(45,.5,S)),extent=[],surfaces=[],routes=[];
 function slab(id,x,y,w,h,z,depth,r=3){const F=(u,v)=>P(x+w*u,y+h*v,z),ring=rrect(0,0,w,h,r,18),top=ring.map(q=>F(q.u/w,q.v/h)),bottom=ring.map(q=>P(x+q.u,y+q.v,z-depth));extent.push(...top,...bottom);return{id,silhouette:poly(hull([...top,...bottom])),face:poly(top),plane:{p0:F(0,0),p1:F(1,0),p3:F(0,1),width:w*10,height:h*10}};}
 function cylinder(id,r,z,depth){const c=P(0,0,z),b=P(0,0,z-depth),rx=r*S,ry=r*S*.5,F=(u,v)=>P(-r+2*r*u,-r+2*r*v,z);extent.push([c[0]-rx,c[1]-ry],[b[0]+rx,b[1]+ry]);return{id,silhouette:`M${c[0]-rx} ${c[1]}A${rx} ${ry} 0 0 1 ${c[0]+rx} ${c[1]}L${b[0]+rx} ${b[1]}A${rx} ${ry} 0 0 1 ${b[0]-rx} ${b[1]}Z`,face:`M${c[0]-rx} ${c[1]}A${rx} ${ry} 0 1 0 ${c[0]+rx} ${c[1]}A${rx} ${ry} 0 1 0 ${c[0]-rx} ${c[1]}Z`,plane:{p0:F(0,0),p1:F(1,0),p3:F(0,1),width:r*20,height:r*20}};}
 routes.push(slab('route-x',-102,-7,204,14,7,4,5),slab('route-y',-7,-102,14,102,7,4,5));
 const routeLines=[open([P(-82,0,7.1),P(-48,0,7.1)]),open([P(0,-82,7.1),P(0,-48,7.1)]),open([P(48,0,7.1),P(82,0,7.1)])];
 const base=cylinder('base',49,13,10),hub=cylinder('console',44,28,12);
 surfaces.push(slab('routing',-21,-123,42,42,20,8,4),slab('intake',-123,-21,42,42,20,8,4),hub,slab('complete',81,-21,42,42,20,8,4),slab('queue-back',-18,64,56,38,6,3,3),slab('queue',-24,70,56,38,13,3,3));
 const xs=extent.map(p=>p[0]),ys=extent.map(p=>p[1]),bounds={x:Math.min(...xs),y:Math.min(...ys),right:Math.max(...xs),bottom:Math.max(...ys)};
 const offset=[200-(bounds.x+bounds.right)/2,140-(bounds.y+bounds.bottom)/2],lines=[],tiles=[];
 for(let x=-240;x<=240;x+=24)lines.push(open([P(x,-240,-1),P(x,240,-1)]));for(let y=-240;y<=240;y+=24)lines.push(open([P(-240,y,-1),P(240,y,-1)]));
 for(let x=-216;x<=216;x+=24)for(let y=-216;y<=216;y+=24)if((x/24+y/24)%5===0)tiles.push(poly([P(x,y,-1),P(x+24,y,-1),P(x+24,y+24,-1),P(x,y+24,-1)]));
 return{width:400,height:280,bounds,offset,surfaces,routes,routeLines,base,ground:{lines,tiles}};
}
function mount({stage,svg,read}){const bag=HL.disposer(),s=makeWorkflowHubScene(HL),root=HL.mk('g',{transform:`translate(${s.offset[0]} ${s.offset[1]+20})`},svg);HL.mk('path',{d:s.ground.lines.join(''),class:'lo nf'},root);[...s.routes,s.base,...s.surfaces].forEach(p=>HL.mk('path',{d:p.silhouette,class:'sil'},root));const clock=HL.register(stage,()=>false);bag.add(clock.unregister);bag.add(HL.pointer(stage,{move(){read.textContent='one overview across connected workflow states';},leave(){read.textContent='rest';}}));bag.add(()=>svg.replaceChildren());read.textContent='rest';return{set(){},destroy:bag.dispose};}
hairline({name:'product-workflow-hub',means:'A circular data console connects intake, routing and completion modules above a stack of tasks.',rules:[6,9],range:[0,.5,1],tour:[[100,120],[200,160],[300,220],null],mount});
