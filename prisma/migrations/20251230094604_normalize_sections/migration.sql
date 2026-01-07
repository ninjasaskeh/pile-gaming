-- AlterTable
ALTER TABLE "ContentSection" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- CreateTable
CREATE TABLE "Hero" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "description" TEXT,
    "primaryCtaText" TEXT,
    "primaryCtaHref" TEXT,
    "secondaryCtaText" TEXT,
    "secondaryCtaHref" TEXT,
    "imageUrl" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Hero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SectionHeader" (
    "id" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "kicker" TEXT,
    "title" TEXT,
    "subtitle" TEXT,
    "imageUrl" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SectionHeader_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CapabilityItem" (
    "id" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "icon" TEXT,
    "title" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CapabilityItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BenefitItem" (
    "id" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "icon" TEXT,
    "title" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BenefitItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductLineItem" (
    "id" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "pro" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductLineItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductOverviewItem" (
    "id" TEXT NOT NULL,
    "src" TEXT,
    "title" TEXT,
    "code" TEXT,
    "category" TEXT,
    "description" TEXT,
    "pileHeight" TEXT,
    "weight" TEXT,
    "composition" TEXT,
    "finish" TEXT,
    "color" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductOverviewItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductOverviewTag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,

    CONSTRAINT "ProductOverviewTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MarketPoint" (
    "id" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "label" TEXT,
    "isOrigin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "MarketPoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerLogo" (
    "id" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "src" TEXT,
    "alt" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CustomerLogo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "kicker" TEXT,
    "title" TEXT,
    "description" TEXT,
    "address" TEXT,
    "phone" TEXT,
    "phoneHref" TEXT,
    "email" TEXT,
    "emailHref" TEXT,
    "businessDays" TEXT,
    "businessHours" TEXT,
    "subjectOptions" TEXT,
    "firstNamePh" TEXT,
    "lastNamePh" TEXT,
    "emailPh" TEXT,
    "messagePh" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FaqItem" (
    "id" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "value" TEXT,
    "question" TEXT,
    "answer" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FaqItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Footer" (
    "id" TEXT NOT NULL,
    "brandName" TEXT,
    "address" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "emailHref" TEXT,
    "phoneHref" TEXT,
    "mapEmbedUrl" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Footer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteMetadata" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "url" TEXT,
    "ogImageSrc" TEXT,
    "ogImageWidth" INTEGER,
    "ogImageHeight" INTEGER,
    "ogImageAlt" TEXT,
    "twitterCard" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SiteMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SectionHeader_section_key" ON "SectionHeader"("section");

-- AddForeignKey
ALTER TABLE "ProductOverviewTag" ADD CONSTRAINT "ProductOverviewTag_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "ProductOverviewItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
