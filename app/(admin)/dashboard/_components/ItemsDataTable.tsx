"use client";

import * as React from "react";
import Image from "next/image";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function ItemsDataTable({
  title,
  description,
  data,
  columns,
  getThumb,
  filterKey,
  onSave,
  saving,
  onDelete,
  onEdit,
  renderDetail,
  primaryActionLabel,
  onPrimaryAction,
  primaryActionLoading,
  primaryActionLoadingLabel,
}: {
  title: string;
  description?: string;
  data: any[];
  columns: ColumnDef<any>[];
  getThumb?: (item: any) => { src?: string; alt?: string } | null;
  filterKey?: string;
  onSave: () => Promise<void> | void;
  saving: boolean;
  onDelete?: (item: any, index: number) => void;
  onEdit?: (item: any, index: number) => void;
  renderDetail?: (item: any) => React.ReactNode;
  /** Optional custom primary action (e.g. "Add") instead of default "Save". */
  primaryActionLabel?: string;
  onPrimaryAction?: () => Promise<void> | void;
  primaryActionLoading?: boolean;
  primaryActionLoadingLabel?: string;
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [detailItem, setDetailItem] = React.useState<any | null>(null);

  const actionLabel = primaryActionLabel ?? "Save";
  const actionLoadingLabel = primaryActionLoadingLabel ?? "Saving…";
  const actionLoading = primaryActionLoading ?? saving;
  const hasAction = Boolean(onPrimaryAction || onSave);

  const imageColumn: ColumnDef<any> = {
    id: "image",
    header: "Image",
    cell: ({ row }) => {
      const item = row.original;
      const thumb = getThumb ? getThumb(item) : null;
      return thumb?.src ? (
        <Image
          src={thumb.src}
          alt={thumb.alt ?? ""}
          width={56}
          height={56}
          className="h-14 w-14 rounded object-cover"
        />
      ) : (
        <div className="h-14 w-14 rounded bg-muted" />
      );
    },
    enableSorting: false,
    enableHiding: false,
  };

  const actionsColumn: ColumnDef<any> = {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const item = row.original;
      const idx = row.index;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                onEdit?.(item, idx);
              }}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive"
              onSelect={(e) => {
                e.preventDefault();
                onDelete?.(item, idx);
              }}
            >
              Delete
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                setDetailItem(item);
              }}
            >
              View details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  };

  const selectColumn: ColumnDef<any> = {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  };

  const composedColumns: ColumnDef<any>[] = [
    selectColumn,
    // Only show image column when items have images
    ...(getThumb && data?.some((it) => Boolean(getThumb(it)?.src))
      ? [imageColumn]
      : []),
    ...columns,
    actionsColumn,
  ];

  const table = useReactTable({
    data,
    columns: composedColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-start justify-between gap-4 py-2">
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          {description ? (
            <p className="text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
        {hasAction ? (
          <Button
            type="button"
            onClick={() =>
              void (onPrimaryAction ? onPrimaryAction() : onSave())
            }
            disabled={actionLoading}
          >
            {actionLoading ? actionLoadingLabel : actionLabel}
          </Button>
        ) : null}
      </div>

      <div className="flex items-center py-3">
        {filterKey ? (
          <Input
            placeholder={`Filter ${filterKey}...`}
            value={
              (table.getColumn(filterKey)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn(filterKey)?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        ) : null}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={composedColumns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
      {detailItem ? (
        <Dialog
          open={!!detailItem}
          onOpenChange={(open) => {
            if (!open) setDetailItem(null);
          }}
        >
          <DialogContent className="sm:max-w-lg">
            <DialogHeader className="flex items-center justify-between gap-2">
              <DialogTitle>Item Details</DialogTitle>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                >
                  <span className="sr-only">Close</span>×
                </Button>
              </DialogClose>
            </DialogHeader>
            <div className="grid gap-3">
              {(() => {
                const thumb = getThumb ? getThumb(detailItem) : null;
                return thumb?.src ? (
                  <Image
                    src={thumb.src}
                    alt={thumb.alt ?? ""}
                    width={320}
                    height={180}
                    className="h-auto w-full rounded object-cover"
                  />
                ) : null;
              })()}
              {renderDetail ? (
                <div className="grid gap-2 text-sm">
                  {renderDetail(detailItem)}
                </div>
              ) : (
                <div className="grid gap-2 text-sm">
                  {Object.entries(detailItem || {}).map(([k, v]) => (
                    <div
                      key={k}
                      className="grid grid-cols-[140px_1fr] items-start gap-2"
                    >
                      <div className="text-muted-foreground">{k}</div>
                      <div>
                        {typeof v === "object" && v != null
                          ? Array.isArray(v)
                            ? (v as any[]).join(", ")
                            : Object.entries(v as Record<string, any>).map(
                                ([sk, sv]) => (
                                  <div
                                    key={sk}
                                    className="grid grid-cols-[120px_1fr] gap-2"
                                  >
                                    <div className="text-muted-foreground">
                                      {sk}
                                    </div>
                                    <div>{String(sv ?? "")}</div>
                                  </div>
                                )
                              )
                          : String(v ?? "")}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      ) : null}
    </div>
  );
}
