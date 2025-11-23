"use client";

import { ProductOverviewForm } from "../ProductOverviewForm";
import { SectionPageShell } from "../SectionPageShell";
import { useSectionContent } from "../useSectionContent";

export default function ProductOverviewClient({ initial }: { initial: any }) {
  const manager = useSectionContent("productOverview", {
    initial,
    skipInitialFetch: true,
  });
  return (
    <SectionPageShell
      title="Product Overview"
      description="Curate the carousel items and specs for product overview."
      manager={manager}
    >
      <ProductOverviewForm
        value={manager.value}
        onChange={manager.setValue}
        onSave={() => void manager.save()}
        saving={manager.saving}
      />
    </SectionPageShell>
  );
}
