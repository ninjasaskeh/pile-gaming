"use client";

import type { SiteContent } from "@/lib/content";
import { JsonDataTable } from "./JsonDataTable";

type ProductOverviewContent = SiteContent["productOverview"];

/** Legacy component kept for compatibility; now table-only. */
export function ProductOverviewForm({
  value,
  onChange,
  onSave,
  saving,
}: {
  value?: ProductOverviewContent;
  onChange: (v: ProductOverviewContent) => void;
  onSave: () => void;
  saving: boolean;
}) {
  return (
    <JsonDataTable
      title="Product Overview"
      description="Table-only editor (JSON)."
      value={value as ProductOverviewContent}
      onChange={onChange}
      onSave={onSave}
      saving={saving}
    />
  );
}
