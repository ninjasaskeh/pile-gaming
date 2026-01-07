"use client";

import type { SiteContent } from "@/lib/content";
import { JsonDataTable } from "./JsonDataTable";

type FooterContent = SiteContent["footer"];

/** Legacy component kept for compatibility; now table-only. */
export function FooterForm({
  value,
  onChange,
  onSave,
  saving,
}: {
  value?: FooterContent;
  onChange: (v: FooterContent) => void;
  onSave: () => void;
  saving: boolean;
}) {
  return (
    <JsonDataTable
      title="Footer"
      description="Table-only editor (JSON)."
      value={value as FooterContent}
      onChange={onChange}
      onSave={onSave}
      saving={saving}
    />
  );
}
