"use client";

import * as React from "react";
import { compact } from "@/lib/format";

export function CountUp({ value, format = "plain" }: { value: number; format?: "plain" | "compact" }) {
  const [n, setN] = React.useState(value);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const dur = 900;
    const t0 = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(value * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  const dec = value % 1 !== 0 ? 1 : 0;
  const text =
    format === "compact"
      ? compact(n)
      : n.toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec });
  return (
    <span className="num" suppressHydrationWarning>
      {text}
    </span>
  );
}
