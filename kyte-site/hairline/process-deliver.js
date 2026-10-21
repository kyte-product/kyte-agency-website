/** A finished handoff kit with a completed-document seal. */
function makeProcessDeliverScene(HL){
 const {Cam,proj,rrect,hull,fillet,poly,open}=HL,P=proj(Cam(45,.5,2.71)),parts=[],extent=[];
 const x=-36,y=-26,w=72,d=56,h=49,pts=[P(x,y,0),P(x+w,y,0),P(x+w,y+d,0),P(x,y+d,0),P(x,y,h),P(x+w,y,h),P(x+w,y+d,h),P(x,y+d,h)],outline=hull(pts),F=(u,v)=>P(x+w*u,y+d,h*(1-v));extent.push(...pts);
 const kit={id:'handoff-kit',silhouette:poly(fillet(outline,outline.map(()=>4),18)),face:poly([F(0,0),F(1,0),F(1,1),F(0,1)]),top:poly([pts[4],pts[5],pts[6],pts[7]]),seam:open([P(x+1.5,y+d-1.5,h),P(x+w-1.5,y+d-1.5,h)])};parts.push(kit);
 const cx=0,cz=24,r=13.2;kit.accent=poly(Array.from({length:144},(_,i)=>{const a=i*Math.PI/72;return P(cx+r*Math.cos(a),y+d,cz+r*Math.sin(a))}));kit.color={p0:P(cx-r,y+d,cz+r),p1:P(cx+r,y+d,cz+r),p3:P(cx-r,y+d,cz-r)};kit.icon={p0:P(-8,y+d,31),p1:P(8,y+d,31),p3:P(-8,y+d,17)};
 function sheet(id,xx,yy,z,ww,hh){const ring=rrect(0,0,ww,hh,3,20),S=(u,v)=>P(xx+ww*u,yy+hh*v,z),front=ring.map(q=>S(q.u/ww,q.v/hh)),rear=ring.map(q=>P(xx+q.u,yy+q.v,z-3));extent.push(...front,...rear);const o={id,silhouette:poly(hull([...front,...rear])),face:poly(front),F:S};parts.push(o);return o;}
 sheet('handoff-notes-back',-29,-24,53,50,38);
 const note=sheet('handoff-notes',-22,-17,57,50,38),rect=(a,b,ww,hh)=>poly(rrect(a,b,a+ww,b+hh,1.2,12).map(q=>note.F(q.u/50,q.v/38)));
 note.details=[rect(7,7,16,10),rect(7,23,35,2.5),rect(7,29,26,2.5)];
 const xs=extent.map(p=>p[0]),ys=extent.map(p=>p[1]),bounds={x:Math.min(...xs),y:Math.min(...ys),right:Math.max(...xs),bottom:Math.max(...ys)},offset=[200-(bounds.x+bounds.right)/2,160-(bounds.y+bounds.bottom)/2],lines=[];
 for(let q=-160;q<=160;q+=20){lines.push(open([P(q,-160,0),P(q,160,0)]));lines.push(open([P(-160,q,0),P(160,q,0)]));}
 return{width:400,height:320,bounds,offset,parts,lines};
}
function mount({stage,svg,read}){const bag=HL.disposer(),s=makeProcessDeliverScene(HL),g=HL.mk('g',{transform:`translate(${s.offset})`},svg);for(const p of s.parts)HL.mk('path',{d:p.silhouette,class:'sil'},g);const clock=HL.register(stage,()=>false);bag.add(clock.unregister);bag.add(HL.pointer(stage,{move(){read.textContent='completed work, ready to hand over';},leave(){read.textContent='rest';}}));bag.add(()=>svg.replaceChildren());read.textContent='rest';return{set(){},destroy:bag.dispose};}
hairline({name:'process-deliver',means:'A completed handoff kit carries a checked seal and organized documentation.',rules:[6,9],range:[0,.5,1],tour:[[170,140],[220,210],null],mount});
