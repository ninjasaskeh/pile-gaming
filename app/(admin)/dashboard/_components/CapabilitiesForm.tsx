"use client";

import type { SiteContent } from "@/lib/content";
import { JsonDataTable } from "./JsonDataTable";

type CapabilitiesContent = SiteContent["capabilities"];

/** Legacy component kept for compatibility; now table-only. */
export function CapabilitiesForm({
  value,
  onChange,
  onSave,
  saving,
}: {
  value?: CapabilitiesContent;
  onChange: (v: CapabilitiesContent) => void;
  onSave: () => void;
  saving: boolean;
}) {
  return (
    <JsonDataTable
      title="Capabilities"
      description="Table-only editor (JSON)."
      value={value as CapabilitiesContent}
      onChange={onChange}
      onSave={onSave}
      saving={saving}
    />
  );
}
