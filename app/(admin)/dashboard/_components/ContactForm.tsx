"use client";

import type { SiteContent } from "@/lib/content";
import { JsonDataTable } from "./JsonDataTable";

type ContactContent = SiteContent["contact"];

/** Legacy component kept for compatibility; now table-only. */
export function ContactForm({
  value,
  onChange,
  onSave,
  saving,
}: {
  value?: ContactContent;
  onChange: (v: ContactContent) => void;
  onSave: () => void;
  saving: boolean;
}) {
  return (
    <JsonDataTable
      title="Contact"
      description="Table-only editor (JSON)."
      value={value as ContactContent}
      onChange={onChange}
      onSave={onSave}
      saving={saving}
    />
  );
}
