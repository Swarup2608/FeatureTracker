"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { Icon } from "@/components/Icon";
import { useToast } from "./Toast";

// The portal only mounts after a click, so document.body is always available by then.

type Field = { label: string; placeholder?: string; type?: string; options?: string[] };

export function ActionButton({
  label,
  className = "btn",
  icon,
  title,
  body,
  fields,
  confirmLabel,
  danger,
  toast: toastMsg,
}: {
  label: string;
  className?: string;
  icon?: string;
  title: string;
  body?: string;
  fields?: Field[];
  confirmLabel: string;
  danger?: boolean;
  toast: string;
}) {
  const [open, setOpen] = React.useState(false);
  const toast = useToast();

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        {icon ? <Icon name={icon} size={14} /> : null}
        {label}
      </button>
      {open
        ? createPortal(
            <div className="scrim" onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}>
              <div className="modal" role="dialog" aria-modal="true" aria-label={title}>
                {danger ? (
                  <div className="warn-ic">
                    <Icon name="warn" size={18} />
                  </div>
                ) : null}
                <h3>{title}</h3>
                {body ? <p>{body}</p> : <div style={{ height: 6 }} />}
                {fields?.map((f, i) => (
                  <div key={i}>
                    <label>{f.label}</label>
                    {f.options ? (
                      <select defaultValue={f.options[0]}>
                        {f.options.map((o) => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                    ) : (
                      <input type={f.type ?? "text"} placeholder={f.placeholder} />
                    )}
                  </div>
                ))}
                <div className="row">
                  <button className="btn ghost" onClick={() => setOpen(false)}>
                    Cancel
                  </button>
                  <button
                    className={`btn ${danger ? "danger" : "primary"}`}
                    onClick={() => {
                      setOpen(false);
                      toast(toastMsg);
                    }}
                  >
                    {confirmLabel}
                  </button>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
