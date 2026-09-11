import type { Metadata } from "next";
import { PageHead } from "@/components/ui/bits";
import { Icon } from "@/components/Icon";
import { Stat } from "@/components/ui/Stat";
import { AdoptList } from "@/components/AdoptList";
import { MultiLineChart } from "@/components/charts/MultiLineChart";
import { features, dateLabels } from "@/lib/data";
import { series } from "@/lib/format";

export const metadata: Metadata = { title: "Feature adoption · FeatureTrack" };

export default function FeatureAdoptionPage() {
  return (
    <>
      <PageHead
        title="Feature adoption"
        sub="Share of active users who have used each feature in the last 30 days."
        actions={
          <>
            <button className="btn">
              <Icon name="filter" size={14} /> Active users
            </button>
            <button className="btn">
              <Icon name="download" size={14} /> Export
            </button>
          </>
        }
      />
      <div className="grid g-3 mb-16">
        <Stat label="Avg adoption" icon="adoption" value={42} delta="3.1 pts" dir="up" spark={[36, 37, 38, 39, 40, 41, 41, 42]} />
        <Stat label="Features tracked" icon="features" value={34} delta="2 new" dir="up" spark={[30, 31, 31, 32, 33, 33, 34, 34]} />
        <Stat label="Power users" icon="users" value={6820} format="compact" delta="9% vs prev" dir="up" spark={[58, 60, 61, 63, 64, 66, 67, 68]} />
      </div>
      <div className="card pad-lg mb-16">
        <div className="card-head">
          <h3>Adoption by feature</h3>
          <span className="sub">click a feature for detail</span>
        </div>
        <AdoptList features={features} linked />
      </div>
      <div className="card pad-lg">
        <div className="card-head">
          <h3>Adoption trend</h3>
          <span className="sub">top 3 features, 30 days</span>
        </div>
        <MultiLineChart
          labels={dateLabels}
          series={[
            { name: "AI Autocomplete", color: "var(--cat-1)", data: series(2, 52, 4, 0.7) },
            { name: "Command Palette", color: "var(--cat-2)", data: series(4, 48, 4, 0.5) },
            { name: "Slack Integration", color: "var(--cat-3)", data: series(6, 30, 5, 0.5) },
          ]}
        />
      </div>
    </>
  );
}
