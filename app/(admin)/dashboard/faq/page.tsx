import { getSection } from "../_actions/content";
import FaqClient from "../_components/client/FaqClient";

export const dynamic = "force-dynamic";

export default async function FaqSectionPage() {
  const initial = await getSection("faq");
  return <FaqClient initial={initial} />;
}
