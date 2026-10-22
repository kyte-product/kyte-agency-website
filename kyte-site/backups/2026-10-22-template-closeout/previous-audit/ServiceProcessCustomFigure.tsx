const customFigureKinds = ["palette", "storyboard", "social-map", "content-grid", "publishing", "search-map", "index-grid"] as const;

export type CustomProcessFigureKind = (typeof customFigureKinds)[number];

export function isCustomProcessFigure(kind: string): kind is CustomProcessFigureKind {
  return customFigureKinds.includes(kind as CustomProcessFigureKind);
}

export function ServiceProcessCustomFigure({ kind }: { kind: CustomProcessFigureKind }) {
  return <svg className="service-process__figure service-process__figure--custom" data-figure={kind} viewBox="0 0 200 166" fill="none" aria-hidden="true" focusable="false">
    <g className="service-process__custom-line" strokeLinejoin="round" strokeLinecap="round">
      {kind === "palette" && <>
        <path d="M34 55 116 26l54 30-82 30-54-31Zm0 0v46l54 32V86m82-30v46l-82 31" />
        <path d="m48 57 68-24 15 8-68 25-15-9Zm22 21 70-26 14 8-69 26-15-8Z" />
        <path className="service-process__custom-accent" d="m48 91 13 7 13-5-13-7-13 5Zm32 15 13 7 13-5-13-7-13 5Zm32 13 13 7 13-5-13-7-13 5Z" />
        <path d="m42 110 42 24m50-2 31-12" />
      </>}
      {kind === "storyboard" && <>
        <path d="m22 49 45-16 28 16-45 17-28-17Zm51 18 45-16 28 16-45 17-28-17Zm51 18 45-16 18 11-45 17-18-12Z" />
        <path d="m22 49 1 48 27 16V66m45-17 1 48-46 16m23-46 1 48 27 16V84m45-17 1 48-46 16m23-46 1 48 18 11V97m45-17v48l-45 16" />
        <path className="service-process__custom-accent" d="m31 79 12 7-12 7m54 6 11 6-11 8m54 4 11 6-11 7" />
        <path d="M56 76h7m46 19h7m44 17h7" />
      </>}
      {kind === "social-map" && <>
        <path d="m100 76-49-25m49 25 46-28m-46 28-49 45m49-45 48 46" />
        <path d="m82 69 18-11 19 11v21l-19 11-18-11V69ZM25 40l26-15 26 15v22L51 77 25 62V40Zm99-3 24-14 25 14v22l-25 14-24-14V37ZM25 111l26-14 26 14v22l-26 14-26-14v-22Zm99 1 24-14 25 14v22l-25 14-24-14v-22Z" />
        <path className="service-process__custom-accent" d="m91 75 9-5 9 5v10l-9 5-9-5V75Zm-49-28h18m79 0h18M42 120h18m79 0h18" />
      </>}
      {kind === "content-grid" && <>
        <path d="m27 54 98-35 48 28-98 36-48-29Zm0 0v66l48 29V83m98-36v66l-98 36" />
        <path d="m40 57 27-10 14 8-27 10-14-8Zm34-13 27-10 14 8-27 10-14-8Zm33 33 27-10 14 8-27 10-14-8Zm-34 13 27-10 14 8-27 10-14-8Z" />
        <path className="service-process__custom-accent" d="m42 77 19 11v24L42 101V77Zm29 16 19 11v24l-19-11V93Zm30 16 19 11v24l-19-11v-24Z" />
      </>}
      {kind === "publishing" && <>
        <path d="m22 52 52-19 29 16-53 20-28-17Zm0 0v62l28 17V69m53-20v62l-53 20m-17-73 39-14m-36 25 34-12m-33 26 30-11" />
        <path d="M126 42h48v83h-48V42Zm0 12h48m-48 57h48m-40-50h32v42h-32V61Z" />
        <path className="service-process__custom-accent" d="m87 78 27-1m-9-10 10 10-10 10m30-8 14-9 17 10-14 9-17-10Z" />
        <path d="m135 96 24-1" />
      </>}
      {kind === "search-map" && <>
        <circle cx="60" cy="60" r="24" /><path className="service-process__custom-accent" d="m76 78 24 24m-52-42h24m-12-12v24" />
        <path d="M105 39h68v29h-68V39Zm0 46h68v29h-68V85Zm0 46h68v22h-68v-22ZM95 59h10m-8 39h8m-8 44h8" />
        <path d="m116 50 20-7m-20 16 42-15m-42 48 22-3m-22 14 41-6m-41 40 22-3" />
        <circle className="service-process__custom-accent" cx="165" cy="51" r="3" /><circle cx="165" cy="97" r="3" /><circle cx="165" cy="141" r="3" />
      </>}
      {kind === "index-grid" && <>
        <path d="m25 36 99-20 51 27-99 22-51-29Zm0 0v93l51 27V65m99-22v92l-99 21" />
        <path d="m37 55 29 17m-29-4 29 17m-29-4 29 17m-29-4 29 17m-29-4 29 17" />
        <path d="m87 76 63-14m-63 29 63-14m-63 29 63-14m-63 29 63-14m-63 29 63-14" />
        <path className="service-process__custom-accent" d="m154 61 4 4 7-10m-11 21 4 4 7-10m-11 21 4 4 7-10m-11 21 4 4 7-10m-11 21 4 4 7-10" />
      </>}
    </g>
  </svg>;
}
