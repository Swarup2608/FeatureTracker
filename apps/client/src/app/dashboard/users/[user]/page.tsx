import type { Metadata } from "next";
import { PageHead, Crumb, Badge, Timeline } from "@/components/ui/bits";
import { Icon } from "@/components/Icon";
import { Stat } from "@/components/ui/Stat";
import { ActionButton } from "@/components/ui/ActionButton";
import { userBySlug } from "@/lib/data";
import { commas } from "@/lib/format";
import { userActivity } from "@/lib/samples";

export async function generateMetadata({ params }: { params: Promise<{ user: string }> }): Promise<Metadata> {
  const { user } = await params;
  return { title: `${userBySlug(user).name} · Users · FeatureTrack` };
}

export default async function UserDetailPage({ params }: { params: Promise<{ user: string }> }) {
  const { user } = await params;
  const u = userBySlug(user);

  return (
    <>
      <PageHead
        title={u.name}
        crumb={<Crumb items={[{ label: "Users", href: "/dashboard/users" }, { label: u.name }]} />}
        sub={`${u.email} · ${u.plan} plan · joined Mar 2026`}
        actions={
          <>
            <button className="btn">
              <Icon name="inbox" size={14} /> Message
            </button>
            <ActionButton
              label="Reset identity"
              className="btn danger"
              title="Reset identity?"
              body="This unlinks all events from this user profile. Events are kept as anonymous."
              confirmLabel="Reset identity"
              danger
              toast="Identity reset"
            />
          </>
        }
      />

      <div className="grid g-2-1">
        <div>
          <div className="grid g-3 mb-16">
            <Stat label="Events 30d" icon="activity" value={u.events30d} delta="active" dir="up" spark={[20, 24, 22, 28, 30, 32, 34, 36]} />
            <Stat label="Features used" icon="features" value={9} delta="of 34" dir="up" spark={[4, 5, 6, 6, 7, 8, 8, 9]} />
            <Stat label="Sessions" icon="recent" value={41} delta="this month" dir="up" spark={[20, 24, 28, 30, 33, 36, 39, 41]} />
          </div>
          <div className="card pad-lg">
            <div className="card-head">
              <h3>Activity timeline</h3>
              <div className="actions">
                <Badge tone={u.status === "active" ? "good" : "warn"}>{u.status}</Badge>
              </div>
            </div>
            <Timeline items={userActivity} />
          </div>
        </div>
        <div className="card pad-lg">
          <div className="card-head">
            <h3>Profile</h3>
          </div>
          <dl className="kv">
            <dt>User ID</dt>
            <dd className="mono" style={{ fontSize: 11 }}>
              {u.id}
            </dd>
            <dt>Email</dt>
            <dd>{u.email}</dd>
            <dt>Plan</dt>
            <dd>{u.plan}</dd>
            <dt>Company</dt>
            <dd>Northwind</dd>
            <dt>Country</dt>
            <dd>United States</dd>
            <dt>First seen</dt>
            <dd>Mar 14, 2026</dd>
            <dt>Last seen</dt>
            <dd>{u.lastSeen}</dd>
            <dt>Lifetime events</dt>
            <dd className="num">{commas(u.events30d * 7 + 400)}</dd>
          </dl>
          <div className="divide" />
          <div className="card-head">
            <h3 style={{ fontSize: 13 }}>Traits</h3>
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            <span className="chip">role: admin</span>
            <span className="chip">seats: 12</span>
            <span className="chip">nps: 9</span>
            <span className="chip">beta: true</span>
          </div>
        </div>
      </div>
    </>
  );
}
