"use client";

import { FaqForm } from "../FaqForm";
import { SectionPageShell } from "../SectionPageShell";
import { useSectionContent } from "../useSectionContent";

export default function FaqClient({ initial }: { initial: any }) {
  const manager = useSectionContent("faq", {
    initial,
    skipInitialFetch: true,
  });
  return (
    <SectionPageShell
      title="FAQ"
      description="Maintain the frequently asked questions shown on the site."
      manager={manager}
    >
      <FaqForm
        value={manager.value}
        onChange={manager.setValue}
        onSave={() => void manager.save()}
        saving={manager.saving}
      />
    </SectionPageShell>
  );
}
