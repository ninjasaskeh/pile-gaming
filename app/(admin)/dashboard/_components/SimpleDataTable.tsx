"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type SimpleRow = {
  id: string;
  keyPath: string;
  value: string;
  kind?: "string" | "number" | "boolean" | "json";
};

export function SimpleDataTable({
  title,
  description,
  rows,
  onChange,
  onSave,
  saving,
}: {
  title: string;
  description?: string;
  rows: SimpleRow[];
  onChange: (rows: SimpleRow[]) => void;
  onSave: () => Promise<void> | void;
  saving: boolean;
}) {
  return (
    <div className="grid gap-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          {description ? (
            <p className="text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
        <Button type="button" onClick={() => void onSave()} disabled={saving}>
          {saving ? "Saving…" : "Save"}
        </Button>
      </div>

      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[320px]">Field</TableHead>
              <TableHead>Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length ? (
              rows.map((row) => {
                const isLong =
                  row.kind === "json" ||
                  (row.value?.length ?? 0) > 80 ||
                  row.value.includes("\n");
                const Comp: any = isLong ? Textarea : Input;
                return (
                  <TableRow key={row.id}>
                    <TableCell className="font-mono text-xs">
                      {row.keyPath}
                    </TableCell>
                    <TableCell>
                      <Comp
                        value={row.value}
                        rows={isLong ? 4 : undefined}
                        onChange={(e: React.ChangeEvent<
                          HTMLInputElement | HTMLTextAreaElement
                        >) => {
                          onChange(
                            rows.map((r) =>
                              r.id === row.id
                                ? { ...r, value: e.target.value }
                                : r
                            )
                          );
                        }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={2} className="h-24 text-center">
                  No fields.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

