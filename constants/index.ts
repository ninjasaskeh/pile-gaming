import type {
  HeroContent,
  SectionHeader as SectionHeaderContent,
} from "../lib/content";

type SectionHeaderCopy = Required<
  Pick<SectionHeaderContent, "kicker" | "title" | "subtitle">
>;

type HeroCardCopy = {
  testimonial: {
    title: string;
    subtitle: string;
    quote: string;
  };
  company: {
    title: string;
    subtitle: string;
    description: string;
    logoSrc: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
  capacity: {
    title: string;
    subtitle: string;
    metrics: string[];
  };
  productLines: {
    title: string;
    description: string;
    badges: string[];
  };
};

type FeatureCopy = {
  icon: string;
  title: string;
  description: string;
};

type ContactContent = {
  kicker: string;
  title: string;
  description: string;
  address: string;
  phone: string;
  phoneHref: string;
  email: string;
  emailHref: string;
  businessHours: {
    days: string;
    hours: string;
  };
  subjectOptions: string[];
  formPlaceholders: {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
  };
};

type ProductOverviewItem = {
  src: string;
  title: string;
  code: string;
  category?: string;
  description?: string;
  specs?: {
    pileHeight?: string;
    weight?: string;
    composition?: string;
    finish?: string;
    color?: string;
  };
  tags?: string[];
};

type MarketPoint = {
  lat: number;
  lng: number;
  label: string;
};

type FooterContent = {
  brandName: string;
  address: string;
  email: string;
  phone: string;
  emailHref: string;
  phoneHref: string;
  mapEmbedUrl: string;
};

type SiteMetadataCopy = {
  title: string;
  description: string;
  url: string;
  ogImage: {
    src: string;
    width: number;
    height: number;
    alt: string;
  };
  twitterCard: "summary" | "summary_large_image";
};

export const COMPANY_INFO = {
  legalName: "PT. Putra Pile Indah",
  displayName: "Putra Pile Indah",
  tagline: "Acrylic Imitation Fur Fabrics Manufacturer",
  description:
    "The leading manufacturer since 1991. Products: Hi Pile, Boa & Polyester. Located in Cikarang Selatan, Bekasi, Indonesia.",
  established: "Established 1991 · Cikarang, Indonesia",
  address:
    "BIIE Blok C5-1, Sukadami, Cikarang Selatan, Bekasi, Jawa Barat 17550",
  email: "putrapile.info@gmail.com",
  phone: "(021) 8972255 (Hunting)",
  phoneHref: "tel:+62218972255",
  emailHref: "mailto:putrapile.info@gmail.com",
  mapEmbedUrl:
    "https://www.google.com/maps/embed/v1/place?key=AIzaSyB2NIWI3Tv9iDPrlnowr_0ZqZWoAQydKJU&q=PT.%20Putra%20Pile%20Indah%2C%20Jalan%20Inti%20II%2C%20Cibatu%2C%20Bekasi%20Regency%2C%20West%20Java%2C%20Indonesia&maptype=roadmap",
};

export const SITE_METADATA_CONTENT: SiteMetadataCopy = {
  title: `${COMPANY_INFO.legalName} — ${COMPANY_INFO.tagline}`,
  description: COMPANY_INFO.description,
  url: "https://putrapile.com",
  ogImage: {
    src: "/demo-img.jpg",
    width: 1200,
    height: 630,
    alt: COMPANY_INFO.legalName,
  },
  twitterCard: "summary_large_image",
};

export const NAVIGATION_LINKS = [
  { href: "#hero", label: "Home" },
  { href: "#product-overview", label: "Products" },
  { href: "#contact", label: "Contact" },
  { href: "#faq", label: "FAQ" },
];

export const HERO_FALLBACK_CONTENT: HeroContent = {
  title: COMPANY_INFO.legalName,
  subtitle: COMPANY_INFO.tagline,
  description: COMPANY_INFO.description,
  primaryCtaText: "Contact Us",
  primaryCtaHref: "#contact",
  secondaryCtaText: "View Products",
  secondaryCtaHref: "#services",
  imageUrl: "/pile-logo.png",
};

export const HERO_CARDS_CONTENT: HeroCardCopy = {
  testimonial: {
    title: "Quality & Reliability",
    subtitle: "Manufacturing Partner",
    quote:
      "Consistent acrylic imitation fur fabrics, batch after batch. Great communication and on-time delivery.",
  },
  company: {
    title: COMPANY_INFO.legalName,
    subtitle: COMPANY_INFO.established,
    description:
      "High-quality acrylic imitation fur fabrics for plush toys, garments, home textiles, and paint rollers.",
    logoSrc: "/pile-logo.png",
    primaryCta: { label: "View Products", href: "#services" },
    secondaryCta: { label: "Contact", href: "#contact" },
  },
  capacity: {
    title: "Production Capacity",
    subtitle: "Scalable output with quality-focused operations.",
    metrics: [
      "500,000 yards/month",
      "266 machines in operation",
      "500+ skilled workers",
    ],
  },
  productLines: {
    title: "Product Lines",
    description: "Acrylic imitation fur fabrics in multiple constructions.",
    badges: ["Hi Pile", "Boa", "Polyester"],
  },
};

export const CAPABILITIES_CONTENT = {
  kicker: "Capabilities",
  title: "What Sets Us Apart",
  description:
    "Consistent quality, high capacity, and on-time delivery—backed by robust facilities and experienced teams.",
  items: [
    {
      icon: "Factory",
      title: "266 Production Machines",
      description:
        "Large-scale, standardized production lines for stable quality and flexible volume.",
    },
    {
      icon: "Gauge",
      title: "500,000 Yards/Month",
      description:
        "High capacity to fulfill large or recurring orders with competitive lead times.",
    },
    {
      icon: "Users",
      title: "> 500 Employees",
      description:
        "Experienced teams across knitting, dyeing, finishing, and QA/QC stages.",
    },
    {
      icon: "ShieldCheck",
      title: "Strict Quality Control",
      description:
        "Batch-by-batch inspection to ensure uniform texture, color, and durability to spec.",
    },
    {
      icon: "Globe",
      title: "Wide Export Network",
      description:
        "Shipping across Asia, Europe, Africa, Australia, and North America (US, Japan, Germany, etc.).",
    },
    {
      icon: "Palette",
      title: "Color & Texture Customization",
      description:
        "R&D support for OEM/ODM needs: density, pile height, handfeel, and finishing.",
    },
  ] satisfies FeatureCopy[],
};

export const BENEFITS_CONTENT = {
  kicker: "Benefits",
  title: "Why Choose Us",
  description:
    "We help brands and manufacturers meet quality standards and volume targets with consistent outcomes and reliable timelines.",
  items: [
    {
      icon: "Shield",
      title: "Consistent Quality",
      description:
        "International standards, periodic inspections, and continuously updated documentation.",
    },
    {
      icon: "Clock",
      title: "On-time Delivery",
      description:
        "Scheduled processes from knitting to finishing to ensure predictable lead times.",
    },
    {
      icon: "Factory",
      title: "High Capacity",
      description:
        "266 machines and 500+ employees support large volumes and diverse SKUs.",
    },
    {
      icon: "Handshake",
      title: "Long-term Partnerships",
      description:
        "Trusted by global and regional brands in toys and textiles.",
    },
  ] satisfies FeatureCopy[],
};

export const PRODUCTS_SECTION_CONTENT = {
  header: {
    kicker: "Product Lines",
    title: "Acrylic Imitation Fur Fabrics",
    subtitle:
      "Fur fabric solutions for plush toys, apparel, home textiles, and industrial applications.",
  } satisfies SectionHeaderCopy,
  items: [
    {
      title: "Hi Pile",
      description:
        "Long-pile, ultra-soft fabric for premium plush toys and fashion accessories.",
      pro: false,
    },
    {
      title: "Boa",
      description:
        "Short, dense pile that's easy to maintain. Ideal for plush toys, jacket linings, and home textiles.",
      pro: false,
    },
    {
      title: "Polyester",
      description:
        "Durable fiber for industrial applications including paint rollers with even paint distribution.",
      pro: false,
    },
    {
      title: "Color & Texture Customization",
      description:
        "R&D support to match color, density, and finishing to your specifications.",
      pro: true,
    },
  ],
};

export const PRODUCT_OVERVIEW_CONTENT = {
  header: {
    kicker: "Product Overview",
    title: "Explore Our Featured Fabrics",
    subtitle:
      "A snapshot of our acrylic imitation fur constructions used in toys, garments, home textiles and paint rollers.",
  } satisfies SectionHeaderCopy,
  items: [
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
  ] satisfies ProductOverviewItem[],
};

export const MARKETS_CONTENT = {
  header: {
    kicker: "Current Export Markets",
    title: "Shipping From Indonesia To The World",
    subtitle:
      "Visualizing representative routes from our factory in Cikarang, Indonesia to key client destinations.",
  } satisfies SectionHeaderCopy,
  origin: { lat: -24.208763, lng: 109.845599, label: "Jakarta" },
  markets: [
    { lat: 31.052235, lng: -100.243683, label: "USA" },
    { lat: 23.676393, lng: 139.650311, label: "Japan" },
    { lat: 22.566535, lng: 127.877969, label: "Korea" },
    { lat: 39.9042, lng: 116.407396, label: "China" },
    { lat: -7.599512, lng: 124.984222, label: "Filipina" },
    { lat: 4.027763, lng: 105.83416, label: "Vietnam" },
    { lat: 9.756331, lng: 95.501765, label: "Thailand" },
    { lat: -43.280937, lng: 135.130009, label: "Australia" },
    { lat: 18.684422, lng: 65.047882, label: "Pakistan" },
    { lat: 40.520008, lng: 9.404954, label: "Germany" },
    { lat: 30.376888, lng: 9.541694, label: "Switzerland" },
    { lat: 45.229676, lng: 17.012229, label: "Poland" },
    { lat: -35.87919, lng: 47.507905, label: "Madagascar" },
  ] satisfies MarketPoint[],
};

export const CUSTOMERS_CONTENT = {
  header: {
    kicker: "Customer",
    title: "Our Customer",
    subtitle: "",
  } satisfies SectionHeaderCopy,
  logos: [
    { src: "/customer/Barbie_Logo.svg", alt: "Barbie" },
    { src: "/customer/Target-logo.svg", alt: "Target" },
    { src: "/customer/ikea.png", alt: "IKEA" },
    { src: "/customer/keycraft-logo.png", alt: "Keycraft" },
    { src: "/customer/DOUGLAS-LOGO.png", alt: "Douglas" },
    { src: "/customer/living_puppets_logo.webp", alt: "Living Puppets" },
    { src: "/customer/logo-living-nature.png", alt: "Living Nature" },
    { src: "/customer/parkstoy.png", alt: "Parks Toy" },
    { src: "/customer/squishable_logo.png", alt: "Squishable" },
    { src: "/customer/toy-sense.jpeg", alt: "Toy Sense" },
    { src: "/customer/Danu_FINALLOGO.webp", alt: "Danu" },
    { src: "/customer/nature-planet logo.webp", alt: "Nature Planet" },
    { src: "/customer/sekiguchi.jpg", alt: "Sekiguchi" },
  ],
};

export const CONTACT_CONTENT: ContactContent = {
  kicker: "Contact",
  title: "Get in Touch",
  description:
    "For quotes, sample requests, or technical information, contact us via this form or the details below.",
  address: COMPANY_INFO.address,
  phone: COMPANY_INFO.phone,
  phoneHref: COMPANY_INFO.phoneHref,
  email: COMPANY_INFO.email,
  emailHref: COMPANY_INFO.emailHref,
  businessHours: {
    days: "Monday - Friday",
    hours: "08:00 - 16:00 WIB",
  },
  subjectOptions: [
    "Sample Request",
    "Quotation",
    "Technical Specifications",
    "Production & Delivery Time",
    "OEM/ODM Partnership",
  ],
  formPlaceholders: {
    firstName: "Leopoldo",
    lastName: "Miranda",
    email: "leomirandadev@gmail.com",
    message: "Tell us about your needs or questions...",
  },
};

export const FAQ_CONTENT = {
  kicker: "FAQ",
  title: "Common Questions",
  items: [
    {
      value: "item-1",
      question: "What is the MOQ (minimum order quantity)?",
      answer:
        "MOQ varies by specifications (pile height, density, color). Please contact us for an estimate that fits your needs.",
    },
    {
      value: "item-2",
      question: "What is the production lead time?",
      answer:
        "Typical lead time is 3–6 weeks after order confirmation and sample/color approval, depending on volume and complexity.",
    },
    {
      value: "item-3",
      question: "Do you support custom colors and textures?",
      answer:
        "Yes. Our R&D team supports color lab dips, handfeel, pile height, and density customization to spec.",
    },
    {
      value: "item-4",
      question: "Which countries do you export to?",
      answer:
        "We ship across Asia, Europe, Africa, Australia, and North America (US, Japan, Korea, Germany, etc.).",
    },
    {
      value: "item-5",
      question: "What about quality certifications?",
      answer:
        "We comply with international quality standards; certification documents are available (site placeholders) and updated regularly.",
    },
  ],
};

export const FOOTER_CONTENT: FooterContent = {
  brandName: COMPANY_INFO.legalName,
  address: COMPANY_INFO.address,
  email: COMPANY_INFO.email,
  phone: COMPANY_INFO.phone,
  emailHref: COMPANY_INFO.emailHref,
  phoneHref: COMPANY_INFO.phoneHref,
  mapEmbedUrl: COMPANY_INFO.mapEmbedUrl,
};
