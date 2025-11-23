import type { Metadata } from "next";
import { BenefitsSection } from "@/components/layout/sections/benefits";
import { ContactSection } from "@/components/layout/sections/contact";
import { FAQSection } from "@/components/layout/sections/faq";
import { CapabilitiesSection } from "@/components/layout/sections/capabilities";
import { FooterSection } from "@/components/layout/sections/footer";
import { HeroSection } from "@/components/layout/sections/hero";
import { HeaderVideoSection } from "@/components/layout/sections/header-video";
import { ProductsSection } from "@/components/layout/sections/products";
import { CustomersSection } from "@/components/layout/sections/customers";
import { MarketsSection } from "@/components/layout/sections/markets";
import { ProductOverviewSection } from "@/components/layout/sections/product-overview";
import { Navbar } from "@/components/layout/navbar";
import { SITE_METADATA_CONTENT } from "@/constants";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  getAllSections,
  getSection,
} from "../(admin)/dashboard/_actions/content";

export async function generateMetadata(): Promise<Metadata> {
  const siteMeta = await getSection("siteMetadata");
  const meta = siteMeta || SITE_METADATA_CONTENT;
  return {
    title: meta.title || SITE_METADATA_CONTENT.title,
    description: meta.description || SITE_METADATA_CONTENT.description,
    openGraph: {
      type: "website",
      url: meta.url || SITE_METADATA_CONTENT.url,
      title: meta.title || SITE_METADATA_CONTENT.title,
      description: meta.description || SITE_METADATA_CONTENT.description,
      images: meta.ogImage?.src
        ? [
            {
              url: meta.ogImage.src,
              width: meta.ogImage.width || SITE_METADATA_CONTENT.ogImage.width,
              height:
                meta.ogImage.height || SITE_METADATA_CONTENT.ogImage.height,
              alt: meta.ogImage.alt || SITE_METADATA_CONTENT.ogImage.alt,
            },
          ]
        : [
            {
              url: SITE_METADATA_CONTENT.ogImage.src,
              width: SITE_METADATA_CONTENT.ogImage.width,
              height: SITE_METADATA_CONTENT.ogImage.height,
              alt: SITE_METADATA_CONTENT.ogImage.alt,
            },
          ],
    },
    twitter: {
      card: meta.twitterCard || SITE_METADATA_CONTENT.twitterCard,
      site: meta.url || SITE_METADATA_CONTENT.url,
      title: meta.title || SITE_METADATA_CONTENT.title,
      description: meta.description || SITE_METADATA_CONTENT.description,
      images: [meta.ogImage?.src || SITE_METADATA_CONTENT.ogImage.src],
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
      <CapabilitiesSection data={capabilities} />
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
