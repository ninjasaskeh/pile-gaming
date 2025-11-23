import { getSection } from "../_actions/content";
import HeroClient from "../_components/client/HeroClient";

export const dynamic = "force-dynamic";

export default async function HeroSectionPage() {
  const initial = await getSection("hero");
  return <HeroClient initial={initial} />;
}
