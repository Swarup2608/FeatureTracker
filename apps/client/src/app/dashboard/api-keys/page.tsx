import type { Metadata } from "next";
import { PageHead, Badge } from "@/components/ui/bits";
import { Icon } from "@/components/Icon";
import { CopyButton } from "@/components/ui/CopyButton";
import { ActionButton } from "@/components/ui/ActionButton";
import { apiKeys } from "@/lib/data";

export const metadata: Metadata = { title: "API Keys · FeatureTrack" };

export default function ApiKeysPage() {
  return (
    <>
      <PageHead
        title="API Keys"
        sub="Keys are scoped to one environment. Client keys are safe to expose; server keys are not."
        actions={
          <ActionButton
            label="Create key"
            className="btn primary"
            icon="plus"
            title="Create API key"
            fields={[
              { label: "Name", placeholder: "e.g. Production server" },
              { label: "Scope", options: ["Server (write)", "Client (public)", "Export (read)"] },
            ]}
            confirmLabel="Create key"
            toast="API key created"
          />
        }
      />

      <div
        className="state"
        style={{
          borderColor: "color-mix(in srgb, var(--warn) 35%, var(--border))",
          marginBottom: 16,
          padding: 16,
          textAlign: "left",
          display: "flex",
          gap: 12,
          alignItems: "center",
        }}
      >
        <div
          className="ic"
          style={{ margin: 0, background: "color-mix(in srgb, var(--warn) 14%, transparent)", color: "var(--warn)" }}
        >
          <Icon name="warn" size={18} />
        </div>
        <div>
          <b style={{ fontSize: 12.5 }}>Rotate server keys every 90 days.</b>
          <p style={{ margin: "2px 0 0" }}>2 keys are older than your rotation policy.</p>
        </div>
        <button className="btn sm" style={{ marginLeft: "auto" }}>
          Review
        </button>
      </div>

      <div className="tablewrap">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Key</th>
              <th>Scope</th>
              <th>Created</th>
              <th>Last used</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {apiKeys.map(([name, key, scope, created, used]) => (
              <tr key={key}>
                <td>
                  <b>{name}</b>
                </td>
                <td>
                  <code
                    className="mono"
                    style={{ fontSize: 11, background: "var(--surface-2)", padding: "3px 7px", borderRadius: 6 }}
                  >
                    {key.slice(0, 10)}
                    {"•".repeat(12)}
                  </code>{" "}
                  <CopyButton text={key} />
                </td>
                <td>
                  <Badge tone={scope === "Client" ? "good" : ""} dot={scope === "Client"}>
                    {scope}
                  </Badge>
                </td>
                <td className="muted">{created}</td>
                <td className="muted">{used}</td>
                <td>
                  <ActionButton
                    label="Revoke"
                    className="btn danger sm"
                    title="Revoke this key?"
                    body={`Any service using ${name} will immediately stop sending events. This cannot be undone.`}
                    confirmLabel="Revoke key"
                    danger
                    toast="Key revoked"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
