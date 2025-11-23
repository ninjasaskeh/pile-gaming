"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { SiteContent } from "@/lib/content";

type SectionKey = keyof SiteContent;

export type SidebarSection = {
  key: SectionKey;
  label: string;
  description?: string;
};

export function Sidebar({
  sections,
  selected,
  onSelect,
  token,
  onTokenChange,
}: {
  sections: SidebarSection[];
  selected: SectionKey;
  onSelect: (k: SectionKey) => void;
  token: string;
  onTokenChange: (t: string) => void;
}) {
  return (
    <aside className="md:sticky md:top-24 h-max rounded-lg border bg-card p-4">
      <div className="mb-4">
        <Label>Admin Token (optional)</Label>
        <Input
          className="mt-2"
          placeholder="Enter ADMIN_TOKEN"
          value={token}
          onChange={(e) => onTokenChange(e.target.value)}
        />
      </div>
      <div className="mt-2 grid gap-2">
        {sections.map((section) => (
          <Button
            key={section.key}
            variant={selected === section.key ? "default" : "outline"}
            className="flex flex-col items-start gap-1 py-3"
            onClick={() => onSelect(section.key)}
          >
            <span className="text-sm font-medium">{section.label}</span>
            {section.description ? (
              <span className="text-xs text-muted-foreground">
                {section.description}
              </span>
            ) : null}
          </Button>
        ))}
      </div>
    </aside>
  );
}
