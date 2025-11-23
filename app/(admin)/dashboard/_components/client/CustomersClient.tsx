"use client";

import { CustomersForm } from "../CustomersForm";
import { SectionPageShell } from "../SectionPageShell";
import { useSectionContent } from "../useSectionContent";

export default function CustomersClient({ initial }: { initial: any }) {
  const manager = useSectionContent("customers", {
    initial,
    skipInitialFetch: true,
  });
  return (
    <SectionPageShell
      title="Customers"
      description="Manage brand logos for the customers marquee."
      manager={manager}
    >
      <CustomersForm
        value={manager.value}
        onChange={manager.setValue}
        onSave={() => void manager.save()}
        saving={manager.saving}
      />
    </SectionPageShell>
  );
}
