import {P} from './illustration-palettes.mjs';
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { assemble } from "../../.agents/skills/hairline-create/build.mjs";

const source = fileURLToPath(new URL("./product-experience.js", import.meta.url));
const uiSource = fileURLToPath(new URL("./product-experience-ui.html", import.meta.url));
const output = fileURLToPath(new URL("../public/hairline/product-experience-embed.html", import.meta.url));

// The geometry and interaction come from the validated Hairline figure. The
// presentation layer adds the requested multi-stop colour to those SVG paths.
const presentation = `<style id="product-experience-presentation">
  html,body{width:100%;height:100%;margin:0;overflow:hidden;color-scheme:light}
  body{display:block;padding:0;background:#f8f9fa}
  main{height:100%;max-width:none}
  .plate{height:100%;border:0;border-radius:0;overflow:hidden}
  #stage,#stage>svg{width:100%;height:100%;display:block}
  #stage>svg{overflow:visible}
  .controls,#means,#rules,#error,.tag{display:none!important}
  #stage svg{--experience-contour:1.75px}
  #stage svg path,#stage svg circle{vector-effect:non-scaling-stroke}
  #stage svg .experience-ground{opacity:.9;mask-image:radial-gradient(ellipse 55% 76% at 50% 50%,#000 58%,transparent 100%);-webkit-mask-image:radial-gradient(ellipse 55% 76% at 50% 50%,#000 58%,transparent 100%)}
  #stage svg .experience-dot{fill:none;stroke:#d6dcde;stroke-width:.7;stroke-linecap:round}
  #stage svg .experience-keyboard-body{fill:#f1f3f4;stroke:none}
  #stage svg .experience-keyboard-top{fill:#fff;stroke:none}
  #stage svg .experience-keyboard-outline{fill:none;stroke:#aeb5b7;stroke-width:var(--experience-contour);stroke-linejoin:round}
  #stage svg .experience-cube-front{fill:#fff;stroke:none}
  #stage svg .experience-cube-side{fill:#fafbfb;stroke:none}
  #stage svg .experience-cube-top{fill:#fff;stroke:none}
  #stage svg .experience-cube-outline{fill:none;stroke:#a9b0b2;stroke-width:var(--experience-contour);stroke-linejoin:round}
  #stage svg .experience-cube-seam{fill:none;stroke:#e0e4e5;stroke-width:.8;stroke-linecap:round;stroke-linejoin:round}
  #stage svg .experience-tube-shadow{fill:#e7e9ea;stroke:none}
  #stage svg .experience-tube-body{fill:#eef0f1;stroke:none}
  #stage svg .experience-tube-cap{fill:#f5f6f6;stroke:none}
  #stage svg .experience-tube-collar{fill:#ecefef;stroke:none;opacity:1}
  #stage svg .experience-tube-collar-center{fill:#f5f6f6;stroke:none;opacity:1}
  #stage svg .experience-slab{fill:#f5f6f6;stroke:#abb2b4;stroke-width:var(--experience-contour);stroke-linejoin:round}
  #stage svg .experience-slab-body{fill:#f1f3f4;stroke:none}
  #stage svg .experience-screen-face,#stage svg .experience-panel-face{fill:#fff;stroke:none}
  #stage svg .experience-ui-header{fill:#fbfcfc;stroke:none}
  #stage svg .experience-ui-feature{fill:#f7faf9;stroke:none}
  #stage svg .experience-ui-tile{fill:#f8f9f9;stroke:none}
  #stage svg .experience-ui-glass{fill:#ffffffb8;stroke:none}
  #stage svg .experience-text-bar{fill:#e0e4e6;stroke:none}
  #stage svg .experience-text-bar-light{fill:#e5e8e9;stroke:none}
  #stage svg .experience-label{fill:#fff;stroke:none;font-family:Arial,sans-serif;font-weight:400;letter-spacing:.12px}
  #stage svg .experience-ui-pill{fill:#e9ecee;stroke:none}
  #stage svg .experience-ui-search{fill:url(#experience-pink);stroke:none}
  #stage svg .experience-ui-chart-line{fill:none;stroke:${P.mintCyan.green};stroke-width:1.15;stroke-linecap:round;stroke-linejoin:round}
  #stage svg .experience-ui-hole{fill:#fff;stroke:none}
  #stage svg .experience-icon-well{fill:#f3f6f7;stroke:#e4e9ea;stroke-width:.65}
  #stage svg .experience-pack-glyph{fill:none;stroke:#bec5c7;stroke-width:2.6px;stroke-linecap:round;stroke-linejoin:round}
  #stage svg .experience-pack-glyph-ui{stroke-width:1.65px}
  #stage svg .experience-pack-glyph-light{stroke:#fff}
  #stage svg .experience-framer-mark{fill:#000;stroke:none}
  #stage svg .experience-slab-outline{fill:none;stroke:#aeb5b7;stroke-width:var(--experience-contour);stroke-linejoin:round}
  #stage svg .experience-hole{fill:#fff;stroke:#fff;stroke-width:.5}
  #stage svg .experience-detail{fill:none;stroke:#e1e5e6;stroke-width:.85;stroke-linecap:round}
  #stage svg .experience-icon-fill{fill:#c6cbcd;stroke:none}
  #stage svg .experience-mail{fill:#fff;stroke:none}
  #stage svg .experience-white{fill:#fff;stroke:#aeb4b8;stroke-width:1.2}
  #stage svg .experience-rear{fill:#f3f5f7;stroke:#c7ced0;stroke-width:1}
  #stage svg .experience-rim{stroke:#c6cbcc;stroke-width:1}
  #stage svg .experience-inner{stroke:#e2e5e7;stroke-width:1}
  #stage svg .experience-key{fill:#eef0f1;stroke:none}
  #stage svg .experience-sea{fill:url(#experience-sea);stroke:none}
  #stage svg .experience-sea-two{fill:url(#experience-sea-two);stroke:none}
  #stage svg .experience-warm{fill:url(#experience-warm);stroke:none}
  #stage svg .experience-pink{fill:url(#experience-pink);stroke:none}
  #stage svg .experience-disc{fill:url(#experience-disc);stroke:none}
  #stage svg .experience-chart{fill:url(#experience-chart);stroke:none}
  #stage svg .experience-chart-segment{stroke:none}
  #stage svg .experience-chart-segment--a{fill:url(#experience-pie-a)}
  #stage svg .experience-chart-segment--b{fill:url(#experience-pie-b)}
  #stage svg .experience-chart-segment--c{fill:url(#experience-pie-c)}
  #stage svg .experience-color-layer{stroke:none;pointer-events:none}
  #stage svg .experience-soft{fill:#e9ecee;stroke:none}
  #stage svg .experience-glyph{fill:none;stroke:#fff;stroke-width:1.15}
  #stage svg .experience-window-dot{stroke:none}
  #stage svg .experience-window-dot--0{fill:${P.pinkViolet.coral}}
  #stage svg .experience-window-dot--1{fill:${P.amberLime.light}}
  #stage svg .experience-window-dot--2{fill:${P.mintCyan.green}}
  #stage svg .experience-icon{fill:none;stroke:#b9c0c3;stroke-width:2.1}
  #stage svg circle.experience-icon{fill:#c7cbcd;stroke:none}
  @media(prefers-reduced-motion:reduce){#stage svg .experience-card{transition:none}}
</style>`;

