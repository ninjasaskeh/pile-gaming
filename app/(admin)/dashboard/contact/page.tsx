import { getSection } from "../_actions/content";
import ContactClient from "../_components/client/ContactClient";

export const dynamic = "force-dynamic";

export default async function ContactSectionPage() {
  const initial = await getSection("contact");
  return <ContactClient initial={initial} />;
}
