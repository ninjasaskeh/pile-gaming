import { getAllSections } from "../(admin)/dashboard/_actions/content";
import { CmsClient } from "./CmsClient";

export const dynamic = "force-dynamic";

export default async function CmsPage() {
  const initial = await getAllSections();
  return <CmsClient initial={initial} />;
}
