export function compact(n: number): string {
  if (n >= 1e6) return (n / 1e6).toFixed(n >= 1e7 ? 0 : 1).replace(/\.0$/, "") + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(n >= 1e4 ? 0 : 1).replace(/\.0$/, "") + "k";
  return String(Math.round(n));
}

export function commas(n: number): string {
  return n.toLocaleString("en-US");
}

export function niceMax(v: number): number {
  const p = Math.pow(10, Math.floor(Math.log10(v)));
  const n = v / p;
  const s = n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10;
  return s * p;
}

/** Deterministic pseudo-random series so server and client render identically. */
export function series(seed: number, base: number, amp: number, trend: number, len = 30): number[] {
  let v = base;
  const out: number[] = [];
  let s = seed * 9973;
  const rand = () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
  for (let i = 0; i < len; i++) {
    v += Math.sin(i * 0.7 + seed) * amp * 0.35 + (rand() - 0.45) * amp + trend;
    out.push(Math.max(Math.round(base * 0.4), Math.round(v)));
  }
  return out;
}

export function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
