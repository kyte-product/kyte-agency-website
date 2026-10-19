import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { assemble } from "../../.agents/skills/hairline-create/build.mjs";

const source = fileURLToPath(new URL("./product-experience.js", import.meta.url));
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
  #stage svg path,#stage svg circle{vector-effect:non-scaling-stroke}
  #stage svg .experience-ground{opacity:.66}
  #stage svg .experience-dot{stroke:#dce3e5;stroke-width:.55}
  #stage svg .experience-keyboard-body{fill:#f4f6f6;stroke:#aeb5b7;stroke-width:1.05;stroke-linejoin:round}
  #stage svg .experience-keyboard-top{fill:#fff;stroke:none}
  #stage svg .experience-keyboard-crease{fill:none;stroke:#e2e6e7;stroke-width:.8}
  #stage svg .experience-cube-front{fill:#fff;stroke:none}
  #stage svg .experience-cube-side{fill:#fafbfb;stroke:none}
  #stage svg .experience-cube-top{fill:#fff;stroke:none}
  #stage svg .experience-cube-outline{fill:none;stroke:#a9b0b2;stroke-width:1.05;stroke-linejoin:round}
  #stage svg .experience-cube-seam{fill:none;stroke:#c5cbcd;stroke-width:.8;stroke-linecap:round;stroke-linejoin:round}
  #stage svg .experience-wire-outer{fill:none;stroke:#d8dddf;stroke-width:7;stroke-linecap:round;stroke-linejoin:round}
  #stage svg .experience-wire-inner{fill:none;stroke:#f4f6f6;stroke-width:5;stroke-linecap:round;stroke-linejoin:round}
  #stage svg .experience-slab{fill:#f5f6f6;stroke:#abb2b4;stroke-width:1.05;stroke-linejoin:round}
  #stage svg .experience-screen-face,#stage svg .experience-panel-face{fill:#fff;stroke:#aeb5b7;stroke-width:1.05;stroke-linejoin:round}
  #stage svg .experience-hole{fill:#fff;stroke:#fff;stroke-width:.5}
  #stage svg .experience-screen-rule,#stage svg .experience-detail{fill:none;stroke:#e1e5e6;stroke-width:.85;stroke-linecap:round}
  #stage svg .experience-icon-fill{fill:#c6cbcd;stroke:none}
  #stage svg .experience-icon-outline{fill:none;stroke:#c0c6c8;stroke-width:1.35;stroke-linecap:round;stroke-linejoin:round}
  #stage svg .experience-mail{fill:#fff;stroke:#fff;stroke-width:.8}
  #stage svg .experience-white{fill:#fff;stroke:#aeb4b8;stroke-width:1.2}
  #stage svg .experience-rear{fill:#f3f5f7;stroke:#c7ced0;stroke-width:1}
  #stage svg .experience-rim{stroke:#c6cbcc;stroke-width:1}
  #stage svg .experience-inner{stroke:#e2e5e7;stroke-width:1}
  #stage svg .experience-key{fill:#eef0f1;stroke:#fff;stroke-width:.85}
  #stage svg .experience-sea{fill:url(#experience-sea);stroke:#dcf0e9;stroke-width:.55}
  #stage svg .experience-sea-two{fill:url(#experience-sea-two);stroke:#dcf0e9;stroke-width:.55}
  #stage svg .experience-warm{fill:url(#experience-warm);stroke:#f5d66f;stroke-width:.7}
  #stage svg .experience-pink{fill:url(#experience-pink);stroke:#f1b7d9;stroke-width:.7}
  #stage svg .experience-disc{fill:url(#experience-disc);stroke:none}
  #stage svg .experience-chart{fill:url(#experience-chart);stroke:none}
  #stage svg .experience-soft{fill:#e9ecee;stroke:none}
  #stage svg .experience-glyph{fill:none;stroke:#fff;stroke-width:1.15}
  #stage svg .experience-window-dot{stroke:none}
  #stage svg .experience-window-dot--0{fill:#ff756d}
  #stage svg .experience-window-dot--1{fill:#f5c350}
  #stage svg .experience-window-dot--2{fill:#8dd56f}
  #stage svg .experience-wire{stroke:#d5d9d9;stroke-width:1.2}
  #stage svg .experience-socket{fill:#f4f6f7;stroke:#d6dadd;stroke-width:.8}
  #stage svg .experience-icon{fill:none;stroke:#b9c0c3;stroke-width:2.1}
  #stage svg circle.experience-icon{fill:#c7cbcd;stroke:none}
  @media(prefers-reduced-motion:reduce){#stage svg .experience-card{transition:none}}
</style>`;

const gradients = `<script type="module">
  const svg = document.querySelector('#stage > svg');
  if (svg) {
    const ns = 'http://www.w3.org/2000/svg';
    const defs = document.createElementNS(ns, 'defs');
    defs.innerHTML = \`
      <linearGradient id="experience-sea" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#b9e9f9"/><stop offset=".28" stop-color="#82dbd2"/><stop offset=".67" stop-color="#7ae5a7"/><stop offset="1" stop-color="#b7f7d6"/></linearGradient>
      <linearGradient id="experience-sea-two" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#82d9f2"/><stop offset=".4" stop-color="#6bdbbd"/><stop offset="1" stop-color="#aaf0bf"/></linearGradient>
      <linearGradient id="experience-warm" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffb62d"/><stop offset=".32" stop-color="#ffb83a"/><stop offset=".72" stop-color="#9edb52"/><stop offset="1" stop-color="#13bf7c"/></linearGradient>
      <linearGradient id="experience-pink" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffcfeb"/><stop offset=".3" stop-color="#ff88bf"/><stop offset=".7" stop-color="#e74eab"/><stop offset="1" stop-color="#b949ed"/></linearGradient>
      <linearGradient id="experience-disc" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#aa9bfa"/><stop offset=".3" stop-color="#f99bce"/><stop offset=".65" stop-color="#ffc65d"/><stop offset="1" stop-color="#8ce9c9"/></linearGradient>
      <linearGradient id="experience-chart" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#a394f8"/><stop offset=".36" stop-color="#f5a7c7"/><stop offset=".7" stop-color="#ffca64"/><stop offset="1" stop-color="#99e6c8"/></linearGradient>
    \`;
    svg.prepend(defs);
  }
</script>`;

const html = assemble(readFileSync(source, "utf8"))
  .replace("</head>", `${presentation}\n</head>`)
  .replace("</body>", `${gradients}\n</body>`);
writeFileSync(output, html);
console.log(output);
