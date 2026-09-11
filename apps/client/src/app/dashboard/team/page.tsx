import type { Metadata } from "next";
import { PageHead, Badge } from "@/components/ui/bits";
import { Icon } from "@/components/Icon";
import { ActionButton } from "@/components/ui/ActionButton";
import { teamRows } from "@/lib/data";

export const metadata: Metadata = { title: "Team · FeatureTrack" };

export default function TeamPage() {
  return (
    <>
      <PageHead
        title="Team"
        sub="People with access to the Corewave workspace."
        actions={
          <ActionButton
            label="Invite member"
            className="btn primary"
            icon="plus"
            title="Invite member"
            fields={[
              { label: "Email", placeholder: "teammate@corewave.io", type: "email" },
              { label: "Role", options: ["Developer", "Analyst", "Admin"] },
            ]}
            confirmLabel="Send invite"
            toast="Invitation sent"
          />
        }
      />
      <div className="tablewrap">
        <table>
          <thead>
            <tr>
              <th>Member</th>
              <th>Role</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {teamRows.map(([name, email, initials, role, status]) => (
              <tr key={email}>
                <td>
                  <div className="u">
                    <span className="avatar">{initials}</span>
                    <div>
                      <b>{name}</b>
                      <div className="muted" style={{ fontSize: 11 }}>
                        {email}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <Badge dot={false}>{role}</Badge>
                </td>
                <td>
                  <Badge tone={status === "Active" ? "good" : "warn"}>{status}</Badge>
                </td>
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
    </>
  );
}
