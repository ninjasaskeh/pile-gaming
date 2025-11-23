"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "./Field";
import type { ProductsContent, ProductItem } from "@/lib/content";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function ProductsForm({
  value,
  onChange,
  onSave,
  saving,
}: {
  value?: ProductsContent;
  onChange: (v: ProductsContent) => void;
  onSave: () => void;
  saving: boolean;
}) {
  const products = value ?? {};
  const header = products.header ?? {};
  const items: ProductItem[] = products.items ?? [];
  const [openAdd, setOpenAdd] = React.useState(false);
  const [draft, setDraft] = React.useState<ProductItem>({});

  const update = (next: Partial<ProductsContent>) => {
    onChange({ ...products, ...next });
  };

  const updateHeader = (patch: typeof header) => {
    update({ header: { ...header, ...patch } });
  };
  const updateItem = (index: number, patch: Partial<ProductItem>) => {
    const next = items.slice();
    next[index] = { ...(next[index] ?? {}), ...patch };
    update({ items: next });
  };
  const addItem = () => {
    setDraft({});
    setOpenAdd(true);
  };
  const confirmAdd = async () => {
    const next = [...items, draft];
    update({ items: next });
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
        <CardTitle>Products Section</CardTitle>
        <p className="text-sm text-muted-foreground">
          Edit the copy and cards for the “Product Lines” grid.
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
          <p className="text-sm font-medium">Product Lines</p>
          <Button type="button" variant="outline" onClick={addItem}>
            Add product
          </Button>
        </div>
        <Dialog open={openAdd} onOpenChange={setOpenAdd}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Product</DialogTitle>
              <DialogDescription>
                Enter product details and save.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-3">
              <div className="grid md:grid-cols-3 gap-4">
                <Field label="Title">
                  <Input
                    value={draft.title ?? ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setDraft({ ...draft, title: e.target.value })
                    }
                  />
                </Field>
                <Field label="Description">
                  <Input
                    value={draft.description ?? ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setDraft({ ...draft, description: e.target.value })
                    }
                  />
                </Field>
                <div className="flex items-end gap-2">
                  <label className="text-sm">Pro</label>
                  <input
                    type="checkbox"
                    checked={Boolean(draft.pro)}
                    onChange={(e) =>
                      setDraft({ ...draft, pro: e.target.checked })
                    }
                  />
                </div>
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
                <CardTitle className="text-base">Product {idx + 1}</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                <div className="grid md:grid-cols-3 gap-4">
                  <Field label="Title">
                    <Input
                      value={it.title ?? ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateItem(idx, { title: e.target.value })
                      }
                    />
                  </Field>
                  <Field label="Description">
                    <Input
                      value={it.description ?? ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateItem(idx, { description: e.target.value })
                      }
                    />
                  </Field>
                  <div className="flex items-end gap-3">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id={`pro-${idx}`}
                        checked={Boolean(it.pro)}
                        onCheckedChange={(checked) =>
                          updateItem(idx, { pro: Boolean(checked) })
                        }
                      />
                      <label htmlFor={`pro-${idx}`} className="text-sm">
                        Pro (highlight)
                      </label>
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => removeItem(idx)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {items.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No products yet. Click &quot;Add product&quot; to create one.
            </p>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
