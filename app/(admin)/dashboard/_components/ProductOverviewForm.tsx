"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Field } from "./Field";
import { Dropzone } from "./Dropzone";
import { uploadFile } from "./upload";
import type {
  ProductOverviewContent,
  ProductOverviewItem,
} from "@/lib/content";

export function ProductOverviewForm({
  value,
  onChange,
  onSave,
  saving,
}: {
  value?: ProductOverviewContent;
  onChange: (v: ProductOverviewContent) => void;
  onSave: () => void;
  saving: boolean;
}) {
  const overview = value ?? {};
  const header = overview.header ?? {};
  const items: ProductOverviewItem[] = overview.items ?? [];

  const [openAdd, setOpenAdd] = React.useState(false);
  const [draft, setDraft] = React.useState<ProductOverviewItem>({});

  const update = (next: Partial<ProductOverviewContent>) => {
    onChange({ ...overview, ...next });
  };

  const updateHeader = (patch: typeof header) => {
    update({ header: { ...header, ...patch } });
  };
  const updateItem = (index: number, patch: Partial<ProductOverviewItem>) => {
    const next = items.slice();
    next[index] = { ...(next[index] ?? {}), ...patch };
    update({ items: next });
  };
  const addItem = () => {
    setDraft({});
    setOpenAdd(true);
  };
  const confirmAdd = async () => {
    const nextItems = [...items, draft];
    update({ items: nextItems });
    setOpenAdd(false);
    await onSave();
  };
  const removeItem = (index: number) => {
    const next = items.slice();
    next.splice(index, 1);
    update({ items: next });
  };

  return (
    <Card>
      <CardHeader className="space-y-2">
        <CardTitle>Product Overview Carousel</CardTitle>
        <p className="text-sm text-muted-foreground">
          Maintain the detailed fabric cards used in the carousel view.
        </p>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Kicker">
            <Input
              value={header.kicker ?? ""}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                updateHeader({ kicker: event.target.value })
              }
            />
          </Field>
          <Field label="Title">
            <Input
              value={header.title ?? ""}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                updateHeader({ title: event.target.value })
              }
            />
          </Field>
        </div>
        <Field label="Subtitle">
          <Textarea
            value={header.subtitle ?? ""}
            rows={3}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
              updateHeader({ subtitle: event.target.value })
            }
          />
        </Field>

        <Separator />
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">Overview Items</p>
          <Button type="button" variant="outline" onClick={addItem}>
            Add item
          </Button>
        </div>
        <Dialog open={openAdd} onOpenChange={setOpenAdd}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Product Overview Item</DialogTitle>
              <DialogDescription>
                Fill the fields below and save.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid md:grid-cols-[1fr_auto] gap-4 items-start">
                <Field label="Image URL">
                  <Input
                    value={draft.src ?? ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setDraft({ ...draft, src: e.target.value })
                    }
                    placeholder="/uploads/product.jpg"
                  />
                </Field>
                <div className="grid gap-2">
                  <Dropzone
                    placeholder="Drop image here or click to upload"
                    onFile={async (file) => {
                      const url = await uploadFile(file);
                      setDraft({ ...draft, src: url });
                    }}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Title">
                  <Input
                    value={draft.title ?? ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setDraft({ ...draft, title: e.target.value })
                    }
                  />
                </Field>
                <Field label="Code">
                  <Input
                    value={draft.code ?? ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setDraft({ ...draft, code: e.target.value })
                    }
                  />
                </Field>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Category">
                  <Input
                    value={draft.category ?? ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setDraft({ ...draft, category: e.target.value })
                    }
                  />
                </Field>
                <Field label="Tags (comma separated)">
                  <Input
                    value={(draft.tags ?? []).join(", ")}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setDraft({
                        ...draft,
                        tags: e.target.value
                          .split(",")
                          .map((s) => s.trim())
                          .filter(Boolean),
                      })
                    }
                  />
                </Field>
              </div>
              <Field label="Description">
                <Textarea
                  rows={2}
                  value={draft.description ?? ""}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setDraft({ ...draft, description: e.target.value })
                  }
                />
              </Field>
              <div className="grid md:grid-cols-5 gap-4">
                <Field label="Pile height">
                  <Input
                    value={draft.specs?.pileHeight ?? ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setDraft({
                        ...draft,
                        specs: { ...draft.specs, pileHeight: e.target.value },
                      })
                    }
                  />
                </Field>
                <Field label="Weight">
                  <Input
                    value={draft.specs?.weight ?? ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setDraft({
                        ...draft,
                        specs: { ...draft.specs, weight: e.target.value },
                      })
                    }
                  />
                </Field>
                <Field label="Composition">
                  <Input
                    value={draft.specs?.composition ?? ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setDraft({
                        ...draft,
                        specs: { ...draft.specs, composition: e.target.value },
                      })
                    }
                  />
                </Field>
                <Field label="Finish">
                  <Input
                    value={draft.specs?.finish ?? ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setDraft({
                        ...draft,
                        specs: { ...draft.specs, finish: e.target.value },
                      })
                    }
                  />
                </Field>
                <Field label="Color">
                  <Input
                    value={draft.specs?.color ?? ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setDraft({
                        ...draft,
                        specs: { ...draft.specs, color: e.target.value },
                      })
                    }
                  />
                </Field>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpenAdd(false)}>
                Cancel
              </Button>
              <Button onClick={confirmAdd} disabled={saving}>
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <div className="grid gap-4">
          {items.map((it, idx) => (
            <Card key={idx}>
              <CardHeader className="py-4">
                <CardTitle className="text-base">Item {idx + 1}</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid md:grid-cols-[1fr_auto] gap-4 items-start">
                  <Field label="Image URL">
                    <Input
                      value={it.src ?? ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateItem(idx, { src: e.target.value })
                      }
                      placeholder="/uploads/product.jpg"
                    />
                  </Field>
                  <div className="grid gap-2">
                    <Dropzone
                      placeholder="Drop image here or click to upload"
                      onFile={async (file) => {
                        const url = await uploadFile(file);
                        updateItem(idx, { src: url });
                      }}
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="Title">
                    <Input
                      value={it.title ?? ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateItem(idx, { title: e.target.value })
                      }
                    />
                  </Field>
                  <Field label="Code">
                    <Input
                      value={it.code ?? ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateItem(idx, { code: e.target.value })
                      }
                    />
                  </Field>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="Category">
                    <Input
                      value={it.category ?? ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateItem(idx, { category: e.target.value })
                      }
                    />
                  </Field>
                  <Field label="Tags (comma separated)">
                    <Input
                      value={(it.tags ?? []).join(", ")}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateItem(idx, {
                          tags: e.target.value
                            .split(",")
                            .map((s) => s.trim())
                            .filter(Boolean),
                        })
                      }
                    />
                  </Field>
                </div>
                <Field label="Description">
                  <Textarea
                    rows={2}
                    value={it.description ?? ""}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      updateItem(idx, { description: e.target.value })
                    }
                  />
                </Field>
                <div className="grid md:grid-cols-5 gap-4">
                  <Field label="Pile height">
                    <Input
                      value={it.specs?.pileHeight ?? ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateItem(idx, {
                          specs: { ...it.specs, pileHeight: e.target.value },
                        })
                      }
                    />
                  </Field>
                  <Field label="Weight">
                    <Input
                      value={it.specs?.weight ?? ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateItem(idx, {
                          specs: { ...it.specs, weight: e.target.value },
                        })
                      }
                    />
                  </Field>
                  <Field label="Composition">
                    <Input
                      value={it.specs?.composition ?? ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateItem(idx, {
                          specs: { ...it.specs, composition: e.target.value },
                        })
                      }
                    />
                  </Field>
                  <Field label="Finish">
                    <Input
                      value={it.specs?.finish ?? ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateItem(idx, {
                          specs: { ...it.specs, finish: e.target.value },
                        })
                      }
                    />
                  </Field>
                  <Field label="Color">
                    <Input
                      value={it.specs?.color ?? ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateItem(idx, {
                          specs: { ...it.specs, color: e.target.value },
                        })
                      }
                    />
                  </Field>
                </div>
                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => removeItem(idx)}
                  >
                    Remove item
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {items.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No items yet. Click &quot;Add item&quot; to create one.
            </p>
          ) : null}
        </div>
        <div className="flex justify-end">
          <Button type="button" onClick={onSave} disabled={saving}>
            {saving ? "Saving…" : "Save product overview"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
