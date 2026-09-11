import type { Metadata } from "next";
import { PageHead, Badge } from "@/components/ui/bits";
import { ToastButton } from "@/components/ui/ToastButton";
import { ActionButton } from "@/components/ui/ActionButton";

export const metadata: Metadata = { title: "Settings · FeatureTrack" };

const inputStyle = {
  width: "100%",
  padding: "9px 11px",
  border: "1px solid var(--border-strong)",
  borderRadius: 8,
  background: "var(--surface-2)",
} as const;

export default function SettingsPage() {
  return (
    <>
      <PageHead title="Settings" sub="Workspace configuration for Corewave." />
      <div className="grid g-2">
        <div className="card pad-lg">
          <div className="card-head">
            <h3>General</h3>
          </div>
          <div className="field">
            <label>Workspace name</label>
            <input defaultValue="Corewave" style={inputStyle} />
          </div>
          <div className="field">
            <label>Primary URL</label>
            <input defaultValue="https://app.corewave.io" style={inputStyle} />
          </div>
          <ToastButton label="Save changes" message="Settings saved" />
        </div>

        <div className="card pad-lg">
          <div className="card-head">
            <h3>Data &amp; retention</h3>
          </div>
          <dl className="kv">
            <dt>Event retention</dt>
            <dd>90 days</dd>
            <dt>Raw export</dt>
            <dd>Parquet · daily</dd>
            <dt>PII scrubbing</dt>
            <dd>
              <Badge tone="good">on</Badge>
            </dd>
            <dt>Region</dt>
            <dd>us-east</dd>
          </dl>
        </div>

        <div className="card pad-lg">
          <div className="card-head">
            <h3>Security</h3>
          </div>
          <dl className="kv">
            <dt>SSO / SAML</dt>
            <dd>
              <Badge tone="good">enforced</Badge>
            </dd>
            <dt>2FA</dt>
            <dd>Required for all members</dd>
            <dt>Session length</dt>
            <dd>12 hours</dd>
          </dl>
        </div>

        <div className="card pad-lg" style={{ borderColor: "color-mix(in srgb, var(--crit) 30%, var(--border))" }}>
          <div className="card-head">
            <h3 style={{ color: "var(--crit)" }}>Danger zone</h3>
          </div>
          <p style={{ fontSize: 12, color: "var(--ink-2)", marginBottom: 14 }}>
            Deleting the workspace removes all events, features and keys. This cannot be undone.
          </p>
          <ActionButton
            label="Delete workspace"
            className="btn danger"
            title="Delete workspace"
            body="This permanently removes all events, features and keys for Corewave."
            fields={[{ label: "Type Corewave to confirm", placeholder: "Corewave" }]}
            confirmLabel="Delete forever"
            danger
            toast="Workspace scheduled for deletion"
          />
        </div>
      </div>
    </>
  );
}
