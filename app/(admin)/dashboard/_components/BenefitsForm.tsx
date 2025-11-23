"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Field } from "./Field";
import type { BenefitsContent, FeatureItem } from "@/lib/content";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function BenefitsForm({
  value,
  onChange,
  onSave,
  saving,
}: {
  value?: BenefitsContent;
  onChange: (v: BenefitsContent) => void;
  onSave: () => void;
  saving: boolean;
}) {
  const benefits = value ?? {};
  const update = (next: Partial<BenefitsContent>) =>
    onChange({ ...benefits, ...next });

  const items: FeatureItem[] = benefits.items ?? [];
  const [openAdd, setOpenAdd] = React.useState(false);
  const [draft, setDraft] = React.useState<FeatureItem>({});
  const updateItem = (index: number, patch: Partial<FeatureItem>) => {
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
        <CardTitle>Benefits</CardTitle>
        <p className="text-sm text-muted-foreground">
          Configure the four value props shown beside the benefits illustration.
        </p>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Kicker">
            <Input
              value={benefits.kicker ?? ""}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                update({ kicker: event.target.value })
              }
            />
          </Field>
          <Field label="Title">
            <Input
              value={benefits.title ?? ""}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                update({ title: event.target.value })
              }
            />
          </Field>
        </div>
        <Field label="Description">
          <Textarea
            value={benefits.description ?? ""}
            rows={3}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
              update({ description: event.target.value })
            }
          />
        </Field>

        <Separator />
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">Benefit Items</p>
          <Button type="button" variant="outline" onClick={addItem}>
            Add item
          </Button>
        </div>
        <Dialog open={openAdd} onOpenChange={setOpenAdd}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Benefit Item</DialogTitle>
              <DialogDescription>
                Enter item details and save.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-3">
              <div className="grid md:grid-cols-3 gap-4">
                <Field label="Icon (name)">
                  <Input
                    value={draft.icon ?? ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setDraft({ ...draft, icon: e.target.value })
                    }
                  />
                </Field>
                <Field label="Title">
                  <Input
                    value={draft.title ?? ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setDraft({ ...draft, title: e.target.value })
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
              <CardContent className="grid gap-3">
                <div className="grid md:grid-cols-3 gap-4">
                  <Field label="Icon (name)">
                    <Input
                      value={it.icon ?? ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateItem(idx, { icon: e.target.value })
                      }
                    />
                  </Field>
                  <Field label="Title">
                    <Input
                      value={it.title ?? ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateItem(idx, { title: e.target.value })
                      }
                    />
                  </Field>
                  <div className="flex items-end">
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => removeItem(idx)}
                    >
                      Remove
                    </Button>
                  </div>
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
              </CardContent>
            </Card>
          ))}
          {items.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No items yet. Click &quot;Add item&quot; to create one.
            </p>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
