/** Separate inputs resolve into one focused brief. */
function makeProcessDefineScene(HL){
 const {Cam,proj,rrect,hull,fillet,poly,open}=HL,P=proj(Cam(45,.5,2.1)),parts=[],extent=[];
 const rounded=pts=>poly(fillet(pts,pts.map(()=>3),16));
 const hex=Array.from({length:6},(_,i)=>{const a=(i*60+30)*Math.PI/180;return[53*Math.cos(a),53*Math.sin(a)]}),top=hex.map(([x,y])=>P(x,y,9)),bottom=hex.map(([x,y])=>P(x,y,1));extent.push(...top,...bottom);parts.push({id:'foundation',silhouette:rounded(hull([...top,...bottom])),face:rounded(top)});
 function slab(id,x,y,z,w,h,depth,flat=true){const F=(u,v)=>flat?P(x+w*u,y+h*v,z):P(x+w*u,y,z+h*(1-v)),ring=rrect(0,0,w,h,3,20),front=ring.map(q=>F(q.u/w,q.v/h)),back=ring.map(q=>flat?P(x+q.u,y+q.v,z-depth):P(x+q.u,y-depth,z+h-q.v));extent.push(...front,...back);const o={id,silhouette:poly(hull([...front,...back])),face:poly(front),F};parts.push(o);return o;}
 slab('left-link',-24,-14,12,5,26,3);slab('right-link',18,-14,12,5,26,3);
 const brief=slab('brief',-32,-14,9,64,76,3.5,false),rect=(x,y,w,h,r=1.5)=>poly(rrect(x,y,x+w,y+h,r,14).map(q=>brief.F(q.u/64,q.v/76)));
 brief.accent=rect(7,8,50,27,2.3);brief.details=[rect(8,43,43,3),rect(8,52,35,3),rect(8,61,40,3)];brief.icon={p0:brief.F(23/64,14/76),p1:brief.F(41/64,14/76),p3:brief.F(23/64,29/76)};brief.color={p0:brief.F(7/64,8/76),p1:brief.F(57/64,8/76),p3:brief.F(7/64,35/76)};
 const left=slab('input-one',-42,11,15,29,23,6),right=slab('input-two',10,13,15,29,23,6);
 for(const o of [left,right])o.details=[poly(rrect(6,6,23,9,1,12).map(q=>o.F(q.u/29,q.v/23))),poly(rrect(6,13,18,15,1,12).map(q=>o.F(q.u/29,q.v/23)))];
 const xs=extent.map(p=>p[0]),ys=extent.map(p=>p[1]),bounds={x:Math.min(...xs),y:Math.min(...ys),right:Math.max(...xs),bottom:Math.max(...ys)},offset=[200-(bounds.x+bounds.right)/2,160-(bounds.y+bounds.bottom)/2],lines=[];
 for(let q=-160;q<=160;q+=20){lines.push(open([P(q,-160,0),P(q,160,0)]));lines.push(open([P(-160,q,0),P(160,q,0)]));}
 return{width:400,height:320,bounds,offset,parts,lines};
}
function mount({stage,svg,read}){const bag=HL.disposer(),s=makeProcessDefineScene(HL),g=HL.mk('g',{transform:`translate(${s.offset})`},svg);for(const p of s.parts)HL.mk('path',{d:p.silhouette,class:'sil'},g);const clock=HL.register(stage,()=>false);bag.add(clock.unregister);bag.add(HL.pointer(stage,{move(){read.textContent='turn inputs into a focused brief';},leave(){read.textContent='rest';}}));bag.add(()=>svg.replaceChildren());read.textContent='rest';return{set(){},destroy:bag.dispose};}
hairline({name:'process-define',means:'Separate inputs connect to one clear brief on a shared foundation.',rules:[6,9],range:[0,.5,1],tour:[[150,220],[210,120],null],mount});
