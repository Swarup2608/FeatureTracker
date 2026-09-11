"use client";

import * as React from "react";
import { Icon } from "@/components/Icon";
import { useToast } from "./Toast";

export function ToastButton({
  label,
  message,
  className = "btn primary",
  icon,
}: {
  label: string;
  message: string;
  className?: string;
  icon?: string;
}) {
  const toast = useToast();
  return (
    <button type="button" className={className} onClick={() => toast(message)}>
      {icon ? <Icon name={icon} size={14} /> : null}
      {label}
    </button>
  );
}
