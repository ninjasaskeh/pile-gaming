"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field } from "./Field";
import { Dropzone } from "./Dropzone";
import { uploadFile } from "./upload";
import type { HeroCardsContent } from "@/lib/content";

export function HeroCardsForm({
  value,
  onChange,
  onSave,
  saving,
}: {
  value?: HeroCardsContent;
  onChange: (v: HeroCardsContent) => void;
  onSave: () => void;
  saving: boolean;
}) {
  const cards = value ?? {};

  const update = (next: Partial<HeroCardsContent>) => {
    onChange({ ...cards, ...next });
  };

  const setNested = <K extends keyof HeroCardsContent>(
    key: K,
    patch: Partial<NonNullable<HeroCardsContent[K]>>
  ) => {
    const current = (cards[key] ?? {}) as NonNullable<HeroCardsContent[K]>;
    update({ [key]: { ...current, ...patch } } as Partial<HeroCardsContent>);
  };

  return (
    <Card>
      <CardHeader className="space-y-2">
        <CardTitle>Hero Highlight Cards</CardTitle>
        <p className="text-sm text-muted-foreground">
          Control the four feature cards that accompany the hero headline.
        </p>
      </CardHeader>
      <CardContent className="grid gap-6">
        <section className="grid gap-4">
          <h3 className="text-base font-semibold">Testimonial</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Title">
              <Input
                value={cards.testimonial?.title ?? ""}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setNested("testimonial", { title: event.target.value })
                }
              />
            </Field>
            <Field label="Subtitle">
              <Input
                value={cards.testimonial?.subtitle ?? ""}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setNested("testimonial", { subtitle: event.target.value })
                }
              />
            </Field>
          </div>
          <Field label="Quote">
            <Textarea
              value={cards.testimonial?.quote ?? ""}
              rows={3}
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                setNested("testimonial", { quote: event.target.value })
              }
            />
          </Field>
        </section>

        <section className="grid gap-4">
          <h3 className="text-base font-semibold">Company Overview Card</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Title">
              <Input
                value={cards.company?.title ?? ""}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setNested("company", { title: event.target.value })
                }
              />
            </Field>
            <Field label="Subtitle">
              <Input
                value={cards.company?.subtitle ?? ""}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setNested("company", { subtitle: event.target.value })
                }
              />
            </Field>
          </div>
          <Field label="Description">
            <Textarea
              value={cards.company?.description ?? ""}
              rows={3}
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                setNested("company", { description: event.target.value })
              }
            />
          </Field>
          <div className="grid md:grid-cols-[1fr_auto] gap-4 items-start">
            <Field label="Logo URL">
              <Input
                value={cards.company?.logoSrc ?? ""}
                placeholder="/uploads/logo.png"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setNested("company", { logoSrc: event.target.value })
                }
              />
            </Field>
            <div className="grid gap-2">
              <Dropzone
                placeholder="Drop logo here or click to upload"
                onFile={async (file) => {
                  const url = await uploadFile(file);
                  setNested("company", { logoSrc: url });
                }}
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Primary CTA Label">
              <Input
                value={cards.company?.primaryCta?.label ?? ""}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setNested("company", {
                    primaryCta: {
                      ...(cards.company?.primaryCta ?? {}),
                      label: event.target.value,
                    },
                  })
                }
              />
            </Field>
            <Field label="Primary CTA Link">
              <Input
                value={cards.company?.primaryCta?.href ?? ""}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setNested("company", {
                    primaryCta: {
                      ...(cards.company?.primaryCta ?? {}),
                      href: event.target.value,
                    },
                  })
                }
              />
            </Field>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Secondary CTA Label">
              <Input
                value={cards.company?.secondaryCta?.label ?? ""}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setNested("company", {
                    secondaryCta: {
                      ...(cards.company?.secondaryCta ?? {}),
                      label: event.target.value,
                    },
                  })
                }
              />
            </Field>
            <Field label="Secondary CTA Link">
              <Input
                value={cards.company?.secondaryCta?.href ?? ""}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setNested("company", {
                    secondaryCta: {
                      ...(cards.company?.secondaryCta ?? {}),
                      href: event.target.value,
                    },
                  })
                }
              />
            </Field>
          </div>
        </section>

        <section className="grid gap-4">
          <h3 className="text-base font-semibold">Production Capacity Card</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Title">
              <Input
                value={cards.capacity?.title ?? ""}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setNested("capacity", { title: event.target.value })
                }
              />
            </Field>
            <Field label="Subtitle">
              <Input
                value={cards.capacity?.subtitle ?? ""}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setNested("capacity", { subtitle: event.target.value })
                }
              />
            </Field>
          </div>
          <Field label="Metrics (one per line)">
            <Textarea
              value={(cards.capacity?.metrics ?? []).join("\n")}
              rows={3}
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                setNested("capacity", {
                  metrics: event.target.value
                    .split("\n")
                    .map((line) => line.trim())
                    .filter(Boolean),
                })
              }
            />
          </Field>
        </section>

        <section className="grid gap-4">
          <h3 className="text-base font-semibold">Product Lines Card</h3>
          <Field label="Title">
            <Input
              value={cards.productLines?.title ?? ""}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setNested("productLines", { title: event.target.value })
              }
            />
          </Field>
          <Field label="Description">
            <Textarea
              value={cards.productLines?.description ?? ""}
              rows={3}
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                setNested("productLines", { description: event.target.value })
              }
            />
          </Field>
          <Field label="Badges (comma separated)">
            <Input
              value={(cards.productLines?.badges ?? []).join(", ")}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setNested("productLines", {
                  badges: event.target.value
                    .split(",")
                    .map((item) => item.trim())
                    .filter(Boolean),
                })
              }
            />
          </Field>
        </section>

        <div className="flex justify-end">
          <Button onClick={onSave} disabled={saving}>
            {saving ? "Saving…" : "Save hero cards"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
