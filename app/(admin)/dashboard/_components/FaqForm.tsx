"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Field } from "./Field";
import type { FaqContent, FaqItem } from "@/lib/content";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function FaqForm({
  value,
  onChange,
  onSave,
  saving,
}: {
  value?: FaqContent;
  onChange: (v: FaqContent) => void;
  onSave: () => void;
  saving: boolean;
}) {
  const faq = value ?? {};
  const update = (next: Partial<FaqContent>) => onChange({ ...faq, ...next });
  const items: FaqItem[] = faq.items ?? [];
  const [openAdd, setOpenAdd] = React.useState(false);
  const [draft, setDraft] = React.useState<FaqItem>({
    value: `item-${(faq.items?.length ?? 0) + 1}`,
  });
  const updateItem = (index: number, patch: Partial<FaqItem>) => {
    const next = items.slice();
    next[index] = { ...(next[index] ?? {}), ...patch };
    update({ items: next });
  };
  const addItem = () => {
    setDraft({ value: `item-${items.length + 1}` });
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
        <CardTitle>FAQ</CardTitle>
        <p className="text-sm text-muted-foreground">
          Maintain the accordion questions and answers shown at the bottom of
          the page.
        </p>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Kicker">
            <Input
              value={faq.kicker ?? ""}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                update({ kicker: event.target.value })
              }
            />
          </Field>
          <Field label="Title">
            <Input
              value={faq.title ?? ""}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                update({ title: event.target.value })
              }
            />
          </Field>
        </div>

        <Separator />
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">FAQ Items</p>
          <Button type="button" variant="outline" onClick={addItem}>
            Add item
          </Button>
        </div>
        <Dialog open={openAdd} onOpenChange={setOpenAdd}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add FAQ Item</DialogTitle>
              <DialogDescription>Enter question and answer.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-3">
              <div className="grid md:grid-cols-3 gap-4">
                <Field label="ID (value)">
                  <Input
                    value={draft.value ?? ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setDraft({ ...draft, value: e.target.value })
                    }
                  />
                </Field>
                <Field label="Question">
                  <Input
                    value={draft.question ?? ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setDraft({ ...draft, question: e.target.value })
                    }
                  />
                </Field>
              </div>
              <Field label="Answer">
                <Textarea
                  rows={2}
                  value={draft.answer ?? ""}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setDraft({ ...draft, answer: e.target.value })
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
                  <Field label="ID (value)">
                    <Input
                      value={it.value ?? ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateItem(idx, { value: e.target.value })
                      }
                    />
                  </Field>
                  <Field label="Question">
                    <Input
                      value={it.question ?? ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateItem(idx, { question: e.target.value })
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
                <Field label="Answer">
                  <Textarea
                    rows={2}
                    value={it.answer ?? ""}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      updateItem(idx, { answer: e.target.value })
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
