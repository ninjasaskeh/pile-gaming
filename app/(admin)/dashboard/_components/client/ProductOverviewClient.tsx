"use client";

import { DragEvent, useState } from "react";
import { toast } from "sonner";

import { useSectionContent } from "../useSectionContent";
import { ItemsDataTable } from "../ItemsDataTable";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import type { ProductOverviewItem } from "@/lib/content";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { uploadFile } from "../upload";

export default function ProductOverviewClient({ initial }: { initial: any }) {
  const manager = useSectionContent("productOverview", {
    initial,
    skipInitialFetch: true,
  });

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingDraft, setEditingDraft] = useState<ProductOverviewItem | null>(
    null
  );
  const [isNew, setIsNew] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const closeEditor = () => {
    setEditingIndex(null);
    setEditingDraft(null);
    setIsNew(false);
    setIsPending(false);
    setIsUploading(false);
  };

  const applyEdit = async () => {
    if (isPending || isUploading) return;
    if (!editingDraft) return;

    setIsPending(true);

    const items = Array.isArray(manager.value?.items)
      ? [...manager.value.items]
      : [];

    if (isNew) {
      items.push(editingDraft);
    } else if (editingIndex != null) {
      items[editingIndex] = {
        ...(items[editingIndex] || {}),
        ...editingDraft,
      } as ProductOverviewItem;
    }

    const nextValue = { ...(manager.value || {}), items } as any;
    console.log("[ProductOverviewClient.applyEdit] nextValue", nextValue);
    manager.setValue(nextValue);

    try {
      await manager.save(nextValue);
      toast.success(isNew ? "Product item added" : "Product changes applied");
      closeEditor();
    } finally {
      setIsPending(false);
    }
  };

  const handleAdd = () => {
    setIsNew(true);
    setEditingIndex(null);
    setEditingDraft({
      title: "",
      code: "",
      category: "",
      description: "",
      specs: {},
      tags: [],
    });
  };

  const handleImageDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!e.dataTransfer.files?.length || !editingDraft || isUploading) return;

    const file = e.dataTransfer.files[0];
    setIsUploading(true);
    try {
      const url = await uploadFile(file);
      setEditingDraft({
        ...editingDraft,
        src: url,
      });
      toast.success("Image uploaded");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Upload failed";
      toast.error(message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingDraft || isUploading) return;

    setIsUploading(true);
    try {
      const url = await uploadFile(file);
      setEditingDraft({
        ...editingDraft,
        src: url,
      });
      toast.success("Image uploaded");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Upload failed";
      toast.error(message);
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  return (
    <>
      <ItemsDataTable
        title="Product Overview Items"
        description="One row per item with image and details dialog."
        data={manager.value?.items ?? []}
        getThumb={(it: any) => ({ src: it?.src, alt: it?.title })}
        filterKey="title"
        columns={
          [
            {
              accessorKey: "title",
              header: ({ column }: any) => (
                <Button
                  variant="ghost"
                  onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                  }
                >
                  Title
                  <ArrowUpDown />
                </Button>
              ),
              cell: ({ row }: any) => (
                <div className="capitalize">{row.getValue("title")}</div>
              ),
            },
            {
              accessorKey: "code",
              header: ({ column }: any) => (
                <Button
                  variant="ghost"
                  onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                  }
                >
                  Code
                  <ArrowUpDown />
                </Button>
              ),
              cell: ({ row }: any) => (
                <div className="lowercase">{row.getValue("code")}</div>
              ),
            },
            {
              accessorKey: "category",
              header: () => <div>Category</div>,
              cell: ({ row }: any) => (
                <div className="capitalize">{row.getValue("category")}</div>
              ),
            },
          ] as ColumnDef<any>[]
        }
        renderDetail={(it: any) => (
          <div className="grid gap-2">
            <div className="grid grid-cols-[140px_1fr] gap-2">
              <div className="text-muted-foreground">Title</div>
              <div>{it?.title ?? ""}</div>
            </div>
            <div className="grid grid-cols-[140px_1fr] gap-2">
              <div className="text-muted-foreground">Code</div>
              <div>{it?.code ?? ""}</div>
            </div>
            <div className="grid grid-cols-[140px_1fr] gap-2">
              <div className="text-muted-foreground">Category</div>
              <div>{it?.category ?? ""}</div>
            </div>
            {it?.description ? (
              <div className="grid grid-cols-[140px_1fr] gap-2">
                <div className="text-muted-foreground">Description</div>
                <div>{it.description}</div>
              </div>
            ) : null}
            {it?.specs ? (
              <div className="grid gap-1">
                <div className="text-sm font-medium">Specs</div>
                {Object.entries(it.specs).map(([k, v]: any) => (
                  <div key={k} className="grid grid-cols-[140px_1fr] gap-2">
                    <div className="text-muted-foreground">{k}</div>
                    <div>{String(v ?? "")}</div>
                  </div>
                ))}
              </div>
            ) : null}
            {Array.isArray(it?.tags) && it.tags.length ? (
              <div className="grid grid-cols-[140px_1fr] gap-2">
                <div className="text-muted-foreground">Tags</div>
                <div>{it.tags.join(", ")}</div>
              </div>
            ) : null}
          </div>
        )}
        onDelete={(_, index) => {
          if (isPending) return;

          const items = Array.isArray(manager.value?.items)
            ? [...manager.value.items]
            : [];
          items.splice(index, 1);
          const nextValue = { ...(manager.value || {}), items } as any;
          manager.setValue(nextValue);

          setIsPending(true);
          void (async () => {
            try {
              await manager.save(nextValue);
              toast.success("Product item deleted");
            } finally {
              setIsPending(false);
            }
          })();
        }}
        onEdit={(item, index) => {
          setIsNew(false);
          setEditingIndex(index);
          setEditingDraft(item as ProductOverviewItem);
        }}
        onSave={async () => {}}
        saving={false}
        primaryActionLabel="Add"
        primaryActionLoading={isPending}
        primaryActionLoadingLabel="Opening…"
        onPrimaryAction={handleAdd}
      />
      <Dialog open={!!editingDraft}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>{isNew ? "Add product" : "Edit product"}</DialogTitle>
            <DialogDescription>
              Update basic information, specs, and tags for this product.
              Changes are saved immediately when you apply them.
            </DialogDescription>
          </DialogHeader>
          {editingDraft ? (
            <div className="grid gap-4">
              <div className="grid grid-cols-[120px_1fr] items-start gap-2">
                <Label>Image</Label>
                <div className="grid gap-2">
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                    }}
                    onDrop={handleImageDrop}
                    className="flex flex-col items-center justify-center rounded-md border border-dashed border-muted-foreground/40 bg-muted/40 px-4 py-6 text-center text-xs text-muted-foreground"
                  >
                    <p className="mb-1 font-medium">Drag and drop image here</p>
                    <p>or click to select a file</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageInput}
                      className="mt-2 block text-xs"
                    />
                  </div>
                  {editingDraft.src ? (
                    <div className="text-xs text-muted-foreground break-all">
                      Current image: {editingDraft.src}
                    </div>
                  ) : null}
                  {isUploading ? (
                    <div className="text-xs text-muted-foreground">
                      Uploading image...
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                <Label htmlFor="po-title">Title</Label>
                <Input
                  id="po-title"
                  value={editingDraft.title ?? ""}
                  onChange={(e) =>
                    setEditingDraft({ ...editingDraft, title: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                <Label htmlFor="po-code">Code</Label>
                <Input
                  id="po-code"
                  value={editingDraft.code ?? ""}
                  onChange={(e) =>
                    setEditingDraft({ ...editingDraft, code: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                <Label htmlFor="po-category">Category</Label>
                <Input
                  id="po-category"
                  value={editingDraft.category ?? ""}
                  onChange={(e) =>
                    setEditingDraft({
                      ...editingDraft,
                      category: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-[120px_1fr] items-start gap-2">
                <Label htmlFor="po-description">Description</Label>
                <Textarea
                  id="po-description"
                  value={editingDraft.description ?? ""}
                  onChange={(e) =>
                    setEditingDraft({
                      ...editingDraft,
                      description: e.target.value,
                    })
                  }
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-[120px_1fr] items-start gap-2">
                <Label>Specs</Label>
                <div className="grid gap-2">
                  {(
                    [
                      "pileHeight",
                      "weight",
                      "composition",
                      "finish",
                      "color",
                    ] as const
                  ).map((key) => (
                    <div
                      key={key}
                      className="grid grid-cols-[100px_1fr] items-center gap-2"
                    >
                      <div className="text-xs text-muted-foreground">{key}</div>
                      <Input
                        value={editingDraft.specs?.[key] ?? ""}
                        onChange={(e) =>
                          setEditingDraft({
                            ...editingDraft,
                            specs: {
                              ...(editingDraft.specs || {}),
                              [key]: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-[120px_1fr] items-start gap-2">
                <Label htmlFor="po-tags">Tags</Label>
                <Input
                  id="po-tags"
                  placeholder="Comma-separated"
                  value={
                    Array.isArray(editingDraft.tags)
                      ? editingDraft.tags.join(", ")
                      : ""
                  }
                  onChange={(e) =>
                    setEditingDraft({
                      ...editingDraft,
                      tags: e.target.value
                        .split(",")
                        .map((t) => t.trim())
                        .filter(Boolean),
                    })
                  }
                />
              </div>
            </div>
          ) : null}
          <DialogFooter className="mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={closeEditor}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="button" onClick={applyEdit} disabled={isPending}>
              {isPending
                ? isNew
                  ? "Adding…"
                  : "Applying…"
                : isNew
                ? "Add"
                : "Apply changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
