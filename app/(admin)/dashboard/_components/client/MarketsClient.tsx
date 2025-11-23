"use client";

import { MarketsForm } from "../MarketsForm";
import { SectionPageShell } from "../SectionPageShell";
import { useSectionContent } from "../useSectionContent";

export default function MarketsClient({ initial }: { initial: any }) {
  const manager = useSectionContent("markets", {
    initial,
    skipInitialFetch: true,
  });
  return (
    <SectionPageShell
      title="Markets"
      description="Update destinations and map markers for logistics coverage."
      manager={manager}
    >
      <MarketsForm
        value={manager.value}
        onChange={manager.setValue}
        onSave={() => void manager.save()}
        saving={manager.saving}
      />
    </SectionPageShell>
  );
}
