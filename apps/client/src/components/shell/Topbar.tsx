"use client";

import * as React from "react";
import { Icon } from "@/components/Icon";
import { ThemeToggle } from "./ThemeToggle";
import { AccentPicker } from "./AccentPicker";

const ENVS = ["Production", "Staging", "Development"];

export function Topbar({ onMenu, onSearch }: { onMenu: () => void; onSearch: () => void }) {
  const [env, setEnv] = React.useState("Production");

  return (
    <header className="topbar">
      <button className="iconbtn menu-toggle" onClick={onMenu} aria-label="Open menu">
        <Icon name="menu" size={16} />
      </button>

      <button className="switcher">
        <span className="swatch" /> Corewave Web
        <Icon name="chevron" size={13} />
      </button>

      <div className="seg" role="group" aria-label="Environment">
        {ENVS.map((e) => (
          <button key={e} aria-pressed={env === e} onClick={() => setEnv(e)}>
            {e}
          </button>
        ))}
      </div>

      <button className="search" onClick={onSearch}>
        <Icon name="search" size={14} />
        Search events, features, users…
        <kbd>⌘K</kbd>
      </button>

      <button className="iconbtn" aria-label="Notifications">
        <span className="badge-dot" />
        <Icon name="bell" size={16} />
      </button>
      <AccentPicker />
      <ThemeToggle />
    </header>
  );
}
