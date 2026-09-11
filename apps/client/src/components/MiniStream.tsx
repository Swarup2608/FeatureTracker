"use client";

import * as React from "react";
import { liveTemplates } from "@/lib/data";

type Row = { id: number; tmpl: [string, string, string]; ts: string; fresh: boolean };

function now() {
  const d = new Date();
  return d.toLocaleTimeString("en-GB") + "." + String(d.getMilliseconds()).padStart(3, "0");
}
const pick = (i: number): [string, string, string] => liveTemplates[i % liveTemplates.length];

export function MiniStream({ rows: keep = 6, variant = "stream" }: { rows?: number; variant?: "stream" | "demo" }) {
  const [rows, setRows] = React.useState<Row[]>(() =>
    Array.from({ length: keep }, (_, i) => ({ id: -i, tmpl: pick(i * 2 + 1), ts: "—", fresh: false })),
  );
  const seed = React.useRef(7);

  React.useEffect(() => {
    const raf = requestAnimationFrame(() => setRows((rs) => rs.map((r) => ({ ...r, ts: now() }))));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const iv = setInterval(
      () => {
        seed.current = (seed.current * 1103515245 + 12345) % 2147483648;
        const idx = Math.floor((seed.current / 2147483648) * 97);
        setRows((rs) => [{ id: Date.now(), tmpl: pick(idx), ts: now(), fresh: true }, ...rs.map((r) => ({ ...r, fresh: false }))].slice(0, keep));
      },
      reduce ? 3600 : 2500,
    );
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(iv);
    };
  }, [keep]);

  if (variant === "demo") {
    return (
      <div>
        {rows.map((r) => (
          <div className={`drow ${r.fresh ? "fresh" : ""}`} key={r.id}>
            <span className="dt" />
            {r.tmpl[0]} · {r.tmpl[1].split("@")[0]}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="stream" style={{ maxHeight: 280 }}>
      {rows.map((r) => (
        <div className={`stream-row ${r.fresh ? "fresh" : ""}`} key={r.id}>
          <span className="ts" suppressHydrationWarning>
            {r.ts}
          </span>
          <span>
            <span className="ev">{r.tmpl[0]}</span> <span className="who">{r.tmpl[1]}</span>
          </span>
          <span className="props">{r.tmpl[2]}</span>
        </div>
      ))}
    </div>
  );
}
