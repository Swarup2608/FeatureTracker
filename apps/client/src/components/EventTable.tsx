import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Badge } from "@/components/ui/bits";
import { eventDefs } from "@/lib/data";

export function EventTable() {
  return (
    <div className="tablewrap">
      <table>
        <thead>
          <tr>
            <th>Event</th>
            <th>Volume 30d</th>
            <th>Trend</th>
            <th>Properties</th>
            <th>Last seen</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {eventDefs.map((e) => (
            <tr key={e.name} className="clickable">
              <td>
                <Link href={`/dashboard/events/${e.name}`} className="ev">
                  {e.name}
                </Link>
              </td>
              <td className="num">{e.volume}</td>
              <td>
                <Badge tone={e.health}>{e.trend}</Badge>
              </td>
              <td className="muted mono" style={{ fontSize: 11 }}>
                {e.props}
              </td>
              <td className="muted">{e.lastSeen}</td>
              <td>
                <Link href={`/dashboard/events/${e.name}`} aria-label={`Open ${e.name}`}>
                  <Icon name="chevron" size={14} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
