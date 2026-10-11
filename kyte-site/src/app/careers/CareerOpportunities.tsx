"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, Plus, X } from "lucide-react";
import type { CareerRole } from "@/lib/sanity";
import { isSafeApplicationUrl } from "@/lib/sanity";

const sampleLevels: Record<string, string> = {
  "product-designer": "Mid level",
  "ux-researcher": "Mid level",
  "ui-designer": "Entry level",
  "brand-designer": "Mid level",
  copywriter: "Entry level",
  "marketing-strategist": "Senior level",
};

export function CareerOpportunities({ roles }: { roles: CareerRole[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const [selected, setSelected] = useState<CareerRole | null>(null);

  function open(role: CareerRole, trigger: HTMLButtonElement) {
    triggerRef.current = trigger;
    setSelected(role);
    dialogRef.current?.showModal();
  }

  function close() { dialogRef.current?.close(); }

  return <>
    <ul className="careers-page__table" aria-label="Current opportunities">
      {roles.map(role => <li className="careers-page__table-row" key={role._id}>
        <strong className="careers-page__table-role">{role.title}</strong>
        <span className="careers-page__table-team">{[role.team, role.location].filter(Boolean).join(" · ")}</span>
        <span className="careers-page__table-level">{role.experienceLevel || sampleLevels[role.slug] || "Open level"}</span>
        <div className="careers-page__table-action"><button type="button" onClick={event => open(role, event.currentTarget)}>View details <Plus size={18} aria-hidden="true" /></button></div>
      </li>)}
    </ul>

    <dialog ref={dialogRef} className="careers-dialog" aria-labelledby="careers-dialog-title" onClose={() => { setSelected(null); triggerRef.current?.focus(); }} onClick={event => { if (event.target === dialogRef.current) close(); }}>
      {selected && <div className="careers-dialog__layout">
        <div className="careers-dialog__intro">
          <p className="careers-dialog__eyebrow">{selected.team || "Kyte team"}</p>
          <h2 id="careers-dialog-title">{selected.title}</h2>
          <p>{selected.summary}</p>
          <div className="careers-dialog__facts">
            <span>{selected.location}</span><span>{selected.workMode}</span>
            <span>{selected.experienceLevel || sampleLevels[selected.slug] || "Open level"}</span>
            {selected.employmentType && <span>{selected.employmentType}</span>}
          </div>
        </div>
        <div className="careers-dialog__body">
          <button className="careers-dialog__close" type="button" aria-label="Close role details" onClick={close}><X size={21} aria-hidden="true" /></button>
          <div className="careers-dialog__content">
            {selected.responsibilities?.length > 0 && <section><h3>What you will do</h3><ul>{selected.responsibilities.map((item, index) => <li key={`${index}-${item}`}>{item}</li>)}</ul></section>}
            {selected.requirements?.length > 0 && <section><h3>What we are looking for</h3><ul>{selected.requirements.map((item, index) => <li key={`${index}-${item}`}>{item}</li>)}</ul></section>}
            {selected.hiringProcess && <section><h3>Hiring process</h3><p>{selected.hiringProcess}</p></section>}
          </div>
          <div className="careers-dialog__footer">{isSafeApplicationUrl(selected.applyUrl) ? <a className="kyte-button careers-dialog__apply" href={selected.applyUrl!} target="_blank" rel="noopener noreferrer">Apply now <ArrowUpRight size={17} aria-hidden="true" /></a> : <button className="kyte-button careers-dialog__apply" type="button" disabled>Apply now</button>}</div>
        </div>
      </div>}
    </dialog>
  </>;
}
