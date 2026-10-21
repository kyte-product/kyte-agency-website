/** A folded editorial spread links discovery, reading and a next action. */
function makeContentJourneyScene(HL){
 const {Cam,proj,rrect,hull,poly,open,fillet}=HL,S=1.45,P=proj(Cam(45,.5,S)),extent=[],surfaces=[],routes=[];
 function slab(id,x,y,w,h,z,depth,r=3){const F=(u,v)=>P(x+w*u,y+h*v,z),ring=rrect(0,0,w,h,r,16),top=ring.map(q=>F(q.u/w,q.v/h)),bottom=ring.map(q=>P(x+q.u,y+q.v,z-depth));extent.push(...top,...bottom);return{id,silhouette:poly(hull([...top,...bottom])),face:poly(top),plane:{p0:F(0,0),p1:F(1,0),p3:F(0,1),width:w*10,height:h*10}};}
 const A=P(-70,-55,6),B=P(0,-55,22),C=P(70,-55,6),D=P(70,45,6),E=P(0,45,22),F=P(-70,45,6),Cb=P(70,-55,3),Db=P(70,45,3),Eb=P(0,45,19),Fb=P(-70,45,3);
 const round=pts=>poly(fillet(pts,pts.map(()=>1.8),12));
 const leaves=[{id:'discover',face:poly([A,B,E,F]),plane:{p0:A,p1:B,p3:F,width:700,height:1000}},{id:'read',face:poly([B,C,D,E]),plane:{p0:B,p1:C,p3:E,width:700,height:1000}}];
 const book={silhouette:round([A,B,C,Cb,Db,Eb,Fb,F]),leaves,seam:open([[B[0]*.97+E[0]*.03,B[1]*.97+E[1]*.03],[E[0]*.97+B[0]*.03,E[1]*.97+B[1]*.03]])};extent.push(A,B,C,D,E,F,Cb,Db,Eb,Fb);
 routes.push(slab('resource-route',-7,-107,14,66,4,3,5),slab('action-route',54,16,60,14,4,3,5));
 const routeLines=[open([P(0,-96,4.1),P(0,-59,4.1)]),open([P(74,23,4.1),P(100,23,4.1)])];
 surfaces.push(slab('resource',-30,-139,60,45,14,4,3),slab('action',93,0,43,48,12,4,3));
 const xs=extent.map(p=>p[0]),ys=extent.map(p=>p[1]),bounds={x:Math.min(...xs),y:Math.min(...ys),right:Math.max(...xs),bottom:Math.max(...ys)};
 const offset=[200-(bounds.x+bounds.right)/2,140-(bounds.y+bounds.bottom)/2],lines=[],tiles=[];
 for(let x=-240;x<=240;x+=24)lines.push(open([P(x,-240,-1),P(x,240,-1)]));for(let y=-240;y<=240;y+=24)lines.push(open([P(-240,y,-1),P(240,y,-1)]));
 for(let x=-216;x<=216;x+=24)for(let y=-216;y<=216;y+=24)if((x/24+y/24)%5===0)tiles.push(poly([P(x,y,-1),P(x+24,y,-1),P(x+24,y+24,-1),P(x,y+24,-1)]));
 return{width:400,height:280,bounds,offset,surfaces,routes,routeLines,book,ground:{lines,tiles}};
}
function mount({stage,svg,read}){const bag=HL.disposer(),s=makeContentJourneyScene(HL),root=HL.mk('g',{transform:`translate(${s.offset[0]} ${s.offset[1]+20})`},svg);HL.mk('path',{d:s.ground.lines.join(''),class:'lo nf'},root);[...s.routes,s.book,...s.surfaces].forEach(p=>HL.mk('path',{d:p.silhouette,class:'sil'},root));HL.mk('path',{d:s.book.seam,class:'lo nf'},root);const clock=HL.register(stage,()=>false);bag.add(clock.unregister);bag.add(HL.pointer(stage,{move(){read.textContent='from finding a story to taking the next step';},leave(){read.textContent='rest';}}));bag.add(()=>svg.replaceChildren());read.textContent='rest';return{set(){},destroy:bag.dispose};}
hairline({name:'product-content-journey',means:'A folded editorial spread connects discovery, reading and a next action through raised paths.',rules:[6,9],range:[0,.5,1],tour:[[110,190],[210,150],[305,205],null],mount});
