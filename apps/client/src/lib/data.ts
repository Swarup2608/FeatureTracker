import { series, slugify } from "./format";

export const DAYS = 30;

export const dateLabels: string[] = Array.from({ length: DAYS }, (_, i) => {
  const d = new Date(2026, 8, 9);
  d.setDate(d.getDate() - (DAYS - 1 - i));
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
});

export const eventsData = series(1, 148000, 22000, 2600);
export const usersData = series(3, 9400, 1400, 120);
export const errData = series(7, 320, 90, -3);

export const topEvents: [string, number][] = [
  ["page_view", 4210000],
  ["session_start", 1180000],
  ["feature_used", 842000],
  ["api_request", 611000],
  ["search_performed", 358000],
  ["checkout_started", 96400],
  ["invite_sent", 41200],
  ["error_logged", 8730],
];

export type Feature = {
  name: string;
  key: string;
  adoption: number;
  delta: number;
  users: string;
  slug: string;
};

export const features: Feature[] = [
  ["AI Autocomplete", "ai_autocomplete", 72, 8, "18.4k"],
  ["Command Palette", "command_palette", 64, 3, "16.3k"],
  ["Dark Mode", "dark_mode", 58, -2, "14.8k"],
  ["Slack Integration", "slack_integration", 44, 11, "11.2k"],
  ["Bulk Export", "bulk_export", 28, 5, "7.1k"],
  ["Mobile App", "mobile_app", 19, 6, "4.9k"],
  ["Webhooks v2", "webhooks_v2", 12, 14, "3.1k"],
].map(([name, key, adoption, delta, users]) => ({
  name: name as string,
  key: key as string,
  adoption: adoption as number,
  delta: delta as number,
  users: users as string,
  slug: key as string,
}));

export function featureBySlug(slug: string): Feature {
  return features.find((f) => f.slug === slug) ?? features[0];
}

export type User = {
  id: string;
  name: string;
  email: string;
  initials: string;
  plan: string;
  lastSeen: string;
  events30d: number;
  status: "active" | "idle" | "churned";
  slug: string;
};

export const users: User[] = [
  ["Marcus Reed", "marcus@northwind.io", "MR", "Pro", "2 min ago", 1284, "active"],
  ["Lena Ortiz", "lena@lumen.app", "LO", "Team", "14 min ago", 983, "active"],
  ["Sam Whitfield", "sam@kettle.co", "SW", "Free", "1 hr ago", 412, "active"],
  ["Aisha Bello", "aisha@fathom.dev", "AB", "Pro", "3 hr ago", 2210, "active"],
  ["Tomás Vega", "tomas@basewise.com", "TV", "Team", "1 day ago", 77, "idle"],
  ["Priya Nathan", "priya@corewave.io", "PN", "Enterprise", "2 days ago", 5401, "idle"],
  ["Jordan Park", "jordan@corewave.io", "JP", "Free", "9 days ago", 3, "churned"],
].map(([name, email, initials, plan, lastSeen, events30d, status]) => ({
  id: "usr_" + slugify(name as string).replace(/-/g, "").slice(0, 10),
  name: name as string,
  email: email as string,
  initials: initials as string,
  plan: plan as string,
  lastSeen: lastSeen as string,
  events30d: events30d as number,
  status: status as User["status"],
  slug: slugify(name as string),
}));

export function userBySlug(slug: string): User {
  return users.find((u) => u.slug === slug) ?? users[0];
}

export type EventDef = {
  name: string;
  volume: string;
  trend: string;
  props: string;
  lastSeen: string;
  health: "good" | "warn" | "crit";
};

export const eventDefs: EventDef[] = [
  ["checkout_started", "96,412", "+12.4%", "pro · seats · coupon", "2 min ago", "good"],
  ["feature_used", "842,001", "+6.1%", "feature · surface", "just now", "good"],
  ["error_logged", "8,730", "-18.0%", "code · message · stack", "5 min ago", "crit"],
  ["invite_sent", "41,205", "+3.2%", "role · workspace", "12 min ago", "good"],
  ["search_performed", "358,884", "+0.4%", "query · results · latency_ms", "1 min ago", "warn"],
  ["api_request", "611,240", "+9.9%", "endpoint · status · ms", "just now", "good"],
  ["signup_completed", "12,004", "+21.7%", "source · plan · referrer", "8 min ago", "good"],
  ["session_start", "1,180,552", "+2.0%", "device · country", "just now", "good"],
].map(([name, volume, trend, props, lastSeen, health]) => ({
  name: name as string,
  volume: volume as string,
  trend: trend as string,
  props: props as string,
  lastSeen: lastSeen as string,
  health: health as EventDef["health"],
}));

export function eventByName(name: string): EventDef {
  return eventDefs.find((e) => e.name === name) ?? eventDefs[0];
}

