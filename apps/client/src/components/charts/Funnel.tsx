import { commas } from "@/lib/format";

const STEPS: [string, number, number][] = [
  ["Signed up", 12004, 0],
  ["Verified email", 10120, 15.7],
  ["Created project", 7340, 27.5],
  ["Sent first event", 5210, 29.0],
  ["Activated (day 7)", 3180, 39.0],
];

export function Funnel() {
  const max = STEPS[0][1];
  return (
    <div className="funnel">
      {STEPS.map(([label, count, drop], i) => (
        <div className="fn-step" key={label}>
          <span>{label}</span>
          <div className="fn-bar">
            <i style={{ ["--w" as string]: `${Math.round((count / max) * 100)}%`, animationDelay: `${i * 0.09}s` }} />
            <span>{commas(count)}</span>
          </div>
          <span className="drop">{drop ? `−${drop}%` : ""}</span>
        </div>
      ))}
    </div>
  );
}
