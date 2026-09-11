"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/Icon";
import { NAV, eventDefs, users, features } from "@/lib/data";

type Item = { group: string; label: string; href: string; icon: string };

const ITEMS: Item[] = [
  ...NAV.flatMap(([group, items]) => items.map((it) => ({ group, label: it.label, href: it.href, icon: it.icon }))),
  ...eventDefs.map((e) => ({ group: "Events", label: e.name, href: `/dashboard/events/${e.name}`, icon: "events" })),
  ...users.map((u) => ({ group: "Users", label: u.name, href: `/dashboard/users/${u.slug}`, icon: "user" })),
  ...features.map((f) => ({ group: "Features", label: f.name, href: `/dashboard/features/${f.slug}`, icon: "features" })),
];

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const [q, setQ] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => {
      setQ("");
      inputRef.current?.focus();
    }, 10);
    return () => clearTimeout(t);
  }, [open]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!open) return null;

  const ql = q.toLowerCase().trim();
  const hits = ITEMS.filter((i) => !ql || i.label.toLowerCase().includes(ql)).slice(0, 40);

  const go = (href: string) => {
    router.push(href);
    onClose();
  };

  return (
    <div className="palette" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="box" role="dialog" aria-modal="true" aria-label="Command palette">
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Jump to a screen, event or user…"
          onKeyDown={(e) => {
            if (e.key === "Enter" && hits[0]) go(hits[0].href);
          }}
        />
        <div className="results">
          {hits.length === 0 ? <div className="grp">No matches</div> : null}
          {hits.map((h, i) => {
            const header = i === 0 || hits[i - 1].group !== h.group ? h.group : null;
            return (
              <React.Fragment key={h.href + i}>
                {header ? <div className="grp">{header}</div> : null}
                <button className={`res ${i === 0 ? "sel" : ""}`} onClick={() => go(h.href)}>
                  <Icon name={h.icon} size={15} />
                  {h.label}
                  <span className="k">↵</span>
                </button>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