export const apiKeys: [string, string, string, string, string][] = [
  ["Production server", "ft_prod_9f2c4a71be8842d0", "Server", "Sep 2, 2026", "2 min ago"],
  ["Web client", "ft_pub_c81d33a0f5e94b12", "Client", "Aug 19, 2026", "just now"],
  ["CI pipeline", "ft_ci_5a7e21094cd8f6a3", "Server", "Aug 1, 2026", "6 hr ago"],
  ["Data warehouse sync", "ft_export_2b9047fa1e6c", "Export", "Jul 22, 2026", "1 day ago"],
];

export const webhooks: [string, string, string, string][] = [
  ["https://hooks.corewave.io/ft/events", "event.created, feature.adopted", "Healthy", "99.9%"],
  ["https://api.northwind.io/webhooks/ft", "checkout_started, checkout_completed", "Healthy", "100%"],
  ["https://ops.lumen.app/ingest", "error_logged", "Degraded", "92.1%"],
];

export const auditRows: [string, string, string, string, string][] = [
  ["priya@corewave.io", "api_key.revoked", "Web client (legacy)", "2 min ago", "192.0.2.14"],
  ["marcus@corewave.io", "webhook.created", "ops.lumen.app/ingest", "1 hr ago", "198.51.100.7"],
  ["system", "export.completed", "events_2026_09.parquet", "3 hr ago", "—"],
  ["lena@corewave.io", "member.invited", "sam@kettle.co (Analyst)", "5 hr ago", "203.0.113.9"],
  ["priya@corewave.io", "settings.updated", "Data retention → 90 days", "1 day ago", "192.0.2.14"],
];

export const teamRows: [string, string, string, string, string][] = [
  ["Priya Nathan", "priya@corewave.io", "PN", "Owner", "Active"],
  ["Marcus Reed", "marcus@corewave.io", "MR", "Admin", "Active"],
  ["Lena Ortiz", "lena@corewave.io", "LO", "Developer", "Active"],
  ["Sam Whitfield", "sam@corewave.io", "SW", "Analyst", "Invited"],
];

export const liveTemplates: [string, string, string][] = [
  ["feature_used", "marcus@northwind.io", '{ feature: "ai_autocomplete", surface: "editor" }'],
  ["page_view", "anon_8f21c", '{ path: "/pricing", ref: "google" }'],
  ["checkout_started", "lena@lumen.app", '{ plan: "pro", seats: 12 }'],
  ["api_request", "svc_ci", '{ endpoint: "/v1/track", status: 200, ms: 42 }'],
  ["search_performed", "aisha@fathom.dev", '{ query: "retention", results: 18 }'],
  ["session_start", "sam@kettle.co", '{ device: "ios", country: "PT" }'],
  ["invite_sent", "priya@corewave.io", '{ role: "analyst" }'],
  ["error_logged", "svc_web", '{ code: "E_TIMEOUT", ms: 5001 }'],
  ["signup_completed", "anon_2be07", '{ source: "docs", plan: "free" }'],
];

export const projects: [string, string, string, string, string][] = [
  ["Corewave Web", "web", "4.87M", "61%", "var(--cat-2)"],
  ["Corewave API", "api", "12.4M", "44%", "var(--accent)"],
  ["Corewave Mobile", "mobile", "2.10M", "19%", "var(--cat-3)"],
  ["Marketing Site", "marketing", "880k", "—", "var(--ink-3)"],
];

export type NavItem = { href: string; label: string; icon: string; live?: boolean };
export const NAV: [string, NavItem[]][] = [
  [
    "Dashboard",
    [
      { href: "/dashboard", label: "Overview", icon: "overview" },
      { href: "/dashboard/analytics", label: "Analytics", icon: "analytics" },
      { href: "/dashboard/event-activity", label: "Event activity", icon: "activity" },
      { href: "/dashboard/feature-adoption", label: "Feature adoption", icon: "adoption" },
      { href: "/dashboard/recent-activity", label: "Recent activity", icon: "recent" },
    ],
  ],
  [
    "Tracking",
    [
      { href: "/dashboard/projects", label: "Projects", icon: "projects" },
      { href: "/dashboard/events", label: "Events", icon: "events" },
      { href: "/dashboard/features", label: "Features", icon: "features" },
      { href: "/dashboard/users", label: "Users", icon: "users" },
      { href: "/dashboard/live", label: "Live Events", icon: "live", live: true },
    ],
  ],
  [
    "Developer",
    [
      { href: "/dashboard/api-keys", label: "API Keys", icon: "keys" },
      { href: "/dashboard/sdk", label: "SDK / Integration", icon: "sdk" },
      { href: "/dashboard/api-explorer", label: "API Explorer", icon: "explorer" },
      { href: "/dashboard/webhooks", label: "Webhooks", icon: "webhooks" },
    ],
  ],
  [
    "Management",
    [
      { href: "/dashboard/team", label: "Team", icon: "team" },
      { href: "/dashboard/audit-logs", label: "Audit Logs", icon: "audit" },
      { href: "/dashboard/settings", label: "Settings", icon: "settings" },
    ],
  ],
];
