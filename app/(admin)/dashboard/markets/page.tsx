import { getSection } from "../_actions/content";
import MarketsClient from "../_components/client/MarketsClient";

export const dynamic = "force-dynamic";

export default async function MarketsSectionPage() {
  const initial = await getSection("markets");
  return <MarketsClient initial={initial} />;
}
