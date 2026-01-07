"use client";

import { useState } from "react";
import { toast } from "sonner";

import { useSectionContent } from "../useSectionContent";
import { ItemsDataTable } from "../ItemsDataTable";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowUpDown } from "lucide-react";
import type { MarketPoint } from "@/lib/content";

export default function MarketsClient({ initial }: { initial: any }) {
  const manager = useSectionContent("markets", {
    initial,
    skipInitialFetch: true,
  });

  const [isPending, setIsPending] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingDraft, setEditingDraft] = useState<MarketPoint | null>(null);
  const [isNew, setIsNew] = useState(false);

  const openNewMarket = () => {
    if (isPending) return;
    setIsNew(true);
    setEditingIndex(null);
    setEditingDraft({ label: "", lat: 0, lng: 0 });
  };

  const openEditMarket = (item: MarketPoint, index: number) => {
    if (isPending) return;
    setIsNew(false);
    setEditingIndex(index);
    setEditingDraft({
      label: item.label ?? "",
      lat: item.lat ?? 0,
      lng: item.lng ?? 0,
    });
  };

  const handleDeleteMarket = (index: number) => {
    if (isPending) return;

    const markets = Array.isArray(manager.value?.markets)
      ? [...manager.value.markets]
      : [];
    markets.splice(index, 1);
    const nextValue = { ...(manager.value || {}), markets } as any;
    manager.setValue(nextValue);
    void (async () => {
      await manager.save(nextValue);
      toast.success("Market deleted");
    })();
  };

  const closeEditor = () => {
    setEditingIndex(null);
    setEditingDraft(null);
    setIsNew(false);
    setIsPending(false);
  };

  const applyEdit = async () => {
    if (isPending || !editingDraft) return;

    setIsPending(true);
    const markets = Array.isArray(manager.value?.markets)
      ? ([...manager.value.markets] as MarketPoint[])
      : ([] as MarketPoint[]);

    const normalized: MarketPoint = {
      label: editingDraft.label ?? "",
      lat:
        editingDraft.lat === undefined || Number.isNaN(editingDraft.lat)
          ? 0
          : editingDraft.lat,
      lng:
        editingDraft.lng === undefined || Number.isNaN(editingDraft.lng)
          ? 0
          : editingDraft.lng,
    };

    if (isNew) {
      markets.push(normalized);
    } else if (editingIndex != null) {
      markets[editingIndex] = normalized;
    }

    const nextValue = { ...(manager.value || {}), markets } as any;
    manager.setValue(nextValue);

    try {
      await manager.save(nextValue);
      toast.success(isNew ? "Market added" : "Market updated");
      closeEditor();
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <ItemsDataTable
        title="Markets"
        description="One row per market destination."
        data={manager.value?.markets ?? []}
        getThumb={() => null}
        filterKey="label"
        columns={
          [
            {
              accessorKey: "label",
              header: ({ column }: any) => (
                <Button
                  variant="ghost"
                  onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                  }
                >
                  Label
                  <ArrowUpDown />
                </Button>
              ),
              cell: ({ row }: any) => <div>{row.getValue("label")}</div>,
            },
            {
              accessorKey: "lat",
              header: () => <div>Lat</div>,
              cell: ({ row }: any) => <div>{row.getValue("lat")}</div>,
            },
            {
              accessorKey: "lng",
              header: () => <div>Lng</div>,
              cell: ({ row }: any) => <div>{row.getValue("lng")}</div>,
            },
          ] as any
        }
        onDelete={(_, index) => {
          handleDeleteMarket(index);
        }}
        onEdit={(item, index) => openEditMarket(item as MarketPoint, index)}
        onSave={async () => {}}
        saving={false}
        primaryActionLabel="Add"
        primaryActionLoading={isPending}
        primaryActionLoadingLabel={isNew ? "Adding…" : "Saving…"}
        onPrimaryAction={openNewMarket}
      />
      <Dialog open={!!editingDraft}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{isNew ? "Add market" : "Edit market"}</DialogTitle>
            <DialogDescription>
              Set the label and coordinates for this market destination.
            </DialogDescription>
          </DialogHeader>
          {editingDraft ? (
            <div className="grid gap-4">
              <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                <Label htmlFor="market-label">Label</Label>
                <Input
                  id="market-label"
                  value={editingDraft.label ?? ""}
                  onChange={(e) =>
                    setEditingDraft({
                      ...editingDraft,
                      label: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                <Label htmlFor="market-lat">Lat</Label>
                <Input
                  id="market-lat"
                  type="number"
                  value={
                    editingDraft.lat === undefined
                      ? ""
                      : String(editingDraft.lat)
                  }
                  onChange={(e) => {
                    const v = e.target.value;
                    setEditingDraft({
                      ...editingDraft,
                      lat: v === "" ? undefined : Number(v),
                    });
                  }}
                />
              </div>
              <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                <Label htmlFor="market-lng">Lng</Label>
                <Input
                  id="market-lng"
                  type="number"
                  value={
                    editingDraft.lng === undefined
                      ? ""
                      : String(editingDraft.lng)
                  }
                  onChange={(e) => {
                    const v = e.target.value;
                    setEditingDraft({
                      ...editingDraft,
                      lng: v === "" ? undefined : Number(v),
                    });
                  }}
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
