import type { Metadata } from "next";
import dynamicImport from "next/dynamic";
import { BenefitsSection } from "@/components/layout/sections/benefits";
import { ContactSection } from "@/components/layout/sections/contact";
import { FAQSection } from "@/components/layout/sections/faq";
import { CapabilitiesSection } from "@/components/layout/sections/capabilities";
import { FooterSection } from "@/components/layout/sections/footer";
import { HeroSection } from "@/components/layout/sections/hero";
import { ProductsSection } from "@/components/layout/sections/products";
import { ProductOverviewSection } from "@/components/layout/sections/product-overview";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  getAllSections,
  getSection,
} from "../(admin)/dashboard/_actions/content";

const HeaderVideoSection = dynamicImport(
  () =>
    import("@/components/layout/sections/header-video").then(
      (mod) => mod.HeaderVideoSection
    ),
  {
    ssr: false,
    loading: () => null,
  }
);

const MarketsSection = dynamicImport(
  () =>
    import("@/components/layout/sections/markets").then(
      (mod) => mod.MarketsSection
    ),
  {
    loading: () => null,
  }
);

const CustomersSection = dynamicImport(
  () =>
    import("@/components/layout/sections/customers").then(
      (mod) => mod.CustomersSection
    ),
  {
    loading: () => null,
  }
);

export async function generateMetadata(): Promise<Metadata> {
  const siteMeta = await getSection("siteMetadata");
  return {
    title: siteMeta?.title,
    description: siteMeta?.description,
    openGraph: {
      type: "website",
      url: siteMeta?.url,
      title: siteMeta?.title,
      description: siteMeta?.description,
      images: siteMeta?.ogImage?.src
        ? [
            {
              url: siteMeta.ogImage.src,
              width: siteMeta.ogImage.width,
              height: siteMeta.ogImage.height,
              alt: siteMeta.ogImage.alt,
            },
          ]
        : undefined,
    },
    twitter: {
      card: siteMeta?.twitterCard,
      site: siteMeta?.url,
      title: siteMeta?.title,
      description: siteMeta?.description,
      images: siteMeta?.ogImage?.src ? [siteMeta.ogImage.src] : undefined,
    },
  };
}

export const dynamic = "force-dynamic";

export default async function Home() {
  const all = await getAllSections();
  const {
    hero,
    heroCards,
    capabilities,
    benefits,
    products,
    productOverview,
    markets,
    customers,
    contact,
    faq,
    footer,
  } = all;

  return (
    <>
      <Navbar />
      <HeroSection data={hero} cards={heroCards} />
      <HeaderVideoSection />
      <BenefitsSection data={benefits} />
      <ProductsSection data={products} />
      <ProductOverviewSection data={productOverview} />
      {/* Access to full products list */}
      <div className="mt-8 flex justify-center">
        <Button asChild variant="outline">
          <Link href="/products">View All Products</Link>
        </Button>
      </div>
      <MarketsSection data={markets} />
      <CustomersSection data={customers} />
      <ContactSection data={contact} />
      <FAQSection data={faq} />
      <FooterSection data={footer} />
    </>
  );
}
