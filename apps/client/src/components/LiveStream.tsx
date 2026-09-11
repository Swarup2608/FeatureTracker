"use client";

import * as React from "react";
import { Icon } from "@/components/Icon";
import { liveTemplates } from "@/lib/data";
import { commas } from "@/lib/format";

type Row = { id: number; tmpl: [string, string, string]; ts: string; fresh: boolean };

function now() {
  const d = new Date();
  return d.toLocaleTimeString("en-GB") + "." + String(d.getMilliseconds()).padStart(3, "0");
}
function pick(i: number): [string, string, string] {
  return liveTemplates[i % liveTemplates.length];
}

export function LiveStream() {
  const [rows, setRows] = React.useState<Row[]>(() =>
    Array.from({ length: 14 }, (_, i) => ({ id: -i, tmpl: pick(i * 3 + 1), ts: "—", fresh: false })),
  );
  const [paused, setPaused] = React.useState(false);
  const [count, setCount] = React.useState(14);
  const [eps, setEps] = React.useState(300);
  const [rate, setRate] = React.useState<number[]>(() => Array(24).fill(280));
  const seed = React.useRef(42);

  React.useEffect(() => {
    const raf = requestAnimationFrame(() => setRows((rs) => rs.map((r) => ({ ...r, ts: now() }))));
    return () => cancelAnimationFrame(raf);
  }, []);

  React.useEffect(() => {
    if (paused) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const iv = setInterval(
      () => {
        seed.current = (seed.current * 1664525 + 1013904223) % 4294967296;
        const rnd = seed.current / 4294967296;
        const add = 1 + Math.floor(rnd * 3);
        setRows((rs) => {
          const next = [...rs];
          for (let k = 0; k < add; k++) {
            next.unshift({ id: Date.now() + k, tmpl: pick(Math.floor(rnd * 97) + k), ts: now(), fresh: true });
          }
          return next.slice(0, 60).map((r, i) => (i < add ? r : { ...r, fresh: false }));
        });
        setCount((c) => c + add);
        const e = 260 + Math.round(rnd * 160) + ((new Date().getSeconds() % 10) * 4);
        setEps(e);
        setRate((prev) => [...prev.slice(1), e]);
      },
      reduce ? 3200 : 2100,
    );
    return () => clearInterval(iv);
  }, [paused]);

  const rateMax = Math.max(...rate);

  return (
    <>
      <div className="grid g-4 mb-16">
        <div className="stat">
          <div className="label">
            <Icon name="live" size={13} /> Events / sec
          </div>
          <div className="value num" suppressHydrationWarning>
            {eps}
          </div>
          <div className="rate" aria-hidden="true">
            {rate.map((v, i) => (
              <i key={i} style={{ height: `${Math.max(8, (v / rateMax) * 40)}px` }} />
            ))}
          </div>
        </div>
        <div className="stat">
          <div className="label">
            <Icon name="activity" size={13} /> Last minute
          </div>
          <div className="value num">18,240</div>
          <div className="delta up">
            <Icon name="up" size={12} /> rolling
          </div>
        </div>
        <div className="stat">
          <div className="label">
            <Icon name="users" size={13} /> Unique users
          </div>
          <div className="value num">3,120</div>
          <div className="delta up">
            <Icon name="up" size={12} /> live
          </div>
        </div>
        <div className="stat">
          <div className="label">
            <Icon name="warn" size={13} /> Errors / min
          </div>
          <div className="value num">6</div>
          <div className="delta down">
            <Icon name="down" size={12} /> within budget
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div className="card-head" style={{ padding: "14px 16px", margin: 0, borderBottom: "1px solid var(--border)" }}>
          <span className="badge live">
            <span className="d" /> {paused ? "paused" : "streaming"}
          </span>
          <h3 style={{ fontSize: 13 }}>Production event stream</h3>
          <div className="actions">
            <button className={`btn sm ${paused ? "primary" : ""}`} onClick={() => setPaused((p) => !p)}>
              <Icon name={paused ? "play" : "pause"} size={13} />
              {paused ? "Resume" : "Pause"}
            </button>
            <span className="sub" suppressHydrationWarning>
              {commas(count)} events
            </span>
          </div>
        </div>
        <div className="stream">
          {rows.map((r) => (
            <div className={`stream-row ${r.fresh ? "fresh" : ""}`} key={r.id}>
              <span className="ts" suppressHydrationWarning>
                {r.ts}
              </span>
              <span>
                <span className="ev">{r.tmpl[0]}</span> <span className="who">{r.tmpl[1]}</span>
              </span>
              <span className="props">{r.tmpl[2]}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
