import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { EnterAppButton, AuthTabs } from "@/components/auth/AuthActions";

export const metadata: Metadata = { title: "Sign in · FeatureTrack" };

export default function LoginPage() {
  return (
    <>
      <AuthTabs active="login" />
      <h1>Welcome back</h1>
      <p>Sign in to the Corewave workspace.</p>

      <div className="oauth">
        <button className="btn">
          <Icon name="google" size={14} filled /> Google
        </button>
        <button className="btn">
          <Icon name="github" size={14} filled /> GitHub
        </button>
      </div>
      <div className="divider">or continue with email</div>

      <div className="field">
        <label>Work email</label>
        <input type="email" defaultValue="priya@corewave.io" autoComplete="username" />
      </div>
      <div className="field">
        <label>Password</label>
        <input type="password" defaultValue="············" autoComplete="current-password" />
        <div className="hint">
          <Link href="/forgot-password" style={{ color: "var(--accent-strong)", fontWeight: 600 }}>
            Forgot password?
          </Link>
        </div>
      </div>
      <EnterAppButton label="Sign in" icon />
      <p className="alt">
        New to FeatureTrack? <Link href="/register">Create an account</Link>
      </p>
    </>
  );
}
