import { getSection } from "../_actions/content";
import FooterClient from "../_components/client/FooterClient";

export const dynamic = "force-dynamic";

export default async function FooterSectionPage() {
  const initial = await getSection("footer");
  return <FooterClient initial={initial} />;
}
