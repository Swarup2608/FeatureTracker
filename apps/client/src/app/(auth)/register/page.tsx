import type { Metadata } from "next";
import Link from "next/link";
import { EnterAppButton, AuthTabs } from "@/components/auth/AuthActions";

export const metadata: Metadata = { title: "Create account · FeatureTrack" };

export default function RegisterPage() {
  return (
    <>
      <AuthTabs active="register" />
      <h1>Create your account</h1>
      <p>Start tracking events in under two minutes. No credit card required.</p>

      <div className="field">
        <label>Full name</label>
        <input type="text" placeholder="Ada Lovelace" />
      </div>
      <div className="field">
        <label>Work email</label>
        <input type="email" placeholder="you@company.com" />
      </div>
      <div className="field">
        <label>Password</label>
        <input type="password" placeholder="At least 10 characters" />
        <div className="hint">Use 10+ characters with a number and a symbol.</div>
      </div>
      <EnterAppButton label="Create account" />
      <p className="alt">
        Already have an account? <Link href="/login">Sign in</Link>
      </p>
    </>
  );
}
