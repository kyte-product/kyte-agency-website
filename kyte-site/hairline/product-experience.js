/**
 * Kyte product experience. Every surface, inset, icon, and connector is drawn
 * in one world coordinate system and projected through Hairline's camera.
 * Site presentation supplies colour to these vector paths.
 */
const { Cam, fit, proj, rrect, fillet, hull, poly, open, mk, tween, tset, tval, tdone, pointer, register, disposer } = HL;
const path = (g, pts, cls = "experience-outline") => mk("path", { d: poly(pts), class: cls }, g);
const stroke = (g, pts, cls = "experience-detail") => mk("path", { d: open(pts), class: cls }, g);
const trimFromStart = (a, b, inset = 1.5) => { const length = Math.hypot(b[0] - a[0], b[1] - a[1]); const t = Math.min(.2, inset / length); return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]; };
const quadratic = (a, control, b, steps = 16) => Array.from({ length: steps + 1 }, (_, i) => { const t = i / steps, s = 1 - t; return [s * s * a[0] + 2 * s * t * control[0] + t * t * b[0], s * s * a[1] + 2 * s * t * control[1] + t * t * b[1]]; });
const CORNER = 3.0;

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  const C = Cam(45, 0.5, 1.34);
  fit(C, [[-78, 108, 0], [298, -40, 170], [298, 115, 0], [-78, -40, 155]], 200, 175);
  const P = proj(C);
  const face = (x, y, z, w, h) => {
    const F = (u, v) => P(x + w * u, y, z + h * (1 - v));
    F.w = w; F.h = h;
    return F;
  };
  const rightFace = (x, y, z, w, h) => {
    const F = (u, v) => P(x, y + w * (1 - u), z + h * (1 - v));
    F.w = w; F.h = h;
    return F;
  };

  const uiPlane = (g,F,id,w,h) => { const p=mk("path",{d:"",class:"experience-ui-plane-marker"},g); p.setAttribute("data-ui-frame",id); p.setAttribute("data-frame-width",w); p.setAttribute("data-frame-height",h); p.setAttribute("data-frame-corners",JSON.stringify([F(0,0),F(1,0),F(1,1),F(0,1)])); };

  const ellipse = (g, F, u, v, rx, ry, cls, steps = 36) => path(g, Array.from({ length: steps }, (_, i) => {
    const t = i * Math.PI * 2 / steps;
    return F(u + rx / F.w * Math.cos(t), v + ry / F.h * Math.sin(t));
  }), cls);

  const packIcon = (g,F,name,x=.25,y=.25,w=.50,h=.50,light=false,ui=false) => {
    const o=F(x,y),px=F(x+w/24,y),py=F(x,y+h/24),cls=(light?"experience-pack-glyph experience-pack-glyph-light":"experience-pack-glyph")+(ui?" experience-pack-glyph-ui":""),icon=mk("g",{class:"experience-pack-icon",transform:`matrix(${px[0]-o[0]} ${px[1]-o[1]} ${py[0]-o[0]} ${py[1]-o[1]} ${o[0]} ${o[1]})`},g);
    if(name==="zap"){
      mk("path",{d:"M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z",class:cls},icon);
    }else if(name==="list"){
      mk("path",{d:"M3 5h.01M3 12h.01M3 19h.01M8 5h13M8 12h13M8 19h13",class:cls},icon);
    }else if(name==="search"){
      mk("path",{d:"m21 21-4.34-4.34",class:cls},icon);
      mk("circle",{cx:11,cy:11,r:8,class:cls},icon);
    }else if(name==="workflow"){
      // Lucide Workflow geometry, copied from the official icon definition.
      mk("rect",{width:8,height:8,x:3,y:3,rx:2,class:cls},icon);
      mk("path",{d:"M7 11v4a2 2 0 0 0 2 2h4",class:cls},icon);
      mk("rect",{width:8,height:8,x:13,y:13,rx:2,class:cls},icon);
    }else if(name==="play"){
      mk("path",{d:"m6 3 14 9-14 9z",class:cls},icon);
    }else if(name==="image"){
      mk("rect",{width:18,height:18,x:3,y:3,rx:2,class:cls},icon); mk("circle",{cx:8.5,cy:8.5,r:1.5,class:cls},icon); mk("path",{d:"m21 15-5-5L5 21",class:cls},icon);
    }else if(name==="user"){
      mk("circle",{cx:12,cy:8,r:5,class:cls},icon); mk("path",{d:"M20 21a8 8 0 0 0-16 0",class:cls},icon);
    }else{
      mk("ellipse",{cx:12,cy:5,rx:9,ry:3,class:cls},icon);
      mk("path",{d:"M3 5V19A9 3 0 0 0 21 19V5M3 12A9 3 0 0 0 21 12",class:cls},icon);
    }
  };
  const brandMark = (g,F,name) => {
    if(name==="chatgpt"||name==="figma"){const u=.28,v=.24,w=.44,h=.52,o=F(u,v),px=F(u+w,v),py=F(u,v+h),href=name==="figma"?"/tool-logos/figma-color.svg":"/ai-logos/chatgpt.png";mk("image",{x:0,y:0,width:1,height:1,preserveAspectRatio:"xMidYMid meet",href,transform:`matrix(${px[0]-o[0]} ${px[1]-o[1]} ${py[0]-o[0]} ${py[1]-o[1]} ${o[0]} ${o[1]})`},g);return;}
    const figma=name==="figma", u=figma?.34:.26, v=.24, w=figma?.32:.48, h=.52, base=figma?16:24;
    const o=F(u,v),px=F(u+w/base,v),py=F(u,v+h/24),mark=mk("g",{class:"experience-brand-mark",transform:`matrix(${px[0]-o[0]} ${px[1]-o[1]} ${py[0]-o[0]} ${py[1]-o[1]} ${o[0]} ${o[1]})`},g);
    mk("path",{d:"M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z",class:"experience-framer-mark"},mark);
  };
  const slab = (g, x, y, z, w, h, depth, faceClass) => {
    const ring = rrect(0, 0, w, h, CORNER, 14);
    const front = ring.map(q => P(x + q.u, y, z + h - q.v));
    const back = ring.map(q => P(x + q.u, y - depth, z + h - q.v));
    const silhouette = hull([...front, ...back]);
    path(g, silhouette, "experience-slab-body");
    path(g, front, faceClass);
    path(g, silhouette, "experience-slab-outline");
  };

  // Cross arms follow the two diagonal ground axes, projected from x/y.
  const ground = mk("g", { class: "experience-ground" }, svg);
  let groundMarks = "";
  for (let x = -267; x <= 282; x += 11) for (let y = -343; y <= 206; y += 11) {
    const a = P(x - .9, y, -5), b = P(x + .9, y, -5), c = P(x, y - .9, -5), d = P(x, y + .9, -5);
    if ([a,b,c,d].some(([sx,sy]) => sx < 0 || sx > 400 || sy < 0 || sy > 320)) continue;
    groundMarks += `M${a[0]},${a[1]}L${b[0]},${b[1]}M${c[0]},${c[1]}L${d[0]},${d[1]}`;
  }
  mk("path", { d: groundMarks, class: "experience-dot" }, ground);

  // A real horizontal keyboard plane: all keys share the same two axes.
  const keyboard = mk("g", { class: "experience-keyboard" }, svg);
  const KB = (x, y, z = 2) => P(x, y, z);
  const keyRing = rrect(-71, 36, 74, 105, CORNER, 14);
  const keyBase = keyRing.map(q => KB(q.u, q.v, 0)), keyTop = keyRing.map(q => KB(q.u, q.v, 2));
  const keyboardHull = hull([...keyBase, ...keyTop]);
  path(keyboard, keyboardHull, "experience-keyboard-body");
  path(keyboard, keyTop, "experience-keyboard-top");
  path(keyboard, keyboardHull, "experience-keyboard-outline");
  for (let row = 0; row < 6; row++) for (let col = 0; col < 11; col++) {
    const x = -65 + col * 12.4 + (row % 2) * 1.5, y = 41 + row * 10.1;
    path(keyboard, rrect(x, y, x + 9.6, y + 7.5, 1.25, 8).map(q => KB(q.u, q.v, 2.15)), "experience-key");
  }
  // Six connected tools. Their faces are projections of actual cuboids.
  const modules = mk("g", { class: "experience-modules" }, svg);
  const modulePlaces = [[164,-17,135,28,0,55],[247,-9,229,29,1,130],[164,-25,55,29,2,45],[257,0,169,29,3,130],[132,-17,185,28,5,78]];
  function cube(x, y, z, size, kind, tubeLength) {
    const g = mk("g", { class: "experience-module" }, modules);
    const x1 = x + size, y1 = y + size, z1 = z + size;
    const A = P(x, y, z), B = P(x1, y, z), D = P(x, y1, z), E = P(x1, y1, z);
    const AT = P(x, y, z1), BT = P(x1, y, z1), DT = P(x, y1, z1), ET = P(x1, y1, z1);
    const sideCorner = quadratic(trimFromStart(ET, BT, 3.2), ET, trimFromStart(ET, E, 3.2));
    path(g, [BT, ...sideCorner, E, B], "experience-cube-side");
    path(g, [DT, ET, E, D], "experience-cube-front");
    path(g, [AT, BT, ET, DT], "experience-cube-top");
    const portX = x + size * .5, portZ = z + size * .51;
    const portFace = face(x, y1, z, size, size);
    const outer = hull([A, B, D, E, AT, BT, DT, ET]);
    path(g, fillet(outer,outer.map(()=>CORNER),5), "experience-cube-outline");
    // Keep the left seam joined to the curved fold, with the larger gap on
    // the line that enters from the cube's right side.
    const rightSideStart = trimFromStart(BT, ET, 2.2);
    const leftSideStart = trimFromStart(DT, ET, 2.2);
    const curveStart = trimFromStart(ET, DT, 3.2);
    const rightCornerOut = trimFromStart(ET, E, 3.2);
    const verticalSeamEnd = trimFromStart(E, ET, 2.2);
    const transition = quadratic(curveStart, ET, rightCornerOut);
    const rightFold = [leftSideStart, curveStart, ...transition.slice(1, -1), verticalSeamEnd];
    const rightSideEnd = trimFromStart(ET, rightSideStart, .45);
    stroke(g, [rightSideStart, rightSideEnd], "experience-cube-seam");
    stroke(g, rightFold, "experience-cube-seam");
    // A projected cylinder shares the socket's world-space center and plane.
    ellipse(g, portFace, .5, .49, size * .29, size * .29, "experience-tube-collar");
    ellipse(g, portFace, .5, .49, size * .22, size * .22, "experience-tube-collar-center");
    const ring=(cy,r)=>Array.from({length:24},(_,i)=>{const a=i*Math.PI/12;return P(portX+r*Math.cos(a),cy,portZ+r*Math.sin(a));});
    path(g,hull([...ring(y1,size*.215),...ring(y1+tubeLength,size*.215)]),"experience-tube-shadow");
    path(g,hull([...ring(y1,size*.185),...ring(y1+tubeLength,size*.185)]),"experience-tube-body");
    ellipse(g,portFace,.5,.49,size*.185,size*.185,"experience-tube-cap");
    const F = rightFace(x1, y, z, size, size);
    if(kind===0)brandMark(g,F,"figma");else if(kind===3)brandMark(g,F,"framer");else if(kind===5)brandMark(g,F,"chatgpt");else packIcon(g,F,["zap","list","search","workflow","database"][kind]);
  }
  modulePlaces.forEach(v => cube(...v));

  const screen = mk("g", { class: "experience-screen" }, svg);
  const SF = face(12, 17, 28, 157, 129);
  slab(screen,12,17,28,157,129,3.2,"experience-screen-face");
  uiPlane(screen,SF,"screen",1570,1290);
  const cards = [];
  function card(name, x, y, z, w, h) {
    const g = mk("g", { class: `experience-card experience-card--${name}` }, svg);
    const F = face(x,y,z,w,h);
    slab(g,x,y,z,w,h,3.2,"experience-panel-face");
    cards.push(g);
    return { g, F };
  }
  const mail = card("mail", 0, 54, 75, 31, 72);
  uiPlane(mail.g,mail.F,"mail",310,720);
  const search = card("search", 80, 59, 88, 66, 21);
  uiPlane(search.g,search.F,"search",660,210);
  const media = card("media", 20, 63, 25, 57, 57);
  uiPlane(media.g,media.F,"media",570,570);
  const analytics = card("analytics", 94, 67, 13, 53, 72);
  uiPlane(analytics.g,analytics.F,"analytics",530,720);

  const shifts = cards.map(() => tween(0));
  const clock = register(stage, (_dt, now) => {
    let moving = false;
    cards.forEach((g,i) => {
      g.setAttribute("transform", `translate(0 ${-tval(shifts[i],now).toFixed(2)})`);
      if (!tdone(shifts[i],now)) moving = true;
    });
    return moving;
  });
  bag.add(clock.unregister);
  let active = -1, lift = value;
  const centers = [mail,search,media,analytics].map(({F})=>F(.5,.5));
  const choose = ([x,y]) => {
    let next = -1, distance = 25;
    centers.forEach(([cx,cy],i)=>{const d=Math.hypot(x-cx,y-cy);if(d<distance){distance=d;next=i;}});
    if(next===active)return;
    active=next;
    read.textContent=active<0?"rest":["message","search","media","analytics"][active];
    const now=performance.now();
    shifts.forEach((t,i)=>tset(t,active<0?0:Math.max(0,lift-Math.abs(active-i)*2.8),now,active<0?0:Math.abs(active-i)*45));
    clock.wake();
  };
  bag.add(pointer(stage,{move:choose,leave:()=>choose([-100,-100])}));
  bag.add(()=>svg.replaceChildren());
  return {set:v=>{lift=v;},destroy:bag.dispose};
}

hairline({
  name:"product-experience",
  means:"A product workspace in one isometric scene; point to a floating panel to lift it.",
  rules:[1,2,7,8,9], range:[3,7,11],
  tour:[[150,136],[203,140],[244,211],null], mount,
});
