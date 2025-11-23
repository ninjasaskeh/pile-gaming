"use client";

import { CapabilitiesForm } from "../CapabilitiesForm";
import { SectionPageShell } from "../SectionPageShell";
import { useSectionContent } from "../useSectionContent";

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
      <CapabilitiesForm
        value={manager.value}
        onChange={manager.setValue}
        onSave={() => void manager.save()}
        saving={manager.saving}
      />
    </SectionPageShell>
  );
}
