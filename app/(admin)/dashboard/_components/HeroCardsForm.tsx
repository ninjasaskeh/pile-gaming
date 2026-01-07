"use client";

import type { SiteContent } from "@/lib/content";
import { JsonDataTable } from "./JsonDataTable";

type HeroCardsContent = SiteContent["heroCards"];

/** Legacy component kept for compatibility; now table-only. */
export function HeroCardsForm({
  value,
  onChange,
  onSave,
  saving,
}: {
  value?: HeroCardsContent;
  onChange: (v: HeroCardsContent) => void;
  onSave: () => void;
  saving: boolean;
}) {
  return (
    <JsonDataTable
      title="Hero Cards"
      description="Table-only editor (JSON)."
      value={value as HeroCardsContent}
      onChange={onChange}
      onSave={onSave}
      saving={saving}
    />
  );
}