const uiDocument = readFileSync(uiSource, "utf8");
const uiStyles = (uiDocument.match(/<style>([\s\S]*?)<\/style>/)?.[1] ?? "").replace(/\.preview[^{}]*\{[^{}]*\}/g, "");
const uiTemplates = Object.fromEntries([...uiDocument.matchAll(/<template id="([^"]+)">([\s\S]*?)<\/template>/g)].map(([, id, markup]) => [id, markup]));
const embeddedUiStyles = uiStyles.replace(/\/\*[\s\S]*?\*\//g, "")
  .replace(/(^|})\s*([^@}{][^{]+)\{/g, (rule, boundary, selectors) => {
    const scoped = selectors.split(",").map((selector) => {
      const trimmed = selector.trim();
      if (!trimmed) return "";
      if (trimmed === "*") return ".experience-ui-root, .experience-ui-root *";
      if (trimmed === "html,body") return ".experience-ui-root";
      if (trimmed === "html" || trimmed === "body") return ".experience-ui-root";
      if (trimmed === ".face") return ".experience-ui-root";
      if (trimmed.startsWith(".face ")) return `.experience-ui-root${trimmed.slice(5)}`;
      if (trimmed.startsWith(".face--")) return `.experience-ui-root${trimmed}`;
      return `.experience-ui-root ${trimmed}`;
    }).filter(Boolean).join(", ");
    return scoped ? `${boundary}\n${scoped}{` : `${boundary}{`;
  })
  .replace(/@media\s*\([^)]*\)\s*\{[\s\S]*?\n\}/g, "");

const uiProjection = `<script type="module">
  const svg = document.querySelector('#stage > svg');
  if (svg) {
    const ns = 'http://www.w3.org/2000/svg';
    const xhtml = 'http://www.w3.org/1999/xhtml';
    const defs = document.createElementNS(ns, 'defs');
    defs.innerHTML = \`
      <radialGradient id="experience-sea" cx=".24" cy=".22" r=".95"><stop offset="0" stop-color="${P.mintCyan.mint}"/><stop offset=".46" stop-color="${P.greenBlue.mint}"/><stop offset="1" stop-color="${P.greenBlue.blueLight}"/></radialGradient>
      <radialGradient id="experience-sea-two" cx=".24" cy=".22" r=".95"><stop offset="0" stop-color="${P.mintCyan.cyan}"/><stop offset=".48" stop-color="${P.greenBlue.teal}"/><stop offset="1" stop-color="${P.mintCyan.green}"/></radialGradient>
      <radialGradient id="experience-warm" cx=".24" cy=".22" r=".95"><stop offset="0" stop-color="${P.amberLime.amber}"/><stop offset=".42" stop-color="${P.amberLime.amber}"/><stop offset=".72" stop-color="${P.amberLime.lime}"/><stop offset="1" stop-color="${P.greenBlue.greenDeep}"/></radialGradient>
      <radialGradient id="experience-pink" cx=".24" cy=".22" r=".95"><stop offset="0" stop-color="${P.pinkViolet.rose}"/><stop offset=".42" stop-color="${P.pinkViolet.base}"/><stop offset="1" stop-color="${P.pinkViolet.violet}"/></radialGradient>
      <radialGradient id="experience-disc" cx=".24" cy=".22" r=".95"><stop offset="0" stop-color="${P.pinkViolet.violet}"/><stop offset=".36" stop-color="${P.pinkViolet.base}"/><stop offset=".66" stop-color="${P.amberLime.light}"/><stop offset="1" stop-color="${P.greenBlue.mint}"/></radialGradient>
      <radialGradient id="experience-chart" cx=".24" cy=".22" r=".95"><stop offset="0" stop-color="${P.pinkViolet.violet}"/><stop offset=".36" stop-color="${P.pinkViolet.rose}"/><stop offset=".7" stop-color="${P.amberLime.light}"/><stop offset="1" stop-color="${P.greenBlue.mint}"/></radialGradient>
      <radialGradient id="experience-pie-a" cx=".24" cy=".22" r=".95"><stop stop-color="${P.pinkViolet.violet}"/><stop offset=".55" stop-color="${P.pinkViolet.base}"/><stop offset="1" stop-color="${P.pinkViolet.coral}"/></radialGradient>
      <radialGradient id="experience-pie-b" cx=".24" cy=".22" r=".95"><stop stop-color="${P.amberLime.light}"/><stop offset=".55" stop-color="${P.pinkViolet.coral}"/><stop offset="1" stop-color="${P.pinkViolet.pink}"/></radialGradient>
      <radialGradient id="experience-pie-c" cx=".24" cy=".22" r=".95"><stop stop-color="${P.greenBlue.mint}"/><stop offset=".5" stop-color="${P.mintCyan.cyan}"/><stop offset="1" stop-color="${P.pinkViolet.violet}"/></radialGradient>
      <radialGradient id="experience-sea-a" cx=".13" cy=".12" r=".78"><stop stop-color="${P.mintCyan.cyan}" stop-opacity=".82"/><stop offset=".38" stop-color="${P.mintCyan.cyan}" stop-opacity=".37"/><stop offset="1" stop-color="${P.mintCyan.cyan}" stop-opacity="0"/></radialGradient>
      <radialGradient id="experience-sea-b" cx=".85" cy=".72" r=".78"><stop stop-color="${P.mintCyan.light}" stop-opacity=".70"/><stop offset=".43" stop-color="${P.mintCyan.mint}" stop-opacity=".34"/><stop offset="1" stop-color="${P.mintCyan.mint}" stop-opacity="0"/></radialGradient>
      <radialGradient id="experience-sea-two-a" cx=".83" cy=".18" r=".75"><stop stop-color="${P.greenBlue.mint}" stop-opacity=".80"/><stop offset=".42" stop-color="${P.mintCyan.cyan}" stop-opacity=".32"/><stop offset="1" stop-color="${P.mintCyan.cyan}" stop-opacity="0"/></radialGradient>
      <radialGradient id="experience-sea-two-b" cx=".20" cy=".80" r=".77"><stop stop-color="${P.mintCyan.light}" stop-opacity=".65"/><stop offset=".42" stop-color="${P.mintCyan.mint}" stop-opacity=".28"/><stop offset="1" stop-color="${P.mintCyan.mint}" stop-opacity="0"/></radialGradient>
      <radialGradient id="experience-warm-a" cx=".19" cy=".71" r=".76"><stop stop-color="${P.amberLime.orange}" stop-opacity=".72"/><stop offset=".44" stop-color="${P.amberLime.amber}" stop-opacity=".24"/><stop offset="1" stop-color="${P.amberLime.amber}" stop-opacity="0"/></radialGradient>
      <radialGradient id="experience-warm-b" cx=".86" cy=".47" r=".73"><stop stop-color="${P.greenBlue.greenDeep}" stop-opacity=".82"/><stop offset=".45" stop-color="${P.mintCyan.base}" stop-opacity=".27"/><stop offset="1" stop-color="${P.mintCyan.base}" stop-opacity="0"/></radialGradient>
      <radialGradient id="experience-pink-a" cx=".29" cy=".39" r=".70"><stop stop-color="${P.pinkViolet.pink}" stop-opacity=".80"/><stop offset=".40" stop-color="${P.pinkViolet.pink}" stop-opacity=".26"/><stop offset="1" stop-color="${P.pinkViolet.pink}" stop-opacity="0"/></radialGradient>
      <radialGradient id="experience-pink-b" cx=".89" cy=".69" r=".76"><stop stop-color="${P.pinkViolet.violet}" stop-opacity=".72"/><stop offset=".45" stop-color="${P.pinkViolet.violet}" stop-opacity=".23"/><stop offset="1" stop-color="${P.pinkViolet.violet}" stop-opacity="0"/></radialGradient>
      <radialGradient id="experience-disc-a" cx=".18" cy=".15" r=".78"><stop stop-color="${P.pinkViolet.deep}" stop-opacity=".66"/><stop offset=".45" stop-color="${P.pinkViolet.deep}" stop-opacity=".08"/><stop offset="1" stop-color="${P.pinkViolet.deep}" stop-opacity="0"/></radialGradient>
      <radialGradient id="experience-disc-b" cx=".81" cy=".72" r=".80"><stop stop-color="${P.amberLime.light}" stop-opacity=".50"/><stop offset=".42" stop-color="${P.amberLime.light}" stop-opacity=".12"/><stop offset="1" stop-color="${P.amberLime.light}" stop-opacity="0"/></radialGradient>
      <radialGradient id="experience-chart-a" cx=".18" cy=".20" r=".85"><stop stop-color="${P.pinkViolet.deep}" stop-opacity=".58"/><stop offset=".45" stop-color="${P.pinkViolet.deep}" stop-opacity=".10"/><stop offset="1" stop-color="${P.pinkViolet.deep}" stop-opacity="0"/></radialGradient>
      <radialGradient id="experience-chart-b" cx=".84" cy=".76" r=".79"><stop stop-color="${P.amberLime.light}" stop-opacity=".48"/><stop offset=".46" stop-color="${P.amberLime.light}" stop-opacity=".08"/><stop offset="1" stop-color="${P.amberLime.light}" stop-opacity="0"/></radialGradient>
      <radialGradient id="experience-edge" cx=".50" cy=".50" r=".72"><stop offset=".50" stop-color="#fff" stop-opacity="0"/><stop offset=".76" stop-color="#fff" stop-opacity=".35"/><stop offset="1" stop-color="#fff" stop-opacity=".82"/></radialGradient>
    \`;
    svg.prepend(defs);
    const templates = ${JSON.stringify(uiTemplates)};
    const interfaceStyle = ${JSON.stringify(embeddedUiStyles)};
    svg.querySelectorAll('.experience-ui-plane-marker').forEach(marker => {
      const corners = JSON.parse(marker.dataset.frameCorners);
      const [p0,p1,,p3] = corners;
      const width = Number(marker.dataset.frameWidth), height = Number(marker.dataset.frameHeight);
      const a = (p1[0] - p0[0]) / width, b = (p1[1] - p0[1]) / width;
      const c = (p3[0] - p0[0]) / height, d = (p3[1] - p0[1]) / height;
      const frame = document.createElementNS(ns, 'foreignObject');
      frame.setAttribute('x','0'); frame.setAttribute('y','0');
      frame.setAttribute('width',String(width)); frame.setAttribute('height',String(height));
      frame.setAttribute('transform','matrix(' + a + ' ' + b + ' ' + c + ' ' + d + ' ' + p0[0] + ' ' + p0[1] + ')');
      frame.setAttribute('class','experience-ui-frame');
      frame.setAttribute('pointer-events','none');
      const id = marker.dataset.uiFrame;
      const source = templates[id];
      const root = document.createElementNS(xhtml,'div');
      root.setAttribute('xmlns',xhtml);
      root.setAttribute('class','experience-ui-root face face--' + id);
      root.setAttribute('style','width:' + width + 'px;height:' + height + 'px');
      const openingTagEnd = source?.indexOf('>') ?? -1;
      const closingTagStart = source?.lastIndexOf('</div>') ?? -1;
      if (openingTagEnd < 0 || closingTagStart < openingTagEnd) { marker.remove(); return; }
      const style = document.createElementNS(xhtml,'style');
      style.textContent = interfaceStyle;
      root.append(style);
      root.insertAdjacentHTML('beforeend',source.slice(openingTagEnd + 1,closingTagStart));
      frame.append(root);
      const outline = marker.parentNode.querySelector(':scope > .experience-slab-outline');
      marker.parentNode.insertBefore(frame, outline || marker);
      marker.remove();
    });
    const colors = ['sea','sea-two','warm','disc','chart'];
    svg.querySelectorAll('.experience-sea,.experience-sea-two,.experience-warm,.experience-disc,.experience-chart,.experience-ui-search').forEach(shape => {
      const palette = shape.classList.contains('experience-ui-search') ? 'pink' : colors.find(name => shape.classList.contains('experience-' + name));
      const layer = fill => { const copy = shape.cloneNode(false); copy.setAttribute('class','experience-color-layer'); copy.style.fill = 'url(#experience-' + fill + ')'; return copy; };
      shape.after(layer(palette + '-a'), layer(palette + '-b'), layer('edge'));
    });
  }
</script>`;

const html = assemble(readFileSync(source, "utf8"))
  .replace("</head>", `${presentation}\n</head>`)
  .replace("</body>", `${uiProjection}\n</body>`);
writeFileSync(output, html);
console.log(output);
