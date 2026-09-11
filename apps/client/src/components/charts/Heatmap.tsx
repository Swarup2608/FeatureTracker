const WEEKS = ["Aug 4", "Aug 11", "Aug 18", "Aug 25", "Sep 1", "Sep 8"];
const COLS = ["W0", "W1", "W2", "W3", "W4", "W5"];

export function Heatmap() {
  return (
    <div className="heat" style={{ gridTemplateColumns: "46px repeat(6, 1fr)" }}>
      <div className="hhead" />
      {COLS.map((c) => (
        <div className="hhead" key={c}>
          {c}
        </div>
      ))}
      {WEEKS.map((wk, r) => (
        <Row key={wk} label={wk} r={r} />
      ))}
    </div>
  );
}

function Row({ label, r }: { label: string; r: number }) {
  return (
    <>
      <div className="hrow">{label}</div>
      {Array.from({ length: 6 }, (_, c) => {
        if (c > 5 - r) return <div className="hcell" key={c} style={{ background: "var(--surface-2)" }} />;
        const base = 100 - c * (14 + r * 1.5) - ((r * 7 + c * 3) % 6);
        const v = Math.max(8, Math.round(base));
        const pctMix = Math.round((v / 100) * 0.85 * 100 + 8);
        return (
          <div
            className="hcell"
            key={c}
            style={{ background: `color-mix(in srgb, var(--accent) ${pctMix}%, var(--surface))` }}
          >
            {v}
          </div>
        );
      })}
    </>
  );
}
