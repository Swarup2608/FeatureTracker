import Link from "next/link";
import { HeroAtomicCanvas } from "@/components/marketing/HeroAtomicCanvas";

export function PricingHeroBanner() {
  return (
    <section className="mk-pricing-hero">
      <HeroAtomicCanvas centerX={0.5} centerY={0.42} />
      <div className="overlay" />
      <div className="mk-wrap">
        <h1>Pricing that scales with your product</h1>
        <p>
          Every plan ships the full event pipeline, adoption dashboards and
          live streaming — the only thing that changes is scale.
        </p>
        <Link className="mk-btn solid lg" href="/register">
          Get started free
        </Link>
      </div>
    </section>
  );
}
