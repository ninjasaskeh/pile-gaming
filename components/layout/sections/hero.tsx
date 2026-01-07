"use client";
import { buttonVariants } from "@/components/ui/button";
import { HeroCards } from "../HeroCards";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type {
  HeroContent as HeroContentType,
  HeroCardsContent,
} from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

export const HeroSection = ({
  data,
  cards,
}: {
  data?: HeroContentType | null;
  cards?: HeroCardsContent | null;
}) => {
  useEffect(() => {
    const items = gsap.utils.toArray<HTMLElement>("#hero .gsap-reveal");
    if (!items.length) return;
    gsap.set(items, { x: -28, opacity: 0 });
    ScrollTrigger.create({
      trigger: document.querySelector("#hero") || items,
      start: "top 85%",
      onEnter: () => {
        gsap.to(items, {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.06,
          ease: "power2.out",
        });
      },
      once: true,
    });
  }, []);

  const heroData = data || null;
  const title = heroData?.title || "";
  const subtitle = heroData?.subtitle || "";
  const description = heroData?.description || "";
  const primaryCtaHref = heroData?.primaryCtaHref || "#";
  const primaryCtaText = heroData?.primaryCtaText || "";
  const secondaryCtaHref = heroData?.secondaryCtaHref || "#";
  const secondaryCtaText = heroData?.secondaryCtaText || "";

  return (
    <section
      id="hero"
      className="container grid gap-10 py-20 lg:grid-cols-2 place-items-center md:py-32"
    >
      <div className="space-y-6 text-center lg:text-start">
        <main className="text-5xl font-bold md:text-6xl gsap-reveal font-display">
          <h1 className="inline">
            <span className="inline text-transparent bg-clip-text bg-gradient-to-b from-primary/60 to-primary">
              {title}
            </span>
          </h1>
          <h2 className="block mt-2">{subtitle}</h2>
        </main>

        <p className="mx-auto text-xl text-muted-foreground md:w-10/12 lg:mx-0 gsap-reveal">
          {description}
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4 gsap-reveal">
          <a
            href={primaryCtaHref}
            className={`w-full md:w-1/3 ${buttonVariants(
              {}
            )} transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_32px_rgba(249,115,22,0.35)]`}
          >
            {primaryCtaText}
          </a>

          <a
            rel="noreferrer noopener"
            href={secondaryCtaHref}
            className={`w-full md:w-1/3 ${buttonVariants({
              variant: "outline",
            })} transition-transform duration-200 hover:-translate-y-0.5 hover:border-primary/60`}
          >
            {secondaryCtaText}
          </a>
        </div>
      </div>

      {/* Hero cards sections
      <div className="z-10 gsap-reveal">
        <HeroCards data={cards} />
      </div> */}

      {/* Shadow effect (moved further down) */}
      <div className="shadow" />
    </section>
  );
};
