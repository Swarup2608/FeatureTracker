import type { Metadata } from "next";
import Link from "next/link";
import { EnterAppButton } from "@/components/auth/AuthActions";

export const metadata: Metadata = { title: "Set a new password · FeatureTrack" };

export default function ResetPasswordPage() {
  return (
    <>
      <h1>Check your inbox</h1>
      <p>We sent a reset link to your email. It expires in 30 minutes — set a new password below.</p>
      <div className="field">
        <label>New password</label>
        <input type="password" placeholder="New password" />
      </div>
      <div className="field">
        <label>Confirm new password</label>
        <input type="password" placeholder="Repeat new password" />
      </div>
      <EnterAppButton label="Set new password & sign in" />
      <p className="alt">
        <Link href="/login">← Back to sign in</Link>
      </p>
    </>
  );
}
