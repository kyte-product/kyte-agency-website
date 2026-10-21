/** An exploded assembly shows components being built and refined. */
function makeProcessDevelopScene(HL){
 const {Cam,proj,rrect,hull,poly,open}=HL,P=proj(Cam(45,.5,2.28)),parts=[],extent=[];
 function plate(id,w,h,z,depth){const x=-w/2,y=-h/2,F=(u,v)=>P(x+w*u,y+h*v,z),ring=rrect(0,0,w,h,4,22),front=ring.map(q=>F(q.u/w,q.v/h)),rear=ring.map(q=>P(x+q.u,y+q.v,z-depth));extent.push(...front,...rear);const o={id,silhouette:poly(hull([...front,...rear])),face:poly(front),F};parts.push(o);return o;}
 plate('foundation',94,76,8,7);
 for(const [i,x,y] of [[0,-27,-20],[1,27,-20],[2,-27,20]]){const ring=z=>Array.from({length:60},(_,j)=>{const a=j*Math.PI/30;return P(x+1.5*Math.cos(a),y+1.5*Math.sin(a),z)}),top=ring(58),bottom=ring(8);parts.push({id:'alignment-'+i,silhouette:poly(hull([...top,...bottom])),face:poly(top)});extent.push(...top,...bottom);}
 const layer=plate('working-layer',84,66,33,5);layer.accent=layer.face;layer.color={p0:layer.F(0,0),p1:layer.F(1,0),p3:layer.F(0,1)};layer.palette='warm';
 const cap=plate('component-layer',72,54,63,5),rect=(x,y,w,h)=>poly(rrect(x,y,x+w,y+h,2,16).map(q=>cap.F(q.u/72,q.v/54)));
 cap.details=[rect(8,8,24,25),rect(39,8,25,11),rect(39,25,25,8),rect(8,40,42,3)];
 const xs=extent.map(p=>p[0]),ys=extent.map(p=>p[1]),bounds={x:Math.min(...xs),y:Math.min(...ys),right:Math.max(...xs),bottom:Math.max(...ys)},offset=[200-(bounds.x+bounds.right)/2,160-(bounds.y+bounds.bottom)/2],lines=[];
 for(let q=-160;q<=160;q+=20){lines.push(open([P(q,-160,0),P(q,160,0)]));lines.push(open([P(-160,q,0),P(160,q,0)]));}
 return{width:400,height:320,bounds,offset,parts,lines};
}
function mount({stage,svg,read}){const bag=HL.disposer(),s=makeProcessDevelopScene(HL),g=HL.mk('g',{transform:`translate(${s.offset})`},svg);for(const p of s.parts)HL.mk('path',{d:p.silhouette,class:'sil'},g);const clock=HL.register(stage,()=>false);bag.add(clock.unregister);bag.add(HL.pointer(stage,{move(){read.textContent='build, test and refine the parts';},leave(){read.textContent='rest';}}));bag.add(()=>svg.replaceChildren());read.textContent='rest';return{set(){},destroy:bag.dispose};}
hairline({name:'process-develop',means:'Three aligned layers show a modular system being assembled and refined.',rules:[6,9],range:[0,.5,1],tour:[[160,210],[220,120],null],mount});
