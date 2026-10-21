import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { assemble } from "../../.agents/skills/hairline-create/build.mjs";

const source = fileURLToPath(new URL("./product-dashboard-laptop.js", import.meta.url));
const uiSource = fileURLToPath(new URL("./product-dashboard-laptop-ui.html", import.meta.url));
const output = fileURLToPath(new URL("../public/hairline/product-dashboard-laptop-embed.html", import.meta.url));
const uiDocument = readFileSync(uiSource, "utf8");
const uiStyles = uiDocument.match(/<style>([\s\S]*?)<\/style>/)?.[1] ?? "";
const uiTemplates = Object.fromEntries([...uiDocument.matchAll(/<template id="([^"]+)">([\s\S]*?)<\/template>/g)].map(([, id, markup]) => [id, markup]));
const scopedStyles = uiStyles.replace(/\/\*[\s\S]*?\*\//g, "")
  .replace(/\.preview[^{}]*\{[^{}]*\}/g, "")
  .replace(/(^|})\s*([^@}{][^{]+)\{/g, (rule, boundary, selectors) => {
    const scoped = selectors.split(",").map(selector => {
      const value = selector.trim();
      if (!value) return "";
      if (value === "html" || value === "body") return "";
      if (value === "*") return ".laptop-ui-root, .laptop-ui-root *";
      if (value === ".face") return ".laptop-ui-root";
      if (value.startsWith(".face ")) return `.laptop-ui-root${value.slice(5)}`;
      if (value.startsWith(".face--")) return `.laptop-ui-root${value}`;
      return `.laptop-ui-root ${value}`;
    }).filter(Boolean).join(", ");
    return scoped ? `${boundary}\n${scoped}{` : `${boundary}\n@media all{`;
  });

const presentation = `<style id="product-dashboard-laptop-presentation">
html,body{width:100%;height:100%;margin:0;padding:0;overflow:hidden;color-scheme:light}body{display:block;background:#f8f9f9}main{height:100%;max-width:none;padding:0}.plate{height:100%;padding:0;border:0;border-radius:0;overflow:hidden}#stage,#stage>svg{display:block;width:100%;height:100%}#stage>svg{overflow:visible}.controls,#means,#rules,#error,.tag{display:none!important}
#stage svg path{vector-effect:non-scaling-stroke}.laptop-ground{opacity:.82;mask-image:radial-gradient(ellipse 48% 47% at 50% 53%,#000 30%,transparent 100%);-webkit-mask-image:radial-gradient(ellipse 48% 47% at 50% 53%,#000 30%,transparent 100%)}.laptop-grid{fill:none;stroke:#e7e9e9;stroke-width:.62}.laptop-thickness{fill:#f0f2f2;stroke:none}.laptop-face{fill:#fff;stroke:none}.laptop-outline{fill:none;stroke:#a8afb1;stroke-width:1.45;stroke-linejoin:round}.laptop-key{fill:#eceeee;stroke:none}.laptop-trackpad{fill:#fff;stroke:#e7eaea;stroke-width:.75;stroke-linejoin:round}
</style>`;

const projection = `<script type="module">
const svg=document.querySelector('#stage>svg');
if(svg){svg.setAttribute('viewBox','0 0 400 260');const ns='http://www.w3.org/2000/svg',xhtml='http://www.w3.org/1999/xhtml',templates=${JSON.stringify(uiTemplates)},css=${JSON.stringify(scopedStyles)};svg.querySelectorAll('.laptop-ui-plane-marker').forEach(marker=>{const corners=JSON.parse(marker.dataset.frameCorners),[p0,p1,,p3]=corners,width=Number(marker.dataset.frameWidth),height=Number(marker.dataset.frameHeight),a=(p1[0]-p0[0])/width,b=(p1[1]-p0[1])/width,c=(p3[0]-p0[0])/height,d=(p3[1]-p0[1])/height,frame=document.createElementNS(ns,'foreignObject');frame.setAttribute('x','0');frame.setAttribute('y','0');frame.setAttribute('width',width);frame.setAttribute('height',height);frame.setAttribute('transform','matrix('+a+' '+b+' '+c+' '+d+' '+p0[0]+' '+p0[1]+')');frame.setAttribute('pointer-events','none');const root=document.createElementNS(xhtml,'div');root.setAttribute('xmlns',xhtml);root.setAttribute('class','laptop-ui-root face face--'+marker.dataset.uiFrame);root.setAttribute('style','width:'+width+'px;height:'+height+'px');const source=templates[marker.dataset.uiFrame],open=source.indexOf('>'),close=source.lastIndexOf('</div>'),style=document.createElementNS(xhtml,'style');style.textContent=css;root.append(style);root.insertAdjacentHTML('beforeend',source.slice(open+1,close));frame.append(root);const outline=marker.parentNode.querySelector(':scope>.laptop-outline');marker.parentNode.insertBefore(frame,outline||marker);marker.remove()})}
</script>`;

const html = assemble(readFileSync(source, "utf8"))
  .replace("</head>", `${presentation}\n</head>`)
  .replace("</body>", `${projection}\n</body>`);
writeFileSync(output, html);
console.log(output);
