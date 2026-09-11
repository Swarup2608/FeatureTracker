import Link from "next/link";
import type { Metadata } from "next";
import { PageHead, Badge } from "@/components/ui/bits";
import { Stat } from "@/components/ui/Stat";
import { Icon } from "@/components/Icon";
import { AreaChart } from "@/components/charts/AreaChart";
import { Bars } from "@/components/charts/Bars";
import { AdoptList } from "@/components/AdoptList";
import { Timeline } from "@/components/ui/bits";
import { eventsData, usersData, errData, dateLabels, topEvents, features } from "@/lib/data";
import { activityFeed } from "@/lib/samples";

export const metadata: Metadata = { title: "Overview · FeatureTrack" };

export default function OverviewPage() {
  return (
    <>
      <PageHead
        title="Overview"
        sub="Production · last 30 days · updated 40s ago"
        actions={
          <>
            <button className="btn">
              <Icon name="filter" size={14} /> Last 30 days
            </button>
            <button className="btn">
              <Icon name="download" size={14} /> Export
            </button>
            <Link className="btn primary" href="/dashboard/live">
              <Icon name="live" size={14} /> Live Events
            </Link>
          </>
        }
      />

      <div className="grid g-4 mb-16">
        <Stat label="Total events" icon="activity" value={4870000} format="compact" delta="12.4% vs prev" dir="up" spark={eventsData.slice(-12)} />
        <Stat label="Active users" icon="users" value={94210} format="compact" delta="4.1% vs prev" dir="up" spark={usersData.slice(-12)} />
        <Stat label="Feature adoption" icon="adoption" value={61} delta="2.3 pts" dir="up" spark={[52, 54, 53, 56, 58, 57, 59, 61]} />
        <Stat label="Error rate" icon="warn" value={420} delta="18% fewer" dir="down" spark={errData.slice(-12)} />
      </div>

      <div className="grid g-2-1 mb-16">
        <div className="card pad-lg">
          <div className="card-head">
            <h3>Events over time</h3>
            <span className="sub">daily volume</span>
            <div className="actions">
              <Badge tone="good">tracking</Badge>
            </div>
          </div>
          <AreaChart data={eventsData} labels={dateLabels} />
        </div>
        <div className="card pad-lg">
          <div className="card-head">
            <h3>Top events</h3>
            <span className="sub">by volume</span>
          </div>
          <Bars items={topEvents} />
        </div>
      </div>

      <div className="grid g-2">
        <div className="card pad-lg">
          <div className="card-head">
            <h3>Feature adoption</h3>
            <div className="actions">
              <Link className="btn ghost sm" href="/dashboard/feature-adoption">
                View all
              </Link>
            </div>
          </div>
          <AdoptList features={features.slice(0, 5)} linked />
        </div>
        <div className="card pad-lg">
          <div className="card-head">
            <h3>Recent activity</h3>
            <div className="actions">
              <Link className="btn ghost sm" href="/dashboard/recent-activity">
                View all
              </Link>
            </div>
          </div>
          <Timeline items={activityFeed.slice(0, 5)} />
        </div>
      </div>
    </>
  );
}
