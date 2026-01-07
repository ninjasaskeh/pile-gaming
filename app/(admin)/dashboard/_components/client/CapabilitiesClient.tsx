"use client";

import { SectionPageShell } from "../SectionPageShell";
import { useSectionContent } from "../useSectionContent";
import { JsonDataTable } from "../JsonDataTable";

export default function CapabilitiesClient({ initial }: { initial: any }) {
  const manager = useSectionContent("capabilities", {
    initial,
    skipInitialFetch: true,
  });

  return (
    <SectionPageShell
      title="Capabilities"
      description="Control the capability grid copy and icons."
      manager={manager}
    >
      <JsonDataTable
        title="Capabilities"
        description="Table-only editor (JSON)."
        value={manager.value}
        onChange={manager.setValue}
        onSave={() => manager.save()}
        saving={manager.saving}
      />
    </SectionPageShell>
  );
}
