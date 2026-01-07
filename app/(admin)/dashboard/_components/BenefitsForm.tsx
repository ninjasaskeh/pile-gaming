"use client";

import type { SiteContent } from "@/lib/content";
import { JsonDataTable } from "./JsonDataTable";

type BenefitsContent = SiteContent["benefits"];

/** Legacy component kept for compatibility; now table-only. */
export function BenefitsForm({
  value,
  onChange,
  onSave,
  saving,
}: {
  value?: BenefitsContent;
  onChange: (v: BenefitsContent) => void;
  onSave: () => void;
  saving: boolean;
}) {
  return (
    <JsonDataTable
      title="Benefits"
      description="Table-only editor (JSON)."
      value={value as BenefitsContent}
      onChange={onChange}
      onSave={onSave}
      saving={saving}
    />
  );
}
