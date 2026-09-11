import type { Metadata } from "next";

export const metadata: Metadata = { title: "Docs · FeatureTrack" };

export default function DocsPage() {
  return (
    <div className="docs mk-wrap">
      <aside className="docs-side">
        <h5>Getting started</h5>
        <a className="on" href="#">
          Quickstart
        </a>
        <a href="#">Installing the SDK</a>
        <a href="#">Sending your first event</a>
        <h5>Core concepts</h5>
        <a href="#">Events &amp; properties</a>
        <a href="#">Features &amp; adoption</a>
        <a href="#">Identifying users</a>
        <a href="#">Environments</a>
        <h5>Reference</h5>
        <a href="#">JavaScript SDK</a>
        <a href="#">REST API</a>
        <a href="#">Webhooks</a>
      </aside>
      <article className="docs-body">
        <h1>Quickstart</h1>
        <p>
          Get from zero to a live event stream in about two minutes. This guide uses the JavaScript SDK; the same
          concepts apply to every client.
        </p>
        <h2>1. Install</h2>
        <div className="code">
          <div className="code-head">
            <span className="mono">terminal</span>
          </div>
          <pre>npm install @featuretrack/sdk</pre>
        </div>
        <h2>2. Initialize with your key</h2>
        <p>
          Grab a client key from <strong>Developer → API Keys</strong>. Keys are environment-scoped, so a{" "}
          <code>Development</code> key never writes to production data.
        </p>
        <div className="code">
          <div className="code-head">
            <span className="mono">app.ts</span>
          </div>
          <pre>
{`import { FeatureTrack } from '@featuretrack/sdk'
export const ft = new FeatureTrack({ key: 'ft_dev_9f2c…' })`}
          </pre>
        </div>
        <h2>3. Track an event</h2>
        <p>
          An event is a name plus an optional bag of properties. Property types are inferred on first sight and
          enforced afterwards.
        </p>
        <div className="code">
          <div className="code-head">
            <span className="mono">checkout.ts</span>
          </div>
          <pre>{`ft.track('checkout_started', { plan: 'pro', seats: 12 })`}</pre>
        </div>
        <p>
          That&apos;s it. Open <strong>Tracking → Live Events</strong> and you&apos;ll see it arrive within a second.
        </p>
      </article>
    </div>
  );
}
