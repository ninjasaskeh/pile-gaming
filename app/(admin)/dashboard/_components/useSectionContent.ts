"use client";

import * as React from "react";
import type { SiteContent } from "@/lib/content";
import { setSection } from "../_actions/content";

export type SectionContentManager<K extends keyof SiteContent> = {
  value: SiteContent[K];
  setValue: (value: SiteContent[K]) => void;
  loading: boolean;
  saving: boolean;
  error: string | null;
  successMessage: string | null;
  save: (nextValue?: SiteContent[K]) => Promise<void>;
  refresh: () => Promise<void>;
};

export function useSectionContent<K extends keyof SiteContent>(
  section: K,
  options?: { initial?: SiteContent[K]; skipInitialFetch?: boolean }
): SectionContentManager<K> {
  const [value, setValueState] = React.useState<SiteContent[K]>(
    options?.initial ?? ({} as SiteContent[K])
  );
  const [loading, setLoading] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(
    null
  );

  const timeoutRef = React.useRef<number | null>(null);

  const refresh = React.useCallback(async () => {
    // No-op: fetching disabled; rely on passed initial data.
    return Promise.resolve();
  }, []);

  const setValue = React.useCallback((next: SiteContent[K]) => {
    setValueState((next ?? {}) as SiteContent[K]);
  }, []);

  const scheduleSuccessClear = React.useCallback(() => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      setSuccessMessage(null);
    }, 4000);
  }, []);

  // Admin token removed – no local storage handling needed

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const save = React.useCallback(
    async (nextValue?: SiteContent[K]) => {
      const payload = (nextValue ??
        value ??
        ({} as SiteContent[K])) as SiteContent[K];
      console.log("[useSectionContent.save] start", {
        section,
        payload,
      });
      setSaving(true);
      try {
        await setSection(section, payload as any);
        setError(null);
        setSuccessMessage("Changes saved.");
        scheduleSuccessClear();
        console.log("[useSectionContent.save] success", { section });
      } catch (err) {
        const reason = err as Error;
        setError(reason.message || "Failed to save section.");
        console.error("[useSectionContent.save] error", { section, err });
      } finally {
        setSaving(false);
      }
    },
    [section, scheduleSuccessClear, value]
  );

  return {
    value,
    setValue,
    loading,
    saving,
    error,
    successMessage,
    save,
    refresh,
  };
}
