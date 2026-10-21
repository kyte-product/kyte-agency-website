---
name: kyte-isometric-art
description: Build or revise custom Kyte isometric Hairline illustrations with one camera, surface-mapped details, coherent rounded solids, and restrained gradients.
---

# Kyte isometric artwork

Use this with `.agents/skills/hairline-create/SKILL.md` when a Kyte page needs a custom isometric figure. Keep the Hairline kernel and bench unchanged. The figure remains editable SVG geometry; site-specific colour belongs in a separate presentation layer.

## Construct the scene

1. Describe the world objects and their depth order before drawing. Choose one `Cam(45, 0.5, S)`, call `fit` once for the entire extreme pose, then derive one `P = proj(C)`. All objects use `P`. At this camera, +x descends right, +y descends left, and +z rises.
2. Give each object local coordinates on its actual plane. A vertical interface uses `(x,z)` at a fixed `y`; a keyboard uses `(x,y)` at a fixed `z`; cube icons use the same local face plane as the face that holds them. Project every point of outlines, insets, pictograms, rings, and charts through that plane. Never paste a screen-space circle onto a tilted surface.
3. Treat interface screens and floating cards as planar UI surfaces: one rounded contour per panel, with a radius based on its shorter world dimension and the same fine stroke scale throughout. Do not add a second outline unless the object clearly has physical thickness. For genuinely extruded solids, align front and back rings and join their visible sides cleanly.
4. Build each cuboid from one projected outer hull, filled visible faces, and only the visible seams. Round the silhouette. Avoid stacking unrelated rectangles to simulate thickness. Draw connectors behind their endpoints, in world coordinates, and check that their contact points meet the objects.
5. Paint back to front. Keep far edges and cables hidden by nearer opaque surfaces. Use subdued hairline contours, almost-white surfaces, and restrained gradients on selected content planes. Put multistop gradients in the website presentation CSS or SVG defs, never in the validated Hairline figure source.
6. Make the rest pose readable. Add interaction only through Hairline's pointer and registered clock. Keep hit zones in the rest pose. Respect reduced motion.

## Review before handoff

- Compare at the artwork's intended desktop size with the supplied reference. Check screen and keyboard axes, every panel's perspective, cube spacing, cable joins, rounded corners, and line hierarchy.
- Check that a donut, icon, chart, or dot follows its parent plane. If it reads as a flat sticker, rebuild it from local coordinates.
- Check all extrema for clipping, validate the standalone Hairline bench, and inspect the rendered site. Report any visual check that could not run.
- Keep the figure source, generated standalone bench, site embed, and `kyte-site/hairline/README.md` aligned. Update `WEBSITE_PROGRESS.md` for the task.
