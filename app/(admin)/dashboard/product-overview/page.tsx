import { getSection } from "../_actions/content";
import ProductOverviewClient from "../_components/client/ProductOverviewClient";

export const dynamic = "force-dynamic";

export default async function ProductOverviewSectionPage() {
  const initial = await getSection("productOverview");
  return <ProductOverviewClient initial={initial} />;
}
