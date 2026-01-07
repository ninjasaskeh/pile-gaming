"use client";

import { useState } from "react";
import { toast } from "sonner";

import { useSectionContent } from "../useSectionContent";
import { ItemsDataTable } from "../ItemsDataTable";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function FaqClient({ initial }: { initial: any }) {
  const manager = useSectionContent("faq", {
    initial,
    skipInitialFetch: true,
  });

  const [isPending, setIsPending] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingDraft, setEditingDraft] = useState<{
    value: string;
    question: string;
    answer: string;
  } | null>(null);
  const [isNew, setIsNew] = useState(false);

  const handleDeleteItem = async (index: number) => {
    if (isPending) return;

    const items = Array.isArray(manager.value?.items)
      ? [...manager.value.items]
      : [];

    items.splice(index, 1);
    const nextValue = { ...(manager.value || {}), items } as any;
    manager.setValue(nextValue);

    setIsPending(true);
    try {
      await manager.save(nextValue);
      toast.success("FAQ item deleted");
    } finally {
      setIsPending(false);
    }
  };

  const openNewItem = () => {
    setIsNew(true);
    setEditingIndex(null);
    setEditingDraft({ value: "", question: "", answer: "" });
  };

  const openEditItem = (item: any, index: number) => {
    setIsNew(false);
    setEditingIndex(index);
    setEditingDraft({
      value: item?.value ?? "",
      question: item?.question ?? "",
      answer: item?.answer ?? "",
    });
  };

  const closeEditor = () => {
    setEditingIndex(null);
    setEditingDraft(null);
    setIsNew(false);
  };

  const applyEdit = async () => {
    if (isPending || !editingDraft) return;

    const items = Array.isArray(manager.value?.items)
      ? [...manager.value.items]
      : [];

    if (isNew) {
      items.push(editingDraft);
    } else if (editingIndex != null) {
      items[editingIndex] = {
        ...(items[editingIndex] || {}),
        ...editingDraft,
      } as any;
    }

    const nextValue = { ...(manager.value || {}), items } as any;
    manager.setValue(nextValue);

    setIsPending(true);
    try {
      await manager.save(nextValue);
      toast.success(isNew ? "FAQ item added" : "FAQ item updated");
      closeEditor();
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <ItemsDataTable
        title="FAQ Items"
        description="One row per question; details dialog shows full entry."
        data={manager.value?.items ?? []}
        getThumb={() => null}
        filterKey="question"
        columns={
          [
            {
              accessorKey: "value",
              header: ({ column }: any) => (
                <Button
                  variant="ghost"
                  onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                  }
                >
                  Key
                  <ArrowUpDown />
                </Button>
              ),
              cell: ({ row }: any) => <div>{row.getValue("value")}</div>,
            },
            {
              accessorKey: "question",
              header: ({ column }: any) => (
                <Button
                  variant="ghost"
                  onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                  }
                >
                  Question
                  <ArrowUpDown />
                </Button>
              ),
              cell: ({ row }: any) => <div>{row.getValue("question")}</div>,
            },
          ] as any
        }
        onDelete={(_, index) => {
          void handleDeleteItem(index);
        }}
        onEdit={(item, index) => {
          openEditItem(item, index);
        }}
        onSave={async () => {}}
        saving={false}
        primaryActionLabel="Add"
        primaryActionLoading={isPending}
        primaryActionLoadingLabel="Adding…"
        onPrimaryAction={openNewItem}
      />
      <Dialog
        open={Boolean(editingDraft)}
        onOpenChange={(open) => !open && closeEditor()}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isNew ? "Add FAQ item" : "Edit FAQ item"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="faq-key">Key</Label>
              <Input
                id="faq-key"
                value={editingDraft?.value ?? ""}
                onChange={(e) =>
                  setEditingDraft((prev) =>
                    prev ? { ...prev, value: e.target.value } : prev
                  )
                }
                placeholder="e.g. question-1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="faq-question">Question</Label>
              <Input
                id="faq-question"
                value={editingDraft?.question ?? ""}
                onChange={(e) =>
                  setEditingDraft((prev) =>
                    prev ? { ...prev, question: e.target.value } : prev
                  )
                }
                placeholder="Your question here"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="faq-answer">Answer</Label>
              <Textarea
                id="faq-answer"
                rows={4}
                value={editingDraft?.answer ?? ""}
                onChange={(e) =>
                  setEditingDraft((prev) =>
                    prev ? { ...prev, answer: e.target.value } : prev
                  )
                }
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
