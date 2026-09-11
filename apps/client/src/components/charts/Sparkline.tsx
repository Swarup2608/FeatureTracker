export function Sparkline({
  values,
  color = "var(--accent)",
  className = "spark",
  w = 88,
  h = 34,
}: {
  values: number[];
  color?: string;
  className?: string;
  w?: number;
  h?: number;
}) {
  const mn = Math.min(...values);
  const mx = Math.max(...values);
  const r = mx - mn || 1;
  const d = values
    .map((v, i) => `${i ? "L" : "M"}${((i / (values.length - 1)) * w).toFixed(1)} ${(h - ((v - mn) / r) * h).toFixed(1)}`)
    .join(" ");
  return (
    <svg className={className} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden="true">
      <path d={d} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
}
