"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field } from "./Field";
import type { FooterContent } from "@/lib/content";

export function FooterForm({
  value,
  onChange,
  onSave,
  saving,
}: {
  value?: FooterContent;
  onChange: (v: FooterContent) => void;
  onSave: () => void;
  saving: boolean;
}) {
  const footer = value ?? {};

  const update = (next: Partial<FooterContent>) => {
    onChange({ ...footer, ...next });
  };

  return (
    <Card>
      <CardHeader className="space-y-2">
        <CardTitle>Footer</CardTitle>
        <p className="text-sm text-muted-foreground">
          Update the company details and embedded map displayed in the footer.
        </p>
      </CardHeader>
      <CardContent className="grid gap-6">
        <Field label="Address">
          <Textarea
            value={footer.address ?? ""}
            rows={3}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
              update({ address: event.target.value })
            }
          />
        </Field>
        {/* Simplified: remove other fields */}
      </CardContent>
    </Card>
  );
}
