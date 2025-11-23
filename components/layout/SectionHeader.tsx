"use client";

import * as React from "react";
import type {
  SectionHeader as SectionHeaderType,
  SiteContent,
} from "@/lib/content";

type Key = Exclude<keyof SiteContent, "hero">;

export function SectionHeader({
  fallback,
  align = "center",
  data: dataProp,
}: {
  fallback: Required<Pick<SectionHeaderType, "kicker" | "title" | "subtitle">>;
  align?: "left" | "center";
  data?: SectionHeaderType | null;
}) {
  const source = dataProp || null;
  const kicker = source?.kicker || fallback.kicker;
  const title = source?.title || fallback.title;
  const subtitle = source?.subtitle || fallback.subtitle;
  const textCenter = align === "center" ? "text-center" : "text-left";

  return (
    <div className={`${textCenter} mb-10`}>
      {kicker ? (
        <h2 className="text-lg text-primary mb-2 tracking-wider gsap-reveal">
          {kicker}
        </h2>
      ) : null}
      {title ? (
        <h3 className="text-3xl md:text-4xl font-bold mb-2 gsap-reveal">
          {title}
        </h3>
      ) : null}
      {subtitle ? (
        <p className="text-muted-foreground max-w-2xl mx-auto gsap-reveal">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
