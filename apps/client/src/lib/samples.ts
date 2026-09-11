import type { TimelineItem } from "@/components/ui/bits";

export const activityFeed: TimelineItem[] = [
  { icon: "adoption", title: "Slack Integration crossed 44% adoption", time: "8 min ago" },
  { icon: "user", title: "aisha@fathom.dev completed activation", ev: "signup_completed", time: "22 min ago" },
  { icon: "warn", title: "Spike in error_logged on /checkout", ev: "error_logged", time: "1 hr ago", node: "bad" },
  { icon: "webhooks", title: "Webhook ops.lumen.app recovered", time: "2 hr ago" },
  { icon: "bolt", title: "847k events ingested in the last hour", time: "3 hr ago" },
  { icon: "keys", title: 'API key "Web client (legacy)" revoked by priya', time: "5 hr ago" },
  { icon: "team", title: "sam@kettle.co invited as Analyst", time: "6 hr ago" },
  { icon: "features", title: "Feature Command Palette shipped to 100%", time: "8 hr ago" },
  { icon: "recent", title: "Nightly warehouse export completed", time: "10 hr ago" },
  { icon: "activity", title: "checkout_started conversion up 2.1 pts", time: "12 hr ago" },
];

export const userActivity: TimelineItem[] = [
  { icon: "events", title: "Used", ev: "ai_autocomplete", time: "2 min ago" },
  { icon: "activity", title: "Triggered", ev: "checkout_started", time: "40 min ago" },
  { icon: "recent", title: "Started a session", time: "1 hr ago" },
  { icon: "features", title: "First used", ev: "command_palette", time: "yesterday" },
  { icon: "user", title: "Updated trait nps → 9", time: "3 days ago" },
];
