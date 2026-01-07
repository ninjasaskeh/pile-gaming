"use client";

import type { SectionHeader as SectionHeaderType, SiteContent } from "@/lib/content";
import { CmsDataTable } from "./CmsDataTable";

type SectionKey = Exclude<keyof SiteContent, "hero">;

/**
 * Legacy component kept for compatibility.
 * It now renders a table-only editor.
 */
export function SectionHeaderForm({
  title,
  sectionKey,
  value,
  onChange,
  onSave,
  saving,
}: {
  title: string;
  sectionKey: SectionKey;
  value?: SectionHeaderType;
  onChange: (v: SectionHeaderType) => void;
  onSave: () => void;
  saving: boolean;
  token?: string;
}) {
  const v = value || ({} as SectionHeaderType);
  const rows = [
    { id: "kicker", label: "kicker", value: v.kicker ?? "" },
    { id: "title", label: "title", value: v.title ?? "" },
    { id: "subtitle", label: "subtitle", value: v.subtitle ?? "" },
    { id: "imageUrl", label: "imageUrl", value: (v as any).imageUrl ?? "" },
  ];

  return (
    <CmsDataTable
      title={title}
      description={`Table-only editor for ${sectionKey}.`}
      rows={rows}
      onChange={(nextRows) => {
        const get = (label: string) => nextRows.find((r) => r.label === label)?.value;
        onChange({
          ...v,
          kicker: get("kicker") ?? v.kicker,
          title: get("title") ?? v.title,
          subtitle: get("subtitle") ?? v.subtitle,
          imageUrl: get("imageUrl") ?? (v as any).imageUrl,
        } as any);
      }}
      onSave={onSave}
      saving={saving}
    />
  );
}
