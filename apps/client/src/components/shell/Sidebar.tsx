"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/Icon";
import { NAV } from "@/lib/data";

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/dashboard" ? pathname === href : pathname.startsWith(href));

  return (
    <aside className={`sidebar ${open ? "open" : ""}`}>
      <div className="brand">
        <div className="brand-mark">
          <Icon name="logo" size={17} />
        </div>
        <div>
          <b>FeatureTrack</b>
          <span>Corewave</span>
        </div>
        <Link href="/" className="brand-side" aria-label="View public site">
          <Icon name="ext" size={14} />
        </Link>
      </div>

      <nav className="nav">
        {NAV.map(([group, items]) => (
          <div className="nav-group" key={group}>
            <h5>{group}</h5>
            {items.map((it) => (
              <Link
                key={it.href}
                href={it.href}
                className={`nav-item ${isActive(it.href) ? "active" : ""}`}
                onClick={onClose}
              >
                <Icon name={it.icon} size={17} />
                <span>{it.label}</span>
                {it.live ? <span className="dot" /> : null}
              </Link>
            ))}
          </div>
        ))}
      </nav>

      <div className="side-foot">
        <button className="usercard">
          <span className="avatar">PN</span>
          <div>
            <b>Priya Nathan</b>
            <span>Owner</span>
          </div>
          <Icon name="chevron" size={14} className="" />
        </button>
      </div>
    </aside>
  );
}
