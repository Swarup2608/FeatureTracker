"use client";

import * as React from "react";
import { niceMax, compact, commas } from "@/lib/format";

const W = 720;
const H = 250;
const P = { l: 46, r: 58, t: 14, b: 26 };

export type Serie = { name: string; color: string; data: number[] };

export function MultiLineChart({
  series,
  labels,
}: {
  series: Serie[];
  labels: string[];
}) {
  const pw = W - P.l - P.r;
  const ph = H - P.t - P.b;
  const n = labels.length;
  const max = niceMax(Math.max(...series.flatMap((s) => s.data)));
  const X = (i: number) => P.l + i * (pw / (n - 1));
  const Y = (v: number) => P.t + ph - (v / max) * ph;

  const [hover, setHover] = React.useState<number | null>(null);
  const gridFracs = [0, 0.25, 0.5, 0.75, 1];
  const xTicks = [
    0,
    Math.floor(n * 0.25),
    Math.floor(n * 0.5),
    Math.floor(n * 0.75),
    n - 1,
  ];

  const onMove = (e: React.PointerEvent) => {
    const rect = (e.currentTarget as SVGRectElement).getBoundingClientRect();
    const rel = ((e.clientX - rect.left) / rect.width) * pw;
    let i = Math.round(rel / (pw / (n - 1)));
    i = Math.max(0, Math.min(n - 1, i));
    setHover(i);
  };

  return (
    <div className="chart">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Multi-series chart"
      >
        <g className="cgrid">
          {gridFracs.map((f) => {
            const y = P.t + ph - f * ph;
            return <line key={f} x1={P.l} y1={y} x2={P.l + pw} y2={y} />;
          })}
        </g>
        <g className="caxis">
          {gridFracs.map((f) => (
            <text
              key={f}
              x={P.l - 9}
              y={P.t + ph - f * ph + 3}
              textAnchor="end"
            >
              {compact(max * f)}
            </text>
          ))}
          {xTicks.map((i, k) => (
            <text
              key={i}
              x={X(i)}
              y={H - 6}
              textAnchor={
                k === 0 ? "start" : k === xTicks.length - 1 ? "end" : "middle"
              }
            >
              {labels[i]}
            </text>
          ))}
        </g>
        {series.map((s, si) => {
          const dashOffset = 8;
          const d = s.data
            .map(
              (v, i) => `${i ? "L" : "M"}${X(i).toFixed(1)} ${Y(v).toFixed(1)}`,
            )
            .join(" ");
          const dashD = s.data
            .map(
              (v, i) =>
                `${i ? "L" : "M"}${X(i).toFixed(1)} ${(Y(v) - dashOffset).toFixed(1)}`,
            )
            .join(" ");
          return (
            <g key={s.name}>
              <path
                className="cdash"
                d={dashD}
                stroke={s.color}
                pathLength={1}
                style={{ animationDelay: `${si * 0.14}s` }}
              />
              <path
                className="cline draw"
                d={d}
                stroke={s.color}
                pathLength={1}
                style={{ animationDelay: `${si * 0.14}s` }}
              />
              <text
                x={P.l + pw + 6}
                y={Y(s.data[n - 1]) + 3}
                fill={s.color}
                style={{ fontSize: 10.5, fontWeight: 600 }}
              >
                {s.name}
              </text>
            </g>
          );
        })}
        {hover !== null
          ? series.map((s) => (
              <circle
                key={s.name}
                cx={X(hover)}
                cy={Y(s.data[hover])}
                r={3.5}
                fill={s.color}
                stroke="var(--surface)"
                strokeWidth={1.5}
              />
            ))
          : null}
        {hover !== null ? (
          <line
            className="cross"
            x1={X(hover)}
            y1={P.t}
            x2={X(hover)}
            y2={P.t + ph}
          />
        ) : null}
        <rect
          x={P.l}
          y={P.t}
          width={pw}
          height={ph}
          fill="transparent"
          onPointerMove={onMove}
          onPointerLeave={() => setHover(null)}
        />
      </svg>
      {hover !== null ? (
        <div
          className="tooltip"
          style={{ left: `${(X(hover) / W) * 100}%`, top: `12%` }}
        >
          <b>{labels[hover]}</b>
          {series.map((s) => (
            <div className="r" key={s.name}>
              <i style={{ background: s.color }} />
              {s.name}: {commas(Math.round(s.data[hover]))}
            </div>
          ))}
        </div>
      ) : null}
      <div className="legend">
        {series.map((s) => (
          <span key={s.name}>
            <i style={{ background: s.color }} />
            {s.name}
          </span>
        ))}
      </div>
    </div>
  );
}
