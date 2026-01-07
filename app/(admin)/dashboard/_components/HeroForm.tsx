"use client";

import * as React from "react";
import type { HeroContent } from "@/lib/content";
import { CmsDataTable } from "./CmsDataTable";
import { rowsToSection, sectionToRows } from "./cmsTableAdapters";

/**
 * Legacy component kept for compatibility.
 * It now renders a table-only editor to enforce the new CMS UI.
 */
export function HeroForm({
  value,
  onChange,
  onSave,
  saving,
}: {
  value?: HeroContent;
  onChange: (v: HeroContent) => void;
  onSave: () => void;
  saving: boolean;
}) {
  const prev: HeroContent =
    value ??
    ({
      title: "",
      subtitle: "",
      description: "",
      primaryCtaText: "",
      primaryCtaHref: "",
      secondaryCtaText: "",
      secondaryCtaHref: "",
      imageUrl: "",
    } satisfies HeroContent);

  const rows = sectionToRows("hero", prev);

  return (
    <CmsDataTable
      title="Hero"
      description="MIGRATED: TABLE-ONLY (if you see this text, server uses updated code)"
      rows={rows}
      onChange={(nextRows) => {
        onChange(rowsToSection("hero", nextRows, prev));
      }}
      onSave={onSave}
      saving={saving}
    />
  );
}
