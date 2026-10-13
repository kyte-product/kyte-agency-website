"use client";

import { useSyncExternalStore } from "react";

type Palette = "stripe" | "kyte";

function currentPalette(): Palette {
  return document.documentElement.dataset.palette === "kyte" ? "kyte" : "stripe";
}

function subscribeToPalette(callback: () => void) {
  window.addEventListener("kyte-palette-change", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("kyte-palette-change", callback);
    window.removeEventListener("storage", callback);
  };
}

export function PaletteControls() {
  const palette = useSyncExternalStore(subscribeToPalette, currentPalette, () => "stripe");

  function choose(next: Palette) {
    document.documentElement.dataset.palette = next;
    try { localStorage.setItem("kyte-color-palette", next); } catch { /* The switch still works for this page. */ }
    window.dispatchEvent(new Event("kyte-palette-change"));
  }

  return <div className="team-system__palette-switch" role="group" aria-label="Website color palette">
    <span>Preview the site palette</span>
    <div>
      <button type="button" aria-pressed={palette === "stripe"} onClick={() => choose("stripe")}>Stripe inspired</button>
      <button type="button" aria-pressed={palette === "kyte"} onClick={() => choose("kyte")}>Original Kyte</button>
    </div>
    <p>Your choice applies across the local site and is saved in this browser. You can switch back at any time.</p>
  </div>;
}
