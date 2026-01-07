"use client";

import type { CustomersContent } from "@/lib/content";
import { CmsDataTable } from "./CmsDataTable";
import { rowsToSection, sectionToRows } from "./cmsTableAdapters";

/**
 * Legacy component kept for compatibility.
 * It now renders a table-only editor to enforce the new CMS UI.
 */
export function CustomersForm({
  value,
  onChange,
  onSave,
  saving,
}: {
  value?: CustomersContent;
  onChange: (v: CustomersContent) => void;
  onSave: () => void;
  saving: boolean;
}) {
  const prev = (value ?? ({ header: {}, logos: [] } as CustomersContent)) as CustomersContent;
  const rows = sectionToRows("customers", prev);

  return (
    <CmsDataTable
      title="Customers"
      description="Header fields + logo rows. For logo rows, use: src | alt"
      rows={rows}
      onChange={(nextRows) => {
        onChange(rowsToSection("customers", nextRows, prev) as CustomersContent);
      }}
      onSave={onSave}
      saving={saving}
    />
  );
}
