"use client";

import * as React from "react";
import { Icon } from "@/components/Icon";
import { useToast } from "./Toast";

export function CopyButton({
  text,
  label,
  className = "btn ghost sm",
}: {
  text: string;
  label?: string;
  className?: string;
}) {
  const toast = useToast();
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        navigator.clipboard?.writeText(text).catch(() => {});
        toast("Copied to clipboard");
      }}
    >
      <Icon name="copy" size={12} />
      {label ? <span>{label}</span> : null}
    </button>
  );
}
