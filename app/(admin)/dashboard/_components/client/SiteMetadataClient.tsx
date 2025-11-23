"use client";

import { SiteMetadataForm } from "../SiteMetadataForm";
import { SectionPageShell } from "../SectionPageShell";
import { useSectionContent } from "../useSectionContent";

export default function SiteMetadataClient({ initial }: { initial: any }) {
  const manager = useSectionContent("siteMetadata", {
    initial,
    skipInitialFetch: true,
  });
  return (
    <SectionPageShell
      title="Site Metadata"
      description="Control default SEO metadata like title, description, and OG image."
      manager={manager}
    >
      <SiteMetadataForm
        value={manager.value}
        onChange={manager.setValue}
        onSave={() => void manager.save()}
        saving={manager.saving}
      />
    </SectionPageShell>
  );
}
