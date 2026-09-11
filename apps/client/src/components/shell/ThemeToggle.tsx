"use client";

import * as React from "react";
import { Icon } from "@/components/Icon";

export function ThemeToggle() {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");

  React.useEffect(() => {
    // Sync React state once to the theme the inline <head> script already applied.
    const attr = document.documentElement.getAttribute("data-theme");
    const resolved =
      attr === "dark" || attr === "light"
        ? attr
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(resolved);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("ft-theme", next);
    } catch {}
  };

  return (
    <button className="iconbtn" onClick={toggle} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
      <Icon name={theme === "dark" ? "moon" : "sun"} size={16} />
    </button>
  );
}
