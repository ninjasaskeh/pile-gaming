"use client";
import * as React from "react";
import { toast } from "sonner";
import type { HeroContent, SectionHeader, SiteContent } from "@/lib/content";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { setSection } from "../(admin)/dashboard/_actions/content";
import { Dropzone } from "../(admin)/dashboard/_components/Dropzone";
import { uploadFile } from "../(admin)/dashboard/_components/upload";

type SectionKey = keyof SiteContent;

const SECTION_ORDER: Array<{ key: SectionKey; title: string; hint: string }> = [
  { key: "hero", title: "Hero", hint: "Headline, description, and CTAs" },
  {
    key: "productsHeader",
    title: "Products",
    hint: "Intro copy for the product carousel",
  },
  {
    key: "productOverviewHeader",
    title: "Product Overview",
    hint: "Content for the lifecycle walkthrough",
  },
  {
    key: "marketsHeader",
    title: "Export Markets",
    hint: "Title and subtitle for the world map",
  },
  {
    key: "customersHeader",
    title: "Customers",
    hint: "Copy for the customer marquee section",
  },
];

export function CmsClient({ initial }: { initial: SiteContent }) {
  const [content, setContent] = React.useState<SiteContent>(initial);
  const [selected, setSelected] = React.useState<SectionKey>("hero");
  const [savingKey, setSavingKey] = React.useState<SectionKey | null>(null);

  const updateSection = <K extends SectionKey>(
    key: K,
    value: SiteContent[K]
  ) => {
    setContent((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (key: SectionKey) => {
    setSavingKey(key);
    try {
      await setSection(key as any, content[key]);
      toast.success("Content saved");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      toast.error(message);
    } finally {
      setSavingKey(null);
    }
  };

  const hero = content.hero as HeroContent;
  const sectionValue = (key: Exclude<SectionKey, "hero">) =>
    (content[key] || {}) as SectionHeader;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 py-8">
      <header className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-tight">
            Content Manager
          </h1>
          <Badge variant="outline">CMS</Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Update the marketing site copy, CTAs, and supporting media. Changes
          are saved per section.
        </p>
      </header>
      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <aside className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Sections</CardTitle>
              <CardDescription>
                Select which section you want to edit.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {SECTION_ORDER.map((section) => (
                <Button
                  key={section.key}
                  variant={selected === section.key ? "default" : "ghost"}
                  className="justify-start"
                  onClick={() => setSelected(section.key)}
                  disabled={savingKey !== null}
                >
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">{section.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {section.hint}
                    </span>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>
        </aside>
        <main className="grid gap-6">
          {selected === "hero" ? (
            <SectionHero
              value={hero}
              onChange={(val) => updateSection("hero", val)}
              onSave={() => handleSave("hero")}
              saving={savingKey === "hero"}
            />
          ) : (
            <SectionHeaderEditor
              key={String(selected)}
              sectionKey={selected as Exclude<SectionKey, "hero">}
              value={sectionValue(selected as Exclude<SectionKey, "hero">)}
              onChange={(val) => updateSection(selected, val)}
              onSave={() => handleSave(selected)}
              saving={savingKey === selected}
            />
          )}
        </main>
      </div>
    </div>
  );
}

function SectionHero({
  value,
  onChange,
  onSave,
  saving,
}: {
  value: HeroContent;
  onChange: (v: HeroContent) => void;
  onSave: () => void;
  saving: boolean;
}) {
  return (
    <Card>
      <CardHeader className="space-y-2">
        <CardTitle>Hero</CardTitle>
        <CardDescription>
          Control the hero headline, supporting copy, CTAs, and media.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-1">
          <Label htmlFor="hero-title">Title</Label>
          <Input
            id="hero-title"
            value={value.title || ""}
            onChange={(e) => onChange({ ...value, title: e.target.value })}
          />
        </div>
        <div className="grid gap-1">
          <Label htmlFor="hero-subtitle">Subtitle</Label>
          <Input
            id="hero-subtitle"
            value={value.subtitle || ""}
            onChange={(e) => onChange({ ...value, subtitle: e.target.value })}
          />
        </div>
        <div className="grid gap-1">
          <Label htmlFor="hero-description">Description</Label>
          <Textarea
            id="hero-description"
            rows={4}
            value={value.description || ""}
            onChange={(e) =>
              onChange({ ...value, description: e.target.value })
            }
          />
        </div>
        <Separator />
        <div className="grid gap-3 md:grid-cols-2">
          <CtaFields
            label="Primary CTA"
            text={value.primaryCtaText || ""}
            href={value.primaryCtaHref || ""}
            onChange={(next) => onChange({ ...value, ...next })}
            textKey="primaryCtaText"
            hrefKey="primaryCtaHref"
          />
          <CtaFields
            label="Secondary CTA"
            text={value.secondaryCtaText || ""}
            href={value.secondaryCtaHref || ""}
            onChange={(next) => onChange({ ...value, ...next })}
            textKey="secondaryCtaText"
            hrefKey="secondaryCtaHref"
          />
        </div>
        <Separator />
        <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
          <div className="grid gap-1">
            <Label htmlFor="hero-image">Image URL</Label>
            <Input
              id="hero-image"
              value={value.imageUrl || ""}
              onChange={(e) => onChange({ ...value, imageUrl: e.target.value })}
              placeholder="/uploads/hero.png"
            />
          </div>
          <div className="grid gap-2">
            <Dropzone
              placeholder="Drop image or click to upload"
              onFile={async (file) => {
                try {
                  const url = await uploadFile(file);
                  onChange({ ...value, imageUrl: url });
                  toast.success("Upload complete");
                } catch (err) {
                  const message =
                    err instanceof Error ? err.message : "Upload failed";
                  toast.error(message);
                }
              }}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={onSave} disabled={saving}>
            {saving ? "Saving…" : "Save hero"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function SectionHeaderEditor({
  sectionKey,
  value,
  onChange,
  onSave,
  saving,
}: {
  sectionKey: Exclude<SectionKey, "hero">;
  value: SectionHeader;
  onChange: (v: SectionHeader) => void;
  onSave: () => void;
  saving: boolean;
}) {
  const meta = SECTION_ORDER.find((item) => item.key === sectionKey);
  const fieldPrefix = String(sectionKey);
  return (
    <Card>
      <CardHeader className="space-y-2">
        <CardTitle>{meta?.title ?? "Section"}</CardTitle>
        <CardDescription>
          Edit kicker, title, subtitle, and supporting art.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-1">
          <Label htmlFor={`${fieldPrefix}-kicker`}>Kicker</Label>
          <Input
            id={`${fieldPrefix}-kicker`}
            value={value.kicker || ""}
            onChange={(e) => onChange({ ...value, kicker: e.target.value })}
          />
        </div>
        <div className="grid gap-1">
          <Label htmlFor={`${fieldPrefix}-title`}>Title</Label>
          <Input
            id={`${fieldPrefix}-title`}
            value={value.title || ""}
            onChange={(e) => onChange({ ...value, title: e.target.value })}
          />
        </div>
        <div className="grid gap-1">
          <Label htmlFor={`${fieldPrefix}-subtitle`}>Subtitle</Label>
          <Textarea
            id={`${fieldPrefix}-subtitle`}
            rows={3}
            value={value.subtitle || ""}
            onChange={(e) => onChange({ ...value, subtitle: e.target.value })}
          />
        </div>
        <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
          <div className="grid gap-1">
            <Label htmlFor={`${fieldPrefix}-image`}>Image URL</Label>
            <Input
              id={`${fieldPrefix}-image`}
              value={value.imageUrl || ""}
              onChange={(e) => onChange({ ...value, imageUrl: e.target.value })}
              placeholder="/uploads/section.png"
            />
          </div>
          <div className="grid gap-2">
            <Dropzone
              placeholder="Drop image or click to upload"
              onFile={async (file) => {
                try {
                  const url = await uploadFile(file);
                  onChange({ ...value, imageUrl: url });
                  toast.success("Upload complete");
                } catch (err) {
                  const message =
                    err instanceof Error ? err.message : "Upload failed";
                  toast.error(message);
                }
              }}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={onSave} disabled={saving}>
            {saving ? "Saving…" : "Save section"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function CtaFields({
  label,
  text,
  href,
  onChange,
  textKey,
  hrefKey,
}: {
  label: string;
  text: string;
  href: string;
  onChange: (v: Partial<HeroContent>) => void;
  textKey: keyof HeroContent;
  hrefKey: keyof HeroContent;
}) {
  return (
    <div className="grid gap-3">
      <p className="text-sm font-medium">{label}</p>
      <div className="grid gap-1">
        <Label>{label} Text</Label>
        <Input
          value={text}
          onChange={(e) => onChange({ [textKey]: e.target.value })}
        />
      </div>
      <div className="grid gap-1">
        <Label>{label} Link</Label>
        <Input
          value={href}
          onChange={(e) => onChange({ [hrefKey]: e.target.value })}
          placeholder="#section"
        />
      </div>
    </div>
  );
}

// MediaUploader replaced with Dropzone above to standardize UX.
