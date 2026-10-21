/** A product catalogue links to checkout, a parcel and a confirmation hub. */
function makeCommerceHeroScene(HL){
 const {Cam,proj,rrect,hull,poly,open,fillet}=HL,S=2.32,P=proj(Cam(45,.5,S)),extent=[],surfaces=[],parts=[];
 const record=o=>{parts.push(o);if(o.plane&&['storefront','checkout','parcel','confirmation'].includes(o.id))surfaces.push(o);else delete o.plane;return o};
 function slab(id,x,y,z,w,h,depth,flat=true,r=4){const ring=rrect(0,0,w,h,r,24),F=(u,v)=>flat?P(x+w*u,y+h*v,z):P(x+w*u,y,z+h*(1-v)),front=ring.map(q=>F(q.u/w,q.v/h)),back=ring.map(q=>flat?P(x+q.u,y+q.v,z-depth):P(x+q.u,y-depth,z+h-q.v));extent.push(...front,...back);return record({id,silhouette:poly(hull([...front,...back])),face:poly(front),plane:{p0:F(0,0),p1:F(1,0),p3:F(0,1),width:w*10,height:h*10}})}
 function parcel(){const x=-65,y=52,w=46,d=46,h=46,pts=[P(x,y,0),P(x+w,y,0),P(x+w,y+d,0),P(x,y+d,0),P(x,y,h),P(x+w,y,h),P(x+w,y+d,h),P(x,y+d,h)],outline=hull(pts),F=(u,v)=>P(x+w*u,y+d,h*(1-v));extent.push(...pts);record({id:'parcel',silhouette:poly(fillet(outline,outline.map(()=>5),20)),face:poly([F(0,0),F(1,0),F(1,1),F(0,1)]),top:poly([pts[4],pts[5],pts[6],pts[7]]),seam:open([P(x+1.5,y+d-1.5,h),P(x+w-1.5,y+d-1.5,h)]),plane:{p0:F(0,0),p1:F(1,0),p3:F(0,1),width:460,height:460}})}
 function confirmation(){const cx=105,cy=82,r=23,h=12,ring=z=>Array.from({length:144},(_,i)=>{const a=i/144*Math.PI*2;return P(cx+r*Math.cos(a),cy+r*Math.sin(a),z)}),top=ring(h),bottom=ring(0),F=(u,v)=>P(cx-r+2*r*u,cy-r+2*r*v,h);extent.push(...top,...bottom);record({id:'confirmation',silhouette:poly(hull([...top,...bottom])),face:poly(top),plane:{p0:F(0,0),p1:F(1,0),p3:F(0,1),width:460,height:460}});}
 slab('checkout-link',20,-10,6,71,18,6);slab('parcel-link',-45,-12,6,18,74,6);slab('order-link',96,40,6,18,35,6);
 slab('store-base',-60,-37.25,10,90,30,10);
 // Display, neck and foot share the world-space center (-15, -22.25).
 slab('center-stand',-26,-20,10,22,9,4.5,false,2);
 slab('storefront',-80,-20,18,130,80,4.5,false);
 slab('checkout',76,-40,12,64,90,7);
 parcel();confirmation();
 const xs=extent.map(p=>p[0]),ys=extent.map(p=>p[1]),bounds={x:Math.min(...xs),y:Math.min(...ys),right:Math.max(...xs),bottom:Math.max(...ys)},offset=[480-(bounds.x+bounds.right)/2,280-(bounds.y+bounds.bottom)/2],lines=[],tiles=[];
 for(let x=-360;x<=360;x+=20)lines.push(open([P(x,-360,-1),P(x,360,-1)]));for(let y=-360;y<=360;y+=20)lines.push(open([P(-360,y,-1),P(360,y,-1)]));for(let x=-340;x<=340;x+=20)for(let y=-340;y<=340;y+=20)if((x/20+y/20)%7===0)tiles.push(poly([P(x,y,-1),P(x+20,y,-1),P(x+20,y+20,-1),P(x,y+20,-1)]));
 return {width:960,height:560,bounds,offset,surfaces,parts,ground:{lines,tiles}};
}
function mount({stage,svg,read}){const bag=HL.disposer(),s=makeCommerceHeroScene(HL),root=HL.mk('g',{transform:`translate(${200+(s.offset[0]-480)*.4} ${160+(s.offset[1]-280)*.4}) scale(.4)`},svg);HL.mk('path',{d:s.ground.lines.join(''),class:'lo nf'},root);s.parts.forEach(p=>HL.mk('path',{d:p.silhouette,class:'sil'},root));const clock=HL.register(stage,()=>false);bag.add(clock.unregister);bag.add(HL.pointer(stage,{move(){read.textContent='products, checkout, order, fulfillment';},leave(){read.textContent='rest';}}));bag.add(()=>svg.replaceChildren());read.textContent='rest';return{set(){},destroy:bag.dispose};}
hairline({name:'service-commerce-hero',means:'A product catalogue connects checkout, a parcel and an order-confirmation hub.',rules:[6,9],range:[0,.5,1],tour:[[100,220],[200,120],[300,150],null],mount});
