import * as React from "react";

const PATHS: Record<string, string> = {
  overview: '<path d="M3 3h8v8H3zM13 3h8v5h-8zM13 12h8v9h-8zM3 15h8v6H3z"/>',
  analytics: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2" stroke-linecap="round"/>',
  activity: '<path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke-linecap="round" stroke-linejoin="round"/>',
  adoption: '<circle cx="12" cy="12" r="9"/><path d="M12 2v20M2 12h20" stroke-linecap="round"/>',
  recent: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3" stroke-linecap="round" stroke-linejoin="round"/>',
  projects: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke-linejoin="round"/>',
  events: '<path d="M4 5h16M4 12h16M4 19h10" stroke-linecap="round"/>',
  features: '<path d="M12 2 2 7l10 5 10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke-linejoin="round"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2 21c0-3.9 3.1-6 7-6s7 2.1 7 6M17 11a3 3 0 0 0 0-6M22 21c0-3-1.5-5-4-5.6" stroke-linecap="round"/>',
  live: '<circle cx="12" cy="12" r="3"/><path d="M6.3 6.3a8 8 0 0 0 0 11.4M17.7 17.7a8 8 0 0 0 0-11.4M3.5 3.5a12 12 0 0 0 0 17M20.5 20.5a12 12 0 0 0 0-17" stroke-linecap="round"/>',
  keys: '<circle cx="8" cy="15" r="4"/><path d="M10.8 12.2 20 3M17 6l3 3M14 9l2 2" stroke-linecap="round" stroke-linejoin="round"/>',
  sdk: '<path d="M8 6 2 12l6 6M16 6l6 6-6 6M13 4l-2 16" stroke-linecap="round" stroke-linejoin="round"/>',
  explorer: '<circle cx="12" cy="12" r="9"/><path d="m16 8-2.5 5.5L8 16l2.5-5.5z" stroke-linejoin="round"/>',
  webhooks: '<path d="M9 9a3 3 0 1 1 4 2.8l-2.2 3.9M15 12a3 3 0 1 1-3 3H8M9 18a3 3 0 1 1-2.6-4.5l2-3.5" stroke-linecap="round" stroke-linejoin="round"/>',
  team: '<circle cx="12" cy="8" r="3.5"/><path d="M5 20c0-3.9 3.1-6 7-6s7 2.1 7 6" stroke-linecap="round"/>',
  audit: '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z" stroke-linejoin="round"/><path d="m9 12 2 2 4-4" stroke-linecap="round" stroke-linejoin="round"/>',
  settings:
    '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V23a2 2 0 0 1-4 0v-.2a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H1a2 2 0 0 1 0-4h.2a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H7a1.6 1.6 0 0 0 1-1.5V1a2 2 0 0 1 4 0v.2a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V7a1.6 1.6 0 0 0 1.5 1H23a2 2 0 0 1 0 4h-.2a1.6 1.6 0 0 0-1.5 1z" stroke-linejoin="round"/>',
  plus: '<path d="M12 5v14M5 12h14" stroke-linecap="round"/>',
  up: '<path d="M7 14l5-5 5 5" stroke-linecap="round" stroke-linejoin="round"/>',
  down: '<path d="M7 10l5 5 5-5" stroke-linecap="round" stroke-linejoin="round"/>',
  chevron: '<path d="M9 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/>',
  ext: '<path d="M7 17 17 7M9 7h8v8" stroke-linecap="round" stroke-linejoin="round"/>',
  copy: '<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h8"/>',
  check: '<path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round"/>',
  filter: '<path d="M3 5h18l-7 8v6l-4 2v-8z" stroke-linejoin="round"/>',
  download: '<path d="M12 3v12M7 10l5 5 5-5M4 21h16" stroke-linecap="round" stroke-linejoin="round"/>',
  bolt: '<path d="M13 2 3 14h7l-1 8 10-12h-7z" stroke-linejoin="round"/>',
  inbox: '<path d="M3 12h5l2 3h4l2-3h5M4 5h16l1 7v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-6z" stroke-linejoin="round"/>',
  warn: '<path d="M12 3 2 20h20zM12 9v5M12 17h.01" stroke-linecap="round" stroke-linejoin="round"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" stroke-linecap="round"/>',
  play: '<path d="M6 4l14 8-14 8z" stroke-linejoin="round"/>',
  pause: '<path d="M8 5v14M16 5v14" stroke-linecap="round"/>',
  code: '<path d="M8 6 2 12l6 6M16 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/>',
  link: '<path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" stroke-linecap="round"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3" stroke-linecap="round"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" stroke-linecap="round" stroke-linejoin="round"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5 3.6 3.6M20.4 20.4 19 19M19 5l1.4-1.4M3.6 20.4 5 19" stroke-linecap="round"/>',
  moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z" stroke-linecap="round" stroke-linejoin="round"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16" stroke-linecap="round"/>',
  x: '<path d="M6 6l12 12M18 6 6 18" stroke-linecap="round"/>',
  logo: '<path d="M4 18 L9 9 L13 14 L20 5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="20" cy="5" r="1.6" fill="currentColor" stroke="none"/>',
  google:
    '<path d="M21 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.1c-.2 1.2-.9 2.2-1.9 2.9v2.4h3.1c1.8-1.7 2.7-4.1 2.7-7.1z"/><path d="M12 21c2.4 0 4.5-.8 6-2.2l-3.1-2.4c-.8.6-1.9.9-2.9.9-2.3 0-4.2-1.5-4.9-3.6H3.9v2.5C5.4 19.1 8.5 21 12 21z"/><path d="M7.1 13.7c-.2-.6-.3-1.1-.3-1.7s.1-1.2.3-1.7V7.8H3.9C3.3 9 3 10.5 3 12s.3 3 .9 4.2z"/><path d="M12 6.6c1.3 0 2.5.4 3.4 1.3l2.6-2.6C16.5 3.9 14.4 3 12 3 8.5 3 5.4 4.9 3.9 7.8l3.2 2.5C7.8 8.1 9.7 6.6 12 6.6z"/>',
  github:
    '<path d="M12 2C6.5 2 2 6.6 2 12.3c0 4.5 2.9 8.3 6.8 9.7.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.4-3.4-1.4-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.3 9.3 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.3 4.7-4.6 5 .4.3.7 1 .7 2v3c0 .3.2.6.7.5A10.1 10.1 0 0 0 22 12.3C22 6.6 17.5 2 12 2z"/>',
};

type Props = {
  name: keyof typeof PATHS | string;
  size?: number;
  className?: string;
  filled?: boolean;
};

export function Icon({ name, size = 18, className, filled }: Props) {
  const inner = PATHS[name] ?? PATHS.check;
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={1.8}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: inner }}
    />
  );
}
