import type { Metadata } from "next";
import { PageHead } from "@/components/ui/bits";
import { Icon } from "@/components/Icon";
import { CodeTabs } from "@/components/CodeTabs";

export const metadata: Metadata = { title: "SDK / Integration · FeatureTrack" };

const tsRaw = `import { FeatureTrack } from '@featuretrack/sdk'

const ft = new FeatureTrack({
  key: process.env.FT_SERVER_KEY,
  env: 'production',
})

ft.identify(user.id, { plan: user.plan, company: user.company })
ft.track('checkout_started', { plan: 'pro', seats: 12 })
ft.feature('ai_autocomplete').used()`;

const pyRaw = `from featuretrack import FeatureTrack

ft = FeatureTrack(key=os.environ["FT_SERVER_KEY"], env="production")

ft.identify(user.id, plan=user.plan, company=user.company)
ft.track("checkout_started", plan="pro", seats=12)
ft.feature("ai_autocomplete").used()`;

const goRaw = `ft := featuretrack.New(featuretrack.Config{
  Key: os.Getenv("FT_SERVER_KEY"),
  Env: "production",
})

ft.Identify(user.ID, featuretrack.Traits{"plan": user.Plan})
ft.Track("checkout_started", featuretrack.Props{"seats": 12})`;

export default function SdkPage() {
  return (
    <>
      <PageHead
        title="SDK / Integration"
        sub="Install a client, drop in your key, and send the first event."
        actions={
          <button className="btn">
            <Icon name="ext" size={14} /> Full docs
          </button>
        }
      />
      <div className="grid g-2-1">
        <div>
          <div style={{ marginBottom: 16 }}>
            <CodeTabs
              tabs={[
                { id: "ts", label: "TypeScript", raw: tsRaw, code: tsRaw },
                { id: "py", label: "Python", raw: pyRaw, code: pyRaw },
                { id: "go", label: "Go", raw: goRaw, code: goRaw },
              ]}
            />
          </div>
          <div className="card pad-lg">
            <div className="card-head">
              <h3>Verify your integration</h3>
            </div>
            <div className="timeline">
              <div className="tl-item">
                <div className="rail">
                  <div className="node ok">
                    <Icon name="check" size={13} />
                  </div>
                  <div className="line" />
                </div>
                <div className="body">
                  <b>SDK installed</b>
                  <div className="t">@featuretrack/sdk@4.2.0 · detected 2 min ago</div>
                </div>
              </div>
              <div className="tl-item">
                <div className="rail">
                  <div className="node ok">
                    <Icon name="check" size={13} />
                  </div>
                  <div className="line" />
                </div>
                <div className="body">
                  <b>First event received</b>
                  <div className="t">
                    <span className="ev">session_start</span> from svc_web
                  </div>
                </div>
              </div>
              <div className="tl-item">
                <div className="rail">
                  <div className="node">
                    <Icon name="recent" size={13} />
                  </div>
                </div>
                <div className="body">
                  <b style={{ color: "var(--ink-3)" }}>Waiting for identify() call</b>
                  <div className="t">Call ft.identify() to correlate events with users.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card pad-lg">
          <div className="card-head">
            <h3>Official SDKs</h3>
          </div>
          <div className="timeline">
            {["JavaScript / TypeScript", "React & React Native", "Python", "Go", "Ruby", "Java / Kotlin"].map((s) => (
              <div className="tl-item" key={s} style={{ gridTemplateColumns: "1fr auto", padding: "9px 0" }}>
                <div className="body">
                  <b>{s}</b>
                </div>
                <button className="btn ghost sm">
                  <Icon name="ext" size={12} />
                </button>
              </div>
            ))}
          </div>
          <div className="divide" />
          <p style={{ fontSize: 11.5, color: "var(--ink-3)" }}>
            Community SDKs exist for PHP, Rust, Elixir and Swift.
          </p>
        </div>
      </div>
    </>
  );
}
