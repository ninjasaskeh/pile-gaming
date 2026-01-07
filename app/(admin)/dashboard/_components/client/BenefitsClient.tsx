"use client";

import { SectionPageShell } from "../SectionPageShell";
import { useSectionContent } from "../useSectionContent";
import { JsonDataTable } from "../JsonDataTable";

export default function BenefitsClient({ initial }: { initial: any }) {
  const manager = useSectionContent("benefits", {
    initial,
    skipInitialFetch: true,
  });

  return (
    <SectionPageShell
      title="Benefits"
      description="Update the benefits section messaging and items."
      manager={manager}
    >
      <JsonDataTable
        title="Benefits"
        description="Table-only editor (JSON)."
        value={manager.value}
        onChange={manager.setValue}
        onSave={() => manager.save()}
        saving={manager.saving}
      />
    </SectionPageShell>
  );
}
