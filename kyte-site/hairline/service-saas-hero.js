/** A SaaS workspace brings automation, shared data and task states together. */
function makeSaasHeroScene(HL){
 const {Cam,proj,rrect,hull,poly,open,fillet}=HL,S=2.33,P=proj(Cam(45,.5,S)),extent=[],surfaces=[],parts=[];
 const record=o=>{parts.push(o);if(o.plane&&['workspace','automation','database','queue'].includes(o.id))surfaces.push(o);else delete o.plane;return o};
 function slab(id,x,y,z,w,h,depth,r=4){const ring=rrect(0,0,w,h,r,22),F=(u,v)=>P(x+w*u,y+h*v,z),top=ring.map(q=>F(q.u/w,q.v/h)),bottom=ring.map(q=>P(x+q.u,y+q.v,z-depth));extent.push(...top,...bottom);return record({id,silhouette:poly(hull([...top,...bottom])),face:poly(top),plane:{p0:F(0,0),p1:F(1,0),p3:F(0,1),width:w*10,height:h*10}})}
 function cube(){const x=-150,y=-63,w=44,d=44,h=62,pts=[P(x,y,0),P(x+w,y,0),P(x+w,y+d,0),P(x,y+d,0),P(x,y,h),P(x+w,y,h),P(x+w,y+d,h),P(x,y+d,h)],outline=hull(pts),F=(u,v)=>P(x+w*u,y+d,h*(1-v));extent.push(...pts);record({id:'automation',silhouette:poly(fillet(outline,outline.map(()=>5),20)),face:poly([F(0,0),F(1,0),F(1,1),F(0,1)]),top:poly([pts[4],pts[5],pts[6],pts[7]]),seam:open([P(x+1.5,y+d-1.5,h),P(x+w-1.5,y+d-1.5,h)]),plane:{p0:F(0,0),p1:F(1,0),p3:F(0,1),width:440,height:620}})}
 function database(){const cx=110,cy=-70,r=25,z=58,ring=zz=>Array.from({length:144},(_,i)=>{const a=i/144*Math.PI*2;return P(cx+r*Math.cos(a),cy+r*Math.sin(a),zz)}),top=ring(z),bottom=ring(0),F=(u,v)=>P(cx-r+2*r*u,cy-r+2*r*v,z);extent.push(...top,...bottom);const seam=[18,37].map(zz=>open(Array.from({length:97},(_,i)=>{const a=-Math.PI/4+.05+i/96*(Math.PI-.1);return P(cx+r*Math.cos(a),cy+r*Math.sin(a),zz)}))).join('');record({id:'database',silhouette:poly(hull([...top,...bottom])),face:poly(top),seam,plane:{p0:F(0,0),p1:F(1,0),p3:F(0,1),width:500,height:500}})}
 slab('automation-link',-116,-35,8,60,18,8);slab('data-link',52,-65,8,50,20,8);slab('queue-link',25,40,8,18,48,8);
 cube();database();
 slab('foundation',-70,-49,12,140,98,12,5);
 slab('plinth',-57,-36,20,114,72,8,4);
 slab('workspace',-64,-43,30,128,86,10,4);
 slab('queue-under',-3,80,6,78,42,6,4);slab('queue',-3,80,14,78,42,8,4);
 const xs=extent.map(p=>p[0]),ys=extent.map(p=>p[1]),bounds={x:Math.min(...xs),y:Math.min(...ys),right:Math.max(...xs),bottom:Math.max(...ys)},offset=[480-(bounds.x+bounds.right)/2,280-(bounds.y+bounds.bottom)/2],lines=[],tiles=[];
 for(let x=-360;x<=360;x+=20)lines.push(open([P(x,-360,-1),P(x,360,-1)]));for(let y=-360;y<=360;y+=20)lines.push(open([P(-360,y,-1),P(360,y,-1)]));for(let x=-340;x<=340;x+=20)for(let y=-340;y<=340;y+=20)if((x/20+y/20)%7===0)tiles.push(poly([P(x,y,-1),P(x+20,y,-1),P(x+20,y+20,-1),P(x,y+20,-1)]));
 return {width:960,height:560,bounds,offset,surfaces,parts,ground:{lines,tiles}};
}
function mount({stage,svg,read}){const bag=HL.disposer(),s=makeSaasHeroScene(HL),root=HL.mk('g',{transform:`translate(${200+(s.offset[0]-480)*.4} ${160+(s.offset[1]-280)*.4}) scale(.4)`},svg);HL.mk('path',{d:s.ground.lines.join(''),class:'lo nf'},root);s.parts.forEach(p=>HL.mk('path',{d:p.silhouette,class:'sil'},root));const clock=HL.register(stage,()=>false);bag.add(clock.unregister);bag.add(HL.pointer(stage,{move(){read.textContent='automation, shared data, workflow, completed tasks';},leave(){read.textContent='rest';}}));bag.add(()=>svg.replaceChildren());read.textContent='rest';return{set(){},destroy:bag.dispose};}
hairline({name:'service-saas-hero',means:'A tiered workflow table connects automation, shared data and a completed-task stack.',rules:[6,9],range:[0,.5,1],tour:[[100,220],[200,120],[300,150],null],mount});
