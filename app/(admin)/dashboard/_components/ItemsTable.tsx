"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type ItemsTableColumn<T> = {
  header: string;
  render: (item: T) => React.ReactNode;
};

export function ItemsTable<T>({
  title,
  description,
  items,
  getThumb,
  columns,
  onSave,
  saving,
}: {
  title: string;
  description?: string;
  items: T[];
  getThumb?: (item: T) => { src?: string; alt?: string } | null;
  columns: Array<ItemsTableColumn<T>>;
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
              <TableHead className="w-[80px]">Image</TableHead>
              {columns.map((c) => (
                <TableHead key={c.header}>{c.header}</TableHead>
              ))}
              <TableHead className="w-[120px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items?.length ? (
              items.map((item, idx) => {
                const thumb = getThumb ? getThumb(item) : null;
                return (
                  <TableRow key={idx}>
                    <TableCell>
                      {thumb?.src ? (
                        <Image
                          src={thumb.src}
                          alt={thumb.alt ?? ""}
                          width={56}
                          height={56}
                          className="h-14 w-14 rounded object-cover"
                        />
                      ) : (
                        <div className="h-14 w-14 rounded bg-muted" />
                      )}
                    </TableCell>
                    {columns.map((c) => (
                      <TableCell key={c.header}>{c.render(item)}</TableCell>
                    ))}
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-lg">
                          <DialogHeader>
                            <DialogTitle>Item Details</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-3">
                            {thumb?.src ? (
                              <Image
                                src={thumb.src}
                                alt={thumb.alt ?? ""}
                                width={320}
                                height={180}
                                className="h-auto w-full rounded object-cover"
                              />
                            ) : null}
                            <pre className="max-h-[360px] overflow-auto rounded bg-muted p-3 text-xs">
                              {JSON.stringify(item, null, 2)}
                            </pre>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 2}
                  className="h-24 text-center"
                >
                  No items.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
