# Additional brand-blue variant

The seven original measured palettes below are preserved. The user requested an additive brand-blue version on 22 October 2026. Its tokens are `src/design-tokens/illustration-brand.json`; generated files are stored separately under `public/hairline/brand/`. See [the Product system](../docs/design-systems/product.md).

# Illustration palette library

The canonical data is `kyte-site/src/design-tokens/illustration-palettes.json`. Update that data, then run the palette builder, material CSS generator and illustration builders. Do not edit generated swatches. Values are measured median 3 × 3 pixel samples of visible baked AVIF material, not recovered shader inputs.

## greenBlue: Green / cyan / blue prism

[Original asset](https://cdn.prod.website-files.com/6a3a8ae7bfc35ce0187d9cfc/6aab98be97182f0dc6fbf4c9_ui%20-%206.avif), 824 × 596.

| Token | Hex | Source pixel |
| --- | --- | --- |
| greenBlue.base | #3dbfcc | 415, 250 |
| greenBlue.mint | #79edc9 | 355, 140 |
| greenBlue.blueLight | #4babf7 | 451, 139 |
| greenBlue.green | #44d091 | 340, 270 |
| greenBlue.greenDeep | #39c187 | 370, 369 |
| greenBlue.blue | #2a94e2 | 480, 220 |
| greenBlue.teal | #36b7bb | 448, 357 |

## amberGreen: Amber / green decision cube

[Original asset](https://cdn.prod.website-files.com/6a3a8ae7bfc35ce0187d9cfc/6aab98be55285918a1051d4a_ui%20-%205.avif), 824 × 596.

| Token | Hex | Source pixel |
| --- | --- | --- |
| amberGreen.base | #f0a91a | 405, 235 |
| amberGreen.amber | #fda30c | 346, 240 |
| amberGreen.gold | #f4b829 | 365, 179 |
| amberGreen.lime | #cbc53b | 414, 133 |
| amberGreen.green | #0db340 | 492, 235 |
| amberGreen.olive | #91ae36 | 459, 192 |
| amberGreen.light | #d0cb30 | 428, 300 |

## amberLime: Orange / lime floating card

[Original asset](https://cdn.prod.website-files.com/6a3a8ae7bfc35ce0187d9cfc/6aab98c083de71ccef643ec0_ui%20-%2013.avif), 704 × 480.

| Token | Hex | Source pixel |
| --- | --- | --- |
| amberLime.base | #f7a70f | 332, 216 |
| amberLime.orange | #ff8f02 | 323, 172 |
| amberLime.amber | #feaa15 | 390, 215 |
| amberLime.lime | #accc1e | 219, 211 |
| amberLime.green | #65b446 | 284, 262 |
| amberLime.gold | #bbb733 | 367, 270 |
| amberLime.light | #dcc640 | 420, 250 |

## pinkViolet: Pink / violet interface panel

[Original asset](https://cdn.prod.website-files.com/6a3a8ae7bfc35ce0187d9cfc/6aab98bfe5d8746c2e91a768_ui%20-%2015.avif), 704 × 480.

| Token | Hex | Source pixel |
| --- | --- | --- |
| pinkViolet.base | #fb8bbe | 245, 260 |
| pinkViolet.coral | #fd91af | 281, 180 |
| pinkViolet.pink | #fd73b7 | 192, 243 |
| pinkViolet.violet | #c396fd | 299, 294 |
| pinkViolet.rose | #fc92b8 | 272, 221 |
| pinkViolet.light | #fcaedd | 189, 346 |
| pinkViolet.deep | #c596ff | 279, 315 |

## coralViolet: Coral / pink / violet sphere

[Original asset](https://cdn.prod.website-files.com/6a3a8ae7bfc35ce0187d9cfc/6aab98be61e5bde4091a7a9e_ui%20-%207.avif), 824 × 596.

| Token | Hex | Source pixel |
| --- | --- | --- |
| coralViolet.base | #fd88ae | 350, 277 |
| coralViolet.coral | #fc8297 | 319, 226 |
| coralViolet.pink | #fb6fc4 | 397, 278 |
| coralViolet.violet | #c590fd | 316, 326 |
| coralViolet.rose | #fd92ae | 348, 238 |
| coralViolet.light | #fba6df | 380, 324 |
| coralViolet.deep | #ec91f9 | 313, 309 |

## amberViolet: Amber / violet rounded pyramid

[Original asset](https://cdn.prod.website-files.com/6a3a8ae7bfc35ce0187d9cfc/6aab98bf50959a21b838ece6_ui%20-%2016.avif), 704 × 480.

| Token | Hex | Source pixel |
| --- | --- | --- |
| amberViolet.base | #f1994c | 553, 116 |
| amberViolet.light | #ebaaa5 | 550, 62 |
| amberViolet.orange | #f3924f | 579, 119 |
| amberViolet.violet | #d5aaed | 503, 128 |
| amberViolet.amber | #f2bb63 | 551, 155 |
| amberViolet.coral | #f3b173 | 590, 137 |
| amberViolet.rose | #eeb99f | 525, 96 |

## mintCyan: Mint / cyan chart ring

[Original asset](https://cdn.prod.website-files.com/6a3a8ae7bfc35ce0187d9cfc/6aab98bfe5d8746c2e91a768_ui%20-%2015.avif), 704 × 480.

| Token | Hex | Source pixel |
| --- | --- | --- |
| mintCyan.base | #44ce88 | 440, 159 |
| mintCyan.mint | #6be4af | 424, 133 |
| mintCyan.blue | #49c3d0 | 387, 181 |
| mintCyan.teal | #3cbfb0 | 402, 219 |
| mintCyan.green | #7cdbaa | 439, 190 |
| mintCyan.cyan | #75ccdb | 385, 200 |
| mintCyan.light | #57db9f | 419, 142 |

## Illustration assignments

| Illustration | Allowed palette families |
| --- | --- |
| product-experience | greenBlue, pinkViolet, amberLime, mintCyan |
| product-orbit | greenBlue, mintCyan |
| product-dashboard-laptop | pinkViolet, mintCyan |
| product-complex-system | greenBlue |
| product-evolving-experience | coralViolet |
| product-research-audit | amberGreen |
| product-website-design | greenBlue |
| product-mobile-app | pinkViolet |
| product-saas-web-app | greenBlue |
| product-commerce | amberLime |
| product-stage-new | greenBlue |
| product-stage-growth | pinkViolet |
| product-stage-established | amberGreen |
| product-stage-tools | greenBlue |
| product-stage-commerce | amberLime |
| product-stage-web | coralViolet |
| product-stage-systems | pinkViolet |
| product-stage-brands | amberViolet |
| product-onboarding | greenBlue |
| product-navigation | greenBlue, amberLime |
| product-workflow-hub | greenBlue, pinkViolet, amberLime, mintCyan |
| product-content-journey | greenBlue, pinkViolet, amberLime |
| product-design-patterns | greenBlue, pinkViolet, amberLime |
| product-responsive-experience | greenBlue, pinkViolet |
| service-research-hero | greenBlue, pinkViolet, amberLime |
| service-website-hero | greenBlue, pinkViolet, amberLime |
| service-mobile-hero | greenBlue, pinkViolet, amberLime |
| service-saas-hero | greenBlue, pinkViolet, amberLime |
| service-commerce-hero | greenBlue, pinkViolet, amberLime |
| process-discover | mintCyan |
| process-define | pinkViolet |
| process-develop | amberLime |
| process-deliver | mintCyan |

Lighting may vary by shape and face, but new base colors require a documented library update. Use one continuous material across a solid when the reference does; avoid restarting the hue arrangement on each face. Keep actual brand marks unchanged. Neutral linework and browser-control signal colors have separate roles.
