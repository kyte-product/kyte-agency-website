/** One product interface adapts across a monitor, tablet and handset. */
function makeResponsiveExperienceScene(HL){
 const {Cam,proj,rrect,hull,poly,open}=HL,S=1.39,P=proj(Cam(-45,.5,S)),extent=[],surfaces=[],solids=[];
 function slab(id,x,y,w,h,z,depth,vertical,r=3){const F=(u,v)=>vertical?P(x+w*u,y,z+h*(1-v)):P(x+w*u,y+h*v,z),ring=rrect(0,0,w,h,r,18),front=ring.map(q=>F(q.u/w,q.v/h)),back=ring.map(q=>vertical?P(x+q.u,y-depth,z+h-q.v):P(x+q.u,y+q.v,z-depth));extent.push(...front,...back);return{id,silhouette:poly(hull([...front,...back])),face:poly(front),plane:{p0:F(0,0),p1:F(1,0),p3:F(0,1),width:w*10,height:h*10}};}
 solids.push(slab('foot',-24,-45,48,30,6,4,false,4),slab('neck',-7,-32,14,22,6,3,true,2));
 surfaces.push(slab('desktop',-66,-30,132,72,28,3.2,true,3),slab('tablet',-82,12,46,58,8,4,false,4),slab('phone',62,20,31,63,6,3,true,4));
 const xs=extent.map(p=>p[0]),ys=extent.map(p=>p[1]),bounds={x:Math.min(...xs),y:Math.min(...ys),right:Math.max(...xs),bottom:Math.max(...ys)};
 const offset=[200-(bounds.x+bounds.right)/2,140-(bounds.y+bounds.bottom)/2],lines=[],tiles=[];
 for(let x=-240;x<=240;x+=24)lines.push(open([P(x,-240,-1),P(x,240,-1)]));for(let y=-240;y<=240;y+=24)lines.push(open([P(-240,y,-1),P(240,y,-1)]));
 for(let x=-216;x<=216;x+=24)for(let y=-216;y<=216;y+=24)if((x/24+y/24)%5===0)tiles.push(poly([P(x,y,-1),P(x+24,y,-1),P(x+24,y+24,-1),P(x,y+24,-1)]));
 return{width:400,height:280,bounds,offset,surfaces,solids,ground:{lines,tiles}};
}
function mount({stage,svg,read}){const bag=HL.disposer(),s=makeResponsiveExperienceScene(HL),root=HL.mk('g',{transform:`translate(${s.offset[0]} ${s.offset[1]+20})`},svg);HL.mk('path',{d:s.ground.lines.join(''),class:'lo nf'},root);[...s.solids,...s.surfaces].forEach(p=>HL.mk('path',{d:p.silhouette,class:'sil'},root));const clock=HL.register(stage,()=>false);bag.add(clock.unregister);bag.add(HL.pointer(stage,{move(){read.textContent='one coherent product across three viewport sizes';},leave(){read.textContent='rest';}}));bag.add(()=>svg.replaceChildren());read.textContent='rest';return{set(){},destroy:bag.dispose};}
hairline({name:'product-responsive-experience',means:'A shared product layout reflows across a desktop monitor, tablet and phone in one device family.',rules:[6,9],range:[0,.5,1],tour:[[135,90],[180,220],[300,170],null],mount});
