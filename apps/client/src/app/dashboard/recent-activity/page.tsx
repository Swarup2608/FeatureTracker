import type { Metadata } from "next";
import { PageHead, Badge, Timeline } from "@/components/ui/bits";
import { Icon } from "@/components/Icon";
import { activityFeed } from "@/lib/samples";

export const metadata: Metadata = { title: "Recent activity · FeatureTrack" };

export default function RecentActivityPage() {
  return (
    <>
      <PageHead
        title="Recent activity"
        sub="A live feed of notable events, adoptions and account changes."
        actions={
          <button className="btn">
            <Icon name="filter" size={14} /> All types
          </button>
        }
      />
      <div className="grid g-2-1">
        <div className="card pad-lg">
          <div className="card-head">
            <h3>Feed</h3>
            <div className="actions">
              <Badge tone="live">live</Badge>
            </div>
          </div>
          <Timeline items={activityFeed} />
        </div>
        <div className="card pad-lg">
          <div className="card-head">
            <h3>Today</h3>
          </div>
          <dl className="kv">
            <dt>Events</dt>
            <dd className="num">182,404</dd>
            <dt>New users</dt>
            <dd className="num">1,204</dd>
            <dt>Features adopted</dt>
            <dd className="num">318</dd>
            <dt>Errors</dt>
            <dd className="num" style={{ color: "var(--crit)" }}>
              73
            </dd>
            <dt>Webhook deliveries</dt>
            <dd className="num">44,910</dd>
          </dl>
          <div className="divide" />
          <div className="state" style={{ padding: "22px 14px", border: 0, background: "var(--surface-2)" }}>
            <div className="ic">
              <Icon name="check" size={20} />
            </div>
            <h3 style={{ fontSize: 13 }}>All systems nominal</h3>
            <p style={{ marginBottom: 0 }}>No incidents in the last 24 hours.</p>
          </div>
        </div>
      </div>
    </>
  );
}
