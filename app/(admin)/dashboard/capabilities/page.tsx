import { getSection } from "../_actions/content";
import CapabilitiesClient from "../_components/client/CapabilitiesClient";

export const dynamic = "force-dynamic";

export default async function CapabilitiesSectionPage() {
  const initial = await getSection("capabilities");
  return <CapabilitiesClient initial={initial} />;
}
