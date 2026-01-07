import { Badge } from "@/components/ui/badge";
import { Card, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import type { ProductOverviewItem } from "@/lib/content";

// Shared ProductCard component used by products and gallery pages.
export function ProductCard({ item }: { item: ProductOverviewItem }) {
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
  const normalizedTags = toTagsArray(tags)
    .map((s: string) => s.trim())
    .filter(Boolean);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="group overflow-hidden border border-border/50 rounded-xl shadow-sm cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/40">
          <div className="relative w-full aspect-[4/3] overflow-hidden">
            <Image
              src={src}
              alt={title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover select-none transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              fetchPriority="low"
            />
          </div>
          <div className="p-4 bg-white dark:bg-neutral-900">
            <div className="flex items-center justify-between gap-3">
              <CardTitle className="text-base leading-tight transition-colors group-hover:text-primary">
                {title}
              </CardTitle>
              <Badge
                variant="outline"
                className="text-xs transition-colors group-hover:border-primary/60 group-hover:text-primary"
              >
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
}
