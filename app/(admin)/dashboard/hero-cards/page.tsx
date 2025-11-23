import { getSection } from "../_actions/content";
import HeroCardsClient from "../_components/client/HeroCardsClient";

export const dynamic = "force-dynamic";

export default async function HeroCardsSectionPage() {
  const initial = await getSection("heroCards");
  return <HeroCardsClient initial={initial} />;
}
