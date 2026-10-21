/**
 * Product dashboard laptop. The display, deck, keys, trackpad, and ground grid
 * share one Hairline camera. Detailed screen UI is projected separately.
 */
const { Cam, fit, proj, rrect, hull, poly, mk, disposer, pointer, register } = HL;
const CORNER = 3;
const path = (parent, points, cls) => mk("path", { d: poly(points), class: cls }, parent);


function mount({ stage, svg, read }) {
  const bag = disposer();
  const camera = Cam(-45, .5, 1.45);
  fit(camera, [[0, 0, 106], [120, -3.2, 106], [0, 88, 10.8], [120, 88, 10.8]], 200, 130);
  const P = proj(camera);
  const verticalFace = (x, y, z, width, height) => {
    const F = (u, v) => P(x + width * u, y, z + height * (1 - v));
    F.w = width; F.h = height;
    return F;
  };
  const uiPlane = (parent, F, id, width, height) => {
    const marker = mk("path", { d: "", class: "laptop-ui-plane-marker" }, parent);
    marker.setAttribute("data-ui-frame", id);
    marker.setAttribute("data-frame-width", width);
    marker.setAttribute("data-frame-height", height);
    marker.setAttribute("data-frame-corners", JSON.stringify([F(0, 0), F(1, 0), F(1, 1), F(0, 1)]));
  };
  const verticalSlab = (parent, x, y, z, width, height, depth) => {
    const ring = rrect(0, 0, width, height, CORNER, 14);
    const front = ring.map(q => P(x + q.u, y, z + height - q.v));
    const back = ring.map(q => P(x + q.u, y - depth, z + height - q.v));
    const silhouette = hull([...front, ...back]);
    path(parent, silhouette, "laptop-thickness");
    path(parent, front, "laptop-face");
    return { front, silhouette };
  };
  const horizontalSlab = (parent, x, y, z, width, depth, thickness) => {
    const ring = rrect(x, y, x + width, y + depth, CORNER, 14);
    const top = ring.map(q => P(q.u, q.v, z));
    const bottom = ring.map(q => P(q.u, q.v, z - thickness));
    const silhouette = hull([...top, ...bottom]);
    path(parent, silhouette, "laptop-thickness");
    path(parent, top, "laptop-face");
    return { top, silhouette };
  };

  const ground = mk("g", { class: "laptop-ground" }, svg);
  let grid = "";
  for (let x = -70; x <= 190; x += 20) grid += open([P(x, -75, 0), P(x, 150, 0)]);
  for (let y = -75; y <= 150; y += 20) grid += open([P(-70, y, 0), P(190, y, 0)]);
  mk("path", { d: grid, class: "laptop-grid" }, ground);

  const display = mk("g", { class: "laptop-display" }, svg);
  const screen = verticalSlab(display, 0, 0, 14, 120, 92, 3.2);
  const screenFace = verticalFace(0, 0, 14, 120, 92);
  uiPlane(display, screenFace, "laptop-screen", 1200, 920);
  path(display, screen.silhouette, "laptop-outline");

  const deck = mk("g", { class: "laptop-deck" }, svg);
  const base = horizontalSlab(deck, 0, 0, 14, 120, 88, 3.2);
  const topPoint = (x, y) => P(x, y, 14.18);
  for (let row = 0; row < 6; row++) for (let col = 0; col < 11; col++) {
    const x = 7 + col * 8.9 + (row % 2) * 1.35;
    const y = 10 + row * 9.2;
    path(deck, rrect(x, y, x + 7.1, y + 6.5, 1.25, 7).map(q => topPoint(q.u, q.v)), "laptop-key");
  }
  path(deck, rrect(78, 62, 111, 82, 2.2, 10).map(q => topPoint(q.u, q.v)), "laptop-trackpad");
  path(deck, base.silhouette, "laptop-outline");

  const clock = register(stage, () => false);
  bag.add(clock.unregister);
  bag.add(pointer(stage, { move() { read.textContent = "laptop"; }, leave() { read.textContent = "rest"; } }));
  read.textContent = "rest";
  bag.add(() => svg.replaceChildren());
  return { set() {}, destroy: bag.dispose };
}

hairline({
  name: "product-dashboard-laptop",
  means: "An isometric laptop with a projected dashboard and a measured keyboard deck.",
  rules: [6, 9],
  range: [0, .5, 1],
  tour: [[158, 128], [226, 132], [210, 214], null],
  mount,
});
