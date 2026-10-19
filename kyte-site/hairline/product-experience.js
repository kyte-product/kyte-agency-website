/**
 * A custom Hairline scene for the UI/UX landing page. All visible objects are
 * SVG geometry made here with Hairline's node, path and motion primitives.
 * The site's requested colour treatment is applied to these same paths by
 * the website presentation layer, leaving the Hairline figure self-contained.
 */
const { mk, poly, open, fillet, tween, tset, tval, tdone, pointer, register, disposer } = HL;

const rounded = (points, radius = 2) => poly(fillet(points, points.map(() => radius), 3));
const path = (parent, d, cls = "sil") => mk("path", { d, class: cls }, parent);
const line = (parent, pts, cls = "lo nf") => path(parent, open(pts), cls);
const plate = (parent, pts, cls = "sil", radius = 2) => path(parent, rounded(pts, radius), cls);

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  const ground = mk("g", { class: "experience-ground" }, svg);
  for (let row = 0; row < 15; row++) for (let col = 0; col < 32; col++) {
    const x = 36 + col * 10.1 + row * 2.6, y = 28 + row * 10.6;
    if (x > 390 || (x > 128 && x < 318 && y > 52 && y < 258)) continue;
    line(ground, [[x - 0.65, y - 0.65], [x + 0.65, y + 0.65]], "experience-dot nf");
    line(ground, [[x + 0.65, y - 0.65], [x - 0.65, y + 0.65]], "experience-dot nf");
  }

  // An oblique keyboard with individually shaped keys and a fine raised rim.
  const keyboard = mk("g", { class: "experience-keyboard" }, svg);
  const K = (u, v) => [56 + 116 * u + 101 * v, 231 - 57 * u + 60 * v];
  plate(keyboard, [K(0, 0), K(1, 0), K(1, 1), K(0, 1)], "experience-white sil", 2.5);
  line(keyboard, [K(0, 1), [K(0, 1)[0], K(0, 1)[1] + 4], [K(1, 1)[0], K(1, 1)[1] + 4], K(1, 1)], "experience-rim nf");
  for (let row = 0; row < 6; row++) for (let col = 0; col < 11; col++) {
    const u = .06 + col * .081 + (row % 2) * .014, v = .07 + row * .125;
    plate(keyboard, [K(u, v), K(u + .064, v), K(u + .064, v + .082), K(u, v + .082)], "experience-key", .8);
  }

  // The main product window is one projected surface, with a thin rear edge.
  const screen = mk("g", { class: "experience-screen" }, svg);
  const S = (u, v) => [157 + 137 * u, 29 + 68 * u + 152 * v];
  const face = [S(0, 0), S(1, 0), S(1, 1), S(0, 1)];
  plate(screen, face.map(([x, y]) => [x + 3, y + 3]), "experience-rear sil", 2);
  plate(screen, face, "experience-white sil", 2);
  line(screen, [S(0, .115), S(1, .115)], "experience-inner nf");
  [[.018, .045], [.043, .045], [.068, .045]].forEach(([u, v], i) => {
    const [x, y] = S(u, v); mk("circle", { cx: x, cy: y, r: 1.6, class: `experience-window-dot experience-window-dot--${i}` }, screen);
  });
  const tiles = [
    [0.06, .16, .23, .58, "experience-sea"], [0.29, .16, .60, .46, "experience-sea-two"],
    [0.29, .53, .60, .79, "experience-sea"], [0.64, .16, .95, .85, "experience-sea-two"],
  ];
  tiles.forEach(([a, b, c, d, cls]) => plate(screen, [S(a, b), S(c, b), S(c, d), S(a, d)], cls, 1.2));
  line(screen, [S(.07, .88), S(.55, .88)], "experience-inner nf");

  // Four offset translucent interface sheets float ahead of that window.
  const cards = [];
  const makeCard = (name, polygon) => {
    const g = mk("g", { class: `experience-card experience-card--${name}` }, svg);
    plate(g, polygon.map(([x, y]) => [x + 1.5, y + 1.5]), "experience-rear sil", 1.5);
    plate(g, polygon, "experience-white sil", 1.5);
    cards.push(g);
    return g;
  };
  const mail = makeCard("mail", [[143, 83], [178, 101], [178, 197], [143, 179]]);
  mk("circle", { cx: 161, cy: 123, r: 13, class: "experience-disc" }, mail);
  plate(mail, [[156, 118], [166, 123], [166, 130], [156, 125]], "experience-glyph nf", .5);
  line(mail, [[156, 118], [161, 125], [166, 123]], "experience-glyph nf");
  [0, 1, 2].forEach(i => line(mail, [[151, 146 + 7 * i], [171 - 3 * i, 156 + 7 * i]], "experience-inner nf"));
  const search = makeCard("search", [[185, 115], [239, 142], [239, 171], [185, 144]]);
  plate(search, [[189, 122], [235, 145], [235, 161], [189, 138]], "experience-pink", 6);
  mk("circle", { cx: 195, cy: 133, r: 2.1, class: "experience-glyph nf" }, search);
  line(search, [[197, 135], [200, 139]], "experience-glyph nf");
  const media = makeCard("media", [[153, 175], [208, 203], [208, 257], [153, 229]]);
  mk("circle", { cx: 164, cy: 187, r: 3.4, class: "experience-soft" }, media);
  line(media, [[174, 189], [199, 202]], "experience-inner nf");
  line(media, [[174, 195], [188, 202]], "experience-inner nf");
  plate(media, [[157, 201], [205, 225], [205, 248], [157, 224]], "experience-warm", 1);
  plate(media, [[179, 215], [179, 221], [185, 222], [185, 219]], "experience-glyph nf", .4);
  const analytics = makeCard("analytics", [[232, 172], [279, 196], [279, 269], [232, 245]]);
  mk("circle", { cx: 256, cy: 215, r: 10, class: "experience-disc" }, analytics);
  mk("circle", { cx: 256, cy: 215, r: 4, class: "experience-white" }, analytics);
  [0, 1, 2, 3, 4].forEach(i => plate(analytics, [[237 + i * 8, 232 + i * 4], [242 + i * 8, 234 + i * 4], [242 + i * 8, 241 + i * 5], [237 + i * 8, 239 + i * 5]], "experience-chart", .5));

  // Connected isometric service modules behind the product window.
  const modules = mk("g", { class: "experience-modules" }, svg);
  const cube = (x, y, variant) => {
    const g = mk("g", { class: "experience-module" }, modules);
    line(g, [[x - 28, y + 12], [x - 11, y + 21]], "experience-wire nf");
    mk("circle", { cx: x - 28, cy: y + 12, r: 3, class: "experience-socket" }, g);
    plate(g, [[x, y], [x + 19, y - 11], [x + 38, y], [x + 19, y + 11]], "experience-white sil", 1.5);
    plate(g, [[x, y], [x + 19, y + 11], [x + 19, y + 34], [x, y + 23]], "experience-white sil", 1.5);
    plate(g, [[x + 19, y + 11], [x + 38, y], [x + 38, y + 23], [x + 19, y + 34]], "experience-white sil", 1.5);
    if (variant === 0) mk("circle", { cx: x + 27, cy: y + 15, r: 3.1, class: "experience-icon" }, g);
    if (variant === 1) line(g, [[x + 24, y + 13], [x + 33, y + 9], [x + 33, y + 17], [x + 24, y + 21]], "experience-icon nf");
    if (variant === 2) { mk("circle", { cx: x + 27, cy: y + 15, r: 3.8, class: "experience-icon nf" }, g); line(g, [[x + 30, y + 18], [x + 33, y + 21]], "experience-icon nf"); }
    if (variant === 3) [0, 1, 2].forEach(i => mk("circle", { cx: x + 24 + i * 4, cy: y + 14 + (i % 2) * 4, r: 1.5, class: "experience-icon" }, g));
    if (variant === 4) { mk("circle", { cx: x + 26, cy: y + 15, r: 3.5, class: "experience-icon nf" }, g); line(g, [[x + 23, y + 15], [x + 30, y + 15]], "experience-icon nf"); }
  };
  [[265, 47], [315, 27], [276, 110], [337, 87], [328, 155]].forEach(([x, y], i) => cube(x, y, i));
  screen.before(modules);

  // Discrete interaction: the selected pane rises slightly and nearby panes follow.
  const shifts = cards.map(() => tween(0));
  const clock = register(stage, (_dt, now) => {
    let moving = false;
    cards.forEach((g, i) => {
      g.setAttribute("transform", `translate(0 ${-tval(shifts[i], now).toFixed(2)})`);
      if (!tdone(shifts[i], now)) moving = true;
    });
    return moving;
  });
  bag.add(clock.unregister);
  let active = -1, lift = value;
  const centres = [[161, 140], [212, 139], [182, 215], [257, 221]];
  const choose = ([x, y]) => {
    let next = -1, distance = 28;
    centres.forEach(([cx, cy], i) => { const d = Math.hypot(x - cx, y - cy); if (d < distance) { distance = d; next = i; } });
    if (next === active) return;
    active = next;
    read.textContent = active < 0 ? "rest" : ["message", "search", "media", "analytics"][active];
    const now = performance.now();
    shifts.forEach((t, i) => tset(t, active < 0 ? 0 : Math.max(0, lift - Math.abs(active - i) * 2.8), now, active < 0 ? 0 : Math.abs(active - i) * 45));
    clock.wake();
  };
  bag.add(pointer(stage, { move: choose, leave: () => choose([-100, -100]) }));
  bag.add(() => svg.replaceChildren());
  return { set: v => { lift = v; }, destroy: bag.dispose };
}

hairline({
  name: "product-experience",
  means: "A layered product workspace, from interface and keyboard to connected tools; point to a floating panel to lift it.",
  rules: [1, 2, 7, 8, 9],
  range: [3, 7, 11],
  tour: [[160, 140], [211, 140], [258, 220], null],
  mount,
});
