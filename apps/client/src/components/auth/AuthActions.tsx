"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/Icon";

export function EnterAppButton({ label, icon }: { label: string; icon?: boolean }) {
  const router = useRouter();
  return (
    <button className="btn primary" onClick={() => router.push("/dashboard")}>
      {label} {icon ? <Icon name="ext" size={14} /> : null}
    </button>
  );
}

export function AuthTabs({ active }: { active: "login" | "register" }) {
  const router = useRouter();
  return (
    <div className="auth-tabs" role="tablist" style={{ display: "flex", background: "var(--surface-2)", borderRadius: 7, padding: 3, marginBottom: 20 }}>
      <button
        role="tab"
        aria-selected={active === "login"}
        className="seg-like"
        onClick={() => router.push("/login")}
        style={tabStyle(active === "login")}
      >
        Sign in
      </button>
      <button
        role="tab"
        aria-selected={active === "register"}
        onClick={() => router.push("/register")}
        style={tabStyle(active === "register")}
      >
        Create account
      </button>
    </div>
  );
}

function tabStyle(on: boolean): React.CSSProperties {
  return {
    flex: 1,
    padding: 7,
    borderRadius: 6,
    fontSize: 12.5,
    fontWeight: 600,
    color: on ? "var(--ink)" : "var(--ink-3)",
    background: on ? "var(--surface)" : "transparent",
    boxShadow: on ? "var(--shadow-sm)" : "none",
  };
}
