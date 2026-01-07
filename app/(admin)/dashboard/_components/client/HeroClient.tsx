"use client";

import { SectionPageShell } from "../SectionPageShell";
import { useSectionContent } from "../useSectionContent";
import { CmsDataTable } from "../CmsDataTable";
import { rowsToSection, sectionToRows } from "../cmsTableAdapters";

export default function HeroClient({ initial }: { initial: any }) {
  const manager = useSectionContent("hero", {
    initial,
    skipInitialFetch: true,
  });

  return (
    <SectionPageShell
      title="Hero"
      description="Edit the main hero headline, supporting copy, and CTAs. (Table Editor)"
      manager={manager}
    >
      <CmsDataTable
        title="Hero"
        description="Edit fields in a table view."
        rows={sectionToRows("hero", manager.value)}
        onChange={(nextRows) =>
          manager.setValue(rowsToSection("hero", nextRows, manager.value))
        }
        onSave={() => manager.save()}
        saving={manager.saving}
      />
    </SectionPageShell>
  );
}
