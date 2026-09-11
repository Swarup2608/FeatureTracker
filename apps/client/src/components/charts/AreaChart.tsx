"use client";

import * as React from "react";
import { niceMax, compact, commas } from "@/lib/format";

const W = 720;
const P = { l: 46, r: 14, t: 14, b: 26 };

export function AreaChart({
  data,
  labels,
  height = 240,
  color = "var(--accent)",
  valueSuffix = "",
}: {
  data: number[];
  labels: string[];
  height?: number;
  color?: string;
  valueSuffix?: string;
}) {
  const H = height;
  const pw = W - P.l - P.r;
  const ph = H - P.t - P.b;
  const n = data.length;
  const max = niceMax(Math.max(...data));
  const X = (i: number) => P.l + i * (pw / (n - 1));
  const Y = (v: number) => P.t + ph - (v / max) * ph;

  const linePath = data
    .map((v, i) => `${i ? "L" : "M"}${X(i).toFixed(1)} ${Y(v).toFixed(1)}`)
    .join(" ");
  const dashOffset = 8; // Offset for dashed line (pixels above)
  const dashPath = data
    .map(
      (v, i) =>
        `${i ? "L" : "M"}${X(i).toFixed(1)} ${(Y(v) - dashOffset).toFixed(1)}`,
    )
    .join(" ");
  const areaPath = `${linePath} L ${X(n - 1)} ${P.t + ph} L ${P.l} ${P.t + ph} Z`;
  const gid = React.useId().replace(/:/g, "");

  const [hover, setHover] = React.useState<number | null>(null);
  const svgRef = React.useRef<SVGSVGElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const rect = (e.currentTarget as SVGRectElement).getBoundingClientRect();
    const rel = ((e.clientX - rect.left) / rect.width) * pw;
    let i = Math.round(rel / (pw / (n - 1)));
    i = Math.max(0, Math.min(n - 1, i));
    setHover(i);
  };

  const gridFracs = [0, 0.25, 0.5, 0.75, 1];
  const xTicks = [
    0,
    Math.floor(n * 0.2),
    Math.floor(n * 0.4),
    Math.floor(n * 0.6),
    Math.floor(n * 0.8),
    n - 1,
  ];

  return (
    <div className="chart">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Time series chart"
      >
        <defs>
          <linearGradient id={`g${gid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={color} stopOpacity={0.28} />
            <stop offset="1" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
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
        <path className="carea" d={areaPath} fill={`url(#g${gid})`} />
        <path className="cdash" d={dashPath} stroke={color} pathLength={1} />
        <path
          className="cline draw"
          d={linePath}
          stroke={color}
          pathLength={1}
        />
        <circle
          className="cend"
          cx={X(n - 1)}
          cy={Y(data[n - 1])}
          r={4}
          fill={color}
          stroke="var(--surface)"
          strokeWidth={2}
        />
        {hover !== null ? (
          <>
            <line
              className="cross"
              x1={X(hover)}
              y1={P.t}
              x2={X(hover)}
              y2={P.t + ph}
            />
            <circle
              className="cfocus"
              cx={X(hover)}
              cy={Y(data[hover])}
              r={4.5}
              fill={color}
              stroke="var(--surface)"
              strokeWidth={2}
            />
          </>
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
          style={{
            left: `${(X(hover) / W) * 100}%`,
            top: `${(Y(data[hover]) / H) * 100}%`,
          }}
        >
          <b>
            {commas(data[hover])}
            {valueSuffix}
          </b>
          <div className="r">{labels[hover]}</div>
        </div>
      ) : null}
    </div>
  );
}
