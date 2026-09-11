import type { Metadata } from "next";
import { PageHead, Crumb, Bar } from "@/components/ui/bits";
import { Icon } from "@/components/Icon";
import { Stat } from "@/components/ui/Stat";
import { AreaChart } from "@/components/charts/AreaChart";
import { CopyButton } from "@/components/ui/CopyButton";
import { featureBySlug, dateLabels } from "@/lib/data";
import { series } from "@/lib/format";

export async function generateMetadata({ params }: { params: Promise<{ feature: string }> }): Promise<Metadata> {
  const { feature } = await params;
  return { title: `${featureBySlug(feature).name} · Features · FeatureTrack` };
}

export default async function FeatureDetailPage({ params }: { params: Promise<{ feature: string }> }) {
  const { feature } = await params;
  const f = featureBySlug(feature);

  return (
    <>
      <PageHead
        title={f.name}
        crumb={<Crumb items={[{ label: "Features", href: "/dashboard/features" }, { label: f.name }]} />}
        sub={`${f.key} · rolled out to 100% · owned by editor-squad`}
        actions={
          <>
            <button className="btn">
              <Icon name="settings" size={14} /> Rollout
            </button>
            <CopyButton
              className="btn primary"
              label="Copy tracking snippet"
              text={`ft.feature('${f.key}').used()`}
            />
          </>
        }
      />

      <div className="grid g-4 mb-16">
        <Stat label="Adoption" icon="adoption" value={f.adoption} delta={`${f.delta >= 0 ? "+" : ""}${f.delta} pts`} dir={f.delta >= 0 ? "up" : "down"} spark={[52, 55, 58, 60, 63, 66, 70, f.adoption]} />
        <Stat label="Users 30d" icon="users" value={18400} format="compact" delta="8% vs prev" dir="up" spark={[150, 156, 161, 168, 172, 178, 182, 184]} />
        <Stat label="Repeat rate" icon="recent" value={67} delta="4 pts" dir="up" spark={[58, 60, 61, 63, 64, 65, 66, 67]} />
        <Stat label="Time to first use" icon="bolt" value={2.4} delta="0.6 faster" dir="down" spark={[40, 38, 35, 33, 31, 29, 26, 24]} />
      </div>

      <div className="grid g-2-1">
        <div className="card pad-lg">
          <div className="card-head">
            <h3>Adoption over time</h3>
            <span className="sub">% of active users</span>
          </div>
          <AreaChart data={series(9, 48, 4, (f.delta || 4) / 6)} labels={dateLabels} valueSuffix="%" />
        </div>
        <div className="card pad-lg">
          <div className="card-head">
            <h3>Top segments</h3>
          </div>
          <div className="adopt">
            {[
              ["Enterprise", 86],
              ["Team", 71],
              ["Pro", 54],
              ["Free", 22],
            ].map(([seg, pct]) => (
              <div className="adopt-row" key={seg as string}>
                <span className="name">{seg}</span>
                <span className="pct num">{pct}%</span>
                <Bar pct={pct as number} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
