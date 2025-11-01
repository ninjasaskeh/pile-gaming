import { BenefitsSection } from "@/components/layout/sections/benefits";
import { ContactSection } from "@/components/layout/sections/contact";
import { FAQSection } from "@/components/layout/sections/faq";
import { CapabilitiesSection } from "@/components/layout/sections/capabilities";
import { FooterSection } from "@/components/layout/sections/footer";
import { HeroSection } from "@/components/layout/sections/hero";
import { ProductsSection } from "@/components/layout/sections/products";
import { CustomersSection } from "@/components/layout/sections/customers";
import { MarketsSection } from "@/components/layout/sections/markets";
import { ProductOverviewSection } from "@/components/layout/sections/product-overview";
import { Navbar } from "@/components/layout/navbar";

export const metadata = {
  title: "PT. Putra Pile Indah — Acrylic Imitation Fur Manufacturer",
  description:
    "A manufacturer of acrylic imitation fur since 1991 in South Cikarang. Product lines: Hi Pile, Boa, Polyester. Capacity up to 500,000 yards/month with strict quality control and on-time delivery.",
  openGraph: {
    type: "website",
    url: "https://putrapile.com",
    title: "PT. Putra Pile Indah — Acrylic Imitation Fur Manufacturer",
    description:
      "Manufacturer of acrylic imitation fur since 1991. Product lines: Hi Pile, Boa, Polyester.",
    images: [
      {
        url: "/demo-img.jpg",
        width: 1200,
        height: 630,
        alt: "PT. Putra Pile Indah",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "https://putrapile.com",
    title: "PT. Putra Pile Indah",
    description:
      "Manufacturer of acrylic imitation fur since 1991. Capacity up to 500,000 yards/month.",
    images: ["/demo-img.jpg"],
  },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <CapabilitiesSection />
      <BenefitsSection />
      <ProductsSection />
      <ProductOverviewSection />
      <MarketsSection />
      <CustomersSection />
      <ContactSection />
      <FAQSection />
      <FooterSection />
    </>
  );
}
