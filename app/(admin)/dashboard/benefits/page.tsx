import { getSection } from "../_actions/content";
import BenefitsClient from "../_components/client/BenefitsClient";

export const dynamic = "force-dynamic";

export default async function BenefitsSectionPage() {
  const initial = await getSection("benefits");
  // Render a Client wrapper that uses the existing hook with initial server data
  return <BenefitsClient initial={initial} />;
}

// The ClientBenefits function has been removed as it is replaced by BenefitsClient.
