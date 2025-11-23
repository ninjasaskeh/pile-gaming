"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Field } from "./Field";
import { Dropzone } from "./Dropzone";
import { uploadFile } from "./upload";
import type { CustomersContent, CustomerLogo } from "@/lib/content";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function CustomersForm({
  value,
  onChange,
  onSave,
  saving,
}: {
  value?: CustomersContent;
  onChange: (v: CustomersContent) => void;
  onSave: () => void;
  saving: boolean;
}) {
  const content = value ?? {};
  const header = content.header ?? {};

  const update = (next: Partial<CustomersContent>) => {
    onChange({ ...content, ...next });
  };

  const updateHeader = (patch: typeof header) => {
    update({ header: { ...header, ...patch } });
  };
  const logos: CustomerLogo[] = content.logos ?? [];
  const [openAdd, setOpenAdd] = React.useState(false);
  const [draft, setDraft] = React.useState<CustomerLogo>({});
  const updateLogo = (index: number, patch: Partial<CustomerLogo>) => {
    const next = logos.slice();
    next[index] = { ...(next[index] ?? {}), ...patch };
    update({ logos: next });
  };
  const addLogo = () => {
    setDraft({});
    setOpenAdd(true);
  };
  const confirmAdd = async () => {
    const next = [...logos, draft];
    update({ logos: next });
    setOpenAdd(false);
    await onSave();
  };
  const removeLogo = (index: number) => {
    const next = logos.slice();
    next.splice(index, 1);
    update({ logos: next });
  };

  return (
    <Card>
      <CardHeader className="space-y-2">
        <CardTitle>Customers Marquee</CardTitle>
        <p className="text-sm text-muted-foreground">
          Manage the brand logos that scroll across the customer marquee.
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
            rows={2}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
              updateHeader({ subtitle: event.target.value })
            }
          />
        </Field>

        <Separator />
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">Customer Logos</p>
          <Button type="button" variant="outline" onClick={addLogo}>
            Add logo
          </Button>
        </div>
        <Dialog open={openAdd} onOpenChange={setOpenAdd}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Customer Logo</DialogTitle>
              <DialogDescription>
                Provide image and optional alt text.
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
                    placeholder="/uploads/logo.png"
                  />
                </Field>
                <div className="grid gap-2">
                  <Dropzone
                    placeholder="Drop logo here or click to upload"
                    onFile={async (file) => {
                      const url = await uploadFile(file);
                      setDraft({ ...draft, src: url });
                    }}
                  />
                </div>
              </div>
              <Field label="Alt text">
                <Input
                  value={draft.alt ?? ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setDraft({ ...draft, alt: e.target.value })
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
          {logos.map((lg, idx) => (
            <Card key={idx}>
              <CardHeader className="py-4">
                <CardTitle className="text-base">Logo {idx + 1}</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                <div className="grid md:grid-cols-[1fr_auto] gap-4 items-start">
                  <Field label="Image URL">
                    <Input
                      value={lg.src ?? ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateLogo(idx, { src: e.target.value })
                      }
                      placeholder="/uploads/logo.png"
                    />
                  </Field>
                  <div className="grid gap-2">
                    <Dropzone
                      placeholder="Drop logo here or click to upload"
                      onFile={async (file) => {
                        const url = await uploadFile(file);
                        updateLogo(idx, { src: url });
                      }}
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="Alt text">
                    <Input
                      value={lg.alt ?? ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateLogo(idx, { alt: e.target.value })
                      }
                    />
                  </Field>
                  <div className="flex items-end">
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => removeLogo(idx)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {logos.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No logos yet. Click &quot;Add logo&quot; to create one.
            </p>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
