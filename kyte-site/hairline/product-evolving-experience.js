/** One continuous product route, authored once for the neutral bench and SVG. */
function makeEvolutionScene(HL) {
  const {Cam,proj,poly,open}=HL,S=1.23,P=proj(Cam(45,.5,S));
  const cross=(a,b)=>a[0]*b[1]-a[1]*b[0],sub=(a,b)=>[a[0]-b[0],a[1]-b[1]],at=(a,b,t)=>[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t];
  // The extrusion silhouette is a true union. A convex hull would fill the bends.
  function locate(p,ring){
    let inside=false;
    for(let i=0,j=ring.length-1;i<ring.length;j=i++){
      const a=ring[j],b=ring[i],v=sub(b,a),w=sub(p,a),t=(w[0]*v[0]+w[1]*v[1])/(v[0]*v[0]+v[1]*v[1]);
      if(t>=0&&t<=1&&Math.abs(cross(v,w))<1e-7)return 0;
      if((a[1]>p[1])!==(b[1]>p[1])&&p[0]<(b[0]-a[0])*(p[1]-a[1])/(b[1]-a[1])+a[0])inside=!inside;
    }return inside?1:-1;
  }
  function union(a,b){
    const pieces=[];
    [a,b].forEach((ring,index)=>{
      const other=index?a:b;
      ring.forEach((p,i)=>{
        const q=ring[(i+1)%ring.length],r=sub(q,p),cuts=[0,1];
        other.forEach((v,j)=>{
          const w=other[(j+1)%other.length],s=sub(w,v),d=cross(r,s),c=sub(v,p);
          if(Math.abs(d)>1e-9){const t=cross(c,s)/d,u=cross(c,r)/d;if(t>1e-8&&t<1-1e-8&&u>=-1e-8&&u<=1+1e-8)cuts.push(t);}
        });
        cuts.sort((x,y)=>x-y);
        for(let k=0;k<cuts.length-1;k++)if(cuts[k+1]-cuts[k]>1e-8){
          const lo=cuts[k],hi=cuts[k+1],state=locate(at(p,q,(lo+hi)/2),other);
          if(state<0||(state===0&&index===0))pieces.push([at(p,q,lo),at(p,q,hi)]);
        }
      });
    });
    const key=p=>p.map(x=>Math.round(x*1e5)).join(','),map=new Map();
    pieces.forEach(edge=>map.set(key(edge[0]),edge));
    const start=pieces[0][0],outline=[start];let current=start,closed=false;
    for(let i=0;i<=pieces.length;i++){
      const edge=map.get(key(current));if(!edge)throw new Error('Open extrusion boundary');
      map.delete(key(current));current=edge[1];if(key(current)===key(start)){closed=true;break;}outline.push(current);
    }
    if(!closed||map.size||outline.length<8)throw new Error('Invalid route silhouette');
    return outline;
  }
  const center=[];
  const add=(x,y,dx,dy)=>{const last=center.at(-1);if(!last||Math.hypot(x-last.x,y-last.y)>1e-8)center.push({x,y,dx,dy});};
  const line=(a,b)=>{const d=sub(b,a),l=Math.hypot(...d);add(...a,d[0]/l,d[1]/l);add(...b,d[0]/l,d[1]/l);};
  const arc=(cx,cy,r,a,b)=>{for(let i=0;i<=28;i++){const angle=a+(b-a)*i/28,sign=Math.sign(b-a);add(cx+r*Math.cos(angle),cy+r*Math.sin(angle),-Math.sin(angle)*sign,Math.cos(angle)*sign);}};
  line([40,130],[40,56]);arc(16,56,24,0,-Math.PI/2);
  line([16,32],[-24,32]);arc(-24,8,24,Math.PI/2,Math.PI);
  line([-48,8],[-48,-130]);
  const half=15,ring=[];
  center.forEach(p=>ring.push([p.x-p.dy*half,p.y+p.dx*half]));
  const end=center.at(-1),endAngle=Math.atan2(end.dy,end.dx)+Math.PI/2;
  for(let i=1;i<=28;i++){const a=endAngle-Math.PI*i/28;ring.push([end.x+half*Math.cos(a),end.y+half*Math.sin(a)]);}
  center.slice(0,-1).reverse().forEach(p=>ring.push([p.x+p.dy*half,p.y-p.dx*half]));
  const start=center[0],startAngle=Math.atan2(start.dy,start.dx)-Math.PI/2;
  for(let i=1;i<28;i++){const a=startAngle-Math.PI*i/28;ring.push([start.x+half*Math.cos(a),start.y+half*Math.sin(a)]);}
  const top=ring.map(p=>P(...p,2.4)),bottom=ring.map(p=>P(...p,0)),outline=union(top,bottom);
  const orb=P(0,32,24.4),radius=22*S;
  const orbPath=`M${orb[0]-radius} ${orb[1]}A${radius} ${radius} 0 1 0 ${orb[0]+radius} ${orb[1]}A${radius} ${radius} 0 1 0 ${orb[0]-radius} ${orb[1]}Z`;
  // Portal sections share the route camera and straddle its centerline.
  // A single rounded U boundary leaves the road unobstructed at floor level.
  function portal(x,y,height){
    const outer=33,inner=19,beam=12,depth=3;
    const corners=[[-outer,0],[-outer,height],[outer,height],[outer,0],[inner,0],[inner,height-beam],[-inner,height-beam],[-inner,0]];
    const rounded=(d)=>{
      const entries=corners.map((v,i)=>{
        const before=corners[(i+corners.length-1)%corners.length],after=corners[(i+1)%corners.length];
        const toward=q=>{const len=Math.hypot(q[0]-v[0],q[1]-v[1]),t=Math.min(1.2,len/3)/len;return [v[0]+(q[0]-v[0])*t,v[1]+(q[1]-v[1])*t];};
        return {start:toward(before),corner:v,end:toward(after)};
      });
      const at=v=>P(x+v[0],y+d,v[1]);
      return entries.map((v,i)=>`${i?'L':'M'}${at(v.start)}Q${at(v.corner)} ${at(v.end)}`).join('')+'Z';
    };
    return {front:rounded(depth),back:rounded(-depth),cap:poly([P(x-outer+1,y+depth,height),P(x-outer+1,y-depth,height),P(x+outer-1,y-depth,height),P(x+outer-1,y+depth,height)]),side:poly([P(x+outer,y+depth,height-1),P(x+outer,y-depth,height-1),P(x+outer,y-depth,0),P(x+outer,y+depth,0)]),bounds:corners.flatMap(v=>[P(x+v[0],y+depth,v[1]),P(x+v[0],y-depth,v[1])])};
  }
  // Each gate is centered on the exact route segment, including its depth.
  function portalAt(y,height){
    const a=center.find((p,i)=>i<center.length-1&&Math.min(p.y,center[i+1].y)<=y&&Math.max(p.y,center[i+1].y)>=y&&p.y!==center[i+1].y);
    if(!a)throw new Error('Portal is outside the route');
    const b=center[center.indexOf(a)+1],t=(y-a.y)/(b.y-a.y);
    return portal(a.x+(b.x-a.x)*t,y,height);
  }
  const portals=[portalAt(-94,64),portalAt(-30,64),portalAt(101,64)];
  const points=[...outline,...portals.flatMap(p=>p.bounds),[orb[0]-radius,orb[1]-radius],[orb[0]+radius,orb[1]+radius]];
  const xs=points.map(p=>p[0]),ys=points.map(p=>p[1]),bounds={x:Math.min(...xs),y:Math.min(...ys),right:Math.max(...xs),bottom:Math.max(...ys)};
  const offset=[200-(bounds.x+bounds.right)/2,132-(bounds.y+bounds.bottom)/2];
  const lines=[],tiles=[];
  for(let x=-264;x<=264;x+=24)lines.push(open([P(x,-264,-1),P(x,264,-1)]));
  for(let y=-264;y<=264;y+=24)lines.push(open([P(-264,y,-1),P(264,y,-1)]));
  for(let x=-240;x<=240;x+=24)for(let y=-240;y<=240;y+=24)if((x/24+y/24)%5===0)tiles.push(poly([P(x,y,-1),P(x+24,y,-1),P(x+24,y+24,-1),P(x,y+24,-1)]));
  return {width:400,height:260,offset,bounds,portals,track:{silhouette:poly(outline),top:poly(top),ring:outline},orb:{silhouette:orbPath,center:orb,radius,contact:P(0,32,2.4)},ground:{lines,tiles}};
}
function mount({stage,svg,read}){
  const bag=HL.disposer(),scene=makeEvolutionScene(HL),root=HL.mk('g',{transform:`translate(${scene.offset[0]} ${scene.offset[1]+30})`},svg);
  HL.mk('path',{d:scene.ground.lines.join(''),class:'lo nf'},root);
  HL.mk('path',{d:scene.track.silhouette,class:'sil'},root);
  scene.portals.slice(0,2).forEach(p=>{HL.mk('path',{d:p.back,class:'lo'},root);HL.mk('path',{d:p.front,class:'sil'},root);});
  HL.mk('path',{d:scene.orb.silhouette,class:'sil'},root);
  HL.mk('path',{d:scene.portals[2].back,class:'lo'},root);
  HL.mk('path',{d:scene.portals[2].front,class:'sil'},root);
  const clock=HL.register(stage,()=>false);bag.add(clock.unregister);
  bag.add(HL.pointer(stage,{move(){read.textContent='a continuous experience';},leave(){read.textContent='rest';}}));
  bag.add(()=>svg.replaceChildren());read.textContent='rest';return {set(){},destroy:bag.dispose};
}
hairline({name:'product-evolving-experience',means:'One continuous experience follows a new direction.',rules:[6,9],range:[0,.5,1],tour:[[145,238],[190,150],[250,76],null],mount});
