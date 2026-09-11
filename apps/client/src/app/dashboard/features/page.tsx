import type { Metadata } from "next";
import Link from "next/link";
import { PageHead, Badge, Bar } from "@/components/ui/bits";
import { Icon } from "@/components/Icon";
import { ActionButton } from "@/components/ui/ActionButton";
import { features } from "@/lib/data";

export const metadata: Metadata = { title: "Features · FeatureTrack" };

export default function FeaturesPage() {
  return (
    <>
      <PageHead
        title="Features"
        sub="Track rollout and adoption for each product capability."
        actions={
          <>
            <button className="btn">
              <Icon name="filter" size={14} /> All squads
            </button>
            <ActionButton
              label="New feature"
              className="btn primary"
              icon="plus"
              title="Track a new feature"
              fields={[
                { label: "Display name", placeholder: "e.g. Saved Views" },
                { label: "Feature key", placeholder: "saved_views" },
                { label: "Owner squad", options: ["editor-squad", "growth-team", "platform"] },
              ]}
              confirmLabel="Create feature"
              toast="Feature created"
            />
          </>
        }
      />
      <div className="tablewrap">
        <table>
          <thead>
            <tr>
              <th>Feature</th>
              <th>Key</th>
              <th>Adoption</th>
              <th>Users 30d</th>
              <th>Trend</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {features.map((f) => (
              <tr key={f.key} className="clickable">
                <td>
                  <Link href={`/dashboard/features/${f.slug}`}>
                    <b>{f.name}</b>
                  </Link>
                </td>
                <td className="muted mono" style={{ fontSize: 11 }}>
                  {f.key}
                </td>
                <td style={{ minWidth: 170 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                    <div style={{ flex: 1 }}>
                      <Bar pct={f.adoption} />
                    </div>
                    <span className="num" style={{ fontWeight: 600, fontSize: 12 }}>
                      {f.adoption}%
                    </span>
                  </div>
                </td>
                <td className="num">{f.users}</td>
                <td>
                  <Badge tone={f.delta >= 0 ? "good" : "crit"}>
                    {f.delta >= 0 ? "+" : ""}
                    {f.delta} pts
                  </Badge>
                </td>
                <td>
                  <Link href={`/dashboard/features/${f.slug}`} aria-label={`Open ${f.name}`}>
                    <Icon name="chevron" size={14} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
