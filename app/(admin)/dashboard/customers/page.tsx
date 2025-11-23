import { getSection } from "../_actions/content";
import CustomersClient from "../_components/client/CustomersClient";

export const dynamic = "force-dynamic";

export default async function CustomersSectionPage() {
  const initial = await getSection("customers");
  return <CustomersClient initial={initial} />;
}
