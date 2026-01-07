"use client";

import type { SiteContent } from "@/lib/content";
import { JsonDataTable } from "./JsonDataTable";

type MarketsContent = SiteContent["markets"];

/** Legacy component kept for compatibility; now table-only. */
export function MarketsForm({
  value,
  onChange,
  onSave,
  saving,
}: {
  value?: MarketsContent;
  onChange: (v: MarketsContent) => void;
  onSave: () => void;
  saving: boolean;
}) {
  return (
    <JsonDataTable
      title="Markets"
      description="Table-only editor (JSON)."
      value={value as MarketsContent}
      onChange={onChange}
      onSave={onSave}
      saving={saving}
    />
  );
}
