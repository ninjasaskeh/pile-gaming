"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Field } from "./Field";
import { Dropzone } from "./Dropzone";
import { uploadFile } from "./upload";
import type {
  SectionHeader as SectionHeaderType,
  SiteContent,
} from "@/lib/content";

type SectionKey = Exclude<keyof SiteContent, "hero">;

export function SectionHeaderForm({
  title,
  sectionKey,
  value,
  onChange,
  onSave,
  saving,
  token,
}: {
  title: string;
  sectionKey: SectionKey;
  value?: SectionHeaderType;
  onChange: (v: SectionHeaderType) => void;
  onSave: () => void;
  saving: boolean;
  token?: string;
}) {
  const v = value || {};
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Kicker">
            <Input
              value={v.kicker || ""}
              onChange={(e) => onChange({ ...v, kicker: e.target.value })}
            />
          </Field>
          <Field label="Title">
            <Input
              value={v.title || ""}
              onChange={(e) => onChange({ ...v, title: e.target.value })}
            />
          </Field>
        </div>
        <Field label="Subtitle">
          <Textarea
            value={v.subtitle || ""}
            onChange={(e) => onChange({ ...v, subtitle: e.target.value })}
          />
        </Field>
        <div className="grid md:grid-cols-2 gap-4 items-start">
          <Field label="Image URL">
            <Input
              value={v.imageUrl || ""}
              onChange={(e) => onChange({ ...v, imageUrl: e.target.value })}
              placeholder="/uploads/your-image.png"
            />
          </Field>
          <div className="grid gap-2">
            <Dropzone
              onFile={async (file) => {
                const url = await uploadFile(file, token);
                onChange({ ...v, imageUrl: url });
              }}
            />
            <Button onClick={onSave} disabled={saving}>
              {saving ? "Saving…" : "Save"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
