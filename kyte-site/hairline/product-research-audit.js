/** A single finding lifted from a measured audit foundation. */
function makeResearchScene(HL){
  const {Cam,proj,hull,fillet,poly,open,rrect}=HL;
  const P=proj(Cam(45,.5,1.48)),shapes=[],extent=[];
  const lerp=(a,b,t)=>[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t];
  const round=points=>poly(fillet(points,points.map(()=>2.8),12));
  function box(id,x0,y0,x1,y1,z0,z1){
    const A=P(x0,y0,z0),B=P(x1,y0,z0),C=P(x1,y1,z0),D=P(x0,y1,z0);
    const a=P(x0,y0,z1),b=P(x1,y0,z1),c=P(x1,y1,z1),d=P(x0,y1,z1);
    const outline=hull([A,B,C,D,a,b,c,d]);extent.push(...outline);
    const seams=id==='finding'?[`M${lerp(d,c,.08)}L${lerp(c,d,.08)}Q${c} ${lerp(c,C,.06)}L${lerp(C,c,.07)}`,open([lerp(b,c,.08),lerp(c,b,.10)])]:[];
    const solid={id,silhouette:round(outline),faces:{left:poly([d,c,C,D]),right:poly([c,b,B,C]),top:poly([a,b,c,d])},seams,points:{A,B,C,D,a,b,c,d}};
    shapes.push(solid);return solid;
  }
  box('foundation',-58,-45,58,45,0,18);
  const footprint=poly(rrect(-27,-27,27,27,3,12).map(q=>P(q.u,q.v,18.1)));
  const finding=box('finding',-25,-25,25,25,42,92);
  const face=finding.points;
  const iconFrame={p0:lerp(lerp(face.c,face.b,.24),lerp(face.C,face.B,.24),.24),p1:lerp(lerp(face.c,face.b,.76),lerp(face.C,face.B,.76),.24),p3:lerp(lerp(face.c,face.b,.24),lerp(face.C,face.B,.24),.76)};
  const xs=extent.map(p=>p[0]),ys=extent.map(p=>p[1]);
  const bounds={x:Math.min(...xs),y:Math.min(...ys),right:Math.max(...xs),bottom:Math.max(...ys)};
  const offset=[200-(bounds.x+bounds.right)/2,140-(bounds.y+bounds.bottom)/2];
  const lines=[],tiles=[];
  for(let x=-240;x<=240;x+=24)lines.push(open([P(x,-240,-1),P(x,240,-1)]));
  for(let y=-240;y<=240;y+=24)lines.push(open([P(-240,y,-1),P(240,y,-1)]));
  for(let x=-216;x<=216;x+=24)for(let y=-216;y<=216;y+=24)if((x/24+y/24)%5===0)tiles.push(poly([P(x,y,-1),P(x+24,y,-1),P(x+24,y+24,-1),P(x,y+24,-1)]));
  return {width:400,height:280,offset,bounds,shapes,footprint,iconFrame,ground:{lines,tiles}};
}
function mount({stage,svg,read}){
  const bag=HL.disposer(),scene=makeResearchScene(HL),root=HL.mk('g',{transform:`translate(${scene.offset[0]} ${scene.offset[1]+20})`},svg);
  HL.mk('path',{d:scene.ground.lines.join(''),class:'lo nf'},root);
  scene.shapes.forEach(s=>{HL.mk('path',{d:s.silhouette,class:'sil'},root);s.seams.forEach(d=>HL.mk('path',{d,class:'lo nf'},root));});
  const clock=HL.register(stage,()=>false);bag.add(clock.unregister);
  bag.add(HL.pointer(stage,{move(){read.textContent='a finding brought into focus';},leave(){read.textContent='rest';}}));
  bag.add(()=>svg.replaceChildren());read.textContent='rest';return {set(){},destroy:bag.dispose};
}
hairline({name:'product-research-audit',means:'A focused finding rises from a structured research foundation.',rules:[6,9],range:[0,.5,1],tour:[[200,115],[136,217],[258,217],null],mount});
