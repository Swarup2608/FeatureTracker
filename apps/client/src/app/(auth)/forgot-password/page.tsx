import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Reset password · FeatureTrack" };

export default function ForgotPasswordPage() {
  return (
    <>
      <h1>Reset your password</h1>
      <p>Enter the email on your account and we&apos;ll send a reset link.</p>
      <div className="field">
        <label>Work email</label>
        <input type="email" placeholder="you@company.com" />
      </div>
      <Link className="btn primary" href="/reset-password" style={{ display: "flex", justifyContent: "center", padding: 10, marginTop: 4 }}>
        Send reset link
      </Link>
      <p className="alt">
        <Link href="/login">← Back to sign in</Link>
      </p>
    </>
  );
}
