"use client";

import { useState } from "react";
import { toast } from "sonner";

import { useSectionContent } from "../useSectionContent";
import { ItemsDataTable } from "../ItemsDataTable";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type LogoDraft = { src: string; alt: string };

export default function CustomersClient({ initial }: { initial: any }) {
  const manager = useSectionContent("customers", {
    initial,
    skipInitialFetch: true,
  });

  const [isPending, setIsPending] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingDraft, setEditingDraft] = useState<LogoDraft | null>(null);
  const [isNew, setIsNew] = useState(false);

  const handleDeleteLogo = async (index: number) => {
    if (isPending) return;

    const logos = Array.isArray(manager.value?.logos)
      ? [...manager.value.logos]
      : [];
    logos.splice(index, 1);
    const nextValue = { ...(manager.value || {}), logos } as any;
    manager.setValue(nextValue);

    setIsPending(true);
    try {
      await manager.save(nextValue);
      toast.success("Customer logo deleted");
    } finally {
      setIsPending(false);
    }
  };

  const openNewLogo = () => {
    setIsNew(true);
    setEditingIndex(null);
    setEditingDraft({ src: "", alt: "" });
  };

  const openEditLogo = (logo: any, index: number) => {
    setIsNew(false);
    setEditingIndex(index);
    setEditingDraft({ src: logo?.src ?? "", alt: logo?.alt ?? "" });
  };

  const closeEditor = () => {
    setEditingIndex(null);
    setEditingDraft(null);
    setIsNew(false);
  };

  const applyEdit = async () => {
    if (isPending || !editingDraft) return;

    const logos = Array.isArray(manager.value?.logos)
      ? [...manager.value.logos]
      : [];

    if (isNew) {
      logos.push(editingDraft);
    } else if (editingIndex != null) {
      logos[editingIndex] = {
        ...(logos[editingIndex] || {}),
        ...editingDraft,
      } as any;
    }

    const nextValue = { ...(manager.value || {}), logos } as any;
    manager.setValue(nextValue);

    setIsPending(true);
    try {
      await manager.save(nextValue);
      toast.success(isNew ? "Customer logo added" : "Customer logo updated");
      closeEditor();
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <ItemsDataTable
        title="Customer Logos"
        description="One row per logo with image and details dialog."
        data={manager.value?.logos ?? []}
        getThumb={(lg: any) => ({ src: lg?.src, alt: lg?.alt })}
        filterKey="alt"
        columns={
          [
            {
              accessorKey: "alt",
              header: ({ column }: any) => (
                <Button
                  variant="ghost"
                  onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                  }
                >
                  Alt
                  <ArrowUpDown />
                </Button>
              ),
              cell: ({ row }: any) => (
                <div className="lowercase">{row.getValue("alt")}</div>
              ),
            },
          ] as ColumnDef<any>[]
        }
        renderDetail={(lg: any) => (
          <div className="grid gap-2">
            <div className="grid grid-cols-[140px_1fr] gap-2">
              <div className="text-muted-foreground">Alt</div>
              <div>{lg?.alt ?? ""}</div>
            </div>
            <div className="grid grid-cols-[140px_1fr] gap-2">
              <div className="text-muted-foreground">Src</div>
              <div>{lg?.src ?? ""}</div>
            </div>
          </div>
        )}
        onDelete={(_, index) => {
          void handleDeleteLogo(index);
        }}
        onEdit={(item, index) => {
          openEditLogo(item, index);
        }}
        onSave={async () => {}}
        saving={false}
        primaryActionLabel="Add"
        primaryActionLoading={isPending}
        primaryActionLoadingLabel="Adding…"
        onPrimaryAction={openNewLogo}
      />
      <Dialog
        open={Boolean(editingDraft)}
        onOpenChange={(open) => !open && closeEditor()}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isNew ? "Add customer logo" : "Edit customer logo"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="logo-src">Image URL</Label>
              <Input
                id="logo-src"
                value={editingDraft?.src ?? ""}
                onChange={(e) =>
                  setEditingDraft((prev) =>
                    prev ? { ...prev, src: e.target.value } : prev
                  )
                }
                placeholder="/uploads/logo.png"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="logo-alt">Alt text</Label>
              <Input
                id="logo-alt"
                value={editingDraft?.alt ?? ""}
                onChange={(e) =>
                  setEditingDraft((prev) =>
                    prev ? { ...prev, alt: e.target.value } : prev
                  )
                }
                placeholder="Customer name"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={closeEditor}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="button" onClick={applyEdit} disabled={isPending}>
              {isNew ? "Add" : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
