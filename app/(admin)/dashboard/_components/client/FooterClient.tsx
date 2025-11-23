"use client";

import { FooterForm } from "../FooterForm";
import { SectionPageShell } from "../SectionPageShell";
import { useSectionContent } from "../useSectionContent";

export default function FooterClient({ initial }: { initial: any }) {
  const manager = useSectionContent("footer", {
    initial,
    skipInitialFetch: true,
  });
  return (
    <SectionPageShell
      title="Footer"
      description="Update company details and embedded map for the footer."
      manager={manager}
    >
      <FooterForm
        value={manager.value}
        onChange={manager.setValue}
        onSave={() => void manager.save()}
        saving={manager.saving}
      />
    </SectionPageShell>
  );
}
