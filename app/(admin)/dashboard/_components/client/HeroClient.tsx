"use client";

import { HeroForm } from "../HeroForm";
import { SectionPageShell } from "../SectionPageShell";
import { useSectionContent } from "../useSectionContent";

export default function HeroClient({ initial }: { initial: any }) {
  const manager = useSectionContent("hero", {
    initial,
    skipInitialFetch: true,
  });
  return (
    <SectionPageShell
      title="Hero"
      description="Edit the main hero headline, supporting copy, and CTAs."
      manager={manager}
    >
      <HeroForm
        value={manager.value}
        onChange={manager.setValue}
        onSave={() => {
          void manager.save();
        }}
        saving={manager.saving}
      />
    </SectionPageShell>
  );
}
