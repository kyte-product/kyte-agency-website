/** Three simple bars communicate a growing platform at miniature size. */
function makeGrowthScene(HL){
 const {Cam,proj,hull,poly,fillet,open}=HL,P=proj(Cam(45,.5,1.27)),extent=[];
 const round=points=>poly(fillet(points,points.map(()=>1.9),12));
 const bars=[[-38,18],[-10,36],[18,58]].map(([x,h],i)=>{
  const A=P(x,-11,0),B=P(x+20,-11,0),C=P(x+20,9,0),D=P(x,9,0),a=P(x,-11,h),b=P(x+20,-11,h),c=P(x+20,9,h),d=P(x,9,h),outer=hull([A,B,C,D,a,b,c,d]);extent.push(...outer);
  const lerp=(v,w,t)=>v.map((n,j)=>n+(w[j]-n)*t);
  return {accent:i===2,silhouette:round(outer),faces:{front:poly([d,c,C,D]),side:poly([c,b,B,C]),top:poly([a,b,c,d])},planes:{front:[d,c,D],side:[c,b,C],top:[a,b,d]},seams:[open([lerp(d,c,.12),lerp(c,d,.12)]),open([lerp(b,c,.12),lerp(c,b,.12)]),open([lerp(c,C,.08),lerp(C,c,.08)])]};
 });
 const xs=extent.map(p=>p[0]),ys=extent.map(p=>p[1]),bounds={x:Math.min(...xs),y:Math.min(...ys),right:Math.max(...xs),bottom:Math.max(...ys)};
 return {width:160,height:128,bounds,offset:[80-(bounds.x+bounds.right)/2,64-(bounds.y+bounds.bottom)/2],bars};
}
function mount({stage,svg,read}){const bag=HL.disposer(),s=makeGrowthScene(HL),root=HL.mk('g',{transform:`translate(${s.offset[0]*2.5} ${s.offset[1]*2.5}) scale(2.5)`},svg);s.bars.forEach(b=>HL.mk('path',{d:b.silhouette,class:'sil'},root));const clock=HL.register(stage,()=>false);bag.add(clock.unregister);bag.add(HL.pointer(stage,{move(){read.textContent='a platform growing in capability';},leave(){read.textContent='rest';}}));bag.add(()=>svg.replaceChildren());read.textContent='rest';return {set(){},destroy:bag.dispose};}
hairline({name:'product-stage-growth',means:'Three ascending forms represent a growing platform.',rules:[6,9],range:[0,.5,1],tour:[[125,215],[200,170],[270,110],null],mount});
