import { SectionHeader } from "@/components/layout/SectionHeader";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type {
  ProductOverviewContent,
  ProductOverviewItem,
} from "@/lib/content";
import { getSection } from "@/app/(admin)/dashboard/_actions/content";

export const revalidate = 60;

export default async function ProductsPage() {
  const content = (await getSection(
    "productOverview"
  )) as ProductOverviewContent;
  const header = content?.header ?? undefined;
  const items = content?.items ?? [];

  return (
    <section className="relative py-10 sm:py-16 lg:py-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-primary/10 via-background to-transparent" />
      <div className="container relative pb-24 sm:pb-32">
        <div className="mb-4 sm:mb-6 flex items-center justify-between gap-3">
          <Button asChild variant="ghost" size="sm">
            <Link href="/">← Back to homepage</Link>
          </Button>
          <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
            Showing <span className="font-semibold">{items.length}</span>{" "}
            products
          </p>
        </div>
        <SectionHeader data={header} />
        <ProductsGrid items={items ?? []} />
      </div>
    </section>
  );
}

function ProductsGrid({ items }: { items: ProductOverviewItem[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <ProductCard key={item.code ?? item.title} item={item} />
      ))}
    </div>
  );
}
