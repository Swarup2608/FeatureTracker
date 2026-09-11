import "./marketing.css";
import { SiteNav } from "@/components/marketing/SiteNav";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mk">
      <div className="mk-wrap">
        <SiteNav />
      </div>
      {children}
    </div>
  );
}
