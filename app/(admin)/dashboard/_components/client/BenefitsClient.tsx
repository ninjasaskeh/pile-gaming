"use client";

import { BenefitsForm } from "../BenefitsForm";
import { SectionPageShell } from "../SectionPageShell";
import { useSectionContent } from "../useSectionContent";

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
      <BenefitsForm
        value={manager.value}
        onChange={manager.setValue}
        onSave={() => void manager.save()}
        saving={manager.saving}
      />
    </SectionPageShell>
  );
}
