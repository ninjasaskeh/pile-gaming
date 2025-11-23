"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SiteContent } from "@/lib/content";
import type { SectionContentManager } from "./useSectionContent";

export type SectionPageShellProps<K extends keyof SiteContent> = {
  title: string;
  description?: string;
  manager: SectionContentManager<K>;
  children: React.ReactNode;
};

export function SectionPageShell<K extends keyof SiteContent>({
  title,
  description,
  manager,
  children,
}: SectionPageShellProps<K>) {
  const { error, successMessage, loading, refresh } = manager;

  return (
    <div className="grid gap-6">
      <header className="grid gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : null}
      </header>

      {/* Admin token removed for simplicity */}

      {successMessage && !error ? (
        <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {successMessage}
        </div>
      ) : null}

      {error ? (
        <div className="flex flex-col gap-3 rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          <span>{error}</span>
          <div>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => {
                void refresh();
              }}
            >
              Retry
            </Button>
          </div>
        </div>
      ) : null}

      {loading ? (
        <div className="flex items-center gap-2 rounded-lg border bg-muted/40 p-4 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading section content…
        </div>
      ) : (
        children
      )}
    </div>
  );
}
