import * as React from "react";
import Link from "next/link";
import { Icon } from "@/components/Icon";

export function PageHead({
  title,
  crumb,
  sub,
  actions,
}: {
  title: string;
  crumb?: React.ReactNode;
  sub?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="page-head">
      <div className="titles">
        {crumb ? <div className="crumb">{crumb}</div> : null}
        <h1>{title}</h1>
        {sub ? <p className="sub">{sub}</p> : null}
      </div>
      {actions ? <div className="actions">{actions}</div> : null}
    </div>
  );
}

type Tone = "" | "good" | "warn" | "crit" | "live";
export function Badge({ tone = "", dot = true, children }: { tone?: Tone; dot?: boolean; children: React.ReactNode }) {
  return (
    <span className={`badge ${tone}`}>
      {dot ? <span className="d" /> : null}
      {children}
    </span>
  );
}

export function Bar({ pct, variant = "" }: { pct: number; variant?: "" | "c2" }) {
  return (
    <div className={`bar ${variant}`}>
      <i style={{ ["--w" as string]: `${pct}%` }} />
    </div>
  );
}

export type TimelineItem = {
  icon: string;
  title: React.ReactNode;
  ev?: string;
  time: string;
  node?: "ok" | "bad";
};
export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="timeline">
      {items.map((it, i) => (
        <div className="tl-item" key={i}>
          <div className="rail">
            <div className={`node ${it.node ?? ""}`}>
              <Icon name={it.icon} size={13} />
            </div>
            <div className="line" />
          </div>
          <div className="body">
            <b>{it.title}</b> {it.ev ? <span className="ev">{it.ev}</span> : null}
            <div className="t">{it.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function Chevron() {
  return <Icon name="chevron" size={12} />;
}

export function Crumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <>
      {items.map((it, i) => (
        <React.Fragment key={i}>
          {it.href ? <Link href={it.href}>{it.label}</Link> : <span>{it.label}</span>}
          {i < items.length - 1 ? <Chevron /> : null}
        </React.Fragment>
      ))}
    </>
  );
}
