"use client";

import * as React from "react";
import { toast } from "sonner";

import { SimpleDataTable, type SimpleRow } from "./SimpleDataTable";
import { objectToRows, rowsToObject } from "./jsonRows";

export function JsonDataTable<TValue>({
  title,
  description,
  value,
  onChange,
  onSave,
  saving,
}: {
  title: string;
  description?: string;
  value: TValue;
  onChange: (v: TValue) => void;
  onSave: () => Promise<void> | void;
  saving: boolean;
}) {
  const rows = React.useMemo<SimpleRow[]>(() => objectToRows(value), [value]);

  return (
    <SimpleDataTable
      title={title}
      description={
        description ??
        "Table-only editor. Values are auto-parsed (number/boolean/json) when possible."
      }
      rows={rows}
      onChange={(nextRows) => {
        try {
          const next = rowsToObject(nextRows, value) as TValue;
          onChange(next);
        } catch (e) {
          toast.error("Failed to apply changes");
        }
      }}
      onSave={onSave}
      saving={saving}
    />
  );
}
