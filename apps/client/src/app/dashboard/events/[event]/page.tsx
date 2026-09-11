import type { Metadata } from "next";
import { PageHead, Crumb, Badge } from "@/components/ui/bits";
import { Icon } from "@/components/Icon";
import { Stat } from "@/components/ui/Stat";
import { AreaChart } from "@/components/charts/AreaChart";
import { MiniStream } from "@/components/MiniStream";
import { ActionButton } from "@/components/ui/ActionButton";
import { dateLabels } from "@/lib/data";
import { series } from "@/lib/format";

export async function generateMetadata({ params }: { params: Promise<{ event: string }> }): Promise<Metadata> {
  const { event } = await params;
  return { title: `${decodeURIComponent(event)} · Events · FeatureTrack` };
}

export default async function EventDetailPage({ params }: { params: Promise<{ event: string }> }) {
  const { event } = await params;
  const name = decodeURIComponent(event);

  return (
    <>
      <PageHead
        title={name}
        crumb={<Crumb items={[{ label: "Events", href: "/dashboard/events" }, { label: name }]} />}
        sub="Conversion event · first seen Jul 3, 2026 · owned by growth-team"
        actions={
          <>
            <button className="btn">
              <Icon name="code" size={14} /> View in SDK
            </button>
            <ActionButton
              label="Archive event"
              className="btn danger"
              title="Archive this event?"
              body="Historical data is kept, but the event will no longer accept new occurrences."
              confirmLabel="Archive"
              danger
              toast="Event archived"
            />
          </>
        }
      />

      <div className="grid g-4 mb-16">
        <Stat label="Volume 30d" icon="activity" value={96412} format="compact" delta="12.4%" dir="up" spark={[70, 74, 72, 78, 80, 84, 90, 96]} />
        <Stat label="Unique users" icon="users" value={18240} format="compact" delta="6.0%" dir="up" spark={[150, 152, 158, 162, 168, 175, 180, 182]} />
        <Stat label="Per user" icon="recent" value={5.3} delta="0.4" dir="up" spark={[45, 46, 48, 49, 50, 51, 52, 53]} />
        <Stat label="Conversion" icon="adoption" value={31} delta="2.1 pts" dir="up" spark={[26, 27, 28, 28, 29, 30, 30, 31]} />
      </div>

      <div className="grid g-2-1 mb-16">
        <div className="card pad-lg">
          <div className="card-head">
            <h3>Volume</h3>
            <span className="sub">daily, 30 days</span>
          </div>
          <AreaChart data={series(5, 2400, 600, 90)} labels={dateLabels} />
        </div>
        <div className="card pad-lg">
          <div className="card-head">
            <h3>Schema</h3>
          </div>
          <dl className="kv mono" style={{ fontSize: 12 }}>
            <dt>plan</dt>
            <dd>
              <Badge dot={false}>string</Badge>
            </dd>
            <dt>seats</dt>
            <dd>
              <Badge dot={false}>number</Badge>
            </dd>
            <dt>coupon</dt>
            <dd>
              <Badge dot={false}>string?</Badge>
            </dd>
            <dt>referrer</dt>
            <dd>
              <Badge dot={false}>string?</Badge>
            </dd>
          </dl>
          <div className="divide" />
          <p style={{ fontSize: 11.5, color: "var(--ink-3)" }}>
            Types are locked. New properties are accepted and flagged for review.
          </p>
        </div>
      </div>

      <div className="card pad-lg">
        <div className="card-head">
          <h3>Recent occurrences</h3>
          <div className="actions">
            <Badge tone="live">live</Badge>
          </div>
        </div>
        <MiniStream rows={7} />
      </div>
    </>
  );
}
