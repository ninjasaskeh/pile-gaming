"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field } from "./Field";
import type { ContactContent } from "@/lib/content";

export function ContactForm({
  value,
  onChange,
  onSave,
  saving,
}: {
  value?: ContactContent;
  onChange: (v: ContactContent) => void;
  onSave: () => void;
  saving: boolean;
}) {
  const contact = value ?? {};

  const update = (next: Partial<ContactContent>) => {
    onChange({ ...contact, ...next });
  };

  // Simplified: remove business hours, subject options, and placeholders

  return (
    <Card>
      <CardHeader className="space-y-2">
        <CardTitle>Contact Section</CardTitle>
        <p className="text-sm text-muted-foreground">
          Configure the form copy, contact details, and Call-to-action
          messaging.
        </p>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Kicker">
            <Input
              value={contact.kicker ?? ""}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                update({ kicker: event.target.value })
              }
            />
          </Field>
          <Field label="Title">
            <Input
              value={contact.title ?? ""}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                update({ title: event.target.value })
              }
            />
          </Field>
        </div>
        <Field label="Description">
          <Textarea
            value={contact.description ?? ""}
            rows={3}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
              update({ description: event.target.value })
            }
          />
        </Field>

        {/* Simplified: only kicker, title, description above */}
      </CardContent>
    </Card>
  );
}
