"use client";

import { useSectionRevealPreset } from "@/lib/useGsapReveal";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/layout/SectionHeader";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PRODUCTS_SECTION_CONTENT } from "@/constants";
import type { ProductsContent } from "@/lib/content";
import Link from "next/link";

export const ProductsSection = ({
  data,
}: {
  data?: ProductsContent | null;
}) => {
  useSectionRevealPreset("services", "fadeUp");
  const content = data || {};
  const header = content.header || PRODUCTS_SECTION_CONTENT.header;
  const items = content.items || PRODUCTS_SECTION_CONTENT.items;

  return (
    <section id="services" className="container py-24 sm:py-32">
      <SectionHeader data={header} fallback={PRODUCTS_SECTION_CONTENT.header} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"></div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 w-full lg:w-[60%] mx-auto">
        {items?.map(({ title, description, pro }) => (
          <Card
            key={title}
            className="bg-muted/60 dark:bg-card h-full relative gsap-reveal"
          >
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <Badge
              data-pro={pro}
              variant="secondary"
              className="absolute -top-2 -right-3 data-[pro=false]:hidden"
            >
              PRO
            </Badge>
          </Card>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Link
          href="/products"
          className="text-primary hover:underline underline-offset-4"
          aria-label="See all products"
        >
          See all →
        </Link>
      </div>
    </section>
  );
};
