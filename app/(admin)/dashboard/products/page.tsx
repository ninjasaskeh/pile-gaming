import { getSection } from "../_actions/content";
import ProductsClient from "../_components/client/ProductsClient";

export const dynamic = "force-dynamic";

export default async function ProductsSectionPage() {
  const initial = await getSection("products");
  return <ProductsClient initial={initial} />;
}
