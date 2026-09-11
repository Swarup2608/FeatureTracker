"use client";

import * as React from "react";
import { useToast } from "@/components/ui/Toast";

type CodeToken = { type: "k" | "s" | "c" | "n" | "text"; text: string };

const CODE: Record<string, CodeToken[][]> = {
  js: [
    [
      { type: "k", text: "import" },
      { type: "text", text: " { track } " },
      { type: "k", text: "from" },
      { type: "text", text: " " },
      { type: "s", text: '"@featuretrack/js"' },
      { type: "text", text: ";" },
    ],
    [{ type: "text", text: "" }],
    [
      { type: "n", text: "track" },
      { type: "text", text: "(" },
      { type: "s", text: '"checkout_completed"' },
      { type: "text", text: ", {" },
    ],
    [
      { type: "text", text: "  feature: " },
      { type: "s", text: '"one-click-pay"' },
      { type: "text", text: "," },
    ],
    [{ type: "text", text: "  user: session.userId," }],
    [
      { type: "text", text: "  props: { cart: 2, currency: " },
      { type: "s", text: '"EUR"' },
      { type: "text", text: " }" },
    ],
    [{ type: "text", text: "});" }],
  ],
  py: [
    [
      { type: "k", text: "from" },
      { type: "text", text: " featuretrack " },
      { type: "k", text: "import" },
      { type: "text", text: " track" },
    ],
    [{ type: "text", text: "" }],
    [
      { type: "n", text: "track" },
      { type: "text", text: "(" },
      { type: "s", text: '"checkout_completed"' },
      { type: "text", text: "," },
    ],
    [
      { type: "text", text: "      feature=" },
      { type: "s", text: '"one-click-pay"' },
      { type: "text", text: "," },
    ],
    [{ type: "text", text: "      user=session.user_id," }],
    [
      { type: "text", text: "      props={" },
      { type: "s", text: '"cart"' },
      { type: "text", text: ": 2, " },
      { type: "s", text: '"currency"' },
      { type: "text", text: ": " },
      { type: "s", text: '"EUR"' },
      { type: "text", text: "})" },
    ],
  ],
  go: [
    [
      { type: "n", text: "ft" },
      { type: "text", text: ".Track(ctx, featuretrack.Event{" },
    ],
    [
      { type: "text", text: "    Name:    " },
      { type: "s", text: '"checkout_completed"' },
      { type: "text", text: "," },
    ],
    [
      { type: "text", text: "    Feature: " },
      { type: "s", text: '"one-click-pay"' },
      { type: "text", text: "," },
    ],
    [{ type: "text", text: "    User:    session.UserID," }],
    [
      { type: "text", text: "    Props:   ft.M{" },
      { type: "s", text: '"cart"' },
      { type: "text", text: ": 2, " },
      { type: "s", text: '"currency"' },
      { type: "text", text: ": " },
      { type: "s", text: '"EUR"' },
      { type: "text", text: "}," },
    ],
    [{ type: "text", text: "})" }],
  ],
};
const TABS: [string, string][] = [
  ["js", "index.ts"],
  ["py", "main.py"],
  ["go", "main.go"],
];

const getCodeText = (tokens: CodeToken[][]): string => {
  return tokens.map((line) => line.map((t) => t.text).join("")).join("\n");
};

export function HeroTerminal() {
  const [tab, setTab] = React.useState("js");
  const [count, setCount] = React.useState(48213904);
  const toast = useToast();

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const iv = setInterval(
      () => setCount((c) => c + 111 + Math.floor(Math.random() * 90)),
      1400,
    );
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="mk-term mk-rise d1">
      <div className="bar">
        <div className="tabs">
          {TABS.map(([id, label]) => (
            <button
              key={id}
              className={tab === id ? "on" : ""}
              onClick={() => setTab(id)}
            >
              {label}
            </button>
          ))}
        </div>
        <button
          className="copy"
          onClick={() => {
            navigator.clipboard
              ?.writeText(getCodeText(CODE[tab]))
              .catch(() => {});
            toast("Snippet copied");
          }}
        >
          COPY
        </button>
      </div>
      <pre>
        {CODE[tab].map((line, i) => (
          <React.Fragment key={i}>
            {line.map((token, j) =>
              token.type === "text" ? (
                token.text
              ) : (
                <span key={j} className={token.type}>
                  {token.text}
                </span>
              ),
            )}
            {i < CODE[tab].length - 1 ? "\n" : ""}
          </React.Fragment>
        ))}
      </pre>
      <div className="foot">
        <i />
        <span>ingested</span>
        <b suppressHydrationWarning>{count.toLocaleString("en-US")}</b>
        <span>events · p95 84ms</span>
      </div>
    </div>
  );
}
