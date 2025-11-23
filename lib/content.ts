export type HeroContent = {
  title: string;
  subtitle: string;
  description?: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  imageUrl?: string;
};

export type SectionHeader = {
  kicker?: string;
  title?: string;
  subtitle?: string;
  imageUrl?: string;
};

export type FeatureItem = {
  icon?: string;
  title?: string;
  description?: string;
};

export type CapabilitiesContent = {
  kicker?: string;
  title?: string;
  description?: string;
  items?: FeatureItem[];
};

export type BenefitsContent = {
  kicker?: string;
  title?: string;
  description?: string;
  items?: FeatureItem[];
};

export type HeroCardsContent = {
  testimonial?: {
    title?: string;
    subtitle?: string;
    quote?: string;
  };
  company?: {
    title?: string;
    subtitle?: string;
    description?: string;
    logoSrc?: string;
    primaryCta?: { label?: string; href?: string };
    secondaryCta?: { label?: string; href?: string };
  };
  capacity?: {
    title?: string;
    subtitle?: string;
    metrics?: string[];
  };
  productLines?: {
    title?: string;
    description?: string;
    badges?: string[];
  };
};

export type ProductItem = {
  title?: string;
  description?: string;
  pro?: boolean;
};

export type ProductsContent = {
  header?: SectionHeader;
  items?: ProductItem[];
};

export type ProductOverviewItem = {
  src?: string;
  title?: string;
  code?: string;
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

export type ProductOverviewContent = {
  header?: SectionHeader;
  items?: ProductOverviewItem[];
};

export type MarketPoint = {
  lat?: number;
  lng?: number;
  label?: string;
};

export type MarketsContent = {
  header?: SectionHeader;
  origin?: MarketPoint;
  markets?: MarketPoint[];
};

export type CustomerLogo = {
  src?: string;
  alt?: string;
};

export type CustomersContent = {
  header?: SectionHeader;
  logos?: CustomerLogo[];
};

export type ContactContent = {
  kicker?: string;
  title?: string;
  description?: string;
  address?: string;
  phone?: string;
  phoneHref?: string;
  email?: string;
  emailHref?: string;
  businessHours?: {
    days?: string;
    hours?: string;
  };
  subjectOptions?: string[];
  formPlaceholders?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    message?: string;
  };
};

export type FaqItem = {
  value?: string;
  question?: string;
  answer?: string;
};

export type FaqContent = {
  kicker?: string;
  title?: string;
  items?: FaqItem[];
};

export type FooterContent = {
  brandName?: string;
  address?: string;
  email?: string;
  phone?: string;
  emailHref?: string;
  phoneHref?: string;
  mapEmbedUrl?: string;
};

export type SiteMetadataContent = {
  title?: string;
  description?: string;
  url?: string;
  ogImage?: {
    src?: string;
    width?: number;
    height?: number;
    alt?: string;
  };
  twitterCard?: "summary" | "summary_large_image";
};

export type SiteContent = {
  hero?: HeroContent;
  heroCards?: HeroCardsContent;
  capabilities?: CapabilitiesContent;
  benefits?: BenefitsContent;
  products?: ProductsContent;
  productOverview?: ProductOverviewContent;
  markets?: MarketsContent;
  customers?: CustomersContent;
  contact?: ContactContent;
  faq?: FaqContent;
  footer?: FooterContent;
  siteMetadata?: SiteMetadataContent;
  productsHeader?: SectionHeader;
  productOverviewHeader?: SectionHeader;
  marketsHeader?: SectionHeader;
  customersHeader?: SectionHeader;
};

// fetchContent removed – content now loaded via Next.js server actions.
