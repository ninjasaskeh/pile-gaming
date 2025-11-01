"use client";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Product = {
  src: string;
  title: string;
  code: string;
  category?: string;
  description?: string;
  specs?: {
    pileHeight?: string; // mm
    weight?: string; // gsm
    composition?: string; // e.g., 70% Acrylic / 30% Polyester
    finish?: string; // e.g., Sheared, Heat-set
    color?: string; // e.g., Lab dip available
  };
  tags?: string[];
};

const products: Product[] = [
  {
    src: "/products/PRODUCT-1.jpg",
    title: "Hi Pile — Soft Plush",
    code: "PP-HP-001",
    category: "Hi Pile",
    description:
      "Long-pile acrylic fur with ultra-soft handfeel for premium plush toys and apparel.",
    specs: {
      pileHeight: "20–25 mm",
      weight: "420 gsm",
      composition: "70% Acrylic / 30% Polyester",
      finish: "Sheared",
      color: "Lab dip available",
    },
    tags: ["Toys", "Apparel"],
  },
  {
    src: "/products/PRODUCT-2.jpg",
    title: "Hi Pile — Dense Loft",
    code: "PP-HP-002",
    category: "Hi Pile",
    description:
      "Dense, lofty pile height for rich volume and consistent texture across batches.",
    specs: {
      pileHeight: "18–22 mm",
      weight: "450 gsm",
      composition: "Acrylic Blend",
      finish: "Heat-set",
      color: "Custom colors",
    },
    tags: ["Toys", "Home"],
  },
  {
    src: "/products/PRODUCT-3.jpg",
    title: "Boa — Short Pile",
    code: "PP-BOA-003",
    category: "Boa",
    description:
      "Short, even pile that’s easy to maintain; ideal for plush toys and jacket linings.",
    specs: {
      pileHeight: "6–10 mm",
      weight: "300 gsm",
      composition: "Acrylic / Polyester",
      finish: "Sheared",
      color: "Standard palette",
    },
    tags: ["Toys", "Apparel"],
  },
  {
    src: "/products/PRODUCT-4.jpg",
    title: "Boa — Uniform Texture",
    code: "PP-BOA-004",
    category: "Boa",
    description:
      "Balanced density with a smooth surface for garments and home textiles.",
    specs: {
      pileHeight: "8–12 mm",
      weight: "320 gsm",
      composition: "Acrylic / Polyester",
      finish: "Brushed",
      color: "Pantone match",
    },
    tags: ["Apparel", "Home"],
  },
  {
    src: "/products/PRODUCT-5.jpg",
    title: "Polyester — Roller Grade",
    code: "PP-PES-005",
    category: "Polyester",
    description:
      "Industrial-grade polyester pile designed for even paint pickup and distribution.",
    specs: {
      pileHeight: "4–12 mm",
      weight: "280 gsm",
      composition: "100% Polyester",
      finish: "Heat-bonded",
      color: "Natural / White",
    },
    tags: ["Industrial", "Paint Rollers"],
  },
  {
    src: "/products/PRODUCT-6.jpg",
    title: "Polyester — Durable Blend",
    code: "PP-PES-006",
    category: "Polyester",
    description:
      "Durable fibers for long-term use in industrial and high-wear applications.",
    specs: {
      pileHeight: "8–14 mm",
      weight: "350 gsm",
      composition: "Polyester Blend",
      finish: "Heat-set",
      color: "Custom by request",
    },
    tags: ["Industrial", "Home"],
  },
];

export const ProductOverviewSection = () => {
  return (
    <section id="product-overview" className="container py-24 sm:py-32">
      <div className="text-center mb-10">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
          Product Overview
        </h2>

        <h3 className="text-3xl md:text-4xl text-center font-bold mb-2">
          Explore Our Featured Fabrics
        </h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          A snapshot of our acrylic imitation fur constructions used in toys,
          garments, home textiles and paint rollers.
        </p>
      </div>

      <Carousel
        opts={{
          align: "start",
        }}
        className="relative w-[80%] sm:w-[90%] lg:max-w-screen-xl mx-auto"
      >
        <CarouselContent>
          {products.map((p) => (
            <CarouselItem key={p.code} className="md:basis-1/2 lg:basis-1/3">
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

const ProductCard = ({
  src,
  title,
  category = "Acrylic Fur",
  description,
  specs,
  tags,
}: Product) => {
  return (
    <Card className="overflow-hidden border border-border/50 rounded-xl shadow-sm">
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
        {(specs || tags) && (
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
            {tags?.map((t) => (
              <Badge key={t} variant="secondary" className="text-[10px]">
                {t}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};
