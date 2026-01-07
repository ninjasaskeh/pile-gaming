"use client";

import * as React from "react";

import { SimpleDataTable, type SimpleRow } from "./SimpleDataTable";

export type CmsTableRow = {
  id: string;
  label: string;
  value: string;
};

export function CmsDataTable({
  title,
  description,
  rows,
  onChange,
  onSave,
  saving,
  hideSave,
}: {
  title: string;
  description?: string;
  rows: CmsTableRow[];
  onChange: (rows: CmsTableRow[]) => void;
  onSave: () => Promise<void> | void;
  saving: boolean;
  hideSave?: boolean;
}) {
  const simpleRows: SimpleRow[] = React.useMemo(
    () =>
      rows.map((r) => ({
        id: r.id,
        keyPath: r.label,
        value: r.value,
        kind: "string" as const,
      })),
    [rows]
  );

  return (
    <SimpleDataTable
      title={title}
      description={description}
      rows={simpleRows}
      onChange={(next) => {
        onChange(
          next.map((r) => ({
            id: r.id,
            label: r.keyPath,
            value: r.value,
          }))
        );
      }}
      onSave={hideSave ? () => {} : onSave}
      saving={hideSave ? false : saving}
    />
  );
}
