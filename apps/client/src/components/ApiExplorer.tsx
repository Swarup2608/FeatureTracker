"use client";

import * as React from "react";
import { Icon } from "@/components/Icon";
import { Badge } from "@/components/ui/bits";

const REQ_BODY = `{
  "event": "checkout_started",
  "user_id": "usr_8f21c4ae",
  "properties": { "plan": "pro", "seats": 12 }
}`;

const RES_BODY = `{
  "status": "accepted",
  "event_id": "evt_4b8e1c92f0",
  "received_at": "2026-09-09T14:22:07Z",
  "queued": true
}`;

type State = "idle" | "loading" | "done";

export function ApiExplorer() {
  const [state, setState] = React.useState<State>("idle");

  const send = () => {
    setState("loading");
    const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setTimeout(() => setState("done"), reduce ? 200 : 850);
  };

  return (
    <div className="grid g-2">
      <div className="card pad-lg">
        <div className="card-head">
          <h3>Request</h3>
        </div>
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <select
            style={{
              padding: "8px 10px",
              border: "1px solid var(--border-strong)",
              borderRadius: 8,
              background: "var(--surface-2)",
              fontWeight: 600,
            }}
          >
            <option>POST</option>
            <option>GET</option>
          </select>
          <input
            defaultValue="/v1/events/track"
            className="mono"
            style={{
              flex: 1,
              padding: "8px 11px",
              border: "1px solid var(--border-strong)",
              borderRadius: 8,
              background: "var(--surface-2)",
              fontSize: 12,
            }}
          />
        </div>
        <label className="eyebrow" style={{ display: "block", marginBottom: 6 }}>
          Body
        </label>
        <div className="code">
          <pre>{REQ_BODY}</pre>
        </div>
        <button className="btn primary" onClick={send} style={{ marginTop: 14 }}>
          <Icon name="play" size={14} /> Send request
        </button>
      </div>

      <div className="card pad-lg">
        <div className="card-head">
          <h3>Response</h3>
          <div className="actions">
            {state === "done" ? <Badge tone="good">200 OK · 41ms</Badge> : null}
          </div>
        </div>
        {state === "idle" ? (
          <div className="state" style={{ border: 0, background: "var(--surface-2)", padding: "34px 14px" }}>
            <div className="ic">
              <Icon name="bolt" size={20} />
            </div>
            <h3 style={{ fontSize: 13 }}>No request sent yet</h3>
            <p style={{ marginBottom: 0 }}>Send a request to see the response here.</p>
          </div>
        ) : null}
        {state === "loading" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div className="skel" style={{ height: 14, width: "40%" }} />
            <div className="skel" style={{ height: 14, width: "70%" }} />
            <div className="skel" style={{ height: 14, width: "55%" }} />
            <div className="skel" style={{ height: 14, width: "65%" }} />
          </div>
        ) : null}
        {state === "done" ? (
          <div className="code">
            <pre>{RES_BODY}</pre>
          </div>
        ) : null}
      </div>
    </div>
  );
}
