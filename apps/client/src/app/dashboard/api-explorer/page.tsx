import type { Metadata } from "next";
import { PageHead } from "@/components/ui/bits";
import { ApiExplorer } from "@/components/ApiExplorer";

export const metadata: Metadata = { title: "API Explorer · FeatureTrack" };

export default function ApiExplorerPage() {
  return (
    <>
      <PageHead
        title="API Explorer"
        sub="Send authenticated requests against the Corewave Web project without leaving the console."
      />
      <ApiExplorer />
    </>
  );
}
