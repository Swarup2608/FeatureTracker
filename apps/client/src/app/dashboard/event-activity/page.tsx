import type { Metadata } from "next";
import { PageHead } from "@/components/ui/bits";
import { Icon } from "@/components/Icon";
import { Stat } from "@/components/ui/Stat";
import { AreaChart } from "@/components/charts/AreaChart";
import { EventTable } from "@/components/EventTable";
import { eventsData, dateLabels } from "@/lib/data";

export const metadata: Metadata = { title: "Event activity · FeatureTrack" };

export default function EventActivityPage() {
  return (
    <>
      <PageHead
        title="Event activity"
        sub="Volume and health for every tracked event in this environment."
        actions={
          <>
            <button className="btn">
              <Icon name="filter" size={14} /> All categories
            </button>
            <button className="btn primary">
              <Icon name="plus" size={14} /> Define event
            </button>
          </>
        }
      />
      <div className="grid g-4 mb-16">
        <Stat label="Events / min" icon="activity" value={3120} delta="8% vs avg" dir="up" spark={[28, 30, 29, 33, 31, 34, 36, 35]} />
        <Stat label="Distinct events" icon="events" value={214} delta="6 new" dir="up" spark={[200, 203, 205, 208, 209, 211, 213, 214]} />
        <Stat label="Schema violations" icon="warn" value={37} delta="12 fewer" dir="down" spark={[70, 64, 58, 52, 49, 44, 40, 37]} />
        <Stat label="p95 ingest latency" icon="bolt" value={48} delta="3ms faster" dir="down" spark={[60, 58, 55, 54, 52, 50, 49, 48]} />
      </div>
      <div className="card pad-lg mb-16">
        <div className="card-head">
          <h3>Ingest volume</h3>
          <span className="sub">events per hour, last 30 days</span>
        </div>
        <AreaChart data={eventsData} labels={dateLabels} />
      </div>
      <EventTable />
    </>
  );
}
