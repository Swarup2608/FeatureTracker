import { compact } from "@/lib/format";

export function Bars({ items }: { items: [string, number][] }) {
  const max = Math.max(...items.map((i) => i[1]));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
      {items.map(([name, val]) => (
        <div key={name} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 3 }}>
          <span className="ev" style={{ fontSize: 11.5 }}>
            {name}
          </span>
          <span className="num" style={{ fontSize: 11.5, color: "var(--ink-3)" }}>
            {compact(val)}
          </span>
          <div className="bar" style={{ gridColumn: "1 / -1" }}>
            <i style={{ ["--w" as string]: `${Math.max(4, Math.round((val / max) * 100))}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
