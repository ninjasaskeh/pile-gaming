"use client";

import { SectionPageShell } from "../SectionPageShell";
import { useSectionContent } from "../useSectionContent";
import { JsonDataTable } from "../JsonDataTable";

export default function ContactClient({ initial }: { initial: any }) {
  const manager = useSectionContent("contact", {
    initial,
    skipInitialFetch: true,
  });

  return (
    <SectionPageShell
      title="Contact"
      description="Edit the contact details, form copy, and subject options."
      manager={manager}
    >
      <JsonDataTable
        title="Contact"
        description="Table-only editor (JSON)."
        value={manager.value}
        onChange={manager.setValue}
        onSave={() => manager.save()}
        saving={manager.saving}
      />
    </SectionPageShell>
  );
}
