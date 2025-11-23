"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Field } from "./Field";
import { Dropzone } from "./Dropzone";
import { uploadFile } from "./upload";
import type { HeroContent } from "@/lib/content";

export function HeroForm({
  value,
  onChange,
  onSave,
  saving,
}: {
  value?: HeroContent;
  onChange: (v: HeroContent) => void;
  onSave: () => void;
  saving: boolean;
}) {
  const hero: Partial<HeroContent> = value ?? {};

  const ensureHero = (p: Partial<HeroContent>): HeroContent => ({
    title: p.title ?? "",
    subtitle: p.subtitle ?? "",
    description: p.description,
    primaryCtaText: p.primaryCtaText,
    primaryCtaHref: p.primaryCtaHref,
    secondaryCtaText: p.secondaryCtaText,
    secondaryCtaHref: p.secondaryCtaHref,
    imageUrl: p.imageUrl,
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hero</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Title">
            <Input
              value={hero.title || ""}
              onChange={(e) =>
                onChange(ensureHero({ ...hero, title: e.target.value }))
              }
            />
          </Field>
          <Field label="Subtitle">
            <Input
              value={hero.subtitle || ""}
              onChange={(e) =>
                onChange(ensureHero({ ...hero, subtitle: e.target.value }))
              }
            />
          </Field>
        </div>
        <Field label="Description">
          <Textarea
            value={hero.description || ""}
            onChange={(e) =>
              onChange(ensureHero({ ...hero, description: e.target.value }))
            }
          />
        </Field>
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Primary CTA Text">
            <Input
              value={hero.primaryCtaText || ""}
              onChange={(e) =>
                onChange(
                  ensureHero({ ...hero, primaryCtaText: e.target.value })
                )
              }
            />
          </Field>
          <Field label="Primary CTA Href">
            <Input
              value={hero.primaryCtaHref || ""}
              onChange={(e) =>
                onChange(
                  ensureHero({ ...hero, primaryCtaHref: e.target.value })
                )
              }
            />
          </Field>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Secondary CTA Text">
            <Input
              value={hero.secondaryCtaText || ""}
              onChange={(e) =>
                onChange(
                  ensureHero({ ...hero, secondaryCtaText: e.target.value })
                )
              }
            />
          </Field>
          <Field label="Secondary CTA Href">
            <Input
              value={hero.secondaryCtaHref || ""}
              onChange={(e) =>
                onChange(
                  ensureHero({ ...hero, secondaryCtaHref: e.target.value })
                )
              }
            />
          </Field>
        </div>
        <div className="grid md:grid-cols-2 gap-4 items-start">
          <Field label="Hero Image URL">
            <Input
              value={hero.imageUrl || ""}
              onChange={(e) =>
                onChange(ensureHero({ ...hero, imageUrl: e.target.value }))
              }
              placeholder="/uploads/your-image.png"
            />
          </Field>
          <div className="grid gap-2">
            <Dropzone
              onFile={async (file) => {
                const url = await uploadFile(file);
                onChange(ensureHero({ ...hero, imageUrl: url }));
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
