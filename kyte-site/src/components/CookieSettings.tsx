"use client";

import { useEffect, useRef, useState } from "react";
import "./CookieSettings.css";

const COOKIE_NAME = "kyte_cookie_choice";

function hasChoice() {
  return document.cookie.split("; ").some((item) => item.startsWith(`${COOKIE_NAME}=`));
}

export function CookieSettings() {
  const [showNotice, setShowNotice] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setShowNotice(!hasChoice()));
    const openSettings = () => dialogRef.current?.showModal();
    window.addEventListener("kyte:cookie-settings", openSettings);
    return () => { window.cancelAnimationFrame(frame); window.removeEventListener("kyte:cookie-settings", openSettings); };
  }, []);

  const saveChoice = () => {
    document.cookie = `${COOKIE_NAME}=essential; Max-Age=15552000; Path=/; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
    setShowNotice(false);
    dialogRef.current?.close();
  };

  return <>
    {showNotice && <aside className="cookie-notice" aria-label="Cookie notice">
      <p>We use one essential cookie to remember your choice. Analytics and marketing cookies are not active.</p>
      <div><button type="button" className="cookie-notice__settings" onClick={() => dialogRef.current?.showModal()}>Cookie settings</button><button type="button" className="cookie-notice__accept" onClick={saveChoice}>Got it</button></div>
    </aside>}
    <dialog ref={dialogRef} className="cookie-dialog" aria-labelledby="cookie-dialog-title">
      <div className="cookie-dialog__top"><p className="eyebrow">YOUR PREFERENCES</p><button type="button" onClick={() => dialogRef.current?.close()} aria-label="Close cookie settings">×</button></div>
      <h2 id="cookie-dialog-title">Cookie settings</h2>
      <p>Kyte currently uses an essential cookie to remember that you have seen this notice. No analytics or marketing cookies are active on this site.</p>
      <div className="cookie-dialog__category"><span><strong>Essential</strong><small>Remembers your cookie choice for six months.</small></span><span>Always on</span></div>
      <button type="button" className="cookie-notice__accept" onClick={saveChoice}>Save settings</button>
    </dialog>
  </>;
}
