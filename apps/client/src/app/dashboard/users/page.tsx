import type { Metadata } from "next";
import Link from "next/link";
import { PageHead, Badge } from "@/components/ui/bits";
import { Icon } from "@/components/Icon";
import { users } from "@/lib/data";
import { commas } from "@/lib/format";

export const metadata: Metadata = { title: "Users · FeatureTrack" };

const tone = (s: string) => (s === "active" ? "good" : s === "idle" ? "warn" : "crit") as "good" | "warn" | "crit";

export default function UsersPage() {
  return (
    <>
      <PageHead
        title="Users"
        sub="Identified users seen in this environment. 7 of 94,210 shown."
        actions={
          <>
            <button className="btn">
              <Icon name="filter" size={14} /> Any plan
            </button>
            <button className="btn">
              <Icon name="download" size={14} /> Export
            </button>
          </>
        }
      />
      <div className="tablewrap">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Plan</th>
              <th>Last seen</th>
              <th>Events 30d</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="clickable">
                <td>
                  <Link href={`/dashboard/users/${u.slug}`} className="u">
                    <span className="avatar">{u.initials}</span>
                    <span>
                      <b>{u.name}</b>
                      <span className="muted" style={{ fontSize: 11, display: "block" }}>
                        {u.email}
                      </span>
                    </span>
                  </Link>
                </td>
                <td>
                  <Badge dot={false}>{u.plan}</Badge>
                </td>
                <td className="muted">{u.lastSeen}</td>
                <td className="num">{commas(u.events30d)}</td>
                <td>
                  <Badge tone={tone(u.status)}>{u.status}</Badge>
                </td>
                <td>
                  <Link href={`/dashboard/users/${u.slug}`} aria-label={`Open ${u.name}`}>
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
