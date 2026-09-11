"use client";

import * as React from "react";

const ACCENTS: { id: string; label: string; swatch: string }[] = [
  { id: "blue", label: "Blue", swatch: "#3f83e0" },
  { id: "emerald", label: "Emerald", swatch: "#12b083" },
  { id: "violet", label: "Violet", swatch: "#7d5ae0" },
  { id: "amber", label: "Amber", swatch: "#d98a1f" },
  { id: "rose", label: "Rose", swatch: "#e0525d" },
];

export function AccentPicker() {
  const [open, setOpen] = React.useState(false);
  const [accent, setAccent] = React.useState("blue");
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const cur = document.documentElement.getAttribute("data-accent");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (cur) setAccent(cur);
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const choose = (id: string) => {
    setAccent(id);
    setOpen(false);
    document.documentElement.setAttribute("data-accent", id);
    try {
      localStorage.setItem("ft-accent", id);
    } catch {}
  };

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        className="iconbtn"
        aria-label="Change accent colour"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span
          style={{
            width: 15,
            height: 15,
            borderRadius: "50%",
            background: "var(--accent)",
            boxShadow: "inset 0 0 0 1px rgba(0,0,0,.15)",
          }}
        />
      </button>
      {open ? (
        <div
          role="menu"
          style={{
            position: "absolute",
            right: 0,
            top: "calc(100% + 8px)",
            background: "var(--surface)",
            border: "1px solid var(--border-strong)",
            borderRadius: "var(--r)",
            boxShadow: "var(--shadow-lg)",
            padding: 8,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            zIndex: 60,
            minWidth: 148,
          }}
        >
          <div className="eyebrow" style={{ padding: "4px 8px 6px" }}>
            Accent colour
          </div>
          {ACCENTS.map((a) => (
            <button
              key={a.id}
              role="menuitemradio"
              aria-checked={accent === a.id}
              onClick={() => choose(a.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 9,
                padding: "7px 8px",
                borderRadius: 7,
                fontSize: 12.5,
                fontWeight: 500,
                background: accent === a.id ? "var(--surface-2)" : "transparent",
                color: "var(--ink)",
              }}
            >
              <span
                style={{
                  width: 13,
                  height: 13,
                  borderRadius: "50%",
                  background: a.swatch,
                  boxShadow: accent === a.id ? "0 0 0 2px var(--surface), 0 0 0 3.5px var(--accent)" : "inset 0 0 0 1px rgba(0,0,0,.15)",
                }}
              />
              {a.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
