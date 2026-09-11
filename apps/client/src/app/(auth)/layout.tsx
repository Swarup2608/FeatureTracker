import Link from "next/link";
import { Icon } from "@/components/Icon";
import { AreaChart } from "@/components/charts/AreaChart";
import { dateLabels } from "@/lib/data";
import { series } from "@/lib/format";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="auth">
      <div className="aside">
        <Link href="/" className="brand">
          <div className="brand-mark">
            <Icon name="logo" size={17} />
          </div>
          <div>
            <b>FeatureTrack</b>
            <span>console</span>
          </div>
        </Link>
        <div className="mini-chart chart">
          <AreaChart data={series(13, 200, 50, 4)} labels={dateLabels} height={120} />
        </div>
        <blockquote className="quote">
          &ldquo;We cut our time-to-insight from days to minutes. Every product decision now starts in
          FeatureTrack.&rdquo;
          <footer>— Priya Nathan, VP Product at Corewave</footer>
        </blockquote>
      </div>
      <div className="form-side">
        <div className="form">{children}</div>
      </div>
    </div>
  );
}
