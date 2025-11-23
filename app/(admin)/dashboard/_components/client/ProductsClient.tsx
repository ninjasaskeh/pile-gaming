"use client";

import { ProductsForm } from "../ProductsForm";
import { SectionPageShell } from "../SectionPageShell";
import { useSectionContent } from "../useSectionContent";

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
      <ProductsForm
        value={manager.value}
        onChange={manager.setValue}
        onSave={() => void manager.save()}
        saving={manager.saving}
      />
    </SectionPageShell>
  );
}
