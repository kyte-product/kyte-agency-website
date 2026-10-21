/** A website is assembled from content, development and publishing structures. */
function makeWebsiteHeroScene(HL){
 const {Cam,proj,rrect,hull,poly,open,fillet}=HL,S=2.53,P=proj(Cam(45,.5,S)),extent=[],surfaces=[],parts=[];
 const record=(o)=>{parts.push(o);if(o.plane&&['base','publish-link','page-under'].includes(o.id))delete o.plane;if(o.plane)surfaces.push(o);return o};
 function slab(id,x,y,z,w,h,depth,flat=false){const ring=rrect(0,0,w,h,3,20),F=(u,v)=>flat?P(x+w*u,y+h*v,z):P(x+w*u,y,z+h*(1-v)),front=ring.map(q=>F(q.u/w,q.v/h)),back=ring.map(q=>flat?P(x+q.u,y+q.v,z-depth):P(x+q.u,y-depth,z+h-q.v));extent.push(...front,...back);return record({id,silhouette:poly(hull([...front,...back])),face:poly(front),plane:{p0:F(0,0),p1:F(1,0),p3:F(0,1),width:w*10,height:h*10}})}
 function cube(id,x,y,w,d,h){const pts=[P(x,y,0),P(x+w,y,0),P(x+w,y+d,0),P(x,y+d,0),P(x,y,h),P(x+w,y,h),P(x+w,y+d,h),P(x,y+d,h)],outline=hull(pts),silhouette=poly(fillet(outline,outline.map(()=>5),20)),F=(u,v)=>P(x+w*u,y+d,h*(1-v));extent.push(...pts);return record({id,silhouette,face:poly([F(0,0),F(1,0),F(1,1),F(0,1)]),top:poly([pts[4],pts[5],pts[6],pts[7]]),seam:open([P(x+1.5,y+d-1.5,h),P(x+w-1.5,y+d-1.5,h)]),plane:{p0:F(0,0),p1:F(1,0),p3:F(0,1),width:w*10,height:h*10},...(id==='development'?{topPlane:{p0:P(x,y,h),p1:P(x+w,y,h),p3:P(x,y+d,h),width:w*10,height:d*10}}:{})})}
 function tubeX(id,x0,x1,y,z,r){const ring=x=>Array.from({length:100},(_,i)=>{const t=i/100*Math.PI*2;return P(x,y+r*Math.cos(t),z+r*Math.sin(t))}),a=ring(x0),b=ring(x1);extent.push(...a,...b);record({id,silhouette:poly(hull([...a,...b])),face:poly(a)});}
 function tube(id,x,y0,y1,z,r){const ring=y=>Array.from({length:100},(_,i)=>{const t=i/100*Math.PI*2;return P(x+r*Math.cos(t),y,z+r*Math.sin(t))}),a=ring(y0),b=ring(y1);extent.push(...a,...b);record({id,silhouette:poly(hull([...a,...b])),face:poly(a)});}
 cube('content',-150,-17,44,44,54);cube('development',28,-105,48,48,66);
 tubeX('content-collar',-106,-103,5,31,10);tubeX('content-link',-103,-70,5,31,7.5);
 tube('development-collar',52,-57,-54,36,10);tube('development-link',52,-54,6,36,7.5);
 slab('base',-83,-3,15,164,38,15,true);
 slab('browser',-78,5,18,146,90,3.4);
 // A raised, opaque path joins the browser base to the publishing hub.
 slab('publish-link',43,29,7,15,39,7,true);
 slab('page-under',-109,43,5,100,54,4,true);slab('page',-109,43,12,100,54,4,true);
 const cx=56,cy=83,r=25,z=15,ring=zz=>Array.from({length:144},(_,i)=>{const a=i/144*Math.PI*2;return P(cx+r*Math.cos(a),cy+r*Math.sin(a),zz)}),top=ring(z),bottom=ring(0);extent.push(...top,...bottom);const F=(u,v)=>P(cx-r+2*r*u,cy-r+2*r*v,z);record({id:'publish',silhouette:poly(hull([...top,...bottom])),face:poly(top),plane:{p0:F(0,0),p1:F(1,0),p3:F(0,1),width:500,height:500}});
 const xs=extent.map(p=>p[0]),ys=extent.map(p=>p[1]),bounds={x:Math.min(...xs),y:Math.min(...ys),right:Math.max(...xs),bottom:Math.max(...ys)},offset=[480-(bounds.x+bounds.right)/2,280-(bounds.y+bounds.bottom)/2],lines=[],tiles=[];
 for(let x=-360;x<=360;x+=20)lines.push(open([P(x,-360,-1),P(x,360,-1)]));for(let y=-360;y<=360;y+=20)lines.push(open([P(-360,y,-1),P(360,y,-1)]));for(let x=-340;x<=340;x+=20)for(let y=-340;y<=340;y+=20)if((x/20+y/20)%7===0)tiles.push(poly([P(x,y,-1),P(x+20,y,-1),P(x+20,y+20,-1),P(x,y+20,-1)]));
 return {width:960,height:560,bounds,offset,surfaces,parts,ground:{lines,tiles}};
}
function mount({stage,svg,read}){const bag=HL.disposer(),s=makeWebsiteHeroScene(HL),root=HL.mk('g',{transform:`translate(${200+(s.offset[0]-480)*.4} ${160+(s.offset[1]-280)*.4}) scale(.4)`},svg);HL.mk('path',{d:s.ground.lines.join(''),class:'lo nf'},root);s.parts.forEach(p=>HL.mk('path',{d:p.silhouette,class:'sil'},root));const clock=HL.register(stage,()=>false);bag.add(clock.unregister);bag.add(HL.pointer(stage,{move(){read.textContent='content, development, website, publishing';},leave(){read.textContent='rest';}}));bag.add(()=>svg.replaceChildren());read.textContent='rest';return{set(){},destroy:bag.dispose};}
hairline({name:'service-website-hero',means:'Content and development modules connect to a website assembly and a circular publishing hub.',rules:[6,9],range:[0,.5,1],tour:[[100,220],[200,120],[300,150],null],mount});
