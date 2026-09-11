import { Icon } from "@/components/Icon";
import { CountUp } from "./CountUp";
import { Sparkline } from "@/components/charts/Sparkline";

export function Stat({
  label,
  icon,
  value,
  format = "plain",
  delta,
  dir = "up",
  spark,
}: {
  label: string;
  icon: string;
  value: number;
  format?: "plain" | "compact";
  delta: string;
  dir?: "up" | "down";
  spark: number[];
}) {
  return (
    <div className="stat">
      <div className="label">
        <Icon name={icon} size={13} /> {label}
      </div>
      <div className="value">
        <CountUp value={value} format={format} />
      </div>
      <div className={`delta ${dir}`}>
        <Icon name={dir === "up" ? "up" : "down"} size={12} /> {delta}
      </div>
      <Sparkline values={spark} />
    </div>
  );
}
