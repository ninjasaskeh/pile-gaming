"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field } from "./Field";
import type { SiteMetadataContent } from "@/lib/content";

// Simplified: only title and description

export function SiteMetadataForm({
  value,
  onChange,
  onSave,
  saving,
}: {
  value?: SiteMetadataContent;
  onChange: (v: SiteMetadataContent) => void;
  onSave: () => void;
  saving: boolean;
}) {
  const metadata = value ?? {};

  const update = (next: Partial<SiteMetadataContent>) => {
    onChange({ ...metadata, ...next });
  };

  return (
    <Card>
      <CardHeader className="space-y-2">
        <CardTitle>Site Metadata</CardTitle>
        <p className="text-sm text-muted-foreground">
          Control the default SEO metadata used across the marketing site.
        </p>
      </CardHeader>
      <CardContent className="grid gap-6">
        <Field label="Title">
          <Input
            value={metadata.title ?? ""}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              update({ title: event.target.value })
            }
          />
        </Field>
        <Field label="Description">
          <Textarea
            value={metadata.description ?? ""}
            rows={3}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
              update({ description: event.target.value })
            }
          />
        </Field>
        {/* Simplified: only title and description above */}
      </CardContent>
    </Card>
  );
}
