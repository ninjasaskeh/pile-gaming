"use client";

import { HeroCardsForm } from "../HeroCardsForm";
import { SectionPageShell } from "../SectionPageShell";
import { useSectionContent } from "../useSectionContent";

export default function HeroCardsClient({ initial }: { initial: any }) {
  const manager = useSectionContent("heroCards", {
    initial,
    skipInitialFetch: true,
  });
  return (
    <SectionPageShell
      title="Hero Cards"
      description="Manage the highlight cards displayed beside the hero."
      manager={manager}
    >
      <HeroCardsForm
        value={manager.value}
        onChange={manager.setValue}
        onSave={() => void manager.save()}
        saving={manager.saving}
      />
    </SectionPageShell>
  );
}
