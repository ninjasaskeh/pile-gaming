"use client";

import type { SiteContent } from "@/lib/content";
import { JsonDataTable } from "./JsonDataTable";

type FaqContent = SiteContent["faq"];

/** Legacy component kept for compatibility; now table-only. */
export function FaqForm({
  value,
  onChange,
  onSave,
  saving,
}: {
  value?: FaqContent;
  onChange: (v: FaqContent) => void;
  onSave: () => void;
  saving: boolean;
}) {
  return (
    <JsonDataTable
      title="FAQ"
      description="Table-only editor (JSON)."
      value={value as FaqContent}
      onChange={onChange}
      onSave={onSave}
      saving={saving}
    />
  );
}
