import type { Metadata } from "next";
import { PageHead, Badge } from "@/components/ui/bits";
import { Icon } from "@/components/Icon";
import { auditRows } from "@/lib/data";

export const metadata: Metadata = { title: "Audit Logs · FeatureTrack" };

export default function AuditLogsPage() {
  return (
    <>
      <PageHead
        title="Audit Logs"
        sub="Every administrative action, retained for 1 year. Exportable to your SIEM."
        actions={
          <>
            <button className="btn">
              <Icon name="filter" size={14} /> All actors
            </button>
            <button className="btn">
              <Icon name="download" size={14} /> Export
            </button>
          </>
        }
      />
      <div className="tablewrap">
        <table>
          <thead>
            <tr>
              <th>Actor</th>
              <th>Action</th>
              <th>Target</th>
              <th>When</th>
              <th>IP</th>
            </tr>
          </thead>
          <tbody>
            {auditRows.map(([actor, action, target, when, ip], i) => (
              <tr key={i}>
                <td>
                  {actor === "system" ? (
                    <Badge dot={false}>system</Badge>
                  ) : (
                    <span className="mono" style={{ fontSize: 11 }}>
                      {actor}
                    </span>
                  )}
                </td>
                <td>
                  <span className="ev">{action}</span>
                </td>
                <td className="muted">{target}</td>
                <td className="muted">{when}</td>
                <td className="muted mono" style={{ fontSize: 11 }}>
                  {ip}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
