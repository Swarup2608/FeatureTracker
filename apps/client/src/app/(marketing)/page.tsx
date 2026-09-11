import Link from "next/link";
import { HeroTerminal } from "@/components/marketing/HeroTerminal";
import { HeroAtomicCanvas } from "@/components/marketing/HeroAtomicCanvas";

const LOGOS = [
  "Northwind",
  "Orbital",
  "Kernelworks",
  "Apollo",
  "Bletchley",
  "Compilers Inc",
];

const PILLARS: { no: string; title: string; body: string; bars: number[] }[] = [
  {
    no: "01",
    title: "Event pipeline",
    body: "Ingest 200k events a second with idempotent retries and schema drift warnings.",
    bars: [34, 48, 41, 62, 55, 71, 66, 84, 78, 91, 86, 97],
  },
  {
    no: "02",
    title: "Feature adoption",
    body: "Every event carries a feature key, so adoption curves build themselves.",
    bars: [18, 24, 31, 29, 44, 52, 61, 58, 72, 79, 88, 94],
  },
  {
    no: "03",
    title: "Live stream",
    body: "Tail production like a log file, filtered by user, flag or environment.",
    bars: [62, 40, 74, 52, 88, 46, 70, 58, 82, 44, 76, 64],
  },
];

const FIG_STATS: [string, string][] = [
  ["84ms", "p95 ingest latency"],
  ["2.4T", "events per year"],
  ["99.99%", "ingest uptime"],
  ["11", "first-party SDKs"],
];

export default function LandingPage() {
  return (
    <>
      <section className="mk-hero">
        <HeroAtomicCanvas />
        <div className="mk-wrap">
          <div className="mk-rise">
            <div className="mk-eyebrow">
              <i /> Event + feature telemetry
            </div>
            <h1>
              Ship the feature.
              <br />
              Watch it land.
            </h1>
            <p className="lede">
              One SDK call, and FeatureTrack tells you who used the feature, how
              often, and what broke — event streams and adoption curves in the
              same view.
            </p>
            <div className="cta">
              <Link className="mk-btn solid lg" href="/register">
                Create free project
              </Link>
              <Link className="mk-btn lg" href="/dashboard">
                Open live demo →
              </Link>
            </div>
            <div className="mk-trust">
              <span>2.4 TRILLION EVENTS/YR</span>
              <span>SOC 2 TYPE II</span>
              <span>99.99% UPTIME</span>
            </div>
          </div>
          <HeroTerminal />
        </div>
      </section>

      <div className="mk-wrap">
        <div className="mk-logos">
          <span>Instrumented by</span>
          {LOGOS.map((l) => (
            <b key={l}>{l}</b>
          ))}
        </div>
      </div>

      <section className="mk-section">
        <div className="mk-wrap">
          <div className="head">
            <h2>Three surfaces, one pipeline</h2>
            <span className="idx">01 — 03</span>
          </div>
          <div className="mk-pillars">
            {PILLARS.map((p) => {
              const max = Math.max(...p.bars);
              return (
                <div className="mk-pillar" key={p.no}>
                  <div className="no">{p.no}</div>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                  <div className="spark">
                    {p.bars.map((b, i) => (
                      <i
                        key={i}
                        style={{
                          height: `${(b / max) * 100}%`,
                          animationDelay: `${i * 0.03}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mk-section">
        <div className="mk-wrap">
          <div className="mk-fig">
            <span className="corner tl" />
            <span className="corner br" />
            <div className="plate-head">
              <span>FIG. 01 — ADOPTION CONSOLE</span>
              <span>1440 × 900</span>
            </div>
            <div className="screen">
              <div>
                <div className="tag">[ PRODUCT SCREENSHOT ]</div>
                <Link href="/dashboard">open the real console →</Link>
              </div>
            </div>
          </div>
          <div className="mk-fig-stats">
            {FIG_STATS.map(([v, l]) => (
              <div key={l}>
                <div className="v">{v}</div>
                <div className="l">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mk-cta">
        <h2>Instrument your next release today</h2>
        <p>Free for 1M events a month. No card, no sales call.</p>
        <Link
          className="mk-btn solid lg"
          href="/register"
          style={{ display: "inline-flex" }}
        >
          Start free
        </Link>
      </section>

      <div className="mk-wrap">
        <div className="mk-foot">
          <span>FEATURETRACK © 2026</span>
          <Link href="/docs">Docs</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/docs">Status</Link>
          <Link href="/docs">Security</Link>
        </div>
      </div>
    </>
  );
}
