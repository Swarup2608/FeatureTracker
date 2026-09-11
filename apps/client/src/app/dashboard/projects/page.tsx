import type { Metadata } from "next";
import { PageHead } from "@/components/ui/bits";
import { ActionButton } from "@/components/ui/ActionButton";
import { projects } from "@/lib/data";

export const metadata: Metadata = { title: "Projects · FeatureTrack" };

const newProject = (
  <ActionButton
    label="New project"
    className="btn primary"
    icon="plus"
    title="New project"
    fields={[
      { label: "Project name", placeholder: "e.g. Corewave Mobile" },
      { label: "Default environment", options: ["Production", "Staging"] },
    ]}
    confirmLabel="Create project"
    toast="Project created"
  />
);

export default function ProjectsPage() {
  return (
    <>
      <PageHead title="Projects" sub="Each project has its own events, keys and environments." actions={newProject} />
      <div className="grid g-3">
        {projects.map(([name, key, events, adoption, color]) => (
          <div className="card" key={key} style={{ cursor: "pointer" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <span style={{ width: 32, height: 32, borderRadius: 9, background: color, opacity: 0.9 }} />
              <div>
                <b style={{ fontFamily: "var(--display)" }}>{name}</b>
                <div className="muted mono" style={{ fontSize: 11 }}>
                  {key}
                </div>
              </div>
            </div>
            <dl className="kv" style={{ fontSize: 12 }}>
              <dt>Events 30d</dt>
              <dd className="num">{events}</dd>
              <dt>Adoption</dt>
              <dd className="num">{adoption}</dd>
              <dt>Environments</dt>
              <dd>Prod · Staging · Dev</dd>
            </dl>
          </div>
        ))}
        <div className="state" style={{ borderStyle: "dashed" }}>
          <div className="ic">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} width={20} height={20}>
              <path d="M12 5v14M5 12h14" strokeLinecap="round" />
            </svg>
          </div>
          <h3 style={{ fontSize: 13 }}>New project</h3>
          <p style={{ marginBottom: 12 }}>Spin up tracking for another app or service.</p>
          {newProject}
        </div>
      </div>
    </>
  );
}
