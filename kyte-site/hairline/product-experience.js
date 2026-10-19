/**
 * Kyte product experience. Every surface, inset, icon, and connector is drawn
 * in one world coordinate system and projected through Hairline's camera.
 * Site presentation supplies colour to these vector paths.
 */
const { Cam, fit, proj, rrect, fillet, hull, poly, open, mk, tween, tset, tval, tdone, pointer, register, disposer } = HL;
const path = (g, pts, cls = "experience-outline") => mk("path", { d: poly(pts), class: cls }, g);
const stroke = (g, pts, cls = "experience-detail") => mk("path", { d: open(pts), class: cls }, g);
const round = (g, pts, cls, radius = 2) => path(g, fillet(pts, pts.map(() => radius), 5), cls);

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  const C = Cam(45, 0.5, 1.34);
  fit(C, [[-78, 108, 0], [246, -40, 170], [250, 104, 0], [-78, -40, 155]], 200, 163);
  const P = proj(C);
  const face = (x, y, z, w, h) => (u, v) => P(x + w * u, y, z + h * (1 - v));
  const onFace = (g, F, a, b, c, d, cls, r = .025) => path(g, rrect(a, b, c, d, r, 6).map(q => F(q.u, q.v)), cls);
  const faceLine = (g, F, pts, cls = "experience-detail") => stroke(g, pts.map(([u, v]) => F(u, v)), cls);
  const ellipse = (g, F, u, v, rx, ry, cls, steps = 36) => path(g, Array.from({ length: steps }, (_, i) => {
    const t = i * Math.PI * 2 / steps;
    return F(u + rx * Math.cos(t), v + ry * Math.sin(t));
  }), cls);

  // Quiet projected ground crosses, all lying in the x/y plane.
  const ground = mk("g", { class: "experience-ground" }, svg);
  for (let x = -92; x <= 252; x += 11) for (let y = -48; y <= 115; y += 11) {
    const c = P(x, y, -5);
    if (c[0] < 20 || c[0] > 382 || c[1] < 10 || c[1] > 299) continue;
    stroke(ground, [P(x - .5, y - .5, -5), P(x + .5, y + .5, -5)], "experience-dot");
    stroke(ground, [P(x - .5, y + .5, -5), P(x + .5, y - .5, -5)], "experience-dot");
  }

  // A real horizontal keyboard plane: all keys share the same two axes.
  const keyboard = mk("g", { class: "experience-keyboard" }, svg);
  const KB = (u, v, z = 2) => P(-71 + 145 * u, 36 + 69 * v, z);
  const keyRing = rrect(0, 0, 1, 1, .075, 8);
  path(keyboard, keyRing.map(q => KB(q.u, q.v, 0)), "experience-keyboard-base");
  path(keyboard, keyRing.map(q => KB(q.u, q.v, 2)), "experience-keyboard-top");
  stroke(keyboard, [KB(0, 1, 2), KB(0, 1, 0), KB(1, 1, 0), KB(1, 1, 2)], "experience-rim");
  for (let row = 0; row < 6; row++) for (let col = 0; col < 11; col++) {
    const u = .044 + col * .083 + (row % 2) * .012, v = .09 + row * .132;
    path(keyboard, rrect(u, v, u + .069, v + .09, .012, 4).map(q => KB(q.u, q.v, 2.15)), "experience-key");
  }

  // Five connected tools. Their faces are projections of actual cuboids.
  const modules = mk("g", { class: "experience-modules" }, svg);
  const links = mk("g", { class: "experience-links" }, modules);
  const modulePlaces = [[190,-17,136,28,0],[252,-29,153,29,1],[192,-25,65,29,2],[269,-20,105,29,3],[250,-4,39,29,4]];
  modulePlaces.forEach(([x,y,z,size]) => {
    const from = P(169, 16, z + size * .47);
    const elbow = P(x - 12, 16, z + size * .47);
    const to = P(x, y + size * .75, z + size * .47);
    stroke(links,[from,elbow,to],"experience-wire-outer");
    stroke(links,[from,elbow,to],"experience-wire-inner");
    path(links,rrect(-1.2,-1.2,1.2,1.2,.7,6).map(q=>[to[0]+q.u,to[1]+q.v]),"experience-socket");
  });
  function cube(x, y, z, size, kind) {
    const g = mk("g", { class: "experience-module" }, modules);
    const x1 = x + size, y1 = y + size, z1 = z + size;
    const A = P(x, y, z), B = P(x1, y, z), D = P(x, y1, z), E = P(x1, y1, z);
    const AT = P(x, y, z1), BT = P(x1, y, z1), DT = P(x, y1, z1), ET = P(x1, y1, z1);
    path(g, [BT, ET, E, B], "experience-cube-side");
    path(g, [DT, ET, E, D], "experience-cube-front");
    path(g, [AT, BT, ET, DT], "experience-cube-top");
    const outer = hull([A, B, D, E, AT, BT, DT, ET]);
    path(g, fillet(outer,outer.map(()=>3.6),5), "experience-cube-outline");
    stroke(g, [BT, ET, DT], "experience-cube-seam");
    stroke(g, [ET, E], "experience-cube-seam");
    const F = face(x, y1, z, size, size);
    if (kind === 0) { // bolt, as a shallow relief on the front face
      round(g, [[.48,.26],[.38,.52],[.49,.49],[.43,.74],[.65,.41],[.54,.43]].map(([u,v])=>F(u,v)), "experience-icon-fill", .9);
    } else if (kind === 1) {
      onFace(g,F,.35,.34,.7,.43,"experience-icon-fill",.018);
      onFace(g,F,.35,.48,.7,.57,"experience-icon-fill",.018);
    } else if (kind === 2) {
      ellipse(g,F,.49,.43,.14,.14,"experience-icon-outline");
      faceLine(g,F,[[.59,.55],[.69,.69]],"experience-icon-outline");
    } else if (kind === 3) {
      [[.33,.38],[.66,.38],[.5,.66]].forEach(([u,v])=>ellipse(g,F,u,v,.055,.055,"experience-icon-outline",18));
      faceLine(g,F,[[.38,.41],[.61,.41]],"experience-icon-outline");
      faceLine(g,F,[[.36,.44],[.47,.62]],"experience-icon-outline");
      faceLine(g,F,[[.63,.44],[.53,.62]],"experience-icon-outline");
    } else {
      ellipse(g,F,.5,.49,.15,.13,"experience-icon-outline");
      faceLine(g,F,[[.35,.55],[.65,.43]],"experience-icon-outline");
    }
  }
  modulePlaces.forEach(v => cube(...v));

  // Main product window: front and thin back are the same rounded plane.
  const screen = mk("g", { class: "experience-screen" }, svg);
  const SF = face(12, 17, 28, 157, 129), SB = face(12, 13, 29, 157, 129);
  const bezel = rrect(0, 0, 1, 1, .027, 10);
  path(screen, bezel.map(q => SB(q.u,q.v)), "experience-screen-back");
  path(screen, bezel.map(q => SF(q.u,q.v)), "experience-screen-face");
  faceLine(screen,SF,[[.015,.12],[.985,.12]],"experience-screen-rule");
  [.035,.061,.087].forEach((u,i)=>ellipse(screen,SF,u,.057,.006,.008,`experience-window-dot experience-window-dot--${i}`,18));
  [[.045,.17,.26,.7,"experience-sea"],[.29,.17,.62,.46,"experience-sea-two"],
    [.29,.51,.62,.77,"experience-sea"],[.65,.17,.95,.84,"experience-sea-two"]]
    .forEach(([a,b,c,d,cls])=>onFace(screen,SF,a,b,c,d,cls,.008));
  faceLine(screen,SF,[[.06,.87],[.56,.87]],"experience-screen-rule");

  // Floating cards. Each inset and pictogram is mapped onto its own plane.
  const cards = [];
  function card(name, x, y, z, w, h) {
    const g = mk("g", { class: `experience-card experience-card--${name}` }, svg);
    const F = face(x,y,z,w,h), R = face(x,y-2.5,z+.7,w,h);
    path(g, bezel.map(q=>R(q.u,q.v)),"experience-card-back");
    path(g, bezel.map(q=>F(q.u,q.v)),"experience-card-face");
    cards.push(g);
    return { g, F };
  }
  const mail = card("mail", 0, 54, 75, 31, 72);
  ellipse(mail.g,mail.F,.5,.33,.25,.13,"experience-disc");
  onFace(mail.g,mail.F,.39,.27,.63,.38,"experience-mail",.014);
  faceLine(mail.g,mail.F,[[.39,.27],[.51,.34],[.63,.27]],"experience-glyph");
  [.58,.67,.76].forEach((v,i)=>faceLine(mail.g,mail.F,[[.17,v],[.83-i*.12,v]],"experience-screen-rule"));
  const search = card("search", 48, 59, 88, 66, 21);
  onFace(search.g,search.F,.05,.26,.95,.76,"experience-pink",.2);
  ellipse(search.g,search.F,.17,.51,.055,.15,"experience-glyph",24);
  faceLine(search.g,search.F,[[.205,.61],[.25,.7]],"experience-glyph");
  const media = card("media", 20, 63, 25, 57, 57);
  ellipse(media.g,media.F,.18,.16,.048,.05,"experience-soft");
  faceLine(media.g,media.F,[[.29,.15],[.8,.15]],"experience-screen-rule");
  faceLine(media.g,media.F,[[.29,.24],[.64,.24]],"experience-screen-rule");
  onFace(media.g,media.F,.08,.37,.93,.9,"experience-warm",.025);
  faceLine(media.g,media.F,[[.46,.55],[.46,.72],[.62,.64],[.46,.55]],"experience-glyph");
  const analytics = card("analytics", 94, 67, 13, 53, 72);
  ellipse(analytics.g,analytics.F,.5,.34,.19,.14,"experience-disc");
  ellipse(analytics.g,analytics.F,.5,.34,.075,.055,"experience-card-face");
  [0,1,2,3,4].forEach(i=>onFace(analytics.g,analytics.F,.13+i*.15,.69-(i%2)*.07,.19+i*.15,.87,"experience-chart",.01));

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
