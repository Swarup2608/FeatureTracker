import Link from "next/link";
import type { Feature } from "@/lib/data";

export function AdoptList({ features, linked = false }: { features: Feature[]; linked?: boolean }) {
  return (
    <div className="adopt">
      {features.map((f) => {
        const name = linked ? (
          <Link href={`/dashboard/features/${f.slug}`} className="name">
            {f.name}
          </Link>
        ) : (
          <span className="name">{f.name}</span>
        );
        return (
          <div className="adopt-row" key={f.key}>
            {name}
            <span className="pct num">{f.adoption}%</span>
            <span className="meta">
              {f.users} users ·{" "}
              <span style={{ color: f.delta >= 0 ? "var(--good)" : "var(--crit)" }}>
                {f.delta >= 0 ? "+" : ""}
                {f.delta} pts
              </span>
            </span>
            <div className="bar">
              <i style={{ ["--w" as string]: `${f.adoption}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
