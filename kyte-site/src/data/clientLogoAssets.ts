const coloredClientLogos: Record<string, readonly [number, number]> = {
  lovable: [646, 109], district: [503, 202], "itc-infotech": [192, 200],
  decathlon: [951, 144], "gully-labs": [590, 158], "red-rhino": [209, 200],
  fincart: [813, 200], agilitas: [596, 221], mad: [504, 200],
  banza: [290, 69], "revenue-grid": [382, 108],
};

const monochromeClientLogos: Record<string, readonly [number, number]> = {
  "jio-hotstar": [316, 84], "daily-objects": [542, 138],
  "wispr-flow": [816, 126], emergent: [152, 34], comet: [255, 109],
  btg: [150, 105], "smash-guys": [151, 166], "hot-ice": [570, 418],
  kiara: [638, 526], amaivi: [352, 58], "papa-johns": [154, 99],
  "crepdog-crew": [170, 88], contractzy: [816, 200],
};

export function hasColoredClientLogo(slug: string) {
  return slug in coloredClientLogos;
}

export function clientLogoAsset(slug: string) {
  const colored = hasColoredClientLogo(slug);
  const [width, height] = (colored ? coloredClientLogos : monochromeClientLogos)[slug] ?? [240, 100];
  return {
    src: colored ? `/client-logos/color/${slug}.png` : `/client-logos/${slug}.avif`,
    width,
    height,
    colored,
  };
}
