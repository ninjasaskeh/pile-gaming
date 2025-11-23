import { SectionHeader } from "@/components/layout/SectionHeader";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type {
  ProductOverviewContent,
  ProductOverviewItem,
} from "@/lib/content";
import { PRODUCT_OVERVIEW_CONTENT } from "@/constants";
import { getSection } from "@/app/(admin)/dashboard/_actions/content";

export const revalidate = 60;

export default async function ProductsPage() {
  const content = (await getSection(
    "productOverview"
  )) as ProductOverviewContent;
  const header = content?.header ?? PRODUCT_OVERVIEW_CONTENT.header;
  const items = content?.items ?? PRODUCT_OVERVIEW_CONTENT.items;

  return (
    <div className="container pt-8 sm:pt-12 pb-24 sm:pb-32">
      <div className="mb-4 sm:mb-6">
        <Button asChild variant="ghost">
          <Link href="/">Back</Link>
        </Button>
      </div>
      <SectionHeader data={header} fallback={PRODUCT_OVERVIEW_CONTENT.header} />
      <ProductsGrid items={items ?? []} />
    </div>
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
