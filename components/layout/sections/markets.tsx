"use client";
import { Badge } from "@/components/ui/badge";
import WorldMap from "@/components/ui/world-map";
import { SectionHeader } from "@/components/layout/SectionHeader";
import type { MarketsContent } from "@/lib/content";
import { useSectionRevealPreset } from "@/lib/useGsapReveal";

export const MarketsSection = ({ data }: { data?: MarketsContent | null }) => {
  useSectionRevealPreset("markets", "fadeUp");
  const content = data || {};
  const header = content.header || undefined;
  const origin = content.origin || undefined;
  const markets = content.markets || [];
  const dots = (markets || [])
    .filter(
      (m) =>
        m &&
        typeof m.lat === "number" &&
        typeof m.lng === "number" &&
        origin &&
        typeof origin.lat === "number" &&
        typeof origin.lng === "number"
    )
    .map((m) => ({
      start: { lat: origin!.lat!, lng: origin!.lng!, label: origin!.label },
      end: { lat: m.lat!, lng: m.lng!, label: m.label },
    }));

  return (
    <section id="markets" className="container py-24 sm:py-32">
      <SectionHeader data={header} />

      <div className="rounded-xl overflow-hidden bg-muted/30 dark:bg-card/50 gsap-reveal">
        <WorldMap dots={dots} />
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm">
        {(markets || []).map((market) => (
          <Badge
            key={`${market.label}-${market.lat}-${market.lng}`}
            className="px-3 py-1 rounded-full border bg-primary gsap-reveal"
          >
            {market.label}
          </Badge>
        ))}
      </div>
    </section>
  );
};
