"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { LightBulbIcon, PlaneIcon } from "../icons/Icons";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { HERO_CARDS_CONTENT } from "@/constants";
import type { HeroCardsContent } from "@/lib/content";

export const HeroCards = ({ data }: { data?: HeroCardsContent | null }) => {
  // Refs for cards
  const refTestimonial = useRef<HTMLDivElement | null>(null);
  const refCompany = useRef<HTMLDivElement | null>(null);
  const refCapacity = useRef<HTMLDivElement | null>(null);
  const refProducts = useRef<HTMLDivElement | null>(null);

  // Entry and interactive tilt animations
  useEffect(() => {
    const cards = [
      refTestimonial.current,
      refCompany.current,
      refCapacity.current,
      refProducts.current,
    ].filter(Boolean) as HTMLDivElement[];

    const ctx = gsap.context(() => {
      // Entry animation: each card with its own direction for variety
      gsap.set(cards, { opacity: 0, y: 24, rotate: -1, scale: 0.98 });
      const froms = [
        { x: -24, y: -10, rotate: -2 }, // testimonial
        { x: 18, y: -12, rotate: 1 }, // company
        { x: -12, y: 20, rotate: 0 }, // capacity
        { x: 20, y: 18, rotate: 2 }, // products
      ];
      cards.forEach((el, i) => gsap.set(el, froms[i] || {}));
      gsap.to(cards, {
        x: 0,
        y: 0,
        rotate: 0,
        opacity: 1,
        scale: 1,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
      });

      // Tilt interactivity per card
      const maxTilt = 10;
      const addTilt = (el: HTMLDivElement) => {
        const move = (e: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const px = (e.clientX - rect.left) / rect.width - 0.5;
          const py = (e.clientY - rect.top) / rect.height - 0.5;
          gsap.to(el, {
            rotateY: px * maxTilt,
            rotateX: -py * maxTilt,
            y: -4,
            duration: 0.3,
            ease: "power2.out",
            transformPerspective: 800,
            transformOrigin: "center",
          });
        };
        const leave = () =>
          gsap.to(el, {
            rotateX: 0,
            rotateY: 0,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
          });
        el.addEventListener("mousemove", move);
        el.addEventListener("mouseleave", leave);
        return () => {
          el.removeEventListener("mousemove", move);
          el.removeEventListener("mouseleave", leave);
        };
      };
      const cleanups = cards.map(addTilt);
      return () => cleanups.forEach((c) => c());
    });
    return () => ctx.revert();
  }, []);

  const fallback = HERO_CARDS_CONTENT;
  const merged = {
    testimonial: data?.testimonial ?? fallback.testimonial,
    company: data?.company ?? fallback.company,
    capacity: data?.capacity ?? fallback.capacity,
    productLines: data?.productLines ?? fallback.productLines,
  };
  const testimonial = {
    title: merged.testimonial?.title ?? fallback.testimonial.title,
    subtitle: merged.testimonial?.subtitle ?? fallback.testimonial.subtitle,
    quote: merged.testimonial?.quote ?? fallback.testimonial.quote,
  };
  const company = {
    title: merged.company?.title ?? fallback.company.title,
    subtitle: merged.company?.subtitle ?? fallback.company.subtitle,
    description: merged.company?.description ?? fallback.company.description,
    logoSrc: merged.company?.logoSrc ?? fallback.company.logoSrc,
    primaryCta: {
      label:
        merged.company?.primaryCta?.label ?? fallback.company.primaryCta.label,
      href:
        merged.company?.primaryCta?.href ?? fallback.company.primaryCta.href,
    },
    secondaryCta: {
      label:
        merged.company?.secondaryCta?.label ??
        fallback.company.secondaryCta.label,
      href:
        merged.company?.secondaryCta?.href ??
        fallback.company.secondaryCta.href,
    },
  };
  const capacity = {
    title: merged.capacity?.title ?? fallback.capacity.title,
    subtitle: merged.capacity?.subtitle ?? fallback.capacity.subtitle,
    metrics: merged.capacity?.metrics ?? fallback.capacity.metrics,
  };
  const productLines = {
    title: merged.productLines?.title ?? fallback.productLines.title,
    description:
      merged.productLines?.description ?? fallback.productLines.description,
    badges: merged.productLines?.badges ?? fallback.productLines.badges,
  };

  return (
    <div
      className="hidden lg:flex flex-row flex-wrap gap-8 relative w-[700px] h-[500px]"
      style={{ perspective: "1200px" }}
    >
      {/* Testimonial (Quality & Reliability) */}
      <Card
        ref={refTestimonial}
        className="absolute w-[340px] -top-[15px] drop-shadow-xl shadow-black/10 dark:shadow-white/10 will-change-transform"
      >
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <div className="p-1 mt-1 rounded-full bg-primary/20">
            <PlaneIcon />
          </div>

          <div className="flex flex-col">
            <CardTitle className="text-lg">{testimonial.title}</CardTitle>
            <CardDescription>{testimonial.subtitle}</CardDescription>
          </div>
        </CardHeader>

        <CardContent>“{testimonial.quote}”</CardContent>
      </Card>

      {/* Company overview with logo */}
      <Card
        ref={refCompany}
        className="absolute right-[20px] top-4 w-80 flex flex-col justify-center items-center drop-shadow-xl shadow-black/10 dark:shadow-white/10 will-change-transform"
      >
        <CardHeader className="flex items-center justify-center pb-2 mt-8">
          <div className="absolute flex items-center justify-center rounded-full -top-12 w-22 h-22 bg-secondary">
            <Image
              src={company.logoSrc}
              alt={`${company.title} logo`}
              width={80}
              height={80}
              className="object-contain h-20 w-20"
            />
          </div>
          <CardTitle className="text-center">{company.title}</CardTitle>
          <CardDescription className="font-normal text-primary">
            {company.subtitle}
          </CardDescription>
        </CardHeader>

        <CardContent className="pb-2 text-sm text-center">
          {company.description}
        </CardContent>

        <CardFooter className="gap-2">
          <Button size="sm" asChild>
            <Link href={company.primaryCta.href}>
              {company.primaryCta.label}
            </Link>
          </Button>
          <Button size="sm" variant="outline" asChild>
            <Link href={company.secondaryCta.href}>
              {company.secondaryCta.label}
            </Link>
          </Button>
        </CardFooter>
      </Card>

      {/* Production Capacity */}
      <Card
        ref={refCapacity}
        className="absolute top-[210px] left-[50px] w-72 drop-shadow-xl shadow-black/10 dark:shadow-white/10 will-change-transform"
      >
        <CardHeader>
          <CardTitle className="flex items-center justify-between gap-2">
            {capacity.title}
            <span className="relative flex size-3">
              <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-primary"></span>
              <span className="relative inline-flex rounded-full size-3 bg-primary"></span>
            </span>
          </CardTitle>
          <CardDescription>{capacity.subtitle}</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-3 text-sm">
            {(capacity.metrics ?? []).map((metric) => (
              <span key={metric} className="flex items-start">
                <Check className="mt-0.5 text-green-500" size={18} />
                <span className="ml-2">{metric}</span>
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Product Lines */}
      <Card
        ref={refProducts}
        className="absolute w-[350px] -right-[10px] bottom-[-20px] drop-shadow-xl shadow-black/10 dark:shadow-white/10 will-change-transform"
      >
        <CardHeader className="flex items-start justify-start gap-4 space-y-1 md:flex-row">
          <div className="p-1 mt-1 bg-primary/20 rounded-2xl">
            <LightBulbIcon />
          </div>
          <div>
            <CardTitle>{productLines.title}</CardTitle>
            <CardDescription className="mt-2 text-md">
              {productLines.description}
            </CardDescription>
            <div className="flex flex-wrap gap-2 mt-3">
              {(productLines.badges ?? []).map((name) => (
                <Badge key={name} variant="secondary" className="text-xs">
                  {name}
                </Badge>
              ))}
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};
