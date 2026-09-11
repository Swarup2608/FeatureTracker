import type { Metadata } from "next";
import { PageHead } from "@/components/ui/bits";
import { Icon } from "@/components/Icon";
import { MultiLineChart } from "@/components/charts/MultiLineChart";
import { Funnel } from "@/components/charts/Funnel";
import { Heatmap } from "@/components/charts/Heatmap";
import { eventsData, usersData, errData, dateLabels } from "@/lib/data";

export const metadata: Metadata = { title: "Analytics · FeatureTrack" };

export default function AnalyticsPage() {
  return (
    <>
      <PageHead
        title="Analytics"
        sub="Cross-metric trends, funnels and retention for Corewave Web."
        actions={
          <>
            <button className="btn">
              <Icon name="filter" size={14} /> Segment: All users
            </button>
            <button className="btn">
              <Icon name="download" size={14} /> Export CSV
            </button>
          </>
        }
      />

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
        <span className="chip on">
          Last 30 days
          <button aria-label="Remove filter">
            <Icon name="x" size={11} />
          </button>
        </span>
        <span className="chip">Plan: Pro</span>
        <span className="chip">Country: All</span>
        <button className="btn ghost sm">
          <Icon name="plus" size={13} /> Add filter
        </button>
      </div>

      <div className="card pad-lg mb-16">
        <div className="card-head">
          <h3>Events · Users · Errors</h3>
          <span className="sub">indexed daily volume</span>
        </div>
        <MultiLineChart
          labels={dateLabels}
          series={[
            { name: "Events", color: "var(--cat-1)", data: eventsData.map((v) => v / 1000) },
            { name: "Users", color: "var(--cat-2)", data: usersData.map((v) => v / 100) },
            { name: "Errors", color: "var(--cat-3)", data: errData },
          ]}
        />
      </div>

      <div className="grid g-2">
        <div className="card pad-lg">
          <div className="card-head">
            <h3>Activation funnel</h3>
            <span className="sub">signup → activated, 30d</span>
          </div>
          <Funnel />
        </div>
        <div className="card pad-lg">
          <div className="card-head">
            <h3>Weekly retention</h3>
            <span className="sub">cohort by signup week</span>
          </div>
          <Heatmap />
        </div>
      </div>
    </>
  );
}
