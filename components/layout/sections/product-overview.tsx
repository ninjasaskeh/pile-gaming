"use client";
import Image from "next/image";
import { SectionHeader } from "@/components/layout/SectionHeader";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PRODUCT_OVERVIEW_CONTENT } from "@/constants";
import type { ProductOverviewContent } from "@/lib/content";
import { useSectionRevealPreset } from "@/lib/useGsapReveal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const ProductOverviewSection = ({
  data,
}: {
  data?: ProductOverviewContent | null;
}) => {
  useSectionRevealPreset("product-overview", "fadeUp");
  const content = data || {};
  const header = content.header || PRODUCT_OVERVIEW_CONTENT.header;
  const items = content.items || PRODUCT_OVERVIEW_CONTENT.items;

  return (
    <section id="product-overview" className="container py-24 sm:py-32">
      <SectionHeader data={header} fallback={PRODUCT_OVERVIEW_CONTENT.header} />

      <Carousel
        opts={{
          align: "start",
        }}
        className="relative w-[80%] sm:w-[90%] lg:max-w-screen-xl mx-auto gsap-reveal"
      >
        <CarouselContent>
          {items?.map((p) => (
            <CarouselItem
              key={p.code}
              className="md:basis-1/2 lg:basis-1/3 gsap-reveal"
            >
              <ProductCard {...p} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};

import type { ProductOverviewItem } from "@/lib/content";

const ProductCard = (item: ProductOverviewItem) => {
  const {
    src = "/favicon.ico",
    title = "Untitled",
    category = "Acrylic Fur",
    description,
    specs,
    tags,
  } = item;

  const toTagsArray = (val: unknown): string[] => {
    if (Array.isArray(val)) {
      return (val as unknown[]).flatMap((v) =>
        typeof v === "string" ? v.split(",") : []
      );
    }
    if (typeof val === "string") return (val as string).split(",");
    return [];
  };
  const normalizedTags = toTagsArray((item as any).tags)
    .map((s: string) => s.trim())
    .filter(Boolean);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="overflow-hidden border border-border/50 rounded-xl shadow-sm cursor-pointer">
          {/* Swatch (image) */}
          <div className="relative w-full aspect-[4/3] overflow-hidden">
            <Image
              src={src}
              alt={title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover select-none"
              loading="lazy"
              fetchPriority="low"
            />
          </div>
          {/* Label */}
          <div className="p-4 bg-white dark:bg-neutral-900">
            <div className="flex items-center justify-between gap-3">
              <CardTitle className="text-base leading-tight">{title}</CardTitle>
              <Badge variant="outline" className="text-xs">
                {category}
              </Badge>
            </div>
            {description && (
              <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
                {description}
              </p>
            )}
            {(specs || normalizedTags.length) && (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {specs?.pileHeight && (
                  <Badge variant="secondary" className="text-[10px]">
                    {specs.pileHeight}
                  </Badge>
                )}
                {specs?.weight && (
                  <Badge variant="secondary" className="text-[10px]">
                    {specs.weight}
                  </Badge>
                )}
                {specs?.composition && (
                  <Badge variant="secondary" className="text-[10px]">
                    {specs.composition}
                  </Badge>
                )}
                {specs?.finish && (
                  <Badge variant="secondary" className="text-[10px]">
                    {specs.finish}
                  </Badge>
                )}
                {specs?.color && (
                  <Badge variant="secondary" className="text-[10px]">
                    {specs.color}
                  </Badge>
                )}
                {normalizedTags.map((t: string) => (
                  <Badge key={t} variant="secondary" className="text-[10px]">
                    {t}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src={src}
              alt={title}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <DialogTitle className="flex items-center justify-between gap-2">
              <span>{title}</span>
              <Badge variant="outline" className="text-xs">
                {category}
              </Badge>
            </DialogTitle>
            {description && (
              <DialogDescription className="mt-2">
                {description}
              </DialogDescription>
            )}
            {(specs || normalizedTags.length) && (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {specs?.pileHeight && (
                  <Badge variant="secondary" className="text-[10px]">
                    {specs.pileHeight}
                  </Badge>
                )}
                {specs?.weight && (
                  <Badge variant="secondary" className="text-[10px]">
                    {specs.weight}
                  </Badge>
                )}
                {specs?.composition && (
                  <Badge variant="secondary" className="text-[10px]">
                    {specs.composition}
                  </Badge>
                )}
                {specs?.finish && (
                  <Badge variant="secondary" className="text-[10px]">
                    {specs.finish}
                  </Badge>
                )}
                {specs?.color && (
                  <Badge variant="secondary" className="text-[10px]">
                    {specs.color}
                  </Badge>
                )}
                {normalizedTags.map((t: string) => (
                  <Badge key={t} variant="secondary" className="text-[10px]">
                    {t}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
