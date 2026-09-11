import type { Metadata } from "next";
import { PageHead } from "@/components/ui/bits";
import { Icon } from "@/components/Icon";
import { LiveStream } from "@/components/LiveStream";

export const metadata: Metadata = { title: "Live Events · FeatureTrack" };

export default function LivePage() {
  return (
    <>
      <PageHead
        title="Live Events"
        sub="Real-time stream from Production. Events appear the moment they're ingested."
        actions={
          <button className="btn">
            <Icon name="filter" size={14} /> All events
          </button>
        }
      />
      <LiveStream />
    </>
  );
}
