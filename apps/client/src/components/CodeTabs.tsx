"use client";

import * as React from "react";
import { CopyButton } from "@/components/ui/CopyButton";

export type Tab = { id: string; label: string; code: React.ReactNode; raw: string };

export function CodeTabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = React.useState(tabs[0].id);
  const current = tabs.find((t) => t.id === active) ?? tabs[0];
  return (
    <div className="code">
      <div className="code-head">
        <div className="tabs">
          {tabs.map((t) => (
            <button key={t.id} className={t.id === active ? "on" : ""} onClick={() => setActive(t.id)}>
              {t.label}
            </button>
          ))}
        </div>
        <CopyButton text={current.raw} label="Copy" className="btn ghost sm copy" />
      </div>
      <pre>{current.code}</pre>
    </div>
  );
}
