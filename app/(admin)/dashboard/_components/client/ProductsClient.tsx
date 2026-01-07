"use client";

import { SectionPageShell } from "../SectionPageShell";
import { useSectionContent } from "../useSectionContent";
import { JsonDataTable } from "../JsonDataTable";

export default function ProductsClient({ initial }: { initial: any }) {
  const manager = useSectionContent("products", {
    initial,
    skipInitialFetch: true,
  });

  return (
    <SectionPageShell
      title="Products"
      description="Manage product cards shown in the catalog section."
      manager={manager}
    >
      <JsonDataTable
        title="Products"
        description="Table-only editor (JSON)."
        value={manager.value}
        onChange={manager.setValue}
        onSave={() => manager.save()}
        saving={manager.saving}
      />
    </SectionPageShell>
  );
}
