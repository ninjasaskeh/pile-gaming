import { getSection } from "../_actions/content";
import SiteMetadataClient from "../_components/client/SiteMetadataClient";

export const dynamic = "force-dynamic";

export default async function SiteMetadataSectionPage() {
  const initial = await getSection("siteMetadata");
  return <SiteMetadataClient initial={initial} />;
}
