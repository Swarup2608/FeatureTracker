import type { Metadata } from "next";
import { PageHead, Badge } from "@/components/ui/bits";
import { Icon } from "@/components/Icon";
import { ActionButton } from "@/components/ui/ActionButton";
import { webhooks } from "@/lib/data";

export const metadata: Metadata = { title: "Webhooks · FeatureTrack" };

const deliveries: [string, string, string, "good" | "crit"][] = [
  ["200", "event.created → hooks.corewave.io", "just now", "good"],
  ["200", "feature.adopted → api.northwind.io", "2 min ago", "good"],
  ["500", "error_logged → ops.lumen.app", "4 min ago · retrying (2/6)", "crit"],
  ["200", "event.created → hooks.corewave.io", "6 min ago", "good"],
];

export default function WebhooksPage() {
  return (
    <>
      <PageHead
        title="Webhooks"
        sub="Deliver events to your systems as they happen. Failed deliveries retry for 24 hours."
        actions={
          <ActionButton
            label="Add endpoint"
            className="btn primary"
            icon="plus"
            title="Add webhook endpoint"
            fields={[
              { label: "Endpoint URL", placeholder: "https://" },
              { label: "Events", options: ["All events", "event.created", "feature.adopted"] },
            ]}
            confirmLabel="Add endpoint"
            toast="Webhook added"
          />
        }
      />
      <div className="tablewrap mb-16">
        <table>
          <thead>
            <tr>
              <th>Endpoint</th>
              <th>Events</th>
              <th>Status</th>
              <th>Success 7d</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {webhooks.map(([url, evs, status, rate]) => (
              <tr key={url}>
                <td className="mono" style={{ fontSize: 11 }}>
                  {url}
                </td>
                <td className="muted" style={{ fontSize: 11 }}>
                  {evs}
                </td>
                <td>
                  <Badge tone={status === "Healthy" ? "good" : "warn"}>{status}</Badge>
                </td>
                <td className="num">{rate}</td>
                <td>
                  <button className="btn ghost sm">
                    <Icon name="settings" size={12} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card pad-lg">
        <div className="card-head">
          <h3>Recent deliveries</h3>
        </div>
        <div className="timeline">
          {deliveries.map(([code, text, time, tone], i) => (
            <div className="tl-item" key={i}>
              <div className="rail">
                <div className={`node ${tone === "crit" ? "bad" : ""}`}>
                  <Icon name={tone === "crit" ? "warn" : "check"} size={13} />
                </div>
                <div className="line" />
              </div>
              <div className="body">
                <b className="mono">{code}</b> <span className="ev">{text}</span>
                <div className="t">{time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
