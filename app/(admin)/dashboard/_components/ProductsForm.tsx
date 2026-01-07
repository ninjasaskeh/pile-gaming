"use client";

import type { SiteContent } from "@/lib/content";
import { JsonDataTable } from "./JsonDataTable";

type ProductsContent = SiteContent["products"];

/** Legacy component kept for compatibility; now table-only. */
export function ProductsForm({
  value,
  onChange,
  onSave,
  saving,
}: {
  value?: ProductsContent;
  onChange: (v: ProductsContent) => void;
  onSave: () => void;
  saving: boolean;
}) {
  return (
    <JsonDataTable
      title="Products"
      description="Table-only editor (JSON)."
      value={value as ProductsContent}
      onChange={onChange}
      onSave={onSave}
      saving={saving}
    />
  );
}
