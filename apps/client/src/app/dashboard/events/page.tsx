import type { Metadata } from "next";
import { PageHead } from "@/components/ui/bits";
import { Icon } from "@/components/Icon";
import { EventTable } from "@/components/EventTable";
import { ActionButton } from "@/components/ui/ActionButton";
import { eventDefs } from "@/lib/data";

export const metadata: Metadata = { title: "Events · FeatureTrack" };

export default function EventsPage() {
  return (
    <>
      <PageHead
        title="Events"
        sub={`Every event definition, its schema and volume. ${eventDefs.length} of 214 shown.`}
        actions={
          <>
            <button className="btn">
              <Icon name="filter" size={14} /> Filter
            </button>
            <ActionButton
              label="New event"
              className="btn primary"
              icon="plus"
              title="Define a new event"
              body="Events are created automatically on first sight, but defining one lets you lock its schema up front."
              fields={[
                { label: "Event name", placeholder: "e.g. checkout_completed" },
                { label: "Category", options: ["Conversion", "Engagement", "System"] },
              ]}
              confirmLabel="Create event"
              toast="Event defined"
            />
          </>
        }
      />
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
        <span className="chip on">
          Conversion
          <button aria-label="Remove filter">
            <Icon name="x" size={11} />
          </button>
        </span>
        <span className="chip">Engagement</span>
        <span className="chip">System</span>
      </div>
      <EventTable />
    </>
  );
}
