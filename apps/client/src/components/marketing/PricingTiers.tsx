"use client";

import * as React from "react";
import Link from "next/link";
import { Icon } from "@/components/Icon";

type Period = "monthly" | "annual";

type Tier = {
  name: string;
  monthly: number | null;
  annualMonthly?: number;
  note: string;
  features: string[];
  cta: string;
  href: string;
  popular?: boolean;
};

const TIERS: Tier[] = [
  {
    name: "Developer",
    monthly: 0,
    note: "For side projects and evaluation.",
    features: [
      "1M events / month",
      "3 projects · 7-day retention",
      "Community support",
    ],
    cta: "Get started",
    href: "/register",
  },
  {
    name: "Team",
    monthly: 90,
    annualMonthly: 72,
    note: "Billed at $0.30 per extra 10k events.",
    features: [
      "25M events / month included",
      "Unlimited projects · 90-day retention",
      "Real-time streams & webhooks",
      "Priority email support",
    ],
    cta: "Start 14-day trial",
    href: "/register",
    popular: true,
  },
  {
    name: "Enterprise",
    monthly: null,
    note: "For teams with compliance and scale needs.",
    features: [
      "Volume event pricing",
      "SSO / SAML · SCIM · audit log export",
      "Dedicated support & SLA",
    ],
    cta: "Contact sales",
    href: "/register",
  },
];

function priceFor(tier: Tier, period: Period) {
  if (tier.monthly === null) return { amount: "Custom", unit: null };
  if (tier.monthly === 0) return { amount: "$0", unit: " /mo" };
  const perMonth =
    period === "annual" && tier.annualMonthly ? tier.annualMonthly : tier.monthly;
  return { amount: `$${perMonth}`, unit: " /mo" };
}

export function PricingTiers() {
  const [period, setPeriod] = React.useState<Period>("monthly");

  return (
    <>
      <div className="billing-toggle">
        <div className="switch">
          <button
            type="button"
            className={period === "monthly" ? "on" : ""}
            onClick={() => setPeriod("monthly")}
          >
            Monthly
          </button>
          <button
            type="button"
            className={period === "annual" ? "on" : ""}
            onClick={() => setPeriod("annual")}
          >
            Annual
          </button>
        </div>
        <span className="save-badge">Save 20% billed annually</span>
      </div>

      <div className="price-grid">
        {TIERS.map((t) => {
          const { amount, unit } = priceFor(t, period);
          const annualNote =
            period === "annual" && t.annualMonthly
              ? `$${t.annualMonthly * 12} billed yearly`
              : t.note;
          return (
            <div className={`price ${t.popular ? "pop" : ""}`} key={t.name}>
              {t.popular ? <span className="pop-tag">Most popular</span> : null}
              <h3>{t.name}</h3>
              <div className="amt">
                {amount}
                {unit ? <span>{unit}</span> : null}
              </div>
              <p className="pd">{annualNote}</p>
              <ul>
                {t.features.map((f) => (
                  <li key={f}>
                    <Icon name="check" size={14} /> {f}
                  </li>
                ))}
              </ul>
              <Link
                className={`btn ${t.popular ? "primary" : ""} block`}
                href={t.href}
                style={{ marginTop: 20 }}
              >
                {t.cta}
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
