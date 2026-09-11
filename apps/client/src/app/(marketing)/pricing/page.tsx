import type { Metadata } from "next";
import { PricingHeroBanner } from "@/components/marketing/PricingHeroBanner";
import { PricingTiers } from "@/components/marketing/PricingTiers";

export const metadata: Metadata = { title: "Pricing · FeatureTrack" };

export default function PricingPage() {
  return (
    <>
      <PricingHeroBanner />
      <section className="section mk-wrap" style={{ border: 0 }}>
        <div className="sh">
          <h2>Priced per event, not per seat</h2>
          <p>Invite the whole engineering org. You only pay for the volume you ingest.</p>
        </div>
        <PricingTiers />
        <div className="mk-trust pricing-trust">
          <span>NO CREDIT CARD REQUIRED</span>
          <span>CANCEL ANYTIME</span>
          <span>SOC 2 TYPE II</span>
          <span>SSO ON ENTERPRISE</span>
        </div>
      </section>
    </>
  );
}
