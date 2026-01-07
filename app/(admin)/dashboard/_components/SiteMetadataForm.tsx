"use client";

import type { SiteContent } from "@/lib/content";
import { JsonDataTable } from "./JsonDataTable";

type SiteMetadataContent = SiteContent["siteMetadata"];

/** Legacy component kept for compatibility; now table-only. */
export function SiteMetadataForm({
  value,
  onChange,
  onSave,
  saving,
}: {
  value?: SiteMetadataContent;
  onChange: (v: SiteMetadataContent) => void;
  onSave: () => void;
  saving: boolean;
}) {
  return (
    <JsonDataTable
      title="Site Metadata"
      description="Table-only editor (JSON)."
      value={value as SiteMetadataContent}
      onChange={onChange}
      onSave={onSave}
      saving={saving}
    />
  );
}
