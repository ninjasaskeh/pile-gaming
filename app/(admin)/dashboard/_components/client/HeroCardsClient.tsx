"use client";

import { SectionPageShell } from "../SectionPageShell";
import { useSectionContent } from "../useSectionContent";
import { JsonDataTable } from "../JsonDataTable";

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
      <JsonDataTable
        title="Hero Cards"
        description="Table-only editor (JSON)."
        value={manager.value}
        onChange={manager.setValue}
        onSave={() => manager.save()}
        saving={manager.saving}
      />
    </SectionPageShell>
  );
}
